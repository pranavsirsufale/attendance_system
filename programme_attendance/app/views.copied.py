from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets, generics, status , serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from app.permissions import IsAdmin
from django.db.models import Count, Q , F , ExpressionWrapper , FloatField , CharField , Value
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from .models import Session , Program, Attendance, Teacher, Student, Subject, Timetable, CalendarException , Section
from .serializers import (
    SessionSerializer, AttendanceSerializer , TimetableCreateSerializer, TeacherSerializer, StudentSerializer,
    TimetableSerializer, CalendarExceptionSerializer, ProgramSerializer , SubjectSerializer , SectionSerializer
    , AdminTeacherSerializer , AdminStudentSerializer , AdminTimetableSerializer, AttendanceStatsSerializer
)
from django.db.models.functions import Concat
import logging
import traceback
import sys
import jwt
import pandas as pd


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(levelname)s %(message)s', stream=sys.stdout)



class SessionPagination(PageNumberPagination):
    page_size = 20 # default batch size 
    page_size_query_param = 'page_size'
    max_page_size = 100


class AttendanceStatsPagination(PageNumberPagination):
    page_size = 20 
    page_size_query_param = 'page_size'
    max_page_size = 100




class AdminCRUDViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return self.queryset

class TeacherViewSet(AdminCRUDViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class StudentViewSet(AdminCRUDViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class ProgramViewSet(AdminCRUDViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

class SubjectViewSet(AdminCRUDViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer



# AdminAttendanceStatsView
class AdminAttendanceStatsView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    pagination_class = AttendanceStatsPagination

    def get(self, request):
        period = request.query_params.get('period', 'semester')
        section_id = request.query_params.get('section')
        subject_id = request.query_params.get('subject')
        teacher_id = request.query_params.get('teacher')
        program_id = request.query_params.get('program')
        year = request.query_params.get('year')
        semester = request.query_params.get('semester')
        date = request.query_params.get('date')
        end_date = request.query_params.get('end_date')

        sessions = Session.objects.select_related('timetable__section__program', 'timetable__subject', 'timetable__teacher').filter(status='Completed')

        if section_id:
            sessions = sessions.filter(timetable__section_id=section_id)
        if subject_id:
            sessions = sessions.filter(timetable__subject_id=subject_id)
        if teacher_id:
            sessions = sessions.filter(timetable__teacher_id=teacher_id)
        if program_id:
            sessions = sessions.filter(timetable__section__program_id=program_id)
        if year:
            sessions = sessions.filter(timetable__section__year=year)
        if semester:
            sessions = sessions.filter(timetable__subject__semester=semester)

        if period == 'daily' and date:
            sessions = sessions.filter(date=date)
            if not end_date:
                end_date = (datetime.strptime(date, '%Y-%m-%d') + timedelta(days=1)).strftime('%Y-%m-%d')
        elif period == 'weekly':
            start_date = datetime.now().date() - timedelta(days=datetime.now().weekday())
            end_date = start_date + timedelta(days=7)
            sessions = sessions.filter(date__range=[start_date, end_date])
        elif period == 'monthly':
            start_date = datetime.now().date().replace(day=1)
            end_date = (start_date + timedelta(days=31)).replace(day=1) - timedelta(days=1)
            sessions = sessions.filter(date__range=[start_date, end_date])
        elif period == 'semester' and semester:
            start_date = sessions.filter(timetable__subject__semester=semester).order_by('date').first().date if sessions.exists() else datetime.now().date()
            end_date = sessions.filter(timetable__subject__semester=semester).order_by('-date').first().date if sessions.exists() else datetime.now().date()
            sessions = sessions.filter(date__range=[start_date, end_date])
        else:
            start_date = sessions.order_by('date').first().date if sessions.exists() else datetime.now().date()
            end_date = sessions.order_by('-date').first().date if sessions.exists() else datetime.now().date()

        stats = (
            Attendance.objects.filter(session__in=sessions)
            .select_related('student', 'recorded_by')
            .values('student__first_name', 'student__last_name', 'student__roll_number')
            .annotate(
                name=Concat(F('student__first_name'), Value(' '), F('student__last_name'), output_field=CharField()),
                roll_number=F('student__roll_number'),
                total_sessions=Count('session'),
                present=Count('session', filter=Q(status=True)),  # BooleanField: True = Present
                absent=Count('session', filter=Q(status=False)),  # BooleanField: False = Absent
                recorded_by=Concat(F('recorded_by__first_name'), Value(' '), F('recorded_by__last_name'), output_field=CharField()),
                program=F('student__section__program__name'),
                year=F('student__section__year'),
                semester=F('student__semester'),
                attendance_percentage=ExpressionWrapper(
                    (F('present') * 100.0) / F('total_sessions'),
                    output_field=FloatField()
                )
            )
            .order_by('roll_number')
        )

        viz_data = {
            'total_sessions': stats.aggregate(total=Count('total_sessions'))['total'] or 0,
            'total_present': stats.aggregate(total=Count('present'))['total'] or 0,
            'total_absent': stats.aggregate(total=Count('absent'))['total'] or 0,
            'by_subject': (
                Attendance.objects.filter(session__in=sessions)
                .values('session__timetable__subject__name')
                .annotate(
                    present=Count('session', filter=Q(status=True)),
                    absent=Count('session', filter=Q(status=False))
                )
                .order_by('session__timetable__subject__name')
            ),
            'by_teacher': (
                Attendance.objects.filter(session__in=sessions)
                .values('session__timetable__teacher__first_name', 'session__timetable__teacher__last_name')
                .annotate(
                    present=Count('session', filter=Q(status=True)),
                    absent=Count('session', filter=Q(status=False))
                )
                .order_by('session__timetable__teacher__first_name')
            ),
            'by_date': (
                Attendance.objects.filter(session__in=sessions)
                .values('session__date')
                .annotate(
                    present=Count('session', filter=Q(status=True)),
                    absent=Count('session', filter=Q(status=False))
                )
                .order_by('session__date')
            ) if period in ['daily', 'weekly', 'monthly'] else [],
        }

        paginator = self.pagination_class()
        paginated_stats = paginator.paginate_queryset(stats, request)
        serializer = AttendanceStatsSerializer(paginated_stats, many=True)

        return paginator.get_paginated_response({
            'stats': serializer.data,
            'start_date': start_date,
            'end_date': end_date,
            'viz_data': viz_data,
        })


# AdminAttendanceExportView
class AdminAttendanceExportView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        period = request.query_params.get('period', 'semester')
        section_id = request.query_params.get('section')
        subject_id = request.query_params.get('subject')
        teacher_id = request.query_params.get('teacher')
        program_id = request.query_params.get('program')
        year = request.query_params.get('year')
        semester = request.query_params.get('semester')
        date = request.query_params.get('date')
        end_date = request.query_params.get('end_date')
        export_format = request.query_params.get('format', 'csv')

        sessions = Session.objects.select_related('timetable__section__program', 'timetable__subject', 'timetable__teacher').filter(status='Completed')
        if section_id:
            sessions = sessions.filter(timetable__section_id=section_id)
        if subject_id:
            sessions = sessions.filter(timetable__subject_id=subject_id)
        if teacher_id:
            sessions = sessions.filter(timetable__teacher_id=teacher_id)
        if program_id:
            sessions = sessions.filter(timetable__section__program_id=program_id)
        if year:
            sessions = sessions.filter(timetable__section__year=year)
        if semester:
            sessions = sessions.filter(timetable__subject__semester=semester)
        if period == 'daily' and date:
            sessions = sessions.filter(date=date)
            if not end_date:
                end_date = (datetime.strptime(date, '%Y-%m-%d') + timedelta(days=1)).strftime('%Y-%m-%d')
        elif period == 'weekly':
            start_date = datetime.now().date() - timedelta(days=datetime.now().weekday())
            end_date = start_date + timedelta(days=7)
            sessions = sessions.filter(date__range=[start_date, end_date])
        elif period == 'monthly':
            start_date = datetime.now().date().replace(day=1)
            end_date = (start_date + timedelta(days=31)).replace(day=1) - timedelta(days=1)
            sessions = sessions.filter(date__range=[start_date, end_date])
        else:
            start_date = sessions.order_by('date').first().date if sessions.exists() else datetime.now().date()
            end_date = sessions.order_by('-date').first().date if sessions.exists() else datetime.now().date()

        stats = (
            Attendance.objects.filter(session__in=sessions)
            .select_related('student', 'recorded_by')
            .values('student__first_name', 'student__last_name', 'student__roll_number', 'student__section__program__name', 'student__section__year', 'student__semester')
            .annotate(
                name=Concat(F('student__first_name'), Value(' '), F('student__last_name'), output_field=CharField()),
                roll_number=F('student__roll_number'),
                program=F('student__section__program__name'),
                year=F('student__section__year'),
                semester=F('student__semester'),
                total_sessions=Count('session'),
                present=Count('session', filter=Q(status=True)),
                absent=Count('session', filter=Q(status=False)),
                recorded_by=Concat(F('recorded_by__first_name'), Value(' '), F('recorded_by__last_name'), output_field=CharField()),
                attendance_percentage=ExpressionWrapper(
                    (F('present') * 100.0) / F('total_sessions'),
                    output_field=FloatField()
                )
            )
            .order_by('roll_number')
        )

        df = pd.DataFrame(list(stats))
        if df.empty:
            return Response({'error': 'No data to export'}, status=status.HTTP_404_NOT_FOUND)

        if export_format == 'excel':
            response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = 'attachment; filename=attendance_report.xlsx'
            df.to_excel(response, index=False, engine='xlsxwriter')
            return response
        else:
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename=attendance_report.csv'
            df.to_csv(response, index=False)
            return response


# AdminStudentSearchView
class AdminStudentSearchView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    pagination_class = AttendanceStatsPagination

    def get(self, request):
        roll_number = request.query_params.get('roll_number')
        semester = request.query_params.get('semester')
        year = request.query_params.get('year')
        program_id = request.query_params.get('program')
        name = request.query_params.get('name')
        email = request.query_params.get('email')
        phone = request.query_params.get('phone')

        students = Student.objects.select_related('section__program').all()

        if roll_number:
            students = students.filter(roll_number__icontains=roll_number)
        if semester:
            students = students.filter(semester=semester)
        if year:
            students = students.filter(section__year=year)
        if program_id:
            students = students.filter(section__program_id=program_id)
        if name:
            students = students.filter(
                Q(first_name__icontains=name) | Q(last_name__icontains=name)
            )
        if email:
            students = students.filter(email__icontains=email)
        if phone:
            students = students.filter(phone__icontains=phone)

        stats = (
            Attendance.objects.filter(student__in=students)
            .select_related('student', 'recorded_by')
            .values('student__first_name', 'student__last_name', 'student__roll_number', 'student__email', 'student__phone', 'student__section__program__name', 'student__section__year', 'student__semester')
            .annotate(
                name=Concat(F('student__first_name'), Value(' '), F('student__last_name'), output_field=CharField()),
                roll_number=F('student__roll_number'),
                email=F('student__email'),
                phone=F('student__phone'),
                program=F('student__section__program__name'),
                year=F('student__section__year'),
                semester=F('student__semester'),
                total_sessions=Count('session'),
                present=Count('session', filter=Q(status=True)),
                absent=Count('session', filter=Q(status=False)),
                recorded_by=Concat(F('recorded_by__first_name'), Value(' '), F('recorded_by__last_name'), output_field=CharField()),
                attendance_percentage=ExpressionWrapper(
                    (F('present') * 100.0) / F('total_sessions'),
                    output_field=FloatField()
                )
            )
            .order_by('roll_number')
        )

        paginator = self.pagination_class()
        paginated_stats = paginator.paginate_queryset(stats, request)
        serializer = AttendanceStatsSerializer(paginated_stats, many=True)

        return paginator.get_paginated_response({
            'stats': serializer.data,
        })



class TeacherAttendanceStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            teacher = Teacher.objects.get(user=request.user)
            period = request.query_params.get('period', 'semester')
            start_date_param = request.query_params.get('start_date', None)
            end_date_param = request.query_params.get('end_date', None)
            logger.debug(f"Fetching attendance stats for teacher {teacher.id}, period: {period}, start_date: {start_date_param}, end_date: {end_date_param}")

            timetables = Timetable.objects.filter(teacher=teacher)
            session_ids = Session.objects.filter(timetable__in=timetables).values_list('id', flat=True)
            students = Student.objects.filter(section__in=timetables.values('section')).distinct()

            today = timezone.now().date()
            if start_date_param and end_date_param:
                start_date = datetime.strptime(start_date_param, '%Y-%m-%d').date()
                end_date = datetime.strptime(end_date_param, '%Y-%m-%d').date()
            elif period == 'weekly':
                start_date = today - timedelta(days=today.weekday())
                end_date = start_date + timedelta(days=6)
            elif period == 'monthly':
                start_date = today.replace(day=1)
                end_date = (start_date + timedelta(days=31)).replace(day=1) - timedelta(days=1)
            else:  # semester
                if not timetables.exists():
                    start_date = today
                    end_date = today
                else:
                    start_date = min(t.semester_start_date for t in timetables)
                    end_date = max(t.semester_end_date for t in timetables)

            attendance_stats = (
                Attendance.objects.filter(session__id__in=session_ids, student__in=students)
                .filter(session__date__gte=start_date, session__date__lte=end_date)
                .values(
                    'student__id',
                    'student__first_name',
                    'student__last_name',
                    'student__roll_number',
                    'student__section__program__name',
                    'student__section__year',
                    'student__semester',
                    'recorded_by__first_name',
                    'recorded_by__last_name'
                )
                .annotate(
                    total_sessions=Count('session'),
                    present=Count('session', filter=Q(status=True)),
                    absent=Count('session', filter=Q(status=False))
                )
            )

            stats = [
                {
                    'student_id': stat['student__id'],
                    'name': f"{stat['student__first_name']} {stat['student__last_name']}",
                    'roll_number': stat['student__roll_number'],
                    'program': stat['student__section__program__name'],
                    'year': stat['student__section__year'],
                    'semester': stat['student__semester'],
                    'total_sessions': stat['total_sessions'],
                    'present': stat['present'],
                    'absent': stat['absent'],
                    'attendance_percentage': round((stat['present'] / stat['total_sessions']) * 100, 2) if stat['total_sessions'] > 0 else 0,
                    'recorded_by': f"{stat['recorded_by__first_name']} {stat['recorded_by__last_name']}"
                }
                for stat in attendance_stats
            ]

            return Response({
                'period': period,
                'start_date': start_date.isoformat(),
                'end_date': end_date.isoformat(),
                'stats': stats
            }, status=200)
        except Teacher.DoesNotExist:
            logger.error("Teacher not found for user: %s", request.user)
            return Response({"error": "Teacher not found"}, status=404)
        except Exception as e:
            logger.error("Error fetching attendance stats: %s", str(e))
            return Response({"error": str(e)}, status=500)


'''
class TeacherAttendanceStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            teacher = Teacher.objects.get(user=request.user)
            period = request.query_params.get('period', 'semester')
            start_date_param = request.query_params.get('start_date', None)
            end_date_param = request.query_params.get('end_date', None)
            logger.debug(f"Fetching attendance stats for teacher {teacher.id}, period: {period}, start_date: {start_date_param}, end_date: {end_date_param}")

            timetables = Timetable.objects.filter(teacher=teacher)
            session_ids = Session.objects.filter(timetable__in=timetables).values_list('id', flat=True)
            students = Student.objects.filter(section__in=timetables.values('section')).distinct()

            today = timezone.now().date()
            if start_date_param and end_date_param:
                start_date = datetime.strptime(start_date_param, '%Y-%m-%d').date()
                end_date = datetime.strptime(end_date_param, '%Y-%m-%d').date()
            elif period == 'weekly':
                start_date = today - timedelta(days=today.weekday())
                end_date = start_date + timedelta(days=6)
            elif period == 'monthly':
                start_date = today.replace(day=1)
                end_date = (start_date + timedelta(days=31)).replace(day=1) - timedelta(days=1)
            else:  # semester
                if not timetables.exists():
                    start_date = today
                    end_date = today
                else:
                    start_date = min(t.semester_start_date for t in timetables)
                    end_date = max(t.semester_end_date for t in timetables)

            attendance_stats = (
                Attendance.objects.filter(session__id__in=session_ids, student__in=students)
                .filter(session__date__gte=start_date, session__date__lte=end_date)
                .values('student__id', 'student__first_name', 'student__last_name', 'student__roll_number')
                .annotate(
                    total_sessions=Count('session'),
                    present=Count('session', filter=Q(status=True)),
                    absent=Count('session', filter=Q(status=False))
                )
            )

            stats = [
                {
                    'student_id': stat['student__id'],
                    'name': f"{stat['student__first_name']} {stat['student__last_name']}",
                    'roll_number': stat['student__roll_number'],
                    'total_sessions': stat['total_sessions'],
                    'present': stat['present'],
                    'absent': stat['absent'],
                    'attendance_percentage': round((stat['present'] / stat['total_sessions']) * 100, 2) if stat['total_sessions'] > 0 else 0
                }
                for stat in attendance_stats
            ]

            return Response({
                'period': period,
                'start_date': start_date.isoformat(),
                'end_date': end_date.isoformat(),
                'stats': stats
            }, status=200)
        except Teacher.DoesNotExist:
            logger.error("Teacher not found for user: %s", request.user)
            return Response({"error": "Teacher not found"}, status=404)
        except Exception as e:
            logger.error("Error fetching attendance stats: %s", str(e))
            return Response({"error": str(e)}, status=500)

'''



class StudentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Student.objects.filter(section__timetable__teacher__user = self.request.user ).distinct()

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Session.objects.filter(timetable__teacher__user=self.request.user)

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(recorded_by=Teacher.objects.get(user=self.request.user))

class TimetableViewSet(viewsets.ModelViewSet):
    queryset = Timetable.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return TimetableCreateSerializer
        return TimetableSerializer

    def get_queryset(self):
        logger.debug("Fetching queryset for user: %s", self.request.user)
        return Timetable.objects.filter(teacher__user=self.request.user)

    def create(self, request, *args, **kwargs):
        logger.debug("POST request received at /api/timetables/")
        logger.debug("Request data: %s", request.data)
        try:
            mutable_data = request.data.copy()
            teacher = Teacher.objects.get(user=request.user)
            mutable_data['teacher'] = teacher.id
            serializer = self.get_serializer(data=mutable_data)
            serializer.is_valid(raise_exception=True)
            timetable_data = self.perform_create(serializer)
            logger.info("Timetable created successfully")
            return Response(timetable_data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            logger.error("Serializer validation failed: %s", str(e))
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error("Unexpected error: %s\n%s", str(e), traceback.format_exc())
            return Response({"detail": f"Server error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        teacher = validated_data['teacher']
        daily_schedules = validated_data['daily_schedules']
        section = validated_data['section']
        semester_start_date = validated_data.get('semester_start_date')
        semester_end_date = validated_data.get('semester_end_date')

        if not daily_schedules:
            raise ValidationError("At least one daily schedule is required.")

        for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']:
            existing = Timetable.objects.filter(section=section, day_of_week=day).count()
            new_for_day = len([s for s in daily_schedules if s['day_of_week'] == day])
            if existing + new_for_day > 5:
                raise ValidationError(f"Cannot schedule more than 5 lectures on {day} for this section.")
            for schedule in [s for s in daily_schedules if s['day_of_week'] == day]:
                if Timetable.objects.filter(
                    teacher=teacher,
                    day_of_week=day,
                    start_time=schedule['start_time'],
                    semester_start_date=semester_start_date,
                    semester_end_date=semester_end_date
                ).exists():
                    raise ValidationError(f"Teacher already scheduled on {day} at {schedule['start_time']} for this semester.")

        day_of_week_map = {'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5}
        created_timetables = []
        for schedule in daily_schedules:
            timetable = Timetable.objects.create(
                section=section,
                teacher=teacher,
                subject=Subject.objects.get(id=schedule['subject']),
                day_of_week=schedule['day_of_week'],
                start_time=schedule['start_time'],
                semester_start_date=semester_start_date,
                semester_end_date=semester_end_date
            )
            created_timetables.append(timetable)
            start_date = semester_start_date
            end_date = semester_end_date
            current_date = start_date
            target_day = day_of_week_map[timetable.day_of_week]
            while current_date <= end_date:
                if current_date.weekday() == target_day:
                    Session.objects.get_or_create(
                        timetable=timetable,
                        date=current_date,
                        defaults={'status': 'Scheduled'}
                    )
                current_date += timedelta(days=1)

        timetable_serializer = TimetableSerializer(created_timetables, many=True)
        return timetable_serializer.data



class TeacherViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def teacher_info(request):
    try:
        teacher = Teacher.objects.get(user=request.user)
        token = request.headers.get('Authorization', '').split(' ')[1]
        decoded = jwt.decode(token, options={"verify_signature": False})
        return Response({
            'name': f"{teacher.first_name} {teacher.last_name}",
            'last_login': request.user.last_login.isoformat() if request.user.last_login else None,
            'token_expiry': datetime.fromtimestamp(decoded['exp']).isoformat() if 'exp' in decoded else 'Unknown',
            'is_admin': teacher.is_admin
        })
    except Teacher.DoesNotExist:
        return Response({'detail': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)

class TeacherCalendarView(generics.ListAPIView):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        teacher = Teacher.objects.get(user=self.request.user)
        queryset = Session.objects.filter(timetable__teacher=teacher).order_by('date')
        section_id = self.request.query_params.get('section_id')
        if section_id:
            queryset = queryset.filter(timetable__section_id=section_id)
        return queryset




class MarkAttendanceView(generics.GenericAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, session_id):
        try:
            session = Session.objects.get(id=session_id)
            teacher = Teacher.objects.get(user=request.user)
            if session.timetable.teacher != teacher:
                return Response({"error": "Not authorized to mark this session"}, status=status.HTTP_403_FORBIDDEN)

            students = Student.objects.filter(section=session.timetable.section)
            existing_attendance = Attendance.objects.filter(session=session).select_related('student')
            
            attendance_data = [
                {'student_id': a.student.id, 'status': 'Present' if a.status else 'Absent'} 
                for a in existing_attendance
            ] if existing_attendance.exists() else []

            return Response({
                "session": SessionSerializer(session).data,
                "students": StudentSerializer(students, many=True).data,
                "attendance": attendance_data
            }, status=status.HTTP_200_OK)

        except Session.DoesNotExist:
            logger.error(f"Session {session_id} not found")
            return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)
        except Teacher.DoesNotExist:
            logger.error(f"Teacher not found for user: {request.user}")
            return Response({"error": "Teacher not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error in MarkAttendanceView GET: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, session_id):
        try:
            session = Session.objects.get(id=session_id)
            teacher = Teacher.objects.get(user=request.user)
            if session.timetable.teacher != teacher:
                return Response({"error": "Not authorized to mark this session"}, status=status.HTTP_403_FORBIDDEN)

            attendance_data = request.data.get('attendance', [])
            if not attendance_data:
                return Response({"error": "Attendance data required"}, status=status.HTTP_400_BAD_REQUEST)

            for entry in attendance_data:
                student = Student.objects.get(id=entry['student_id'])
                if student.section != session.timetable.section:
                    continue
                # Convert string status to boolean
                status_value = True if entry['status'] == 'Present' else False
                Attendance.objects.update_or_create(
                    student=student,
                    session=session,
                    defaults={
                        'status': status_value,
                        'recorded_by': teacher,
                        'timestamp': session.date
                    })
                
            session.status = 'Completed'
            session.save()
            return Response({"message": "Attendance marked/updated successfully"}, status=status.HTTP_200_OK)
        except Session.DoesNotExist:
            return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)
        except Student.DoesNotExist:
            return Response({"error": "Invalid student ID"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error in MarkAttendanceView POST: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class HolidayListCreateView(generics.ListCreateAPIView):
    queryset = CalendarException.objects.all()
    serializer_class = CalendarExceptionSerializer
    permission_classes = [IsAuthenticated]  

    def perform_create(self, serializer):
        holiday = serializer.save()
       
        Session.objects.filter(date=holiday.date).update(status='Cancelled')

class AttendanceStatsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, roll_number):
        try:
            student = Student.objects.get(roll_number=roll_number)
            section = student.section
            
            sessions = Session.objects.filter(
                timetable__section=section, status='Completed'
            )
            total_sessions = sessions.count()
            attendance = Attendance.objects.filter(
                student=student, session__in=sessions
            ).aggregate(
                present=Count('id', filter=Q(status='Present')),
                absent=Count('id', filter=Q(status='Absent'))
            )
            monthly_stats = Attendance.objects.filter(
                student=student, session__in=sessions
            ).extra(
                select={'month': "EXTRACT(MONTH FROM session_date)"}
            ).values('month').annotate(
                present=Count('id', filter=Q(status='Present')),
                absent=Count('id', filter=Q(status='Absent'))
            )

            attendance_list = [
                'P' if a.status == 'Present' else 'A'
                for a in Attendance.objects.filter(student=student, session__in=sessions).order_by('session__date')
            ]

            return Response({
                'student': StudentSerializer(student).data,
                'total_sessions': total_sessions,
                'present': attendance['present'] or 0,
                'absent': attendance['absent'] or 0,
                'percentage': (attendance['present'] / total_sessions * 100) if total_sessions > 0 else 0,
                'monthly_stats': list(monthly_stats),
                'consolidated': ' '.join(attendance_list[:5]) 
            })
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

class ClassHourlyStatsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, session_id):
        try:
            session = Session.objects.get(id=session_id)
            if session.timetable.teacher != Teacher.objects.get(user=request.user):
                return Response({"error": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)
            
            attendance = Attendance.objects.filter(session=session).aggregate(
                present=Count('id', filter=Q(status='Present')),
                absent=Count('id', filter=Q(status='Absent'))
            )
            total_students = Student.objects.filter(section=session.timetable.section).count()
            return Response({
                'session': SessionSerializer(session).data,
                'present': attendance['present'] or 0,
                'absent': attendance['absent'] or 0,
                'total_students': total_students
            })
        except Session.DoesNotExist:
            return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)

class SectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer #serializers.ModelSerializer(Section, fields='__all__')
    permission_classes = [IsAuthenticated]

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]



logger.debug('SubjectsForSectionView loaded - TEST DEPLOYMENT')



class SubjectsForSectionView(APIView):
    permission_classes = [IsAuthenticated]

    
    #! first get subjects for section
    
    def get(self, request):
        section_id = request.query_params.get('section_id')
        semester = request.query_params.get('semester')
        logger.debug(f"Request: section_id={section_id}, semester={semester}")

        if not section_id or not semester:
            logger.warning("Missing parameters")
            return Response({"error": "section_id and semester are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            section_id_int = int(section_id)
            semester_int = int(semester)
            logger.debug(f"Parsed: section_id={section_id_int}, semester={semester_int}")
            section = Section.objects.get(id=section_id_int)
            logger.debug(f"Section found: {section}")
        except ValueError as e:
            logger.error(f"ValueError: {str(e)}")
            return Response({"error": "section_id and semester must be integers"}, status=status.HTTP_400_BAD_REQUEST)
        except Section.DoesNotExist:
            logger.error(f"Section id={section_id} not found")
            return Response({"error": f"Section with id={section_id} not found"}, status=status.HTTP_400_BAD_REQUEST)

        # Validate semester against section's available semesters
        program_duration = section.program.duration_years * 2
        start_semester = (section.year - 1) * 2 + 1
        end_semester = min(section.year * 2, program_duration)
        if not (start_semester <= semester_int <= end_semester):
            logger.error(f"Semester {semester_int} invalid for section {section.id} (range: {start_semester}-{end_semester})")
            return Response({"error": f"Semester {semester_int} is invalid for {section.name} (valid: {start_semester}-{end_semester})"}, status=status.HTTP_400_BAD_REQUEST)

        subjects = Subject.objects.filter(semester=semester_int)
        logger.debug(f"Subjects found: {list(subjects.values('id', 'name', 'semester'))}")
        if not subjects.exists():
            logger.info(f"No subjects for semester={semester_int}")
            return Response({"message": "No subjects found", "data": []}, status=status.HTTP_200_OK)

        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_sections(request):
    try:
        # Fetch all sections (not just those tied to the teacher)
        sections = Section.objects.all()
        serializer = SectionSerializer(sections, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error in get_sections: {str(e)}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_subjects_for_section(request):
    section_id = request.query_params.get('section_id')
   
    semester_start_date = request.query_params.get('semester_start_date')
   
    if not section_id or not semester_start_date:
        return Response({"error": "Section ID and semester start date are required"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        section = Section.objects.get(id=section_id)
       
        start_date = datetime.strptime(semester_start_date, '%Y-%m-%d').date()
       
        # Infer semester: Jan-Jun = odd (1, 3, 5), Jul-Dec = even (2, 4, 6)
        semester = (section.year * 2 - 1) if start_date.month <= 6 else (section.year * 2)
        # Filter subjects by semester and optionally by section-specific logic if Subject model has a section relation
        subjects = Subject.objects.filter(semester=semester)
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)
    except Section.DoesNotExist:
        return Response({"error": "Section not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error in get_subjects_for_section: {str(e)}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_subjects(request):
    subjects = Subject.objects.all()
    serializer = SubjectSerializer(subjects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_time_slots(request):
    time_slots = [slot[0] for slot in Timetable.LECTURE_SLOTS]
    return Response(time_slots)






#!                       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
#!                       █    THE ADMIN VIEWS APPEAR HERE     █
#!                       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀



#### ADMIN VIEWS
# (Keeping all other teacher-related views like TimetableViewSet, SubjectsForSectionView, etc., unchanged)









from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Section, Subject, Student
from .serializers import SubjectSerializer

class SectionSemesterWiseDataView(APIView):
    def get(self, request):
        data = {}
        sections = Section.objects.all()

        for section in sections:
            students = section.students.all()
            if not students.exists():
                continue

            section_data = {}

            for student in students:
                for subject in student.subjects.all():
                    sem = f"Semester {subject.semester}"
                    if sem not in section_data:
                        section_data[sem] = []
                    serialized = SubjectSerializer(subject).data
                    if serialized not in section_data[sem]:  # prevent duplicates
                        section_data[sem].append(serialized)

            data[str(section)] = section_data

        return Response(data)


import rest_framework


# --- New Admin-Specific Views ---

# first adminteacherviewset

class AdminTeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = AdminTeacherSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        email = validated_data.get('email')
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        phone = validated_data.get('phone', '')
        password = validated_data.get('password')
        is_admin = validated_data.get('is_admin', False)

        try:
            new_user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
                is_superuser=is_admin
            )
            logger.info(f"Created new user for teacher: {new_user.id}")
        except Exception as e:
            logger.error(f"Failed to create user: {str(e)}")
            raise

        try:
            teacher = Teacher.objects.create(
                user=new_user,
                first_name=first_name,
                last_name=last_name,
                email=email,
                phone=phone,
                is_admin=is_admin
            )
            logger.info(f"Created teacher with ID: {teacher.id}")
            serializer.instance = teacher
        except Exception as e:
            logger.error(f"Failed to create teacher: {str(e)}")
            new_user.delete()
            raise

    def perform_update(self, serializer):
        teacher = self.get_object()
        user = teacher.user
        validated_data = serializer.validated_data
        logger.info(f"Updating teacher ID: {teacher.id} with data: {validated_data}")

        first_name = validated_data.get('first_name', user.first_name)
        last_name = validated_data.get('last_name', user.last_name)
        email = validated_data.get('email', user.email)
        password = validated_data.get('password')
        is_admin = validated_data.get('is_admin', teacher.is_admin)

        try:
            user.first_name = first_name
            user.last_name = last_name
            user.email = email
            user.is_superuser = is_admin
            if password:
                user.set_password(password)
            user.save()
            logger.info(f"Updated User ID: {user.id}")
        except Exception as e:
            logger.error(f"Failed to update user: {str(e)}")
            raise

        try:
            serializer.save(
                first_name=first_name,
                last_name=last_name,
                email=email,
                phone=validated_data.get('phone', teacher.phone),
                is_admin=is_admin
            )
            logger.info(f"Updated teacher ID: {teacher.id}")
        except Exception as e:
            logger.error(f"Failed to update teacher: {str(e)}")
            raise

    def destroy(self, request, *args, **kwargs):
        teacher = self.get_object()
        user = teacher.user
        logger.info(f"Deleting teacher ID: {teacher.id} and associated user ID: {user.id}")

        try:
            teacher.delete()
            logger.info(f"Deleted teacher ID: {teacher.id}")
            user.delete()
            logger.info(f"Deleted user ID: {user.id}")
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logger.error(f"Failed to delete teacher/user: {str(e)}")
            return Response({"error": f"Failed to delete: {str(e)}"})



# -- new endpoint for semester ---
class SemestersForSectionView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        section_id = request.query_params.get('section_id')
        if not section_id :
            logger.warning('Missing Section_id parametr')
            return Response({'error' : 'section_id is required '} , status = status.HTTP_400_BAD_REQUEST)
        
        try:
            section = Section.objects.get(id = int(section_id))
            program_duration = section.program.duration_years * 2  # e.g. 3 year = 6 sem
            start_semester = (section.year - 1 ) * 2 + 1
            end_semester = min( start_semester + 1 , program_duration)
            semesters = list(range(start_semester , end_semester + 1))
            logger.debug(f"Semesters for section {section.id} (Year {section.year}, Program {section.program.name}): {semesters}")
            return Response({'semesters' : semesters } , status = status.HTTP_200_OK)
            

        
        except Section.DoesNotExist:
            logger.error(f"Section id = {section_id} not found")
            return Response({'error' : f"Section with id = {section_id}"} , status = status.HTTP_404_NOT_FOUND)
        except ValueError:
            logger.error(f"Invalid section_id : {section_id}")
            return Response({'error' : 'Section_id must be an integer'} , status = status.HTTP_400_BAD_REQUEST)


# firest adminstudentviewset

class AdminStudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = AdminStudentSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        queryset = super().get_queryset()
        section_id = self.request.query_params.get('section')
        semester = self.request.query_params.get('semester')
        if section_id:
            queryset = queryset.filter(section__id=section_id)
            logger.debug(f"Filtering students by section_id={section_id}")
        if semester:
            queryset = queryset.filter(semester=semester)
            logger.debug(f"Filtering students by semester={semester}")
        logger.debug(f"Students queryset: {queryset.count()} items")
        return queryset

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        logger.debug(f"Validated data: {validated_data}")

        section = validated_data['section']
        semester = validated_data['semester']
        roll_number = validated_data.get('roll_number')

        if not roll_number:
            program_prefix = 'NG' if 'BALLB' in section.program.name else 'G'
            year_suffix = str(timezone.now().year)[-2:]
            sequence = str(Student.objects.filter(section__program=section.program).count() + 1).zfill(3)
            roll_number = f"{program_prefix}{year_suffix}{sequence}"

        subjects = Subject.objects.filter(semester=semester)

        try:
            student = serializer.save(roll_number=roll_number)
            student.subjects.set(subjects)
            logger.info(f"Created student ID: {student.id} with roll_no {roll_number} and subjects: {list(subjects.values_list('name', flat=True))}")
        except Exception as e:
            logger.error(f"Failed to create student: {str(e)}")
            raise

    def perform_update(self, serializer):
        serializer.save()


class AdminProgramViewSet(viewsets.ModelViewSet):

    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

class AdminSubjectViewSet(viewsets.ModelViewSet):

    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated, IsAdmin]


    def get_queryset(self):
        queryset = super().get_queryset()
        semester = self.request.query_params.get('semester')
        if semester:
            try:
                queryset = queryset.filter(semester = int(semester))
            except ValueError:
                ### Handle invalid semester value gracefully
                queryset = queryset.none()
        return queryset

class AdminSectionViewSet(viewsets.ModelViewSet):
 
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        queryset = super().get_queryset()
        program_id = self.request.query_params.get('program')
        if program_id : 
            try:
                program = Program.objects.get(id = program_id)
                max_year = program.duration_years
                queryset = queryset.filter(program__id = program_id , year__lte = max_year)
                logger.debug(f"Filtering sections for program_id={program_id} , max_year={max_year}")
            

            except Program.DoesNotExist:
                logger.error(f"Program id = {program_id} not found ")
        return queryset
    

class AdminTimetableViewSet(viewsets.ModelViewSet):
    queryset = Timetable.objects.all()
    permission_classes = [IsAuthenticated , IsAdmin]

    '''
    def get_serializer_class(self):
        if self.action in ['create' , 'update' , 'partial_update']:
            return TimetableCreateSerializer # Use for wirte operation
        return TimetableSerializer ### Use for read operation
    '''
    def get_serializer_class(self):
        if self.action == 'create' :
            return TimetableCreateSerializer 
        elif self.action in ['update', 'partial_update']:
            return AdminTimetableSerializer  # for update
        return TimetableSerializer ### For read operation
    
    def get_queryset(self):
        queryset = super().get_queryset()
        section_id = self.request.query_params.get('section_id')
        if section_id :
            queryset = queryset.filter(section_id = section_id)
        return queryset
    


    def perform_create(self,serializer):
        validated_data = serializer.validated_data
        teacher = validated_data['teacher']
        daily_schedules = validated_data['daily_schedules']
        section = validated_data['section']
        semester_start_date = validated_data.get('semester_start_date')
        semester_end_date = validated_data.get('semester_end_date')

        if not daily_schedules:
            raise ValidationError('At least one daily schedules is required ')


        day_of_week_map = {'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5}
        created_timetables = []

        for schedule in daily_schedules:
            timetable = Timetable.objects.create(
                section = section , 
                teacher = teacher , 
                subject = Subject.objects.get(id = schedule['subject']),
                day_of_week = schedule['day_of_week'] , 
                start_time = schedule['start_time'],
                semester_start_date = semester_start_date , 
                semester_end_date = semester_end_date
            )
            created_timetables.append(timetable)
            start_date = semester_start_date
            end_date = semester_end_date
            current_date = start_date 
            target_day = day_of_week_map[timetable.day_of_week]
            while current_date <= end_date:
                if current_date.weekday() == target_day:
                    Session.objects.get_or_create(
                        timetable = timetable , 
                        date = current_date, 
                        defaults = {'status' :'Scheduled'}
                    )
                current_date += timedelta(days = 1)

        # REturn serialized data for reponse
        timetable_serializer = TimetableSerializer(created_timetables , many = True)
        self.response_data = timetable_serializer.data # Store for response 

    
    def create(self,request,*args,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        self.perform_create(serializer)
        return Response(self.response_data, status = status.HTTP_201_CREATED)
    

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        # Use all created timetables from context for response
        created_timetables = serializer.context.get('created_timetables', [serializer.instance])
        response_serializer = TimetableSerializer(created_timetables, many=True)
        return Response(response_serializer.data)



    '''
    
    def perform_update(self,serializer):
        instance = serializer.instance
        #? Regenerate sessions
        Session.objects.filter(timetable = instance).delete()
        serializer.save()
        day_of_week_map = {'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5}
        start_date = instance.semester_start_date
        end_date = instance.semester_end_date
        current_date = start_date
        target_day = day_of_week_map[instance.day_of_week]
        while current_date <= end_date:
            if current_date.weekday() == target_day :
                Session.objects.get_or_create(
                    timetable = instance ,
                    date = current_date , 
                    defaults = {'status' : 'Scheduled'}
                )
            current_date += timedelta(days = 1)
    
    '''

    def perform_update(self, serializer):
        instance = serializer.save()
        # Delete existing sessions for all related timetables
        related_timetables = Timetable.objects.filter(
            section=instance.section,
            teacher=instance.teacher,
            semester_start_date=instance.semester_start_date,
            semester_end_date=instance.semester_end_date
        )
        Session.objects.filter(timetable__in=related_timetables).delete()

        # Regenerate sessions for all related timetables
        day_of_week_map = {'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5}
        start_date = instance.semester_start_date
        end_date = instance.semester_end_date
        for timetable in related_timetables:
            current_date = start_date
            target_day = day_of_week_map[timetable.day_of_week]
            while current_date <= end_date:
                if current_date.weekday() == target_day:
                    Session.objects.get_or_create(
                        timetable=timetable,
                        date=current_date,
                        defaults={'status': 'Scheduled'}
                    )
                current_date += timedelta(days=1)



    def destroy(self,request , *args,**kwargs):
        instance = self.get_object()
        Session.objects.filter(timetable = instance).delete() ### Clear sessions
        self.perform_destroy(instance)
        return Response(status = status.HTTP_204_NO_CONTENT)
    
# Ensure semester For Section View is unchanged and works
class SemestersForSectionView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        section_id = request.query_params.get('section_id')
        if not section_id:
            logger.warning('Missing section_id parameter')
            return Response({'error': 'section_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            section = Section.objects.get(id=int(section_id))
            program_duration = section.program.duration_years * 2
            start_semester = (section.year - 1) * 2 + 1
            end_semester = min(start_semester + 1, program_duration)
            semesters = list(range(start_semester, end_semester + 1))
            logger.debug(f"Semesters for section {section.id}: {semesters}")
            return Response({'semesters': semesters}, status=status.HTTP_200_OK)
        except Section.DoesNotExist:
            logger.error(f"Section id={section_id} not found")
            return Response({'error': f"Section with id={section_id} not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            logger.error(f"Invalid section_id: {section_id}")
            return Response({'error': 'section_id must be an integer'}, status=status.HTTP_400_BAD_REQUEST)      





class AdminAttendanceOverview(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        period = request.query_params.get('period', 'semester')
        today = timezone.now().date()

        if period == 'weekly':
            start_date = today - timedelta(days=today.weekday())
            end_date = start_date + timedelta(days=6)
        elif period == 'monthly':
            start_date = today.replace(day=1)
            end_date = (start_date + timedelta(days=31)).replace(day=1) - timedelta(days=1)
        else:
            timetables = Timetable.objects.all()
            start_date = min(t.semester_start_date for t in timetables) if timetables else today
            end_date = max(t.semester_end_date for t in timetables) if timetables else today

        stats = (
            Attendance.objects.filter(session__date__gte=start_date, session__date__lte=end_date)
            .values('session__timetable__section__name')
            .annotate(
                total_sessions=Count('session'),
                present=Count('session', filter=Q(status=True)),
                absent=Count('session', filter=Q(status=False))
            )
        )

        response = [
            {
                'section': stat['session__timetable__section__name'],
                'total_sessions': stat['total_sessions'],
                'present': stat['present'],
                'absent': stat['absent'],
                'attendance_percentage': round((stat['present'] / stat['total_sessions']) * 100, 2) if stat['total_sessions'] > 0 else 0
            }
            for stat in stats
        ]

        return Response({
            'period': period,
            'start_date': start_date.isoformat(),
            'end_date': end_date.isoformat(),
            'stats': response
        })






class AdminHolidayManagement(generics.ListCreateAPIView):
    queryset = CalendarException.objects.all()
    serializer_class = CalendarExceptionSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    def perform_create(self, serializer):
        holiday = serializer.save()
        Session.objects.filter(date=holiday.date).update(status='Cancelled')

class AdminSessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    pagination_class = SessionPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        section_id = self.request.query_params.get('section_id')
        teacher_id = self.request.query_params.get('teacher_id')
        semester = self.request.query_params.get('semester')

        if section_id:
            queryset = queryset.filter(timetable__section_id=section_id)
        if teacher_id:
            queryset = queryset.filter(timetable__teacher_id=teacher_id)
        if semester:
            queryset = queryset.filter(timetable__subject__semester=semester)

        return queryset.order_by('date')


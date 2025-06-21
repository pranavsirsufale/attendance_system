from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from django.http import HttpResponse,StreamingHttpResponse
from django.utils import timezone
from rest_framework import viewsets, generics, status , serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from app.permissions import IsAdmin
from django.db.models import Count, Q , F , ExpressionWrapper , FloatField , DecimalField, CharField , Value,Sum , Case, When, IntegerField
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from .models import Session , Program, Attendance, Teacher, Student, Subject, Timetable, CalendarException , Section
from .serializers import (
    SessionSerializer, AttendanceSerializer , TimetableCreateSerializer, TeacherSerializer, StudentSerializer,
    TimetableSerializer, CalendarExceptionSerializer, ProgramSerializer , SubjectSerializer , SectionSerializer
    , AdminTeacherSerializer , AdminStudentSerializer , AdminTimetableSerializer,AttendanceStatsSerializer,
    StudentDetailSerializer, AttendanceSummarySerializer
)
from django.db.models.functions import Concat
from django.db import IntegrityError,transaction
import logging
import traceback
import sys
import jwt
import csv
from io import StringIO
import re





# Logging setup
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(levelname)s %(message)s', stream=sys.stdout)


#!                       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
#!                       █    THE TEACHER VIEWS APPEAR HERE   █
#!                       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀


class StandardPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class AttendanceStatsPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100



class StudentListView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = AttendanceStatsPagination

    def get(self, request):
        try:
            students = Student.objects.all()
            student_count = students.count()
            if student_count == 0:
                return Response({
                    "count": 0,
                    "next": null,
                    "previous": null,
                    "results": {
                        "students": [],
                        "total_count": 0
                    }
                }, status=200)

            paginator = self.pagination_class()
            paginated_students = paginator.paginate_queryset(students, request)
            serializer = StudentSerializer(paginated_students, many=True)
            return paginator.get_paginated_response({
                'students': serializer.data,
                'total_count': student_count
            })
        except Exception as e:
            logger.error(f"Error in StudentListView: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=500)



class TeacherListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            teachers = Teacher.objects.all()
            serializer = TeacherSerializer(teachers, many=True)
            return Response(serializer.data, status=200)
        except Exception as e:
            logger.error(f"Error in TeacherListView: {str(e)}")
            return Response({"error": str(e)}, status=500)


class TeacherSubjectsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            teacher_id = request.query_params.get('teacher')
            if not teacher_id:
                return Response({"error": "Teacher ID is required"}, status=400)

            subjects = (
                Session.objects.filter(timetable__teacher_id=teacher_id, status='Completed')
                .values('timetable__subject__name')
                .distinct()
                .order_by('timetable__subject__name')
            )
            subject_list = [subject['timetable__subject__name'] for subject in subjects]
            return Response({"subjects": subject_list}, status=200)
        except Exception as e:
            logger.error(f"Error in TeacherSubjectsView: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=500)


class SessionPagination(PageNumberPagination):
    page_size = 20 # default batch size
    page_size_query_param = 'page_size'
    max_page_size = 100


class AdminCRUDViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return self.queryset


class TeacherViewSet(AdminCRUDViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

# class StudentViewSet(AdminCRUDViewSet):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer



class ProgramViewSet(AdminCRUDViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

class SubjectViewSet(AdminCRUDViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]


class AdminAttendanceStatsView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = AttendanceStatsPagination

    def get(self, request):
        try:
            period = request.query_params.get('period', 'semester')
            section_id = request.query_params.get('section')
            subject_id = request.query_params.get('subject')
            subject_name = request.query_params.get('subject_name')
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
            if subject_name:
                sessions = sessions.filter(timetable__subject__name=subject_name)
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
                .values(
                    'student_id',
                    'student__first_name',
                    'student__last_name',
                    'student__roll_number',
                    'student__section__program__name',
                    'student__section__year',
                    'student__semester',
                    'session__timetable__subject__name',
                    'recorded_by__first_name',
                    'recorded_by__last_name'
                )
                .annotate(
                    name=Concat(F('student__first_name'), Value(' '), F('student__last_name'), output_field=CharField()),
                    roll_number=F('student__roll_number'),
                    program=F('student__section__program__name'),
                    year=F('student__section__year'),
                    semester=F('student__semester'),
                    subject_name=F('session__timetable__subject__name'),
                    recorded_by_name=Concat(F('recorded_by__first_name'), Value(' '), F('recorded_by__last_name'), output_field=CharField()),
                    total_sessions=Count('session'),
                    present=Count('session', filter=Q(status=True)),
                    absent=Count('session', filter=Q(status=False)),
                    attendance_percentage=ExpressionWrapper(
                        (F('present') * 100.0) / F('total_sessions'),
                        output_field=FloatField()
                    )
                )
                .values(
                    'student_id',
                    'name',
                    'roll_number',
                    'program',
                    'year',
                    'semester',
                    'subject_name',
                    'recorded_by_name',
                    'total_sessions',
                    'present',
                    'absent',
                    'attendance_percentage'
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
        except Exception as e:
            logger.error(f"Error in AdminAttendanceStatsView: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=500)




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




# class StudentViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Student.objects.filter(section__timetable__teacher__user = self.request.user ).distinct()

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



'''

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
                    semester_start_date=validated_data['semester_start_date'],
                    semester_end_date=validated_data['semester_end_date']
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
                semester_start_date=validated_data['semester_start_date'],
                semester_end_date=validated_data['semester_end_date']
            )
            created_timetables.append(timetable)
            start_date = validated_data['semester_start_date']
            end_date = validated_data['semester_end_date']
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

        # Serialize the created timetables
        timetable_serializer = TimetableSerializer(created_timetables, many=True)
        return timetable_serializer.data

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = TimetableSerializer(instance, data=request.data, partial=True)  # Use TimetableSerializer for updates
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        instance = serializer.instance
        Session.objects.filter(timetable=instance).delete()
        serializer.save()
        day_of_week_map = {'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5}
        start_date = instance.semester_start_date
        end_date = instance.semester_end_date
        current_date = start_date
        target_day = day_of_week_map[instance.day_of_week]
        while current_date <= end_date:
            if current_date.weekday() == target_day:
                Session.objects.get_or_create(
                    timetable=instance,
                    date=current_date,
                    defaults={'status': 'Scheduled'}
                )
            current_date += timedelta(days=1)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        Session.objects.filter(timetable=instance).delete()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


was working the first previous








class TimetableViewSet(viewsets.ModelViewSet):
    queryset = Timetable.objects.all()
    permission_classes = [IsAuthenticated]
    print(permission_classes)

    def get_serializer_class(self):
        if self.action in ['create']:
            return TimetableCreateSerializer
        return TimetableSerializer  # Includes semester_start_date, semester_end_date for updates

    def get_queryset(self):
        return Timetable.objects.filter(teacher__user=self.request.user)

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        teacher = validated_data['teacher']
        print(teacher)
        daily_schedules = validated_data['daily_schedules']
        section = validated_data['section']
        print(daily_schedules)
        print(section)
        if not daily_schedules:
            raise ValidationError("At least one daily schedule is required.")

        day_of_week_map = {'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5}
        created_timetables = []
        default_start = datetime.now().date()
        default_end = default_start + timedelta(days=180)  # 6 months default

        for schedule in daily_schedules:
            timetable = Timetable.objects.create(
                section=section,
                teacher=teacher,
                subject=Subject.objects.get(id=schedule['subject']),
                day_of_week=schedule['day_of_week'],
                start_time=schedule['start_time'],
                semester_start_date=default_start,
                semester_end_date=default_end
            )
            created_timetables.append(timetable)
            start_date = default_start
            end_date = default_end
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
        return Response(timetable_serializer.data, status=status.HTTP_201_CREATED)

previous than above ( the second previous )

'''



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
        print(datetime.fromtimestamp(decoded['exp']).isoformat())
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
                present=Count('id', filter=Q(status=True)),
                absent=Count('id', filter=Q(status=False))
            )
            monthly_stats = Attendance.objects.filter(
                student=student, session__in=sessions
            ).extra(
                select={'month': "EXTRACT(MONTH FROM session_date)"}
            ).values('month').annotate(
                present=Count('id', filter=Q(status=True)),
                absent=Count('id', filter=Q(status=False))
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
    serializer_class = SectionSerializer
    permission_classes = [IsAuthenticated]

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]


class SubjectsForSectionView(APIView):
    permission_classes = [IsAuthenticated]

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



'''
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_sections(request):
    try:
        teacher = Teacher.objects.get(user=request.user)
        # Fetch sections where the teacher is assigned via timetables, distinct
        sections = Section.objects.filter(timetable__teacher=teacher).distinct()
        serializer = SectionSerializer(sections, many=True)
        # Enhance data with semester context (optional, if semester is stored elsewhere)
        return Response(serializer.data)
    except Teacher.DoesNotExist:
        logger.error(f"Teacher not found for user: {request.user}")
        return Response({"error": "Teacher not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error in get_sections: {str(e)}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

'''

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




#!                       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
#!                       █    THE ADMIN VIEWS APPEAR HERE     █
#!                       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀



#### ADMIN VIEWS
# (Keeping all other teacher-related views like TimetableViewSet, SubjectsForSectionView, etc., unchanged)


import rest_framework


# --- New Admin-Specific Views ---


class AdminTeacherViewSet(viewsets.ModelViewSet):
    """
    Admin-only viewset for managing teachers.
    """
    queryset = Teacher.objects.all()
    serializer_class = AdminTeacherSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    #authentication_classes = [rest_framework.authentication.TokenAuthentication]


    def perform_create(self,serializer):
        # logger.info(f"Creating teacher with user_id : {self.request.user}")
        # print(self.request.user)
        # serializer.save(user = self.request.user)


        validated_data = serializer.validated_data

        email = validated_data.get('email')
        # username = validated_data.get('username')
        first_name = validated_data.get('first_name')
        # username = validated_data.get('email')
        last_name = validated_data.get('last_name')
        phone = validated_data.get('phone','')
        password = validated_data.get('password')
        is_admin = validated_data.get('is_admin' , False)

        # Create a new User for the teacher
        # username = email
        # counter = 1
        # while User.objects.filter(username = username).exists():
        #     username = f'{base_username}{counter}'
        #     counter += 1





        try:
            new_user = User.objects.create_user(
                username = email ,
                email = email ,
                password = password,
                first_name = first_name,
                last_name = last_name,
                is_superuser = is_admin


            )
            logger.info(f"created new user for teacher : {new_user.id}")
        except Exception as e:
            logger.error(f"failed to create user : {str(e)}")
            raise

        try:
            teacher = Teacher.objects.create(
                user = new_user,
                first_name = first_name ,
                last_name = last_name ,
                email = email ,
                phone = phone ,
                is_admin = is_admin
            )
            logger.info(f"Created teacher with ID :{teacher.id}")
            # set the isntance on the serializer to return it in the
            serializer.instance = teacher
        except Exception as e:
            logger.error(f"Failed to create teacher : {str(e)}")
            # Clean up the User if Teacher creation fails
            new_user.delete()
            raise


    def perform_update(self,serializer):
        # Extract validated data
        teacher = self.get_object() # the teacher instance being updated
        user = teacher.user # the linked user instance
        validated_data = serializer.validated_data
        logger.info(f"Updating teacher ID  : {teacher.id} with data : {validated_data}")



        # Update User fields if provided
        first_name = validated_data.get('first_name' , user.first_name)
        last_name = validated_data.get('last_name' , user.last_name)
        email = validated_data.get('email' , user.email)
        password = validated_data.get('password')  # May be None or Empty
        is_admin = validated_data.get('is_admin' , teacher.is_admin)

        try:
            user.first_name = first_name
            user.last_name = last_name
            user.email = email
            user.is_superuser = is_admin
            if password:            # Only update if provided and non-empty
                user.set_password(password)
            user.save()
            logger.info(f"Updated User ID : {user.id}")

        except Exception as e:
            logger.error(f"failed to update user : {str(e)}")
            raise

        # Update Teacher fields
        try:
            serializer.save(
                first_name = first_name ,
                last_name = last_name ,
                email = email ,
                phone = validated_data.get('phone' , teacher.phone),
                is_admin = is_admin
            )
            logger.info(f"Updated teacher ID : {teacher.id}")
        except Exception as e:
            logger.error(f"Failed to update teacher : {str(e)}")
            raise


    def destroy(self,request , *args,**kwargs):
        teacher = self.get_object()
        user = teacher.user
        logger.info(f"Deleting teaching ID : {teacher.id} and associated user ID: {user.id}")

        try:
            # Delete the teacher instance
            teacher.delete()
            logger.info(f"Delete teacher ID : {teacher.id}")

            # Delete the associated User instance
            user.delete()
            logger.info(f"Deleted user ID : {user.id}")

            return Response(status = status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logger.error(f"Failed to delete teacher/user : {str(e)}")
            return Response({"error" : f"Failed to delete : {str(e)}"})



class SemesterForSectionViewTest(APIView):
    permission_classes = [IsAuthenticated,IsAdmin]

    def get(self,request):
        section = request.query_params.get('section_id')
        print(section)

        return Response({"data":'section has found good !!!!!!!!'})

# -- new endpoint for semester ---
class SemestersForSectionView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        section_id = request.query_params.get('section_id')
        print('I got section Id here ',section_id)
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
            # print('printing section id not found')
            return Response({'error' : f"Section with id = {section_id}"} , status = status.HTTP_404_NOT_FOUND)
        except ValueError:
            logger.error(f"Invalid section_id : {section_id}")
            return Response({'error' : 'Section_id must be an integer'} , status = status.HTTP_400_BAD_REQUEST)


# class StudentDetailView(APIView):
#     permission_classes = [IsAuthenticated, IsAdmin]

#     def get(self, request, pk):
#         try:
#             student = Student.objects.select_related('section__program').get(id=pk)
#             attendance = Attendance.objects.filter(student=student).select_related('subject')
#             serializer = StudentDetailSerializer(student)
#             data = serializer.data
#             data['attendance'] = AttendanceSerializer(attendance, many=True).data
#             return Response({'student': student, 'attendance': data['attendance']})
#         except Student.DoesNotExist:
#             return Response({'error': 'Student not found'}, status=404)
#         except Exception as e:
#             logger.error(f"Error in StudentDetailView: {str(e)}", exc_info=True)
#             return Response({'error': str(e)}, status=500)


# class StudentViewSet(ModelViewSet):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer
#     permission_classes = [IsAuthenticated, IsAdmin]
#     pagination_class = StandardPagination

#     def get_queryset(self):
#         queryset = super().get_queryset()
#         section_id = self.request.query_params.get('section_id')
#         semester = self.request.query_params.get('semester')
#         program_id = self.request.query_params.get('program_id')

#         if section_id:
#             queryset = queryset.filter(section_id=section_id)
#         if semester:
#             queryset = queryset.filter(semester=semester)
#         if program_id:
#             queryset = queryset.filter(section__program_id=program_id)

#         return queryset.select_related('section__program')

class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    pagination_class = StandardPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        section_id = self.request.query_params.get('section_id')
        semester = self.request.query_params.get('semester')
        program_id = self.request.query_params.get('program_id')

        if section_id:
            queryset = queryset.filter(section_id=section_id)
        if semester:
            queryset = queryset.filter(semester=semester)
        if program_id:
            queryset = queryset.filter(section__program_id=program_id)

        return queryset.select_related('section__program')

# class StudentDetailView(APIView):
#     permission_classes = [IsAuthenticated, IsAdmin]

#     def get(self, request, pk):
#         try:
#             student = Student.objects.select_related('section__program').get(id=pk)
#             serializer = StudentSerializer(student)

#             # Aggregate attendance by subject
#             attendance_data = (
#                 Attendance.objects.filter(student=student)
#                 .select_related('session__subject')
#                 .values('session__subject__id', 'session__subject__name')
#                 .annotate(
#                     classes_attended=Count('id', filter=Q(status=True)),
#                     total_classes=Count('id')
#                 )
#             )

#             # Serialize attendance data
#             attendance_serializer = AttendanceSummarySerializer(attendance_data, many=True)

#             return Response({
#                 'student': serializer.data,
#                 'attendance': attendance_serializer.data
#             })
#         except Student.DoesNotExist:
#             return Response({'error': 'Student not found'}, status=404)
#         except Exception as e:
#             logger.error(f"Error in StudentDetailView: {str(e)}", exc_info=True)
#             return Response({'error': str(e)}, status=500)

# class StudentDetailView(APIView):
#     permission_classes = [IsAuthenticated, IsAdmin]

#     def get(self, request, pk):
#         try:
#             student = Student.objects.select_related('section__program').get(id=pk)
#             serializer = StudentSerializer(student)

#             # Aggregate attendance by subject
#             attendance_data = (
#                 Attendance.objects.filter(student=student)
#                 .select_related('session__timetable__subject')
#                 .values('session__timetable__subject__id', 'session__timetable__subject__name')
#                 .annotate(
#                     classes_attended=Count('id', filter=Q(status=True)),
#                     total_classes=Count('id')
#                 )
#             )

#             # Serialize attendance data
#             attendance_serializer = AttendanceSummarySerializer(attendance_data, many=True)

#             return Response({
#                 'student': serializer.data,
#                 'attendance': attendance_serializer.data
#             })
#         except Student.DoesNotExist:
#             return Response({'error': 'Student not found'}, status=404)
#         except Exception as e:
#             logger.error(f"Error in StudentDetailView: {str(e)}", exc_info=True)
#             return Response({'error': str(e)}, status=500)

class StudentDetailView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request, pk):
        try:
            student = Student.objects.select_related('section__program').get(id=pk)
            serializer = StudentSerializer(student)

            # Base attendance query
            attendance_query = Attendance.objects.filter(student=student).select_related('session__timetable__subject')

            # Apply filters
            date_param = request.query_params.get('date')
            week_param = request.query_params.get('week')
            month_param = request.query_params.get('month')
            semester_param = request.query_params.get('semester')
            start_date_param = request.query_params.get('start_date')
            end_date_param = request.query_params.get('end_date')

            if date_param:
                try:
                    date = datetime.strptime(date_param, '%Y-%m-%d').date()
                    attendance_query = attendance_query.filter(session__date=date)
                except ValueError:
                    return Response({'error': 'Invalid date format'}, status=400)
            elif week_param:
                try:
                    week_start = datetime.strptime(week_param, '%Y-%m-%d').date()
                    week_end = week_start + timedelta(days=6)
                    attendance_query = attendance_query.filter(session__date__range=[week_start, week_end])
                except ValueError:
                    return Response({'error': 'Invalid week format'}, status=400)
            elif month_param:
                try:
                    month_start = datetime.strptime(month_param, '%Y-%m').date()
                    month_end = month_start + relativedelta(months=1) - timedelta(days=1)
                    attendance_query = attendance_query.filter(session__date__range=[month_start, month_end])
                except ValueError:
                    return Response({'error': 'Invalid month format'}, status=400)
            elif semester_param:
                # Assume semester starts in July (odd semesters) or January (even semesters)
                year = datetime.now().year
                semester = student.semester
                if semester % 2 == 1:  # Odd semester (Jul-Dec)
                    start_date = datetime(year, 7, 1).date()
                    end_date = datetime(year, 12, 31).date()
                else:  # Even semester (Jan-Jun)
                    start_date = datetime(year, 1, 1).date()
                    end_date = datetime(year, 6, 30).date()
                attendance_query = attendance_query.filter(session__date__range=[start_date, end_date])
            elif start_date_param and end_date_param:
                try:
                    start_date = datetime.strptime(start_date_param, '%Y-%m-%d').date()
                    end_date = datetime.strptime(end_date_param, '%Y-%m-%d').date()
                    if start_date > end_date:
                        return Response({'error': 'Start date must be before end date'}, status=400)
                    attendance_query = attendance_query.filter(session__date__range=[start_date, end_date])
                except ValueError:
                    return Response({'error': 'Invalid date format'}, status=400)

            # Aggregate attendance by subject
            attendance_data = (
                attendance_query
                .values('session__timetable__subject__id', 'session__timetable__subject__name')
                .annotate(
                    classes_attended=Count('id', filter=Q(status=True)),
                    total_classes=Count('id')
                )
            )

            # Serialize attendance data
            attendance_serializer = AttendanceSummarySerializer(attendance_data, many=True)

            return Response({
                'student': serializer.data,
                'attendance': attendance_serializer.data
            })
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=404)
        except Exception as e:
            logger.error(f"Error in StudentDetailView: {str(e)}", exc_info=True)
            return Response({'error': str(e)}, status=500)

class AdminStudentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]
    queryset = Student.objects.all()
    serializer_class = AdminStudentSerializer



    def get_queryset(self):
        queryset = super().get_queryset()
        section_id = self.request.query_params.get('section')
        semester = self.request.query_params.get('semester')
        if section_id:
            queryset = queryset.filter(section__id = section_id)
            logger.debug(f"Filterring students by section_id  = {section_id}")

        if semester :
            queryset = queryset.filter(semester = semester)
            logger.debug(f"Filtering students by semester = {semester}")
        logger.debug(f"Students queryset : {queryset.count()} items" )
        return queryset


    def perform_create(self,serializer):
        validated_data = serializer.validated_data

        logger.debug(f"validated data : {validated_data}")

        section = validated_data['section']  # Now words with Primary related key
        semester = validated_data['semester']
        roll_number = validated_data.get('roll_number')

        # Auto - generate roll number if not provided
        if not roll_number:
            program_prefix = 'NG' if 'BALLB' in section.program.name else 'G'
            year_suffix = str(timezone.now().year)[-2:] # e.g. , "25" from 2025
            # section_year = str(section.year).zfill(2)   # e.g., "03" for year 3

            # Count existing students in this section for a unique sequence
            sequence = str(Student.objects.filter(section__program=section.program).count() + 1).zfill(3)
            # roll_number = f"{program_code}{year_suffix}{section_year}{sequence}"  # e.g., "BA2503010"
            roll_number = f"{program_prefix}{year_suffix}{sequence}"

        # Assign subjects for the specific semester
        subjects = Subject.objects.filter(semester =semester)

        try:
            # save with roll_numberr explicitly
            student = serializer.save(roll_number = roll_number)
            student.subjects.set(subjects)
            logger.info(f"Created student ID: {student.id} with roll_no {roll_number} and subjects: {list(subjects.values_list('name', flat=True))}")
        except Exception as e:
            logger.error(f"Failed to create student : {str(e)}")
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
    """
    Admin-only viewset for managing sections.
    """
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


'''
previous one without update funcionlity

class AdminTimetableViewSet(viewsets.ModelViewSet):

    queryset = Timetable.objects.all()
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return TimetableCreateSerializer
        return TimetableSerializer

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        teacher = validated_data['teacher']
        daily_schedules = validated_data['daily_schedules']
        section = validated_data['section']
        semester_start_date = validated_data.get('semester_start_date')
        semester_end_date = validated_data.get('semester_end_date')

        if not daily_schedules:
            raise ValidationError("At least one daily schedule is required.")

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



'''

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

class SectionForProgramView(APIView):
    permission_classes = [IsAuthenticated,IsAdmin]

    def get(self,request):
        program_id = request.query_params.get('program_id')
        if not program_id:
            return Response({'error':"program_id is required" }, status = status.HTTP_400_BAD_REQUEST)

        try:
            sections = Section.objects.filter(program_id = program_id)
            print(sections)
            serializer = SectionSerializer(sections , many = True)
            return Response(serializer.data)
        except Program.DoesNotExist:
            return Response({"error":f"Program with ID {program_id} not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error":"the program Id must be an integer"},status = status.HTTP_400_BAD_REQUEST)


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
        else:  # semester
            timetables = Timetable.objects.all()
            start_date = min(t.semester_start_date for t in timetables) if timetables else today
            end_date = max(t.semester_end_date for t in timetables) if timetables else today

        stats = (
            Attendance.objects.filter(session__date__gte=start_date, session__date__lte=end_date)
            .values('session__timetable__section__name')
            .annotate(
                total_sessions=Count('session'),
                present=Count('session', filter=Q(status='Present')),
                absent=Count('session', filter=Q(status='Absent'))
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


class PassStudentsView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, request):
        try:
            students_data = request.data
            if not isinstance(students_data, list):
                return Response({"error": "Expected a list of students"}, status=400)

            errors = []
            updated_students = []

            with transaction.atomic():
                for student_data in students_data:
                    # Required fields
                    required_fields = ['id', 'semester', 'section_id']
                    missing_fields = [field for field in required_fields if field not in student_data or student_data[field] is None]
                    if missing_fields:
                        errors.append(f"ID {student_data.get('id', 'unknown')}: Missing {', '.join(missing_fields)}")
                        continue

                    # Validate student
                    try:
                        student = Student.objects.get(id=student_data['id'])
                    except Student.DoesNotExist:
                        errors.append(f"ID {student_data['id']}: Not found")
                        continue

                    # Get current section
                    try:
                        current_section = Section.objects.get(id=student.section_id)
                    except Section.DoesNotExist:
                        errors.append(f"ID {student_data['id']}: Current section invalid")
                        continue

                    program_id = current_section.program_id
                    current_year = current_section.year
                    section_name = current_section.name
                    current_semester = student.semester
                    new_semester = student_data['semester']

                    # Validate semester
                    if new_semester != current_semester + 1:
                        errors.append(f"ID {student_data['id']}: Expected semester {current_semester + 1}")
                        continue

                    # Check max semester
                    max_semester = 6 if program_id == 2 else 10
                    if new_semester > max_semester:
                        errors.append(f"ID {student_data['id']}: Final semester reached")
                        continue

                    # Determine expected year
                    new_year = current_year if new_semester % 2 == 0 else current_year + 1

                    # Validate new section
                    new_section_id = student_data['section_id']
                    try:
                        new_section = Section.objects.get(id=new_section_id, program_id=program_id, year=new_year)
                    except Section.DoesNotExist:
                        # Try same section name
                        try:
                            new_section = Section.objects.get(name=section_name, program_id=program_id, year=new_year)
                            new_section_id = new_section.id
                        except Section.DoesNotExist:
                            # Fallback to any section
                            new_section = Section.objects.filter(program_id=program_id, year=new_year).first()
                            if not new_section:
                                errors.append(f"ID {student_data['id']}: No section for Year {new_year}")
                                continue
                            new_section_id = new_section.id

                    # Update student
                    student.semester = new_semester
                    student.section_id = new_section_id
                    updated_students.append(student)

                if errors:
                    return Response({"error": "; ".join(errors)}, status=400)

                # Save updates
                for student in updated_students:
                    student.save()

                return Response({"updated": len(updated_students)}, status=200)

        except Exception as e:
            logger.error(f"Error in PassStudentsView: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=500)

# class PassStudentsView(APIView):
#     permission_classes = [IsAuthenticated, IsAdmin]

#     def post(self, request):
#         try:
#             students_data = request.data
#             if not isinstance(students_data, list):
#                 return Response({"error": "Expected a list of students"}, status=400)

#             errors = []
#             updated_students = []

#             with transaction.atomic():
#                 for student_data in students_data:
#                     required_fields = ['id', 'semester', 'section_id']
#                     missing_fields = [field for field in required_fields if field not in student_data or student_data[field] is None]
#                     if missing_fields:
#                         errors.append(f"ID {student_data.get('id', 'unknown')}: Missing {', '.join(missing_fields)}")
#                         continue

#                     try:
#                         student = Student.objects.get(id=student_data['id'])
#                     except Student.DoesNotExist:
#                         errors.append(f"ID {student_data['id']}: Not found")
#                         continue

#                     try:
#                         current_section = Section.objects.get(id=student.section_id)
#                     except Section.DoesNotExist:
#                         errors.append(f"ID {student_data['id']}: Current section invalid")
#                         continue

#                     program_id = current_section.program_id
#                     current_year = current_section.year
#                     section_name = current_section.name
#                     current_semester = student.semester
#                     new_semester = student_data['semester']

#                     if new_semester != current_semester + 1:
#                         errors.append(f"ID {student_data['id']}: Expected semester {current_semester + 1}")
#                         continue

#                     max_semester = 6 if program_id == 2 else 10
#                     if new_semester > max_semester:
#                         errors.append(f"ID {student_data['id']}: Final semester reached")
#                         continue

#                     new_year = current_year if new_semester % 2 == 0 else current_year + 1
#                     new_section_id = student_data['section_id']
#                     try:
#                         new_section = Section.objects.get(id=new_section_id, program_id=program_id, year=new_year)
#                     except Section.DoesNotExist:
#                         try:
#                             new_section = Section.objects.get(name=section_name, program_id=program_id, year=new_year)
#                             new_section_id = new_section.id
#                         except Section.DoesNotExist:
#                             new_section = Section.objects.filter(program_id=program_id, year=new_year).first()
#                             if not new_section:
#                                 errors.append(f"ID {student_data['id']}: No section for Year {new_year}")
#                                 continue
#                             new_section_id = new_section.id

#                     student.semester = new_semester
#                     student.section_id = new_section_id
#                     updated_students.append(student)

#                 if errors:
#                     return Response({"error": "; ".join(errors)}, status=400)

#                 for student in updated_students:
#                     student.save()

#                 return Response({"updated": len(updated_students)}, status=200)

#         except Exception as e:
#             logger.error(f"Error in PassStudentsView: {str(e)}", exc_info=True)
#             return Response({"error": str(e)}, status=500)

# admin attendance export by teacher-subject
class AdminAttendanceExportView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        try:
            logger.info("Starting AdminAttendanceExportView")
            period = request.query_params.get('period', 'semester')
            section_id = request.query_params.get('section')
            subject_id = request.query_params.get('subject')
            subject_name = request.query_params.get('subject_name')
            teacher_id = request.query_params.get('teacher')
            program_id = request.query_params.get('program')
            year = request.query_params.get('year')
            semester = request.query_params.get('semester')
            date = request.query_params.get('date')
            end_date = request.query_params.get('end_date')
            start_date = request.query_params.get('start_date')
            format = request.query_params.get('format', 'csv')

            logger.info(f"Parameters: period={period}, teacher_id={teacher_id}, subject_name={subject_name}")
            if not teacher_id or not subject_name:
                logger.warning("Missing teacher_id or subject_name")
                return Response({"error": "Teacher ID and subject name are required"}, status=400)

            # Validate teacher_id
            try:
                teacher = Teacher.objects.get(id=teacher_id)
                logger.info(f"Teacher found: {teacher.id}")
            except Teacher.DoesNotExist:
                logger.error(f"Teacher id={teacher_id} not found")
                return Response({"error": f"Teacher with id={teacher_id} not found"}, status=404)

            sessions = Session.objects.select_related('timetable__section__program', 'timetable__subject', 'timetable__teacher').filter(status='Completed')
            logger.info(f"Initial sessions count: {sessions.count()}")

            if section_id:
                sessions = sessions.filter(timetable__section_id=section_id)
            if subject_id:
                sessions = sessions.filter(timetable__subject_id=subject_id)
            if subject_name:
                sessions = sessions.filter(timetable__subject__name=subject_name)
            if teacher_id:
                sessions = sessions.filter(timetable__teacher_id=teacher_id)
            if program_id:
                sessions = sessions.filter(timetable__section__program_id=program_id)
            if year:
                sessions = sessions.filter(timetable__section__year=year)
            if semester:
                sessions = sessions.filter(timetable__subject__semester=semester)

            if start_date and end_date:
                try:
                    sessions = sessions.filter(date__range=[start_date,end_date])
                except ValueError:
                    logger.error(f"Invalid date range : {start_date} to {end_date}")
                    return Response({"error":"Invalid date range"},status = 400)

            if period == 'daily' and date:
                try:
                    sessions = sessions.filter(date=date)
                except ValueError:
                    logger.error(f"Invalid date format: {date}")
                    return Response({"error": "Invalid date format"}, status=400)
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
                try:
                    start_date = sessions.filter(timetable__subject__semester=semester).order_by('date').first().date if sessions.exists() else datetime.now().date()
                    end_date = sessions.filter(timetable__subject__semester=semester).order_by('-date').first().date if sessions.exists() else datetime.now().date()
                    sessions = sessions.filter(date__range=[start_date, end_date])
                except ValueError:
                    logger.error(f"Invalid semester: {semester}")
                    return Response({"error": "Invalid semester"}, status=400)
            else:
                start_date = sessions.order_by('date').first().date if sessions.exists() else datetime.now().date()
                end_date = sessions.order_by('-date').first().date if sessions.exists() else datetime.now().date()

            logger.info(f"Filtered sessions count: {sessions.count()}")

            stats = (
                Attendance.objects.filter(session__in=sessions)
                .select_related('student', 'recorded_by')
                .values(
                    'student_id',
                    'student__first_name',
                    'student__last_name',
                    'student__roll_number',
                    'student__section__program__name',
                    'student__section__year',
                    'student__semester',
                    'session__timetable__subject__name',
                    'recorded_by__first_name',
                    'recorded_by__last_name'
                )
                .annotate(
                    name=Concat(F('student__first_name'), Value(' '), F('student__last_name'), output_field=CharField()),
                    roll_number=F('student__roll_number'),
                    program=F('student__section__program__name'),
                    year=F('student__section__year'),
                    semester=F('student__semester'),
                    subject_name=F('session__timetable__subject__name'),
                    recorded_by_name=Concat(F('recorded_by__first_name'), Value(' '), F('recorded_by__last_name'), output_field=CharField()),
                    total_sessions=Count('session'),
                    present=Count('session', filter=Q(status=True)),
                    absent=Count('session', filter=Q(status=False)),
                    attendance_percentage=ExpressionWrapper(
                        (F('present') * 100.0) / F('total_sessions'),
                        output_field=FloatField()
                    )
                )
                .values(
                    'student_id',
                    'name',
                    'roll_number',
                    'program',
                    'year',
                    'semester',
                    'subject_name',
                    'recorded_by_name',
                    'total_sessions',
                    'present',
                    'absent',
                    'attendance_percentage'
                )
                .order_by('roll_number')
            )

            logger.info(f"Stats count: {stats.count()}")

            if format == 'csv':
                def stream_csv():
                    buffer = StringIO()
                    writer = csv.writer(buffer)
                    writer.writerow([
                        'Student Name', 'Student ID', 'Roll Number', 'Program', 'Year', 'Semester',
                        'Subject', 'Total Sessions', 'Present', 'Absent', 'Attendance %', 'Recorded By'
                    ])

                    for stat in stats.iterator():
                        writer.writerow([
                            stat['name'],
                            stat['student_id'],
                            stat['roll_number'],
                            stat['program'],
                            stat['year'],
                            stat['semester'],
                            stat['subject_name'],
                            stat['total_sessions'],
                            stat['present'],
                            stat['absent'],
                            f"{stat['attendance_percentage']:.2f}%",
                            stat['recorded_by_name']
                        ])
                        buffer.seek(0)
                        yield buffer.read()
                        buffer.truncate(0)
                        buffer.seek(0)

                response = StreamingHttpResponse(stream_csv(), content_type='text/csv')
                response['Content-Disposition'] = f'attachment; filename="attendance_report_{subject_name}_{teacher_id}.csv"'
                return response
            else:
                logger.warning("Unsupported format requested")
                return Response({"error": "Only CSV format is supported"}, status=400)

        except Exception as e:
            logger.error(f"Error in AdminAttendanceExportView: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=500)

class AdminHolidayManagement(generics.ListCreateAPIView):
    queryset = CalendarException.objects.all()
    serializer_class = CalendarExceptionSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def perform_create(self, serializer):
        holiday = serializer.save()
        Session.objects.filter(date=holiday.date).update(status='Cancelled')

class SessionPagination(PageNumberPagination):
    page_size = 20 # default batch size
    page_size_query_param = 'page_size'
    max_page_size = 100

class BulkStudentUploadView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, request):
        try:
            students_data = request.data
            if not isinstance(students_data, list):
                return Response({"error": "Expected a list of students"}, status=400)

            # Validate data
            errors = []
            student_objects = []
            existing_ids = set(Student.objects.values_list('id', flat=True))

            for i, student in enumerate(students_data):
                # Required fields
                required_fields = ['id', 'first_name', 'roll_number', 'section_id', 'semester']
                missing_fields = [field for field in required_fields if field not in student or student[field] is None]
                if missing_fields:
                    errors.append(f"Row {i+1}: Missing fields: {', '.join(missing_fields)}")
                    continue

                # Validate ID
                if not isinstance(student['id'], int):
                    errors.append(f"Row {i+1}: Invalid ID (must be integer)")
                    continue
                if student['id'] in existing_ids:
                    errors.append(f"Row {i+1}: Duplicate ID {student['id']}")
                    continue

                # Validate section
                try:
                    section = Section.objects.get(id=student['section_id'])
                except Section.DoesNotExist:
                    errors.append(f"Row {i+1}: Invalid section_id")
                    continue

                # Validate semester (1-10 based on section year)
                year = section.year
                valid_semesters = [year * 2 - 1, year * 2]
                if student['semester'] not in valid_semesters:
                    errors.append(f"Row {i+1}: Invalid semester for year {year}")
                    continue

                # Validate email format if provided
                if student.get('email') and not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', student['email']):
                    errors.append(f"Row {i+1}: Invalid email format")
                    continue

                student_objects.append(Student(
                    id=student['id'],
                    first_name=student['first_name'],
                    last_name=student.get('last_name', ''),
                    roll_number=student['roll_number'],
                    email=student.get('email', ''),
                    phone=student.get('phone', ''),
                    section_id=student['section_id'],
                    semester=student['semester']
                ))

            if errors:
                return Response({"error": "; ".join(errors)}, status=400)

            # Bulk create students
            try:
                Student.objects.bulk_create(student_objects)
                return Response({"added": len(student_objects)}, status=201)
            except IntegrityError as e:
                logger.error(f"IntegrityError during bulk create: {str(e)}")
                return Response({"error": "Database error, possible duplicate data"}, status=400)

        except Exception as e:
            logger.error(f"Error in BulkStudentUploadView: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=500)


# this admin SEssions view set can be used for all sessionsgetting
'''
class AdminSessionViewSet(viewsets.ModelViewSet):

    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated , IsAdmin]

    def get_queryset(self):
        queryset = super().get_queryset()
        section_id = self.request.query_params.get('section_id')
        if section_id:
            queryset = queryset.filter(timetable__section_id = section_id)
        return queryset



'''

class TestExportView(APIView):
    permission_classes = [IsAuthenticated,IsAdmin]
    def get(self,request):
        return Response({"message":"Test export view works"})


class AdminSessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated , IsAdmin]
    pagination_class = SessionPagination # ADd pagination

    def get_queryset(self):
        queryset = super().get_queryset()
        section_id = self.request.query_params.get('section_id')
        teacher_id = self.request.query_params.get('teacher_id') # add teacher filter
        semester = self.request.query_params.get('semester')        # add semester filter

        if section_id :
            queryset = queryset.filter( timetable__section_id = section_id)
        if teacher_id :
            queryset = queryset.filter( timetable__teacher_id = teacher_id)
        if semester :
            queryset = queryset.filter( timetable__subject__semester = semester)

        return queryset.order_by('date') # Order for consistency

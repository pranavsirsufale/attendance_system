from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets, generics, status , serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from rest_framework.exceptions import ValidationError
from app.permissions import IsAdmin
from django.db.models import Count, Q
from datetime import datetime, timedelta
from .models import Session , Program, Attendance, Teacher, Student, Subject, Timetable, CalendarException , Section
from .serializers import (
    SessionSerializer, AttendanceSerializer , TimetableCreateSerializer, TeacherSerializer, StudentSerializer,
    TimetableSerializer, CalendarExceptionSerializer, ProgramSerializer , SubjectSerializer , SectionSerializer
)
import logging
import traceback
import sys
import jwt


# Logging setup
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(levelname)s %(message)s', stream=sys.stdout)


# Create your views here.
def home(request):
    return HttpResponse('hello world this is home')





# Generic CRUD ViewSet with Admin Permission
class AdminCRUDViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return self.queryset

# Teacher CRUD
class TeacherViewSet(AdminCRUDViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

# Student CRUD
class StudentViewSet(AdminCRUDViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

# Program CRUD
class ProgramViewSet(AdminCRUDViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

# Subject CRUD
class SubjectViewSet(AdminCRUDViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

# Timetable CRUD
# class TimetableViewSet(AdminCRUDViewSet):
#     queryset = Timetable.objects.all()
#     serializer_class = TimetableSerializer


class SessionViewSet(AdminCRUDViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer


class AdminAttendanceStatsView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]

    def list(self, request):
        period = request.query_params.get('period', 'semester')
        section_id = request.query_params.get('section', None)
        specific_date = request.query_params.get('date', None)  # For daily stats
        logger.debug(f"Fetching all attendance stats for period: {period}, section: {section_id}, date: {specific_date}")

        today = timezone.now().date()
        if period == 'daily' and specific_date:
            start_date = end_date = datetime.strptime(specific_date, '%Y-%m-%d').date()
        elif period == 'weekly':
            start_date = today - timedelta(days=today.weekday())
            end_date = start_date + timedelta(days=6)
        elif period == 'monthly':
            start_date = today.replace(day=1)
            end_date = (start_date + timedelta(days=31)).replace(day=1) - timedelta(days=1)
        else:  # semester
            timetables = Timetable.objects.all()
            start_date = min(t.semester_start_date for t in timetables) if timetables else today
            end_date = max(t.semester_end_date for t in timetables) if timetables else today

        stats_query = Attendance.objects.filter(session__date__gte=start_date, session__date__lte=end_date)
        if section_id:
            stats_query = stats_query.filter(session__timetable__section_id=section_id)

        stats = (
            stats_query
            .values('student__id', 'student__first_name', 'student__last_name', 'student__roll_number', 'recorded_by__first_name', 'recorded_by__last_name')
            .annotate(
                total_sessions=Count('session'),
                present=Count('session', filter=Q(status='Present')),
                absent=Count('session', filter=Q(status='Absent'))
            )
        )

        response = [
            {
                'student_id': stat['student__id'],
                'name': f"{stat['student__first_name']} {stat['student__last_name']}",
                'roll_number': stat['student__roll_number'],
                'total_sessions': stat['total_sessions'],
                'present': stat['present'],
                'absent': stat['absent'],
                'attendance_percentage': round((stat['present'] / stat['total_sessions']) * 100, 2) if stat['total_sessions'] > 0 else 0,
                'recorded_by': f"{stat['recorded_by__first_name']} {stat['recorded_by__last_name']}"
            }
            for stat in stats
        ]

        return Response({
            'period': period,
            'section': section_id,
            'start_date': start_date.isoformat(),
            'end_date': end_date.isoformat(),
            'stats': response
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
                .values('student__id', 'student__first_name', 'student__last_name', 'student__roll_number')
                .annotate(
                    total_sessions=Count('session'),
                    present=Count('session', filter=Q(status='Present')),
                    absent=Count('session', filter=Q(status='Absent'))
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
        if self.action == 'create':
            return TimetableCreateSerializer
        return TimetableSerializer

    def get_queryset(self):
        logger.debug("Fetching queryset for user: %s", self.request.user)
        return Timetable.objects.filter(teacher__user=self.request.user)

    def create(self, request, *args, **kwargs):
        logger.debug("POST request received at /api/timetables/")
        logger.debug("Request data: %s", request.data)

        try:
            # Add teacher to the request data since frontend doesn't send it
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
        teacher = validated_data['teacher']  # Already set in create()
        daily_schedules = validated_data['daily_schedules']
        section = validated_data['section']

        if not daily_schedules:
            raise ValidationError("At least one daily schedule is required.")

        # Validate constraints
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

        # Create timetables and sessions
        day_of_week_map = {'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5}
        created_timetables = []
        for schedule in daily_schedules:
            timetable = Timetable.objects.create(
                section=section,
                teacher=teacher,
                subject=schedule['subject'],
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

        response_data = {
            'id': created_timetables[0].id,
            'section': section.id,
            'teacher': teacher.id,
            'daily_schedules': [
                {'day_of_week': s['day_of_week'], 'subject': s['subject'].id, 'start_time': s['start_time']}
                for s in daily_schedules
            ],
            'semester_start_date': validated_data['semester_start_date'].isoformat(),
            'semester_end_date': validated_data['semester_end_date'].isoformat()
        }
        return response_data






class TeacherViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [IsAuthenticated]

"""
@api_view(['GET'])
def teacher_info(request):
    try:
        teacher = Teacher.objects.get(user = request.user)
        token = request.headers.get('Authorization','').split(' ')[1]
        decoded = jwt.decode(token, options={"verify_signature": False})
        return Response({
            'name':f"{teacher.first_name} {teacher.last_name}",
            'last_login':request.user.last_login , 
            'token_expiry' : decoded.get('exp','Unknown'),
        })
    
    except Teacher.DoesNotExist:
        return Response({'detail' : 'Teacher not found'} ,  status = status.HTTP_404_NOT_FOUND )
    except Exception as e:
        return Response({'detail' : str(e)}, status = HTTP_500_INTERNAL_SERVER_ERROR)
"""


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
        # Return sessions for the logged-in teacher
        return Session.objects.filter(timetable__teacher__user=self.request.user).order_by('date')

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
                {'student_id': a.student.id, 'status': a.status} for a in existing_attendance
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
                Attendance.objects.update_or_create(
                    student=student,
                    session=session,
                    defaults={'status': entry['status'], 'recorded_by': teacher}
                )
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
    permission_classes = [IsAuthenticated]  # Add admin check later if needed

    def perform_create(self, serializer):
        holiday = serializer.save()
        # Cancel sessions on this date
        Session.objects.filter(date=holiday.date).update(status='Cancelled')



class AttendanceStatsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, roll_number):
        try:
            student = Student.objects.get(roll_number=roll_number)
            section = student.section
            # Get all sessions for the student’s section
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

            # Day-wise, Week-wise, Month-wise (example: month-wise)
            monthly_stats = Attendance.objects.filter(
                student=student, session__in=sessions
            ).extra(
                select={'month': "EXTRACT(MONTH FROM session_date)"}
            ).values('month').annotate(
                present=Count('id', filter=Q(status='Present')),
                absent=Count('id', filter=Q(status='Absent'))
            )

            # Consolidated display (e.g., "P P A P A")
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
                'consolidated': ' '.join(attendance_list[:5])  # First 5 lectures as example
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



# class MarkAttendanceView(generics.GenericAPIView):
#     serializer_class = AttendanceSerializer
#     permission_classes = [IsAuthenticated]

#     def get(self, request, session_id):
#         try:
#             session = Session.objects.get(id=session_id)
#             teacher = Teacher.objects.get(user=request.user)
#             if session.timetable.teacher != teacher:
#                 return Response({"error": "Not authorized to mark this session"}, status=status.HTTP_403_FORBIDDEN)

#             students = Student.objects.filter(section=session.timetable.section)
#             return Response({
#                 "session": SessionSerializer(session).data,
#                 "students": StudentSerializer(students, many=True).data
#             }, status=status.HTTP_200_OK)
#         except Session.DoesNotExist:
#             return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)
#         except Teacher.DoesNotExist:
#             return Response({"error": "Teacher not found"}, status=status.HTTP_404_NOT_FOUND)

#     def post(self, request, session_id):
#         try:
#             session = Session.objects.get(id=session_id)
#             teacher = Teacher.objects.get(user=request.user)
#             if session.timetable.teacher != teacher:
#                 return Response({"error": "Not authorized to mark this session"}, status=status.HTTP_403_FORBIDDEN)

#             attendance_data = request.data.get('attendance', [])
#             if not attendance_data:
#                 return Response({"error": "Attendance data required"}, status=status.HTTP_400_BAD_REQUEST)

#             for entry in attendance_data:
#                 student = Student.objects.get(id=entry['student_id'])
#                 if student.section != session.timetable.section:
#                     continue  # Skip students not in this section
#                 Attendance.objects.update_or_create(
#                     student=student,
#                     session=session,
#                     defaults={'status': entry['status'], 'recorded_by': teacher}
#                 )
#             session.status = 'Completed'
#             session.save()
#             return Response({"message": "Attendance marked successfully"}, status=status.HTTP_200_OK)
#         except Session.DoesNotExist:
#             return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)
#         except Student.DoesNotExist:
#             return Response({"error": "Invalid student ID"}, status=status.HTTP_400_BAD_REQUEST)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)      



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_sections(request):
    try:
        teacher = Teacher.objects.get(user=request.user)
        # Fetch sections where the teacher is assigned via timetables
        sections = Section.objects.filter(timetable__teacher=teacher).distinct()
        serializer = SectionSerializer(sections, many=True)
        return Response(serializer.data)
    except Teacher.DoesNotExist:
        logger.error(f"Teacher not found for user: {request.user}")
        return Response({"error": "Teacher not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error in get_sections: {str(e)}")
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
        semester = (section.year * 2 - 1) if start_date.month <= 6 else (section.year * 2)
        subjects = Subject.objects.filter(semester=semester)
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)
    except Section.DoesNotExist:
        return Response({"error": "Section not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error in get_subjects_for_section: {str(e)}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

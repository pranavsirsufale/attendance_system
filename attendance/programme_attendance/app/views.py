from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets, generics, status , serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.db.models import Count, Q
from datetime import datetime, timedelta
from .models import Session, Attendance, Teacher, Student, Subject, Timetable, CalendarException , Section
from .serializers import (
    SessionSerializer, AttendanceSerializer, TeacherSerializer, StudentSerializer,
    TimetableSerializer, CalendarExceptionSerializer , SubjectSerializer , SectionSerializer
)
import logging
import traceback
import sys




# Create your views here.
def home(request):
    return HttpResponse('hello world this is home')


class StudentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Optionally resistrict to studetns in teachers's section
        return Student.objects.filter(section__timetable__teacher__user = self.request.user ).distinct()


class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Restrict to logged-in teacher’s sessions
        return Session.objects.filter(timetable__teacher__user=self.request.user)

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(recorded_by=Teacher.objects.get(user=self.request.user))


logger = logging.getLogger(__name__)
logging.basicConfig(level = logging.DEBUG,format = '%(asctime)s %(levelname)s %(message)s', stream=sys.stdout)

# class TimetableViewSet(viewsets.ModelViewSet):
#     queryset = Timetable.objects.all()
#     serializer_class = TimetableSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         logger.debug("Fetching queryset for user: %s", self.request.user)
#         return Timetable.objects.filter(teacher__user=self.request.user)

#     def create(self, request, *args, **kwargs):
#         logger.debug("POST request received at /api/timetables/")
#         logger.debug("Request data: %s", request.data)

#         try:
#             serializer = self.get_serializer(data=request.data)
#             logger.debug("Serializer initialized")
#             serializer.is_valid(raise_exception=True)
#             logger.debug("Serializer validated: %s", serializer.validated_data)
#         except ValidationError as e:
#             logger.error("Serializer validation failed: %s", str(e))
#             return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
#         except Exception as e:
#             logger.error("Unexpected validation error: %s\n%s", str(e), traceback.format_exc())
#             return Response({"detail": f"Validation error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         try:
#             self.perform_create(serializer)
#             headers = self.get_success_headers(serializer.data)
#             logger.info("Timetable created successfully")
#             return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
#         except Exception as e:
#             logger.error("Error in perform_create: %s\n%s", str(e), traceback.format_exc())
#             return Response({"detail": f"Server error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     def perform_create(self, serializer):
#         logger.info("Starting perform_create")
#         validated_data = serializer.validated_data
#         logger.debug("Validated data: %s", validated_data)

#         try:
#             teacher = Teacher.objects.get(user=self.request.user)
#             logger.info("Teacher found: %s (user: %s)", teacher.id, self.request.user.username)
#         except Teacher.DoesNotExist:
#             logger.error("No teacher found for user: %s", self.request.user.username)
#             raise ValidationError("No teacher profile found for this user.")

#         daily_schedules = validated_data.pop('daily_schedules', [])
#         section = validated_data['section']
#         logger.info("Section: %s, Daily Schedules: %s", section.id, daily_schedules)

#         if not daily_schedules:
#             logger.error("No daily schedules provided")
#             raise ValidationError("At least one daily schedule is required.")

#         # Validate 5 lectures per day and teacher availability
#         for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']:
#             existing = Timetable.objects.filter(section=section, day_of_week=day).count()
#             new_for_day = len([s for s in daily_schedules if s['day_of_week'] == day])
#             logger.debug("Checking %s: existing=%d, new=%d", day, existing, new_for_day)
#             if existing + new_for_day > 5:
#                 logger.error("Too many lectures on %s: %d + %d > 5", day, existing, new_for_day)
#                 raise ValidationError(f"Cannot schedule more than 5 lectures on {day} for this section.")
#             for schedule in [s for s in daily_schedules if s['day_of_week'] == day]:
#                 if Timetable.objects.filter(
#                     teacher=teacher,
#                     day_of_week=day,
#                     start_time=schedule['start_time'],
#                     semester_start_date=validated_data['semester_start_date'],
#                     semester_end_date=validated_data['semester_end_date']
#                 ).exists():
#                     logger.error("Teacher conflict on %s at %s", day, schedule['start_time'])
#                     raise ValidationError(f"Teacher already scheduled on {day} at {schedule['start_time']} for this semester.")

#         # Create timetables and sessions
#         day_of_week_map = {'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5}
#         created_timetables = []
#         for schedule in daily_schedules:
#             logger.info("Creating timetable for %s with subject %s", schedule['day_of_week'], schedule['subject'].id)
#             timetable = Timetable.objects.create(
#                 section=section,
#                 teacher=teacher,
#                 day_of_week=schedule['day_of_week'],
#                 subject=schedule['subject'],
#                 start_time=schedule['start_time'],
#                 semester_start_date=validated_data['semester_start_date'],
#                 semester_end_date=validated_data['semester_end_date']
#             )
#             created_timetables.append(timetable)
#             start_date = validated_data['semester_start_date']
#             end_date = validated_data['semester_end_date']
#             current_date = start_date
#             target_day = day_of_week_map[timetable.day_of_week]

#             logger.debug("Generating sessions from %s to %s", start_date, end_date)
#             while current_date <= end_date:
#                 if current_date.weekday() == target_day:
#                     Session.objects.get_or_create(
#                         timetable=timetable,
#                         date=current_date,
#                         defaults={'status': 'Scheduled'}
#                     )
#                 current_date += timedelta(days=1)
#             logger.info("Finished generating sessions for %s", timetable.day_of_week)

#         # Save the serializer with teacher set
#         validated_data['teacher'] = teacher
#         serializer.save(**validated_data)


class TimetableViewSet(viewsets.ModelViewSet):
    queryset = Timetable.objects.all()
    serializer_class = TimetableSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        logger.debug("Fetching queryset for user: %s", self.request.user)
        return Timetable.objects.filter(teacher__user=self.request.user)

    def create(self, request, *args, **kwargs):
        logger.debug("POST request received at /api/timetables/")
        logger.debug("Request data: %s", request.data)

        try:
            serializer = self.get_serializer(data=request.data)
            logger.debug("Serializer initialized")
            serializer.is_valid(raise_exception=True)
            logger.debug("Serializer validated: %s", serializer.validated_data)
        except ValidationError as e:
            logger.error("Serializer validation failed: %s", str(e))
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error("Unexpected validation error: %s\n%s", str(e), traceback.format_exc())
            return Response({"detail": f"Validation error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            timetable = self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            logger.info("Timetable created successfully")
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            logger.error("Error in perform_create: %s\n%s", str(e), traceback.format_exc())
            return Response({"detail": f"Server error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def perform_create(self, serializer):
        logger.info("Starting perform_create")
        validated_data = serializer.validated_data
        logger.debug("Validated data: %s", validated_data)

        try:
            teacher = Teacher.objects.get(user=self.request.user)
            logger.info("Teacher found: %s (user: %s)", teacher.id, self.request.user.username)
        except Teacher.DoesNotExist:
            logger.error("No teacher found for user: %s", self.request.user.username)
            raise ValidationError("No teacher profile found for this user.")

        daily_schedules = validated_data.pop('daily_schedules', [])
        section = validated_data['section']
        logger.info("Section: %s, Daily Schedules: %s", section.id, daily_schedules)

        if not daily_schedules:
            logger.error("No daily schedules provided")
            raise ValidationError("At least one daily schedule is required.")

        # Validate 5 lectures per day and teacher availability
        for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']:
            existing = Timetable.objects.filter(section=section, day_of_week=day).count()
            new_for_day = len([s for s in daily_schedules if s['day_of_week'] == day])
            logger.debug("Checking %s: existing=%d, new=%d", day, existing, new_for_day)
            if existing + new_for_day > 5:
                logger.error("Too many lectures on %s: %d + %d > 5", day, existing, new_for_day)
                raise ValidationError(f"Cannot schedule more than 5 lectures on {day} for this section.")
            for schedule in [s for s in daily_schedules if s['day_of_week'] == day]:
                if Timetable.objects.filter(
                    teacher=teacher,
                    day_of_week=day,
                    start_time=schedule['start_time'],
                    semester_start_date=validated_data['semester_start_date'],
                    semester_end_date=validated_data['semester_end_date']
                ).exists():
                    logger.error("Teacher conflict on %s at %s", day, schedule['start_time'])
                    raise ValidationError(f"Teacher already scheduled on {day} at {schedule['start_time']} for this semester.")

        # Create timetables and sessions
        day_of_week_map = {'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5}
        created_timetables = []
        for schedule in daily_schedules:
            logger.info("Creating timetable for %s with subject %s", schedule['day_of_week'], schedule['subject'].id)
            timetable = Timetable.objects.create(
                section=section,
                teacher=teacher,
                day_of_week=schedule['day_of_week'],
                subject=schedule['subject'],
                start_time=schedule['start_time'],
                semester_start_date=validated_data['semester_start_date'],
                semester_end_date=validated_data['semester_end_date']
            )
            created_timetables.append(timetable)
            start_date = validated_data['semester_start_date']
            end_date = validated_data['semester_end_date']
            current_date = start_date
            target_day = day_of_week_map[timetable.day_of_week]

            logger.debug("Generating sessions from %s to %s", start_date, end_date)
            while current_date <= end_date:
                if current_date.weekday() == target_day:
                    Session.objects.get_or_create(
                        timetable=timetable,
                        date=current_date,
                        defaults={'status': 'Scheduled'}
                    )
                current_date += timedelta(days=1)
            logger.info("Finished generating sessions for %s", timetable.day_of_week)

        # Update serializer data with the first timetable for response
        serializer.validated_data.update({
            'id': created_timetables[0].id,
            'teacher': teacher,
        })
        return created_timetables[0]



class TeacherCalendarView(generics.ListAPIView):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return sessions for the logged-in teacher
        return Session.objects.filter(timetable__teacher__user=self.request.user).order_by('date')

class MarkAttendanceView(generics.GenericAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, session_id):
        try:
            session = Session.objects.get(id=session_id)
            teacher = Teacher.objects.get(user=request.user)
            if session.timetable.teacher != teacher:
                return Response({"error": "Not authorized to mark this session"}, status=status.HTTP_403_FORBIDDEN)

            # Expecting payload: [{"student_id": 1, "status": "Present"}, ...]
            attendance_data = request.data.get('attendance', [])
            for entry in attendance_data:
                student = Student.objects.get(id=entry['student_id'])
                # Only students in the section can be marked
                if student.section != session.timetable.section:
                    continue
                Attendance.objects.update_or_create(
                    student=student,
                    session=session,
                    defaults={'status': entry['status'], 'recorded_by': teacher}
                )
            session.status = 'Completed'
            session.save()
            return Response({"message": "Attendance marked successfully"}, status=status.HTTP_200_OK)
        except Session.DoesNotExist:
            return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)
        except Student.DoesNotExist:
            return Response({"error": "Invalid student ID"}, status=status.HTTP_400_BAD_REQUEST)

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



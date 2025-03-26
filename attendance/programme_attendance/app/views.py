from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count, Q
from datetime import datetime, timedelta
from .models import Session, Attendance, Teacher, Student, Subject, Timetable, CalendarException
from .serializers import (
    SessionSerializer, AttendanceSerializer, TeacherSerializer, StudentSerializer,
    TimetableSerializer, CalendarExceptionSerializer
)


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

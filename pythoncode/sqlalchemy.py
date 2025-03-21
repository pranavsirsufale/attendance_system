from sqlalchemy import Column, Integer, String, Enum, Time, Date, DateTime, ForeignKey, UniqueConstraint, CheckConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base = declarative_base()



from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# MySQL connection (replace credentials)
engine = create_engine('mysql+pymysql://root:your_password@localhost/ams')
Base.metadata.create_all(engine)  # Creates tables if they don’t exist

# Create a session
Session = sessionmaker(bind=engine)
db_session = Session()

class Teacher(Base):
    __tablename__ = 'teachers'

    teacher_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    phone = Column(String(15))
    pass_field = Column(String(255), nullable=False)  # Rename to avoid Python keyword 'pass'

    # Relationships
    subjects = relationship("Subject", back_populates="teacher")
    attendance_records = relationship("Attendance", back_populates="recorded_by")

    def __repr__(self):
        return f"<Teacher(id={self.teacher_id}, name={self.first_name} {self.last_name})>"

class Student(Base):
    __tablename__ = 'students'

    student_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    roll_number = Column(String(20), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    phone = Column(String(15))

    # Relationships
    attendance = relationship("Attendance", back_populates="student")
    subjects = relationship("Subject", secondary="student_subject", back_populates="students")

    def __repr__(self):
        return f"<Student(id={self.student_id}, roll_number={self.roll_number})>"

class Subject(Base):
    __tablename__ = 'subjects'

    subject_id = Column(Integer, primary_key=True, autoincrement=True)
    subject_name = Column(String(100), nullable=False)
    teacher_id = Column(Integer, ForeignKey('teachers.teacher_id', ondelete='SET NULL'))

    # Relationships
    teacher = relationship("Teacher", back_populates="subjects")
    timetable = relationship("Timetable", back_populates="subject")
    students = relationship("Student", secondary="student_subject", back_populates="subjects")

    def __repr__(self):
        return f"<Subject(id={self.subject_id}, name={self.subject_name})>"

class Timetable(Base):
    __tablename__ = 'timetable'

    timetable_id = Column(Integer, primary_key=True, autoincrement=True)
    subject_id = Column(Integer, ForeignKey('subjects.subject_id', ondelete='CASCADE'), nullable=False)
    day_of_week = Column(Enum('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    room = Column(String(50))
    semester_start_date = Column(Date, nullable=False)
    semester_end_date = Column(Date, nullable=False)

    # Constraints
    __table_args__ = (
        UniqueConstraint('subject_id', 'day_of_week', 'start_time', name='uq_subject_day_time'),
        CheckConstraint('start_time < end_time', name='chk_time_range'),
    )

    # Relationships
    subject = relationship("Subject", back_populates="timetable")
    sessions = relationship("Session", back_populates="timetable")

    def __repr__(self):
        return f"<Timetable(id={self.timetable_id}, subject_id={self.subject_id})>"

class Session(Base):
    __tablename__ = 'sessions'

    session_id = Column(Integer, primary_key=True, autoincrement=True)
    timetable_id = Column(Integer, ForeignKey('timetable.timetable_id', ondelete='CASCADE'), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(Enum('Scheduled', 'Completed', 'Cancelled'), default='Scheduled', nullable=False)

    # Constraints
    __table_args__ = (
        UniqueConstraint('timetable_id', 'date', name='uq_timetable_date'),
    )

    # Relationships
    timetable = relationship("Timetable", back_populates="sessions")
    attendance = relationship("Attendance", back_populates="session")

    def __repr__(self):
        return f"<Session(id={self.session_id}, date={self.date}, status={self.status})>"

class Attendance(Base):
    __tablename__ = 'attendance'

    attendance_id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(Integer, ForeignKey('students.student_id', ondelete='CASCADE'), nullable=False)
    session_id = Column(Integer, ForeignKey('sessions.session_id', ondelete='CASCADE'), nullable=False)
    status = Column(Enum('Present', 'Absent', 'Late'), default=None)
    timestamp = Column(DateTime, server_default=func.current_timestamp(), onupdate=func.current_timestamp())
    recorded_by_id = Column(Integer, ForeignKey('teachers.teacher_id', ondelete='SET NULL'))

    # Constraints
    __table_args__ = (
        UniqueConstraint('student_id', 'session_id', name='uq_student_session'),
    )

    # Relationships
    student = relationship("Student", back_populates="attendance")
    session = relationship("Session", back_populates="attendance")
    recorded_by = relationship("Teacher", back_populates="attendance_records")

    def __repr__(self):
        return f"<Attendance(id={self.attendance_id}, student_id={self.student_id}, status={self.status})>"

class StudentSubject(Base):
    __tablename__ = 'student_subject'

    student_id = Column(Integer, ForeignKey('students.student_id', ondelete='CASCADE'), primary_key=True)
    subject_id = Column(Integer, ForeignKey('subjects.subject_id', ondelete='CASCADE'), primary_key=True)

    def __repr__(self):
        return f"<StudentSubject(student_id={self.student_id}, subject_id={self.subject_id})>"

class CalendarException(Base):
    __tablename__ = 'calendar_exceptions'

    exception_id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date, unique=True, nullable=False)
    description = Column(String(100))

    def __repr__(self):
        return f"<CalendarException(id={self.exception_id}, date={self.date})>"
# django directory /app/management/commands/see_data.py
'''
this data has been seeded which is subject data total 80 subjects has been seeded
from django.core.management import BaseCommand
from app.models import Program , Section , Subject

class Command(BaseCommand):
    help = 'Seeds initial data for AMS'

    def handle(self,*args,**kwargs):
        # Program
        ballb = Program.objects.get_or_create(name = 'BALLB 5 Yr', duration_years = 5)[0]
        llb = Program.objects.get_or_create(name = 'LLB 3 Yr' , duration_years = 3)[0]

        # Section 
        Section.objects.get_or_create(program = ballb , name = 'Section A'  , year = 1)
        Section.objects.get_or_create(program = ballb , name = 'Section B' , year = 1)

        Section.objects.get_or_create(program = llb , name = 'Section A', year = 1)
        Section.objects.get_or_create(program = llb , name = 'Section B', year = 1 )

        for year in range(2,6):
            Section.objects.get_or_create(program = ballb , name = 'Section A' , year = year)
        for year in range(2,4):
            Section.objects.get_or_create(program = llb , name = 'Section A', year = year)

        
        # Subjects (BALLB - 5 Years)
        ballb_subjects = [
            # Semester I
            ("Political Science I", False, 1), ("Microeconomics I", False, 1), ("Sociology I", False, 1),
            ("General English", False, 1), ("Local Language/Foreign Language", False, 1), ("Legal Development", False, 1),
            
            # Semester II
            ("Political Theory II", False, 2), ("Macroeconomics II", False, 2), ("Sociology II", False, 2),
            ("Constitutional Development", False, 2),
            
            # Semester III
            ("Law and Literature", False, 3), ("Foundations of Political Obligations", False, 3), 
            ("Indian Economy", False, 3), ("Urban, Rural & Tribal Sociology of India", False, 3),
            ("Constitutional Law I", True, 3),
            
            # Semester IV
            ("Legal Language and Legal Writing", False, 4), ("International Relations and Obligations", False, 4), 
            ("Economic Policies", False, 4), ("Contemporary Issues of Sociology", False, 4),
            ("Constitutional Law II", True, 4),
            
            # Semester V (Law subjects start dominating)
            ("Local Self Government", False, 5), ("Jurisprudence", True, 5), ("Torts & Consumer Protection Act", True, 5),
            ("Family Law I", True, 5), ("Law of Contract I", True, 5), ("Banking Law & Negotiable Instruments Act", True, 5),
            
            # Semester VI
            ("Principles of Public Administration", False, 6), ("Family Law II", True, 6), 
            ("Law of Contract II", True, 6), ("Social Research Methods", False, 6),
            
            # Semester VII
            ("Bhartiya Nyaya Sanhita", True, 7), ("Property Law and Easement Act", True, 7), ("Labour Law I", True, 7), 
            ("Administrative Law", True, 7), ("Professional Ethics", True, 7),
            
            # Semester VIII
            ("Bharatiya Nagarik Suraksha Sanhita", True, 8), ("Company Law", True, 8), ("Labour Law II", True, 8),
            ("Interpretation of Statutes", True, 8), ("Alternative Dispute Resolution (ADR)", True, 8),
            
            # Semester IX
            ("Bharatiya Sakshya Adhiniyam", True, 9), ("Civil Procedure Code & Limitation Act", True, 9),
            ("Principles of Taxation", True, 9), ("Environmental Law", True, 9), ("Land Laws", True, 9),
            ("Drafting, Pleading & Conveyance", True, 9),
            
            # Semester X
            ("Intellectual Property Law", True, 10), ("Public International Law", True, 10),
            ("Insurance Law", True, 10), ("Moot Court & Clinical Legal Education", True, 10),
        ]

        # Subjects (LLB - 3 Years)
        llb_subjects = [
            # Semester I
            ("Law of Contract I", True, 1), ("Constitutional Law I", True, 1), 
            ("Torts & Consumer Protection Act", True, 1), ("Jurisprudence", True, 1), ("Family Law I", True, 1),
            ("Banking Law & Negotiable Instruments Act", True, 1),
            
            # Semester II
            ("Law of Contract II", True, 2), ("Constitutional Law II", True, 2),
            ("Family Law II", True, 2), ("Motor Vehicle Act", True, 2), ("Social Research Methods", False, 2),
            
            # Semester III
            ("Bhartiya Nyaya Sanhita", True, 3), ("Property Law and Easement Act", True, 3),
            ("Labour Law I", True, 3), ("Administrative Law", True, 3), ("Professional Ethics", True, 3),
            
            # Semester IV
            ("Bharatiya Nagarik Suraksha Sanhita", True, 4), ("Company Law", True, 4),
            ("Labour Law II", True, 4), ("Interpretation of Statutes", True, 4), ("ADR (Clinical Legal Education)", True, 4),
            
            # Semester V
            ("Bharatiya Sakshya Adhiniyam", True, 5), ("Civil Procedure Code & Limitation Act", True, 5),
            ("Principles of Taxation", True, 5), ("Environmental Law", True, 5), ("Land Laws", True, 5),
            ("Drafting, Pleading & Conveyance", True, 5),
            
            # Semester VI
            ("Intellectual Property Law", True, 6), ("Public International Law", True, 6),
            ("Insurance Law", True, 6), ("Moot Court & Clinical Legal Education", True, 6),
        ]


        for name , is_law , semester in ballb_subjects:
            Subject.objects.get_or_create(name = name , is_law_subject = is_law , semester = semester)
        
        for name , is_law ,semester in llb_subjects:
            Subject.objects.get_or_create(name = name , is_law_subject = is_law , semester = semester)

        
        self.stdout.write(self.style.SUCCESS('Data seeded successfully'))
'''


#### *********** SEED DATA WITH SEMESTER -WISE SUBJECTS

#?? the direcotry should be app/management/commands/see_data.py
from django.core.management.base import BaseCommand
from app.models import Program , Section , Subject, Student , Teacher
from django.contrib.auth.models import User 


class Command(BaseCommand):
    help = "Seeds initial data for AMS"

    def handle(self,*args,**kwargs):
        # program 
        # Programs
        ballb = Program.objects.get_or_create(name="BALLB 5 Yr", duration_years=5)[0]
        llb = Program.objects.get_or_create(name="LLB 3 Yr", duration_years=3)[0]

        # Sections
        ballb_sections = []
        llb_sections = []
        for year in range(1, 6):
            if year == 1:
                ballb_sections.extend([
                    Section.objects.get_or_create(program=ballb, name="Section A", year=year)[0],
                    Section.objects.get_or_create(program=ballb, name="Section B", year=year)[0],
                ])
            else:
                ballb_sections.append(Section.objects.get_or_create(program=ballb, name="Section A", year=year)[0])
        for year in range(1, 4):
            if year == 1:
                llb_sections.extend([
                    Section.objects.get_or_create(program=llb, name="Section A", year=year)[0],
                    Section.objects.get_or_create(program=llb, name="Section B", year=year)[0],
                ])
            else:
                llb_sections.append(Section.objects.get_or_create(program=llb, name="Section A", year=year)[0])
        
        # Teachers
        teachers = [
            ('teacher1' , 'teacher' , 'one' ,'one@gmail.com'),
            ('teacher2' , 'teacher' , 'two' ,'two@gmail.com'),
            ('teacher3' , 'teacher' , 'three' ,'three@gmail.com'),
            ('teacher4' , 'teacher' , 'four' ,'four@gmail.com'),
            ('teacher5' , 'teacher' , 'five' ,'five@gmail.com'),
            ('teacher6' , 'teacher' , 'six' ,'six@gmail.com'),
            ('teacher7' , 'teacher' , 'seven' ,'seven@gmail.com'),
            ('teacher8' , 'teacher' , 'eight' ,'eight@gmail.com'),
            ('teacher9' , 'teacher' , 'nine' ,'nine@gmail.com'),
            ('teacher10' , 'teacher' , 'ten' ,'ten@gmail.com'),
        ]

        for username , fname , lname , email in teachers:
            user , _ = User.objects.get_or_create(username , username ,defaults= {'email' : email} )
            if not user.has_usable_password():
                user.set_password('password')
                user.save()
            Teacher.objects.get_or_create(user = user , first_name = fname, last_name = lname , email = email  )


        
        # students >>>
        students = [
            ("G240001", "Aarav", "Sharma", "aarav.sharma@example.com", "9876543210", ballb_sections[0]),
            ("G240002", "Ishita", "Verma", "ishita.verma@example.com", "9876543211", ballb_sections[1]),
            ("G240003", "Rohan", "Iyer", "rohan.iyer@example.com", "9876543212", ballb_sections[0]),
            ("G240004", "Priya", "Chopra", "priya.chopra@example.com", "9876543213", ballb_sections[1]),
            ("G240005", "Vivaan", "Malhotra", "vivaan.malhotra@example.com", "9876543214", ballb_sections[0]),
            ("G240006", "Aditya", "Kapoor", "aditya.kapoor@example.com", "9876543215", ballb_sections[1]),
            ("G240007", "Kabir", "Menon", "kabir.menon@example.com", "9876543216", ballb_sections[0]),
            ("G240008", "Swati", "Bose", "swati.bose@example.com", "9876543217", ballb_sections[1]),
            ("G240009", "Ananya", "Chopra", "ananya.chopra@example.com", "9876543218", ballb_sections[0]),
            ("G240010", "Dev", "Iyer", "dev.iyer@example.com", "9876543219", ballb_sections[1]),
            ("G240011", "Harsh", "Verma", "harsh.verma@example.com", "9876543220", ballb_sections[0]),
            ("G240012", "Ritika", "Patel", "ritika.patel@example.com", "9876543221", ballb_sections[1]),
            ("G240013", "Pooja", "Singh", "pooja.singh@example.com", "9876543222", ballb_sections[0]),
            ("G240014", "Tanya", "Kapoor", "tanya.kapoor@example.com", "9876543223", ballb_sections[1]),
            ("G240015", "Simran", "Sharma", "simran.sharma@example.com", "9876543224", ballb_sections[0]),
            ("G240016", "Vikram", "Malhotra", "vikram.malhotra@example.com", "9876543225", ballb_sections[1]),
            ("G240017", "Neha", "Bose", "neha.bose@example.com", "9876543226", ballb_sections[0]),
            ("G240018", "Ishaan", "Menon", "ishaan.menon@example.com", "9876543227", ballb_sections[1]),
            ("G240019", "Arjun", "Chopra", "arjun.chopra@example.com", "9876543228", ballb_sections[0]),
            ("G240020", "Devika", "Patel", "devika.patel@example.com", "9876543229", ballb_sections[1]),

            ("NG240001", "Aarav", "Kapoor", "aarav.kapoor@example.com", "9876543230", llb_sections[0]),
            ("NG240002", "Rohan", "Bose", "rohan.bose@example.com", "9876543231", llb_sections[1]),
            ("NG240003", "Vivaan", "Singh", "vivaan.singh@example.com", "9876543232", llb_sections[0]),
            ("NG240004", "Kabir", "Malhotra", "kabir.malhotra@example.com", "9876543233", llb_sections[1]),
            ("NG240005", "Neha", "Sharma", "neha.sharma@example.com", "9876543234", llb_sections[0]),
            ("NG240006", "Ananya", "Patel", "ananya.patel@example.com", "9876543235", llb_sections[1]),
            ("NG240007", "Dev", "Chopra", "dev.chopra@example.com", "9876543236", llb_sections[0]),
            ("NG240008", "Swati", "Iyer", "swati.iyer@example.com", "9876543237", llb_sections[1]),
            ("NG240009", "Harsh", "Verma", "harsh.verma@example.com", "9876543238", llb_sections[0]),
            ("NG240010", "Pooja", "Menon", "pooja.menon@example.com", "9876543239", llb_sections[1]),
            ("NG240011", "Ishita", "Sharma", "ishita.sharma@example.com", "9876543240", llb_sections[0]),
            ("NG240012", "Simran", "Kapoor", "simran.kapoor@example.com", "9876543241", llb_sections[1]),
            ("NG240013", "Tanya", "Bose", "tanya.bose@example.com", "9876543242", llb_sections[0]),
            ("NG240014", "Ritika", "Chopra", "ritika.chopra@example.com", "9876543243", llb_sections[1]),
            ("NG240015", "Vikram", "Patel", "vikram.patel@example.com", "9876543244", llb_sections[0]),
            ("NG240016", "Ishaan", "Menon", "ishaan.menon@example.com", "9876543245", llb_sections[1]),
            ("NG240017", "Priya", "Malhotra", "priya.malhotra@example.com", "9876543246", llb_sections[0]),
            ("NG240018", "Aditya", "Singh", "aditya.singh@example.com", "9876543247", llb_sections[1]),
            ("NG240019", "Devika", "Verma", "devika.verma@example.com", "9876543248", llb_sections[0]),
            ("NG240020", "Arjun", "Iyer", "arjun.iyer@example.com", "9876543249", llb_sections[1]),
        ]

        for roll , fname, lname , email , phone , section in students :
            student , _ = Student.objects.get_or_create(
                roll_number = roll , first_name = fname , last_name = lname ,email = email ,phone = phone , section = section

            )
            student.subjects.set(Subject.objects.filter(semester=section.year))
        self.stdout.write(self.style.SUCCESS('Data seeded successfully'))


# Extend this list similarly to reach 150-200 students.


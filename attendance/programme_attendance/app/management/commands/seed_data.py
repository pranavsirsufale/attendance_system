# django directory /app/management/commands/see_data.py

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



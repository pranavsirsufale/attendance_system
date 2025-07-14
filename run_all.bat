@REM @echo off
@REM REM Start Django backend
@REM start "" cmd /k "att\Scripts\activate && cd programme_attendance &&   python.exe manage.py runserver "
@REM REM Start React frontend
@REM start "" cmd /c "cd frontend && npm run dev"



@echo off
REM Start Django backend (minimized)
start /min "" cmd /k "att\Scripts\activate && cd programme_attendance && python.exe manage.py runserver"

REM Start React frontend (minimized)
start /min "" cmd /c "cd frontend && npm run dev"

REM Wait a few seconds for servers to start (adjust as needed)
timeout /t 5 /nobreak >nul

REM Open the frontend website in the default browser
start "" http://localhost:5173/
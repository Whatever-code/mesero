Set WshShell = CreateObject("WScript.Shell")

WshShell.Run chr(34) & "backend.bat" & Chr(34), 0
WshShell.Run chr(34) & "frontend.bat" & Chr(34), 0

Set WshShell = Nothing
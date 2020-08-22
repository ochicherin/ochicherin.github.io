for /f "tokens=*" %%i in ('dir /b /o:n *.html') do (
powershell /nologo /noprofile /command "get-content -encoding string '%%i'|out-file -encoding UTF8 'temp.bak'"
move /y temp.bak %%i
echo  ^"%%i^"
)
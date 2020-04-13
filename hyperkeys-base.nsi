# name the installer
OutFile "hyperkeys-install-${platform}.exe"

Name "Hyperkeys"

;Include Modern UI
!include "MUI.nsh"

!include x64.nsh
 
;--------------------------------
;Pages
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
;--------------------------------
;Languages
!insertmacro MUI_LANGUAGE "English"
;--------------------------------

Function .onInit
	${If} ${platform} == "x64"
		StrCpy $INSTDIR "$PROGRAMFILES64\Hyperkeys"
	${Else}
		StrCpy $INSTDIR "$PROGRAMFILES\Hyperkeys"
	${EndIf}
FunctionEnd

OutFile distr/hyperkeys-win32-${platform}.exe

# default section start; every NSIS script has at least one section.
Section
	# define output path
	SetOutPath $INSTDIR
	
	# specify file to go in output path
	File /r distr/hyperkeys-win32-${platform}/*

	# define uninstaller name
	WriteUninstaller $INSTDIR\uninstaller.exe

	# Start Menu
    createDirectory "$SMPROGRAMS\Hyperkeys"
    createShortCut "$SMPROGRAMS\Hyperkeys\Hyperkeys.lnk" "$INSTDIR\hyperkeys.exe" "" "$INSTDIR\resources\app\icon.ico"
    createShortCut "$SMPROGRAMS\Hyperkeys\Uninstall.lnk" "$INSTDIR\uninstaller.exe"
	 
	# default section end
SectionEnd
;-------------------------------------------------------------------------------

# create a section to define what the uninstaller does.
# the section will always be named "Uninstall"
Section "Uninstall"
 
	# Always delete uninstaller first
	Delete $INSTDIR\uninstaller.exe
	 
	# now delete installed files
	RMDir /r /REBOOTOK $INSTDIR

SectionEnd

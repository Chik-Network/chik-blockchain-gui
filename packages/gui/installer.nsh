!include "nsDialogs.nsh"

; Add our customizations to the finish page
!macro customFinishPage
XPStyle on

Var DetectDlg
Var FinishDlg
Var ChikSquirrelInstallLocation
Var ChikSquirrelInstallVersion
Var ChikSquirrelUninstaller
Var CheckboxUninstall
Var CheckboxLaunchOnExit
Var LaunchOnExit
Var UninstallChikSquirrelInstall
Var BackButton
Var NextButton

Page custom detectOldChikVersion detectOldChikVersionPageLeave
Page custom finish finishLeave

; Add a page offering to uninstall an older build installed into the chik-blockchain dir
Function detectOldChikVersion
  ; Check the registry for old chik-blockchain installer keys
  ReadRegStr $ChikSquirrelInstallLocation HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\chik-blockchain" "InstallLocation"
  ReadRegStr $ChikSquirrelInstallVersion HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\chik-blockchain" "DisplayVersion"
  ReadRegStr $ChikSquirrelUninstaller HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\chik-blockchain" "QuietUninstallString"

  StrCpy $UninstallChikSquirrelInstall ${BST_UNCHECKED} ; Initialize to unchecked so that a silent install skips uninstalling

  ; If registry keys aren't found, skip (Abort) this page and move forward
  ${If} ChikSquirrelInstallVersion == error
  ${OrIf} ChikSquirrelInstallLocation == error
  ${OrIf} $ChikSquirrelUninstaller == error
  ${OrIf} $ChikSquirrelInstallVersion == ""
  ${OrIf} $ChikSquirrelInstallLocation == ""
  ${OrIf} $ChikSquirrelUninstaller == ""
  ${OrIf} ${Silent}
    Abort
  ${EndIf}

  ; Check the uninstall checkbox by default
  StrCpy $UninstallChikSquirrelInstall ${BST_CHECKED}

  ; Magic create dialog incantation
  nsDialogs::Create 1018
  Pop $DetectDlg

  ${If} $DetectDlg == error
    Abort
  ${EndIf}

  !insertmacro MUI_HEADER_TEXT "Uninstall Old Version" "Would you like to uninstall the old version of Chik Blockchain?"

  ${NSD_CreateLabel} 0 35 100% 12u "Found Chik Blockchain $ChikSquirrelInstallVersion installed in an old location:"
  ${NSD_CreateLabel} 12 57 100% 12u "$ChikSquirrelInstallLocation"

  ${NSD_CreateCheckBox} 12 81 100% 12u "Uninstall Chik Blockchain $ChikSquirrelInstallVersion"
  Pop $CheckboxUninstall
  ${NSD_SetState} $CheckboxUninstall $UninstallChikSquirrelInstall
  ${NSD_OnClick} $CheckboxUninstall SetUninstall

  nsDialogs::Show

FunctionEnd

Function SetUninstall
  ; Set UninstallChikSquirrelInstall accordingly
  ${NSD_GetState} $CheckboxUninstall $UninstallChikSquirrelInstall
FunctionEnd

Function detectOldChikVersionPageLeave
  ${If} $UninstallChikSquirrelInstall == 1
    ; This could be improved... Experiments with adding an indeterminate progress bar (PBM_SETMARQUEE)
    ; were unsatisfactory.
    ExecWait $ChikSquirrelUninstaller ; Blocks until complete (doesn't take long though)
  ${EndIf}
FunctionEnd

Function finish

  ; Magic create dialog incantation
  nsDialogs::Create 1018
  Pop $FinishDlg

  ${If} $FinishDlg == error
    Abort
  ${EndIf}

  ${NSD_CreateCheckbox} 0 50% 100% 10% "Launch Chik"
  Pop $CheckboxLaunchOnExit
  ${NSD_SetState} $CheckboxLaunchOnExit ${BST_CHECKED}
  ${NSD_OnClick} $CheckboxLaunchOnExit SetLaunchOnExit
  StrCpy $LaunchOnExit 1

  GetDlgItem $NextButton $HWNDPARENT 1 ; 1 = Next button
  GetDlgItem $BackButton $HWNDPARENT 3 ; 3 = Back button

  ${NSD_CreateLabel} 0 35 100% 12u "Chik has been installed successfully!"
  EnableWindow $BackButton 0 ; Disable the Back button
  SendMessage $NextButton ${WM_SETTEXT} 0 "STR:Finish" ; Button title is "Close" by default. Update it here.

  nsDialogs::Show

FunctionEnd

Function SetLaunchOnExit
  ; Set LaunchOnExit accordingly
  ${NSD_GetState} $CheckboxLaunchOnExit $LaunchOnExit
FunctionEnd

; Copied from electron-builder NSIS templates
Function StartApp
  ${if} ${isUpdated}
    StrCpy $1 "--updated"
  ${else}
    StrCpy $1 ""
  ${endif}
  ${StdUtils.ExecShellAsUser} $0 "$launchLink" "open" "$1"
FunctionEnd

Function finishLeave
  ; Launch the app at exit
  ${If} $LaunchOnExit == 1
    Call StartApp
  ${EndIf}
FunctionEnd

; Section
; SectionEnd
!macroend

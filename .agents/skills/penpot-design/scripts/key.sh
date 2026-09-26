#!/bin/sh
# Sends Cmd+<key> to the browser running Penpot, only if it is frontmost.
# usage: key.sh x|v [app]   (app defaults to "zen")
APP="${2:-zen}"
osascript <<OSA
tell application "$APP" to activate
delay 0.4
tell application "System Events"
  set fa to name of first application process whose frontmost is true
  if fa is not "$APP" then error "front app is " & fa
  keystroke "$1" using command down
end tell
OSA

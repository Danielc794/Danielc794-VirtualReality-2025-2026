#!/usr/bin/env bash
set -euo pipefail

# Wrapper to run main.py headless and convert the EPS output to PNG.
# Usage: ./run_headless.sh

SCRIPT="main.py"
EPS="drawing.eps"
PNG="drawing.png"

command -v xvfb-run >/dev/null 2>&1 || {
  echo "xvfb-run not found. Install Xvfb first (e.g. sudo apt install xvfb)." >&2
  exit 1
}

echo "Running ${SCRIPT} under Xvfb..."
xvfb-run -s "-screen 0 1024x768x24" python3 "${SCRIPT}"

if [ -f "${EPS}" ]; then
  command -v gs >/dev/null 2>&1 || {
    echo "ghostscript (gs) not found. Install with: sudo apt install ghostscript" >&2
    exit 1
  }
  echo "Converting ${EPS} -> ${PNG}"
  gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=pngalpha -r150 -sOutputFile="${PNG}" "${EPS}"
  echo "Wrote ${PNG}"
else
  echo "${EPS} not found after run; main.py may have failed." >&2
  exit 2
fi

echo "Done."

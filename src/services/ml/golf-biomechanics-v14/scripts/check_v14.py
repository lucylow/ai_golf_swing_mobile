
from pathlib import Path
import subprocess, sys
root=Path(__file__).resolve().parents[1]
subprocess.check_call(['tsc','-p',str(root/'tsconfig.v14.json')])
print('V14 TypeScript compile: PASS')

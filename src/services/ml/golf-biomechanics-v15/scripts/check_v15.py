from pathlib import Path
import re
root=Path(__file__).parents[1]/"src"
files=list(root.rglob("*.ts"))+list(root.rglob("*.tsx"))
errors=[]
pat=re.compile(r"from [\"'](\.[^\"']+)[\"']")
for p in files:
    text=p.read_text()
    if text.count("{")<text.count("}"): errors.append(f"brace mismatch {p}")
    for imp in pat.findall(text):
        target=(p.parent/imp).resolve()
        ok=target.exists() or target.with_suffix(".ts").exists() or target.with_suffix(".tsx").exists() or (target/"index.ts").exists()
        if not ok: errors.append(f"missing import {p}: {imp}")
print(f"V15_FILES={len(files)}")
print(f"V15_ERRORS={len(errors)}")
for e in errors[:20]: print(e)
raise SystemExit(1 if errors else 0)

from __future__ import annotations

def matrix(rows):
    groups={}
    for row in rows:
        key=(row.get('device','unknown'),row.get('view','unknown'),row.get('skill','unknown'))
        groups.setdefault(key,[]).append(row)
    return {k:{'count':len(v),'mean_error':sum(x['error'] for x in v)/max(1,len(v))} for k,v in groups.items()}

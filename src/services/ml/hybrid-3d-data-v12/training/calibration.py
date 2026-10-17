from __future__ import annotations
import math
from dataclasses import dataclass

@dataclass
class CalibrationResult:
    slope: float
    intercept: float
    rmse: float
    count: int


def huber_weight(residual: float, delta: float = 1.0) -> float:
    a=abs(residual)
    return 1.0 if a <= delta else delta/a


def robust_linear_calibration(x:list[float], y:list[float], iterations:int=20)->CalibrationResult:
    if len(x)!=len(y) or len(x)<3:
        raise ValueError("Need at least 3 paired observations")
    sx=sum(x)/len(x); sy=sum(y)/len(y)
    denom=sum((v-sx)**2 for v in x) or 1e-9
    slope=sum((a-sx)*(b-sy) for a,b in zip(x,y))/denom
    intercept=sy-slope*sx
    for _ in range(iterations):
        residuals=[b-(slope*a+intercept) for a,b in zip(x,y)]
        w=[huber_weight(r) for r in residuals]
        sw=sum(w) or 1
        wx=sum(ww*a for ww,a in zip(w,x))/sw; wy=sum(ww*b for ww,b in zip(w,y))/sw
        d=sum(ww*(a-wx)**2 for ww,a in zip(w,x)) or 1e-9
        slope=sum(ww*(a-wx)*(b-wy) for ww,a,b in zip(w,x,y))/d
        intercept=wy-slope*wx
    rmse=math.sqrt(sum((b-(slope*a+intercept))**2 for a,b in zip(x,y))/len(x))
    return CalibrationResult(slope,intercept,rmse,len(x))

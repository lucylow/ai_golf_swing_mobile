from __future__ import annotations
import math

def classification_metrics(y_true:list[int], y_pred:list[int], classes:int):
    if len(y_true)!=len(y_pred): raise ValueError("length mismatch")
    matrix=[[0]*classes for _ in range(classes)]
    for a,b in zip(y_true,y_pred):
        if 0<=a<classes and 0<=b<classes: matrix[a][b]+=1
    acc=sum(matrix[i][i] for i in range(classes))/max(1,len(y_true))
    per_class=[]
    for c in range(classes):
        tp=matrix[c][c]; fp=sum(matrix[r][c] for r in range(classes) if r!=c); fn=sum(matrix[c][r] for r in range(classes) if r!=c)
        precision=tp/max(1,tp+fp); recall=tp/max(1,tp+fn); f1=2*precision*recall/max(1e-9,precision+recall)
        per_class.append({"class":c,"precision":precision,"recall":recall,"f1":f1})
    return {"accuracy":acc,"per_class":per_class,"confusion":matrix}

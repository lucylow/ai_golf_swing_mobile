from __future__ import annotations
import argparse
from .train_config import TrainConfig
from .dataset import load_jsonl, split_subject_disjoint


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("dataset")
    args=parser.parse_args()
    rows=load_jsonl(args.dataset)
    train,val,test=split_subject_disjoint(rows)
    print({"rows":len(rows),"train":len(train),"val":len(val),"test":len(test),"config":TrainConfig().__dict__})

if __name__=="__main__": main()

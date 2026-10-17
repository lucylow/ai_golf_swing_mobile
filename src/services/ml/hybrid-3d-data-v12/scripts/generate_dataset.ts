import { buildSyntheticDataset, defaultSyntheticDatasetConfig } from "../src/synthetic/datasetBuilder";
import { encodeDataset } from "../src/data/jsonlWriter";
import { writeFileSync } from "node:fs";
const config=defaultSyntheticDatasetConfig(Number(process.env.SEED??73194));
const dataset=buildSyntheticDataset({...config,subjects:Number(process.env.SUBJECTS??64),sessionsPerSubject:Number(process.env.SESSIONS??3),swingsPerSession:Number(process.env.SWINGS??4)});
writeFileSync(process.env.OUT??"synthetic-golf-v12.jsonl",encodeDataset(dataset),"utf8");
console.log(JSON.stringify({records:dataset.length,frames:dataset.reduce((n,s)=>n+s.frames.length,0),output:process.env.OUT??"synthetic-golf-v12.jsonl"}));

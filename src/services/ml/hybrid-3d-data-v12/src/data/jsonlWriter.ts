import { SwingSequence } from "../types";
export function encodeSequence(seq:SwingSequence):string{return JSON.stringify(seq);}
export function encodeDataset(sequences:SwingSequence[]):string{return sequences.map(encodeSequence).join("\n")+"\n";}

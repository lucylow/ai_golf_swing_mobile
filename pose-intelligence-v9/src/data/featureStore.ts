export type FeatureRow={entityId:string;name:string;value:number;confidence:number;timestampMs:number;source:string};
export class FeatureStore {private rows:FeatureRow[]=[];put(row:FeatureRow){this.rows.push({...row});if(this.rows.length>50000)this.rows.splice(0,this.rows.length-50000);}query(entityId:string,name?:string){return this.rows.filter(r=>r.entityId===entityId && (!name||r.name===name));}clear(entityId?:string){this.rows=entityId?this.rows.filter(r=>r.entityId!==entityId):[];}size(){return this.rows.length;}}


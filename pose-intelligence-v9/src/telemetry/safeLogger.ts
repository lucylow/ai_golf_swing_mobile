export type LogEvent={event:string;timestampMs:number;properties:Record<string,string|number|boolean|null>};
const SECRET_KEYS=['token','authorization','apiKey','email','phone'];
export function redact(properties:Record<string,unknown>):Record<string,string|number|boolean|null>{const out:Record<string,string|number|boolean|null>={};for(const[k,v]of Object.entries(properties)){if(SECRET_KEYS.some(s=>k.toLowerCase().includes(s.toLowerCase())))out[k]='[REDACTED]';else if(typeof v==='string'||typeof v==='number'||typeof v==='boolean'||v===null)out[k]=v;else out[k]='[OBJECT]';}return out;}
export class SafeLogger {private events:LogEvent[]=[];track(event:string,properties:Record<string,unknown>={}){this.events.push({event,timestampMs:Date.now(),properties:redact(properties)});if(this.events.length>500)this.events.shift();}flush(){const out=[...this.events];this.events=[];return out;}}


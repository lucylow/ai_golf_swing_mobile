export class SeededRandom {
  private state:number;
  constructor(seed:number){ this.state = (seed>>>0) || 1; }
  next():number { let x=this.state; x^=x<<13; x^=x>>>17; x^=x<<5; this.state=x>>>0; return this.state/0xffffffff; }
  signed():number{return this.next()*2-1;}
  range(min:number,max:number):number{return min+(max-min)*this.next();}
  int(min:number,max:number):number{return Math.floor(this.range(min,max+1));}
  gaussian():number{const u=Math.max(this.next(),1e-9),v=Math.max(this.next(),1e-9);return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
  pick<T>(xs:T[]):T{return xs[Math.floor(this.next()*xs.length)%xs.length];}
}

export type DtwResult={distance:number;path:Array<[number,number]>};

export function dynamicTimeWarping(a:number[],b:number[],window=Infinity):DtwResult{
 const n=a.length,m=b.length;
 if(!n||!m)return {distance:Infinity,path:[]};
 const radius=Number.isFinite(window)?Math.max(0,Math.floor(window)):Math.max(n,m);
 const dp=Array.from({length:n+1},()=>Array<number>(m+1).fill(Infinity));
 const parent=Array.from({length:n+1},()=>Array<[number,number]|null>(m+1).fill(null));
 dp[0][0]=0;
 for(let i=1;i<=n;i+=1){
  const j0=Math.max(1,i-radius);const j1=Math.min(m,i+radius);
  for(let j=j0;j<=j1;j+=1){
   const cost=(a[i-1]-b[j-1])**2;
   let best=dp[i-1][j];let p:[number,number]=[i-1,j];
   if(dp[i][j-1]<best){best=dp[i][j-1];p=[i,j-1];}
   if(dp[i-1][j-1]<best){best=dp[i-1][j-1];p=[i-1,j-1];}
   dp[i][j]=cost+best;parent[i][j]=p;
  }
 }
 const path:Array<[number,number]>=[];let i=n,j=m;
 while(i>0&&j>0){path.push([i-1,j-1]);const p=parent[i][j];if(!p)break;[i,j]=p;}
 path.reverse();
 return {distance:Math.sqrt(dp[n][m]),path};
}

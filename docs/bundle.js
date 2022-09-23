(()=>{"use strict";var t,e,i={713:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.makeNoise2D=void 0;var r=i(685),n=(Math.sqrt(3)-1)/2,o=(1/Math.sqrt(3)-1)/2;function s(t,e,i){return{dx:-e-t*n,dy:-i-t*n,xsb:e,ysb:i}}e.makeNoise2D=function(t){for(var e=[],i=0;i<l.length;i+=4){for(var u=a[l[i]],f=null,d=null,p=0;p<u.length;p+=3)d=s(u[p],u[p+1],u[p+2]),null===f?e[i/4]=d:f.next=d,f=d;d.next=s(l[i+1],l[i+2],l[i+3])}var y=[];for(i=0;i<c.length;i+=2)y[c[i]]=e[c[i+1]];var v=new Uint8Array(256),_=new Uint8Array(256),g=new Uint8Array(256);for(i=0;i<256;i++)g[i]=i;var b=new Uint32Array(1);for(b[0]=t,b=r.default(r.default(r.default(b))),i=255;i>=0;i--){b=r.default(b);var m=new Uint32Array(1);m[0]=(b[0]+31)%(i+1),m[0]<0&&(m[0]+=i+1),v[i]=g[m[0]],_[i]=14&v[i],g[m[0]]=g[i]}return function(t,e){for(var i=(t+e)*o,r=t+i,s=e+i,a=Math.floor(r),c=Math.floor(s),l=(a+c)*n,u=t-(a+l),f=e-(c+l),d=r-a,p=s-c,g=d+p,b=0,m=y[d-p+1|g<<1|g+p<<2|g+d<<4];void 0!==m;m=m.next){var x=u+m.dx,w=f+m.dy,M=2-x*x-w*w;if(M>0){var O=a+m.xsb,P=c+m.ysb,j=v[255&O],A=_[j+P&255];b+=M*M*M*M*(h[A]*x+h[A+1]*w)}}return.02127659574468085*b}};var a=[[1,1,0,1,0,1,0,0,0],[1,1,0,1,0,1,2,1,1]],h=[5,2,2,5,-5,2,-2,5,5,-2,2,-5,-5,-2,-2,-5],c=[0,1,1,0,4,1,17,0,20,2,21,2,22,5,23,5,26,4,39,3,42,4,43,3],l=[0,0,1,-1,0,0,-1,1,0,2,1,1,1,2,2,0,1,2,0,2,1,0,0,0]},438:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.makeNoise3D=void 0;var r=i(685),n=(Math.sqrt(4)-1)/3,o=(1/Math.sqrt(4)-1)/3;function s(t,e,i,r){return{dx:-e-t*n,dy:-i-t*n,dz:-r-t*n,xsb:e,ysb:i,zsb:r}}e.makeNoise3D=function(t){for(var e=[],i=0;i<l.length;i+=9){for(var u=a[l[i]],f=null,d=null,p=0;p<u.length;p+=4)d=s(u[p],u[p+1],u[p+2],u[p+3]),null===f?e[i/9]=d:f.next=d,f=d;d.next=s(l[i+1],l[i+2],l[i+3],l[i+4]),d.next.next=s(l[i+5],l[i+6],l[i+7],l[i+8])}var y=[];for(i=0;i<c.length;i+=2)y[c[i]]=e[c[i+1]];var v=new Uint8Array(256),_=new Uint8Array(256),g=new Uint8Array(256);for(i=0;i<256;i++)g[i]=i;var b=new Uint32Array(1);for(b[0]=t,b=r.default(r.default(r.default(b))),i=255;i>=0;i--){b=r.default(b);var m=new Uint32Array(1);m[0]=(b[0]+31)%(i+1),m[0]<0&&(m[0]+=i+1),v[i]=g[m[0]],_[i]=v[i]%24*3,g[m[0]]=g[i]}return function(t,e,i){for(var r=(t+e+i)*o,s=t+r,a=e+r,c=i+r,l=Math.floor(s),u=Math.floor(a),f=Math.floor(c),d=(l+u+f)*n,p=t-(l+d),g=e-(u+d),b=i-(f+d),m=s-l,x=a-u,w=c-f,M=m+x+w,O=0,P=y[x-w+1|m-x+1<<1|m-w+1<<2|M<<3|M+w<<5|M+x<<7|M+m<<9];void 0!==P;P=P.next){var j=p+P.dx,A=g+P.dy,k=b+P.dz,S=2-j*j-A*A-k*k;if(S>0){var D=l+P.xsb,z=u+P.ysb,U=f+P.zsb,T=v[255&D],q=v[T+z&255],N=_[q+U&255];O+=S*S*S*S*(h[N]*j+h[N+1]*A+h[N+2]*k)}}return.009708737864077669*O}};var a=[[0,0,0,0,1,1,0,0,1,0,1,0,1,0,0,1],[2,1,1,0,2,1,0,1,2,0,1,1,3,1,1,1],[1,1,0,0,1,0,1,0,1,0,0,1,2,1,1,0,2,1,0,1,2,0,1,1]],h=[-11,4,4,-4,11,4,-4,4,11,11,4,4,4,11,4,4,4,11,-11,-4,4,-4,-11,4,-4,-4,11,11,-4,4,4,-11,4,4,-4,11,-11,4,-4,-4,11,-4,-4,4,-11,11,4,-4,4,11,-4,4,4,-11,-11,-4,-4,-4,-11,-4,-4,-4,-11,11,-4,-4,4,-11,-4,4,-4,-11],c=[0,2,1,1,2,2,5,1,6,0,7,0,32,2,34,2,129,1,133,1,160,5,161,5,518,0,519,0,546,4,550,4,645,3,647,3,672,5,673,5,674,4,677,3,678,4,679,3,680,13,681,13,682,12,685,14,686,12,687,14,712,20,714,18,809,21,813,23,840,20,841,21,1198,19,1199,22,1226,18,1230,19,1325,23,1327,22,1352,15,1353,17,1354,15,1357,17,1358,16,1359,16,1360,11,1361,10,1362,11,1365,10,1366,9,1367,9,1392,11,1394,11,1489,10,1493,10,1520,8,1521,8,1878,9,1879,9,1906,7,1910,7,2005,6,2007,6,2032,8,2033,8,2034,7,2037,6,2038,7,2039,6],l=[0,0,1,-1,0,0,1,0,-1,0,0,-1,1,0,0,0,1,-1,0,0,-1,0,1,0,0,-1,1,0,2,1,1,0,1,1,1,-1,0,2,1,0,1,1,1,-1,1,0,2,0,1,1,1,-1,1,1,1,3,2,1,0,3,1,2,0,1,3,2,0,1,3,1,0,2,1,3,0,2,1,3,0,1,2,1,1,1,0,0,2,2,0,0,1,1,0,1,0,2,0,2,0,1,1,0,0,1,2,0,0,2,2,0,0,0,0,1,1,-1,1,2,0,0,0,0,1,-1,1,1,2,0,0,0,0,1,1,1,-1,2,3,1,1,1,2,0,0,2,2,3,1,1,1,2,2,0,0,2,3,1,1,1,2,0,2,0,2,1,1,-1,1,2,0,0,2,2,1,1,-1,1,2,2,0,0,2,1,-1,1,1,2,0,0,2,2,1,-1,1,1,2,0,2,0,2,1,1,1,-1,2,2,0,0,2,1,1,1,-1,2,0,2,0]},663:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.makeNoise4D=void 0;var r=i(685),n=(Math.sqrt(5)-1)/4,o=(1/Math.sqrt(5)-1)/4;function s(t,e,i,r,o){return{dx:-e-t*n,dy:-i-t*n,dz:-r-t*n,dw:-o-t*n,xsb:e,ysb:i,zsb:r,wsb:o}}e.makeNoise4D=function(t){for(var e=[],i=0;i<l.length;i+=16){for(var u=a[l[i]],f=null,d=null,p=0;p<u.length;p+=5)d=s(u[p],u[p+1],u[p+2],u[p+3],u[p+4]),null===f?e[i/16]=d:f.next=d,f=d;d.next=s(l[i+1],l[i+2],l[i+3],l[i+4],l[i+5]),d.next.next=s(l[i+6],l[i+7],l[i+8],l[i+9],l[i+10]),d.next.next.next=s(l[i+11],l[i+12],l[i+13],l[i+14],l[i+15])}var y=[];for(i=0;i<c.length;i+=2)y[c[i]]=e[c[i+1]];var v=new Uint8Array(256),_=new Uint8Array(256),g=new Uint8Array(256);for(i=0;i<256;i++)g[i]=i;var b=new Uint32Array(1);for(b[0]=t,b=r.default(r.default(r.default(b))),i=255;i>=0;i--){b=r.default(b);var m=new Uint32Array(1);m[0]=(b[0]+31)%(i+1),m[0]<0&&(m[0]+=i+1),v[i]=g[m[0]],_[i]=252&v[i],g[m[0]]=g[i]}return function(t,e,i,r){for(var s=(t+e+i+r)*o,a=t+s,c=e+s,l=i+s,u=r+s,f=Math.floor(a),d=Math.floor(c),p=Math.floor(l),g=Math.floor(u),b=(f+d+p+g)*n,m=t-(f+b),x=e-(d+b),w=i-(p+b),M=r-(g+b),O=a-f,P=c-d,j=l-p,A=u-g,k=O+P+j+A,S=0,D=y[j-A+1|P-j+1<<1|P-A+1<<2|O-P+1<<3|O-j+1<<4|O-A+1<<5|k<<6|k+A<<8|k+j<<11|k+P<<14|k+O<<17];void 0!==D;D=D.next){var z=m+D.dx,U=x+D.dy,T=w+D.dz,q=M+D.dw,N=2-z*z-U*U-T*T-q*q;if(N>0){var C=f+D.xsb,I=d+D.ysb,F=p+D.zsb,R=g+D.wsb,E=v[255&C],L=v[E+I&255],B=v[L+F&255],K=_[B+R&255];S+=N*N*N*N*(h[K]*z+h[K+1]*U+h[K+2]*T+h[K+3]*q)}}return.03333333333333333*S}};var a=[[0,0,0,0,0,1,1,0,0,0,1,0,1,0,0,1,0,0,1,0,1,0,0,0,1],[3,1,1,1,0,3,1,1,0,1,3,1,0,1,1,3,0,1,1,1,4,1,1,1,1],[1,1,0,0,0,1,0,1,0,0,1,0,0,1,0,1,0,0,0,1,2,1,1,0,0,2,1,0,1,0,2,1,0,0,1,2,0,1,1,0,2,0,1,0,1,2,0,0,1,1],[3,1,1,1,0,3,1,1,0,1,3,1,0,1,1,3,0,1,1,1,2,1,1,0,0,2,1,0,1,0,2,1,0,0,1,2,0,1,1,0,2,0,1,0,1,2,0,0,1,1]],h=[3,1,1,1,1,3,1,1,1,1,3,1,1,1,1,3,-3,1,1,1,-1,3,1,1,-1,1,3,1,-1,1,1,3,3,-1,1,1,1,-3,1,1,1,-1,3,1,1,-1,1,3,-3,-1,1,1,-1,-3,1,1,-1,-1,3,1,-1,-1,1,3,3,1,-1,1,1,3,-1,1,1,1,-3,1,1,1,-1,3,-3,1,-1,1,-1,3,-1,1,-1,1,-3,1,-1,1,-1,3,3,-1,-1,1,1,-3,-1,1,1,-1,-3,1,1,-1,-1,3,-3,-1,-1,1,-1,-3,-1,1,-1,-1,-3,1,-1,-1,-1,3,3,1,1,-1,1,3,1,-1,1,1,3,-1,1,1,1,-3,-3,1,1,-1,-1,3,1,-1,-1,1,3,-1,-1,1,1,-3,3,-1,1,-1,1,-3,1,-1,1,-1,3,-1,1,-1,1,-3,-3,-1,1,-1,-1,-3,1,-1,-1,-1,3,-1,-1,-1,1,-3,3,1,-1,-1,1,3,-1,-1,1,1,-3,-1,1,1,-1,-3,-3,1,-1,-1,-1,3,-1,-1,-1,1,-3,-1,-1,1,-1,-3,3,-1,-1,-1,1,-3,-1,-1,1,-1,-3,-1,1,-1,-1,-3,-3,-1,-1,-1,-1,-3,-1,-1,-1,-1,-3,-1,-1,-1,-1,-3],c=[0,3,1,2,2,3,5,2,6,1,7,1,8,3,9,2,10,3,13,2,16,3,18,3,22,1,23,1,24,3,26,3,33,2,37,2,38,1,39,1,41,2,45,2,54,1,55,1,56,0,57,0,58,0,59,0,60,0,61,0,62,0,63,0,256,3,258,3,264,3,266,3,272,3,274,3,280,3,282,3,2049,2,2053,2,2057,2,2061,2,2081,2,2085,2,2089,2,2093,2,2304,9,2305,9,2312,9,2313,9,16390,1,16391,1,16406,1,16407,1,16422,1,16423,1,16438,1,16439,1,16642,8,16646,8,16658,8,16662,8,18437,6,18439,6,18469,6,18471,6,18688,9,18689,9,18690,8,18693,6,18694,8,18695,6,18696,9,18697,9,18706,8,18710,8,18725,6,18727,6,131128,0,131129,0,131130,0,131131,0,131132,0,131133,0,131134,0,131135,0,131352,7,131354,7,131384,7,131386,7,133161,5,133165,5,133177,5,133181,5,133376,9,133377,9,133384,9,133385,9,133400,7,133402,7,133417,5,133421,5,133432,7,133433,5,133434,7,133437,5,147510,4,147511,4,147518,4,147519,4,147714,8,147718,8,147730,8,147734,8,147736,7,147738,7,147766,4,147767,4,147768,7,147770,7,147774,4,147775,4,149509,6,149511,6,149541,6,149543,6,149545,5,149549,5,149558,4,149559,4,149561,5,149565,5,149566,4,149567,4,149760,9,149761,9,149762,8,149765,6,149766,8,149767,6,149768,9,149769,9,149778,8,149782,8,149784,7,149786,7,149797,6,149799,6,149801,5,149805,5,149814,4,149815,4,149816,7,149817,5,149818,7,149821,5,149822,4,149823,4,149824,37,149825,37,149826,36,149829,34,149830,36,149831,34,149832,37,149833,37,149842,36,149846,36,149848,35,149850,35,149861,34,149863,34,149865,33,149869,33,149878,32,149879,32,149880,35,149881,33,149882,35,149885,33,149886,32,149887,32,150080,49,150082,48,150088,49,150098,48,150104,47,150106,47,151873,46,151877,45,151881,46,151909,45,151913,44,151917,44,152128,49,152129,46,152136,49,152137,46,166214,43,166215,42,166230,43,166247,42,166262,41,166263,41,166466,48,166470,43,166482,48,166486,43,168261,45,168263,42,168293,45,168295,42,168512,31,168513,28,168514,31,168517,28,168518,25,168519,25,280952,40,280953,39,280954,40,280957,39,280958,38,280959,38,281176,47,281178,47,281208,40,281210,40,282985,44,282989,44,283001,39,283005,39,283208,30,283209,27,283224,30,283241,27,283256,22,283257,22,297334,41,297335,41,297342,38,297343,38,297554,29,297558,24,297562,29,297590,24,297594,21,297598,21,299365,26,299367,23,299373,26,299383,23,299389,20,299391,20,299584,31,299585,28,299586,31,299589,28,299590,25,299591,25,299592,30,299593,27,299602,29,299606,24,299608,30,299610,29,299621,26,299623,23,299625,27,299629,26,299638,24,299639,23,299640,22,299641,22,299642,21,299645,20,299646,21,299647,20,299648,61,299649,60,299650,61,299653,60,299654,59,299655,59,299656,58,299657,57,299666,55,299670,54,299672,58,299674,55,299685,52,299687,51,299689,57,299693,52,299702,54,299703,51,299704,56,299705,56,299706,53,299709,50,299710,53,299711,50,299904,61,299906,61,299912,58,299922,55,299928,58,299930,55,301697,60,301701,60,301705,57,301733,52,301737,57,301741,52,301952,79,301953,79,301960,76,301961,76,316038,59,316039,59,316054,54,316071,51,316086,54,316087,51,316290,78,316294,78,316306,73,316310,73,318085,77,318087,77,318117,70,318119,70,318336,79,318337,79,318338,78,318341,77,318342,78,318343,77,430776,56,430777,56,430778,53,430781,50,430782,53,430783,50,431e3,75,431002,72,431032,75,431034,72,432809,74,432813,69,432825,74,432829,69,433032,76,433033,76,433048,75,433065,74,433080,75,433081,74,447158,71,447159,68,447166,71,447167,68,447378,73,447382,73,447386,72,447414,71,447418,72,447422,71,449189,70,449191,70,449197,69,449207,68,449213,69,449215,68,449408,67,449409,67,449410,66,449413,64,449414,66,449415,64,449416,67,449417,67,449426,66,449430,66,449432,65,449434,65,449445,64,449447,64,449449,63,449453,63,449462,62,449463,62,449464,65,449465,63,449466,65,449469,63,449470,62,449471,62,449472,19,449473,19,449474,18,449477,16,449478,18,449479,16,449480,19,449481,19,449490,18,449494,18,449496,17,449498,17,449509,16,449511,16,449513,15,449517,15,449526,14,449527,14,449528,17,449529,15,449530,17,449533,15,449534,14,449535,14,449728,19,449729,19,449730,18,449734,18,449736,19,449737,19,449746,18,449750,18,449752,17,449754,17,449784,17,449786,17,451520,19,451521,19,451525,16,451527,16,451528,19,451529,19,451557,16,451559,16,451561,15,451565,15,451577,15,451581,15,451776,19,451777,19,451784,19,451785,19,465858,18,465861,16,465862,18,465863,16,465874,18,465878,18,465893,16,465895,16,465910,14,465911,14,465918,14,465919,14,466114,18,466118,18,466130,18,466134,18,467909,16,467911,16,467941,16,467943,16,468160,13,468161,13,468162,13,468163,13,468164,13,468165,13,468166,13,468167,13,580568,17,580570,17,580585,15,580589,15,580598,14,580599,14,580600,17,580601,15,580602,17,580605,15,580606,14,580607,14,580824,17,580826,17,580856,17,580858,17,582633,15,582637,15,582649,15,582653,15,582856,12,582857,12,582872,12,582873,12,582888,12,582889,12,582904,12,582905,12,596982,14,596983,14,596990,14,596991,14,597202,11,597206,11,597210,11,597214,11,597234,11,597238,11,597242,11,597246,11,599013,10,599015,10,599021,10,599023,10,599029,10,599031,10,599037,10,599039,10,599232,13,599233,13,599234,13,599235,13,599236,13,599237,13,599238,13,599239,13,599240,12,599241,12,599250,11,599254,11,599256,12,599257,12,599258,11,599262,11,599269,10,599271,10,599272,12,599273,12,599277,10,599279,10,599282,11,599285,10,599286,11,599287,10,599288,12,599289,12,599290,11,599293,10,599294,11,599295,10],l=[0,0,1,-1,0,0,0,1,0,-1,0,0,1,0,0,-1,0,0,-1,1,0,0,0,0,1,-1,0,0,0,1,0,-1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,-1,0,0,-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,2,1,1,0,0,1,1,1,-1,0,1,1,1,0,-1,0,2,1,0,1,0,1,1,-1,1,0,1,1,0,1,-1,0,2,0,1,1,0,1,-1,1,1,0,1,0,1,1,-1,0,2,1,0,0,1,1,1,-1,0,1,1,1,0,-1,1,0,2,0,1,0,1,1,-1,1,0,1,1,0,1,-1,1,0,2,0,0,1,1,1,-1,0,1,1,1,0,-1,1,1,1,4,2,1,1,0,4,1,2,1,0,4,1,1,2,0,1,4,2,1,0,1,4,1,2,0,1,4,1,1,0,2,1,4,2,0,1,1,4,1,0,2,1,4,1,0,1,2,1,4,0,2,1,1,4,0,1,2,1,4,0,1,1,2,1,2,1,1,0,0,3,2,1,0,0,3,1,2,0,0,1,2,1,0,1,0,3,2,0,1,0,3,1,0,2,0,1,2,0,1,1,0,3,0,2,1,0,3,0,1,2,0,1,2,1,0,0,1,3,2,0,0,1,3,1,0,0,2,1,2,0,1,0,1,3,0,2,0,1,3,0,1,0,2,1,2,0,0,1,1,3,0,0,2,1,3,0,0,1,2,2,3,1,1,1,0,2,1,1,1,-1,2,2,0,0,0,2,3,1,1,0,1,2,1,1,-1,1,2,2,0,0,0,2,3,1,0,1,1,2,1,-1,1,1,2,2,0,0,0,2,3,1,1,1,0,2,1,1,1,-1,2,0,2,0,0,2,3,1,1,0,1,2,1,1,-1,1,2,0,2,0,0,2,3,0,1,1,1,2,-1,1,1,1,2,0,2,0,0,2,3,1,1,1,0,2,1,1,1,-1,2,0,0,2,0,2,3,1,0,1,1,2,1,-1,1,1,2,0,0,2,0,2,3,0,1,1,1,2,-1,1,1,1,2,0,0,2,0,2,3,1,1,0,1,2,1,1,-1,1,2,0,0,0,2,2,3,1,0,1,1,2,1,-1,1,1,2,0,0,0,2,2,3,0,1,1,1,2,-1,1,1,1,2,0,0,0,2,2,1,1,1,-1,0,1,1,1,0,-1,0,0,0,0,0,2,1,1,-1,1,0,1,1,0,1,-1,0,0,0,0,0,2,1,-1,1,1,0,1,0,1,1,-1,0,0,0,0,0,2,1,1,-1,0,1,1,1,0,-1,1,0,0,0,0,0,2,1,-1,1,0,1,1,0,1,-1,1,0,0,0,0,0,2,1,-1,0,1,1,1,0,-1,1,1,0,0,0,0,0,2,1,1,1,-1,0,1,1,1,0,-1,2,2,0,0,0,2,1,1,-1,1,0,1,1,0,1,-1,2,2,0,0,0,2,1,1,-1,0,1,1,1,0,-1,1,2,2,0,0,0,2,1,1,1,-1,0,1,1,1,0,-1,2,0,2,0,0,2,1,-1,1,1,0,1,0,1,1,-1,2,0,2,0,0,2,1,-1,1,0,1,1,0,1,-1,1,2,0,2,0,0,2,1,1,-1,1,0,1,1,0,1,-1,2,0,0,2,0,2,1,-1,1,1,0,1,0,1,1,-1,2,0,0,2,0,2,1,-1,0,1,1,1,0,-1,1,1,2,0,0,2,0,2,1,1,-1,0,1,1,1,0,-1,1,2,0,0,0,2,2,1,-1,1,0,1,1,0,1,-1,1,2,0,0,0,2,2,1,-1,0,1,1,1,0,-1,1,1,2,0,0,0,2,3,1,1,0,0,0,2,2,0,0,0,2,1,1,1,-1,3,1,0,1,0,0,2,0,2,0,0,2,1,1,1,-1,3,1,0,0,1,0,2,0,0,2,0,2,1,1,1,-1,3,1,1,0,0,0,2,2,0,0,0,2,1,1,-1,1,3,1,0,1,0,0,2,0,2,0,0,2,1,1,-1,1,3,1,0,0,0,1,2,0,0,0,2,2,1,1,-1,1,3,1,1,0,0,0,2,2,0,0,0,2,1,-1,1,1,3,1,0,0,1,0,2,0,0,2,0,2,1,-1,1,1,3,1,0,0,0,1,2,0,0,0,2,2,1,-1,1,1,3,1,0,1,0,0,2,0,2,0,0,2,-1,1,1,1,3,1,0,0,1,0,2,0,0,2,0,2,-1,1,1,1,3,1,0,0,0,1,2,0,0,0,2,2,-1,1,1,1,3,3,2,1,0,0,3,1,2,0,0,4,1,1,1,1,3,3,2,0,1,0,3,1,0,2,0,4,1,1,1,1,3,3,0,2,1,0,3,0,1,2,0,4,1,1,1,1,3,3,2,0,0,1,3,1,0,0,2,4,1,1,1,1,3,3,0,2,0,1,3,0,1,0,2,4,1,1,1,1,3,3,0,0,2,1,3,0,0,1,2,4,1,1,1,1,3,3,2,1,0,0,3,1,2,0,0,2,1,1,1,-1,3,3,2,0,1,0,3,1,0,2,0,2,1,1,1,-1,3,3,0,2,1,0,3,0,1,2,0,2,1,1,1,-1,3,3,2,1,0,0,3,1,2,0,0,2,1,1,-1,1,3,3,2,0,0,1,3,1,0,0,2,2,1,1,-1,1,3,3,0,2,0,1,3,0,1,0,2,2,1,1,-1,1,3,3,2,0,1,0,3,1,0,2,0,2,1,-1,1,1,3,3,2,0,0,1,3,1,0,0,2,2,1,-1,1,1,3,3,0,0,2,1,3,0,0,1,2,2,1,-1,1,1,3,3,0,2,1,0,3,0,1,2,0,2,-1,1,1,1,3,3,0,2,0,1,3,0,1,0,2,2,-1,1,1,1,3,3,0,0,2,1,3,0,0,1,2,2,-1,1,1,1]},234:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.makeNoise4D=e.makeNoise3D=e.makeNoise2D=void 0;var r=i(713);Object.defineProperty(e,"makeNoise2D",{enumerable:!0,get:function(){return r.makeNoise2D}});var n=i(438);Object.defineProperty(e,"makeNoise3D",{enumerable:!0,get:function(){return n.makeNoise3D}});var o=i(663);Object.defineProperty(e,"makeNoise4D",{enumerable:!0,get:function(){return o.makeNoise4D}})},685:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=new Uint32Array(1);return e[0]=1664525*t[0]+1013904223,e}},113:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0});var r=i(675),n=function(){function t(t){this.config=t,this.canvas=null,this.ctx=null,this.delay=200,this.fps=60,this.createCanvas(),this.setCanvasSize()}return t.prototype.init=function(){this.requestId||this.main()},t.prototype.render=function(){this.clear()},t.prototype.main=function(){this.requestId=(0,r.requestAnimFrame)(this.main.bind(this),this.fps),this.update(),this.render()},t.prototype.debounce=function(){this.requestId&&(cancelAnimationFrame(this.requestId),this.requestId=void 0),null!=this.timer&&window.clearTimeout(this.timer),this.timer=window.setTimeout(this.resize.bind(this),this.delay),this.clear()},t.prototype.resize=function(){this.setCanvasSize(),this.init()},t.prototype.clear=function(){null!=this.ctx&&this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)},t.prototype.createCanvas=function(){this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d");var t=null;if("string"==typeof this.config.element?t=document.querySelector(this.config.element):this.config.element instanceof Element&&(t=this.config.element),null===t)throw new TypeError("Invalid config.element: ".concat(this.config.element,"."));t.appendChild(this.canvas)},t.prototype.setCanvasSize=function(){var t=this.config.width,e=this.config.height,i=!1;isFinite(t)||(t=window.innerWidth,i=!0),isFinite(e)||(e=window.innerHeight,i=!0),i&&window.addEventListener("resize",this.debounce.bind(this)),this.canvas.width=t,this.canvas.height=e},t}();e.default=n},675:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.cancelAnimFrame=e.requestAnimFrame=void 0,e.requestAnimFrame=function(t,e){return requestAnimationFrame(t)||function(t){setTimeout(t,1e3/e)}},e.cancelAnimFrame=function(t){return cancelAnimationFrame(t)}},198:(t,e)=>{function i(t){return void 0!==t}Object.defineProperty(e,"__esModule",{value:!0}),e.color=e.number=e.boolean=e.array=e.initialized=void 0,e.initialized=i,e.array=function(t,e){return!!i(t)&&t.constructor===Array&&t.length==e},e.boolean=function(t){return!!i(t)&&t.constructor===Boolean},e.number=function(t){return!!i(t)&&t.constructor===Number},e.color=function(t){return!!i(t)&&t.constructor===Array&&4==t.length&&t[0]>=0&&t[0]<=255&&t[1]>=0&&t[1]<=255&&t[2]>=0&&t[2]<=255&&t[3]>=0&&t[3]<=1}},777:function(t,e,i){var r=this&&this.__createBinding||(Object.create?function(t,e,i,r){void 0===r&&(r=i);var n=Object.getOwnPropertyDescriptor(e,i);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[i]}}),Object.defineProperty(t,r,n)}:function(t,e,i,r){void 0===r&&(r=i),t[r]=e[i]}),n=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&r(e,t,i);return n(e,t),e};Object.defineProperty(e,"__esModule",{value:!0});var s=o(i(198)),a=function(){function t(t,e,i,r,n){this.ctx=t,this.light=e,this.a=i,this.b=r,this.c=n,this.color=[255,255,255,1],this.hue=this.color,this.max=.5,this.stroke={}}return t.prototype.init=function(t){t.color&&s.color(t.color)&&(this.color=t.color),t.max&&s.number(t.max)&&t.max>=0&&t.max<=1&&(this.max=t.max),t.stroke&&(s.color(t.stroke.color)&&(this.stroke.color=t.stroke.color),s.number(t.stroke.width)&&(this.stroke.width=t.stroke.width))},t.prototype.update=function(t){this.light=t,this.shader()},t.prototype.render=function(){this.ctx.fillStyle="rgba(".concat(this.hue[0],",").concat(this.hue[1],",").concat(this.hue[2],",").concat(this.hue[3],")"),this.stroke.color?(this.ctx.strokeStyle="rgba(".concat(this.stroke.color[0],",").concat(this.stroke.color[1],",").concat(this.stroke.color[2],",").concat(this.stroke.color[3],")"),this.stroke.width&&(this.ctx.lineWidth=this.stroke.width)):this.ctx.strokeStyle="rgba(".concat(this.hue[0],",").concat(this.hue[1],",").concat(this.hue[2],",").concat(this.hue[3],")"),this.ctx.beginPath(),this.ctx.moveTo(this.a[0],this.a[1]),this.ctx.lineTo(this.b[0],this.b[1]),this.ctx.lineTo(this.c[0],this.c[1]),this.ctx.fill(),this.ctx.stroke()},t.prototype.shader=function(){var t=this.vector(this.a,this.b),e=this.vector(this.a,this.c),i=this.cross(t,e),r=this.normalize(i),n=this.vector(this.a,this.light),o=this.normalize(n),s=1-(this.dotProduct(r,o)+1)/2;this.hue=this.shade(this.color,this.getIntensity(s,this.max))},t.prototype.vector=function(t,e){return[e[0]-t[0],e[1]-t[1],e[2]-t[2]]},t.prototype.cross=function(t,e){return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]]},t.prototype.normalize=function(t){var e=Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);return[t[0]/e,t[1]/e,t[2]/e]},t.prototype.shade=function(t,e){return[Math.floor(t[0]*e),Math.floor(t[1]*e),Math.floor(t[2]*e),t[3]]},t.prototype.getIntensity=function(t,e){return 1-e+e*t},t.prototype.dotProduct=function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]},t.prototype.getCenteroid=function(){return[(this.a[0]+this.b[0]+this.c[0])/3,(this.a[1]+this.b[1]+this.c[1])/3]},t}();e.default=a},342:function(t,e,i){var r,n=this&&this.__extends||(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),o=this&&this.__createBinding||(Object.create?function(t,e,i,r){void 0===r&&(r=i);var n=Object.getOwnPropertyDescriptor(e,i);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[i]}}),Object.defineProperty(t,r,n)}:function(t,e,i,r){void 0===r&&(r=i),t[r]=e[i]}),s=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),a=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&o(e,t,i);return s(e,t),e},h=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var c=h(i(113)),l=h(i(777)),u=a(i(198)),f=i(234),d=h(i(246)),p=function(t){function e(e){var i=t.call(this,e)||this;return i.seed=16e3,e.seed&&u.number(e.seed)&&(i.seed=e.seed),i.apex=i.getApexHeight(),i.complexity=i.getComplexity(i.seed),i.light=i.getLightSource(i.apex),u.boolean(e.mouse)&&!0!==e.mouse||i.canvas.addEventListener("mousemove",i.onMouseMove.bind(i),!1),i.simplex=(0,f.makeNoise2D)(Date.now()),i.triangles=[],i.init(),i}return n(e,t),e.prototype.init=function(){this.generate(),t.prototype.init.call(this)},e.prototype.update=function(){for(var t=0;t<this.triangles.length;t++)this.triangles[t].update(this.light)},e.prototype.render=function(){t.prototype.render.call(this);for(var e=0;e<this.triangles.length;e++)this.triangles[e].render()},e.prototype.generate=function(){for(var t=[],e=(this.canvas.width+this.canvas.height)/10,i=Math.floor(this.canvas.width+2*e),r=Math.floor(this.canvas.height+2*e),n=r/Math.round(Math.sqrt(r*this.complexity/i)),o=i/Math.round(this.complexity/Math.sqrt(r*this.complexity/i)),s=this.apex,a=-e;a<this.canvas.height+e;a+=n)for(var h=-e;h<this.canvas.width+e;h+=o){var c=this.getRandomArbitrary(h,h+o),u=this.getRandomArbitrary(a,a+n),f=(this.simplex(c,u)+1)/2*s;t.push([c,u,f])}t=this.triangulate(t);for(var d=0,p=0;p<t.length;d++,p+=3)this.triangles[d]=new l.default(this.ctx,this.light,t[p],t[p+1],t[p+2]),this.triangles[d].init(this.config)},e.prototype.triangulate=function(t){var e=[];t.forEach((function(t){e.push(t[0]),e.push(t[1])}));for(var i=new d.default(e).triangles,r=[],n=0;n<i.length;n++)r.push(t[i[n]]);return r},e.prototype.getLightSource=function(t){return[this.canvas.width/2,this.canvas.height/2,t]},e.prototype.getApexHeight=function(){return(this.canvas.height+this.canvas.width)/2},e.prototype.getComplexity=function(t){return Math.floor(this.canvas.width*this.canvas.height/t)},e.prototype.getRandomArbitrary=function(t,e){return Math.random()*(t-e)+e},e.prototype.getCenteroid=function(t,e,i){return[(t[0]+e[0]+i[0])/3,(t[1]+e[1]+i[1])/3]},e.prototype.getMousePosition=function(t){var e=this.canvas.getBoundingClientRect();return[t.clientX-e.left,t.clientY-e.top]},e.prototype.onMouseMove=function(t){var e=this.getMousePosition(t);this.light=[e[0],e[1],this.light[2]]},e}(c.default);e.default=p},294:function(t,e,i){var r=this&&this.__createBinding||(Object.create?function(t,e,i,r){void 0===r&&(r=i);var n=Object.getOwnPropertyDescriptor(e,i);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[i]}}),Object.defineProperty(t,r,n)}:function(t,e,i,r){void 0===r&&(r=i),t[r]=e[i]}),n=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&r(e,t,i);return n(e,t),e};Object.defineProperty(e,"__esModule",{value:!0});var s=o(i(198)),a=function(){function t(t){this.ctx=t,this.a=[0,0],this.b=[0,0],this.alpha=0,this.color=[0,0,0,1],this.fade=!0,this.max=100,this.width=1}return t.prototype.init=function(t){t&&(t.color&&s.color(t.color)&&(this.color=t.color),s.boolean(t.fade)&&(this.fade=t.fade),t.max&&s.number(t.max)&&(this.max=t.max),t.width&&s.number(t.width)&&(this.width=t.width))},t.prototype.update=function(t,e){this.a=t,this.b=e},t.prototype.render=function(){this.getDistance()<this.max?this.fade?this.alpha=1-this.getDistance()/this.max:this.alpha=this.color[3]:this.alpha=0,this.alpha>0&&(this.ctx.strokeStyle="rgba(".concat(this.color[0],",").concat(this.color[1],",").concat(this.color[2],",").concat(this.alpha,")"),this.ctx.lineWidth=this.width,this.ctx.beginPath(),this.ctx.moveTo(this.a[0],this.a[1]),this.ctx.lineTo(this.b[0],this.b[1]),this.ctx.stroke())},t.prototype.getDistance=function(){return Math.sqrt((this.a[0]-this.b[0])*(this.a[0]-this.b[0])+(this.a[1]-this.b[1])*(this.a[1]-this.b[1]))},t}();e.default=a},629:function(t,e,i){var r=this&&this.__createBinding||(Object.create?function(t,e,i,r){void 0===r&&(r=i);var n=Object.getOwnPropertyDescriptor(e,i);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[i]}}),Object.defineProperty(t,r,n)}:function(t,e,i,r){void 0===r&&(r=i),t[r]=e[i]}),n=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&r(e,t,i);return n(e,t),e};Object.defineProperty(e,"__esModule",{value:!0});var s=o(i(198)),a=function(){function t(t,e){this.ctx=t,this.pos=e,this.cw=this.ctx.canvas.width,this.ch=this.ctx.canvas.height,this.color=[0,0,0,1],this.radius=this.getRandomArbitrary(4,2),this.velocity=this.getRandomArbitrary(.2,.1),this.theta=this.getRandomTheta()}return t.prototype.init=function(t){t&&(t.color&&s.color(t.color)&&(this.color=t.color),t.radius&&s.array(t.radius,2)&&t.radius[0]>t.radius[1]&&(this.radius=this.getRandomArbitrary(t.radius[0],t.radius[1])),t.velocity&&s.array(t.velocity,2)&&t.velocity[0]>t.velocity[1]&&(this.velocity=this.getRandomArbitrary(t.velocity[0],t.velocity[1])))},t.prototype.update=function(){(this.pos[0]<=0+this.radius||this.pos[0]>=this.cw-this.radius)&&(this.theta=Math.PI-this.theta),(this.pos[1]<=0+this.radius||this.pos[1]>=this.ch-this.radius)&&(this.theta=2*Math.PI-this.theta),this.pos[0]+=Math.cos(this.theta)*this.velocity,this.pos[1]+=Math.sin(this.theta)*this.velocity},t.prototype.render=function(){this.ctx.fillStyle="rgba(".concat(this.color[0],",").concat(this.color[1],",").concat(this.color[2],",").concat(this.color[3],")"),this.ctx.beginPath(),this.ctx.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI),this.ctx.fill()},t.prototype.getPosition=function(){return this.pos},t.prototype.getRandomArbitrary=function(t,e){return Math.random()*(t-e)+e},t.prototype.getRandomTheta=function(){return 2*Math.random()*Math.PI},t}();e.default=a},878:function(t,e,i){var r,n=this&&this.__extends||(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),o=this&&this.__createBinding||(Object.create?function(t,e,i,r){void 0===r&&(r=i);var n=Object.getOwnPropertyDescriptor(e,i);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[i]}}),Object.defineProperty(t,r,n)}:function(t,e,i,r){void 0===r&&(r=i),t[r]=e[i]}),s=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),a=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&o(e,t,i);return s(e,t),e},h=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var c=h(i(113)),l=h(i(629)),u=h(i(294)),f=a(i(198)),d=function(t){function e(e){var i=t.call(this,e)||this;return i.seed=8e3,i.complexity=i.getComplexity(i.seed),e.seed&&f.number(e.seed)&&(i.complexity=i.getComplexity(e.seed)),i.lines=[],i.points=[],i.generate(),t.prototype.init.call(i),i}return n(e,t),e.prototype.update=function(){for(var t=0;t<this.complexity;t++)this.points[t].update();for(var e=0,i=0;i<this.complexity;i++)for(var r=i+1;r<this.complexity;r++){var n=this.points[i].getPosition(),o=this.points[r].getPosition();this.lines[e].update([n[0],n[1]],[o[0],o[1]]),e++}},e.prototype.render=function(){t.prototype.render.call(this);for(var e=0;e<this.lines.length;e++)this.lines[e].render();for(var i=0;i<this.points.length;i++)this.points[i].render()},e.prototype.generate=function(){for(var t=0,e=0;e<this.complexity;e++){var i=Math.random()*this.canvas.width,r=Math.random()*this.canvas.height;this.points[e]=new l.default(this.ctx,[i,r]),this.config.point?this.points[e].init(this.config.point):this.points[e].init();for(var n=e+1;n<this.complexity;n++)this.lines[t]=new u.default(this.ctx),this.config.line&&this.lines[t].init(this.config.line),t++}},e.prototype.getComplexity=function(t){return Math.floor(this.canvas.width*this.canvas.height/t)},e}(c.default);e.default=d},607:function(t,e,i){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Delaunay=e.Stars=void 0;var n=r(i(878));e.Stars=n.default;var o=r(i(342));e.Delaunay=o.default},246:(t,e,i)=>{i.r(e),i.d(e,{default:()=>p});const r=134217729;function n(t,e,i,r,n){let o,s,a,h,c=e[0],l=r[0],u=0,f=0;l>c==l>-c?(o=c,c=e[++u]):(o=l,l=r[++f]);let d=0;if(u<t&&f<i)for(l>c==l>-c?(s=c+o,a=o-(s-c),c=e[++u]):(s=l+o,a=o-(s-l),l=r[++f]),o=s,0!==a&&(n[d++]=a);u<t&&f<i;)l>c==l>-c?(s=o+c,h=s-o,a=o-(s-h)+(c-h),c=e[++u]):(s=o+l,h=s-o,a=o-(s-h)+(l-h),l=r[++f]),o=s,0!==a&&(n[d++]=a);for(;u<t;)s=o+c,h=s-o,a=o-(s-h)+(c-h),c=e[++u],o=s,0!==a&&(n[d++]=a);for(;f<i;)s=o+l,h=s-o,a=o-(s-h)+(l-h),l=r[++f],o=s,0!==a&&(n[d++]=a);return 0===o&&0!==d||(n[d++]=o),d}function o(t){return new Float64Array(t)}const s=o(4),a=o(8),h=o(12),c=o(16),l=o(4);function u(t,e,i,o,u,f){const d=(e-f)*(i-u),p=(t-u)*(o-f),y=d-p;if(0===d||0===p||d>0!=p>0)return y;const v=Math.abs(d+p);return Math.abs(y)>=33306690738754716e-32*v?y:-function(t,e,i,o,u,f,d){let p,y,v,_,g,b,m,x,w,M,O,P,j,A,k,S,D,z;const U=t-u,T=i-u,q=e-f,N=o-f;A=U*N,b=r*U,m=b-(b-U),x=U-m,b=r*N,w=b-(b-N),M=N-w,k=x*M-(A-m*w-x*w-m*M),S=q*T,b=r*q,m=b-(b-q),x=q-m,b=r*T,w=b-(b-T),M=T-w,D=x*M-(S-m*w-x*w-m*M),O=k-D,g=k-O,s[0]=k-(O+g)+(g-D),P=A+O,g=P-A,j=A-(P-g)+(O-g),O=j-S,g=j-O,s[1]=j-(O+g)+(g-S),z=P+O,g=z-P,s[2]=P-(z-g)+(O-g),s[3]=z;let C=function(t,e){let i=e[0];for(let t=1;t<4;t++)i+=e[t];return i}(0,s),I=22204460492503146e-32*d;if(C>=I||-C>=I)return C;if(g=t-U,p=t-(U+g)+(g-u),g=i-T,v=i-(T+g)+(g-u),g=e-q,y=e-(q+g)+(g-f),g=o-N,_=o-(N+g)+(g-f),0===p&&0===y&&0===v&&0===_)return C;if(I=11093356479670487e-47*d+33306690738754706e-32*Math.abs(C),C+=U*_+N*p-(q*v+T*y),C>=I||-C>=I)return C;A=p*N,b=r*p,m=b-(b-p),x=p-m,b=r*N,w=b-(b-N),M=N-w,k=x*M-(A-m*w-x*w-m*M),S=y*T,b=r*y,m=b-(b-y),x=y-m,b=r*T,w=b-(b-T),M=T-w,D=x*M-(S-m*w-x*w-m*M),O=k-D,g=k-O,l[0]=k-(O+g)+(g-D),P=A+O,g=P-A,j=A-(P-g)+(O-g),O=j-S,g=j-O,l[1]=j-(O+g)+(g-S),z=P+O,g=z-P,l[2]=P-(z-g)+(O-g),l[3]=z;const F=n(4,s,4,l,a);A=U*_,b=r*U,m=b-(b-U),x=U-m,b=r*_,w=b-(b-_),M=_-w,k=x*M-(A-m*w-x*w-m*M),S=q*v,b=r*q,m=b-(b-q),x=q-m,b=r*v,w=b-(b-v),M=v-w,D=x*M-(S-m*w-x*w-m*M),O=k-D,g=k-O,l[0]=k-(O+g)+(g-D),P=A+O,g=P-A,j=A-(P-g)+(O-g),O=j-S,g=j-O,l[1]=j-(O+g)+(g-S),z=P+O,g=z-P,l[2]=P-(z-g)+(O-g),l[3]=z;const R=n(F,a,4,l,h);A=p*_,b=r*p,m=b-(b-p),x=p-m,b=r*_,w=b-(b-_),M=_-w,k=x*M-(A-m*w-x*w-m*M),S=y*v,b=r*y,m=b-(b-y),x=y-m,b=r*v,w=b-(b-v),M=v-w,D=x*M-(S-m*w-x*w-m*M),O=k-D,g=k-O,l[0]=k-(O+g)+(g-D),P=A+O,g=P-A,j=A-(P-g)+(O-g),O=j-S,g=j-O,l[1]=j-(O+g)+(g-S),z=P+O,g=z-P,l[2]=P-(z-g)+(O-g),l[3]=z;const E=n(R,h,4,l,c);return c[E-1]}(t,e,i,o,u,f,v)}o(4),o(4),o(4),o(4),o(4),o(4),o(4),o(4),o(4),o(8),o(8),o(8),o(4),o(8),o(8),o(8),o(12),o(192),o(192),o(4),o(4),o(4),o(4),o(4),o(4),o(4),o(4),o(8),o(8),o(8),o(8),o(8),o(8),o(8),o(8),o(8),o(4),o(4),o(4),o(8),o(16),o(16),o(16),o(32),o(32),o(48),o(64),o(1152),o(1152),o(4),o(4),o(4),o(4),o(4),o(4),o(4),o(4),o(4),o(4),o(24),o(24),o(24),o(24),o(24),o(24),o(24),o(24),o(24),o(24),o(1152),o(1152),o(1152),o(1152),o(1152),o(2304),o(2304),o(3456),o(5760),o(8),o(8),o(8),o(16),o(24),o(48),o(48),o(96),o(192),o(384),o(384),o(384),o(768),o(96),o(96),o(96),o(1152);const f=Math.pow(2,-52),d=new Uint32Array(512);class p{static from(t,e=m,i=x){const r=t.length,n=new Float64Array(2*r);for(let o=0;o<r;o++){const r=t[o];n[2*o]=e(r),n[2*o+1]=i(r)}return new p(n)}constructor(t){const e=t.length>>1;if(e>0&&"number"!=typeof t[0])throw new Error("Expected coords to contain numbers.");this.coords=t;const i=Math.max(2*e-5,0);this._triangles=new Uint32Array(3*i),this._halfedges=new Int32Array(3*i),this._hashSize=Math.ceil(Math.sqrt(e)),this._hullPrev=new Uint32Array(e),this._hullNext=new Uint32Array(e),this._hullTri=new Uint32Array(e),this._hullHash=new Int32Array(this._hashSize).fill(-1),this._ids=new Uint32Array(e),this._dists=new Float64Array(e),this.update()}update(){const{coords:t,_hullPrev:e,_hullNext:i,_hullTri:r,_hullHash:n}=this,o=t.length>>1;let s=1/0,a=1/0,h=-1/0,c=-1/0;for(let e=0;e<o;e++){const i=t[2*e],r=t[2*e+1];i<s&&(s=i),r<a&&(a=r),i>h&&(h=i),r>c&&(c=r),this._ids[e]=e}const l=(s+h)/2,d=(a+c)/2;let p,v,b,m=1/0;for(let e=0;e<o;e++){const i=y(l,d,t[2*e],t[2*e+1]);i<m&&(p=e,m=i)}const x=t[2*p],w=t[2*p+1];m=1/0;for(let e=0;e<o;e++){if(e===p)continue;const i=y(x,w,t[2*e],t[2*e+1]);i<m&&i>0&&(v=e,m=i)}let M=t[2*v],O=t[2*v+1],P=1/0;for(let e=0;e<o;e++){if(e===p||e===v)continue;const i=_(x,w,M,O,t[2*e],t[2*e+1]);i<P&&(b=e,P=i)}let j=t[2*b],A=t[2*b+1];if(P===1/0){for(let e=0;e<o;e++)this._dists[e]=t[2*e]-t[0]||t[2*e+1]-t[1];g(this._ids,this._dists,0,o-1);const e=new Uint32Array(o);let i=0;for(let t=0,r=-1/0;t<o;t++){const n=this._ids[t];this._dists[n]>r&&(e[i++]=n,r=this._dists[n])}return this.hull=e.subarray(0,i),this.triangles=new Uint32Array(0),void(this.halfedges=new Uint32Array(0))}if(u(x,w,M,O,j,A)<0){const t=v,e=M,i=O;v=b,M=j,O=A,b=t,j=e,A=i}const k=function(t,e,i,r,n,o){const s=i-t,a=r-e,h=n-t,c=o-e,l=s*s+a*a,u=h*h+c*c,f=.5/(s*c-a*h);return{x:t+(c*l-a*u)*f,y:e+(s*u-h*l)*f}}(x,w,M,O,j,A);this._cx=k.x,this._cy=k.y;for(let e=0;e<o;e++)this._dists[e]=y(t[2*e],t[2*e+1],k.x,k.y);g(this._ids,this._dists,0,o-1),this._hullStart=p;let S=3;i[p]=e[b]=v,i[v]=e[p]=b,i[b]=e[v]=p,r[p]=0,r[v]=1,r[b]=2,n.fill(-1),n[this._hashKey(x,w)]=p,n[this._hashKey(M,O)]=v,n[this._hashKey(j,A)]=b,this.trianglesLen=0,this._addTriangle(p,v,b,-1,-1,-1);for(let o,s,a=0;a<this._ids.length;a++){const h=this._ids[a],c=t[2*h],l=t[2*h+1];if(a>0&&Math.abs(c-o)<=f&&Math.abs(l-s)<=f)continue;if(o=c,s=l,h===p||h===v||h===b)continue;let d=0;for(let t=0,e=this._hashKey(c,l);t<this._hashSize&&(d=n[(e+t)%this._hashSize],-1===d||d===i[d]);t++);d=e[d];let y,_=d;for(;y=i[_],u(c,l,t[2*_],t[2*_+1],t[2*y],t[2*y+1])>=0;)if(_=y,_===d){_=-1;break}if(-1===_)continue;let g=this._addTriangle(_,h,i[_],-1,-1,r[_]);r[h]=this._legalize(g+2),r[_]=g,S++;let m=i[_];for(;y=i[m],u(c,l,t[2*m],t[2*m+1],t[2*y],t[2*y+1])<0;)g=this._addTriangle(m,h,y,r[h],-1,r[m]),r[h]=this._legalize(g+2),i[m]=m,S--,m=y;if(_===d)for(;y=e[_],u(c,l,t[2*y],t[2*y+1],t[2*_],t[2*_+1])<0;)g=this._addTriangle(y,h,_,-1,r[_],r[y]),this._legalize(g+2),r[y]=g,i[_]=_,S--,_=y;this._hullStart=e[h]=_,i[_]=e[m]=h,i[h]=m,n[this._hashKey(c,l)]=h,n[this._hashKey(t[2*_],t[2*_+1])]=_}this.hull=new Uint32Array(S);for(let t=0,e=this._hullStart;t<S;t++)this.hull[t]=e,e=i[e];this.triangles=this._triangles.subarray(0,this.trianglesLen),this.halfedges=this._halfedges.subarray(0,this.trianglesLen)}_hashKey(t,e){return Math.floor(function(t,e){const i=t/(Math.abs(t)+Math.abs(e));return(e>0?3-i:1+i)/4}(t-this._cx,e-this._cy)*this._hashSize)%this._hashSize}_legalize(t){const{_triangles:e,_halfedges:i,coords:r}=this;let n=0,o=0;for(;;){const s=i[t],a=t-t%3;if(o=a+(t+2)%3,-1===s){if(0===n)break;t=d[--n];continue}const h=s-s%3,c=a+(t+1)%3,l=h+(s+2)%3,u=e[o],f=e[t],p=e[c],y=e[l];if(v(r[2*u],r[2*u+1],r[2*f],r[2*f+1],r[2*p],r[2*p+1],r[2*y],r[2*y+1])){e[t]=y,e[s]=u;const r=i[l];if(-1===r){let e=this._hullStart;do{if(this._hullTri[e]===l){this._hullTri[e]=t;break}e=this._hullPrev[e]}while(e!==this._hullStart)}this._link(t,r),this._link(s,i[o]),this._link(o,l);const a=h+(s+1)%3;n<d.length&&(d[n++]=a)}else{if(0===n)break;t=d[--n]}}return o}_link(t,e){this._halfedges[t]=e,-1!==e&&(this._halfedges[e]=t)}_addTriangle(t,e,i,r,n,o){const s=this.trianglesLen;return this._triangles[s]=t,this._triangles[s+1]=e,this._triangles[s+2]=i,this._link(s,r),this._link(s+1,n),this._link(s+2,o),this.trianglesLen+=3,s}}function y(t,e,i,r){const n=t-i,o=e-r;return n*n+o*o}function v(t,e,i,r,n,o,s,a){const h=t-s,c=e-a,l=i-s,u=r-a,f=n-s,d=o-a,p=l*l+u*u,y=f*f+d*d;return h*(u*y-p*d)-c*(l*y-p*f)+(h*h+c*c)*(l*d-u*f)<0}function _(t,e,i,r,n,o){const s=i-t,a=r-e,h=n-t,c=o-e,l=s*s+a*a,u=h*h+c*c,f=.5/(s*c-a*h),d=(c*l-a*u)*f,p=(s*u-h*l)*f;return d*d+p*p}function g(t,e,i,r){if(r-i<=20)for(let n=i+1;n<=r;n++){const r=t[n],o=e[r];let s=n-1;for(;s>=i&&e[t[s]]>o;)t[s+1]=t[s--];t[s+1]=r}else{let n=i+1,o=r;b(t,i+r>>1,n),e[t[i]]>e[t[r]]&&b(t,i,r),e[t[n]]>e[t[r]]&&b(t,n,r),e[t[i]]>e[t[n]]&&b(t,i,n);const s=t[n],a=e[s];for(;;){do{n++}while(e[t[n]]<a);do{o--}while(e[t[o]]>a);if(o<n)break;b(t,n,o)}t[i+1]=t[o],t[o]=s,r-n+1>=o-i?(g(t,e,n,r),g(t,e,i,o-1)):(g(t,e,i,o-1),g(t,e,n,r))}}function b(t,e,i){const r=t[e];t[e]=t[i],t[i]=r}function m(t){return t[0]}function x(t){return t[1]}}},r={};function n(t){var e=r[t];if(void 0!==e)return e.exports;var o=r[t]={exports:{}};return i[t].call(o.exports,o,o.exports,n),o.exports}n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},t=n(607),e=document.getElementById("stars"),new t.Stars({element:e,width:1/0,height:1/0,point:{color:[184,142,141,1]},line:{color:[216,210,225,1],fade:!1}}),new t.Delaunay({element:"#delaunay",width:1/0,height:1/0,color:[43,45,66,1]})})();
// Алгоритм расчета азимута и высоты солнца позаимствован http://wildphoto.irk.ru/travel/sun.html

// Округление до .1
function frm(n)
{ return Math.round(n*10)/10; }

// выравнивание нулями
function ftxt(n,minlgh){
var tmp=""+n;
while (tmp.length<minlgh) {tmp="0"+tmp;}
return tmp;
}

// Время по гринвичу в часах
function ut(
h, // часы
m, // минуты
z  // временная зона
) 
{ return (h-z+m/60); }

function jd(y,m,d,u)
{ return (367*y)-Math.floor((7/4)*(Math.floor((m+9)/12)+y))+Math.floor(275*m/9)+d-730531.5+(u/24); }

// Азимут солнца
function sun_azimuth( 
la, // широта
lg, // долгота
ye, // год
mo, // месяц
da, // день
ho, // часы
mi, // минуты
zo // часовая зона
)
{ 
with (Math) {
var uu=ut(ho,mi,zo);
var jj=jd(ye,mo,da,uu);
var T=jj/36525;
var k=PI/180.0;
var M=357.5291+35999.0503*T-0.0001559*T*T-0.00000045*T*T*T;
M=M % 360;
var Lo=280.46645+36000.76983*T+0.0003032*T*T;
Lo=Lo % 360;
var DL=(1.9146-0.004817*T-0.000014*T*T)*sin(k*M)+(0.019993-0.000101*T)*sin(k*2*M)+0.00029*sin(k*3*M);
var L=Lo+DL;
var eps=23.43999-0.013*T;
var delta=(1/k)*asin(sin(L*k)*sin(eps*k));
var RA=(1/k)*atan2(cos(eps*k)*sin(L*k),cos(L*k));
RA=(RA+360) % 360;
var GMST=280.46061837+360.98564736629*jj+0.000387933*T*T-T*T*T/38710000;
GMST=(GMST+360) % 360;
var LMST=GMST+lg;
var H=LMST-RA;
var eqt=(Lo-RA)*4;
var azm=(1/k)*atan2(-sin(H*k),cos(la*k)*tan(delta*k)-sin(la*k)*cos(H*k));
azm=(azm+360) % 360;
return azm;
}}

// Угол места (высота) солнца
function sun_elevation( 
la, // широта
lg, // долгота
ye, // год
mo, // месяц
da, // день
ho, // часы
mi, // минуты
zo // часовая зона
)
{with (Math) {
var uu=ut(ho,mi,zo);
var jj=jd(ye,mo,da,uu);
var T=jj/36525;
var k=PI/180.0;
var M=357.5291+35999.0503*T-0.0001559*T*T-0.00000045*T*T*T;
M=M % 360;
var Lo=280.46645+36000.76983*T+0.0003032*T*T;
Lo=Lo % 360;
var DL=(1.9146-0.004817*T-0.000014*T*T)*sin(k*M)+(0.019993-0.000101*T)*sin(k*2*M)+0.00029*sin(k*3*M);
L=Lo+DL;
var eps=23.43999-0.013*T;
var delta=(1/k)*asin(sin(L*k)*sin(eps*k));
var RA=(1/k)*atan2(cos(eps*k)*sin(L*k),cos(L*k));
RA=(RA+360) % 360;
var GMST=280.46061837+360.98564736629*jj+0.000387933*T*T-T*T*T/38710000;
GMST=(GMST+360) % 360;
var LMST=GMST+lg;
var H=LMST-RA;
var eqt=(Lo-RA)*4;
var alt=(1/k)*asin(sin(la*k)*sin(delta*k)+cos(la*k)*cos(delta*k)*cos(H*k));
return alt;
}}

// Азимут спутника
function sat_azimuth(
la, // широта 
lg, // долгота
ls  // долгота (позиция) спутника
){
with (Math){
var k=PI/180.0;
var lar=k*la;
var lgr=k*lg;
var lsr=k*ls;
return (PI+atan(tan(lgr-lsr)/sin(lar)))/k;
}}

// Угол места (высота) спутника
function sat_elevation(
la, // широта 
lg, // долгота
ls  // долгота (позиция) спутника
){
with (Math){
var k=PI/180.0;
var lar=k*la;
var lgr=k*lg;
var lsr=k*ls;
return atan((cos(lgr-lsr)*cos(lar)-0.15126)/sqrt(1-cos(lgr-lsr)*cos(lgr-lsr)*cos(lar)*cos(lar)))/k;
}}

//Поворот конвертера
function sat_slew(
la, // широта 
lg, // долгота
ls  // долгота (позиция) спутника
){  
with (Math){
var k=PI/180.0;
var lgr=lg*k;   //долгота
var lar=la*k;   //широта
var lsr=ls*k; //позиция спутника
return atan(sin(lgr-lsr)/tan(lar))/k;
}}

// Latitude - широта a
// Longitude - долгота g 

// Расчет направления ортодримии (путевого угла)
function azimuth(
a1, // широта исходной точки
g1, // долгота исходной точки
a2, // широта точки назначения
g2  // долгота точки назначения
){  
with (Math){
var k=PI/180.0;
var a1r=a1*k;   
var g1r=g1*k;   
var a2r=a2*k;   
var g2r=g2*k;   
if (g2r==g1r) {
  if (a2r>=a1r) return 0; else return 180;
} 
var beta=cos(a1r)*tan(a2r)/sin(g2r-g1r)-sin(a1r)/tan(g2r-g1r);
return atan(1/beta)/k;
}}

// Расчет длинны ортодримии (расстояния)
function distance(
a1, // широта исходной точки
g1, // долгота исходной точки
a2, // широта точки назначения
g2  // долгота точки назначения
){  
with (Math){
var k=PI/180.0;
var a1r=a1*k;   
var g1r=g1*k;   
var a2r=a2*k;   
var g2r=g2*k;   
var beta=sin(a1r)*sin(a2r)+cos(a1r)*cos(a2r)*cos(g2r-g1r);
return acos(beta)/k;
}}

// Расчет широты по исходной точке и направлению и длинне ортодримии
function latitude_ort(
a1, // широта исходной точки
g1, // долгота исходной точки
B,  // курсовой угол
S   // расстояние
){  
with (Math){
var k=PI/180.0;
var a1r=a1*k;   
var g1r=g1*k;   
var Br=B*k;   
var Sr=S*k;   
var beta=sin(a1r)*cos(Sr)+cos(a1r)*sin(Sr)*cos(Br);
return asin(beta)/k;
}}

// Расчет долготы по исходной точке и направлению и длинне ортодримии
function longtitude_ort(
a1, // широта исходной точки
g1, // долгота исходной точки
B,  // курсовой угол
S   // расстояние
){  
with (Math){
var k=PI/180.0;
var a1r=a1*k;   
var g1r=g1*k;   
var Br=B*k;   
var Sr=S*k;
var A = latitude_ort(a1,g1,B,S);   
//var beta=abs(cos(Sr)-sin(a1r)*sin(A*k))/cos(a1r)/cos(A*k);
//return acos(beta)/k+g1;
var beta=(sin(Sr)*sin(Br))/cos(A*k);
return asin(beta)/k+g1;
}}




function fi(a, b){
with (Math){
var k=PI/180.0;
return acos(a/b)/k;
}}

function c(b, fi, el){
with (Math){
var k=PI/180.0;
return b*sin((fi-el)*k);
}}

 function dec2min(hrdec){with (Math){  // DEC >> HH:MM
	 var hh=parseInt(hrdec);
	 var mm=round(hrdec%1*60);
	 return ""+hh+":"+ftxt(mm,2);
	 }} 
	 
function min2dec(hrmin){with (Math){  // HH:MM >> DEC
    var arr=hrmin.split(':');
    var hh=1.0*arr[0];
    var mm=1.0*arr[1]/60;
    return hh+mm;
	}}
	
// время нахождения солнца по указанному азимуту
function sun_time(
la,   // широта
lg,   // долгота
azSun // азимут
){  
var tmp
var arr
var today = new Date();
var ye=today.getFullYear();
var mo=today.getMonth()+1;
var da=today.getDate();
var zo=today.getTimezoneOffset()/-60;
// if(летнее время.checked) zo=zo+1;
var ho
var mi
var azm=frm(sun_azimuth(la,lg,ye,mo,da,4,0,zo));
tmp="4:0";
var last=azm+1;
var i=0;
//while ((azm-last)!=0) {
while (i<10) {
	tmp=dec2min(min2dec(tmp)-(azm-azSun)/360*24);
    arr=tmp.split(':');
    ho=1.0*arr[0];
    mi=1.0*arr[1];
	last=azm;
	azm=frm(sun_azimuth(la,lg,ye,mo,da,ho,mi,zo));
	i=i+1
		}
	return tmp;
	}
	

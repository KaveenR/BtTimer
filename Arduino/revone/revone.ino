#include <SoftwareSerial.h>
SoftwareSerial myserial(11,10);
char mc;
boolean g,o,r=false;
int gp = 9;
int op = 8;
int rp = 7;
void setup()
{
  Serial.begin(9600);
  myserial.begin(9600);
}
void loop()
{
  if (myserial.available()){
    mc = myserial.read();
    if (mc==71){
      Serial.write("Green");
      g=toggle(g);
      setstat(g,gp);
    }
    if (mc==79){
      Serial.write("Orange");
      o=toggle(o);
      setstat(o,op);
    }
    if (mc==82){
      Serial.write("Red");
      r=toggle(r);
      setstat(r,rp);
    }
  }
}
boolean toggle(boolean a){
  if (a == false){
    return true;
  }else{
    return false;
  }
}
void setstat(boolean a,int b){
  if (a == true){
    pinMode(b,HIGH);
  }else{
    pinMode(b,LOW);
  }
}  

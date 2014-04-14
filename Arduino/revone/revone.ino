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
      g=true;
      o,r=false;
      update();
    }
    if (mc==79){
      Serial.write("Orange");
      o=true;
      g,r=false;
      update();
    }
    if (mc==82){
      Serial.write("Red");
      r=true;
      g,o=false;
      update();
    }
    if (mc==63){ //?
      Serial.write("RESET");
      g= false;
      o = false;
      r = false;
      update();
  }
}
}
void update(){
  setstat(g,gp);
  setstat(o,op);
  setstat(r,rp);
}
void setstat(boolean a,int b){
  if (a == true){
    pinMode(b,HIGH);
  }else{
    pinMode(b,LOW);
  }
}

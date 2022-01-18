int LEDX;
int LEDmode;
int LED1=11;
int LED2=10;
int LED3=9;
int LED4=6;
int led_arr[]={11,10,9,6};
int led_arr_var=0;
char str_type=Serial.read();

void led_light(){
        for(led_arr_var=0;led_arr_var<=3;led_arr_var++) digitalWrite(led_arr[led_arr_var],LOW);
        delay(1000);
 }
void led_dark(){
        for(led_arr_var=0;led_arr_var<=3;led_arr_var++) digitalWrite(led_arr[led_arr_var],HIGH);
        delay(1000);
 }
void led_pilix(){
      led_dark();
      for(led_arr_var=0;led_arr_var<=3;led_arr_var++) {
        digitalWrite(led_arr[led_arr_var],LOW);
        delay(1000);
      }
 }
 
void setup() {
  // put your setup code here, to run once:
    Serial.begin(9600);
    pinMode(LED1,OUTPUT);
    pinMode(LED2,OUTPUT);
    pinMode(LED3,OUTPUT);
    pinMode(LED4,OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  while(Serial.available()>0){
      str_type=Serial.read();

     if(str_type=='P'){
           led_pilix();
      }
    
      if(str_type=='A'){
             LEDX=LED1;
             LEDmode= HIGH;
       }else if(str_type=='B'){
            LEDX=LED2;
            LEDmode= HIGH;
       }else if(str_type=='C'){
           LEDX=LED3;
           LEDmode= HIGH;
       }else if(str_type=='D'){
           LEDX=LED4;
           LEDmode= HIGH;
       }else if(str_type=='E'){
           led_dark();
        }

        if(str_type=='a'){
             LEDX=LED1;
             LEDmode= LOW;
       }else if(str_type=='b'){
            LEDX=LED2;
            LEDmode= LOW;
       }else if(str_type=='c'){
           LEDX=LED3;
           LEDmode= LOW;
       }else if(str_type=='d'){
           LEDX=LED4;
           LEDmode= LOW;
       }else if(str_type=='e'){
           led_light();
        }
       
     digitalWrite(LEDX,LEDmode);
     
  }
 delay(100);
}

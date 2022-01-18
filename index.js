var SerialPort = require("serialport"); 
const Readline = require('@serialport/parser-readline');
const parser = new Readline();
var portAddress=process.argv[2];
var express=require('express');
var app=express();
var web_port=8081;
var SP_port=new SerialPort(portAddress,{baudRate: 9600}).setEncoding('utf8');

/*打開串口*/
SP_port.on('open',function(err){
    console.log('Serial Port: '+ portAddress +' is opened.');
    if(err){
        console.log('Error opening port: ',err.message);
    }
})

/*輸出Arduino回伝的結果*/
SP_port.pipe(parser);
parser.on('data',line =>{
    console.log(line);
})

/*API接收回伝設定*/
app.get('/',function(req,res){
    return res.send('Working');
})
app.get('/web.html', function (req, res) {
    res.sendFile( __dirname + "/" + "web.html" );
 });
app.get('/LED/:mode',function(req,res){
    var mode=req.params.mode || req.param('mode');
    if(mode=='pilix'){
        SP_port.write('P');
        console.log("Server: GET /LED/pilix");
    }
    return res.send('/LED/'+mode);
})
app.get('/:id/:action',function(req,res){
    var action=req.params.action || req.param('action');
    var id=req.params.id || req.param('id');
    
    if(id=='LED1'){
        if(action=='ON'){
            SP_port.write('A');
            console.log("Server: GET /LED1/ON");
        }
        if(action=='OFF'){
            SP_port.write('a');
            console.log("Server: GET /LED1/OFF");
        }
    }

    if(id=='LED2'){
        if(action=='ON'){
            SP_port.write('B');
            console.log("Server: GET /LED2/ON");
        }
        if(action=='OFF'){
            SP_port.write('b');
            console.log("Server: GET /LED2/OFF");
        }
    }

    if(id=='LED3'){
        if(action=='ON'){
            SP_port.write('C');
            console.log("Server: GET /LED3/ON");
        }
        if(action=='OFF'){
            SP_port.write('c');
            console.log("Server: GET /LED3/OFF");
        }
    }

    if(id=='LED4'){
        if(action=='ON'){
            SP_port.write('D');
            console.log("Server: GET /LED4/ON");
        }
        if(action=='OFF'){
            SP_port.write('d');
            console.log("Server: GET /LED4/OFF");
        }
    }

    if(id=='LED_ALL'){
        if(action=='ON'){
            SP_port.write('E');
            console.log("Server: GET /LED_ALL/ON");
        }
        if(action=='OFF'){
            SP_port.write('e');
            console.log("Server: GET /LED_ALL/OFF");
        }
    }
    
    return res.send('/'+ id +'/'+ action);
})

/*Server監聽設定*/
app.listen(web_port,function(){
    console.log('running in http://localhost:'+web_port);
})



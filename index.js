var db = require('./db.js');
var SerialPort = require("serialport"); 
const Readline = SerialPort.parsers.Readline;

var express=require('express');
var app=express();
app.set('view engine','ejs');
var web_port=8081;

/*API接收回伝設定*/
app.get('/',function(req,res){
    return res.send('Working');
})
app.get('/db_test',function(req,res){
    var connection=db.createConnection();
    connection.connect();
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        var sendVar= 'The solution is: ' + results[0].solution;
        console.log('DB: '+ sendVar);
        return res.send(sendVar);
    });
    connection.end();
});
app.get('/web', function (req, res) {
    res.render('web');
 });
app.get('/LED/:mode',function(req,res){
    var mode=req.params.mode || req.param('mode');
    if(mode=='pilix'){
        SP_port.write('P');
        console.log("Server: GET /LED/pilix");
    }
    if(mode=='pwm'){
        SP_port.write('W');
        console.log("Server: GET /LED/pwm");
    }
    //return res.send('/LED/'+mode);
})
app.get('/:id/:action',function(req,res){
    var action=req.params.action || req.param('action');
    var id=req.params.id || req.param('id');
    var connection=db.createConnection();
    connection.connect();
    if(id=='LED1'){
        if(action=='ON'){
            SP_port.write('A');
            console.log("Server: GET /LED1/ON");
           /* connection.query("UPDATE `sensor_switch` SET `LED1`=1 ", function (error, results, fields) {
                if (error) throw error;
            });*/
        }
        if(action=='OFF'){
            SP_port.write('a');
            console.log("Server: GET /LED1/OFF");
            /*connection.query("UPDATE `sensor_switch` SET `LED1`=0 ", function (error, results, fields) {
                if (error) throw error;
            });*/
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
    
    //return res.send('/'+ id +'/'+ action);
})
/*Server監聽設定*/
app.listen(web_port,function(){
    console.log('running in http://localhost:'+web_port);
})

/*序列埠通信設定*/
var portAddress=process.argv[2]; //輸入開發版的序列埠位置
/*var SP_port= new SerialPort(portAddress,{
    baudRate: 9600,
    parser: SerialPort.parsers.Readline
}).setEncoding('utf8');*/
var SP_port = new SerialPort(portAddress); 
const parser = SP_port.pipe(new Readline({ delimiter: '\r\n' }));

/*打開串口*/
SP_port.on('open',function(err){
    console.log('Serial Port: '+ portAddress +' is opened.');
    if(err){
        console.log('Error opening port: ',err.message);
    }
})

/*輸出Arduino回伝的結果*/

parser.on('data',line =>{
    console.log(line);
})

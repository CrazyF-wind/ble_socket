/**
 * Created by Administrator on 2017/4/26.
 */
var net = require('net');
var readline = require('readline');

var HOST = '127.0.0.1';
var PORT = 11593;
//var PORT = 5037;
//var PORT = 7;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // 建立连接后立即向服务器发送数据，服务器将收到这些数据
    //client.write('1');
});

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function(data) {

    console.log('DATA: ' + data);
    // 完全关闭连接
    //client.destroy();

});

client.on('error', function(err){
    console.log('socket error - ', err);
});

//为客户端添加“close”事件处理函数
client.on('close', function() {
    console.log('Connection closed');
});


var rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});

function quitEcho(){
    rl.close();
    client.end();
    console.log('quit echo client');
}

rl.on('line', function(cmd){
    if(cmd.indexOf('quit') == 0 || cmd.indexOf('exit') == 0){
        quitEcho();
    }else{
        client.write(cmd + '\r\n');
    }
});

rl.on('SIGINT', quitEcho);
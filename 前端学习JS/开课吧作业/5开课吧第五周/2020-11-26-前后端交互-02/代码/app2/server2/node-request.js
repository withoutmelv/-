const http = require('http');

const options = {
    protocol: 'http:',
    hostname: 'localhost',
    port: 8888,
    path: '/data1',
    method: 'GET'
};

const req = http.request(options, (res) => {
    // console.log(res);

    let str = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        // console.log(`BODY: ${chunk}`);
        str += chunk.toString();
    });
    res.on('end', () => {
        console.log('数据接收完成', str);
    });
});

req.write('');
req.end();
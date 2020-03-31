const http = require('http');
const url = require('url');
const fs = require('fs');
const ST = require('./StudentList');

const fdir = __dirname + '/StudentList.json';
const PORT = 5000;
const HOST = 'localhost';

let http_handler = (req, res)=>{
    switch (req.method){
        case 'GET': GET_handler(req, res);  break;
        case 'POST': POST_handler(req, res);  break;
        case 'PUT': PUT_handler(req, res);  break;
        case 'DELETE': DELETE_handler(req, res);  break;
        default: HTTP405(res);  break;
    }
};


function GetUrlPart(url_path, indx){
    let i = 0;
    let curr_url = '';
    i--;
    decodeURI(url_path).split('/').forEach(e =>{
        i++;
        if(i == indx){
            curr_url = e;
            return;
        }
    });
    return curr_url?curr_url:'';
}

let GET_handler = (req, res)=>{
    let Path_forGet = url.parse(req.url, true).pathname;
    switch ('/'+GetUrlPart(Path_forGet, 1)){
        case '/':
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(ST));
        break;
        case '/client':
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(fs.readFileSync(__dirname + '/client.html'));
        break;
        case '/backup':
            fs.readdir(__dirname + '/backups/', (err, files) =>{
                let backN = 0;
                if (err) throw err;

                fileList = [];
                files.forEach(file =>{
                    if(file.includes('StudentList')){
                        fileList.push({number: ++backN, fname: file});
                    }
                });
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                res.end(JSON.stringify(fileList));
            });
        break;
        default:
            if(Number.isInteger(parseInt(GetUrlPart(Path_forGet, 1)))){
                if(!GetUrlPart(Path_forGet, 2)){
                    let n = parseInt(GetUrlPart(Path_forGet, 1));
                    let index = ST.findIndex(s => s.id == n);

                    if((index || index==0) && index>=0){
                        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        res.end(JSON.stringify(ST[index]));
                    }
                    else{
                        res.statusCode = 404;
                        res.statusMessage = 'Student not found';
                        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        res.end(JSON.stringify({error: 'Student with this ID is not exists'}));
                    }
                }
                else{
                    HTTP404(res);
                }
            }
            else HTTP404(res);
        break;
    }
};

let POST_handler = (req, res)=>{
    let Path_forGet = url.parse(req.url, true).pathname;
    switch ('/'+GetUrlPart(Path_forGet, 1)){
        case '/':
            let body = ' ';
            req.on('data', chunk => {
                body = chunk.toString();
                body = JSON.parse(body);
            });
            req.on('end', async () => {
                if (ST.find(s => s.id == body.id)){
                    res.statusCode = 400;
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify({error: 'Student with this ID is already exists'}));
                }
                else{
                    let student = {id: body.id, name: body.name, bday: body.bday, specility: body.specility};
                    ST.push(student);
                    fs.writeFile(fdir, JSON.stringify(ST, null, '  '), () => {});
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify(student));
                }
            });
        break;
        case '/backup':
            let cur = new Date();
            let date = addZero(cur.getFullYear())+addZero(Number(cur.getMonth())+1)+
                    addZero(cur.getDate())+addZero(cur.getHours())+
                    addZero(cur.getMinutes())+addZero(cur.getSeconds());

            function addZero(n){
                return (n < 10 ? '0' : '') + n;
            }
            setTimeout(() =>
                fs.writeFile((__dirname + '/backups/'+date+'_StudentList.json'), JSON.stringify(ST, null, '  '), () => {}),
                2000);
            res.end();
        break;
        default: HTTP404(res);  break;
    }
};

let PUT_handler = (req, res)=>{
    let Path_forGet = url.parse(req.url, true).pathname;
    switch ('/'+GetUrlPart(Path_forGet, 1)){
        case '/':
            let body = ' ';
            req.on('data', chunk => {
                body = chunk.toString();
                body = JSON.parse(body);
            });
            req.on('end', async () => {
                let index = ST.findIndex(s => s.id == body.id);
                if (index+1){
                    let stNew = {id: body.id, name: body.name, bday: body.bday, specility: body.specility};
                    let stOld = ST[index];
                    Object.keys(stOld).forEach(n =>{
                        if (stNew[n] && stOld[n] !== stNew[n])
                            stOld[n] = stNew[n];
                    });
                    fs.writeFile(fdir, JSON.stringify(ST, null, '  '), () => {});
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify(stOld));
                }
                else{
                    res.statusCode = 401;
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify({error: 'Student with current id is not founded'}));
                }
            });
        break;
        default: HTTP404(res);  break;
    }
};

let DELETE_handler = (req, res)=>{
    let Path_forGet = url.parse(req.url, true).pathname;
    switch ('/'+GetUrlPart(Path_forGet, 1)){
        case '/backup':
            let date = GetUrlPart(Path_forGet, 2); //YYYYMMDD
            let BackupDate = dateSlice(date);

            if(date.length == 8 && BackupDate){
                fs.readdir(__dirname + '/backups', (err, files) =>{
                    if (err){
                        res.statusCode = 500;
                        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        res.end(JSON.stringify({error: err.message}));
                        throw err;
                    }
                    files.forEach(file =>{
                        let fBackupDate = dateSlice(file);

                        if (BackupDate > fBackupDate){
                            fs.unlink(__dirname + '/backups/' + file, err =>{
                                if (err){
                                    res.statusCode = 500;
                                    res.body = JSON.stringify({error: err.message});
                                    throw err;
                                }
                            });
                        }
                    });
                    res.end();
                });
            }
            else{
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                res.end(JSON.stringify({error: 'Wrong date type'}));
            }
        break;
        default:
            if(Number.isInteger(parseInt(GetUrlPart(Path_forGet, 1)))){
                let n = GetUrlPart(Path_forGet, 1);
                let index = ST.findIndex(s => s.id == n);
                if(index+1){
                    let deleted = ST.find(s => s.id == n);

                    ST.splice(ST.findIndex(s => s.id == n), 1);
                    fs.writeFile(fdir, JSON.stringify(ST, null, '  '), () => {});

                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify(deleted));
                }
                else{
                    res.statusCode = 404;
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify({error: 'Student with current id is not founded'}));
                }
            }
            else HTTP404(res);
        break;
    }
};


let HTTP405 = (res)=>{
    res.statusCode = 405;
    res.statusMessage = ' not found';
    res.end('Method not found');
};

let HTTP404 = (res)=>{
    res.statusCode = 404;
    res.statusMessage = 'Resourse not found';
    res.end('Resourse not found');
};

const server = http.createServer().listen(PORT, HOST, (v) =>{
    console.log(`Listening on http://localhost:${PORT}`);
    let notif = require(__dirname + '/notifications');
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)})
.on('request', http_handler);

function dateSlice(date){
    let year = '', month = '', day = '';
    let hour = '3', minute = '00', second = '00';

    for (let i = 0; i < date.length; i++){
        if (i < 4)
            year += date.charAt(i);
        else if (i < 6)
            month += date.charAt(i);
        else if (i < 8)
            day += date.charAt(i);
    }

    let arr = [year, month, day, hour, minute, second];
    let fdate = new Date(Number(arr[0]), Number(arr[1])-1, Number(arr[2]),
                         Number(arr[3]));
    return fdate;
}

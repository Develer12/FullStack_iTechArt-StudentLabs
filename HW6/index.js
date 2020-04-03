const Db = require('./queries');
const fs = require('fs');
var url = require("url");
const http = require('http');
const DB = new Db();

const PORT = 3000;

let tabList = ['teacher', 'subject', 'pulpit', 'faculty', 'auditorium', 'auditorium_type'];
let checkTab = (tab) =>{
    let flag;
    tabList.forEach(t => {
        if(t == tab){
            flag = true;
        }
    });
    return flag
};


let HTTP404 = (req, res) =>{
    console.log(`${req.method}: ${req.url}, HTTP status 404`);
    res.writeHead(404, {'Content-Type' : 'application/json; charset=utf-8'});
    res.end(`"error" : "${req.method}: ${req.url}, HTTP status 404"`);
}

let HTTP405 = (req, res) =>{
    console.log(`${req.method}: ${req.url}, HTTP status 405`);
    res.writeHead(404, {'Content-Type' : 'application/json; charset=utf-8'});
    res.end(`Error" : "${req.method}: ${req.url}, HTTP status 405"`);
}

let http_handler = (req, res)=>{
    switch (req.method){
        case 'GET': GET_handler(req, res);  break;
        case 'POST': POST_handler(req, res);  break;
        case 'PUT': PUT_handler(req, res);  break;
        case 'DELETE': DELETE_handler(req, res);  break;
        default: HTTP405(req, res);  break;
    }
};

let GET_handler = (req, res)=>{
    let Path_forGet = url.parse(req.url, true).pathname;

    switch ('/'+GetUrlPart(Path_forGet, 1)){
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(fs.readFileSync(__dirname + '/index.html'));
        break;
        case '/api':
            if(!GetUrlPart(Path_forGet, 3)){
                let tab = GetUrlPart(Path_forGet, 2);
                tab = parseTab(tab);
                console.log(`Get ${tab}`);
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                if(checkTab(tab)){
                    DB.Get(tab)
                    .then(records =>{
                        res.end(JSON.stringify(records.recordset));
                    })
                    .catch(error =>{
                        res.statusCode = 400;
                        res.end(JSON.stringify({error: String(error)}));
                    });
                }
                else{
                    HTTP404(req, res);
                }
            }
            else{
                HTTP404(req, res);
            }
        break;
        default: HTTP404(req, res);  break;
    }
};

let POST_handler = (req, res)=>{
    let Path_forGet = url.parse(req.url, true).pathname;

    switch ('/'+GetUrlPart(Path_forGet, 1)){
        case '/api':
            if(!GetUrlPart(Path_forGet, 3)){
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end', async () => {
                    let tab = GetUrlPart(Path_forGet, 2);
                    tab = parseTab(tab);
                    console.log(`Post ${tab}`);
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    DB.Insert(tab, body)
                    .then(() =>{
                        res.end(JSON.stringify(body));
                    })
                    .catch(error =>{
                        res.statusCode = 400;
                        res.end(JSON.stringify({error: String(error)}));
                    });
                });
            }
            else{
                HTTP404(req, res);
            }
        break;
        default: HTTP404(req, res);  break;
    }
};

let PUT_handler = (req, res)=>{
    let Path_forGet = url.parse(req.url, true).pathname;

    switch ('/'+GetUrlPart(Path_forGet, 1)){
        case '/api':
            if(!GetUrlPart(Path_forGet, 3)){
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end', async () => {
                    let tab = GetUrlPart(Path_forGet, 2);
                    tab = parseTab(tab);
                    console.log(`Put ${tab}`);
                    console.log(JSON.stringify(body));
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    DB.Update(tab, body)
                    .then(() =>{
                        res.end(JSON.stringify(body));
                    })
                    .catch(error =>{
                        res.statusCode = 400;
                        res.end(JSON.stringify({error: String(error)}));
                    });
                });
            }
            else{
                HTTP404(req, res);
            }
        break;
        default: HTTP404(req, res);  break;
    }
};

let DELETE_handler = (req, res)=>{
    let Path_forGet = url.parse(req.url, true).pathname;

    switch ('/'+GetUrlPart(Path_forGet, 1)){
        case '/api':
            if(!GetUrlPart(Path_forGet, 4) && GetUrlPart(Path_forGet, 3) && GetUrlPart(Path_forGet, 2)){
                let tab = GetUrlPart(Path_forGet, 2);
                let id = GetUrlPart(Path_forGet, 3);
                tab = parseTab(tab);
                console.log(`Delete ${tab}`);
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    
                let deleted;
                DB.GetOne(tab, id)
                .then((record) => {
                    deleted = record.recordset;
                    DB.Delete(tab, id)
                    .then(() => res.end(JSON.stringify(deleted)))
                    .catch(error =>{
                        res.statusCode = 400;
                        res.end(JSON.stringify({error: String(error)}));
                    });
                })
                .catch(error =>{
                    res.statusCode = 400;
                    res.end(JSON.stringify({error: String(error)}));
                });
            }
            else{
                HTTP404(req, res);
            }
        break;
        default: HTTP404(req, res);  break;
    }
};

function parseTab(tab){
    if(tab.includes('type', tab.length-5) && !tab.includes('_type', tab.length-5)){
        tab = tab.replace('type', '_type');
    }
    if(tab.includes('s_')){
        tab = tab.replace('s_', '_');
    }

    if(tab.includes('ies', tab.length-4)){
        tab = tab.replace('ies', 'y');
    }
    else if(tab.includes('es', tab.length-3)){
        tab = tab.replace('es', 'e');
    }
    else if(tab.includes('s', tab.length-2)){
        tab = tab.slice(0, -1);
    }

    return tab;
}

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

const server = http.createServer().listen(PORT, (v) =>{
    console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)})
.on('request', http_handler);
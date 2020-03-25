const rt = require('../routing');
let url = require('url');
let qs = require('querystring');

module.exports = {
    post: (req, res)=>{
        let params = url.parse(req.url, true).query;
        let getUrl = url.parse(req.url, true).pathname;

        if(!rt.GetUrlPart(getUrl, 3)){
            switch ('/'+rt.GetUrlPart(getUrl, 2)){
                case '/':{
                    body = '';
                    req.on('data', chunk => {
                        body += chunk;
                    });
                    req.on('end', async () => {
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                        if(req.headers['content-type'] == 'text/plain'){
                            res.end(`SERVER: ${body}`);
                        }
                        else{
                            res.end(`Wrong content-type`);
                        }
                    });
                    break;
                }
                default: rt.HTTP404(req, res);  break;
            }
        }
        else{
            rt.HTTP404(req, res);
        }
    }
};
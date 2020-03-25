var xml2json = require('xml-js');
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
                        res.writeHead(200, {'Content-Type': 'application/xml; charset=utf-8'});
                        let answer;
                    
                        if(req.headers['content-type'] == 'application/xml'){
                            answer = body;
                        }
                        else{
                            answer = `Wrong content-type`;
                        }
                    
                        res.end(`<SERVER>${answer}</SERVER>`);
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
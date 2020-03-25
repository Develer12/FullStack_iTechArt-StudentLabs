const answer = require(__dirname + '/funcs');
const rt = require('../routing');
let url = require('url');

module.exports = {
    get: (req, res)=>{
        let params = url.parse(req.url, true).query;
        let getUrl = url.parse(req.url, true).pathname;

        if(!rt.GetUrlPart(getUrl, 3)){
            switch ('/'+rt.GetUrlPart(getUrl, 2)){
                case '/SUM':{
                    let x = Number(params.x);
                    let y = Number(params.y);
                
                    answer.sum(res, x, y);
                    break;
                }
                case '/SUB':{
                    let x = Number(params.x);
                    let y = Number(params.y);
                
                    answer.sub(res, x, y);
                    break;
                }
                case '/CONC':{
                    let x = params.x;
                    let y = params.y;
                
                    answer.conc(res, x, y);
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
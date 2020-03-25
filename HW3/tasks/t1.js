const rt = require('../routing');
let url = require('url');

module.exports = {
    get: (req, res)=>{
        let getUrl = url.parse(req.url, true).pathname;
        switch ('/'+rt.GetUrlPart(getUrl, 2)){
            case '/':
                sendAnswer(req, res);
            break;
            case '/A':
                switch ('/'+rt.GetUrlPart(getUrl, 3)){
                    case '/':
                        sendAnswer(req, res);
                    break;
                    case '/B':
                        if(rt.GetUrlPart(getUrl, 4)){
                            rt.HTTP404(req, res);
                        }
                        else{
                            sendAnswer(req, res);
                        }
                    break;
                    default: rt.HTTP404(req, res);  break;
                }
            break;
            default: rt.HTTP404(req, res);  break;
        }
    },
    post: (req, res)=>{
        let getUrl = url.parse(req.url, true).pathname;
        switch ('/'+rt.GetUrlPart(getUrl, 2)){
            case '/':
                sendAnswer(req, res);
            break;
            case '/C':
                switch ('/'+rt.GetUrlPart(getUrl, 3)){
                    case '/':
                        sendAnswer(req, res);
                    break;
                    case '/D':
                        if(rt.GetUrlPart(getUrl, 4)){
                            rt.HTTP404(req, res);
                        }
                        else{
                            sendAnswer(req, res);
                        }
                    break;
                    default: rt.HTTP404(req, res);  break;
                }
            break;
            default: rt.HTTP404(req, res);  break;
        }
    }
};

let sendAnswer = (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${req.method}:${req.url}`);
}
const rt = require('../routing');
let url = require('url');
let fs = require('fs');

module.exports = {
    get: (req, res)=>{
        let getUrl = url.parse(req.url, true).pathname;
        switch ('/'+rt.GetUrlPart(getUrl, 2)){
            case '/':
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(fs.readFileSync(__dirname + '/static/index.html'));
            break;
            default: rt.HTTP404(req, res);  break;
        }
    }
};
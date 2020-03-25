const rt = require('../routing');
let url = require('url');
const fs = require('fs');

module.exports = {
    get: (req, res)=>{
        let getUrl = url.parse(req.url, true).pathname;
        switch ('/'+rt.GetUrlPart(getUrl, 2)){
            case '/download':
                if(!rt.GetUrlPart(getUrl, 4)){
                    filename = rt.GetUrlPart(getUrl, 3);
                    let path = __dirname + '/files/' + filename;
                    
                    if(!fs.existsSync(path)){
                        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
                        res.end(`Wrong file name`);
                    }
                    else{
                        res.writeHead(200, {'Content-disposition': `attachment; filename="${filename}"`});
                        res.end(fs.readFileSync(path));
                    }
                }
                else{
                    rt.HTTP404(req, res);
                }

            break;
            default: rt.HTTP404(req, res);  break;
        }
    }
};
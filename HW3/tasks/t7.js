const fs = require('fs');
const rt = require('../routing');
const answer = require(__dirname + '/funcs');
let url = require('url');
let qs = require('querystring');

module.exports = {
    get: (req, res)=>{
        let getUrl = url.parse(req.url, true).pathname;

        if(!rt.GetUrlPart(getUrl, 3)){
            switch ('/'+rt.GetUrlPart(getUrl, 2)){
                case '/':{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`
                        <form id="form" enctype="multipart/form-data">
                            <input type="file" name="file">
                            <br>
                            <input type="button" onclick="sendForm(this)" value="SEND">
                            <input type="button" onclick="sendForm(this)" value="CANCEL">
                        </form>
                        <script>
                            function sendForm(butt){
                                let form = document.getElementById('form');
                                form.method = 'post';
                                form.action = '/t7/upload?butt=' + butt.value;
                
                                form.submit();
                            }
                        </script>
                    `);
                    break;
                }
                default: rt.HTTP404(req, res);  break;
            }
        }
        else{
            rt.HTTP404(req, res);
        }
    },
    post: (req, res)=>{
        let params = url.parse(req.url, true).query;
        let getUrl = url.parse(req.url, true).pathname;

        if(!rt.GetUrlPart(getUrl, 3)){
            switch ('/'+rt.GetUrlPart(getUrl, 2)){
                case '/upload':{
                    body = '';
                    req.on('data', chunk => {
                        body = chunk;
                    });
                    req.on('end', async () => {
                        let butt = params.butt.toLowerCase();
                        if(butt != 'cancel'){
                            if(body){
                                let fname = '';

                                let rex = new RegExp('filename="(.*?)"', "gmi");
                                while(re = rex.exec(body)){ fname=re[1];}
                                
                                let file = '';
                                rex = new RegExp(`\r\n\r\n(.*?)\r\n`, "gm");
                                while(re = rex.exec(body)){ file=re[1];}

                                fs.writeFile(__dirname + '/files/' + fname, file, (err) =>
                                {
                                    if(err){
                                        throw err;
                                    }
                                    else{
                                        answer.send(res);
                                    }                                
                                });
                            }
                        }
                        else{
                            answer.cancel(res);
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
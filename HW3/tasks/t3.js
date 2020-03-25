const answer = require(__dirname + '/funcs');
const rt = require('../routing');
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
                        <form id="form">
                            <input name="x" placeholder="x">
                            <input name="y" placeholder="y">
                            <br>
                            <input type="button" onclick="sendForm(this)" value="SUM">
                            <input type="button" onclick="sendForm(this)" value="SUB">
                            <input type="button" onclick="sendForm(this)" value="CONC">
                            <br>
                            <input type="button" onclick="sendForm(this)" value="CANCEL">
                        </form>
                        <script>
                            function sendForm(butt){
                                let form = document.getElementById('form');
                                form.method = 'post';
                                form.action = '/t3?butt=' + butt.value;
                
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
                case '/':{
                    let butt = params.butt.toLowerCase();

                    body = '';
                    req.on('data', chunk => {
                        body += chunk;
                    });
                    req.on('end', async () => {
                        body = qs.parse(body);

                        if(butt != 'cancel'){
                            let x = body.x;
                            let y = body.y;

                            if(butt != 'conc'){
                                x = Number(x);
                                y = Number(y);
                                (butt == 'sum') ? answer.sum(res, x, y) : answer.sub(res, x, y);
                    
                            }
                            else{
                                answer.conc(res, x, y);
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
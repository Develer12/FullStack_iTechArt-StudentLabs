const express = require('express');
const Route = express.Router();
const answer = require(__dirname + '/funcs');


Route.get('/', (req, res)=>{
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
});

Route.post('/', (req, res)=>{
    let butt = req.query.butt.toLowerCase();
    console.log(butt)
    if(butt != 'cancel'){
        let x = req.body.x;
        let y = req.body.y;

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


module.exports = Route;
const express = require('express');
const Route = express.Router();
const answer = require(__dirname + '/funcs');
const fUpload = require('express-fileupload');
const fs = require('fs');

Route.use(fUpload({createParentPaths : true}));


Route.get('/', (req, res)=>{
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
});

Route.post('/upload', (req, res)=>{
    let butt = req.query.butt.toLowerCase();
    if(butt != 'cancel'){
        if(req.files){
            let File = req.files.file;

            File.mv(__dirname + '/files/' + File.name, (err) =>
            {
                if (err) {
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


module.exports = Route;
module.exports = {
    GetUrlPart: (url_path, indx)=>{
        let i = 0;
        let curr_url = '';
        i--;
        decodeURI(url_path).split('/').forEach(e =>{
            i++;
            if(i == indx){
                curr_url = e;
                return;
            }
        });
        return curr_url?curr_url:'';
    },
    HTTP405: (req, res)=>{
        res.statusCode = 405;
        res.statusMessage = 'Resourse not found';
        res.end('Resourse not found');
    },
    HTTP404: (req, res)=>{
        res.statusCode = 404;
        res.statusMessage = 'Resourse not found';
        res.end('Resourse not found');
    }
};
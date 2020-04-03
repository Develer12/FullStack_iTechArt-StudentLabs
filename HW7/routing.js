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
    parseTab: (tab) =>{
        if(tab.includes('type', tab.length-5) && !tab.includes('_type', tab.length-5)){
            tab = tab.replace('type', '_type');
        }
        if(tab.includes('s_')){
            tab = tab.replace('s_', '_');
        }
    
        if(tab.includes('ies', tab.length-4)){
            tab = tab.replace('ies', 'y');
        }
        else if(tab.includes('es', tab.length-3)){
            tab = tab.replace('es', 'e');
        }
        else if(tab.includes('s', tab.length-2)){
            tab = tab.slice(0, -1);
        }
    
        return tab;
    },
    checkTab: (tab) =>{
        let flag;
        tabList.forEach(t => {
            if(t == tab){
                flag = true;
            }
        });
        return flag
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
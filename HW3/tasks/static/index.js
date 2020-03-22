function sendForm(butt){
    butt = butt.value.toLowerCase();

    if(butt != 'cancel'){
        let x = document.getElementById('x').value;
        let y = document.getElementById('y').value;

        if(butt != 'conc'){
            x = Number(x);
            y = Number(y);
            (butt == 'sum') ? answer.sum(x, y) : answer.sub(x, y);

        }
        else{
            answer.conc(x, y);
        }
    }
    else{
        answer.cancel();
    }}

let answer = {
    sum: (x, y) => {
        if(x && y){
            let z = x + y;
    
            alert(`${x} + ${y} = ${z}`);
        }
        else{
            alert('Input valid values');
        }
    },
    sub: (x, y) => {
        if(x && y){
            let z = x - y;
    
            alert(`${x} - ${y} = ${z}`);
        }
        else{
            alert('Input valid values');
        }
    },
    conc: (x, y) => {
        if(x && y){
            let z = x + y;
    
            alert(`${x} + ${y} = ${z}`);
        }
        else{
            alert('Input valid values');
        }
    },
    cancel: () => {
        alert(`CANCEL`);
    }
};



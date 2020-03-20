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
        let z = x + y;
    
        alert(`${x} + ${y} = ${z}`);
    },
    sub: (x, y) => {
        let z = x - y;
    
        alert(`${x} - ${y} = ${z}`);
    },
    conc: (x, y) => {
        let z = x + y;
    
        alert(`${x} + ${y} = ${z}`);
    },
    cancel: () => {
        alert(`CANCEL`);
    }
};



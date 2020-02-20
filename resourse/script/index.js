let openInfo = 'delivery';
let openOrder = '';

let Stat = {
delivery: 
`<div class="left">
    <span class="fat big">Shipping Address</span>
    <hr>
    <div class="status_list">
        <div class="status right">
            <span>Name:</span>
            <span>Street:</span>
            <span>Zip Code / City:</span>
            <span>Region:</span>
            <span>Country:</span>
        </div>
        <div class="status black">
            <span>ExellentCompany</span>
            <span>Tottenham Court Road</span>
            <span>N170AA London</span>
            <span>Greater London</span>
            <span>United Kingdom</span>
        </div>
    </div>
</div>`,
processor: ``
}

window.addEventListener(`resize`, event => {
    checkMobile();
}, false);

function checkMobile(){
    let list_bar = document.getElementById('list_bar');
    let order_bar = document.getElementById('order_bar');
    let header = document.getElementById('header');
    if(window.innerWidth < 750){
        list_bar.classList = ' ';
        list_bar.classList.add('list-bar');
        list_bar.classList.add('hidden');

        order_bar.classList = ' ';
        order_bar.classList.add('order-bar');
        order_bar.classList.add('hidden');
        header.innerHTML = 
        `<div class="blue-header order-header">
            <button class="menu-ico min-but" id=""></button> 
            <p class="text-header">Order</p>
        </div>
        <hr>`
    }
    else{
        list_bar.classList = ' ';
        list_bar.classList.add('list-bar');
        list_bar.classList.add('visible');

        order_bar.classList = ' ';
        order_bar.classList.add('order-bar');
        order_bar.classList.add('visible');
        header.innerHTML = 
        `<p class="blue-header text-header">Order</p>
        <hr>`
    }
}


function start()
{
    StatusO(document.getElementById(openInfo), openInfo);
    OrderCount();
    ItemCount();
    checkMobile();
    let CountListener = new MutationObserver((mutations)=>{
        mutations.forEach((mutation)=>{
            OrderCount();
        });    
    });
    CountListener.observe(document.getElementById('list_order'), {
        childList: true,
        attributes: true,
        subtree: true,
        characterData: true
    });
}


function OpenStatus(elem){
    let id = elem.id;
    if(id!=openInfo){
        StatusC(document.getElementById(openInfo));
        StatusO(elem, id);
    }
}

function OrderClicked(elem){
    let id = elem.id;
    if(id!=openInfo){
        StatusC(document.getElementById(openInfo));
        StatusO(elem, id);
    }
}

function StatusC(elem){
    elem.classList = ' ';
    elem.classList.add('din-butt');
    elem.classList.add(openInfo);
    elem.innerHTML =' '
    document.getElementById('order_status').innerHTML=' ';
}

function StatusO(elem, id){
    elem.classList = ' ';
    elem.classList.add('din-buttC');
    elem.classList.add(id+'C');
    elem.innerHTML=`<div class="hr"></div>`
    openInfo = id;
    document.getElementById('order_status').innerHTML=Stat[openInfo];
}

function OpenOrder(elem){
    let id = elem.id;
    if(id!=openOrder){
        if(openOrder)
            OrderC(document.getElementById(openOrder));
        OrderO(elem, id);

    }
    ItemCount();
}

function OrderC(elem){
    elem.classList = ' ';
    elem.classList.add('list-order-content');
    document.getElementById('order_status');
}

function OrderO(elem, id){
    elem.classList = ' ';
    elem.classList.add('list-order-content');
    elem.classList.add('list-order-contentC');
    openOrder = id;
}

function OrderCount(){
    let Count  = document.getElementById('list_order').childElementCount;
    document.getElementById('order_count').innerHTML = `Orders (${Count})`;
}

function ItemCount(){
    let Count  = document.getElementById('table_items').childElementCount;
    document.getElementById('items_count').innerHTML = `Line Items (${Count})`;
}

function SearchHandler(elem){
    let input = elem.querySelector('input').value;
    let searchArrea;
    let id = elem.id;
    alert(input);

    if(input.indexOf('da') + 1) {
        alert(input);
    }
}

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
        list_bar.classList.add('list_bar');
        list_bar.classList.add('hidden');

        order_bar.classList = ' ';
        order_bar.classList.add('order_bar');
        order_bar.classList.add('hidden');
        header.innerHTML = 
        `<div class="blue_header order_header">
            <button class="menu_ico min_but" id=""></button> 
            <p class="text_header">Order</p>
        </div>
        <hr>`
    }
    else{
        list_bar.classList = ' ';
        list_bar.classList.add('list_bar');
        list_bar.classList.add('visible');

        order_bar.classList = ' ';
        order_bar.classList.add('order_bar');
        order_bar.classList.add('visible');
        header.innerHTML = 
        `<p class="blue_header text_header">Order</p>
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
function StatusO(elem, id){
    elem.classList = ' ';
    elem.classList.add('din_buttC');
    elem.classList.add(id+'C');
    elem.innerHTML=`<div class="hr"></div>`
    openInfo = id;
    document.getElementById('order_status').innerHTML=Stat[openInfo];
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
    elem.classList.add('din_butt');
    elem.classList.add(openInfo);
    elem.innerHTML =' '
    document.getElementById('order_status').innerHTML=' ';
}

function StatusO(elem, id){
    elem.classList = ' ';
    elem.classList.add('din_buttC');
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
    elem.classList.add('list_order_content');
    document.getElementById('order_status');
}

function OrderO(elem, id){
    elem.classList = ' ';
    elem.classList.add('list_order_content');
    elem.classList.add('list_order_contentC');
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


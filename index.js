let openid = 'delivery';

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
  }, false);

function start()
{
    StatusO(document.getElementById(openid), openid);
    OrderCount();
    ItemCount();
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
    if(id!=openid){
        StatusC(document.getElementById(openid));
        StatusO(elem, id);
    }
}
function StatusO(elem, id){
    elem.classList = ' ';
    elem.classList.add('din_buttC');
    elem.classList.add(id+'C');
    elem.innerHTML=`<div class="hr"></div>`
    openid = id;
    document.getElementById('order_status').innerHTML=Stat[openid];
}
function StatusC(elem){
    elem.classList = ' ';
    elem.classList.add('din_butt');
    elem.classList.add(openid);
    elem.innerHTML =' '
    document.getElementById('order_status').innerHTML=' ';
}

function OpenOrder(elem){
    alert("ID: "+elem.id);

    ItemCount();
}

function OrderCount(){
    let Count  = document.getElementById('list_order').childElementCount;
    document.getElementById('order_count').innerHTML = `Orders (${Count})`;
}

function ItemCount(){
    let Count  = document.getElementById('table_items').childElementCount;
    document.getElementById('items_count').innerHTML = `Line Items (${Count})`;
}
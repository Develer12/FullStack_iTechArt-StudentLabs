let openInfo = 'delivery';
let openOrder = '';
let MobStatus = '';

let ItemsSort = '';
let ButtSort = '';
let ItemsListSorted = {};
let ItemsList = {};
let ItemsHeader = '';
let SearchFilter = 'all';
let mapAddress = {};

let Stat = {
delivery: 
    `<div class="left">
        <div class="items-header">
            <span class="fat big">Shipping Address</span>
            <button class="editOrder-ico min-but visibilityN" onclick="changeOrder('ship', 'change')"></button> 
        </div>
        <hr>
    </div>`,
processor:
    `<div class="left">
        <div class="items-header">
            <span class="fat big">Processor Information</span>
            <button class="editOrder-ico min-but visibilityN" onclick="changeOrder('process', 'change')"></button> 
        </div>
        <hr>
    </div>`,
ymap:
    `<div class="left">
        <span class="fat big">Address</span>
        <hr>
        <div class="map" id="map">
        
        </div>
    </div>`,
};

window.addEventListener(`resize`, event => {
    checkMobile();
}, false);

let isMobile = () =>{
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Opera Mini/i).test(navigator.userAgent); 
};

function checkMobile(){
    let list_bar = document.getElementById('list_bar');
    let order_bar = document.getElementById('order_bar');
    let header = document.getElementById('header');
    if(((window.innerWidth < window.innerHeight + 50) && !MobStatus) || isMobile()){
        MobStatus = true;
        list_bar.classList.add('hidden');
        list_bar.classList.remove('visible');

        order_bar.classList.add('hidden');
        order_bar.classList.remove('visible');
        header.innerHTML = 
        `<div class="blue-header order-header">
            <div class="blue-header text-header">Order</div>
            <button class="menu-ico min-but" onclick="SideBar(this)" id="OpenSideBar"></button> 
        </div>
        <hr>`;

        StatusO(document.getElementById(openInfo), openInfo);
        DrowOrderItems();
    }
    else if(((window.innerWidth > window.innerHeight) && MobStatus) || isMobile()){
        MobStatus = false;
        list_bar.classList = ' ';
        list_bar.classList.add('list-bar');
        list_bar.classList.add('visible');

        order_bar.classList.remove('hidden');
        order_bar.classList.add('visible');
        header.innerHTML = 
        `<p class="blue-header text-header">Order</p>
        <hr>`;

        StatusO(document.getElementById(openInfo), openInfo);
        DrowOrderItems();
    }
}
let SideBarListener 

function SideBar(elem){
    let sidebar = document.getElementById('list_bar');
    let close = document.getElementById('CloseSideBar');
    let dark = document.getElementById('curtain');

    if(elem.id == 'OpenSideBar'){
        closeWindow();
        makeDarkness();

        document.addEventListener('click', e => {
            let target = e.target;  
            let isopen = target == elem || sidebar.contains(target);
            let isdark = dark.classList.contains('darkness');
            let win = document.getElementsByClassName('change-window')[0];
            if (target.id != 'OpenSideBar' && !isopen && isdark && !win) {
                SideBar(close);
                console.log('ev')
            }
        });

                
        close.classList.remove('hidden');
        close.classList.add('visible');
        sidebar.classList = ' ';
        sidebar.classList.add('list-bar');
        sidebar.classList.add('side-bar');
    }
    else{
        makeDarkness();
        elem.classList.add('visible');
        close.classList.add('hidden');
        close.classList.remove('visible');
        sidebar.classList = ' ';
        sidebar.classList.add('list-bar');
        sidebar.classList.add('side-barC');
    }
}

function start(){
    StatusO(document.getElementById(openInfo), openInfo);
    Drowjsloading('list_order');
    GetOrders();
    checkMobile();
}


function OpenStatus(elem){
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
    elem.innerHTML = ' ';
    document.getElementById('order_status').innerHTML=' ';
}

function StatusO(elem, id){
    elem.classList = ' ';
    elem.classList.add('din-buttC');
    elem.classList.add(id + 'C');
    elem.innerHTML=`<div class="hr"></div>`;

    openInfo = id;
    document.getElementById('order_status').innerHTML=Stat[openInfo];

    if(openInfo == 'ymap'){
        initMap();
    }

    let items = document.getElementsByClassName('js-status');
    Array.from(items).forEach(item => {
        if(item.id == 'status_item'){
            if(MobStatus || isMobile()){
                item.classList.add('statusM');
            }            
            else{
                item.classList.remove('statusM');
            }
        }
    })
}

async function OpenOrder(elem){
    ItemsSort = '';
    let id = elem.id;
    let close = document.getElementById('CloseSideBar');
    if(!(close.className.indexOf('hidden') + 1)){
        SideBar(close);
    }

    if(id!=openOrder){
        elem.scrollIntoView();
        document.getElementById('order_scroll').style = 'display: none;';

        if(openOrder && document.getElementById(openOrder)){
            OrderC(document.getElementById(openOrder));
        }

        OrderO(elem, id);
        document.getElementById('order-items-search').querySelector('input').value = '';

        let order_content = document.getElementById('order_content');
        order_content.innerHTML = '';
        Drowjsloading('order_content');
        Drowjsloading('order_items');

        let tab = document.getElementById('table_items');
        if(tab.childElementCount){
            tab.innerHTML = '';
        }

        let LINK = `/api/orders/${id}`;
        fetch(LINK, {method: 'GET'}).then(res => res.json()).then(res =>{
            let priceF = 0;
            OpenStatus(document.getElementById('delivery'));
            ItemsList = res.products;
            priceF = DrowOrderItems();
            let customerName = res.CustomerInfo.firstName +' '+ res.CustomerInfo.lastName;
            DrowOrderStat(res.ShipTo, res.ProcessorInfo, customerName);
            StatusO(document.getElementById(openInfo), openInfo);

            document.getElementById('order_priceF').innerHTML = priceF;
            if(res.products[0])
                document.getElementById('order_currency').innerHTML = res.products[0].currency;
            document.getElementById('order_ship').innerHTML = `Shipped: ${res.OrderInfo.shippedAt}`;
            document.getElementById('order_ord').innerHTML = `Ordered: ${res.OrderInfo.acceptedAt}`;
            document.getElementById('order_customer').innerHTML = `Customer: ${res.CustomerInfo.firstName} ${res.CustomerInfo.lastName}`;
            document.getElementById('order_id').innerHTML = `Order ${res.id}`;
            document.getElementById('sendmail').onclick = () => {
                location.href =`mailto:${res.CustomerInfo.email}`;
            };

            ItemCount(res.products.length);

            mapAddress = {
                country: res.ShipTo.Country, 
                region: res.ShipTo.Region, 
                address: res.ShipTo.Address
            }

            let url = window.location.pathname;
            if(url != '/orders')
            url = url.substring(0, url.lastIndexOf("/"));
            history.pushState(null, null, `${url}/${id}`);
        })
        .then(() => {
            order_content.removeChild(document.getElementsByClassName('js-loading')[0]);
            document.getElementById('order_scroll').style = 'display: block;';
        })
        .catch((err) => console.log(`Fetch ERROR by ${LINK}: ${err}`));

        let orderButtons = document.querySelectorAll('button.visibilityN');
        if(orderButtons){
            orderButtons.forEach(button => {
                button.classList.remove('visibilityN');
            });
        }
    }
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

function OrderCount(count){
    document.getElementById('order_count').innerHTML = `Orders (${count})`;
    if(!count){
        document.getElementById('list_order').innerHTML = `
            <img src="/resourse/style/img/empty.png" class="emptyImg">
            <span class="big fat js-empty">Empty</span>`;
    }
}

function ItemCount(count){
    let empty = document.getElementById('order_items').getElementsByClassName('js-empty')[0];
    if(empty){
        empty.parentNode.removeChild(empty);
    }
    document.getElementById('items_count').innerHTML = `Line Items (${count})`;
    if(!count){
        let div = document.createElement('div');
        div.setAttribute('class', 'js-empty');
        div.innerHTML = `
                <img src="/resourse/style/img/empty.png" class="emptyImg">
                <span class="big fat js-empty">Empty</span>`;
        document.getElementById('order_items').append(div);
    }
}

async function SearchHandler(elem){
    let input = elem.querySelector('input').value;
    let id = elem.id;
    if(id == 'order-items-search'){
        Drowjsloading('order_items');
        let tab = document.getElementById('table_items');
        if(tab.childElementCount){
            tab.innerHTML = '';
        }

        let LINK = `/api/orders/item/search?i=${input}&id=${openOrder}`;
        fetch(LINK, {method: 'GET'})
        .then(res => res.json())
        .then(res =>{
            ItemsList = res;
            priceF = DrowOrderItems();
            ItemCount(res.length);
        })
        .catch((err) => console.log(`Fetch ERROR by ${LINK}: ${err}`));

    }
    else if(id == 'order-search'){
        let container = document.getElementById('list_order');
        container.innerHTML = ' ';
        Drowjsloading('list_order');

        let LINK = `/api/orders/search?i=${input}&filter=${SearchFilter}`;
        fetch(LINK, {method: 'GET'})
        .then(res => res.json())
        .then(res =>{
            res.forEach(row => {
                container.append(DrowOrderList(row));
            });
            OrderCount(res.length);
        })
        .catch((err) => console.log(`Fetch ERROR by ${LINK}: ${err}`));
    }
}

async function GetOrders(){
    Drowjsloading('list_order');

    let LINK = '/api/orders';
    fetch(LINK, {method: 'GET'})
    .then(res => res.json())
    .then(res =>{
        let container = document.getElementById('list_order');
        container.innerHTML = ' ';

        res.forEach(row => {
            container.append(DrowOrderList(row));
        });
        OrderCount(res.length);
    })
    .then(() => openOrderUrl())
    
}

function DrowOrderStat(ship, processor, customerName){
    Stat.processor = `
    <div class="left">
        <div class="items-header">

            <span class="fat big">Processor Information</span>
            <button class="editOrder-ico min-but" onclick="changeOrder('process', 'change')"></button> 
        </div>
        <hr>
        <table class="status-list">
            <thead>
                <tr id="status_item" class="js-status">
                    <td>Name:</td>
                    <td class="status black" id="name">${processor.name}</td>
                </tr>
                <tr id="status_item" class="js-status">
                    <td>Employee ID:</td>
                    <td class="status black" id="id">${processor.employeeId}</td>
                </tr>
                <tr id="status_item" class="js-status">
                    <td>Job Title:</td>
                    <td class="status black" id="job">${processor.jobTitle}</td>
                </tr>
                <tr id="status_item" class="js-status">
                    <td>Phone:</td>
                    <td class="status black">
                        <a href="tel:${processor.phone}" id="phone">${processor.phone}</a>
                    </td>
                </tr>
            </thead>
        </table>
    </div>`;

    Stat.delivery = `
    <div class="left">
        <div class="items-header">
            <span class="fat big">Shipping Address</span>
            <button class="editOrder-ico min-but" onclick="changeOrder('ship', 'change')"></button> 
        </div>
        <hr>
        <table class="status-list">
            <thead>
                <tr id="status_item" class="js-status">
                    <td>Addressee ID:</td>
                    <td class="status black" id="id">${ship.id}</td>
                </tr>
                <tr id="status_item" class="js-status">
                    <td>Name:</td>
                    <td class="status black" id="name">${customerName}</td>
                </tr>
                <tr id="status_item" class="js-status">
                    <td>Street:</td>
                    <td class="status black" id="street">${ship.Address}</td>
                </tr>
                <tr id="status_item" class="js-status">
                    <td>Zip Code / City:</td>
                    <td class="status black" id="zip">${ship.ZIP}</td>
                </tr>
                <tr id="status_item" class="js-status">
                    <td>Region:</td>
                    <td class="status black" id="region">${ship.Region}</td>
                </tr>
                <tr id="status_item" class="js-status">
                    <td>Country:</td>
                    <td class="status black" id="country">${ship.Country}</td>
                </tr>
            </thead>
        </table>
    </div>`;
}

function DrowOrderList(row){
    let status = 
        row.status=='Accepted'?'class="Intime">In time'
            : row.status=='Pending'?'class="Urgent">Urgent'
            :'Unknown';
    let div = document.createElement('div');
    div.setAttribute('class', 'list-order-c');

    let flag = '';
    if(openOrder == row.id){
        flag = 'list-order-contentC';
    }

    div.innerHTML = `
        <div onclick="OpenOrder(this)" id="${row.id}" class="list-order-content ${flag}">
            <div class="order-content-l">
                <p class="fat big textCut">Order ${row.id}</p>
                <p class="textCut">${row.customer}</p>
                <p class="textCut">Shipped: ${row.shippedAt}</p>
            </div>
            <div class="order-content-r right">
                <p class="fat big">${row.acceptedAt}</p>
                <p ${status}</p>
            </div>
        </div>
        <hr>`;
    return div;
}

function DrowOrderItems(){
    let thead = document.getElementById('table_head');

    if(MobStatus || isMobile()){
        ItemsHeader = thead.innerHTML;
        thead.innerHTML = `
            <tr>
                <td class="left">Product</td>
                <td></td>
            </tr>`;
    }
    else{
        if(ItemsSort == ''){
            thead.innerHTML = `
                <tr class="right">
                    <td class="left">
                        <div class="items-header">
                            Product
                            <div class="left">
                                <button class="min-but arrowUD-ico" onclick="SortProducts(this)" id="OrderProd_name"></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="items-header">
                            Unit Price
                            <div class="left">
                                <button class="min-but arrowUD-ico" onclick="SortProducts(this)" id="OrderProd_price"></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="items-header">
                            Quantity
                            <div class="left">
                                <button class="min-but arrowUD-ico" onclick="SortProducts(this)" id="OrderProd_quantity"></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="items-header">
                            Total
                            <div class="left">
                                <button class="min-but arrowUD-ico" onclick="SortProducts(this)" id="OrderProd_totalPrice"></button>
                            </div>
                        </div>
                    </td>
                    <td></td>
                </tr>`;
        }
        else{
            if(ItemsHeader != '' && !(ItemsHeader.indexOf('<td class="left">Product</td>') + 1)){
                thead.innerHTML = ' ';
                thead.innerHTML = ItemsHeader;
            }
        }
    }
    
    let priceF = 0;
    priceF = forOrderItems(priceF);
    return priceF;
}

function forOrderItems(priceF){
    let container = document.getElementById('table_items');
    container.innerHTML = ' ';
    Drowjsloading('order_items');
    if(ItemsList[0]){
        if(ItemsSort != ''){
            ItemsListSorted = SortItemsBy();

            ItemsListSorted.forEach(row => {
                priceF = DrowOrderItemsList(container, row, priceF);
            });
        }
        else{
            ItemsList.forEach(row => {
                priceF = DrowOrderItemsList(container, row, priceF);
            });   
        }
    }
    let div = document.getElementById('order_items').getElementsByClassName('js-loading')[0];
    if(div){
        div.parentNode.removeChild(div);
    }
    return priceF;
}

function SortItemsBy(){
    let List = [];
    for(n in ItemsList)
        List[n] = ItemsList[n];
    let asc = (ItemsSort.indexOf('Desc') + 1)?ItemsSort.slice(0, ItemsSort.length-4):ItemsSort;
    List.sort((a, b) => {
        a = a[asc];
        b = b[asc];
        if(Number.isInteger(Number(a)) || Number.isInteger(Number(b))){
            return a - b;
        }
        else{
            return a > b ? 1 : -1;
        }
    });
    if(ItemsSort.indexOf('Desc') + 1){
        List.reverse();
    }
    return List;
}

function SortProducts(elem){
    if(ButtSort != '' && ButtSort != elem.id){        
        let butt = document.getElementById(ButtSort);
        butt.className = 'min-but arrowUD-ico';
    }
    if(ItemsList[0]){
        let param = elem.id.slice(10, elem.id.length);
        if(elem.className.indexOf('arrowUD-ico') + 1){
            elem.classList.remove('arrowUD-ico');
            elem.classList.add('arrowU-ico');
            ItemsSort = param;
        }
        else if(elem.className.indexOf('arrowU-ico') + 1){
            elem.classList.remove('arrowU-ico');
            elem.classList.add('arrowD-ico');
            ItemsSort = param + 'Desc';
        }
        else if(elem.className.indexOf('arrowD-ico') + 1){
            elem.classList.remove('arrowD-ico');
            elem.classList.add('arrowUD-ico');
            ItemsSort = '';
        }

        forOrderItems(null);
        ButtSort = elem.id;
    }
}

function DrowOrderItemsList(container, row, priceF){
    priceF += Number(row.totalPrice);
    let tab = document.createElement('tr');
    tab.id = row.list;
    if(MobStatus || isMobile()){
        tab.innerHTML = `
            <td class="left mob-tab">
                <span class="black" id="products_name">${row.name}</span>
                <br>
                <span id="id">${row.id}</span>
                <br>
                <br>
                <span>Unit Price:</span>
                <br>
                <span class="black" id="product_price">${row.price}</span> 
                <span class="money" id="product_currency">${row.currency}</span>
                <br>
                <br>
                <span>Quantity:</span>
                <br>
                <span id="product_quantity">${row.quantity}</span>
                <br>
                <br>
                <span>Total:</span>
                <br>
                <span class="black" id="product_totalPrice">${row.totalPrice}</span> 
                <span class="money" id="product_currency">${row.currency}</span>
            </td>
            <td>                
                <button class="editItem-ico min-but" onclick="changeOrder('item', 'change', this)"></button> 
                <button class="delOrder-ico min-but" onclick="delOrder(this)"></button>
            </td>    
            `;
    }
    else{
        tab.innerHTML = `
            <td class="left">
                <span class="black" id="products_name">${row.name}</span>
                <br>
                <span id="id">${row.id}</span>
            </td>
            <td>
                <span class="black" id="product_price">${row.price}</span> 
                <span class="money" id="product_currency">${row.currency}</span>
            </td>
            <td id="product_quantity">${row.quantity}</td>
            <td>
                <span class="black" id="product_totalPrice">${row.totalPrice}</span> 
                <span class="money" id="product_currency">${row.currency}</span>
            </td>
            <td>
                <button class="editItem-ico min-but" onclick="changeOrder('item', 'change', this)"></button> 
                <button class="delOrder-ico min-but" onclick="delOrder(this)"></button>
            </td>
            `;
    }
    container.append(tab);
    return priceF;
}

function Drowjsloading(block){
    let container = document.getElementById(block);
    let div = container.getElementsByClassName('js-loading')[0];
    if(div){
        div.parentNode.removeChild(div);
    }
    div = document.createElement('div');
    div.className = 'js-loading';
    div.innerHTML = `
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>`;
    container.append(div);
}

let makeDarkness = () => {
    let dark = document.getElementById('curtain');
    if(!dark.classList.contains('darkness')){
        dark.classList.add('darkness');
        dark.classList.remove('lightness');
        console.log('dark')
    }
    else{
        dark.classList.remove('darkness');
        dark.classList.add('lightness');
        console.log('lig')
    }
};
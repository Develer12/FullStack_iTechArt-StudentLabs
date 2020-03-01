let openInfo = 'delivery';
let openOrder = '';
let MobStatus = '';

let ItemsSort = '';
let ButtSort = '';
let ItemsListSorted = {};
let ItemsList = {};
let ItemsHeader = '';

let innerWidth;
let innerHeight;

let Stat = {
delivery: 
    `<div class="left">
        <span class="fat big">Shipping Address</span>
        <hr>
    </div>`,
processor:
    `<div class="left">
        <span class="fat big">Processor Information</span>
        <hr>
    </div>`,
map:
    `<div class="left">
        <span class="fat big">Address</span>
        <hr>
    </div>`,
}

window.addEventListener(`resize`, event => {
    checkMobile();
}, false);

function checkMobile(){
    let list_bar = document.getElementById('list_bar');
    let order_bar = document.getElementById('order_bar');
    let header = document.getElementById('header');
    if((window.innerWidth < window.innerHeight) && !MobStatus){
        MobStatus = true;
        list_bar.classList = ' ';
        list_bar.classList.add('list-bar');
        list_bar.classList.add('hidden');

        order_bar.classList = ' ';
        order_bar.classList.add('order-bar');
        order_bar.classList.add('hidden');
        header.innerHTML = 
        `<div class="blue-header order-header">
            <p class="blue-header text-header">Order</p>
            <button class="menu-ico min-but" onclick="SideBar(this)" id="OpenSideBar"></button> 
        </div>
        <hr>`;

        StatusO(document.getElementById(openInfo), openInfo);
        DrowOrderItems();
    }
    else if((window.innerWidth > window.innerHeight) && MobStatus){
        MobStatus = false;
        list_bar.classList = ' ';
        list_bar.classList.add('list-bar');
        list_bar.classList.add('visible');

        order_bar.classList = ' ';
        order_bar.classList.add('order-bar');
        order_bar.classList.add('visible');
        header.innerHTML = 
        `<p class="blue-header text-header">Order</p>
        <hr>`;

        StatusO(document.getElementById(openInfo), openInfo);
        DrowOrderItems();
    }
}

function SideBar(elem){
    let id = elem.id;
    let sidebar = document.getElementById('list_bar');
    let close = document.getElementById('CloseSideBar');
    if(id == 'OpenSideBar'){
        close.classList.remove('hidden');
        close.classList.add('visible');
        sidebar.classList = ' ';
        sidebar.classList.add('list-bar');
        sidebar.classList.add('side-bar');
    }
    else{
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
    GetOrders();
    OrderCount();
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

    let items = document.getElementsByClassName('status');
    Array.from(items).forEach(item => {
        if(item.id == 'status_item'){
            if(MobStatus)
                item.classList.add('statusM');
            else
                item.classList.remove('statusM');
        }
    })
}

async function OpenOrder(elem){
    ItemsSort = '';
    let id = elem.id;
    let close = document.getElementById('CloseSideBar');
    if(!(close.className.indexOf('hidden') + 1))
        SideBar(close);
    if(id!=openOrder){
        if(openOrder)
            OrderC(document.getElementById(openOrder));
        OrderO(elem, id);
        let LINK = `http://localhost:3000/api/orders/${id}`;
        fetch(LINK, {method: 'GET'}).then(res => res.json()).then(res =>{
            let priceF = 0;
            ItemsList = res.products;
            priceF = DrowOrderItems();

            DrowOrderStat(res.ShipTo, res.ProcessorInfo);
            StatusO(document.getElementById(openInfo), openInfo);

            document.getElementById('order_priceF').innerHTML = priceF;
            document.getElementById('order_currency').innerHTML = res.products[0].currency;
            document.getElementById('order_ship').innerHTML = `Shipped: ${res.OrderInfo.shippedAt}`;
            document.getElementById('order_ord').innerHTML = `Ordered: ${res.OrderInfo.createdAt}`;
            document.getElementById('order_customer').innerHTML = `Customer: ${res.CustomerInfo.firstName} ${res.CustomerInfo.lastName}`;
            document.getElementById('order_id').innerHTML = `Order ${res.id}`;
            document.getElementById('sendmail').formAction = `mailto:${res.CustomerInfo.email}`
            
        }).then(() => ItemCount());
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

function OrderCount(){
    let Count  = document.getElementById('list_order').childElementCount;
    document.getElementById('order_count').innerHTML = `Orders (${Count})`;
}

function ItemCount(){
    let Count  = document.getElementById('table_items').childElementCount;
    document.getElementById('items_count').innerHTML = `Line Items (${Count})`;
}

async function SearchHandler(elem){
    let input = elem.querySelector('input').value;
    let id = elem.id;
    if(id == 'order-items-search'){
        let LINK = `http://localhost:3000/api/orders/items/search?i=${input}&id=${openOrder}`;
        fetch(LINK, {method: 'GET'}).then(res => res.json()).then(res =>{
            ItemsList = res;
            priceF = DrowOrderItems();
        });
    }
    else if(id == 'order-search'){
        let LINK = `http://localhost:3000/api/orders/search?i=${input}`;
        fetch(LINK, {method: 'GET'}).then(res => res.json()).then(res =>{
                let container = document.getElementById('list_order');
                container.innerHTML = ' ';
    
                res.forEach(row => {
                    container.append(DrowOrderList(row));
                });
        });
    }
}

async function GetOrders(){
    let LINK = 'http://localhost:3000/api/orders';
    fetch(LINK, {method: 'GET'}).then(res => res.json()).then(res =>{
        let container = document.getElementById('list_order');
        container.innerHTML = ' ';

        res.forEach(row => {
            container.append(DrowOrderList(row));
        });
    });
}

function DrowOrderStat(ship, processor){
    Stat.processor = `
    <div class="left">
        <span class="fat big">Processor Information</span>
        <hr>
        <table class="status-list">
            <thead>
                <tr id="status_item" class="status">
                    <td>Name:</td>
                    <td class="status black">${processor.name}</td>
                </tr>
                <tr id="status_item" class="status">
                    <td>Employee ID:</td>
                    <td class="status black">${processor.employeeId}</td>
                </tr>
                <tr id="status_item" class="status">
                    <td>Job Title:</td>
                    <td class="status black">${processor.jobTitle}</td>
                </tr>
                <tr id="status_item" class="status">
                    <td>Phone:</td>
                    <td class="status black">
                        <a href="tel:${processor.phone}">${processor.phone}</a>
                    </td>
                </tr>
            </thead>
        </table>
    </div>`;

    Stat.delivery = `
    <div class="left">
        <span class="fat big">Shipping Address</span>
        <hr>
        <table class="status-list">
            <thead>
                <tr id="status_item" class="status">
                    <td>Name:</td>
                    <td class="status black">${ship.name}</td>
                </tr>
                <tr id="status_item" class="status">
                    <td>Street:</td>
                    <td class="status black">${ship.Address}</td>
                </tr>
                <tr id="status_item" class="status">
                    <td>Zip Code / City:</td>
                    <td class="status black">${ship.ZIP}</td>
                </tr>
                <tr id="status_item" class="status">
                    <td>Region:</td>
                    <td class="status black">${ship.Region}</td>
                </tr>
                <tr id="status_item" class="status">
                    <td>Country:</td>
                    <td class="status black">${ship.Country}</td>
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
    div.innerHTML = `
        <div onclick="OpenOrder(this)" id="${row.id}" class="list-order-content">
            <div class="order-content-l">
                <p class="fat big textCut">Order ${row.id}</p>
                <p class="textCut">${row.customer}</p>
                <p class="textCut">Shipped: ${row.shippedAt}</p>
            </div>
            <div class="order-content-r right">
                <p class="fat big">${row.createdAt}</p>
                <p ${status}</p>
            </div>
        </div>
        <hr>`;
    return div;
}

function DrowOrderItems(){
    let thead = document.getElementById('table_head');

    if(MobStatus){
        ItemsHeader = thead.innerHTML;
        thead.innerHTML = `
            <tr>
                <td class="left">Product</td>
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
    priceF = forOrderItems(priceF)
    return priceF;
}

function forOrderItems(priceF){
    let container = document.getElementById('table_items');
    container.innerHTML = ' ';
    if(ItemsList[0]){
        if(ItemsSort != ''){
            ItemsListSorted = SortItemsBy();
            ItemsListSorted.forEach(row => {
                priceF = DrowOrderItemsList(container, row, priceF);
            });
        }
        else
            ItemsList.forEach(row => {
                priceF = DrowOrderItemsList(container, row, priceF);
            });
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
            a > b ? 1 : -1;
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
    if(MobStatus){
        tab.innerHTML = `
            <tr>
            <td class="left mob-tab">
                <span class="black" id="products_name">${row.name}</span>
                <br>
                <span id="product_id">${row.id}</span>
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
                <span>${row.quantity}</span>
                <br>
                <br>
                <span>Total:</span>
                <br>
                <span class="black" id="product_totalPrice">${row.totalPrice}</span> 
                <span class="money" id="product_currency">${row.currency}</span>
            </td>`;
    }
    else{
        tab.innerHTML = `
        <td class="left">
            <span class="black" id="products_name">${row.name}</span>
            <br>
            <span id="product_id">${row.id}</span>
        </td>
        <td>
            <span class="black" id="product_price">${row.price}</span> 
            <span class="money" id="product_currency">${row.currency}</span>
        </td>
        <td>${row.quantity}</td>
        <td>
            <span class="black" id="product_totalPrice">${row.totalPrice}</span> 
            <span class="money" id="product_currency">${row.currency}</span>
        </td>`;
    }
    container.append(tab);
    return priceF;
}
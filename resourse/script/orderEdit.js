let view ={
    order: 
    `
        <span class="big">Order №:</span>
        <input type="number" name="id" min="1" placeholder="Order №" required>
        <span class="big">Customer name:</span>
        <input type="text" name="customer" maxlength="50" placeholder="Customer" required>
        <span class="big">Ship Date:</span>
        <input type="date" name="shippedAt" placeholder="Date of shiping" required>
        <span class="big">Accept Date:</span>
        <input type="date" name="acceptedAt" placeholder="Date of shiping" required>
        <span class="big">Order status:</span>
        <select name="status">
            <option value="" disabled>Order status</option>
            <option selected value="Accepted">In time</option>
            <option value="Pending">Urgent</option>
        </select>
        <input type="submit" id="search" value="Send"></button>
    `,
    item: 
    `
        <span class="big">Product ID:</span>
        <select name="id" onchange="chooseSelect(this, 'item')" required>
            <option value="" disabled selected>Product ID</option>
        </select>
        <span class="big">Order Item ID:</span>
        <input type="number" name="prod_id" min="1" placeholder="Order Item ID" readonly>
        <span class="big">Quantity:</span>
        <input type="number" name="quantity" min="1" placeholder="Quantity" required>
        <span class="big">Product name:</span>
        <input type="text" name="name" placeholder="Product name" readonly>
        <span class="big">Price of unit:</span>
        <input type="number" name="price" step="0.01" min="0" placeholder="Unit Price" readonly>
        <span class="big">Price currency:</span>
        <input type="text" name="currency" placeholder="Currency" readonly>
        <input type="submit" id="search" value="Send"></button>
    `,
    itemAdd: 
    `
        <span class="big">Product ID:</span>
        <select name="id" onchange="chooseSelect(this, 'item')" required>
            <option value="" disabled selected>Product ID</option>
        </select>
        <span class="big">Quantity:</span>
        <input type="number" name="quantity" min="1" placeholder="Quantity" required>
        <span class="big">Product name:</span>
        <input type="text" name="name" placeholder="Product name" readonly>
        <span class="big">Price of unit:</span>
        <input type="number" name="price" step="0.01" min="0" placeholder="Unit Price" readonly>
        <span class="big">Price currency:</span>
        <input type="text" name="currency" placeholder="Currency" readonly>
        <input type="submit" id="search" value="Send"></button>
    `,
    ship: 
    `
        <span class="big">Addressee ID:</span>
        <select name="id" onchange="chooseSelect(this, 'ship')" required>
            <option value="" disabled selected>Addressee ID</option>
        </select>
        <span class="big">First name:</span>
        <input type="text" name="firstName" placeholder="First Name" readonly>
        <span class="big">Last name:</span>
        <input type="text" name="lastName" placeholder="Last Name" readonly>
        <span class="big">E-mail:</span>
        <input type="text" name="email" placeholder="E-mail" readonly>
        <span class="big">Street:</span>
        <input type="text" name="address" placeholder="Street" readonly>
        <span class="big">Zip Code / City:</span>
        <input type="number" name="zip" min="1" placeholder="Zip Code / City" readonly>
        <span class="big">Region:</span>
        <input type="text" name="region" placeholder="Region" readonly>
        <span class="big">Country:</span>
        <input type="text" name="country" placeholder="Country" readonly>
        <input type="submit" id="search" value="Send"></button>
    `,
    process:
    `
        <span class="big">Processor ID:</span>
        <select name="id" onchange="chooseSelect(this, 'process')" required>
            <option value="" disabled selected>Processor Id</option>
        </select>
        <span class="big">Processor name:</span>
        <input type="text" name="name" placeholder="Name" readonly>
        <span class="big">Job title:</span>
        <input type="text" name="jobTitle" placeholder="Job Title" readonly>
        <span class="big">Phone number:</span>
        <input type="tel" name="phone" placeholder="Phone" readonly>
        <input type="submit" id="search" value="Send"></button>
    `
};

let tempArray = [];

let openOrderUrl = () => {
    let url = window.location.pathname;
    let i = 0;
    let curr_url = '';
    i--;
    decodeURI(url).split('/').forEach(e =>{
        i++;
        if(i == 2){
            curr_url = e;
            return;
        }
    });
    
    if(curr_url?curr_url:''){
        let list = document.getElementById('list_order');
        list = list.querySelector(`[id='${curr_url}']`);
        list?list.click():null;
    }
};

let changeOrder = (elem, action, sender) => {
    let close = document.getElementById('CloseSideBar');
    let isopenBar = document.getElementById('list_bar').classList;
    if(close && MobStatus){
        makeDarkness();
        SideBar(close);
    }
    else if(isopenBar.contains('side-barC')){
        makeDarkness();
    }
    let win;
    let form = view[elem];
    if(form){
        closeWindow();
        let main = document.getElementsByClassName('main')[0];
        win = document.createElement('div');
        win.className = 'change-window';
        win.id = 'change_window';
        let elemSender = (elem == 'itemAdd')? 'item': elem;
        win.innerHTML =
        `
            <button class="close-ico min-but visible" onclick="closeWindow()"></button>
            <form id="order-change" onsubmit="submitOrder('${action}', '${elemSender}'); return false">${form}</form>
        `;
        main.append(win);

        let dark = document.getElementById('curtain');
        let isdark = dark.classList.contains('darkness');
        if(!isdark){
            makeDarkness();
        }
    }

    if(action == 'change'){
        editOrder(elem, sender);
    }
    else{
        if(elem == 'itemAdd'){
            drowChooselist(win, 'item', null);
        }
    }
};

let editOrder = (elem, sender) => {
    let form = document.getElementById('order-change');
    if(elem == 'item'){
        sender = sender.parentNode.parentNode;
        form.querySelector('[name=quantity]').value = sender.querySelector('#product_quantity').innerHTML;
        form.querySelector('[name=prod_id]').value = sender.id;
    }
    else if(elem == 'order'){
        sender = document.getElementsByClassName('list-order-contentC')[0];
        let senderPart = sender.getElementsByClassName('order-content-l')[0];

        form.querySelector('[name=id]').value = Number(senderPart.childNodes[1].innerHTML.replace(/\D+/g,""));
        form.querySelector('[name=id]').readOnly = true;
        form.querySelector('[name=customer]').value = senderPart.childNodes[3].innerHTML;
        let date = senderPart.childNodes[5].innerHTML;
        date = date.slice(date.length - 10, date.length + 10);
        date = date.slice(6, 10) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2);

        form.querySelector('[name=shippedAt]').value = date;

        senderPart = sender.getElementsByClassName('order-content-r')[0];

        let ordStatus = senderPart.childNodes[3].innerHTML;
        if(ordStatus == 'In time'){
            form.querySelector('[name=status]').selectedIndex = 1;
        }
        else if(ordStatus == 'Urgent'){
            form.querySelector('[name=status]').selectedIndex = 2;
        }

        date = senderPart.childNodes[1].innerHTML;
        date = date.slice(date.length - 10, date.length + 10);
        date = date.slice(6, 10) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2);

        form.querySelector('[name=acceptedAt]').value = date;

        sender = null;
    }
    else if(elem == 'ship' || elem == 'process'){
        sender = document.getElementsByClassName('status-list')[0];
    }

    if(sender){
        drowChooselist(form, elem, sender);
    }
};

let drowChooselist = (form, elem, sender) => {
    let LINK = `/api/orders/${elem}`;
    fetch(LINK, {method: 'GET'}).then(res => res.json()).then(res =>{
        form = form.querySelector('[name=id]')
        tempArray = [];
        res.forEach(el => {
            tempArray.push(el);
            let option = document.createElement('option');
            option.value = el.id;
            option.innerHTML = el.id;
            form.append(option);
        });
    })
    .then(() => {
        let i = 0;
        sender = sender.querySelector('#id').innerHTML;
        tempArray.forEach(el => {
            ++i;
            if(el.id == sender){
                form.selectedIndex = i;
                form.onchange();
            }
        });
    })
    .catch((err) => console.log(`Fetch ERROR by ${LINK}: ${err}`));
};

let chooseSelect = (sender, elem) => {
    let form = document.getElementById('order-change');
    let id = sender.value;

    if(id){
        let arr = tempArray.find(el => el.id == id);

        if(elem == 'process'){
            form.querySelector('[name=name]').value = arr.name;
            form.querySelector('[name=jobTitle]').value = arr.jobTitle;
            form.querySelector('[name=phone]').value = arr.phone;
        }
        else if(elem == 'ship'){
            form.querySelector('[name=firstName]').value = arr.firstName;
            form.querySelector('[name=lastName]').value = arr.lastName;
            form.querySelector('[name=email]').value = arr.email;
            form.querySelector('[name=address]').value = arr.address;
            form.querySelector('[name=zip]').value = arr.zip;
            form.querySelector('[name=region]').value = arr.region;
            form.querySelector('[name=country]').value = arr.country;
        }
        else if(elem == 'item'){
            form.querySelector('[name=name]').value = arr.name;
            form.querySelector('[name=price]').value = arr.price;
            form.querySelector('[name=currency]').value = arr.currency;
        }
    }
};

let submitOrder = (action, elem) => {
    let form = document.getElementById('order-change');

    let LINK = `/api/orders`;
    elem != 'order'? LINK = `${LINK}/${elem}/${openOrder}` : LINK;

    let formData = new FormData(form);
    let convertedJSON = {};
    formData.forEach((value, key) => { 
        convertedJSON[key] = value;
    });

    form.innerHTML = '';
    Drowjsloading('order-change');

    fetch(LINK, {
        method: action=='change'?'PUT':'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(convertedJSON)
    })
    .then(res => res.json()).then(res =>{
        closeWindow();
        if(elem=='order'){ 
            GetOrders();
        } 
        else{
            openOrder = 0;
            OpenOrder(document.getElementsByClassName('list-order-contentC')[0]);
        }
        if (res.error){
            errorWindow(res.error);
        }
    })
    .catch((err) => {
        console.log(`Fetch ERROR by ${LINK}: ${err}`);
        errorWindow(err);
    });
};

let checkNull = (text)=> {
    text = (text == 'null' || text == 'undefined')? '':text;
    return text;
};

let searchFilter = () => {
    let close = document.getElementById('CloseSideBar');
    if(close && MobStatus){
        SideBar(close);
    }
    makeDarkness();
    closeWindow();
    let main = document.getElementsByClassName('main')[0];
    let win = document.createElement('div');
    win.className = 'change-window';
    win.id = 'change_window';
    win.innerHTML =
    `
        <button class="close-ico min-but visible" onclick="closeWindow()"></button>
        <div class="search-filter">
            <input type="radio" id="all" name="searchfilter" onchange="SearchFilter='all';" checked/>
            <label class="big" for="all">All</label>
        </div>
        <div class="search-filter">
            <input type="radio" id="number" name="searchfilter" onchange="SearchFilter='number';"/>
            <label class="big" for="number">Order №</label>
        </div>
        <div class="search-filter">
            <input type="radio" id="customer" name="searchfilter" onchange="SearchFilter='customer';"/>
            <label class="big" for="customer">Customer Name</label>

        </div>
        <div class="search-filter">
            <input type="radio" id="shipped" name="searchfilter" onchange="SearchFilter='shipped';"/>
            <label class="big" for="shipped">Ship Date</label>
        </div>
        <div class="search-filter">
            <input type="radio" id="accepted" name="searchfilter" onchange="SearchFilter='accepted';"/>
            <label class="big" for="accepted">Accepte Date</label>
        </div>
    `;
    main.append(win);

    if(SearchFilter){
        main.querySelector(`[id='${SearchFilter}']`).checked = true;
    }
};

let delOrder = (sender) => {
    let LINK = `/api/orders`;

    let id = sender.parentNode.parentNode.id;
    if(id){
        LINK = `${LINK}/item/${id}/${openOrder}`
    }
    else{
        id = openOrder;
        LINK = `${LINK}/${id}`
    }

    fetch(LINK, {method: 'DELETE'})
    .then(res => res.json()).then(res => {
        if (res.error){
            errorWindow(res.error);
        }
        else{
            id = sender.parentNode.parentNode.querySelector('#id')
            if(!id){ 
                GetOrders();
                let order_content = document.getElementById('order_content');
                document.getElementById('order_scroll').style = 'display: none;';
                order_content.innerHTML = 
                `
                    <img src="/resourse/style/img/empty.png" class="emptyImg">
                    <span class="big fat js-empty">Empty</span>
                `;

                let orderButtons = document.getElementById('order_bar');
                orderButtons = orderButtons.getElementsByTagName('footer')[0];
                orderButtons = orderButtons.querySelectorAll('.min-but');
                if(orderButtons){
                    orderButtons.forEach(button => {
                        button.classList.add('visibilityN');
                    });
                }

                let url = window.location.pathname;
                if(url != '/orders')
                    url = url.substring(0, url.lastIndexOf("/"));
                history.pushState(null, null, `${url}`);
            } 
            else{
                openOrder = 0;
                OpenOrder(document.getElementsByClassName('list-order-contentC')[0]);
            }
        }
    })
    .catch((err) => {
        console.log(`Fetch ERROR by ${LINK}: ${err}`);
        errorWindow(err);
    });
};

let closeWindow = () => {
    let win = document.getElementById('change_window');
    if(win){
        makeDarkness();
        tempArray = [];
        win.parentNode.removeChild(win);
    }
};

let errorWindow = (err) => {
    closeWindow();
    makeDarkness();
    let main = document.getElementsByClassName('main')[0];
    let win = document.createElement('div');
    win.className = 'change-window';
    win.id = 'change_window';
    win.innerHTML =
    `
        <button class="close-ico min-but visible" onclick="closeWindow()"></button>
        <span class="error">${err}</span>
    `;
    main.append(win);
};
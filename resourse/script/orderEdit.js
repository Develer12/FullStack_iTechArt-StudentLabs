let view ={
    order: 
    `
        <span class="big">Order №:</span>
        <input type="number" name="id" min="1" placeholder="Order №">
        <span class="big">Customer name:</span>
        <input type="text" name="customer" placeholder="Customer">
        <span class="big">Ship Date:</span>
        <input type="date" name="shippedAt" placeholder="Date of shiping">
        <span class="big">Accept Date:</span>
        <input type="date" name="acceptedAt" placeholder="Date of shiping">
        <span class="big">Order status:</span>
        <select name="status">
            <option disabled>Order status</option>
            <option selected value="Accepted">In time</option>
            <option value="Pending">Urgent</option>
        </select>
        <input type="submit" id="search" value="Send"></button>
    `,
    item: 
    `
        <span class="big">Product id:</span>
        <input type="number" name="prod_id" min="1" placeholder="Product ID">
        <span class="big">Product name:</span>
        <input type="text" name="name" placeholder="Product name">
        <span class="big">Quantity:</span>
        <input type="number" name="quantity" min="1" placeholder="Quantity">
        <span class="big">Price of unit:</span>
        <input type="number" name="price" step="0.01" min="0" placeholder="Unit Price">
        <span class="big">Price currency:</span>
        <select name="currency">
            <option disabled>Currency</option>
            <option selected value="EUR">EUR</option>
        </select>
        <input type="submit" id="search" value="Send"></button>
    `,
    ship: 
    `
        <span class="big">First name:</span>
        <input type="text" name="firstName" placeholder="First Name">
        <span class="big">Last name:</span>
        <input type="text" name="lastName" placeholder="Last Name">
        <span class="big">E-mail:</span>
        <input type="text" name="email" placeholder="E-mail">
        <span class="big">Street:</span>
        <input type="text" name="address" placeholder="Street">
        <span class="big">Zip Code / City:</span>
        <input type="number" name="zip" min="1" placeholder="Zip Code / City">
        <span class="big">Region:</span>
        <input type="text" name="region" placeholder="Region">
        <span class="big">Country:</span>
        <input type="text" name="country" placeholder="Country">
        <input type="submit" id="search" value="Send"></button>
    `,
    process: //phone pattern="\d{3}[\(]\d{2}[\)]\d{3}[\-]\d{4}"  ???
    `
        <span class="big">Processor name:</span>
        <input type="text" name="name" placeholder="Name">
        <span class="big">Employee ID:</span>
        <input type="number" name="employeeId" min="1" placeholder="Employee ID">
        <span class="big">Job title:</span>
        <input type="text" name="jobTitle" placeholder="Job Title">
        <span class="big">Phone number:</span>
        <input type="tel" name="phone" placeholder="Phone">
        <input type="submit" id="search" value="Send"></button>
    `
};

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
    if(close && MobStatus){
        SideBar(close);
    }

    let form = view[elem];
    if(form){
        closeWindow();
        let main = document.getElementsByClassName('main')[0];
        let win = document.createElement('div');
        win.className = 'change-window';
        win.innerHTML =
        `
            <button class="close-ico min-but visible" onclick="closeWindow()"></button>
            <form id="order-change" onsubmit="submitOrder('${action}', '${elem}'); return false">${form}</form>
        `;
        main.append(win);
    }

    if(action == 'change'){
        editOrder(elem, sender);
    }
};

let editOrder = (elem, sender) => {
    let form = document.getElementById('order-change');

    if(elem == 'item'){
        sender = sender.parentNode.parentNode;
        form.querySelector('[name=quantity]').value = sender.querySelector('#product_quantity').innerHTML;
        form.querySelector('[name=prod_id]').value = sender.querySelector('#product_id').innerHTML;
        form.querySelector('[name=prod_id]').readOnly = true;
        form.querySelector('[name=name]').value = sender.querySelector('#products_name').innerHTML;
        form.querySelector('[name=price]').value = sender.querySelector('#product_price').innerHTML;

        let currency = sender.querySelector('#product_currency').innerHTML;
        if(currency == 'EUR'){
            form.querySelector('[name=currency]').selectedIndex = 1;
        }
        else if(currency == 'USD'){
            form.querySelector('[name=currency]').selectedIndex = 2;
        }
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
    }
    else if(elem == 'ship'){
        sender = document.getElementsByClassName('status-list')[0];
        if(sender){
            let customerName = document.getElementById('order_customer').innerHTML.split(/\s*:\s*/);
            form.querySelector('[name=firstName]').value = checkNull(customerName[1].split(' ')[0]);
            form.querySelector('[name=lastName]').value = checkNull(customerName[1].split(' ')[1]);
            form.querySelector('[name=email]').value = checkNull(document.getElementById('sendmail').getAttribute('formaction').split(/mailto:\s*/)[1]);
            form.querySelector('[name=address]').value = checkNull(sender.querySelector('#street').innerHTML);
            form.querySelector('[name=zip]').value = checkNull(sender.querySelector('#zip').innerHTML);
            form.querySelector('[name=region]').value = checkNull(sender.querySelector('#region').innerHTML);
            form.querySelector('[name=country]').value = checkNull(sender.querySelector('#country').innerHTML);
        }
    }
    else if(elem == 'process'){
        sender = document.getElementsByClassName('status-list')[0];
        if(sender){
            form.querySelector('[name=employeeId]').value = checkNull(sender.querySelector('#id').innerHTML);
            form.querySelector('[name=name]').value = checkNull(sender.querySelector('#name').innerHTML);
            form.querySelector('[name=jobTitle]').value = checkNull(sender.querySelector('#job').innerHTML);
            form.querySelector('[name=phone]').value = checkNull(sender.querySelector('#phone').innerHTML);
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

    console.log(convertedJSON)

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
    text = text == 'null'? '':text;
    return text;
};

let searchFilter = () => {
    closeWindow();
    let main = document.getElementsByClassName('main')[0];
    let win = document.createElement('div');
    win.className = 'change-window';
    win.innerHTML =
    `
        <button class="close-ico min-but visible" onclick="closeWindow()"></button>
        <div class="search-filter">
            <input type="radio" name="searchfilter" onchange="SearchFilter='all';" checked/>
            <span class="big">All</span>
        </div>
        <div class="search-filter">
            <input type="radio" name="searchfilter" onchange="SearchFilter='number';"/>
            <span class="big">Order №</span>
        </div>
        <div class="search-filter">
            <input type="radio" name="searchfilter" onchange="SearchFilter='customer';"/>
            <span class="big">Customer Name</span>
        </div>
        <div class="search-filter">
            <input type="radio" name="searchfilter" onchange="SearchFilter='shipped';"/>
            <span class="big">Ship Date</span>
        </div>
        <div class="search-filter">
            <input type="radio" name="searchfilter" onchange="SearchFilter='accepted';"/>
            <span class="big">Accepte Date</span>
        </div>
    `;
    main.append(win);
};

let delOrder = (sender) => {
    let LINK = `/api/orders`;

    let id = sender.parentNode.parentNode.querySelector('#product_id');
    if(id){
        id = id.innerHTML;
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
            id = sender.parentNode.parentNode.querySelector('#product_id')
            if(!id){ 
                GetOrders();
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
    let win = document.getElementsByClassName('change-window')[0];
    if(win){
        win.parentNode.removeChild(win);
    }
};

let errorWindow = (err) => {
    closeWindow();
    let main = document.getElementsByClassName('main')[0];
    let win = document.createElement('div');
    win.className = 'change-window';
    win.innerHTML =
    `
        <button class="close-ico min-but visible" onclick="closeWindow()"></button>
        <span>${err}</span>
    `;
    main.append(win);
};
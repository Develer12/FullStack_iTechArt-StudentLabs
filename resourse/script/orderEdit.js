let view ={
    order: 
    `
        <input type="number" name="id" min="1" placeholder="Order №">
        <input type="text" name="customer" placeholder="Customer">
        <input type="date" name="createdAt" placeholder="Date of creation">
        <input type="date" name="shippedAt" placeholder="Date of shiping">
        <select name="status">
            <option disabled>Order status</option>
            <option selected value="Accepted">In time</option>
            <option value="Pending">Urgent</option>
        </select>
        <input type="submit" id="search" value="Send"></button>
    `,
    item: 
    `
        <input type="number" name="id" min="1" placeholder="Product ID">
        <input type="text" name="name" placeholder="Product name">
        <input type="number" name="quantity" min="1" placeholder="Quantity">
        <input type="number" name="price" min="0" placeholder="Unit Price">
        <select name="currency">
            <option disabled>Currency</option>
            <option selected value="EUR">EUR</option>
            <option value="USD">USD</option>
        </select>
        <input type="submit" id="search" value="Send"></button>
    `,
    ship: 
    `
        <input type="text" name="name" placeholder="Name">
        <input type="text" name="street" placeholder="Street">
        <input type="number" name="zip" min="1" placeholder="Zip Code / City">
        <input type="text" name="region" placeholder="Region">
        <input type="text" name="country" placeholder="Country">
        <input type="submit" id="search" value="Send"></button>
    `,
    process: 
    `
        <input type="text" name="name" placeholder="Name">
        <input type="number" name="id" min="1" placeholder="Employee ID">
        <input type="text" name="job" placeholder="Job Title">
        <input type="tel" name="phone" placeholder="Phone" pattern="\d{3}[\(]\d{2}[\)]\d{3}[\-]\d{4}">
        <input type="submit" id="search" value="Send"></button>
    `
};



let changeOrder = (elem, action, sender) => {
    let close = document.getElementById('CloseSideBar');
    if(close && MobStatus){
        SideBar(close);
    }

    let form = view[elem];
    if(form){
        let main = document.getElementsByClassName('main')[0];
        let win = document.createElement('div');
        win.className = 'change-window';
        win.innerHTML =
        `
            <button class="close-ico min-but visible" onclick="closeWindow()"></button>
            <form id="order-change">${form}</form>
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
        form.querySelector('[name=id]').value = sender.querySelector('#product_id').innerHTML;
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
        form.querySelector('[name=customer]').value = senderPart.childNodes[3].innerHTML;
        let date = senderPart.childNodes[5].innerHTML;
        date = date.slice(date.length - 10, date.length + 10);
        date = date.slice(6, 10) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2);

        form.querySelector('[name=shippedAt]').value = date;

        senderPart = sender.getElementsByClassName('order-content-r')[0];

        date = senderPart.childNodes[1].innerHTML;
        date = date.slice(6, 10) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2);

        form.querySelector('[name=createdAt]').value = date;
        let ordStatus = senderPart.childNodes[3].innerHTML;
        if(ordStatus == 'In time'){
            form.querySelector('[name=status]').selectedIndex = 1;
        }
        else if(ordStatus == 'Urgent'){
            form.querySelector('[name=status]').selectedIndex = 2;
        }
    }
    else if(elem == 'ship'){
        sender = document.getElementsByClassName('status-list')[0];
        form.querySelector('[name=name]').value = sender.querySelector('#name').innerHTML;
        form.querySelector('[name=street]').value = sender.querySelector('#street').innerHTML;
        form.querySelector('[name=zip]').value = sender.querySelector('#zip').innerHTML;
        form.querySelector('[name=region]').value = sender.querySelector('#region').innerHTML;
        form.querySelector('[name=country]').value = sender.querySelector('#country').innerHTML;
    }
    else if(elem == 'process'){
        sender = document.getElementsByClassName('status-list')[0];
        form.querySelector('[name=id]').value = sender.querySelector('#id').innerHTML;
        form.querySelector('[name=name]').value = sender.querySelector('#name').innerHTML;
        form.querySelector('[name=job]').value = sender.querySelector('#job').innerHTML;
        form.querySelector('[name=phone]').value = sender.querySelector('#phone').innerHTML;
    }
};


let delOrder = (sender) => {
    let id = sender.parentNode.parentNode.querySelector('#product_id');
    if(id){
        id = id.innerHTML;
    }
    else{
        id = document.getElementsByClassName('list-order-contentC')[0];
        id = id.getElementsByClassName('order-content-l')[0];
        id  = Number(id.childNodes[1].innerHTML.replace(/\D+/g,""));
    }
    console.log(id);
};

let closeWindow = () => {
    let win = document.getElementsByClassName('change-window')[0];
    if(win){
        win.parentNode.removeChild(win);
    }
};
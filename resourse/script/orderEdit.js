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
    `
};



let changeOrder = (elem, action) => {
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

    }
};

let closeWindow = () => {
    let win = document.getElementsByClassName('change-window')[0];
    if(win){
        win.parentNode.removeChild(win);
    }
};
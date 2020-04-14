let changeOrder = () => {
    let close = document.getElementById('CloseSideBar');
    if(close && MobStatus){
        SideBar(close);
    }

    let main = document.getElementsByClassName('main')[0];
    let win = document.createElement('div');
    win.className = 'change-window'
    win.innerHTML =
    `
        <button class="close-ico min-but visible" onclick="closeWindow()"></button>
        <form id="order-change">
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
        </form>`;
    main.append(win);
};

let closeWindow = () => {
    let win = document.getElementsByClassName('change-window')[0];
    win.parentNode.removeChild(win);
};
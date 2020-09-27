let dateOrder = "desc";

function changeOrderBy(parameter,path){
    let xhttp  = new  XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let ordersBody = document.querySelector('#orders-table__body');
            ordersBody.innerHTML = null;
            let orders = JSON.parse(this.responseText);
            let counter = 1;
            for (order of orders){
                let vaziat = ''
                if (order.status)
                let row = `<tr><td>${counter}</td><td>${order.orderNo}</td>
                <td>${order.orderDate}</td><td>${order.payable}</td><td>${order.totalPrice}</td>
                <td>${order.preferedDate}</td><td>${order.payStatus}</td><td>${order.deliveryStatus}</td>
                <td><a class="order-detail-btn" href="/admin/orders/${order['_id']}"></a></td></tr>`
            }
            console.log(product);
            let card = createCard(product);
            cardContainer.removeChild(cardContainer.firstChild);
            cardContainer.append(card)
        }
    };
    xhttp.open('GET', `/admin/orders/${path}?orderBy=${parameter}`, true);
    xhttp.send();
}
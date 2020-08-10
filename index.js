let base64 = require('base-64');
let fs = require('fs');
const fetch = require('node-fetch');
global.Headers = fetch.Headers;
let headers = new Headers();
let username = '42787ab483e9f507795731ff9a59239e';
let password = '8fa55003516307e32c0e02a372676a44';
headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
let orders = require('./orders502.json');
const IDS =  ['2206078468162 2020-05-14T20:39:41-04:00',
              '2206139908162 2020-05-14T21:13:47-04:00',
              '2206255808578 2020-05-14T22:16:56-04:00',
              '2206385897538 2020-05-14T23:44:40-04:00'
            ]
let order
let IntervalTime
let orderArray = []
function setTransactions(id, mode){
    if(mode==='transaction'){
        let urlTransactions = `https://plaza-lama-virtual.myshopify.com/admin/api/2020-07/orders/${id}/transactions.json`;
        fetch(urlTransactions,{method:'GET', headers:headers})
        .then(response => response.json())
        .then(data => {
            orders.map(x=>{
                data.transactions.map(y=>{
                    if(id===x.orden && y.status ==='success'){
                        x['autorizacion'] = y.authorization
                        x['status'] = y.status
                        console.log(x.orden, x.autorizacion)
                        orderArray.push(x)
                    } else if(y.status === 'pending'&& id === x.orden){
                        x['autorizacion'] = y.authorization
                        x['status'] = y.status
                        orderArray.push(x)
                    }
                })
            })
            fs.writeFile("ordersFinal.json", JSON.stringify(orderArray), function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            });
            console.log(orderArray, 'empty?')
            console.log(IDS.length, 'vacio?')
            IDS.shift()
    }
    /*Ordenes*/
    if(mode==='orders'){
        let urlOrders = `https://plaza-lama-virtual.myshopify.com/admin/api/2020-07/orders/${id}.json`;
        fetch(urlOrders,{method:'GET', headers:headers})
        .then(response => response.json())
        .then(data => {
            console.log(IDS.length,'transacciones')
            let quantity = 0
            if(data.order.line_items ===undefined){
                console.log(data.order.id, 'quedo hasta aqui')
                clearInterval(IntervalTime)
            }
            quantity = data.order.line_items.length
            data.order.line_items.map(items=>{
                if(items ===undefined){
                    console.log(items)
                    return
                }
                console.log(items.sku,'checking')
            order = {
                fecha:data.order.created_at,
                orden:id,
                nombres:data.order.customer.first_name,
                apellidos:data.order.customer.last_name,
                cantidad:items.quantity,
                sku:items.sku,
                nombre_orden:data.order.name,
                precio:items.price,
                total_price:data.order.total_price,
                cantidadTotal:quantity,
            }
            orderArray.push(order)
            })
            console.log(orderArray);
            console.log(IDS.length,'transacciones')
            IDS.shift()
                fs.writeFile("orders502.json", JSON.stringify(orderArray), function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            })
            .catch(err=> console.log(err));
    }
    /*Ordenes por Fecha*/
    if(mode==='getOrdersByDate'){
        let urlOrders = `https://plaza-lama-virtual.myshopify.com/admin/api/2020-07/orders.json?created_at_min=2020-07-19&created_at_max=2020-07-22&limit=250`;
        fetch(urlOrders,{method:'GET', headers:headers})
        .then(response => response.json())
        .then(data => {
            data.orders.map(order=>{
                console.log(
                order.id,
                order.created_at
                ,'checking all '
                )
                orderArray.push(`'${order.id} ${order.created_at}'${'\n'}`)
            })
            // IDS.shift()
            fs.writeFile("./ids.json", orderArray, function(err) {
                if(err){
                    console.log(err);
                }
            });
            
            console.log(orderArray.length,'transacciones')
        })
    }
}
IntervalTime =  setInterval(function(){
    setTransactions(IDS[0].substring(0,13), 'getOrdersByDate')
    //setTransactions(id);
    }, 4600);

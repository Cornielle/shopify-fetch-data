
// const shopify = require('./shopify')
//         let urlOrders = `https://plaza-lama-virtual.myshopify.com/admin/api/2020-10/graphql.json`;
//         shopify.autoFetch(urlOrders,{
//             method:'POST', 
//             headers: {
//                 'Content-Type': 'application/graphql',
//                 'X-Shopify-Access-Token':process.env.TOKEN
//             }
//         })
const jsonResult  = require('./ordenes_marzo_01_octubre_01.json');
console.log(JSON.stringify(jsonResult), 'checking')
console.log('here')
require('dotenv').config();
const shopify = {fetchPL, fetchSL} =  require('./shopify')
const execute = (mode) =>{
    if(mode ==='PL'){
        let urlOrders = `https://plaza-lama-virtual.myshopify.com/admin/api/2020-10/graphql.json`;
        shopify.bulkData.fetchPL(urlOrders,{
            method:'POST', 
            headers: {
                'Content-Type': 'application/graphql',
                'X-Shopify-Access-Token':process.env.TOKENPL
            }
        })
    } else {
        let urlOrders = `https://superlama.myshopify.com/admin/api/2020-10/graphql.json`;
        shopify.bulkData.fetchSL(urlOrders,{
            method:'POST', 
            headers: {
                'Content-Type': 'application/graphql',
                'X-Shopify-Access-Token':process.env.TOKENSL
            }
        })
    }
}

execute('SL');
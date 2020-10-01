let base64 = require('base-64');
require('dotenv').config();
let fs = require('fs');
const fetch = require('node-fetch');
/*Regenerate the request*/
let cursor = '';
let availableItems = ''
let queryCreateBulk = `mutation {
    bulkOperationRunQuery(
      query:"""
      {
        orders(query: "created_at:>=2020-03-01") {
          edges {
            node {
              id
              createdAt
              updatedAt
                customer{
                  firstName
                  lastName
                }
              }
            }
          }
        }
      """
    ) {
      bulkOperation {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
  }`

  let queryDownloadBulk = `{
    node(id: "gid://shopify/BulkOperation/179735527490") {
      ... on BulkOperation {
        id
        status
        errorCode
        createdAt
        completedAt
        objectCount
        fileSize
        url
        partialDataUrl
      }
    }
  }`
  // return `{
  //   ${dataArray.length>0 && parseInt(availableItems)>1?
  //   `orders(first:${availableItems},after:"${cursor}") {`:
  //   `orders(first:250,query:"created_at:>2020-03-01"){`}
  //       pageInfo { hasNextPage }
  //       edges {
  //         cursor
  //         node {
  //           id,
  //           createdAt
  //           customer{
  //               firstName
  //               lastName
  //           }
  //         }
  //       }
  //     }
  // }`

function autoFetch(url, request){
  // let dataArray = [];
  //   setInterval(() =>{
  //     let query = generateQuery(
  //       dataArray,
  //       cursor
  //     ) 
      request.body = queryDownloadBulk
      fetch(url, request)
      .then(res => res.json())
      .then(result => {
        if(result.errors){
          console.log(result.errors)
          return
        }
        console.log(result)
        // availableItems = result.extensions.cost.throttleStatus.restoreRate
        // console.log(availableItems)
        // cursor =  result.data.orders.edges[249].cursor
        // console.log(cursor)
        //   return
        //   cursor =  result.data.orders.edges[249].cursor
        //   console.log(cursor, 'los cursores?')
        //   dataArray.push(result.data.orders.edges)
        //   console.log(dataArray, 'checking');
        // //   console.log(cursor)
        // //   console.log(order)
        // //   // orderArray.push(`'${order.id} ${order.created_at}'${'\n'}`)
        // //   // fs.writeFile("./ids.json", orderArray, function(err) {
        // //   //     if(err){
        // //   //         console.log(err);
        // //   //     }
        // //   // })
        // // })
      }).catch(err=>{
        console.log(err)
      })
}
exports.autoFetch = autoFetch
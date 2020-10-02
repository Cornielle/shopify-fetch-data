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
              totalPrice
              name
              customer{
                firstName
                lastName
              }
              lineItems{
                edges{
                  node{
                    sku,
                    quantity
                  }
                }
              }
              transactions{
                status
                gateway
                authorizationCode
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
  node(id: "gid://shopify/BulkOperation/180570161218") {
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

function autoFetch(url, request, mode ){
      request.body = queryDownloadBulk
      fetch(url, request)
      .then(res => res.json())
      .then(result => {
        if(result.data.bulkOperationRunQuery!== undefined){
          console.log(result.data.bulkOperationRunQuery)
          return
        }
        console.log(result)
      }).catch(err=>{
        console.log(err)
      })
}
exports.autoFetch = autoFetch
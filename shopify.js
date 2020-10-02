const fetch = require('node-fetch');
let id =''
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
              transactions{
                status
                gateway
                authorizationCode,
                formattedGateway
                amountSet{ 
                  presentmentMoney{
                    amount
                    currencyCode
                  }
                }
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
  node(id: "gid://shopify/BulkOperation/46515847332") {
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

function fetchPL( url, request ){
      request.body = queryCreateBulk
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

function fetchSL( url, request ){
  request.body = queryDownloadBulk
  fetch(url, request)
  .then(res => res.json())
  .then(result => {
    if(result.data.bulkOperationRunQuery!== undefined){
      console.log(result.data.bulkOperationRunQuery)
      id = result.data.bulkOperationRunQuery.id
      return
    }
    console.log(result)
  }).catch(err=>{
    console.log(err)
  })
}
exports.bulkData= {fetchPL, fetchSL}
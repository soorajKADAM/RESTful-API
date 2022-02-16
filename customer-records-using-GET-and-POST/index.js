const express = require('express')
const app = express()
app.use(express.json())

const customer=[
    {firstName:'John', id:1},
    {firstName:'James', id:2},
    {firstName:'Robert',  id:3},
]

app.get('/', (req,resp) => {
    resp.send('Here you can find customer records')
})
app.get('/api/customer',(req,resp) => {
    resp.send(customer)
})

app.get('/api/customer/:firstName',(req,resp) =>{
    const customerinfo = customer.find(v=> v.firstName === req.params.firstName)
    if(!customerinfo) resp.status(404).send("Name not found!")
    resp.send(customerinfo)
})
app.post('/api/customer/addCustomer',(req,resp) =>{
    const customerinfo={
        id: customer.length+1,
        firstName: req.body.firstName
        
    }
    
    customer.push(customerinfo)
    resp.send(customerinfo)

})



app.listen(8080)
const express = require('express') //import express
const app = express() //creating object from express app
app.use(express.json())
const products =[
    {product: 'Laptop', price:27, id:1},
    {product: 'Charger', price:32, id:2},
    {product: 'Mobile Phone', price:45, id:3}, 
] //array of objects

app.get('/',(req, resp) =>{         
    resp.send('welcome to product store')  
})

app.get('/api/products', (req, resp) =>{
    resp.send(products)
    })
    app.post('/api/products/addProducts', (req, resp)=>{
        var productinfo ={          
           price: req.body.price,
           product: req.body.product
        }
        products.push(productinfo)  
 
        resp.send(productinfo) 
    })

    app.delete('/api/products/deleteProduct/:id/',(req,resp) =>{
        const productinfo = products.find(v => v.id === parseInt(req.params.id))
    if(!productinfo) return resp.status(404).send('product not found')
    const index = products.indexOf(productinfo)
    products.splice(index,1)
    resp.send(productinfo)
        
    })
    app.put('/api/products/updateProduct:id',(req,resp) => {
        const productinfo = products.find(v => v.id === parseInt(req.params.id))
        if(!productinfo) resp.status(404).send('product not found')
        productinfo.product = req.body.product
        resp.send(productinfo)
    })
    app.listen(8080)
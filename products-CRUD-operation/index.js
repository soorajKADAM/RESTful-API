const express = require('express') //import express
const app = express() //creating object from express app
const jwt = require('jsonwebtoken');
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
    app.post('/api/products/addProducts',verifyToken, (req, resp)=>{    
        jwt.verify(req.token, 'secretkey',{expiresIn:'30s'}, (err, authData,productinfo) => {
            if(err){

            }else{
             var productinfo ={          
             price: req.body.price,
            product: req.body.product
             }
             products.push(productinfo)  
             resp.json({authData,productinfo});
            
             
            }
        })           
     
    })
          
       
   

    app.post('/api/login',(req, res)=>{
        const user = {
            id:1,
            username: 'sooraj',
            email: 'soorajak@gmail.com'
        }
        jwt.sign({user}, 'secretkey', (err, token) => {
            res.json({
                token
            });
        });
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

    function verifyToken(req, res, next) {
        //Get auth header value
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
            
            }else {
            //forbidden
            res.sendStatus(403);
        }
    }
    app.listen(8080)
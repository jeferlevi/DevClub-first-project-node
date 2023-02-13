const express = require("express")
const port = 3001
const app = express()
const uuid = require("uuid")
app.use(express.json())

const pedidos = []

const checkUserId = (request, response, next) =>{
   const { id } = request.params

    const index = pedidos.findIndex(pedido => pedido.id === id)

   if(index < 0){
    return response.status(404).json({error: "User not found"})
   }

   request.userIndex = index

   request.userId = id

   next()

}

app.get("/pedidos", (request, response) =>{
   
   return response.json(pedidos)
})

app.post("/pedidos", (request, response) =>{

   const {clienteName, order, preço, status} = request.body

   const pedido = {id:uuid.v4(), clienteName, order, preço, status}

   pedidos.push(pedido)
   
    return response.status(201).json(pedido)
})

app.put("/pedidos/:id", checkUserId, (request, response) =>{

   const { clienteName, order, preço, status } = request.body

   const index = request.userIndex

   const id = request.userId

   const atualizaPedido = {id, clienteName, order, preço, status}
   
  

   pedidos[index] = atualizaPedido


    return response.json(atualizaPedido)
 })

 app.delete("/pedidos/:id", checkUserId, (request, response) =>{

       const index = request.userIndex
    
       pedidos.splice(index,1)

       return response.status(204).json()
 })










app.listen(port, ()=>{

    console.log(`🚀 Server started on port ${port}`)
})
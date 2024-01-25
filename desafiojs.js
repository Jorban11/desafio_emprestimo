//Primeiramente instalar bibliotecas com npm usando:
//Importar Express
const express = require('express');
const { type } = require('os');
const { format } = require('path');
//Atribuir variavel 'aplicativo' como porta do express
const aplicativo = express()
//Fazer com que a variavel 'aplicativo' priorize usar json
aplicativo.use(express.json())

//Lista de Dados
const database_usuarios = []

//Funçoes Gerais
const generalfuncs = {
    // g=Get, c=Check   
 
}


//CRUD REST
//GET vai receber apenas _res_ 
aplicativo.get('/clientes',(_,res)=>{   
    res.status(200).send(database_usuarios);

});

aplicativo.get('/clientes/:cpf',(req,res)=>{
    const clientFull = database_usuarios.filter((i)=>{
        return i.cpf.replace(/[-.]/g,'') === req.params.cpf.toString();
    })[0]
    
    const loans = []
    if(parseInt(clientFull.income)<3000){
        loans.push({
            'cliente':clientFull.name,
            'loans':[
                {
                    'type':'PERSONAL',
                    'interest':'4'
                },
                {
                    'type':'GUARANTEED',
                    'interest':'3'
                }],
            'client income': 'income < 3000'});

        return res.send(loans[0])

    }if((parseInt(clientFull.income) > 3000) && (parseInt(clientFull.income) < 5000)){
         if(parseInt(clientFull.age)<30){ 
            if(clientFull==='SP'){  
                loans.push({
                    'cliente':clientFull.name,
                    'loans':[
                    {
                        'type':'PERSONAL',
                        'interest':'4'
                    },
                    {
                        'type':'GUARANTEED',
                        'interest':'3'
                    }],
                    'client income': '3000<income<5000',
                    'client age': parseInt(clientFull.age),
                    'client local': clientFull.location,
                });
                return res.send(loans[0])
            }
        }
    }if(parseInt(clientFull.income)>5000){
        loans.push({
            'cliente':clientFull.name,
            'loans':[
                {
                    'type':'PERSONAL',
                    'interest':'4'
                },
                {
                    'type':'GUARANTEED',
                    'interest':'3'
                },
                {
                    'type':'CONSIGNED',
                    'interest':'2'
                },
            ],
            'client income': 'income > 5000'})
        return res.send(loans[0])
    }else{
        loans.push({
            'cliente':clientFull.name,
            'loans':[
            {
                'type':'NONE',
                'interest':'0'
            }],
            'client income': clientFull.income,
            'client age': parseInt(clientFull.age),
            'client local': clientFull.location,
        });
        return res.send(loans[0])
    }   
})

//POST para enviar info para database
aplicativo.post('/clientes',(req,res)=>{
    const cClientExist = 
        database_usuarios.filter((lclClient)=>{
            return lclClient.cpf === req.body.cpf
        });
    if(cClientExist.length == 0){
        try{
            cliente = req.body
            database_usuarios.push(cliente);
        }catch{
            res.send('--error in creating new client--')
        }
    }else{
        res.status(400).send('client cannot be created:Already in DB.')
    }
    res.status(200).send('client created: \n' + cliente.name)
})

//DELETE
aplicativo.delete('/clientes',(req,res)=>{return})
//PUT
aplicativo.put('/clientes',(req,res)=>{return})

//---------------------------------------------------------------
//LISTEN
aplicativo.listen(1000, ()=> console.log("Clientes. Porta 1000"))

const express = require("express")
const nunjucks = require('nunjucks')
const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')



const server = express()

nunjucks.configure('views', {
    express: server,
    noCache: true
})
const initiateDB = ()=>{
    let db = new sqlite3.Database(__dirname+"/database/db.sqlite")
    db.each("SELECT * FROM projetos", (err, result)=>{
        if (result === undefined){
            db.run("CREATE TABLE projetos (id INTEGER PRIMARY KEY AUTOINCREMENT,nome_projeto TEXT, descricao_projeto TEXT, categoria TEXT, icon_url TEXT)")
        }
    })
    return db
}

server.use(express.json())
server.use(express.static('public'))
initiateDB().close()
const projetos = [
    {
        img: "https://cdn-icons-png.flaticon.com/512/3522/3522092.png",
        title: 'O advento de battle royalle, um estudo sobre Free Fire',
        category: "Administração",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam aliquid repellat tempora illum unde hic dolorum doloribus ipsum quibusdam",
        url: "#"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/3057/3057735.png",
        title: 'Por que a Terra NÃO é plana?',
        category: "Ciências",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam aliquid repellat tempora illum unde hic dolorum doloribus ipsum quibusdam",
        url: "#"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/5551/5551575.png",
        title: 'Satélite caseiro',
        category: "Engenharia",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam aliquid repellat tempora illum unde hic dolorum doloribus ipsum quibusdam",
        url: "#"
    },
];
// rota padrão da aplicação /
server.get("/", async function(req, res){
    const db = initiateDB()
    const each = ()=> new Promise(function (resolve, reject){
        db.all("SELECT * FROM projetos", (err, result)=>{
            if (err){
                reject(err)
            }
            else{
                resolve(result)
            }
        })
    })
    const projetos = await each()
    return res.render('index.html', {projetos})
})
server.get('/projects', async (req, res)=>{
    const db = initiateDB()
    const each = ()=> new Promise(function (resolve, reject){
        db.all("SELECT * FROM projetos", (err, result)=>{
            if (err){
                reject(err)
            }
            else{
                resolve(result)
            }
        })
    })
    const projetos = await each()
    console.log(projetos)
    return res.render('projects.html', {projetos})
})
server.post('/newproject', (req, res, next)=>{
    const db = initiateDB()
    db.run("INSERT INTO projetos (nome_projeto, descricao_projeto, categoria, icon_url) VALUES (?, ?, ?, ?)", [req.body.title, req.body.description, req.body.category, req.body.image])
    db.close()
    return res.send('OK')
})



server.listen(3000)
// 1 - npm init -y (Criar projejo Node)
// 2 - npm install express (pacote de códigos para criação de servidores)
// 3 - npm install nodemon (reinicia o nosso servidor automaticamente quando fazemos modificacao no codigo)

// Backend

// Responsabilidades do backend
// 1 - Receber pedidos do cliente
// 2 - Devolver respostas para o cliente
// 3 - Regras de negócio (como a aplicação funciona)
// 4 - Dados (persistência, tratamento)
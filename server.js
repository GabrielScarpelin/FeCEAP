const express = require("express")
const nunjucks = require('nunjucks')
const sqlite3 = require('sqlite3').verbose()

const server = express()

nunjucks.configure('views', {
    express: server,
    noCache: true
})
const initiateDB = ()=>{
    const db = new sqlite3.Database(__dirname+"/database/db.sqlite")
    db.run("CREATE TABLE IF NOT EXISTS projetos (id INTEGER PRIMARY KEY AUTOINCREMENT,nome_projeto TEXT, descricao_projeto TEXT, categoria TEXT, icon_url TEXT)")
    return db
}
const asyncGetAll = (db, query) => new Promise(function (resolve, reject) {
    db.all(query, (err, result) => {
        if (err) {
            reject(err)
        }
        else {
            resolve(result)
        }
    })
})

const asyncGet = (db, query) => new Promise(function (resolve, reject){
    db.get(query, (err, result)=>{
        if (err){
            reject(err)
        }
        else {
            resolve(result)
        }
    })
})


server.use(express.json())
server.use(express.static('public'))
initiateDB().close()
// rota padrão da aplicação /
server.get("/", async function(req, res){
    const db = initiateDB()
    
    const projetos = await asyncGetAll(db, "SELECT * FROM projetos LIMIT 3")

    db.close()
    return res.render('index.html', {projetos})
})
server.get('/projects', async (req, res)=>{
    const db = initiateDB()
    
    const projetos = await asyncGetAll(db, "SELECT * FROM projetos")
    db.close()
    console.log(projetos)
    return res.render('projects.html', {projetos})
})
server.post('/newproject', (req, res, next)=>{
    const db = initiateDB()
    db.run("INSERT INTO projetos (nome_projeto, descricao_projeto, categoria, icon_url) VALUES (?, ?, ?, ?)", [req.body.title, req.body.description, req.body.category, req.body.image])
    db.close()
    return res.send('OK')
})

server.get("/project/:id", async (req, res, next) => {
    const db = initiateDB()
    const projeto = await asyncGet(db, `SELECT * FROM projetos WHERE id = ${req.params.id}`)
    console.log(projeto)
    db.close()
    return res.render('project.html', {projeto})
})


server.delete('/apagar/:id', (req, res)=>{
    const db = initiateDB()
    db.run(`DELETE from projetos where id = ${req.params.id}`, (runResult, err)=>{
        if (err){
            res.sendStatus(500)
        }
        else{
            console.log(runResult)
        }
    })
    db.close()
    return res.send("OK")
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
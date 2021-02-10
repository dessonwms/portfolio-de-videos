const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

// Inclusão dos arquivos estáticos
server.use(express.static('public'))

// Configuração da Template Engine
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {

    const about = {
        avatar_url: "https://avatars.githubusercontent.com/u/61638378?s=460&u=fba73b95ced37326d61da475e422fa9c15e3b4f0&v=4",
        name: "Desson Medeiros",
        role: "Instrutor - Lynx Code",
        description: 'Programador full-stack, focado em trazer conteúdo de qualidade para iniciantes em programação. Colaborador <a href="https://www.lynxcode.com.br" target="_blank">Lynx Code</a>',
        links: [
            { name: "Github", url: "https://github.com/dessonwms" },
            { name: "Twitter", url: "https://www.twitter.com/dessonwms" },
            { name: "Linkdin", url: "https://www.linkdin.com" }
        ]
    }

    return res.render("about", { about })
})

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        if(video.id == id)
            return true
        
    })

    if(!video){
        return res.send("Video not found!");
    }

    return res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log("Server is running")
})
const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})
server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://avatars1.githubusercontent.com/u/25624214?s=460&u=f4468fc7f42e146fe8921b71e4aac6d133c6ae47&v=4",
        name: "Baronnny Castro",
        role: "Aluno - javascript",
        description: 'Focado no aprendizado da linguagem Javascript visando desenvolvimento fullstack e mobile, com node, react e react native. Acesse meu <a href="https://www.github.com/baronnycastro" target="_blank">github.</a>',
        links: [
            {name: "Github", url:"https://www.github.com/baronnycastro"},
            {name: "Twitter", url:"https://twitter.com/JoseBaronny"},
            {name: "Linkedin", url:"http://www.linkedin.com/in/baronnycastro"}
        ]
    }
    return res.render("about", { about })
})

server.get("/portfolio", function (req, res) {

    return res.render("portfolio", { items: videos })
})

server.get("/video", function (req, res) {
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })
    if(!video) {
        res.send("Video not found!")
    }
    
    return res.render("video", { item: video })
})
server.listen(5000, function () {
    console.log("server is running")
}) 
 
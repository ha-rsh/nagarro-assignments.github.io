const http = require('http')
const fs = require('fs')

http.createServer((req, res) =>{
    fs.readFile(__dirname + (req.url === "/" ? "/index.html":req.url), (err, filedata) =>{

        if(err) console.log("Failed to load file")
        else{
            res.write(filedata);
        }
    })
}).listen(3000, 'localhost', () =>{
    console.log("server started")
})
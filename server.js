const fabric = require('fabric').fabric
const fs = require('fs')
const http = require('http')
const url = require('url')
const PORT = 8887
const HOST_NAME = '127.0.0.1'
const server =  http.createServer((req, res) => {

  const params = url.parse(req.url, true)
  if (params.path === '/') {
    fs.readFile('./public/index.html', (err, data) => {
      console.log('write index.html')
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(data)
      res.end()
    })
  } else if (params.path === '/add') {
    console.log('user upload file')

    // res.writeHead(200, { 'Content-Type': 'image/png' })
    let body = ''
    req.on('data', (data) => {
      body += data
    })
    req.on('end', () => {
      console.log('body end')
      const canvas = new fabric.Canvas(null, {
        width: 500,
        height: 500,
        backgroundColor: 'black'
      })
      const jsonSave = JSON.parse(body).data
      console.log(jsonSave)
      canvas.loadFromJSON(jsonSave, () => {canvas.renderAll()})
      canvas.add(new fabric.Text('Nono', {
        opacity: 0.5,
        fontSize: 60,
        fill: 'blue'
      })).renderAll()

      const base64Data = canvas.toDataURL().replace(/^data:image\/png;base64,/, '')
      const filename = `./output/fabric-${Date.now()}.png`
      // save base64
      fs.writeFileSync(filename, base64Data, 'base64', (err) => {
        console.log('err: ' + err)
      })
      const img = fs.readFileSync(filename)
      res.writeHead(200, {'Content-Type': 'image/png'})
      res.end(img, 'binary')
    })
    
  } else {
    res.write('404')
    res.end()
  }
  
})

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server running at http://${HOST_NAME}:${PORT}/`);
})
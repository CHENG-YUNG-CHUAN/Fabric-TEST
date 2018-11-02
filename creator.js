const fs = require('fs'),
fabric = require('fabric').fabric

const canvas = new fabric.Canvas(null, {
  width: 500,
  height: 500,
  backgroundColor: 'black'
})

const rect = new fabric.Rect({
  width: 100,
  height: 100,
  top: 0,
  left: 0,
  fill: 'red'
})

canvas.add(rect)
const base64Data = canvas.toDataURL().replace(/^data:image\/png;base64,/, '')

// save base64
fs.writeFile('./out.png', base64Data, 'base64', function (err) {
  console.log(err)
})

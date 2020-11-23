const options = require('./webpack.config')
const MyPack = require('./mypack.js')
const myPack = new MyPack(options)
myPack.run()
const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017',{dbName:'FullStack'}).then(() => {console.log('몽고DB연결 성공')});

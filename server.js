// var express = require('express');

// var sequelize = require('./server/utils/database.js');

// var router = require('./server/routes/routes.js');

// var bodyParser = require('body-parser')


// var app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())

// app.use((_, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });


// app.use(router);

// sequelize.sync(); 

// app.listen(4545);

// var server = app.listen(4545, function(){
//     var host = server.address().server
//     var port = server.address().port
// })

// conn.connect(function(error){
//     if(error) console.log(error);
//     else console.log('connnected');
// })
async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connect();

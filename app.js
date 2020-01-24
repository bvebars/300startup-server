const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes/auth.routes')(app);
require('./routes/product.routes')(app);

app.use(express.json({extended: true}));

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
});


// const express = require('express');
// const config = require('config');
// const {Sequelize} = require('sequelize');
// // const {Client} = require('pg');
// // const models = require('models');
// const User = require('./models/User');
//
// const app = express();
//
// // app.use('/api/auth', require('./routes/auth.routes'));
//
// const PORT = config.get('port') || 5000;
//
// // Объект sequelize
// const sequelize = new Sequelize("postgres", "postgres", "777777",
//     {
//         dialect: 'postgres',
//         host: "localhost",
//         port: 5432
//     },
// );
//
//
// sequelize.sync().then(()=>{
//     app.listen(3000, function(){
//         console.log("Сервер ожидает подключения...");
//     });
// }).catch(err=>console.log(err));
//
// app.get("/", function(req, res){
//     User.findAll({raw: true }).then(data=>{
//         res.status(200).json(results.rows)
//     }).catch(err=>console.log(err));
// });

//
// async function start() {
//     try {
//         await client.connect();
//         client.query('SELECT NOW()', (err, res) => {
//             console.log(err, res);
//             app.listen(PORT, () => console.log(`App started on ${PORT}...`));
//
//             var bcrypt = require('bcryptjs');
//             var hash = bcrypt.hashSync("456", bcrypt.genSaltSync(10));
//
//             console.log(hash);
//
//             client.end()
//         });
//     } catch (e) {
//         console.log('Server Error', e.message);
//         process.exit(1)
//     }
// }
//
// start();



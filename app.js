const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./config/db');
const path = require('path');

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({ extended: true })
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


// // Root
app.get('/', (req, res) => {
    res.send('API WORKS!');
});

// // API path
 const lesionados = require('./routes/lesionadosRoutes');
 const colisiones = require('./routes/colisionadosRoutes');
 app.use("/lesionados", lesionados); //Rutas para lesionados
 app.use("/colisiones", colisiones); //Ritas para colisiones


// Static
// app.use(express.static(path.join(__dirname, 'public'))); //path/public
// app.get('/*', function(req, res, next) {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });



app.set('puerto', process.env.PORT || 5000);
app.listen(app.get('puerto'), () => {
    console.log('Example app listening on port ' + app.get('puerto'));
});
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./config/db');

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


// Root
app.get('/', (req, res) => {
    res.send('Hello World from root!');
});

// // API path
 const colisionados = require('./routes/colisionadosRoutes');
 app.use("/colisiones", colisionados);


app.set('puerto', process.env.PORT || 5000);
app.listen(app.get('puerto'), () => {
    console.log('Example app listening on port ' + app.get('puerto'));
});
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({ extended: true })
);

// Root
app.get('/', (req, res) => {
    res.send('Hello World from root!');
});

<<<<<<< HEAD

// // API path
<<<<<<< HEAD
 const colisionados = require('./routes/colisionadosRoutes');
 app.use("/colisiones", colisionados);
=======
=======
// API path
>>>>>>> 661ddbde227510783163b94aa047acd0b40514a4
const colisionados = require('./routes/colisionadosRoutes');
app.use("/colisiones", colisionados);
>>>>>>> df023e35a4c9e5c77f04abe36ff5c65ebdb35e59

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
    console.log('Example app listening on port ' + app.get('puerto'));
});
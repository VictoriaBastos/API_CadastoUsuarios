const express = require('express');
const app = express();
const cors = require('cors');
const usersRoutes = require('./routes/users.js');

const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);


app.get("/", (req, res) => {
    res.status(200).send("Hello from Homepage");
})






app.listen(PORT, () => {
    console.log("Servidor Funcionando");
})


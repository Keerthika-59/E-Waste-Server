const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const { data } = require('./data.js')

app.get('/', (req, res) => {
    try {
        res.send(data);

    } catch (error) {
        res.send({
            message: 'Error handling Get Request'
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is Up and Running at ${PORT}`);
});

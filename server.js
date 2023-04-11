const express = require('express');
const path = require('path');
const notes = require('./Develop/db/db.json');
const api = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})


app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`));
require('dotenv').config();

const express = require('express');

const app = express();

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`listening on ${PORT}, visit http://localhost:${PORT}`);
});
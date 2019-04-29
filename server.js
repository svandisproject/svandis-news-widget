const express = require('express');
const app = express();

app.use(express.static('elements'));

app.listen(process.env.PORT || 3000, () => console.log('Express server is running...'));

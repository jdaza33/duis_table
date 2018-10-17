const express = require('express');

const port = process.env.PORT || 8020;

const app = express();

//Static
app.use(express.static(__dirname + '/dist/'));

//Output
app.listen(port, () => {
console.log(`Server on port ${port}`);
});


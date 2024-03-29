var express = require("express");
const app = express();
const htmlroutes = require("./routes/htmlroutes");

const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(htmlroutes);


require('./routes/apiroutes')(app);
// require('./routes/htmlroutes')(app);


app.listen(PORT, function() {
  console.log(`Server is listening on PORT: http://localhost:${PORT}/`);
});

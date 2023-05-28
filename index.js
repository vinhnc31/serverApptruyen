const express = require("express");
const app = express();
const port = 4000;
var mongodb = require("mongoose");
const handlebar = require("express-handlebars");
var config = require("./Mongodb/database");
var methods = require("method-override");
const bodyParser = require("body-parser");
const routes = require("./Routes/index");
const path = require("path");
app.use(express.json());
app.use(methods("_method"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.engine(
  ".hbs",
  handlebar.engine({
    extname: "hbs",
    defaultLayout: "home",
    layoutsDir: "views/layouts/",
    helpers: { sum: (a, b) => a + b },
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");
mongodb.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
routes(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

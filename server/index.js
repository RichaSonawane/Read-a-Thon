require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./util/database");
const {User} = require('./models/user')

const { PORT } = process.env;
const { register, login } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");


const app = express();

app.use(express.json());
app.use(cors());

//AUTH
app.post('/register', register)
app.post('/login', login)


// the force: true is for development -- it DROPS tables!!!
// you can use it if you like while you are building
// sequelize.sync({ force: true })
sequelize.sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`db sync successful & server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
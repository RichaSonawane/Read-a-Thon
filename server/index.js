require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Review } = require("./models/review");
//const {UserList}= require("./models/userList")

const { PORT } = process.env;
const { register, login } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");
const {
  getAllReviews,
  getCurrentUserReviews,
  addReview,
  editReview,
  deleteReview,
  addBook,
} = require("./controllers/reviews");


const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(Review);
Review.belongsTo(User);


//AUTH
app.post('/register', register)
app.post('/login', login)

// GET POSTS - no auth
app.get('/reviews', getAllReviews)

// CRUD POSTS - auth required
app.post("/userList", isAuthenticated, addBook)
app.get("/userreviews/:userId", getCurrentUserReviews);
app.post("/reviews", isAuthenticated, addReview);
app.put("/reviews/:id", isAuthenticated, editReview);
app.delete("/reviews/:id", isAuthenticated, deleteReview);

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
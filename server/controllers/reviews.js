const { User } = require("../models/user");
const { Review } = require("../models/review");

module.exports = {
  getAllReviews: async (req, res) => {
    try {
    const reviews = await Review.findAll({
        where: {privateStatus: false},
        include: [{
            model: User,
            required: true,
            attributes: [`username`]
        }]
    })
    res.status(200).send(reviews)
} catch (error) {
    console.log('ERROR IN getAllPosts')
    console.log(error)
    res.sendStatus(400)
  }
},

  getCurrentUserReviews: async (req, res) => {
    try {
      const { userId } = req.params;
      const reviews = await Review.findAll({
        where: { userId: userId },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(reviews)
    } catch (error) {
      console.log("ERROR IN getCurrentUserPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },

  addReview: async (req, res) => {
      try {
        const {title, content, status, userId} = req.body
        await Review.create({title, content,privateStatus: status, userId})
        res.sendStatus(200)
    } catch (error) {
        console.log('ERROR IN addreview')
        console.log(error)
        res.sendStatus(400)
    }
  },

  editReview: async(req, res) => {
    try {
        const {id} = req.params
        const {status} = req.body
        await Review.update({privateStatus: status}, {
            where: {id: +id}
        })
        res.sendStatus(200)
    } catch (error) {
        console.log('ERROR IN edit review')
        console.log(error)
        res.sendStatus(400)
    }
  },

  deleteReview: async (req, res) => {
      try {
        const {id} = req.params
        await Review.destroy({where: {id: +id}})
        res.sendStatus(200)
    } catch (error) {
        console.log('ERROR IN delete review')
        console.log(error)
        res.sendStatus(400)
    }
  },
};
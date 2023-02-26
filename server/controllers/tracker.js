const { User } = require("../models/user");
const {Tracker}= require('../models/tracker')

module.exports = {
  getTracker:async (req, res) => {
       try {
         const { userId } = req.params;
         const tracker = await Tracker.findAll({
           where: { userId: userId },
           include: [
             {
               model: User,
               required: true,
               attributes: [`username`],
             },
           ],
         });
         res.status(200).send(tracker);
       } catch (error) {
         console.log("ERROR IN get tracker");
         console.log(error);
         res.sendStatus(400);
       }
    },
      addTracker: async (req, res) => {
        try {
      const { progress,bookid, userId } = req.body;
      await Tracker.create({ progress,bookid, userId });
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN add tracker");
      console.log(error);
      res.sendStatus(400);
    }
},


};
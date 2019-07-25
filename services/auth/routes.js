const router = require("express").Router();
const bcrypt = require("bcryptjs");
const controller = require("./controllers");
const mdlware = require("./middleware");
const helpers = require("./helpers");

router.post("/register", mdlware.validRegisterBody, async (req, res, next) => {
  const hash = bcrypt.hashSync(req.newUser.password, 12);
  req.newUser.password = hash;

  try {
    const registeredUser = await controller.postUser(req.newUser);
    if (registeredUser) {
      const token = helpers.generateToken(registeredUser);
      res.status(201).json({ registeredUser, token });
    } else {
      res.status(400).json({ message: "User could not be created" });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", mdlware.validUserId, async (req, res, next) => {
  try {
    const deletedUser = await controller.deleteUser(req.params.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

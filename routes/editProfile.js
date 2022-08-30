const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {

    var payload = {
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        email: req.session.user.email,
        username: req.session.user.username
    };

    res.status(200).render("editProfile", payload);
})

router.post("/", async (req, res, next) => {

    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;

    if (firstName || lastName || email || password) {
        var user = await User.findOne({ username: req.session.user.username })
            .catch((error) => {
                console.log(error);
                payload.errorMessage = "Something went wrong.";
                res.status(200).render("editProfile", payload);
            });

        if (user != null) {
            if (password == "") {
                User.updateOne({
                    username: user.username
                }, {
                    $set: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email
                    }
                })
                    .then(() => {
                        return res.redirect("/profile");
                    })
            } else {
                password = await bcrypt.hash(password, 10);
                User.updateOne({
                    username: user.username
                }, {
                    $set: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password
                    }
                })
                    .then(() => {
                        return res.redirect("/profile");
                    })
            }
            req.session.user.firstName = firstName;
            req.session.user.lastName = lastName;
            req.session.user.email = email;
        }
        else {
            payload.errorMessage = "User not found";
            res.status(200).render("editProfile", payload);
        }
    }
    else {
        payload.errorMessage = "Make sure one of the fields has a valid value.";
        res.status(200).render("editProfile", payload);
    }
})

module.exports = router;
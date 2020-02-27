module.exports = {
    authLocal: function () {
        return function (req, res, next) {
            passport.authenticate('local', {
                successRedirect: '/agent/index',
                failureRedirect: '/agent/auth?reason=wrong-password',
            })(req, res, next);

        }
    },

    authenticateJwt: function () {
        return function (req, res) {
            let login = req.body.username;
            let password = req.body.password;
            if (login && password) {
                storage.getUser(login, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result) {
                            if (password === passwordGen.decrypt(result.password)) {
                                let payload = {login: login};
                                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                                storage.setUserToken(login, token, function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.json({ok: 'true', token: token});
                                    }
                                })
                            } else {
                                res.status(401).json({message: 'Wrong password'});
                            }
                        } else {
                            res.status(401).json({message: 'User not found'});
                        }
                    }
                });
            } else {
                res.status(401).json({message: 'Required fields are missed.'});
            }
        }
    }
}
module.exports = function (req, res, ok) {
    if (req.session.auth && req.session.User && req.session.User.admlvl >= 7) {
        return ok();
    } else {
        return res.send('В доступе отказано')
    }
};
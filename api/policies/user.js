module.exports = function (req, res, ok) {
    if (req.session.auth && req.session.User) {
        return ok();
    } else {
        return res.redirect('/login');
    }
};
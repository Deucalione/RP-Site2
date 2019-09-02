module.exports = function (req, res, ok) {
    if (req.session.auth && req.session.User && req.session.User.leader) {
        return ok();
    } else {
        return res.redirect('/login');
    }
};
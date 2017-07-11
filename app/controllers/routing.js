var indexPage = function (req, res) {
    res.render('index');
};

var partialsPages = function (req, res) {
    var partialName = req.params.partialName;
    res.render('partials/' + partialName);
};

module.exports = { 
    indexPage: indexPage, 
    partialsPages: partialsPages 
};
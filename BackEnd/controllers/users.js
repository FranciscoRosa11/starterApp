var User = require('../models/users')

module.exports.listar = () => {
    return User
        .find()
        .sort('-data')
        .exec()
}

module.exports.consultar = name => {
    return User
        .findOne({username: name})
        .exec()
}

module.exports.inserir = u => {
    var novo = new User(u)
    return novo.save()
}

module.exports.remover = uname => {
    return User.deleteOne({username: uname})
}
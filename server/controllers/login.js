var fs = require('fs');
var path = require('path');
var basePath = path.resolve('');

exports.index = function (req, res, next) {

    fs.readFile(basePath+'/api/login/login.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });

}

/**
 * 注销接口
 */
exports.logout = function (req, res, next) {

    fs.readFile(basePath+'/api/login/logout.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });
}


var fs = require('fs');
var path = require('path');
var basePath = path.resolve('');

exports.get_order = function (req, res, next) {

    fs.readFile(basePath+'/api/staffSalesOrder/get_order.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });

}
exports.get_staff_order = function (req, res, next) {

    fs.readFile(basePath+'/api/staffSalesOrder/get_staff_order.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });

}
exports.staff_order = function (req, res, next) {
    fs.readFile(basePath+'/api/staffSalesOrder/staff_order.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });

}
var fs = require('fs');
var path = require('path');
var basePath = path.resolve('');

exports.brands_pay = function (req, res, next) {

    fs.readFile(basePath+'/api/base/brands_pay.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });

}

exports.get_good_spec_list = function (req, res, next) {

    fs.readFile(basePath+'/api/base/get_good_spec_list.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });

}


/**
 * 
 */
exports.freight = function (req, res, next) {

    fs.readFile(basePath+'/api/base/freight.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });
}

/**
 * 
 */
exports.freight_old = function (req, res, next) {

    fs.readFile(basePath+'/api/base/freight_old.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });
}

/**
 *
 */
exports.logistic = function (req, res, next) {

    fs.readFile(basePath+'/api/base/logistic_old.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });
}

/**
 *
 */
exports.logistic_old = function (req, res, next) {

    fs.readFile(basePath+'/api/base/logistic_old.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });
}

/**
 *
 */
exports.get_freight = function (req, res, next) {

    fs.readFile(basePath+'/api/base/get_freight.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });
}

/**
 * 订单状态
 */
exports.get_order_status = function (req, res, next) {

    fs.readFile(basePath+'/api/base/get_order_status.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });
}

/**
 * 发送验证码到邮箱
 */
exports.sendEmailCode = function (req, res, next) {

    fs.readFile(basePath+'/api/base/sendEmailCode.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });
}

/**
 * 校验邮箱验证码
 */
exports.checkEmailCode = function (req, res, next) {

    fs.readFile(basePath+'/api/base/checkEmailCode.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });
}

/**
 * 邮箱注册
 */
exports.registEmail = function (req, res, next) {

    fs.readFile(basePath+'/api/base/registEmail.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });
}

/**
 * 系统更新日志
 */
exports.ver_log = function (req, res, next) {

    fs.readFile(basePath+'/api/base/ver_log.json', {
        encoding: 'utf-8'
    }, function (error, data) {
        if (error) console.log(error);
        res.send(data);
    });
}


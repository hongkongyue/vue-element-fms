/*!
 * 路由模块
 */

var express = require('express');
var loginCtrl = require('./controllers/login');
var baseCtrl = require('./controllers/base');
var staffSalesOrderCtrl = require('./controllers/staffSalesOrder');

var router = express.Router();

router.post('/eop/sys/login',loginCtrl.index);
router.post('/eop/sys/sendEmailCode',baseCtrl.sendEmailCode);
router.post('/eop/sys/checkEmailCode',baseCtrl.checkEmailCode);
router.post('/eop/sys/ver_log',baseCtrl.ver_log);



router.post('/eop/eom/get_order', staffSalesOrderCtrl.get_order);
router.post('/eop/eom/get_order_check', staffSalesOrderCtrl.get_order);
router.post('/eop/eom/staff_order', staffSalesOrderCtrl.staff_order);
router.post('/eop/eom/get_staff_order', staffSalesOrderCtrl.get_staff_order);
router.post('/eop/eom/spl/general/get_order', staffSalesOrderCtrl.get_order);
router.post('/base/logout', loginCtrl.logout);

router.post('/eop/eom/brands_pay',baseCtrl.brands_pay);
router.post('/eop/eom/get_good_spec_list',baseCtrl.get_good_spec_list);
router.post('/eop/eom/freight_old',baseCtrl.freight_old);
router.post('/eop/eom/base/logistic_old',baseCtrl.logistic_old);
router.post('/eop/eom/freight',baseCtrl.freight);
router.post('/eop/eom/base/logistic',baseCtrl.logistic);
router.post('/eop/eom/spl/get_freight',baseCtrl.get_freight);
router.post('/eop/eom/get_order_status',baseCtrl.get_order_status);



module.exports = router;
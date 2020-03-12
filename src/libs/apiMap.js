const methodMap = {

    //FMS

    //平台
    getPlatform:{url:'/eop-boot/masterData/platform/page',method:'post'},//平台-列表分页查询
    getPlatformSelector:{url:'/eop-boot/masterData/platform/selector',method:'post'},//平台-下拉框
    //店铺
    merchantstore_basic_pageQuery     :{url:'/eop-boot/masterData/basicMerchantStore/page',              method:'post'},      //店铺分页查询
    merchantstore_basic_commonQuery   :{url:'/eop-boot/masterData/basicMerchantStore/commonQuery',       method:'post'},      //获取所有店铺
    merchantstore_basic_createNewStore:{url:'/eop-boot/masterData/basicMerchantStore/add',               method:'post'},      //新增
    merchantstore_basic_updateById    :{url:'/eop-boot/masterData/basicMerchantStore/update',             method:'post'},      //更新
    masterData_company_selector       :{url:'/eop-boot/masterData/company/selector',                      method:'post'},       //公司下拉数据
    addPlatform:{url:'/eop-boot/masterData/platform/add',method:'post'},//平台-新增
    updatePlatform:{url:'/eop-boot/masterData/platform/update',method:'post'},//平台-修改
    getBindingByPlatformId:{url:'/eop-boot/masterData/basicMerchantStore/getBindingByPlatformId',method:'get'},//根据绑定平台获取（列表）
    merchantstore_updateById:{url:'/eop-boot/merchantstore/basic-merchant-store/updateById',method:'post'},//平台编辑提交

    //公司
    getCompany:{url:'/eop-boot/masterData/company/page',method:'post'},//公司-列表分页查询
    addCompany:{url:'/eop-boot/masterData/company/add',method:'post'},//新增
    selectorCompany:{url:'/eop-boot/masterData/company/selector',method:'post'},//下拉
    updateCompany:{url:'/eop-boot/masterData/company/update',method:'post'},//公司-修改

    //岗位
    getCommonQuery:{url:'/eop-boot/masterData/basic-station/page',method:'post'},//岗位-列表分页查询
    updateCommonQuery:{url:'/eop-boot/masterData/basic-station/update',method:'post'},//修改
    basic_station_commonQuery:{url:'/eop-boot/masterData/basic-station/commonQuery',method:'post'},//下拉

    //品牌
    masterData_brand_selector:{url:'/eop-boot/masterData/brand/selector',method:'post'}, //品牌下拉
    masterData_brand_all:{url:'/eop-boot/masterData/brand/all',method:'post'}, //品牌穿梭框
    masterData_company_all:{url:'/eop-boot/masterData/company/all',method:'post'}, //公司穿梭框
    masterData_brand_page    :{url:'/eop-boot/masterData/brand/page'    ,method:'post'}, //品牌分页查询
    masterData_brand_add     :{url:'/eop-boot/masterData/brand/add'     ,method:'post'}, //品牌新增
    masterData_brand_update  :{url:'/eop-boot/masterData/brand/update'  ,method:'post'}, //品牌更新
    // 人员
    masterData_staff_selector:{url:'/eop-boot/masterData/staff/multipleSelector', method:'post'},//人员-下拉框
    masterData_staff_page:{url:'/eop-boot/masterData/staff/page',    method:'post'},         //人员-列表分页查询
    masterData_staff_sync:{url:'/eop-boot/masterData/staff/sync',    method:'post'},        //人员-同步
    masterData_staff_export:{url:'/eop-boot/masterData/staff/export', method:'post'},        //人员-导出

    //日志列表
    billLog_getPagingByBillNo:{url:'/eop-boot/billLog/getPagingByBillNo',method:'post'}, //日志列表

    //财务类型
    pageFinancialType:{url:'/eop-boot/masterData/financialType/page',method:'post'},  //新增
    addFinancialType:{url:'/eop-boot/masterData/financialType/add',method:'post'},  //新增
    updateFinancialType:{url:'/eop-boot/masterData/financialType/update',method:'post'},  //修改

    //应收管理启用时间

    //主数据编码
    masterData_coderuler_page:{url:'/eop-boot/masterData/coderuler/page',   method:'post'},      //分页列表获取单据编码规则
    masterData_coderuler_nameList:{url:'/eop-boot/masterData/coderuler/nameList',method:'get'},     //单据名称模糊搜索
    masterData_coderuler_add :{url:'/eop-boot/masterData/coderuler/add',     method:'post'},       //添加单据编码规则
    masterData_coderuler_update:{url:'/eop-boot/masterData/coderuler/update',method:'post'},        //更新单据编码规则

    //账单类型
    masterData_received_orderType_page : {url:'/eop-boot/received/orderType/page',    method:'post'},    // 账单类型-分页查询
    received_orderType_add:{url:'/eop-boot/received/orderType/add',                   method:'post'},    // 账单类型-新增
    received_orderType_selector:{url:'/eop-boot/received/orderType/selector',                   method:'post'},    // 账单类型列表-无参数
    received_orderType_platformId:{url:'/eop-boot/received/orderType/platformId',                   method:'post'},    // 账单类型-新增
    received_orderType_update :{url:'/eop-boot/received/orderType/update',                          method:'post'},    // 账单类型-修改
    // 部门
    masterData_department_page     :{url:'/eop-boot/masterData/department/page',      method:'post'},    //部门-列表分页查询
    masterData_department_selector :{url:'/eop-boot/masterData/department/selector',  method:'post'},    //部门-下拉框
    masterData_staff_singleSelector:{url:'/eop-boot/masterData/staff/singleSelector', method:'post'},    //人员-单项下拉框
    masterData_department_enable   :{url:'/eop-boot/masterData/department/enable',    method:'post'},       //部门-启用禁用
   //应收管理启用时间
    received_accReceivedPeriod_commonQuery :{url:'/eop-boot/received/accReceivedPeriod/commonQuery',method:'post'},//查询
    received_accReceivedPeriod_addBatch    :{url:'/eop-boot/received/accReceivedPeriod/addBatch'   ,method:'post'},//查询
    masterData_department_enable           :{url:'/eop-boot/masterData/department/enable',          method:'post'},//部门-启用禁用
      //账单导入与查询   
     acc_received_file_record_page:{url:'/eop-boot/received/acc-received-file-record/page', method:'post'},    //分页查询
     accountPeriod_selector:{url:'/eop-boot/sys/accountPeriod/selector', method:'post'},    //业务账期下拉选择查询
     uploadStdSync:{url:'/eop-boot/received/acc-received-file-record/uploadStdSync', method:'post'},    //通用模板文件上传导入
     uploadSync:{url:'/eop-boot/received/acc-received-file-record/uploadSync', method:'post'},    //拼多多文件上传导入
     uploadRemove:{url:'/eop-boot/received/acc-received-file-record/remove', method:'post'},    //文件上传-删除
     doAsyncModifyParsing:{url:'/eop-boot/received/accReceived/doAsyncModifyParsing', method:'post'},    //账单修改文件导入(许克胜)

     //入账金额表
     acc_acc_amount_query_01:{url:'/eop-boot/acc/acc-amount/query',method:'post'},//查询接口
     acc_accamount_downloadCsvFile:{url:'/eop-boot/acc/acc-amount/downloadCsvFile',method:'post'},//查询接口
     //业务账期
     sys_accountPeriod_names:{url:'/eop-boot/sys/accountPeriod/names',  method:'post'}, //业务账期-账期名称列表
     sys_accountPeriod_page:{url:'/eop-boot/sys/accountPeriod/page',    method:'post'}, //业务账期-列表信息
     sys_accountPeriod_update:{url:'/eop-boot/sys/accountPeriod/update',method:'post'}, //启用禁用
     sys_accountPeriod_delete:{url:'/eop-boot/sys/accountPeriod/delete',method:'post'}, //业务账期-删除
     sys_accountPeriod_add:{url:'/eop-boot/sys/accountPeriod/add',      method:'post'}, //业务账期-新增

     //应收核销
     accverification_page:{url:'/eop-boot/accverification/page',method:'post'},//应收核销列表
     accverification_detail:{url:'/eop-boot/accverification/detail',method:'post'},//应收核销-核销明细列表
     accverification_asyncExport:{url:'/eop-boot/accverification/asyncExport',method:'post'},//应收核销导出
     accverification_asyncAutoVerify:{url:'/eop-boot/accverification/asyncAutoVerify',method:'post'},//应收核销自动核销
     received_asyncAutoVerify:{url:'/eop-boot/received/accReceived/asyncForceVerify',method:'post'},//收款单强制核销（许克胜）

      //收款单 
      accReceived_page:{url:'/eop-boot/received/accReceived/page',method:'post'},//收款单列表
      accReceived_asyncInnerVerify:{url:'/eop-boot/received/accReceived/asyncInnerVerify',method:'post'},//收款单列表
      accReceived_selector:{url:'/eop-boot/masterData/financialType/selector',method:'post'},//财务类型-平台下拉接口（许克胜）
      accReceived_add:{url:'/eop-boot/received/accReceived/add',method:'post'},//收款单-手动录入（LMyang）
      received_accReceived_manual_delete:{url:'/eop-boot/received/accReceived/manual/delete',method:'post'} ,//收款单批量删除
      received_accReceived_manual_update:{url:'/eop-boot/received/accReceived/manual/update',method:'post'} ,//收款单修改
      received_orderType_selectorForAccReceivedSearch:{url:'/eop-boot/received/orderType/selectorForAccReceivedSearch',method:'post'} ,//收款单列表-账单模式下拉选择(朱智贤)

       //对账汇总表
       reconciliation_page:{url:'/eop-boot/acc/reconciliation/getPage',method:'post'},//列表筛选
       reconciliation_export:{url:'/eop-boot/acc/reconciliation/export',method:'post'},//异步导出
       acc_reconciliation_getVipPage:{url:'/eop-boot/acc/reconciliation/getVipPage',method:'post'},//唯品会对账汇总列表（许克胜）
      
       //登录
       sys_user_login        :{url:'/eop-boot/user/login',method:'post'},//员工号密码-登录
       sys_user_user_loginOut:{url:'/eop-boot/user/loginOut',method:'post'},//用户-登出,
       sys_user_loginByToken :{url:'/eop-boot/user/loginByToken',method:'post'},//用户-登入,
       sys_user_dingdingScanLogin :{url:'/eop-boot/user/dingdingScanLogin',method:'get'},//钉钉扫码登录
       sys_user_dingdingBindUser :{url:'/eop-boot/user/dingdingBindUser',method:'post'},//钉钉用户绑定

       //FMS忘记密码
       user_forget:{url:'/eop-boot/user/forget'   ,        method:'post'  },//邮箱接收验证码
       user_confirm:{url:'/eop-boot/user/confirm' ,        method:'post'  },// 邮箱验证码校验
       user_password:{url:'/eop-boot/user/modify/password',method:'post'  },//修改用户密码
      
       
      //根据key获取进度    /asyncTask/getProcessResultByTaskKey
      getProcessResultByTaskKey:{url:'/eop-boot/asyncTask/getProcessResultByTaskKey',method:'get'},//根据key获取进度
      delByTaskKey:{url:'/eop-boot/asyncTask/delByTaskKey',method:'get'},//用户确认删除key
      getAllAsyncTasks:{url:'/eop-boot/asyncTask/getAllAsyncTasks',method:'get'},//获取所有key

      //应收单
      receivable_detail:{url:'/eop-boot/acc/receivable/detail',method:'post'},//应收单-明细
      receivable_page:{url:'/eop-boot/acc/receivable/page',method:'post'},//应收单-列表分页查询
      receivable_selector:{url:'/eop-boot/acc/receivable/selector',method:'post'},//应收单-下拉框

      //用户
      user_selector:{url:'/eop-boot/masterData/user/selector',method:'post'},             //用户-下拉框
      user_page:{url:'/eop-boot/masterData/user/page',method:'post'},                    //用户-列表分页查询
      user_update:{url:'/eop-boot/masterData/user/update',method:'post'},               //用户-修改
      user_unlock:{url:'/eop-boot/masterData/user/unlock',method:'get'},               //用户-解锁
      user_resetPassword:{url:'/eop-boot/masterData/user/resetPassword', method:'get'},//用户-重置密码
      masterData_code_selector:{url:'/eop-boot/masterData/code/selector',method:'post'},//单据编码-下拉框

      //角色
      masterData_basicRole_selector:{url:'/eop-boot/masterData/basic-role/selector',                                   method:'post'},//下拉框
      masterData_basicRole_page:{url:'/eop-boot/masterData/basic-role/page',                                           method:'post'},//分页查询
      basicrole_basicRrole_createNewRoleCode:{url:'/eop-boot/masterData/basic-role/createNewRoleCode',                 method:'post'},//新增-获取自增角色编码
      masterData_basicRole_getResourcePermissionTree:{url:'/eop-boot/masterData/basic-role/getResourcePermissionTree', method:'post'},//获取权限树
      masterData_basicRole_add:{url:'/eop-boot/masterData/basic-role/add',method:'post'},//新增角色

      userMapping_allocation:{url:'/eop-boot/masterData/userMapping/allocation',method:'post'},//用户-分配/撤销分配 公司、店铺、品牌
      userMapping_getAllocation:{url:'/eop-boot/masterData/userMapping/getAllocation',method:'get'},//用户-获取分配 公司、店铺、品牌

      bindingRoles:{url:'/eop-boot/masterData/userMapping/bindingRoles', method:'post'},//用户-绑定/解绑角色
      getGroupByPlatform:{url:'/eop-boot/masterData/basicMerchantStore/getGroupByPlatform', method:'get'},//获取所有店铺树（按平台分组）
      basic_role_selector:{url:'/eop-boot/masterData/basic-role/selector', method:'post'},//角色下拉框
      basic_role_getByUserId:{url:'/eop-boot/masterData/basic-role/getByUserId', method:'get'},//获取角色所有列表
      basic_role_getPermissionTree:{url:'/eop-boot/masterData/basic-role/getPermissionTree', method:'get'},//获取角色权限树（传角色id数组）
      masterData_basicRole_getPermissionOfCurrentRole:{url:'/eop-boot/masterData/basic-role/getPermissionOfCurrentRole',method:'post'},//获取角色对应的权限列表
      masterData_basicRole_getUserOfCurrentRole:{url:'/eop-boot/masterData/basic-role/getUserOfCurrentRole',method:'post'},//获取角色对应用户列表
      masterData_basicRole_checkUserInThisRole:{url:'/eop-boot/masterData/basic-role/checkUserInThisRole'  ,method:'post'},//校验用户是否包含在角色内
      masterData_basicRole_update:{url:'/eop-boot/masterData/basic-role/update',method:'post'},//更新编辑

      //资源管理
      menuResource:{url:'/eop-boot/masterData/resource/menuResource',method:'post'},//资源列表（author:许克胜
      resource_add:{url:'/eop-boot/masterData/resource/add',method:'post'},//资源新增（author:许克胜）
      resource_update:{url:'/eop-boot/masterData/resource/update',method:'post'},//资源修改(author:许克胜)
      resource_removeBatchId:{url:'/eop-boot/masterData/resource/removeBatchId',method:'post'},//资源删除（author:许克胜）
      resource_difference:{url:'/eop-boot/masterData/resource/difference',method:'post'},//菜单按钮/列资源列表
      previousMenus:{url:'/eop-boot/masterData/resource/previousMenus',method:'post'},//上级菜单（author:许克胜）
      masterData_resource_buttonResource:{url:'/eop-boot/masterData/resource/buttonResource',method:'post'},//用户菜单按钮权限查询接口(author:许克胜)

      //客户主体
      masterData_subject_page    :{url:'/eop-boot/masterData/subject/page',               method:'post'},  //客户主体-列表筛选
      masterData_subject_selector:{url:'/eop-boot/masterData/subject/selector',           method:'post'},  //客户主体-下拉框
      masterData_subject_update  :{url:'/eop-boot/masterData/subject/update',             method:'post'},  //客户主体-修改
      masterData_subject_add     :{url:'/eop-boot/masterData/subject/add',                method:'post'},  //客户主体-新增

      //系统日志
      masterData_versionLog_page   :{url:'/eop-boot/masterData/versionLog/page',          method:'post'},  //系统日志
      masterData_versionLog_add    :{url:'/eop-boot/masterData/versionLog/add',           method:'post'}, //发版日志-新增
      masterData_versionLog_current:{url:'/eop-boot/masterData/versionLog/current',       method:'post'},   //发版日志-当前版本
      masterData_versionLog_delete :{url:'/eop-boot/masterData/versionLog/delete',        method:'post'},   //发版日志-删除
      masterData_versionLog_update :{url:'/eop-boot/masterData/versionLog/update',        method:'post'},   //发版日志-修改

      //仓库

      masterData_warehouse_page :{url:'/eop-boot/masterData/warehouse/page',              method:'post'},   //  仓库分页查询 
      masterData_warehouse_add  :{url:'/eop-boot/masterData/warehouse/add',               method:'post'},   //  仓库新增
      masterData_warehouse_update:{url:'/eop-boot/masterData/warehouse/update',           method:'post'},   //   仓库修改
      masterData_warehouse_delete:{url:'/eop-boot/masterData/warehouse/delete',           method:'post'}, 

      masterData_warehouse_page    : {url:'/eop-boot/masterData/warehouse/page',            method:'post'},   //  仓库分页查询 
      masterData_warehouse_add     : {url:'/eop-boot/masterData/warehouse/add',             method:'post'},   //  仓库新增
      masterData_warehouse_update  : {url:'/eop-boot/masterData/warehouse/update',          method:'post'},   //   仓库修改
      masterData_warehouse_delete  : {url:'/eop-boot/masterData/warehouse/delete',          method:'post'}, 
      masterData_warehouse_selector: {url:'/eop-boot/masterData/warehouse/selector',        method:'post'}, //仓库下拉

      //主数据  业务类型
      businessType_page:{url:'/eop-boot/masterData/businessType/page',                    method:'post'},    //业务类型-列表筛选
      businessType_add:{url:'/eop-boot/masterData/businessType/add',                      method:'post'},      //业务类型-新增
      businessType_update:{url:'/eop-boot/masterData/businessType/update',                method:'post'},//业务类型-修改
      businessType_all:{url:'/eop-boot/masterData/businessType/page',                method:'post'},//获取所有（下拉）

      //单据类型

      masterData_code_page   : {url:'/eop-boot/masterData/code/page',                     method:'post'},  //单据类型-列表筛选
      masterData_code_add    : {url:'/eop-boot/masterData/code/add',                      method:'post'},  //单据类型-新增
      masterData_code_update : {url:'/eop-boot/masterData/code/update',                   method:'post'},  //单据类型-修改
      masterData_code_delete : {url:'/eop-boot/masterData/code/delete',                   method:'post'},  //单据类型-修改

      //应付管理 结算明细
      payable_settlementOrder_page:{url:'/eop-boot/payable/settlementOrder/page',         method:'post'},  //结算单-列表筛选
      payable_settlementOrder_detail:{url:'/eop-boot/payable/settlementOrder/detail',     method:'post'},  //结算单-货品明细
      payable_settlementOrder_check :{url:'/eop-boot/payable/settlementOrder/check',      method:'post'},  //结算单-审核/取消审核/删除/生成对账单 检验
      payable_settlementOrder_command:{url:'/eop-boot/payable/settlementOrder/command',   method:'post'},  //结算单-审核/取消审核/删除/生成对账单(入参和检验一样)
      masterData_supplier_selector:{url:'/eop-boot/masterData/supplier/selector',         method:'post'},  //供应商页面下拉
      payable_settlementOrder_deductionDetail:{url:'/eop-boot/payable/settlementOrder/deductionDetail',method:'post'},  //结算单-获取扣款调整明细
      payable_settlementOrder_adjustDeduction:{url:'/eop-boot/payable/settlementOrder/adjustDeduction',method:'post'},  //扣款调整
      // 对账单
      payable_reconciliationOrder_page:{url:'/eop-boot/payable/reconciliationOrder/page', method:'post'},    //对账单-列表筛选
      payable_reconciliationOrder_detail:{url:'/eop-boot/payable/reconciliationOrder/detail', method:'post'},//对账单-明细列表

      //对账单
      payable_reconciliationOrder_check  :{url:'/eop-boot/payable/reconciliationOrder/check'  ,   method:'post'},//对账单-审核/取消审核/删除 检验
      payable_reconciliationOrder_command:{url:'/eop-boot/payable/reconciliationOrder/command',   method:'post'},//对账单-审核/取消审核/删除
      payable_reconciliationOrder_export :{url:'/eop-boot/payable/reconciliationOrder/export',    method:'post'},//对账单-异步导出
      //供应商
      supplier_page:{url:'/eop-boot/masterData/supplier/page',method:'post'},//供应商列表查询（author:张明杰
      supplier_constant:{url:'/eop-boot/masterData/supplier/constant',method:'post'},//供应商页面下拉（author:张明杰
      supplier_add:{url:'/eop-boot/masterData/supplier/add',method:'post'},//供应商新增（author:张明杰
      supplier_update:{url:'/eop-boot/masterData/supplier/update',method:'post'},//供应商修改（author:张明杰
      supplier_multipleSelector:{url:'/eop-boot/masterData/staff/multipleSelector',method:'post'},//生产理单员（author:张明杰
      supplier_constant:{url:'/eop-boot/masterData/supplier/constant',method:'post'},//供应商页面下拉（author:张明杰
      supplier_multipleSelector:{url:'/eop-boot/masterData/staff/multipleSelector',method:'post'},//生产理单员（author:张明杰
      supplier_getPagingByBillNo:{url:'/eop-boot/billLog/getPagingByBillNo',method:'post'},//供应商日志（author:张明杰
      supplier_provinceSelector:{url:'/eop-boot/masterData/district/provinceSelector',method:'post'},//省份下拉（author:张明杰
      supplier_citySelector:{url:'/eop-boot/masterData/district/citySelector',method:'post'},//根据 省份查询城市（author:张明杰
      supplier_sync:{url:'/eop-boot//masterData/supplier/sync',method:'post'},//同步供应商数据（author:张明杰

      //scm采购单
      order_pageQuery:{url:'/eop-boot/payable/biz-purchase-order/pageQuery',method:'post'},//分页查询（author:lxx
      order_sync:{url:'/eop-boot/payable/biz-purchase-order/sync',method:'post'},//同步（author:lxx
      order_queryByNo:{url:'/eop-boot/payable/biz-purchase-order/queryByNo',method:'post'},//通过采购单号获取采购单数据（author:lxx
      order_getDetailByNo:{url:'/eop-boot/payable/biz-purchase-order/getDetailByNo',method:'post'},//采购单明细（author:lxx
      factorySelector:{url:'/eop-boot/masterData/supplier/factorySelector',method:'post'},//查询供应商工厂:lxx

      //扣款建议
      deductionAdvice_page:{url:'/eop-boot/payable/deductionAdvice/page',method:'post'},//扣款建议-列表筛选（author:lmy
      deductionAdvice_detail:{url:'/eop-boot/payable/deductionAdvice/detail',method:'post'},//扣款建议-明细（author:lmy
      deductionAdvice_check:{url:'/eop-boot/payable/deductionAdvice/check',method:'post'},//扣款建议-审核/取消审核/删除/关闭 检验（author:lmy
      deductionAdvice_command:{url:'/eop-boot/payable/deductionAdvice/command',method:'post'},//扣款建议-审核/取消审核/删除/关闭（author:lmy
      deductionAdvice_templateFile:{url:'/eop-boot/payable/deductionAdvice/templateFile',method:'post'},//扣款建议-下载模板文件（author:lmy
      deductionAdvice_uploadAsync:{url:'/eop-boot/payable/deductionAdvice/uploadAsync',method:'post'},//扣款建议-文件导入（author:lmy
      deductionAdvice_add:{url:'/eop-boot/payable/deductionAdvice/add',method:'post'},//扣款建议-新增（author:lmy
      deductionAdvice_update:{url:'/eop-boot/payable/deductionAdvice/update',method:'post'},//扣款建议-修改（author:lmy

      masterData_code_page   : {url:'/eop-boot/masterData/code/page',              method:'post'},  //单据类型-列表筛选
      masterData_code_add    : {url:'/eop-boot/masterData/code/add',               method:'post'},  //单据类型-新增
      masterData_code_update : {url:'/eop-boot/masterData/code/update',            method:'post'},  //单据类型-修改
      masterData_code_delete : {url:'/eop-boot/masterData/code/delete',            method:'post'},  //单据类型-修改
      //商品详情
      masterData_sys_s_page :  {url:'/eop-boot/masterData/sys-spu/page',            method:'post'},  //商品分页查询
      masterData_warehouse_booleanWareHouse:{url:'/eop-boot/masterData/warehouse/booleanWareHouse',method:'post'}, //仓库编码校验

      //实时库存
      core_realCoreStock_page:{url:'/eop-boot/core/realCoreStock/page',            method:'post'},//实时库存(许克胜)
      core_core_export       :{url:'/eop-boot/core/export',                        method:'post'},//实时库存或历史库存导出（许克胜）

      deductionAdvice_command:{url:'/eop-boot/payable/deductionAdvice/command',                method:'post'},//扣款建议-审核/取消审核/删除/关闭（author:lmy
      deductionAdvice_templateFile:{url:'/eop-boot/payable/deductionAdvice/templateFile',      method:'post'},//扣款建议-下载模板文件（author:lmy
      deductionAdvice_uploadAsync:{url:'/eop-boot/payable/deductionAdvice/uploadAsync',        method:'post'},//扣款建议-文件导入（author:lmy

      //扣款单
      payable_deductionOrder_page   :{url:'/eop-boot/payable/deductionOrder/page',            method:'post'},    //扣款单-列表筛选
      payable_deductionOrder_detail :{url:'/eop-boot/payable/deductionOrder/detail',          method:'post'},    //扣款单-明细
      payable_deductionOrder_update :{url:'/eop-boot/payable/deductionOrder/update',          method:'post'},    //扣款单-修改
      payable_deductionOrder_check :{url:'/eop-boot/payable/deductionOrder/check',method:'post'}, //扣款单-审核/取消审核/删除/关闭/生成扣款单 校验
      payable_deductionOrder_command :{url:'/eop-boot/payable/deductionOrder/command',method:'post'}, //扣款单-审核/取消审核/删除

      //关单登记
      closed_pageQuery:{url:'/eop-boot/payable/payable-closed-order/pageQuery',method:'post'},//分页查询（author:lmy
      closed_check:{url:'/eop-boot/payable/payable-closed-order/check',method:'post'},//校验（author:lmy
      closed_doBizService:{url:'/eop-boot/payable/payable-closed-order/doBizService',method:'post'},//操作按钮（author:lmy
      payable_payable_closed_order_getDetailByClosedNo:{url:'/eop-boot/payable/payable-closed-order/getDetailByClosedNo',method:'post'},//明细获取
      payable_payable_closed_order_createCloseDetail:{url:'/eop-boot/payable/payable-closed-order/createCloseDetail',method:'post'},
      //销售出库
      bizStockOut_page:{url:'/eop-boot/stocks/bizStockOut/page',method:'post'},               //销售出库主表(石明科)
      bizStockOut_Detail_page:{url:'/eop-boot/stocks/bizStockOut/Detail/page',method:'post'},//销售出库子表明细查询(石明科)
      bizStockOut_detail_page:{url:'/eop-boot/stocks/bizStockOut/detail/page',method:'post'},//销售出库子表明细查询(石明科)(石明科)
      //采购入库
      bizStockIn_page:{url:'/eop-boot/stocks/bizStockIn/page',method:'post'},//入库主表查询(石明科)
      bizStockIn_detail_page:{url:'/eop-boot/stocks/bizStockIn/detail/page',method:'post'},//入库子表明细查询(石明科)
      bizStockIn_add:{url:'/eop-boot/payable/settlementOrder/add',method:'post'},//结算明细
      bizStockIn_addCheck:{url:'/eop-boot/payable/settlementOrder/addCheck',method:'post'},//生成结算明细校验

      //应付管理启用时间
      basic_pageQuery:{url:'/eop-boot/basic/activeTime/pageQuery',method:'post'},//分页查询
      basic_addBatch:{url:'/eop-boot/basic/activeTime/addBatch',method:'post'},//新增

      //延期配置
      payableDelayConfig_selectAll:{url:'/eop-boot/masterData/payableDelayConfig/selectAll',method:'post'},//查询
      payableDelayConfig_update:{url:'/eop-boot/masterData/payableDelayConfig/update',method:'post'},//更新
      payableDelayConfig_add:{url:'/eop-boot/masterData/payableDelayConfig/add',method:'post'},//新增

      //历史库存
      historyCoreStock_page:{url:'/eop-boot/core/historyCoreStock/page',method:'post'},//历史库存(许克胜)

      //成本调整单
      adjustment_page:{url:'/eop-boot/core/adjustment/cost/page',method:'post'},//成本调价单-分页列表
      adjustment_coreCostSelector:{url:'/eop-boot/core/coreCostSelector',method:'post'},//商家编码-实时成本下拉接口
      adjustment_addCost:{url:'/eop-boot/core/adjustment/addCost',method:'post'},//成本调价单-新增
      adjustment_details:{url:'/eop-boot/core/adjustment/details',method:'post'},//成本调价单明细
      adjustment_updateCost:{url:'/eop-boot/core/adjustment/updateCost',method:'post'},//成本调价单-修改
      adjustment_reviewCost:{url:'/eop-boot/core/adjustment/reviewCost',method:'post'},//成本调整单-审核 /取消
      
      //库存盘点单
      adjustment_stock_page:{url:'/eop-boot/core/adjustment/stock/page',method:'post'},//库存盘点单主数据分页查询
      adjustment_stock_getDetails:{url:'/eop-boot/core/adjustment/stock/getDetails',method:'post'},//库存盘点单对应货品明细查询
      adjustment_stock_saveStockAdjust:{url:'/eop-boot/core/adjustment/saveStockAdjust',method:'post'},//新增库存盘点单
      adjustment_stock_selectGood:{url:'/eop-boot/core/adjustment/selectGood',method:'post'},//根据商家编码查询货品信息
      adjustment_stock_queryStockDateByBusDate:{url:'/eop-boot/core/adjustment/queryStockDateByBusDate',method:'post'},//根据业务日期查询库存帐期
      adjustment_stock_getDetails:{url:'/eop-boot/core/adjustment/stock/getDetails',method:'post'},//库存盘点单对应货品明细查询
      adjustment_stock_checkStockAdjust:{url:'/eop-boot/core/adjustment/checkStockAdjust',method:'post'},//库存盘点单审核
      adjustment_stock_cancelStockAdjustment:{url:'/eop-boot/core/adjustment/cancelStockAdjustment',method:'post'},//库存盘点单取消
      adjustment_stock_updateGoods:{url:'/eop-boot/core/adjustment/updateGoods',method:'post'},//修改库存盘点单明 细
       //调拨出库
       stocks_bizStockOut_page:{url:'/eop-boot/stocks/bizStockOut/page',               method:'post'},//出库主表(石明科)
       stocks_bizStockOut_detail_page:{url:'/eop-boot/stocks/bizStockOut/detail/page', method:'post'},//出库子表明细查询(石明科)
       stocks_bizStockIn_page     :{url:'/eop-boot/stocks/bizStockIn/page',                 method:'post' },//入库主表查询(石明科)
       stocks_bizStockIn_detail_page:{url:'/eop-boot/stocks/bizStockIn/detail/page',         method:'post' },//入库子表明细查询(石明科)
      //  无单退货
      core_bizStockIn_noBillsRefund_page:{url:'/eop-boot/core/bizStockIn/noBillsRefund/page',         method:'post' },//无单退货主数据分页查询
      core_bizStockIn_noBillsRefund_getDetails:{url:'/eop-boot/core/bizStockIn/noBillsRefund/getDetails',method:'post' },//根据入库单id查询无单退货明细
      //调拨订单
      stocks_bizTransferOrder_page:{url:'/eop-boot/stocks/bizTransferOrder/page',method:'post'},//调拨订单主表
      stocks_bizTransferOrder_detail_page:{url:'/eop-boot/stocks/bizTransferOrder/detail/page',method:'post'},//调拨订单子表
       
      // 扣款折扣
      masterData_deductionDiscount_pageQuery:{url:'/eop-boot/masterData/deductionDiscount/pageQuery',method:'post'},//查询
      masterData_deductionDiscount_add   :{url:'/eop-boot/masterData/deductionDiscount/add',         method:'post'},//新增
      masterData_deductionDiscount_update:{url:'/eop-boot/masterData/deductionDiscount/update', method:'post'},//更新
      masterData_deductionDiscount_delete:{url:'/eop-boot/masterData/deductionDiscount/delete', method:'post'},//删除
      masterData_deductionDiscount_uploadAsync:{url:'/eop-boot/masterData/deductionDiscount/uploadAsync', method:'post'},//异步导入文件
 
      //成本折扣
      //返单记录
      returnRecord_page:{url:'/eop-boot/stocks/returnRecord/page',method:'post'},//查询
      stocks_returnRecord_exportAsync:{url:'/eop-boot/stocks/returnRecord/exportAsync',method:'post'},

      //成本减值率表
      discount_page:{url:'/eop-boot/discount/cost/page',method:'post'},//查询
      discount_cost_exportAsync:{url:'/eop-boot/discount/cost/exportAsync',method:'post'},//导出

      //改标记录
      markchange_page:{url:'/eop-boot/markchange/markChangeRecord/page',method:'post'},//查询
      markchange_delete:{url:'/eop-boot/markchange/markChangeRecord/delete',method:'post'},//批量删除
      markchange_update:{url:'/eop-boot/markchange/markChangeRecord/update',method:'post'},//编辑
      markchange_uploadAsync:{url:'/eop-boot/markchange/markChangeRecord/uploadAsync',method:'post'},//异步导入改标记录文件
      markchange_exportAsync:{url:'/eop-boot/markchange/markChangeRecord/exportAsync',method:'post'},//异步导出改标记录文件
      discount_markChangeProcessProject:{url:'/eop-boot/discount/markChangeProcessProject/query',method:'post'},//项目列表查询
      discount_markChangeProcessType:{url:'/eop-boot/discount/markChangeProcessType/query',method:'post'},//类型列表查询
      //改标加工类型
      discount_markChangeProcessType_query_page:{url:'/eop-boot/discount/markChangeProcessType/query/page',method:'post'},//改标加工类型分页列表查询
      discount_markChangeProcessType_add:{url:'/eop-boot/discount/markChangeProcessType/add',method:'post'},//新增
      discount_markChangeProcessType_update:{url:'/eop-boot/discount/markChangeProcessType/update',method:'post'},//修改
      discount_markChangeProcessType_delete:{url:'/eop-boot/discount/markChangeProcessType/delete',method:'post'},//删除

      //改标加工项目
      discount_markChangeProcessProject_query_page:{url:'/eop-boot/discount/markChangeProcessProject/query/page',method:'post'},//改标加工项目分页列表查询
      discount_markChangeProcessProject_add:{url:'/eop-boot/discount/markChangeProcessProject/add',method:'post'},//改标加工项目新增
      discount_markChangeProcessProject_update:{url:'/eop-boot/discount/markChangeProcessProject/update',method:'post'},//改标加工项目修改
      discount_markChangeProcessProject_delete:{url:'/eop-boot/discount/markChangeProcessProject/delete',method:'post'},//改标加工项目删除
      // 减值字典
      discount_dict_page:{url:'/eop-boot/discount/dict/page',method:'post'}, //减值字典-分页查询
      discount_dict_update:{url:'/eop-boot/discount/dict/update',method:'post'}, //减值字典-修改
      discount_dict_add:{url:'/eop-boot/discount/dict/add',method:'post'}, //减值字典-新增

      //付款登记
      payable_paymentRegistration_add:{url:'/eop-boot/payable/paymentRegistration/add',method:'post'},//新增
      payable_paymentRegistration_update:{url:'/eop-boot/payable/paymentRegistration/update',method:'post'},//更新
      payable_paymentRegistration_delete:{url:'/eop-boot/payable/paymentRegistration/delete',method:'post'},//删除
      payable_paymentRegistration_export:{url:'/eop-boot/payable/paymentRegistration/export',method:'post'},//导出
      payable_paymentRegistration_pageQuery:{url:'/eop-boot/payable/paymentRegistration/pageQuery',method:'post'},//查询
      payable_paymentRegistration_import:{url:'/eop-boot/payable/paymentRegistration/import',method:'post'},//导入

      //到票登记
      payable_billArrivalRegistration_page:{url:'/eop-boot/payable/billArrivalRegistration/page',method:'post'},//查询
      payable_billArrivalRegistration_add:{url:'/eop-boot/payable/billArrivalRegistration/add', method:'post'},//新增
      payable_billArrivalRegistration_update:{url:'/eop-boot/payable/billArrivalRegistration/update', method:'post'},//更新
      payable_billArrivalRegistration_delete:{url:'/eop-boot/payable/billArrivalRegistration/delete', method:'post'},//删除
      payable_billArrivalRegistration_uploadAsync:{url:'/eop-boot/payable/billArrivalRegistration/uploadAsync', method:'post'},//导入
      payable_billArrivalRegistration_exportAsync:{url:'/eop-boot/payable/billArrivalRegistration/exportAsync', method:'post'},//导出

      //导出项目
      payable_reconciliationOrder_exportCount:{url:'/eop-boot/payable/reconciliationOrder/exportCount', method:'post'},//对账单统计
      payable_deductionOrder_count:{url:'/eop-boot/payable/deductionOrder/count', method:'post'},//扣款单统计
      payable_deductionAdvice_count:{url:'/eop-boot/payable/deductionAdvice/count', method:'post'},//扣款建议统计
      payable_deductionAdvice_exportAsync:{url:'/eop-boot/payable/deductionAdvice/exportAsync', method:'post'},//扣款建议导出
      payable_deductionOrder_exportAsync:{url:'/eop-boot/payable/deductionOrder/exportAsync', method:'post'},//扣款单导出
      payable_bizpurchaseorder_exportCount:{url:'/eop-boot/payable/biz-purchase-order/exportCount', method:'post'},//采购订单统计
      payable_bizpurchaseorder_export:{url:'/eop-boot/payable/biz-purchase-order/export', method:'post'},//采购订单导出

      payable_settlementOrder_preExportCount:{url:'/eop-boot/payable/settlementOrder/preExportCount',  method:'post'},  //异步导出前总条数提示(zhuzhixian)
      payable_settlementOrder_exportAsync:{url:'/eop-boot/payable/settlementOrder/exportAsync',method:'post'},//列表异步导出(zhuzhixian)
      stocks_bizStockIn_getExportCount:{url:'/eop-boot/stocks/bizStockIn/getExportCount',method:'post'},     //采购入库-导出条数查询(石明科)
      stocks_bizStockIn_exportAsync:{url:'/eop-boot/stocks/bizStockIn/exportAsync',method:'post'},           //采购入库-导出(石明科)
      payable_payableclosedorder_exportAsync:{url:'/eop-boot/payable/payable-closed-order/exportAsync',method:'post'},//关单登记导出
      payable_payableclosedorder_exportCount:{url:'/eop-boot/payable/payable-closed-order/exportCount',method:'post'},//关单登记导出

      //面料开发
      basicMeasureUnit_queryAll:{url:'/eop-boot/masterData/basicMeasureUnit/queryAll', method:'get'},//获取所有计量单位信息
      basicMeasureUnit_syncMeasureUnit:{url:'/eop-boot/masterData/basicMeasureUnit/syncMeasureUnit', method:'get'},//计量单位同步
      color_syncColor:{url:'/eop-boot/masterData/color/syncColor', method:'post'},//同步色号颜色SCM➡FMS接口
      color_page:{url:'/eop-boot/masterData/color/page', method:'post'},//分页查询颜色档案接口
      color_selector:{url:'/eop-boot/masterData/color/selector', method:'post'},//色系下拉接口
      materialType_type:{url:'/eop-boot/masterData/materialType/page', method:'post'},//物料类型-列表筛选
      materialType_sync:{url:'/eop-boot/masterData/materialType/sync', method:'post'},//物料类型-同步
      materialType_selector:{url:'/eop-boot/masterData/materialType/selector', method:'post'},//物料类型-下拉
      
      fabric_developCycle_select:{url:'/eop-boot/fabric/developCycle/select',method:'post'},//开发周期-列表筛选
      fabric_developCycle_uploadAsync:{url:'/eop-boot/fabric/developCycle/uploadAsync',method:'post'},//开发周期-异步导入
      fabric_developCycle_update:{url:'/eop-boot/fabric/developCycle/update',method:'post'},//开发周期-修改
      fabricDevelop_configurationPlan_selector:{url:'/eop-boot/fabricDevelop/configurationPlan/selector',method:'post'},//配置方案下拉接口
      fabricDevelop_taskConfiguration_getTaskConfigurationList:{url:'/eop-boot/fabricDevelop/taskConfiguration/getTaskConfigurationList',method:'post'},//查询任务配置信息接口
      fabricDevelop_taskConfiguration_saveOrUpdate:{url:'/eop-boot/fabricDevelop/taskConfiguration/saveOrUpdate',method:'post'},
      masterData_staff_getStaffByParam:{url:'/eop-boot/masterData/staff/getStaffByParam',method:'post'},//获取人员下拉选项-根据名称模糊搜索
      masterData_staff_singleSelector:{url:'/eop-boot/masterData/staff/singleSelector',method:'post'},//获取人员下拉选项
      masterData_staff_getDepartmentByCode:{url:'/eop-boot/masterData/staff/getDepartmentByCode',method:'post'},//根据员工号获取部门信息
      fabricDevelop_taskConfiguration_deleteByIdList:{url:'/eop-boot/fabricDevelop/taskConfiguration/deleteByIdList',method:'post'},//根据任务配置id删除任务配置信息
      fabric_developMaterialEnter_detail:{url:'/eop-boot/fabric/developMaterialEnter/detail',method:'post'},//录入面料任务-明细

      uploadImg:{url:'/eop-boot/masterData/ossFileAddress/upload',method:'post'},//文件上传
      fabric_developMaterialEnter_submit:{url:'/eop-boot/fabric/developMaterialEnter/submit',method:'post'},//录入面料任务-提交任务
      fabric_fabricTaskDetail_dingding:{url:'/eop-boot/fabric/fabricTaskDetail/dingding',method:'post'},//（待完成）面料开发流程列表接口
      fabric_fabricTaskDetail_page:{url:'/eop-boot/fabric/fabricTaskDetail/page',method:'post'},//（进行中，已完成）面料开发流程列表接口
      queryProcessStatus:{url:'/eop-boot/fabric/fabric-develop-initiate/queryProcessStatus',method:'post'},//查询任务流状态列表
      queryProcess_page:{url:'/eop-boot/fabric/fabric-develop-initiate/page',method:'post'},//查询发起流程列表
      report_queryReport:{url:'/eop-boot/fabric/report/queryReport',method:'post'},//报表主表查询
      report_queryReportDetail:{url:'/eop-boot/fabric/report/queryReportDetail',method:'post'},//报表附表查询
      fabric_fabric_develop_pricing_queryPricingDetail:{url:'/eop-boot/fabric/fabric-develop-pricing/queryPricingDetail',method:'post'},//查询核价详情
      fabric_developMaterialEnter_inProgress:{url:'/eop-boot/fabric/developMaterialEnter/inProgress',method:'post'},//改变任务状态

      fabricDevelop_poEnter_detail:{url:'/eop-boot/fabricDevelop/poEnter/detail',method:'post'},//查询采购信息详情
      fabricDevelop_poEnter_enterPurchaseDetail:{url:'/eop-boot/fabricDevelop/poEnter/enterPurchaseDetail',method:'post'},//采购提交接口
      masterData_basicMeasureUnit_pullDown:{url:'/eop-boot/masterData/basicMeasureUnit/pullDown',method:'get'},//计量单位
      fabricDevelop_poEnter_revoke:{url:'/eop-boot/fabricDevelop/poEnter/revoke',method:'post'},//撤回

      getListByTaskConfigurationId:{url:'/eop-boot/fabricDevelop/taskStaffMapping/getListByTaskConfigurationId',method:'post'},//根据任务配置id查询人员信息
      queryNextId:{url:'/eop-boot/fabric/fabric-develop-initiate/queryNextId',method:'post'},//查询任务发起下一级任务id
      add_fabric:{url:'/eop-boot/fabric/fabric-develop-initiate/add',method:'post'},//面料开发发起流程
      cancelCheck_fabric:{url:'/eop-boot/fabric/fabric-develop-initiate/cancelCheck',method:'post'},//取消流程校验
      cancel_fabric:{url:'/eop-boot/fabric/fabric-develop-initiate/cancel',method:'post'},//取消流程
      queryConfirmTask:{url:'/eop-boot/fabric/developConfirm/queryConfirmTask',method:'post'},//开发确认任务详情查看
      deliverConfirmTask:{url:'/eop-boot/fabric/developConfirm/deliverConfirmTask',method:'post'},//开发确认任务转交
      inspectConfirmTask:{url:'/eop-boot/fabric/developConfirm/inspectConfirmTask',method:'post'},//开发确认任务送检
      retraceConfirmTask:{url:'/eop-boot/fabric/developConfirm/retraceConfirmTask',method:'post'},//开发确认任务回撤

      //检测
      fabricDevelopCheck_verfiy:{url:'/eop-boot/fabric/fabricDevelopCheck/verify',method:'post'},//检测任务-合格与不合格
      fabricDevelopCheck_revoke:{url:'/eop-boot/fabric/fabricDevelopCheck/revoke',method:'post'},//检测任务-撤回
      fabricDevelopCheck_detail:{url:'/eop-boot/fabric/fabricDevelopCheck/detail',method:'post'},//检测任务-详情

      //核价
      pricing_revoke:{url:'/eop-boot/fabric/fabric-develop-pricing/revoke',method:'post'},//核价任务撤回
      pricing_submit:{url:'/eop-boot/fabric/fabric-develop-pricing/pricing',method:'post'},//核价结果提交
      queryPricingDetail:{url:'/eop-boot/fabric/fabric-develop-pricing/queryPricingDetail',method:'post'},//查询核价详情
      fabric_developMaterialEnter_revokeTask:{url:'/eop-boot/fabric/developMaterialEnter/revokeTask',method:'post'},//面料回退
      pricing_conform:{url:'/eop-boot/fabric/fabric-develop-pricing/conform',method:'post'},//发起人确认任务-确认
};
export default methodMap; 
//   /business/get_develop_simple,
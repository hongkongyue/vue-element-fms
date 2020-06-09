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
      supplier_add:{url:'/eop-boot/masterData/supplier/add',method:'post'},//供应商新增（author:张明杰
      supplier_update:{url:'/eop-boot/masterData/supplier/update',method:'post'},//供应商修改（author:张明杰
      supplier_constant:{url:'/eop-boot/masterData/supplier/constant',method:'post'},//供应商页面下拉（author:张明杰
      supplier_multipleSelector:{url:'/eop-boot/masterData/staff/multipleSelector',method:'post'},//生产理单员（author:张明杰
      supplier_getPagingByBillNo:{url:'/eop-boot/billLog/getPagingByBillNo',method:'post'},//供应商日志（author:张明杰
      supplier_provinceSelector:{url:'/eop-boot/masterData/district/provinceSelector',method:'post'},//省份下拉（author:张明杰
      supplier_citySelector:{url:'/eop-boot/masterData/district/citySelector',method:'post'},//根据 省份查询城市（author:张明杰
      supplier_sync:{url:'/eop-boot//masterData/supplier/sync',method:'post'},//同步供应商数据（author:张明杰
      supplier_selector:{url:'/eop-boot/masterData/supplier/selector',method:'post'},//供应商下拉接口（author:lxx
      supplier_selectorPayable:{url:'/eop-boot/masterData/supplier/selectorPayable',method:'post'},//供应商对账人员下拉
      selectorPayableSupplier:{url:'/eop-boot/masterData/supplier/selectorPayableSupplier/${vars.payableUserId}',method:'post'},//供应商对账人员所拥有供应商下拉

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

      //商品详情
      masterData_sys_s_page :  {url:'/eop-boot/masterData/sys-spu/page',            method:'post'},  //商品分页查询
      masterData_warehouse_booleanWareHouse:{url:'/eop-boot/masterData/warehouse/booleanWareHouse',method:'post'}, //仓库编码校验

      //实时库存
      core_realCoreStock_page:{url:'/eop-boot/core/realCoreStock/page',            method:'post'},//实时库存(许克胜)
      core_core_export       :{url:'/eop-boot/core/export',                        method:'post'},//实时库存或历史库存导出（许克胜）


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

      //供应商权限-岗位
      basic_supplier_position_selector:{url:'/eop-boot/basicsupplierposition/basic-supplier-position/selector',method:'post'},
      basic_supplier_position_page_query:{url:'/eop-boot/basicsupplierposition/basic-supplier-position/pageQuery',method:'post'},
      basic_supplier_position_update:{url:'/eop-boot/basicsupplierposition/basic-supplier-position/update',method:'post'},
      basic_supplier_position_add:{url:'/eop-boot/basicsupplierposition/basic-supplier-position/add',method:'post'},

      //供应商权限-人员
      basic_supplier_staff_add:{url:'/eop-boot/basicsupplierstaff/basic-supplier-staff/add',method:'post'},
      basic_supplier_staff_update:{url:'/eop-boot/basicsupplierstaff/basic-supplier-staff/update',method:'post'},
      basic_supplier_staff_page_query:{url:'/eop-boot/basicsupplierstaff/basic-supplier-staff/pageQuery',method:'post'},
      basic_supplier_staff_export:{url:'/eop-boot/basicsupplierstaff/basic-supplier-staff/export',method:'post'},
      basic_supplier_staff_selector:{url:'/eop-boot/basicsupplierstaff/basic-supplier-staff/selector',method:'post'},
      masterData_supplier_selectFunction:{url:'/eop-boot/masterData/supplier/selectFunction',method:'post'},
      masterData_supplier_addFunctions:{url:'/eop-boot/masterData/supplier/addFunctions',method:'post'},//选 未勾选所有功能配置提交
      //供应商权限-资源管理
      basic_supplier_menu_get_resource_permission_tree:{url:'/eop-boot/basicsuppliermenupermission/basic-supplier-menu-permission/getResourcePermissionTree',method:'post'},//资源列表
      basic_supplier_menu_permission_add:{url:'/eop-boot/basicsuppliermenupermission/basic-supplier-menu-permission/add',method:'post'},//资源新增
      basic_supplier_menu_permission_update:{url:'/eop-boot/basicsuppliermenupermission/basic-supplier-menu-permission/update',method:'post'},//资源修改
      basic_supplier_menu_permission_get_whole_resource_tree:{url:'/eop-boot/basicsuppliermenupermission/basic-supplier-menu-permission/getWholeResourceTree/${vars.isContainBtn}',method:'post'},//上级菜单
      basic_supplier_menu_permission_del:{url:'/eop-boot/basicsuppliermenupermission/basic-supplier-menu-permission/del/${vars.id}',method:'post'},//资源删除


    //系统自动生成业务编码
      auto_create_biz_code:{url:'/eop-boot/autoCreateCode/getCode',method:'post'}, //liuxx 入参：（”编码前缀“,编码后续数字长度）


      //供应商角色
      basicsupplierrole_basic_supplier_role_selector:{url:'/eop-boot/basicsupplierrole/basic-supplier-role/selector',method:'post'},//下拉
      basicsupplierrole_basic_supplier_role_page:{url:'/eop-boot/basicsupplierrole/basic-supplier-role/page',method:'post'},//分页
      autoCreateCode_getCode:{url:'/eop-boot/autoCreateCode/getCode',method:'post'},//系统自动生成对应编码
      basicsuppliermenupermission_basic_supplier_menu_permission_getWholeResourceTree:{url:'/eop-boot/basicsuppliermenupermission/basic-supplier-menu-permission/getWholeResourceTree/${vars.isContainBtn}',method:'post'},
      basicsupplierrol_basic_supplier_role_add:{url:'/eop-boot/basicsupplierrole/basic-supplier-role/add',method:'post'},//角色新增
      basicsupplierstaff_basic_supplier_staf_selector:{url:'/eop-boot/basicsupplierstaff/basic-supplier-staff/selector',method:'post'},//下拉
      basicsupplierrole_basic_supplier_role_getPermissionOfCurrentRole:{url:'/eop-boot/basicsupplierrole/basic-supplier-role/getPermissionOfCurrentRole/${vars.id}',method:'post'},//下拉
      basicsupplierrole_basic_supplier_role_getUserOfCurrentRole:{url:'/eop-boot/basicsupplierrole/basic-supplier-role/getUserOfCurrentRole/${vars.id}',method:'post'},//下拉
      basicsupplieruser_basi_supplier_user_selector:{url:'/eop-boot/basicsupplieruser/basic-supplier-user/selector',   method:'post'},//用户下拉
      basicsupplierrole_basic_supplier_role_update:{url:'/eop-boot/basicsupplierrole/basic-supplier-role/update',      method:'post'},//角色更新
      basicsupplieruser_basic_supplier_user_pageQuery:{url:'/eop-boot/basicsupplieruser/basic-supplier-user/pageQuery',method:'post'},//根据userCode
      // basicsupplieruser_basic_supplier_user_pageQuery:{url:'/eop-boot/basicsupplieruser/basic-supplier-user/pageQuery',method:'post'},//分页

      //用户
      basicsupplierposition_basic_supplier_position_selector:{url:'/eop-boot/basicsupplierposition/basic-supplier-position/selector', method:'post'},//岗位下拉
      basicsupplieruser_basic_supplier_user_selector:{url:'/eop-boot/basicsupplieruser/basic-supplier-user/selector',method:'post'},// 人员下拉
      basicsupplierstaff1_basic_supplie_staff_selector:{url:'/eop-boot/basicsupplierstaff/basic-supplier-staff/selector',method:'post'},//人员下拉
      // basicsupplieruser_basic_supplier_user_pageQuery:{url:'/eop-boot/basicsupplieruser/basic-supplier-user/pageQuery',method:'post'},//分页查询
      basicsupplierrole_basic_supplier_rol_selector:{url:'/eop-boot/basicsupplierrole/basic-supplier-role/selector',method:'post'},//角色下拉

      basicsupplieruser_basic_supplier_user_update:{url:'/eop-boot/basicsupplieruser/basic-supplier-user/update',method:'post'},//用户更新
    
      basicsupplieruser_basic_supplier_user_getRoleByCurrentUser:{url:'/eop-boot/basicsupplieruser/basic-supplier-user/getRoleByCurrentUser/${vars.id}',method:'post'},//下拉
      basicsupplieruser_basic_supplier_user_getPermissionByCurrentUser:{url:'/eop-boot/basicsupplieruser/basic-supplier-user/getPermissionByCurrentUser/${vars.id}',method:'post'},//当前用户的所有权限
      basicsupplieruser_basic_supplier_user_reBuildPwd:{url:'/eop-boot/basicsupplieruser/basic-supplier-user/reBuildPwd/${vars.id}',method:'post'},//当前用户的所有权限
      basicsupplieruser_basic_supplier_user_unLock:   {url:'/eop-boot/basicsupplieruser/basic-supplier-user/unLock/${vars.id}',method:'post'},//当前用户的所有权限
      basicsupplieruser_basic_supplier_user_unBindWx:{url:'/eop-boot/basicsupplieruser/basic-supplier-user/unBindWx/${vars.id}',method:'post'},//
      basicsupplieruser_basic_supplier_user_add:{url:'/eop-boot/basicsupplieruser/basic-supplier-user/add',method:'post'},//新增

      //问题反馈数据
      biz_supplier_feedback_pageQuery:{url:'/eop-boot/basicsupplier/feedback/pageQuery',method:'post'},//查询
      feedback_update:{url:'/eop-boot/basicsupplier/feedback/update',method:'post'},//确认问题

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
      report_downloadXlsx:{url:'/eop-boot/fabric/report/downloadXlsx',method:'post'},//报表导出
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
      specialPricingDetail:{url:'/eop-boot/fabric/fabric-develop-pricing/specialPricingDetail',method:'post'},//查询核价详情2
      //任务配置
      configuration_list:{url:'/eop-boot/fms-supplier/configuration/list',method:'post'},//任务配置-列表
      configuration_changeStatus:{url:'/eop-boot/fms-supplier/configuration/changeStatus',method:'post'},//任务配置-修改任务状态
      configuration_insertOrUpdate:{url:'/eop-boot/fms-supplier/configuration/insertOrUpdate',method:'post'},//任务配置-新增或修改
      configurationPlan_selector:{url:'/eop-boot/fabricDevelop/configurationPlan/selector',method:'post'},//配置方案下拉接口
      configurationPlan_detail:{url:'/eop-boot/fms-supplier/configuration/detail',method:'post'},//任务配置-详情

      //应付二期

      //支付方式配置
      basicpayablepayway_getAll:{url:'/eop-boot/masterdata/basicpayablepayway/getAll',method:'post'},//查询列表
      basicpayablepayway_add:{url:'/eop-boot/masterdata/basicpayablepayway/add',method:'post'},//新增
      basicpayablepayway_update:{url:'/eop-boot/masterdata/basicpayablepayway/update',method:'post'},//编辑

      basicpayablepayway_delete:{url:'/eop-boot/masterdata/basicpayablepayway/delete/${vars.id}',method:'post'},//删除

      //合格证洗唛打印
      washlabel_page:{url:'/eop-boot/washlabel/manage/page',method:'post'},//查询列表
      washlabel_getDetailByQo:{url:'/eop-boot/washlabel/manage/getDetailByQo',method:'post'},//查询列表
      washlabel_submit:{url:'/eop-boot/washlabel/manage/submit',method:'post'},//提交任务
      washlabel_finish:{url:'/eop-boot/washlabel/manage/finish',method:'post'},//完成任务
      washlabel_print:{url:'/eop-boot/washlabel/manage/print',method:'post'},//全部打印
      washlabel_brandSelector:{url:'/eop-boot/masterData/goodsManager/brandSelector',method:'post'},//品牌下拉-lxx
      washlabel_checkGoodsNoExist:{url:'/eop-boot/masterData/goodsManager/checkGoodsNoExist',method:'post'},//校验大货编码是否存在-lxx
      washlabel_getSizeByGoodsNoAndColor:{url:'/eop-boot/masterData/goodsManager/getSizeByGoodsNoAndColor',method:'post'},//校验大货编码是否存在-lxx
      washlabel_getCode:{url:'/eop-boot/autoCreateCode/getCode',method:'post'},//自动编码获取
      washlabel_createTask:{url:'/eop-boot/washlabel/manage/createTask',method:'post'},//新增打印申请
      washlabel_updateTask:{url:'/eop-boot/washlabel/manage/updateTask',method:'post'},//更新打印申请
      washlabel_getMainOrderById:{url:'/eop-boot/washlabel/manage/getMainOrderById',method:'post'},//获取主单数据
      washlabel_reprint:{url:'/eop-boot/washlabel/manage/reprint',method:'post'},//合格证或洗唛部分打印(补打)-朱智贤
      washlabel_refreshData:{url:'/eop-boot/washlabel/manage/refreshData',method:'post'},//刷新子表数据
      washlabel_changeReprintNum:{url:'/eop-boot/washlabel/manage/changeReprintNum',method:'post'},//修改补打数-朱智贤
      washlabel_importTask:{url:'/eop-boot/washlabel/manage/importTask',method:'post'},//导入任务
      washlabel_rejectTask:{url:'/eop-boot/washlabel/manage/rejectTask/${vars.id}',method:'post'},//变更任务-朱智贤

      //boss一期主数据
      year_sync:{url:'/eop-boot/masterData/year/sync',method:'post'},//同步scm年份信息
      year_page:{url:'/eop-boot/masterData/year/page',method:'post'},//查询年份列表
      season_sync:{url:'/eop-boot/masterData/season/sync',method:'post'},//同步scm季节信息
      season_page:{url:'/eop-boot/masterData/season/page',method:'post'},//查询季节列表
      basicDevelopType_page:{url:'/eop-boot/masterData/basicDevelopType/page',method:'post'},//开发类型分页条件查询
      basicDevelopType_addOrUpdate:{url:'/eop-boot/masterData/basicDevelopType/addOrUpdate',method:'post'},//开发类型新增or编辑
      waveBand_page:{url:'/eop-boot/masterData/waveBand/page',method:'post'},//波段列表筛选
      waveBand_sync:{url:'/eop-boot/masterData/waveBand/sync',method:'post'},//波段同步
      waveBand_selector:{url:'/eop-boot/masterData/basicDevelopType/selector',method:'post'},//开发类型下拉
      waveBand_update:{url:'/eop-boot/masterData/waveBand/update',method:'post'},//波段编辑
      basicStyleType_sync:{url:'/eop-boot/masterData/basicStyleType/sync',method:'post'},//款式类型同步
      basicStyleType_pageQuery:{url:'/eop-boot/masterData/basicStyleType/pageQuery',method:'post'},//款式类型查询
      basicStyleType_getStyleTree:{url:'/eop-boot/masterData/basicStyleType/getStyleTree',method:'post'},//款式类型树形列表获取
      basicStyleType_getAllSelector:{url:'/eop-boot/masterData/basicStyleType/getAllSelector',method:'post'},//款式类型下拉获取

      //人员配置
      sendDingTalkConfig_userSelector:{url:'/eop-boot/boss/sendDingTalkConfig/userSelector',method:'post'},//接收人下拉
      sendDingTalkConfig_page:{url:'/eop-boot/boss/sendDingTalkConfig/page',method:'post'},//列表筛选
      sendDingTalkConfig_add:{url:'/eop-boot/boss/sendDingTalkConfig/add',method:'post'},//新增
      sendDingTalkConfig_update:{url:'/eop-boot/boss/sendDingTalkConfig/update',method:'post'},//编辑
      sendDingTalkConfig_delete:{url:'/eop-boot/boss/sendDingTalkConfig/delete',method:'post'},//删除
      //企划管理
      getByPuniqueKey:{url:'/eop-boot/masterData/basicStyleType/getByPuniqueKey',method:'post'},//查询品类下拉

      basicpayablepayway_delete:{url:'/eop-boot/masterdata/basicpayablepayway/delete',method:'post'},//删除

      // 应付单
      eop_boot_payable_page:{url:'/eop-boot/payable/page',method:'post'},  //应付单列表
      eop_boot_payable_audit:{url:'/eop-boot/payable/audit',method:'post'},//应付单审核
      eop_boot_payable_payable_unaudit:{url:'/eop-boot/payable/unaudit',method:'post'},//应付单反审核
      eop_boot_payable_detail:{url:'/eop-boot/payable/detail',method:'post'},         //应付单详情
      eop_boot_payable_exportTotal:{url:'/eop-boot/payable/exportTotal',method:'post'},//应付单导出条数查询
      eop_boot_payable_exportAsync:{url:'/eop-boot/payable/exportAsync',method:'post'},//应付单导出

      //应付核销记录
      accPayable_Verification_page:{url:'/eop-boot/accPayable/Verification/page',          method:'post'},          //应付核销记录
      accPayable_Verification_export:{url:'/eop-boot/accPayable/Verification/export',      method:'post'},          //应付核销-异步导出
      accPayable_Verification_pageCount:{url:'/eop-boot/accPayable/Verification/pageCount',method:'post'},          //统计
      //排款建议
      accPayable_dischargeAdvice_getSyncDate:{url:'/eop-boot/accPayable/dischargeAdvice/getSyncDate',method:'post'},//获得排款建议更新时间
      accPayable_dischargeAdvice_pageQuery:{url:'/eop-boot/accPayable/dischargeAdvice/pageQuery',  method:'post'},
      accPayable_dischargeAdvice_sync:{url:'/eop-boot/accPayable/dischargeAdvice/sync',  method:'post'}, //生成排款建议
      accPayable_dischargeAdvice_export:{url:'/eop-boot/accPayable/dischargeAdvice/export',method:'post'},//导出
      accPayable_dischargeAdvice_checkCanBeCreated:{url:'/eop-boot/accPayable/dischargeAdvice/checkCanBeCreated', method:'post'},//校验是否可生成排款单
      accPayable_dischargeAdvice_checkUnpaidFabricAmount:{url:'/eop-boot/accPayable/dischargeAdvice/checkUnpaidFabricAmount',method:'post'},//校验是否存在应付未付面料款金额不为0
      accPayable_dischargeAdvice_createAccPayableDischarge:{url:'/eop-boot/accPayable/dischargeAdvice/createAccPayableDischarge',method:'post'},//确认生成排款单
      //付款单
      acc_acc_payment_query_page:{url:'/eop-boot/acc/acc-payment/query/page',method:'post'},//分页查询列表
      acc_acc_payment_delete:{url:'/eop-boot/acc/acc-payment/delete',method:'post'},//删除付款单-支持批量
      acc_acc_payment_save:{url:'/eop-boot/acc/acc-payment/save',method:'post'},    //新增付款单
      acc_acc_payment_update:{url:'/eop-boot/acc/acc-payment/update',method:'post'},//编辑付款单
      masterdata_basicpayablepayway_selector:{url:'/eop-boot/masterdata/basicpayablepayway/selector', method:'post'},//支付方式下拉
      acc_acc_payment_uploadAsync:{url:'/eop-boot/acc/acc-payment/uploadAsync',method:'post'},//导入付款单
      acc_acc_payment_audit:{url:'/eop-boot/acc/acc-payment/audit',            method:'post'},//审核
      acc_acc_payment_cancelAudit:{url:'/eop-boot/acc/acc-payment/cancelAudit',method:'post'},//取消审核

      //开票建议
      advice_page:{url:'/eop-boot/accpayableinvoiceadvice/acc-payable-invoice-advice/pageQuery',method:'post'},  //分页查询
      advice_getDetail:{url:'/eop-boot/accpayableinvoiceadvice/acc-payable-invoice-advice/getDetail',method:'post'},  //明细获取
      advice_export:{url:'/eop-boot/accpayableinvoiceadvice/acc-payable-invoice-advice/export',method:'post'},  //导出

      //排款单
      acc_acc_payable_discharge_page:{url:'/eop-boot/acc/acc-payable-discharge/page',method:'post'},//分页查询排款单
      acc_acc_payable_discharge_export:{url:'/eop-boot/acc/acc-payable-discharge/export',method:'post'},//导出
      acc_acc_payable_discharge_detail:{url:'/eop-boot/acc/acc-payable-discharge/detail',method:'post'},//查询排款单明细
      acc_acc_payable_discharge_update:{url:'/eop-boot/acc/acc-payable-discharge/update',method:'post'},//编辑排款单
      acc_acc_payable_discharge_audit:{url:'/eop-boot/acc/acc-payable-discharge/audit',  method:'post'},//审核排款单
      acc_acc_payable_discharge_cancelAudit:{url:'/eop-boot/acc/acc-payable-discharge/cancelAudit',method:'post'},//取消审核排款单
      acc_acc_payable_discharge_close:{url:'/eop-boot/acc/acc-payable-discharge/close', method:'post'},//关闭排款单
      acc_acc_payable_discharge_delete:{url:'/eop-boot/acc/acc-payable-discharge/delete',method:'post'},//删除排款单
      acc_acc_payable_discharge_exportTotal:{url:'/eop-boot/acc/acc-payable-discharge/exportTotal',method:'post'},//导出排款单总数
      acc_acc_payable_discharge_checkCanAudit:{url:'/eop-boot/acc/acc-payable-discharge/checkCanAudit',method:'post'},//审核校验是否存在应付未付面料款金额>0
      
      //发票登记
      accPayable_invoiceRegister_page:{url:'/eop-boot/accPayable/invoiceRegister/page',method:'post'},//发票登记主单查询
      accPayable_invoiceRegisterDetail_queryDetail:{url:'/eop-boot/accPayable/invoiceRegisterDetail/queryDetail',method:'post'},//发票登记子表查询
      accPayable_invoiceRegister_add:{url:'/eop-boot/accPayable/invoiceRegister/add',method:'post'},//生成发票登记
      accPayable_invoiceRegister_update:{url:'/eop-boot/accPayable/invoiceRegister/update',method:'post'},//编辑
      accPayable_invoiceRegister_examine:{url:'/eop-boot/accPayable/invoiceRegister/examine',method:'post'},//审核
      accPayable_invoiceRegister_cancelExamine:{url:'/eop-boot/accPayable/invoiceRegister/cancelExamine',method:'post'},//取消审核
      accPayable_invoiceRegister_deleted:{url:'/eop-boot/accPayable/invoiceRegister/deleted',method:'post'},//删除
      accPayable_invoiceRegister_settle:{url:'/eop-boot/accPayable/invoiceRegister/settle',method:'post'},//立账
      accPayable_invoiceRegister_cancelSettle:{url:'/eop-boot/accPayable/invoiceRegister/cancelSettle',method:'post'},//取消立账
      accPayable_invoiceRegister_export:{url:'/eop-boot/accPayable/invoiceRegister/export',method:'post'},//发票登记导出

      supplier_allSelector:{url:'/eop-boot/masterData/supplier/allSelector',method:'post'},//供应商下拉接口

      //企划管理
      year_list:{url:'/eop-boot/masterData/year/list',method:'post'},//年份下拉
      tree_statusCount:{url:'/eop-boot/boss/goods_planning_manage/statusCount',method:'post'},//企划管理查询树结构
      goods_planning_manage_query:{url:'/eop-boot/boss/goods_planning_manage/query',method:'post'},//分页查询企划管理
      goods_planning_manage_detail:{url:'/eop-boot/boss/goods_planning_manage/detail',method:'post'},//查询企划管理明细
      goods_planning_manage_add:{url:'/eop-boot/boss/goods_planning_manage/add',method:'post'},//新增企划管理
      goods_planning_manage_edit:{url:'/eop-boot/boss/goods_planning_manage/edit',method:'post'},//编辑企划管理
      goods_planning_manage_command:{url:'/eop-boot/boss/goods_planning_manage/command',method:'post'},//审核/取消审核
      goods_planning_manage_close:{url:'/eop-boot/boss/goods_planning_manage/close',method:'post'},//关闭
      goods_planning_manage_startAgain:{url:'/eop-boot/boss/goods_planning_manage/startAgain',method:'post'},//重新启用-高璐
      goods_planning_manage_delete:{url:'/eop-boot/boss/goods_planning_manage/delete',method:'post'},//删除企划管理
      goods_planning_manage_send:{url:'/eop-boot/boss/goods_planning_manage/send',method:'post'},//推送-刘新星
      goods_planning_manage_uploadAsync:{url:'/eop-boot/boss/goods_planning_manage/uploadAsync',method:'post'},//导入-高璐
      goods_planning_manage_export:{url:'/eop-boot/boss/goods_planning_manage/export',method:'post'},//导出（详见查询参数）
      goods_planning_manage_exportCount:{url:'/eop-boot/boss/goods_planning_manage/exportCount',method:'post'},//导出前的统计（详见查询参数）
      goods_planning_manage_createAdjust:{url:'/eop-boot/boss/goods_planning_manage/createAdjust',method:'post'},//发起调整指令
      goods_planning_manage_createCheck:{url:'/eop-boot/boss/goods_planning_manage/createCheck',method:'post'},//新增企划校验品牌
      goods_planning_manage_versionSelector:{url:'/eop-boot/boss/goods_planning_manage/versionSelector',method:'post'},//查看历史-版本下拉-高璐
      goods_planning_manage_queryHistory:{url:'/eop-boot/boss/goods_planning_manage/queryHistory',method:'post'},//查看历史-高璐

      //企划调整
      queryForSimulation:{url:'/eop-boot/boss/bossGoodsPlanningAdujust/queryForSimulation',method:'post'},//查询(zzx)

      //波段下拉
      waveBand_selector_masterData:{url:'/eop-boot/masterData/waveBand/selector',        method:'post'},//下拉框（默认不传参）
      goods_planning_manage_constant:{url:'/eop-boot/boss/goods_planning_manage/constant',        method:'post'},//查询字典下拉数据

      //计费参数配置
      boss_delayCostConfig_page:{url:'/eop-boot/boss/delayCostConfig/page',               method:'post'},//分页查询
      boss_delayCostConfig_add :{url:'/eop-boot/boss/delayCostConfig/add',                method:'post'},//新增
      boss_delayCostConfig_update:{url:'/eop-boot/boss/delayCostConfig/update',           method:'post'},//修改
      boss_delayCostConfig_deleted:{url:'/eop-boot/boss/delayCostConfig/deleted',         method:'post'},//删除

      //根据任务状态、任务类型分页查询企划调整任务/调整审核任务列表-高璐
      boss_boss_adjust_task_page_query_adjust_task:{url:'/eop-boot/boss/boss_adjust_task/page_query_adjust_task',method:'post'},      //地址 企划调整任务/调整审核任务列表
      boss_boss_adjust_task_update_adjust_task_status:{url:'/eop-boot/boss/boss_adjust_task/update_adjust_task_status',method:'post'}, //更新企划调整/调整审核任务状态-高璐
      boss_boss_adjust_task_audit:{url:'/eop-boot/boss/boss_adjust_task/audit',method:'post'},//企划调整任务-审核
      boss_bossGoodsPlanningAdujust_queryAdhustDetail:{url:'/eop-boot/boss/bossGoodsPlanningAdujust/queryAdhustDetail',method:'post'},  //查询企划调整任务明细
      boss_bossGoodsPlanningAdujust_queryOriginDevelop:{url:'/eop-boot/boss/bossGoodsPlanningAdujust/queryOriginDevelop',method:'post'},//企划调整任务查询原开发款数列表
      boss_boss_adjust_task_callBack:{url:'/eop-boot/boss/boss_adjust_task/callBack',method:'post'},//撤回-刘新星
      boss_bossGoodsPlanningAdujust_commit:{url:'/eop-boot/boss/bossGoodsPlanningAdujust/commit',method:'post'},//提交企划调整
      boss_bossGoodsPlanningAdujust_queryOriginDevelop:{url:'/eop-boot/boss/bossGoodsPlanningAdujust/queryOriginDevelop',method:'post'},//企划调整任务查询原开发款数列表


      //企划消息列表
      page_query_task_message:{url:'/eop-boot/boss/boss_task_message/page_query_task_message',method:'post'},//根据消息状态分页查询消息列表-高璐
      update_task_message_status:{url:'/eop-boot/boss/boss_task_message/update_task_message_status',method:'post'},//更新企划消息状态-高璐
      bossGoodsPlanningParameterSend_showMainOrder:{url:'/eop-boot/boss/bossGoodsPlanningParameterSend/showMainOrder',method:'post'},//企划消息列表-主表列表获取-刘新星
      bossGoodsPlanningParameterSend_showDetailOrder:{url:'/eop-boot/boss/bossGoodsPlanningParameterSend/showDetailOrder',method:'post'},//企划消息列表-子表列表获取-刘新星
      boss_bossGoodsPlanningAdujust_editDesignStatus:{url:'/eop-boot/boss/bossGoodsPlanningAdujust/editDesignStatus',method:'post'},//修改设计款号状态

      //品牌企划跟进
      pageBrandFollow:{url:'/eop-boot/boss/business/pageBrandFollow',method:'post'},   //分页查询-品牌企划跟进
      exportBrandFollow:{url:'/eop-boot/boss/business/exportBrandFollow',method:'post'},//导出-品牌企划跟进

      //商品企划跟进
      goodsFollow_page:{url:'/eop-boot/boss/goodsFollow/page',method:'post'},//列表筛选
      goodsFollow_detail:{url:'/eop-boot/boss/goodsFollow/detail',method:'post'},//明细
      goodsFollow_exportCount:{url:'/eop-boot/boss/goodsFollow/exportCount',method:'post'},//导出前的统计
      goodsFollow_export:{url:'/eop-boot/boss/goodsFollow/export',method:'post'},//导出

      //计费参数配置
      boss_delayCostConfig_page:{url:'/eop-boot/boss/delayCostConfig/page',        method:'post'},              //分页查询
      boss_delayCostConfig_add:{url:'/eop-boot/boss/delayCostConfig/add',          method:'post'},              //新增
      boss_delayCostConfig_update:{url:'/eop-boot/boss/delayCostConfig/update',    method:'post'},              //修改
      boss_delayCostConfig_deleted:{url:'/eop-boot/boss/delayCostConfig/deleted',  method:'post'},              //删除
      boss_goods_planning_manage_constant:{url:'/eop-boot/boss/goods_planning_manage/constant',method:'post'},  //查询字典下拉数据

      boss_business_pageClassFollow:{url:'/eop-boot/boss/business/pageClassFollow', method:'post'},//品类企划跟进
      masterData_basicStyleType_getSecondLevel:{url:'/eop-boot/masterData/basicStyleType/getSecondLevel',method:'post'},//二级品类下拉
      boss_business_exportClassFollow:{url:'/eop-boot/boss/business/exportClassFollow',method:'post'},//导出-品类企划跟进

      //企划延期计费单
      boss_bossDelayCostDetail_pageQuery:{url:'/eop-boot/boss/bossDelayCostDetail/pageQuery',   method:'post'},//分页
      boss_bossDelayCostDetail_getDetails:{url:'/eop-boot/boss/bossDelayCostDetail/getDetails', method:'post'},//明细获取
      boss_bossDelayCostDetail_export:{url:'/eop-boot/boss/bossDelayCostDetail/export',method:'post'},//导出

      //供应商权限
      supplierUserMapping_allocation:{url:'/eop-boot/dataPermission/supplierUserMapping/allocation',method:'post'},//分配供应商
      supplierUserMapping_getAllocation:{url:'/eop-boot/dataPermission/supplierUserMapping/getAllocation',method:'get'},//获取分配供应商列表

      queryUserConfig:{url:'/eop-boot/boss/bossBiFieldUserMapping/queryUserConfig',method:'post'}, //查询用户表头配置
      updateUserConfig:{url:'/eop-boot/boss/bossBiFieldUserMapping/saveUserConfig',method:'post'},//编辑用户表头配置

     

       //品类开发跟进分析
        boss_business_queryFollowDetail:{url:'/eop-boot/boss/business/queryFollowDetail',method:'post'},//子表查询
        boss_business_queryFollowByMdx:{url:'/eop-boot/boss/business/queryFollowByMdx',method:'post'},//主表查询
        boss_business_queryFollowByExportMdx:{url:'/eop-boot/boss/business/queryFollowByExportMdx',method:'post'},

      //拍照时间分析  
       photoTimeAnalysis_page:{url:'/eop-boot/boss/photoTimeAnalysis/page',method:'post'},//查询主表
       photoTimeAnalysis_getExportVos:{url:'/eop-boot/boss/photoTimeAnalysis/getExportVos',method:'post'},//导出主表
       photoTimeAnalysis_getDetail:{url:'/eop-boot/boss/photoTimeAnalysis/getDetail',method:'post'},//查询子表

      //延期天数分析
       goodsFollow_delayAnalysis:{url:'/eop-boot/boss/delayAnalysis/page',         method:'post'},//查询主表
       delayAnalysis_allPages:{url:'/eop-boot/boss/delayAnalysis/allPages',        method:'post'},//导出主表
       goodsFollow_delayAnalysisDetail:{url:'/eop-boot/boss/delayAnalysis/detail', method:'post'},//查询子表
       
      //成本开发跟进
       boss_business_page:{url:'/eop-boot/boss/business/page',method:'post'},//列表筛选
       boss_business_getDetail:{url:'/eop-boot/boss/business/getDetail',method:'post'},//获取明细
       boss_business_exportGetDetail:{url:'/eop-boot/boss/business/exportGetDetail',method:'post'},//导出-获取明细
       boss_bossBiFieldUserMapping_saveTemplateConfig:{url:'/eop-boot/boss/bossBiFieldUserMapping/saveTemplateConfig',method:'post'},//保存模板表头配置
       boss_bossGoodsPlanningAdujust_queryAdhustDetailLog:{url:'/eop-boot/boss/bossGoodsPlanningAdujust/queryAdhustDetailLog',method:'post'},//查询调整日志
       
       getByDepartment:{url:'/eop-boot/masterData/user/getByDepartment',method:'post'},//部门用户联动查询

      getCategoryElementsDetail:{url:'/eop-boot/boss/category_elements/getCategoryElementsDetail',method:'post'},//品类要素查询
      category_elements_commit:{url:'/eop-boot/boss/category_elements/commit',method:'post'},//品类要素提交

      //爆款调整
      hotGoodsPlanning_page:{url:'/eop-boot/boss/hotGoodsPlanning/page',method:'post'},//分页查询企划爆款调整
      hotGoodsPlanning_add:{url:'/eop-boot/boss/hotGoodsPlanning/add',method:'post'},//新增企划爆款调整
      hotGoodsPlanning_uploadAsync:{url:'/eop-boot/boss/hotGoodsPlanning/uploadAsync',method:'post'},//导入企划爆款调整
      hotGoodsPlanning_getHotGoodsPlanning:{url:'/eop-boot/boss/hotGoodsPlanning/getHotGoodsPlanning',method:'post'},//根据任务号查询企划爆款调整信息
      hotGoodsPlanning_commit:{url:'/eop-boot/boss/hotGoodsPlanning/commit',method:'post'},//提交
      hotGoodsPlanning_getDetail:{url:'/eop-boot/boss/hotGoodsPlanning/getDetail',method:'post'},//查询企划爆款调整明细
      createHotAdjust:{url:'/eop-boot/boss/goods_planning_manage/createHotAdjust',method:'post'},//调整指令
      hotGoodsPlanning_revoke:{url:'/eop-boot/boss/hotGoodsPlanning/revoke',method:'post'},//撤回
      
      payable_payable_closed_order_reasonSelector:{url:'/eop-boot/payable/payable-closed-order/reasonSelector',method:'post'},//代销转经下拉
                       

      //面料质检项 主数据
      basicFabricQcItem_page:{url:'/eop-boot/fabric/basicFabricQcItem/page',method:'post'},//查询
      basicFabricQcItem_insertOrUpdate:{url:'/eop-boot/fabric/basicFabricQcItem/insertOrUpdate',method:'post'},//新增or编辑  

      //质检管理
      showTaskNodeList:{url:'/eop-boot/qcFlowTask/showTaskNodeList',method:'post'},//任务列表查询
      showTaskNode:{url:'/eop-boot/qcFlowTask/showTaskNode',method:'post'},//进行中 详情查询     
      getWeaveMethod:{url:'/eop-boot/qcFlowTask/getWeaveMethod',method:'post'},//获取织法
      updateTaskNode:{url:'/eop-boot/qcFlowTask/updateTaskNode',method:'post'},//更改流程状态
      fabricQcPrint:{url:'/eop-boot/fabric/fabricQcCheckList/print',method:'post'},//打印面料质检单

      //大货检测任务
      goodsCheck_goodsQuery:{url:'/eop-boot/fabric/goodsCheck/page',method:'post'},//查询
      goodsCheck_selector:{url:'/eop-boot/fabric/goodsCheck/goods/selector',method:'post'},//查询批次
      goodsCheck_materielDetail:{url:'/eop-boot/fabric/goodsCheck/goods/materielDetail',method:'post'},//查询明细
      goodsCheck_batchAdd:{url:'/eop-boot/fabric/goodsCheck/batchAdd',method:'post'},//提交
      goodsCheck_colorSelector:{url:'/eop-boot/fabric/goodsCheck/design/colorSelector',method:'post'},//查询颜色
      goodsCheck_simpleCategorySelector:{url:'/eop-boot/fabric/goodsCheck/design/simpleCategorySelector',method:'post'},//查询类别
      goodsCheck_design_materielDetail:{url:'/eop-boot/fabric/goodsCheck/design/materielDetail',method:'post'},//查询类别
      goodsCheck_export:{url:'/eop-boot/fabric/goodsCheck/export',method:'post'},//导出

};
export default methodMap; 
//   /business/get_develop_simple,
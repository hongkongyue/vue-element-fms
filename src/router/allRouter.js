import Main from '@/views/main.vue';

const appRouter = [
    {
        path: '/receivablePayable',
        icon: '',
        name: 'receivablePayable',
        title: '应收管理',
        component: Main,
        children: [
            {
                path: 'unitFile',
                title: '单位档案',
                name: 'unitFile',
                meta: {
                    title: '/主数据/单位档案',
                    path: '/receivablePayable/unitFile',
                    label: '单位档案'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/unitFile.vue'),
                hidden: false
            },
            {
                path: 'colorFile',
                title: '颜色档案',
                name: 'colorFile',
                meta: {
                    title: '/主数据/颜色档案',
                    path: '/receivablePayable/colorFile',
                    label: '颜色档案'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/colorFile.vue'),
                hidden: false
            },
            {
                path: 'materialTypeFile',
                title: '物料类型档案',
                name: 'materialTypeFile',
                meta: {
                    title: '/主数据/物料类型档案',
                    path: '/receivablePayable/materialTypeFile',
                    label: '物料类型档案'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/materialTypeFile.vue'),
                hidden: false
            },
            {
                path: 'deductionDiscount',
                title: '扣款折扣',
                name: 'deductionDiscount',
                meta: {
                    title: '/主数据/扣款折扣',
                    path: '/receivablePayable/deductionDiscount',
                    label: '扣款折扣'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/discount.vue'),
                hidden: false
            },
            {
                path: 'supplierProfile',
                title: '供应商档案',
                name: 'supplierProfile',
                meta: {
                    title: '/主数据/供应商档案',
                    path: '/receivablePayable/supplierProfile',
                    label: '供应商档案'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/supplierProfile.vue'),
                hidden: false
            },
            {
                path: 'businessType',
                title: '业务类型',
                name: 'businessType',
                meta: {
                    title: '/主数据/业务类型',
                    path: '/receivablePayable/businessType',
                    label: '业务类型'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/businessType.vue'),
                hidden: false
            },
            {
                path: 'shop',
                title: '店铺',
                name: 'shop',
                meta: {
                    title: '/主数据/店铺',
                    path: '/receivablePayable/shop',
                    label: '店铺'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/shop.vue'),
                hidden: false
            },
            {
                path: 'log',
                title: '系统日志',
                name: 'log',
                meta: {
                    title: '/主数据/系统日志',
                    path: '/receivablePayable/log',
                    label: '系统日志'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/log.vue'),
                hidden: false
            },
            {
                path: 'publishLog',
                title: '版本更新日志',
                name: 'publishLog',
                meta: {
                    title: '/主数据/版本更新日志',
                    path: '/receivablePayable/publishLog',
                    label: '版本更新日志'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/publishLog.vue'),
                hidden: false
            },
            {
                path: 'platform',
                title: '平台',
                name: 'platform',
                meta: {
                    title: '/主数据/平台',
                    path: '/receivablePayable/platform',
                    label: '平台'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/platform.vue'),
                hidden: false
            },
            {
                path: 'brandbuy',
                title: '品牌',
                name: 'brandbuy',
                meta: {
                    title: '/主数据/品牌',
                    path: '/receivablePayable/brandbuy',
                    label: '品牌'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/brand.vue'),
                hidden: false
            },
            {
                path: 'encodeingRules',
                title: '单据编码规则',
                name: 'encodeingRules',
                meta: {
                    title: '/主数据/单据编码规则',
                    path: '/receivablePayable/encodeingRules',
                    label: '单据编码规则'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/encodeingRules.vue'),
                hidden: false
            },
            {
                path: 'staffinfo',
                title: '人员',
                name: 'staffinfo',
                meta: {
                    title: '/主数据/人员',
                    path: '/receivablePayable/staffinfo',
                    label: '人员'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/staff.vue'),
            },
            {
                path: 'company',
                title: '公司',
                name: 'company',
                meta: {
                    title: '/主数据/公司',
                    path: '/receivablePayable/company',
                    label: '公司'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/company.vue'),
                hidden: false
            },
            {
                path: 'financialType',
                title: '账务类型',
                name: 'financialType',
                meta: {
                    title: '/主数据/账务类型',
                    path: '/receivablePayable/financialType',
                    label: '账务类型'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/financialType.vue'),
                hidden: false
            },
            {
                path: 'businessAccount',
                title: '业务账期',
                name: 'businessAccount',
                meta: {
                    title: '/主数据/业务账期',
                    path: '/receivablePayable/businessAccount',
                    label: '业务账期'
                },
                component: () => import('@/views/receivablePayable/receivableManage/businessAccount.vue'),
                hidden: false
            },
            {
                path: 'billImportAndQuery',
                title: '账单导入与查询',
                name: 'billImportAndQuery',
                meta: {
                    title: '/应收管理/账单导入与查询',
                    path: '/receivablePayable/billImportAndQuery',
                    label: '账单导入与查询'
                },
                component: () => import('@/views/receivablePayable/receivableManage/billImportAndQuery.vue'),
                hidden: false
            },
            {
                path: 'receivables',
                title: '应收单',
                name: 'receivables',
                meta: {
                    title: '/应收管理/应收单',
                    path: '/receivablePayable/receivables',
                    label: '应收单'
                },
                component: () => import('@/views/receivablePayable/receivableManage/receivables.vue'),
                hidden: false
            },
            {
                path: 'accountingAmount',
                title: '入账金额表',
                name: 'accountingAmount',
                meta: {
                    title: '/应收管理/入账金额表',
                    path: '/receivablePayable/accountingAmount',
                    label: '入账金额表'
                },
                component: () => import('@/views/receivablePayable/receivableManage/accountingAmount.vue'),
                hidden: false
            },
            {
                path: 'reconciliations',
                title: '对账汇总表',
                meta: {
                    title: '/应收管理/对账汇总表',
                    path: '/receivablePayable/reconciliations',
                    label: '对账汇总表'
                },
                name: 'reconciliations',
                component: () => import('@/views/receivablePayable/receivableManage/reconciliations.vue'),
                hidden: false
            },
            {
                path: 'receivableTimeManage',
                title: '应收管理启用时间',
                name: 'receivableTimeManage',
                meta: {
                    title: '/应收管理/应收管理启用时间',
                    path: '/receivablePayable/receivableTimeManage',
                    label: '应收管理启用时间'
                },
                component: () => import('@/views/receivablePayable/receivableManage/receivableTimeManage.vue'),
                hidden: false
            },
            {
                path: 'receipt',
                title: '收款单',
                name: 'receipt',
                meta: {
                    title: '/应收管理/收款单',
                    path: '/receivablePayable/receipt',
                    label: '收款单'
                },
                component: () => import('@/views/receivablePayable/receivableManage/receipt.vue'),
                hidden: false
            },
            {
                path: 'verification',
                title: '应收核销',
                name: 'verification',
                meta: {
                    title: '/应收管理/应收核销',
                    path: '/receivablePayable/verification',
                    label: '应收核销'
                },
                component: () => import('@/views/receivablePayable/receivableManage/verification.vue'),
                hidden: false
            },
            {
                path: 'billType',
                title: '账单类型',
                name: 'billType',
                meta: {
                    title: '/主数据/账单类型',
                    path: '/receivablePayable/billType',
                    label: '账单类型'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/billType.vue'),
                hidden: false
            },
            {
                path: 'departmentFMS',
                title: '部门',
                name: 'departmentFMS',
                meta: {
                    title: '/主数据/部门',
                    path: '/receivablePayable/departmentFMS',
                    label: '部门'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/department.vue'),
                hidden: false
            },
            {
                path: 'post_Preserve',
                title: '岗位',
                name: 'post_Preserve',
                meta: {
                    title: '/主数据/岗位',
                    path: '/receivablePayable/post_Preserve',
                    label: '岗位'
                },
                component: () => import('@/views/receivablePayable/maindataPreserve/post.vue'),
                hidden: false
            },
            {
                path: 'customer_list',
                title: '客户主体',
                name: 'customer_list',
                meta: {
                    title: '/主数据/客户主体',
                    path: '/receivablePayable/customer_list',
                    label: '客户主体'
                },
                component: () =>
                    import('@/views/receivablePayable/maindataPreserve/customer.vue'),
                hidden: false
            },
            {
                path: 'warehouse',
                title: '仓库',
                name: 'warehouse',
                meta: {
                    title: '/主数据/仓库',
                    path: '/receivablePayable/warehouse',
                    label: '仓库'
                },
                component: () =>
                    import('@/views/receivablePayable/maindataPreserve/warehouse.vue'),
                hidden: false
            },
            {
                path: 'documentType',
                title: '单据类型',
                name: 'documentType',
                meta: {
                    title: '/主数据/单据类型',
                    path: '/receivablePayable/documentType',
                    label: '单据类型'
                },
                component: () =>
                    import('@/views/receivablePayable/maindataPreserve/documentType.vue'),
                hidden: false
            },
            {
                path: 'goodsDetail',
                title: '商品详情',
                name: 'goodsDetail',
                meta: {
                    title: '/主数据/商品详情',
                    path: '/receivablePayable/goodsDetail',
                    label: '商品详情'
                },
                component: () =>
                    import('@/views/receivablePayable/maindataPreserve/goodsDetail.vue'),
                hidden: false
            },
            {
                path: 'modifyType',
                title: '改标加工类型',
                name: 'modifyType',
                meta: {
                    title: '/主数据/改标加工类型',
                    path: '/receivablePayable/modifyType',
                    label: '改标加工类型'
                },
                component: () =>
                    import('@/views/receivablePayable/maindataPreserve/modifyType.vue'),
                hidden: false
            },
            {
                path: 'modifyProject',
                title: '改标加工项目',
                name: 'modifyProject',
                meta: {
                    title: '/主数据/改标加工项目',
                    path: '/receivablePayable/modifyProject',
                    label: '改标加工项目'
                },
                component: () =>
                    import('@/views/receivablePayable/maindataPreserve/modifyProject.vue'),
                hidden: false
            },
            {
                path: 'modifyReduce',
                title: '减值字典',
                name: 'modifyReduce',
                meta: {
                    title: '/主数据/减值字典',
                    path: '/receivablePayable/modifyReduce',
                    label: '减值字典'
                },
                component: () =>
                    import('@/views/receivablePayable/maindataPreserve/modifyReduce.vue'),
                hidden: false
            },
        ]
    },
    {
        path: '/privilege',
        icon: '',
        name: 'privilege',
        title: '权限配置',
        component: Main,
        children: [
            {
                path: 'new_role_list',
                title: '角色管理',
                name: 'new_role_list',
                meta: {
                    title: '/权限配置/角色管理',
                    path: '/privilege/new_role_list',
                    label: '角色管理'
                },
                component: () =>
                    import('@/views/privilege/role/list.vue'),
                hidden: false
            },
            {
                path: 'add__role',
                title: '角色新增',
                name: 'add__role',
                meta: {
                    title: '/权限配置/角色新增',
                    path: '/privilege/add__role',
                    label: '角色新增'
                },
                component: () => import('@/views/privilege/role/add.vue'),
                hidden: true
            },
            {
                path: 'edit__role',
                title: '角色编辑',
                name: 'edit__role',
                meta: {
                    title: '/权限配置/角色编辑',
                    path: '/privilege/edit__role',
                    label: '角色编辑'
                },
                component: () =>
                    import('@/views/privilege/role/edit.vue'),
                hidden: true
            },
            {
                path: 'new_user_list',
                title: '用户管理',
                name: 'new_user_list',
                meta: {
                    title: '/权限配置/用户管理',
                    path: '/privilege/new_user_list',
                    label: '用户管理'
                },
                component: () =>
                    import('@/views/privilege/user/list.vue'),
                hidden: false
            },
            {
                path: 'new_user_edit',
                title: '用户管理编辑',
                name: 'new_user_edit',
                meta: {
                    title: '/权限配置/用户管理编辑',
                    path: '/privilege/user_edit',
                    label: '用户管理编辑'
                },
                component: () =>
                    import('@/views/privilege/user/edit.vue'),
                hidden: true
            },
            {
                path: 'new_resources_list',
                title: '资源管理',
                name: 'new_resources_list',
                meta: {
                    title: '/权限配置/资源管理',
                    path: '/privilege/new_resources_list',
                    label: '资源管理'
                },
                component: () =>
                    import('@/views/privilege/resources/list.vue'),
                hidden: false
            },
        ]
    },
    {
        path: '/stockCenter',
        icon: '',
        name: 'stockCenter',
        title: '库存中心',
        component: Main,
        children: [
            {
                path: 'warehouse',
                title: '仓库',
                name: 'warehouse',
                meta: {
                    title: '/库存中心/仓库',
                    path: '/stockCenter/warehouse',
                    label: '仓库'
                },
                component: () =>
                    import('@/views/stockCenter/mainData/warehouse.vue'),
                hidden: false
            },
            {
                path: 'historical',
                title: '历史库存',
                name: 'historical',
                meta: {
                    title: '/库存中心/历史库存',
                    path: '/stockCenter/historical',
                    label: '历史库存'
                },
                component: () =>
                    import('@/views/stockCenter/business/historical.vue'),
                hidden: false
            },
            {
                path: 'timely',
                title: '实时库存',
                name: 'timely',
                meta: {
                    title: '/库存中心/历史库存',
                    path: '/stockCenter/timely',
                    label: '实时库存'
                },
                component: () =>
                    import('@/views/stockCenter/business/timely.vue'),
                hidden: false
            },
            {
                path: 'inStockOrder',
                title: '调拨订单',
                name: 'inStockOrder',
                meta: {
                    title: '/库存中心/调拨订单',
                    path: '/stockCenter/inStockOrder',
                    label: '调拨订单'
                },
                component: () =>
                    import('@/views/stockCenter/business/inStockOrder.vue'),
                hidden: false
            },
            {
                path: 'outStock',
                title: '调拨出库',
                name: 'outStock',
                meta: {
                    title: '/库存中心/调拨出库',
                    path: '/stockCenter/outStock',
                    label: '调拨出库'
                },
                component: () =>
                    import('@/views/stockCenter/business/outStock.vue'),
                hidden: false
            },
            {
                path: 'inStock',
                title: '调拨入库',
                name: 'inStock',
                meta: {
                    title: '/库存中心/调拨入库',
                    path: '/stockCenter/inStock',
                    label: '调拨入库'
                },
                component: () =>
                    import('@/views/stockCenter/business/inStock.vue'),
                hidden: false
            },
            {
                path: 'otherInStock',
                title: '其它入库',
                name: 'otherInStock',
                meta: {
                    title: '/库存中心/其它入库',
                    path: '/stockCenter/otherInStock',
                    label: '其它入库'
                },
                component: () =>
                    import('@/views/stockCenter/business/otherInStock.vue'),
                hidden: false
            },
            {
                path: 'otherOutStock',
                title: '其它出库',
                name: 'otherOutStock',
                meta: {
                    title: '/库存中心/其它出库',
                    path: '/stockCenter/otherOutStock',
                    label: '其它出库'
                },
                component: () =>
                    import('@/views/stockCenter/business/otherOutStock.vue'),
                hidden: false
            },
            // {
            //     path: 'adjustStock',
            //     title: '库存调整单',
            //     name: 'adjustStock',
            //     meta:{
            //         title:'/库存中心/库存调整单',
            //         path :'/stockCenter/adjustStock',
            //         label:'库存调整单'
            //     },
            //     component: () =>
            //         import ('@/views/stockCenter/business/adjustStock.vue'),
            //     hidden: false
            // },
            {
                path: 'costAdjustment',
                title: '成本调整单',
                name: 'costAdjustment',
                meta: {
                    title: '/库存中心/成本调整单',
                    path: '/stockCenter/costAdjustment',
                    label: '成本调整单'
                },
                component: () =>
                    import('@/views/stockCenter/business/costAdjustment.vue'),
                hidden: false
            },
            {
                path: 'salesOutlet',
                title: '销售出库',
                name: 'salesOutlet',
                meta: {
                    title: '/库存中心/销售出库',
                    path: '/stockCenter/salesOutlet',
                    label: '销售出库'
                },
                component: () =>
                    import('@/views/stockCenter/business/salesOutlet.vue'),
                hidden: false
            },
            {
                path: 'purchaseAndWarehousing',
                title: '采购入库',
                name: 'purchaseAndWarehousing',
                meta: {
                    title: '/库存中心/采购入库',
                    path: '/stockCenter/purchaseAndWarehousing',
                    label: '采购入库'
                },
                component: () =>
                    import('@/views/stockCenter/business/purchaseAndWarehousing.vue'),
                hidden: false
            },
            {
                path: 'stockTaking',
                title: '库存盘点出入库',
                name: 'stockTaking',
                meta: {
                    title: '/库存中心/库存盘点出入库',
                    path: '/stockCenter/stockTaking',
                    label: '库存盘点出入库'
                },
                component: () =>
                    import('@/views/stockCenter/business/stockTaking.vue'),
                hidden: false
            },
            {
                path: 'noSingerReturn',
                title: '无单退货',
                name: 'noSingerReturn',
                meta: {
                    title: '/库存中心/无单退货',
                    path: '/stockCenter/noSingerReturn',
                    label: '无单退货'
                },
                component: () =>
                    import('@/views/stockCenter/business/noSingerReturn.vue'),
                hidden: false
            },
            {
                path: 'inventorySurplus',
                title: '盘盈入库',
                name: 'inventorySurplus',
                meta: {
                    title: '/库存中心/盘盈入库',
                    path: '/stockCenter/inventorySurplus',
                    label: '盘盈入库'
                },
                component: () =>
                    import('@/views/stockCenter/business/inventorySurplus.vue'),
                hidden: false
            },
            {
                path: 'inventoryLosses',
                title: '盘亏出库',
                name: 'inventoryLosses',
                meta: {
                    title: '/库存中心/盘亏出库',
                    path: '/stockCenter/inventoryLosses',
                    label: '盘亏出库'
                },
                component: () =>
                    import('@/views/stockCenter/business/inventoryLosses.vue'),
                hidden: false
            },
            {
                path: 'adjustStock',
                title: '库存盘点单',
                name: 'adjustStock',
                meta: {
                    title: '/库存中心/库存盘点单',
                    path: '/stockCenter/adjustStock',
                    label: '库存盘点单'
                },
                component: () =>
                    import('@/views/stockCenter/business/adjustStock.vue'),
                hidden: false
            },
        ]
    },
    //应付管理
    {
        path: '/payableManage',
        icon: '',
        name: 'payableManage',
        title: '应付管理',
        component: Main,
        children: [
            {
                path: 'deduction',
                title: '扣款单',
                name: 'deduction',
                meta: {
                    title: '/应付管理/扣款单',
                    path: '/payableManage/deduction',
                    label: '扣款单'
                },
                component: () =>
                    import('@/views/payableManage/business/deduction.vue'),
                hidden: false
            },
            {
                path: 'settlementDetail',
                title: '结算明细',
                name: 'settlementDetail',
                meta: {
                    title: '/应付管理/结算明细',
                    path: '/payableManage/settlementDetail',
                    label: '结算明细'
                },
                component: () =>
                    import('@/views/payableManage/business/settlementDetail.vue'),
                hidden: false
            },
            {
                path: 'scmOrder',
                title: '采购订单',
                name: 'scmOrder',
                meta: {
                    title: '/应付管理/采购订单',
                    path: '/payableManage/scmOrder',
                    label: '采购订单'
                },
                component: () =>
                    import('@/views/payableManage/business/scmOrder.vue'),
                hidden: false
            },
            {
                path: 'customs',
                title: '关单登记',
                name: 'customs',
                meta: {
                    title: '/应付管理/关单登记',
                    path: '/payableManage/customs',
                    label: '关单登记'
                },
                component: () =>
                    import('@/views/payableManage/business/customs.vue'),
                hidden: false
            },
            {
                path: 'wareHouse',
                title: '入库单',
                name: 'wareHouse',
                meta: {
                    title: '/应付管理/入库单',
                    path: '/payableManage/wareHouse',
                    label: '入库单'
                },
                component: () =>
                    import('@/views/payableManage/business/wareHouse.vue'),
                hidden: false
            },
            {
                path: 'checkBill',
                title: '对账单',
                name: 'checkBill',
                meta: {
                    title: '/应付管理/对账单',
                    path: '/payableManage/checkBill',
                    label: '对账单'
                },
                component: () =>
                    import('@/views/payableManage/business/checkBill.vue'),
                hidden: false
            },
            {
                path: 'deductionAdvice',
                title: '扣款建议',
                name: 'deductionAdvice',
                meta: {
                    title: '/应付管理/扣款建议',
                    path: '/payableManage/deductionAdvice',
                    label: '扣款建议'
                },
                component: () =>
                    import('@/views/payableManage/business/deductionAdvice.vue'),
                hidden: false
            },
            {
                path: 'checkAccount',
                title: '应付对账',
                name: 'checkAccount',
                meta: {
                    title: '/应付管理/应付对账',
                    path: '/payableManage/checkAccount',
                    label: '应付对账'
                },
                component: () =>
                    import('@/views/payableManage/business/businessAccount.vue'),
                hidden: false
            },
            {
                path: 'payableTimeManage',
                title: '应付管理启用时间',
                name: 'payableTimeManage',
                meta: {
                    title: '/应付管理/应付管理启用时间',
                    path: '/payableManage/payableTimeManage',
                    label: '应付管理启用时间'
                },
                component: () =>
                    import('@/views/payableManage/business/payableTimeManage.vue'),
                hidden: false
            },
            {
                path: 'delayAllocation',
                title: '延期配置',
                name: 'delayAllocation',
                meta: {
                    title: '/应付管理/延期配置',
                    path: '/payableManage/delayAllocation',
                    label: '延期配置'
                },
                component: () =>
                    import('@/views/payableManage/business/delayAllocation.vue'),
                hidden: false
            },
            {
                path: 'registerBill',
                title: '到票登记',
                name: 'registerBill',
                meta: {
                    title: '/应付管理/到票登记',
                    path: '/payableManage/registerBill',
                    label: '到票登记'
                },
                component: () =>
                    import('@/views/payableManage/business/registerBill.vue'),
                hidden: false
            },
            {
                path: 'registerPay',
                title: '付款登记',
                name: 'registerPay',
                meta: {
                    title: '/应付管理/付款登记',
                    path: '/payableManage/registerPay',
                    label: '付款登记'
                },
                component: () =>
                    import('@/views/payableManage/business/registerPay.vue'),
                hidden: false
            },
        ]
    },
    //成本折扣
    {
        path:'/costDiscount',
        icon:'',
        name:'costDiscount',
        title:'成本折扣',
        component:Main,
        children:[
            {
                path: 'revision',
                title: '改标记录',
                name: 'revision',
                meta:{
                    title:'/成本折扣/改标记录',
                    path:'/costDiscount/revision',
                    label:'改标记录'
                },
                component: () =>
                    import ('@/views/costDiscount/revision.vue'),
                hidden: false
            },
            {
                path: 'returnRecord',
                title: '返单记录',
                name: 'returnRecord',
                meta:{
                    title:'/成本折扣/返单记录',
                    path:'/costDiscount/returnRecord',
                    label:'返单记录'
                },
                component: () =>
                    import ('@/views/costDiscount/returnRecord.vue'),
                hidden: false
            },
            {
                path: 'costReduction',
                title: '成本减值率表',
                name: 'costReduction',
                meta:{
                    title:'/成本折扣/成本减值率表',
                    path:'/costDiscount/costReduction',
                    label:'成本减值率表'
                },
                component: () =>
                    import ('@/views/costDiscount/costReduction.vue'),
                hidden: false
            },
        ]
    },
    //面料管理
    {
        path:'/fabricManagement',
        icon:'',
        name:'fabricManagement',
        title:'面料开发管理',
        component:Main,
        children:[
            {
                path: '/fabricManagement/taskConfig',
                title: '任务配置',
                name: 'taskConfig',
                meta:{
                    title:'/面料开发管理/任务配置',
                    path:'/fabricManagement/taskConfig',
                    label:'任务配置'
                },
                component: () =>
                    import ('@/views/fabricManagement/taskConfig.vue'),
                hidden: false
            },
            {
                path: '/fabricManagement/developCycle',
                title: '开发周期',
                name: 'developCycle',
                meta:{
                    title:'/面料开发管理/开发周期',
                    path:'/fabricManagement/developCycle',
                    label:'开发周期'
                },
                component: () =>
                    import ('@/views/fabricManagement/developCycle.vue'),
                hidden: false
            },
            {
                path: '/fabricManagement/fabriclist',
                title: '录入面料信息任务列表',
                name: 'fabriclist',
                meta:{
                    title:'/面料开发流程/录入面料信息任务列表',
                    path:'/fabricManagement/fabriclist',
                    label:'录入面料信息任务列表'
                },
                component: () =>
                    import ('@/views/fabricManagement/fabricSchedule/fabriclist.vue'),
                hidden: false
            },
            {
                path: '/fabricManagement/fabricdetail',
                title: '录入面料信息详情',
                name: 'fabricdetail',
                meta:{
                    title:'/面料开发流程/录入面料信息详情',
                    path:'/fabricManagement/fabricdetail',
                    label:'录入面料信息详情'
                },
                component: () =>
                    import ('@/views/fabricManagement/fabricSchedule/fabricdetail.vue'),
                hidden: true
            },
            {
                path: '/fabricManagement/fabriccomplated',
                title: '录入面料信息完成页',
                name: 'fabriccomplated',
                meta:{
                    title:'/面料开发流程/录入面料信息完成页',
                    path:'/fabricManagement/fabriccomplated',
                    label:'录入面料信息完成页'
                },
                component: () =>
                    import ('@/views/fabricManagement/fabricSchedule/fabriccomplated.vue'),
                hidden: true
            },
            {
                path: '/fabricManagement/purchaseList',
                title: '录入采购信息任务列表',
                name: 'purchaseList',
                meta:{
                    title:'/面料开发流程/录入采购信息任务列表',
                    path:'/fabricManagement/fabriccomplated',
                    label:'录入采购信息任务列表'
                },
                component: () =>
                    import ('@/views/fabricManagement/fabricSchedule/purchaseList.vue'),
                hidden: false
            },
            {
                path: '/fabricManagement/purchasingdetail',
                title: '录入采购信息详情页',
                name: 'purchasingdetail',
                meta:{
                    title:'/面料开发流程/录入采购信息详情页',
                    path:'/fabricManagement/purchasingdetail',
                    label:'录入采购信息详情页'
                },
                component: () =>
                    import ('@/views/fabricManagement/fabricSchedule/purchasingdetail.vue'),
                hidden: true
            },
            {
                path: '/fabricManagement/purchasingcomplated',
                title: '录入采购信息完成页',
                name: 'purchasingcomplated',
                meta:{
                    title:'/面料开发流程/录入采购信息完成页',
                    path:'/fabricManagement/purchasingcomplated',
                    label:'录入采购信息完成页'
                },
                component: () =>
                    import ('@/views/fabricManagement/fabricSchedule/purchasingcomplated.vue'),
                hidden: true
            },
              { path: '/fabricManagement/fabricDevelop',
                title: '面料开发',
                name: 'fabricDevelop',
                meta:{
                    title:'/面料开发管理/面料开发',
                    path:'/fabricManagement/fabricDevelop',
                    label:'面料开发'
                },
                component: () =>
                    import ('@/views/fabricManagement/fabricDevelop.vue'),
                hidden: false
            },
            { path: '/fabricManagement/developConfirmList',
                title: '开发确认任务列表',
                name: 'developConfirmList',
                meta:{
                    title:'/面料开发管理/开发确认任务列表',
                    path:'/fabricManagement/developConfirmList',
                    label:'开发确认任务列表'
                },
                component: () =>
                    import ('@/views/fabricManagement/developConfirmList.vue'),
                hidden: false
            },
            { path: '/fabricManagement/developConfirmConduct',
                title: '开发确认详情',
                name: 'developConfirmConduct',
                meta:{
                    title:'/面料开发管理/开发确认详情',
                    path:'/fabricManagement/developConfirmConduct',
                    label:'开发确认详情'
                },
                component: () =>
                    import ('@/views/fabricManagement/developConfirmConduct.vue'),
                hidden: true
            },
            { path: '/fabricManagement/developConfirmComplete',
                title: '开发确认完成页',
                name: 'developConfirmComplete',
                meta:{
                    title:'/面料开发管理/开发确认完成页',
                    path:'/fabricManagement/developConfirmComplete',
                    label:'开发确认完成页'
                },
                component: () =>
                    import ('@/views/fabricManagement/developConfirmComplete.vue'),
                hidden: false
            },
            { path: '/fabricManagement/testingList',
                title: '检测任务列表',
                name: 'testingList',
                meta:{
                    title:'/面料开发管理/检测任务列表',
                    path:'/fabricManagement/testingList',
                    label:'检测任务列表'
                },
                component: () =>
                    import ('@/views/fabricManagement/testingList.vue'),
                hidden: false
            },
            { path: '/fabricManagement/testingConduct',
                title: '检测详情',
                name: 'testingConduct',
                meta:{
                    title:'/面料开发管理/检测详情',
                    path:'/fabricManagement/testingConduct',
                    label:'检测详情'
                },
                component: () =>
                    import ('@/views/fabricManagement/testingConduct.vue'),
                hidden: false
            },
            { path: '/fabricManagement/testingComplete',
                title: '检测完成页',
                name: 'testingComplete',
                meta:{
                    title:'/面料开发管理/检测完成页',
                    path:'/fabricManagement/testingComplete',
                    label:'检测完成页'
                },
                component: () =>
                    import ('@/views/fabricManagement/testingComplete.vue'),
                hidden: false
            },
            { path: '/fabricManagement/pricingList',
                title: '核价任务列表',
                name: 'pricingList',
                meta:{
                    title:'/面料开发管理/核价任务列表',
                    path:'/fabricManagement/pricingList',
                    label:'核价任务列表'
                },
                component: () =>
                    import ('@/views/fabricManagement/pricingList.vue'),
                hidden: false
            },
            { path: '/fabricManagement/pricingConduct',
                title: '核价详情',
                name: 'pricingConduct',
                meta:{
                    title:'/面料开发管理/核价详情',
                    path:'/fabricManagement/pricingConduct',
                    label:'核价详情'
                },
                component: () =>
                    import ('@/views/fabricManagement/pricingConduct.vue'),
                hidden: false
            },
            { path: '/fabricManagement/pricingComplete',
                title: '核价完成页',
                name: 'pricingComplete',
                meta:{
                    title:'/面料开发管理/核价完成页',
                    path:'/fabricManagement/pricingComplete',
                    label:'核价完成页'
                },
                component: () =>
                    import ('@/views/fabricManagement/pricingComplete.vue'),
                hidden: false
            },
            { path: '/fabricManagement/personList',
                title: '发起人确认任务列表',
                name: 'personList',
                meta:{
                    title:'/面料开发管理/发起人确认任务列表',
                    path:'/fabricManagement/personList',
                    label:'发起人确认任务列表'
                },
                component: () =>
                    import ('@/views/fabricManagement/personList.vue'),
                hidden: false
            },
            { path: '/fabricManagement/personConduct',
                title: '发起人确认详情',
                name: 'personConduct',
                meta:{
                    title:'/面料开发管理/发起人确认详情',
                    path:'/fabricManagement/personConduct',
                    label:'发起人确认详情'
                },
                component: () =>
                    import ('@/views/fabricManagement/personConduct.vue'),
                hidden: false
            },
            { path: '/fabricManagement/personComplete',
                title: '发起人确认完成页',
                name: 'personComplete',
                meta:{
                    title:'/面料开发管理/发起人确认完成页',
                    path:'/fabricManagement/personComplete',
                    label:'发起人确认完成页'
                },
                component: () =>
                    import ('@/views/fabricManagement/personComplete.vue'),
                hidden: false
            },
            { path: '/fabricManagement/reportForm',
                title: '面料开发报表',
                name: 'reportForm',
                meta:{
                    title:'/面料开发管理/面料开发报表',
                    path:'/fabricManagement/reportForm',
                    label:'面料开发报表'
                },
                component: () =>
                    import ('@/views/fabricManagement/reportForm.vue'),
                hidden: false
            },
        ]
    },
]
export default appRouter;

export default {
  orderStatus: [
    {
      value: 1,
      label: '待审核'
    },
    {
      value: 2,
      label: '已审核'
    },
    {
      value: -2,
      label: '驳回'
    },
    {
      value: 3,
      label: '已推送'
    },
    {
      value: -3,
      label: '推送失败'
    }, {
      value: 5,
      label: '已发货'
    }
  ],
  orderType:[
    {
      value:'NG',
      label:'内购订单'
    },
    {
      value:'JY',
      label:'样衣借用'
    },
    {
      value:'LY',
      label:'样衣领用'
    },
    {
      value:'FY',
      label:'工厂样衣'
    },
    {
      value:'DX',
      label:'代销下单'
    }
  ],
  warehouse:[
    {
      warehouse_code:'XSYLC',
      warehouse_name:'宇隆仓'
    },
    {
      warehouse_code:'XSGLC',
      warehouse_name:'瓜沥仓'
    }
  ],
  formSearch_warehouse:[
    {
      warehouse_code: '',
      warehouse_name: '查看全部仓'
    },
    {
      warehouse_code: 'XSYLC',
      warehouse_name: '宇隆仓'
    },
    {
      warehouse_code: 'XSGLC',
      warehouse_name: '瓜沥仓'
    }
  ],
  error_types: [
    {
      error_type_code: 'CF',
      error_type_name: '错发'
    },
    {
      error_type_code: 'LF',
      error_type_name: '漏发'
    }
  ],                    //错误类型集合
  destination_list:[
    {
      value:'天津'
    },
    {
      value:'肇庆'
    },
    {
      value:'简阳'
    },
    {
      value:'昆山'
    },
    {
      value:'鄂州'
    },
    {
      value:'哈尔滨'
    },
    {
      value:'济南'
    },
    {
      value:'呼和浩特'
    },
    {
      value:'太原'
    },
    {
      value:'兰州'
    },
    {
      value:'昆明'
    },
    {
      value:'沈阳'
    },
    {
      value:'西安'
    },
    {
      value:'郑州'
    },
    {
      value:'长沙'
    },
    {
      value:'南宁'
    },
    {
      value:'南昌'
    },
    {
      value:'贵阳'
    },
    {
      value:'乌鲁木齐'
    },
    {
      value:'合肥'
    },
    {
      value:'泉州'
    },
    {
      value:'杭州'
    }
  ]
}

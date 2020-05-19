//序列化请求参数
export const formatParams=(data) =>{
    var arr = [];
    for (var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    return arr.join("&");
}
export const getName=(arr,id)=>{
    if(arr instanceof Array){
        for(let i=0,len=arr.length;i<len;i++){
            if(arr[i].id==id) return arr[i].name
        }
    }
}
export const getCompanyCode=(arr,id)=>{
    if(arr instanceof Array){
        for(let i=0,len=arr.length;i<len;i++){
            if(arr[i].id==id) return arr[i].code
        }
    }
}
export const judgeType = (time) => {
	if (time) {
		     return true
  }
  return false
}
// 去掉千位符
export const specialSymbol= (num) => {
    if(String(num).includes(',')){
           return  num.replace(/,/g, '')       
   }else{
           return num
   }
}
// 格式化金额
export const moneyFilters = (num) => {
    if(String(num).includes('.')){
        if(String(num).split('.')[1].length==1){
              num=Number(num).toFixed(2)  
              return num && num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {return $1 + ","; });
        }else{
              return num && num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {return $1 + ","; });
        }
    }else{
             num=Number(num).toFixed(2)  
      return num && num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {return $1 + ","; });  
    }
  }
  const toDecimal2 = (x) => {
    var f = parseFloat(x)
    if (isNaN(f)) {
      return false
    }
    f = Math.round(x * 100) / 100
    var s = f.toString()
    var rs = s.indexOf('.')
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + 2) {
      s += '0'
    }
    return s
  }
export const getConstant=(type)=>{
      switch(type){
            case'shop': //店铺
                return 'master_data_merchant_store_'
                break;
                case'code'://编码规则
                return 'master_data_code_ruler_'
                break; 
                case'brand'://品牌
                return 'master_data_brand_'
                break; 
                case'platform'://平台
                return 'master_data_platform_'
                break;
                case'staff'://平台
                return 'master_data_staff_'
                break;
                case 'department':
                return 'master_data_department_'
                break;
                case'time':
                return 'acc_received_log_prefix_period_'
                break;
                case'bill':
                return 'acc_bill_type_'
                break;
                case 'account'://业务账期
                return 'master_data_account_'
                break;
      }
}
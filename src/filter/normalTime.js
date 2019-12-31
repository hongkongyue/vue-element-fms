export const normalTime = (time) => {
	if (time) {
		var oDate = new Date();
	    	oDate.setTime(time);
            var Y = oDate.getFullYear(),
            M = oDate.getMonth() + 1 < 10 ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1,
            D = oDate.getDate() < 10 ? ('0' + oDate.getDate()) : oDate.getDate(),
            h = oDate.getHours() < 10 ? ('0' + oDate.getHours()) : oDate.getHours(),
            m = oDate.getMinutes() < 10 ? '0' + oDate.getMinutes() : oDate.getMinutes(),
            s = oDate.getSeconds() < 10 ? '0' + oDate.getSeconds() : oDate.getSeconds();
		return Y + '-' + M + '-' + D + ' ' + h + ':' + m+ ':' + s;
	}
}
export const dd_hh_mm= (time) => {
	if (time) {
        var d = parseInt(time/(24*60*60*1000));
        var h = parseInt(time/(60*60*1000)%24);
        var m = parseInt(time/(60*1000)%60);
        var s = parseInt(time/1000%60);
		 return  d + '天' + h + '时' + m+ '分';
	}
}
export const get_days= (time) => {
	if (time) {
		var oDate = new Date();
	    	oDate.setTime(time);
		var y = oDate.getFullYear();
		var m = oDate.getMonth() + 1;
		var d = oDate.getDate();
		var h = oDate.getHours();
		var mm = oDate.getMinutes();
		var s = oDate.getSeconds();
		 return  d 
	}
}
export const get_unix_only=(unix)=>{
      if(unix){
          var newDate = new Date();
              newDate.setTime(unix);
	      var Y = newDate.getFullYear(),
	          M = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1,
	          D = newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate(),
	          h = newDate.getHours() < 10 ? ('0' + newDate.getHours()) : newDate.getHours(),
	          m = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes(),
	          s = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds();
	      return  Y
      }
     
}
export const get_year_month_day=(unix)=>{
    if(unix){
        var newDate = new Date();
            newDate.setTime(unix);
        var Y = newDate.getFullYear(),
            M = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1,
            D = newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate();
        return  Y +'-'+ M +'-'+ D
    }
   
}
export const get_year_month_day3=(unix)=>{
    if(unix){
        var newDate = new Date();
            newDate.setTime(unix);
        var Y = newDate.getFullYear(),
            M = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1,
            D = newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate(),
            h = newDate.getHours() < 10 ? ('0' + newDate.getHours()) : newDate.getHours(),
            m = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes(),
            s = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds();
        return  Y +'-'+ M +'-'+ D+' '+h+':'+m+':'+s
    }
   
}
export const get_year_month_day4=(unix)=>{
    if(unix){

        var newDate = new Date();
           
            let num= newDate.setTime(unix)+(24*60*60-1)*1000;
            newDate.setTime(num);
        var Y = newDate.getFullYear(),
            M = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1,
            D = newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate(),
            h = newDate.getHours() < 10 ? ('0' + newDate.getHours()) : newDate.getHours(),
            m = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes(),
            s = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds();
        return  Y +'-'+ M +'-'+ D+' '+h+':'+m+':'+s
    }
   
}
export const get_year_month_day2=(unix)=>{
    if(unix){
        var date = new Date(unix * 1000);
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	    var D =  date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
	    return Y + M + D
    }
}
//返回本地时间
export const getnowTime=()=>{
    var newDate = new Date();
        newDate.setTime(new Date().getTime());
    var Y = newDate.getFullYear(),
        M = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1,
        D = newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate(),
        h = newDate.getHours() < 10 ? ('0' + newDate.getHours()) : newDate.getHours(),
        m = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes(),
        s = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds();
        return  Y +'-'+M+'-'+D
}
export const  FreshTime=(timestamp)=>{
            var startTime = new Date().getTime();
            var endTime = parseInt(timestamp*1000);
            var differTime = endTime - startTime; //两时间差
            var d = parseInt(differTime/(24*60*60*1000));
            var h = parseInt(differTime/(60*60*1000)%24);
            var m = parseInt(differTime/(60*1000)%60);
            var s = parseInt(differTime/1000%60);
            // if(d<10){
            //       d="0"+d;
            // }
            // if(h<10){
            //       h="0"+h;
            // }
            // if(m<10){
            //      m="0"+m;
            // }
            // if(s<10){
            //      s="0"+s;
            // }
        if(differTime>0){
                  return d+'天'+' '+h +'时'+m +'分'+s +'秒'
        }else if(differTime==0){
                  return '已到期' 
        }else if(differTime<0){
        	      return '已超时'
        }
    }
//返回天数的倒计时
export const getCountDayNumber= (time) => {
	if (time) {
        let  d = parseInt(time/(24*60*60*1000));
		 return  d 
	}
}

export const debounce={
             data(){
                   return{
                            tableHieght :   250,
                            showBink    :   false,
                            screenWidth :   '',
                            timer       :   false,
                            maxHeight   :   null,
                            showhidden  :   false,
                            oneTableHeight: null,//主表
                            twoTableHeight: null,//子表


                   }
                
             },
             mounted(){
                setTimeout(()=>{
                    if(document.body.clientWidth<1600){
                            if(this.isMac()){
                                if(document.body.clientWidth<1500){
                                      this.tableHieght=400;
                                      this.showBink=true;
                                }
                            }else{
                                      this.tableHieght=250;
                                      this.showBink=false;
                            }
                           
                    }else{
                                      this.tableHieght=400;
                                      this.showBink=true;
                    }
                   },100)
                   this.initHeight()
                   const that = this
                    window.onresize = () => {
                        return (() => {
                            that.screenWidth = document.body.clientWidth
                            if(that.screenWidth>1600){
                                that.showBink=true
                                that.tableHieght=400
                            }else{
                                that.showBink=false
                                that.tableHieght=250
                            }
                        })()
                    }
             },
             watch:{
                screenWidth(val){
                                if(!this.timer){
                                                this.screenWidth = val
                                                this.timer = true
                                                let that = this
                                                setTimeout(()=>{
                                                    // console.log(that.screenWidth)
                                                    that.timer = false
                                                },800)
                                    }
                }  
             },//
             methods:{
                initHeight(){
                    if (document.body.offsetHeight > 800) {
                        this.heightTree = 'height:' + (document.body.offsetHeight - 270) + 'px;overflow-x:hidden;overflow-y:scroll'
                        this.oneTableHeight = (document.body.offsetHeight - 280) * 0.6
                        this.twoTableHeight = (document.body.offsetHeight - 280) * 0.3
                        this.w2uiHeight = 'height:' + (document.body.offsetHeight - 280) * 0.6 + 'px;width:100%'
                        this.maxHeight = 'height:' + (document.body.offsetHeight - 250) + 'px'
                    } else {
                        this.w2uiHeight = 'height:' + (document.body.offsetHeight - 280) * 0.5 + 'px;width:100%'
                        this.twoTableHeight = (document.body.offsetHeight - 280) * 0.25
                        this.maxHeight = 'height:' + (document.body.offsetHeight - 250) + 'px'
                        this.heightTree = 'height:' + (document.body.offsetHeight - 270) + 'px;overflow-x:hidden;overflow-y:scroll'
                    }
                },
                handleShowHidden(name) {
                        console.log(name, '000')
                        if (name == 'show') {
                            this.showhidden = true
                            if (document.body.offsetHeight > 800) {
                                this.maxHeight = 'height:' + (document.body.offsetHeight - 110) + 'px'
                                this.oneTableHeight = (document.body.offsetHeight - 110) * 0.6
                                this.twoTableHeight = (document.body.offsetHeight - 110) * 0.25
                            } else {
                                this.maxHeight = 'height:' + (document.body.offsetHeight - 110) + 'px'
                                this.oneTableHeight = (document.body.offsetHeight - 110) * 0.6
                                this.twoTableHeight = (document.body.offsetHeight - 110) * 0.25
                            }
            
                        } else {
                            this.showhidden = false
                            if (document.body.offsetHeight > 800) {
                                this.oneTableHeight = (document.body.offsetHeight - 280) * 0.6
                                this.twoTableHeight = (document.body.offsetHeight - 280) * 0.25
                                this.maxHeight = 'height:' + (document.body.offsetHeight - 250) + 'px'
                            } else {
                                this.maxHeight = 'height:' + (document.body.offsetHeight - 250) + 'px'
                                this.oneTableHeight = (document.body.offsetHeight - 280) * 0.5
                                this.twoTableHeight = (document.body.offsetHeight - 280) * 0.25
                            }
                        }
                    },
                    isMac () { 
                                 return /macintosh|mac os x/i.test(navigator.userAgent); 
                     },
                    debounce(func,delay) {
                        let self=this;
                        let time = null
                        let timer = null
                        let newTime = null
                        const  task=()=> {
                            newTime = +new Date()
                            if(newTime - time < delay){
                                timer = setTimeout(task, delay)
                            }else {
                                 func()
                                 timer = null
                            }
                            time = newTime
                        }
                         return  ()=> {
                              time = +new Date()
                               if(!timer){
                                   timer = setTimeout(task, delay)
                              }
                        }
                    },
                    selfAdjust(){
                        if(document.body.clientWidth<1600){
                                this.$refs.mainTable.maxHeight=250+'px'
                        }else{
                                this.$refs.mainTable.maxHeight=450+'px' 
                                this.$refs.mainTable.maxHeight=250
                        }
                    },
             }
}
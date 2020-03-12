<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;" :key="index">
                <Dropdown transfer  placement="right-start" :key="index" @on-click="changeMenu">
                    <div style="width: 70px;margin-left: -5px;padding:10px 0;cursor:pointer" type="text">
                          <!-- <i class="ivu-icon">
                           <icon :name="item.icon" :scale="1.5"></icon>
                         </i> -->
                         <Icon style="color:white" :type="item.icon" size="18" />
                         <!-- <Icon style="color:white" v-if="index == 2" type="md-settings" size="24" />
                         <Icon style="color:white" v-if="index == 1" type="logo-yen" size="24" /> -->
                    </div>
                    <DropdownMenu  slot="list">
                        <template  v-for="(child, i) in item.children" >
                            <DropdownItem v-if="child.children.length<1" :name="child.url+'?code='+child.code"  :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{itemTitle(child)}}</span></DropdownItem>
                            <Dropdown transfer v-else-if="child.children.length>=1" :key="i" placement="right-start" style="max-height:400px!important">
                                        <DropdownItem>
                                        <span style="padding-left:10px;">{{ itemTitle(child) }}</span>
                                        <!-- <Icon type="ios-arrow-right"></Icon> -->
                                        <Icon type="ios-arrow-forward" />
                                       </DropdownItem>
                                        <DropdownMenu slot="list">
                                             <template v-for="(childThree, j) in child.children">
                                             <DropdownItem :name="childThree.url+'?code='+childThree.code" :key="j"><Icon :type="childThree.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(childThree) }}</span></DropdownItem>
                                            </template>
                                        </DropdownMenu>
                        　 </Dropdown>
                           <template v-if="child.children.length>=1">
                              <br>
                           </template>
                        </template>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    data(){
          return{
                host:'',
                params:'',
                url:'receivablePayable/shop',
                menuList:[],
          }
    },
    name: 'sidebarMenuShrink',
    props: {
        // menuList: {
        //     type: Array
        // },
        // iconColor: {
        //     type: String,
        //     default: 'white'
        // },
        // menuTheme: {
        //     type: String,
        //     default: 'darck'
        // }
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    methods: {
        changeMenu (active) {
           if(active.includes('?')){
               this.activeName=active
                this.$router.push({
                        name: active.split('?')[0],
                        query:{
                            code:active.split('?')[1].split('=')[1],
                        }
                    });
              }
        },
        itemTitle (item) {
          　return item.text;
        }
    },
    mounted(){
             setTimeout(()=>{
             this.menuList=JSON.parse(localStorage.getItem('userinfo')).menuTreeDataBind
             this.openNames= this.menuList
         },100)  
         this.$nextTick(() => {
                if (this.$refs.sideMenu) {
                    this.$refs.sideMenu.updateOpened();
                }
            });
    }
};
</script>
<style >
.ivu-select-dropdown {
    min-width: 150px;
    max-height: 900px!important;
   
}
</style>
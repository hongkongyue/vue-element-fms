<style lang="less">
    .ivu-shrinkable-menu {
        height: 100%;
        width: 100%;

        .ivu-menu {
            color: white;
        }

        .ivu-menu-vertical .ivu-menu-item:hover,
        .ivu-menu-vertical .ivu-menu-submenu-title:hover {
                background: #000000;
                opacity: 0.2;
        }
        .ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
                color: #2d8cf0;
                background: transparent;
        }
        .el-menu{
                background:transparent;
                color:#fff;
        }
         
    }
    .selectClass{
         color:#2d8cf0!important
    }
    .normalClass{
         color:#fff!important
    }
    .block{
        display: block
    }
    .none{
        display: none
    }
</style>

<template>
    <Menu  ref="sideMenu"  :active-name="activeName"  style="background:transparent;color:white;" width="auto" @on-select="changeMenu" >
    <!-- <Menu  ref="sideMenu"  :active-name="activeName"    style="background:transparent;color:white;" width="auto" @on-select="changeMenu" @on-open-change="watchChildren"> -->
        <template v-for="(item, index) in menuList">
            <!--一级菜单 -->
                    <!-- 一级菜单多窗口跳转-->
                    <MenuItem v-if="item.children.length<1&&mode==2" :name="item.text"  :key="item.code" :to='item.resourceFrontPath+"?flag="+item.code+"?selectflag="+item.code'>
                        <Icon :type="item.menuIcon" :size="iconSize" :key="item.code"></Icon>
                        <span class="layout-text"   :key="item.url">{{item.text }}</span>
                    </MenuItem>
                    <!-- 一级菜单页面跳转-->
                    <MenuItem v-if="item.children.length<1&&mode==1" :name="item.url+'?code='+item.code"  :key="item.code" >
                        <Icon :type="item.menuIcon" :size="iconSize" :key="item.code"></Icon>
                        <span class="layout-text"   :key="item.url">{{item.text }}</span>
                    </MenuItem>
            <!-- 二级数据 -->
            <Submenu v-if="item.children.length>=1" :name="item.code" :key="item.code">
                    <!--二级数据中的一级菜单 -->
                <template slot="title">
                    <!-- <Icon :type="item.icon" :size="iconSize" :key="item.code"/> -->
                    <i class="iconfont icon-qianyue" :class="item.icon"></i>
                    <span class="layout-text">{{item.text}}</span>
                </template>
                <template v-for="child in item.children">
                    <!--二级数据中的一级菜单 -->

                    <!-- 多窗口跳转 -->
                    <MenuItem  v-if="child.children.length<=0&&mode==2"  :name="child.code"  :key="child.code" :to='child.resourceFrontPath+"?flag="+index+"&code="+child.code+"&selectflag="+child.code+"&fistTitle="+item.text+"&title="+child.text'
                    target="_blank">
                        <Icon :type="child.icon" :size="iconSize" :key="child.code"/>
                        <span style="margin-left:20px" class="layout-text" :key='child.code'>{{child.text}}</span>
                    </MenuItem>
                    <!-- 单页面跳转 -->
                     <MenuItem  v-if="child.children.length<=0&&mode==1" :name="child.url+'?code='+child.code"    :key="child.code" >
                        <Icon :type="child.icon" :size="iconSize" :key="child.code"/>
                        <span style="margin-left:20px" class="layout-text" :key='child.code'>{{child.text}}</span>
                    </MenuItem>
                    <!-- 三级菜单中 -->
                    <Submenu v-if="child.children.length>=1" :name="child.code"   :key="child.code">
                              <!-- 三级菜单中二级菜单名称 -->
                         <template slot="title">
                              <Icon :type="child.icon" :size="iconSize"></Icon>
                              <span style="margin-left:20px" class="layout-text">{{child.text}}</span>
                         </template>
                             <!-- 三级菜单中三级菜单 -->
                         <template v-for="child2 in child.children">
                             <!--多窗口跳转-->
                             <MenuItem v-if="mode==2" :name="child2.code" :key="child2.code"  :to='child2.resourceFrontPath+"?flag="+index+"&code="+child2.code+"&selectflag="+child2.code+"&fistTitle="+item.text+"&title="+child2.text'  target="_blank">
                                    <Icon :type="child2.icon" :size="iconSize" :key="'icon' + child2.code"></Icon>
                                    <span  style="margin-left:35px" class="layout-text" :key=" child2.code">{{child2.text}}</span>
                             </MenuItem>
                              <!-- 单页面跳转 -->
                             <MenuItem v-if="mode==1" :name="child2.url+'?code='+child2.code" :key="child2.code">
                                    <Icon :type="child2.icon" :size="iconSize" :key="'icon' + child2.code"></Icon>
                                    <span  style="margin-left:35px" class="layout-text" :key=" child2.code">{{child2.text}}</span>
                             </MenuItem>
                        </template>
                    </Submenu>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>
<script>
export default {
    data(){
          return{
                host:'',
                params:'',
                url:'',
                // menuList:[],
                activeName:'',
                openArray :[],//要展开的name数组
          }
    },
    computed:{
            mode(){
                 return this.$store.state.app.mode
            },
            menuList(){
                 return this.$store.state.app.menuNewList
            }
    },
    name: 'sidebarMenu',
    props: {
        // menuList: Array,
        iconSize   : Number,
        menuTheme  : {
            type   : String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    methods: {
        //监听单页面跳转
        changeMenu (active) {
             localStorage.setItem('activeMenu',active.split('?')[0])
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
        getParams(){
             var qs = (location.search.length > 0 ? location.search.substring(1) : ''),
                    arsg = {},
                    items = qs.length ? qs.split('&') : [],
                    item = null,
                    name = null,
                    value = null,
                    len = items.length;
                    for (var i = 0; i < len; i++) {
                    item = items[i].split('=');
                    name = decodeURIComponent(item[0]);
                    value = decodeURIComponent(item[1]);
                    if (name.length) {
                        arsg[name] = value;
                    }
                }
                return arsg;
         }
    },
    mounted () {
          this.$store.commit('initMenuList')
          let _this=this
            setTimeout(()=>{
                if(!localStorage.getItem('userinfo')){
                                this.$router.push({
                                                name: 'login'
                                    });
                }
                // this.menuList=JSON.parse(localStorage.getItem('userinfo')).menuTreeDataBind
                //二级菜单
                if(_this.getParams().flag){
                     $(document).ready(function(){
                             //二级菜单展开
                             $('.ivu-shrinkable-menu>ul>li>ul').eq(_this.getParams().flag).css('display','block')
                             //三级菜单展开
                             $('.ivu-shrinkable-menu>ul>li>ul').eq(_this.getParams().flag).find('li').find('ul').css('display','block')
                             _this.activeName=_this.getParams().selectflag
                    })
                }
            },100) 
            
    }

};
</script>

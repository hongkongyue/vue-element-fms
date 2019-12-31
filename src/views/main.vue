<style lang="less">
.ivu-modal-footer {
    border-top: 0 !important;
}

@import "./main.less";
</style>
<template>
<div class="main" :class="{'main-hide-text': shrink}">
    <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
        <shrinkable-menu :shrink="shrink" @on-change="handleSubmenuChange" :theme="menuTheme" :before-push="beforePush" :open-names="openedSubmenuArr" :menu-list="menuList">
            <div slot="top" class="logo-con" style="cursor: pointer;color:white" @click="backToHome">
                <!-- <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    <lock-screen></lock-screen> -->
                <!-- <img v-show="!shrink"  src="../assets/eop-logo.png" key="max-logo" style="width:80px;height:30px;"  />
                    <img v-show="shrink" src="../assets/eop-logo.png" key="min-logo" style="width:40px;height:15px;"/> -->
                <span v-show="!shrink" style="font-size:27px;font-weight:bold;;font-style:italic;">FMS<span style="font-size:16px;padding-left:10px" >{{Version?'('+Version+')':''}}</span></span>
                <span v-show="shrink" style="width:80px;height:30px;">FMS</span>
            </div>
        </shrinkable-menu>
    </div>
    <!-- <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}"> -->
    <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
        <div class="main-header">
           <div class="navicon-con">
                    <div :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)',cursor:'pointer'}" type="text" @click="toggleClick">
                        <Icon type="md-menu" size="23" />
                    </div>
            </div>
            <!-- <div class="header-middle-con">
                <div class="main-breadcrumb">
                    <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                </div>
            </div> -->
            <div class="header-avator-con">
                <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                <lock-screen v-if="false"></lock-screen>
                <change-mode style="padding-left:20px"></change-mode>
              
                <div class="user-dropdown-menu-con">
                    <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                        <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                            <a href="javascript:void(0)">
                                <span class="main-user-name">{{ userName }}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <!-- <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                    <DropdownItem name="deliveraddress">常用地址</DropdownItem> -->
                                <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                    </Row>
                </div>
            </div>
        </div>
        <div class="tags-con">
            <tags-page-opened :pageTagsList="pageTagsList" :tags="pageTagsList2"></tags-page-opened>
        </div>
    </div>
    <div class="single-page-con" style="top:80px" :style="{left: shrink?'60px':'200px'}">
        <div class="single-page">
            <keep-alive :include="cachePage">
                <router-view :key="key"></router-view>
            </keep-alive>
        </div>
    </div>
</div>
</template>

<script>
import changeMode from './main-components/changeMode.vue'
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
import tagsPageOpened from './main-components/tags-page-opened.vue';
import breadcrumbNav from './main-components/breadcrumb-nav.vue';
import fullScreen from './main-components/fullscreen.vue';
import lockScreen from './main-components/lockscreen/lockscreen.vue';
import themeSwitch from './main-components/theme-switch/theme-switch.vue';
import Cookies from 'js-cookie';
import util from '@/libs/util.js';

export default {
    components: {
        changeMode,
        shrinkableMenu,
        tagsPageOpened,
        breadcrumbNav,
        fullScreen,
        lockScreen,
        themeSwitch
    },
    data() {
        return {
            shrink: false,
            userName: '',
            Version :'',
            isFullScreen: false,
            openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
            pageTagsList2: [],
        };
    },
    computed: {
        key(){
	        return this.$route.path + Math.random();
	    },
        menuList() {
            return this.$store.state.app.menuList;
        },
        pageTagsList(n, o) {
            return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
        },
        currentPath() {
            return this.$store.state.app.currentPath; // 当前面包屑数组
        },
        avatorPath() {
            return localStorage.avatorImgPath;
        },
        cachePage() {
            return this.$store.state.app.cachePage;
        },
        lang() {
            return this.$store.state.app.lang;
        },
        menuTheme() {
            return this.$store.state.app.menuTheme;
        },
    },
    methods: {
    //     getAllKey(){
    //         const h = this.$createElement;
    //             let data = {}
    //             let i = null
    //             this.request('getAllAsyncTasks', data, true).then(res => {
    //                 if (res.code == 1) {
    //                     console.log(res.data.length,'8798789797987987897987987897897')
    //                     if(res.data.length > 0){
    //                         res.data.forEach((item,index) => {
    //                             this.timeAA[index] = setTimeout(()=>{
    //                                 data.taskKey = item
    //       this.request('getProcessResultByTaskKey', data, true).then(res => {
    //         if (res.code==1) {
    //           if(res.data.processStatus !== 0){
    //             this.$notify.success({
    //             title: res.data.title,
    //             // message: res.data.subTitle,
    //             message: h('p', null, [
    //                     h('a', {
    //                         on:{
    //                             click:this.clickA(res.data.subTitle)
    //                         }
    //                     }, ""),
    //                 ]),
    //             // showClose: false,
    //             duration: 0,
    //             }) 
    //             this.cleanKey(item)
    //             function myStopFunction() {
    //               clearTimeout(this.timeAA[index]);
    //             }
    //           }else{
    //             this.$notify.success({
    //             title: res.data.title,
    //             message: res.data.subTitle,
    //             // showClose: false,
    //             duration: 3000
    //           });
    //           }
    //         }else{
    //           this.message.warning(res.msg)
    //         }
    //           })
    //     },5000)
    //                         });
    //                         // for (i = 0; i < res.data.length; i++) { 
                                
    //                         // }
    //                     }
    //                     // this.user_resource = res.data;
    //                 }
    //             })
    //         },
    //         clickA(url){
    //     url.replace()
    //     let aPos = url.indexOf('[');
    //     let bPos = url.indexOf(']');
    //     let r = url.substr(aPos + 1, bPos - aPos - 1);
    //     window.location.href = r
    //   },
    //         cleanKey(key){
    //     let data = {}
    //     data.taskKey = key
    //     this.request('delByTaskKey', data, true).then(res => {
    //       if (res.code==1) {
    //         console.log('oooo')
    //         }
    //       })
    //   },
        init() {
            this.userName = Cookies.get('user');
            this.checkTag(this.$route.name);
        },
        getVersion(){
               this.request('masterData_versionLog_current',{},false).then(res=>{
                   if(res.code==1){
                       this.Version=res.data.versionNo
                   }
               })
        },
        toggleClick() {
            this.shrink = !this.shrink;
        },
        handleClickUserDropdown(name) {
            if (name === 'ownSpace') {
                util.openNewPage(this, 'ownspace_index');
                this.$router.push({
                    name: 'ownspace_index'
                });
            } else if (name === 'loginout') {
                // 退出登录
                this.loginout()
                // sessionStorage.clear()
            } else if (name == 'deliveraddress') {
                this.$router.push({
                    name: 'deliveraddress_list'
                });
            }
        },
        loginout() {
            sessionStorage.clear()
            localStorage.clear();
            this.$store.commit('clearAllTags');
            this.$store.commit('logout', this);
            this.$store.commit('clearOpenedSubmenu');
            this.$router.push({
                name: 'login'
            });
        },
        checkTag(name) {
            let openpageHasTag = this.pageTagsList.some(item => {
                if (item.name === name) {
                    return true;
                }
            });
            if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
            }
        },
        handleSubmenuChange(val) {
            // console.log(val)
        },
        beforePush(name) {
            return true;
        },
        fullscreenChange(isFullScreen) {
            // console.log(isFullScreen);
        },
        backToHome() {
            this.$router.push({
                name: 'home_index'
            });
        }
    },
    watch: {
        '$route'(to) {
            this.checkTag(to.name);
            localStorage.currentPageName = to.name;
        },
        lang() {
            util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
        }
    },
    mounted() {
        // this.getAllKey() // 获取所有key
        this.init();
        this.getVersion()
    },
    created() {
        //显示打开的页面的列表
        this.$store.commit('setOpenedList');
    }
};
</script>

<style lang="less">
    @import '../main.less';
</style>
<style>
      .ivu-tag-primary.ivu-tag-dot .ivu-tag-dot-inner{
          background:#98001e
      }
</style>
<template>
    <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="tags-outer-scroll-con">
        <div class="close-all-tag-con">
            <Dropdown transfer @on-click="handleTagsOption">
                <Button size="small" type="primary">
                    标签选项
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="clearAll">关闭所有</DropdownItem>
                    <DropdownItem name="clearOthers">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div ref="scrollBody" class="tags-inner-scroll-body" style="padding-left:16px" :style="{left: tagBodyLeft + 'px'}" v-show="mode==1">
            <transition-group name="taglist-moving-animation"  >
                <Tag
                    type="dot"
                    v-for="(item, index) in pageTagsList"
                    ref="tagsPageOpened"
                    :key="item.name"
                    :name="item.name"
                    @on-close="closePage"
                    @click.native="linkTo(item)"
                    :closable="item.name==='home_index'?false:true"
                    :color="item.children?(item.children[0].name===currentPageName?'primary':'default'):(item.name===currentPageName?'primary':'default')"
                >{{item.title}}</Tag>
            </transition-group>
            <!-- <transition-group name="taglist-moving-animation"  v-show="mode==2">{{this.$route.query.title}}
                <Tag
                    type="dot"
                    ref="tagsPageOpened"
                    color="primary"
                >{{this.$route.query.title}}</Tag>
            </transition-group> -->
        </div>
         <div  class="tags-inner-scroll-body" style="padding-left:16px"  v-if="mode!=1">
            <!-- <transition-group name="taglist-moving-animation">{{this.$route.query.title}} -->
                <Tag
                    type="dot"
                    color="primary"
                >{{this.title}}</Tag>
            <!-- </transition-group> -->
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import util from '@/libs/util.js';
export default {
    name: 'tagsPageOpened',
    data () {
        return {
            currentPageName: this.$route.name,
            tagBodyLeft: 70,
            refsTag: [],
            tagsCount: 1,
            title:''
        };
    },
    props: {
        pageTagsList: Array,
        beforePush: {
            type: Function,
            default: (item) => {
                return true;
            }
        }
    },
    computed: {
         mode(){
                 return this.$store.state.app.mode
            },
        title () {
            return this.$store.state.app.currentTitle;
        },
        tagsList () {
            return this.$store.state.app.pageOpenedList;
        }
    },
    watch:{
        // pageTagsList(n,o){
        //     console.log(n)
        // }
         mode(n,o){
            if(n==2){
                 this.title=this.$route.query.title?this.$route.query.title:document.title
             }  
         }
    },
    created(){
         //监听其他页面手动触发关闭指定页面事件
         this.$root.eventHub.$on('closePageFromOtherPage',(target) => {
            this.closePage('',target);
         });
    },
    methods: {
        itemTitle (item) {
            // let title = util.getTitleByPath(item.name)
            // if(title){
            //   return title
            // }
            // if (typeof item.title === 'object') {
            //     return item.title;
            // } else {
            //     return item.title;
            // }
        },
        closePage (event, name) {

            let pageOpenedList = this.$store.state.app.pageOpenedList;
            let lastPageObj = pageOpenedList[0];
            if (this.currentPageName === name) {
                let len = pageOpenedList.length;
                for (let i = 1; i < len; i++) {
                    if (pageOpenedList[i].name === name) {
                        if (i < (len - 1)) {
                            lastPageObj = pageOpenedList[i + 1];
                        } else {
                            lastPageObj = pageOpenedList[i - 1];
                        }
                        break;
                    }
                }
            } else {
                let tagWidth = event.target.parentNode.offsetWidth;
                this.tagBodyLeft = Math.min(this.tagBodyLeft + tagWidth, 0);
            }
            this.$store.commit('removeTag', name);
            this.$store.commit('closePage', name);
            pageOpenedList = this.$store.state.app.pageOpenedList;
            localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
            if (this.currentPageName === name) {
                this.linkTo(lastPageObj);
            }
        },
        linkTo (item) {
            console.log(item)
            let routerObj = {};
            routerObj.name = item.name;
            if (item.argu) {
                routerObj.params = item.argu;
            }
            if (item.query) {
                routerObj.query = item.query;
            }
            if (this.beforePush(item)) {
                this.$router.push(routerObj);
            }
            localStorage.setItem('activeMenu',item.path)
        },
        handlescroll (e) {
            var type = e.type;
            let delta = 0;
            if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
            }
            let left = 0;
            if (delta > 0) {
                left = Math.min(0, this.tagBodyLeft + delta);
            } else {
                if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
                    if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
                        left = this.tagBodyLeft;
                    } else {
                        left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100);
                    }
                } else {
                    this.tagBodyLeft = 0;
                }
            }
            this.tagBodyLeft = left;
        },
        handleTagsOption (type) {
            if (type === 'clearAll') {
                this.$store.commit('clearAllTags');
                this.$router.push({
                    name: 'home_index'
                });
            } else {
                this.$store.commit('clearOtherTags', this);
            }
            this.tagBodyLeft = 0;
        },
        moveToView (tag) {
            if (tag.offsetLeft < -this.tagBodyLeft) {
                // 标签在可视区域左侧
                this.tagBodyLeft = -tag.offsetLeft + 10;
            } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100) {
                // 标签在可视区域
                this.tagBodyLeft = Math.min(0, this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth - tag.offsetLeft - 20);
            } else {
                // 标签在可视区域右侧
                this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20);
            }
        }
    },
    mounted () {
        this.refsTag = this.$refs.tagsPageOpened;
        this.title=this.$route.query.title?this.$route.query.title:document.title
        if(this.mode==1){
             setTimeout(() => {
            this.refsTag.forEach((item, index) => {
                if (this.$route.name === item.name) {
                    let tag = this.refsTag[index].$el;
                    this.moveToView(tag);
                }
            });
        }, 1); // 这里不设定时器就会有偏移bug
        }
        this.tagsCount = this.tagsList.length;
    },
    watch: {
        '$route' (to) {
            this.currentPageName = to.name;
            this.title=to.meta.label
            this.$nextTick(() => {
                this.refsTag.forEach((item, index) => {
                    if (to.name === item.name) {
                        let tag = this.refsTag[index].$el;
                        this.moveToView(tag);
                    }
                });
            });
            this.tagsCount = this.tagsList.length;
        }
    }
};
</script>

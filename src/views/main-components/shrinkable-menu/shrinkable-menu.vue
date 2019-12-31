<style lang="less">
    @import './styles/menu.less';
    .left-sidebar {
        overflow: auto;
        // background-color: #48a7fb;
        background: linear-gradient(#98004f, #080B11);
        // background-image:  url('https://mimg.127.net/p/js6/theme/build/padingdunxiong/img/16033359d2c43167528d9038a03187bb6fe1b606.png');
        background-repeat: repeat-y;

    }
</style>

<template>
    <div class="ivu-shrinkable-menu left-sidebar">
        <slot name="top"></slot>
        <sidebar-menu 
            v-show="!shrink"
            :menu-theme="theme" 
            :menu-list="menuList" 
            :open-names="openNames"
            @on-change="handleChange"
        ></sidebar-menu>
        <sidebar-menu-shrink 
            v-show="shrink"
            :menu-theme="theme" 
            :menu-list="menuList" 
            :icon-color="shrinkIconColor"
            @on-change="handleChange"
        ></sidebar-menu-shrink>
    </div>
</template>

<script>
import sidebarMenu from './components/sidebarMenu.vue';
import sidebarMenuShrink from './components/sidebarMenuShrink.vue';
import util from '@/libs/util';
export default {
    name: 'shrinkableMenu',
    components: {
        sidebarMenu,
        sidebarMenuShrink
    },
    props: {
        shrink: {
            type: Boolean,
            default: false
        },
        menuList: {
            type: Array,
            required: true
        },
        theme: {
            type: String,
            default: 'dark',
            validator (val) {
                return util.oneOf(val, ['dark', 'light']);
            }
        },
        beforePush: {
            type: Function
        },
        openNames: {
            type: Array
        }
    },
    computed: {
        bgColor () {
            return this.theme === 'dark' ? '#495060' : '#fff';
        },
        shrinkIconColor () {
            return this.theme === 'dark' ? '#fff' : '#495060';
        }
    },
    methods: {
        handleChange (name) {
            let willpush = true;
            if (this.beforePush !== undefined) {
                if (!this.beforePush(name)) {
                    willpush = false;
                }
            }
            // if (willpush) {
            //     // util.uploadOperateLog('打开页面',name);
            //     this.$router.push({
            //         name: name
            //     });
            // }
            this.$emit('on-change', name);
        }
    }
};
</script>

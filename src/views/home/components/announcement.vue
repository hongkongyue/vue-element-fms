<style>
    #announcement {
        position: relative;
        height: 148px;
        width: 100%;
        overflow: hidden;
    }
    #announcement #content{
        position: absolute;
        top:0;
        left:0;
    }
    #announcement .Timeline {
        width: 100%;
        overflow: hidden;
        font: 12px/16px tahoma;
        display: block;
        text-decoration: none;
        margin: 2px;
        color: #000;
        padding-left: 2px;
        text-align: left;
    }

    #announcement .Timeline > .TimelineItem:hover {
        color: #ff6600;
    }
</style>
<template>
    <div id="announcement" style="height:150px;">
        <div id="content" ref="announcement_content">
            <div
                v-for="(item,index) in announcementList"
                :key="index"
                class="Timeline"
            >
                <div color="green" class="TimelineItem">
                    <div class="content">
                        <span v-html="item.boardText"></span>
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'announcement',
        props: {
            announcement: Array
        },
        data() {
            return {
                announcementList: [],
                animate: false,
                boardList: []
            }
        },
        mounted() {
            this.request('get_public_board').then(res => {
                if (res.code == 1) {
                    this.announcementList = res.data;
                }
            })
            this.scroll();
        },
        destroyed(){
            clearInterval(this.MyMar)
        },
        methods: {
            scroll() {
                var that = this;
                var speed = 30;
                var announcement = document.getElementById("announcement");
                var content = document.getElementById("content");
                this.$nextTick(() => {
                    let index = 0;
                    // let direction = 'down';
                    function Marquee() {
                        // if (direction == 'up') {
                            // index--;
                            // that.$refs['announcement_content'].style.top = index + 'px';
                            // if(index == -(content.offsetHeight)){
                            //     direction = 'down'
                            // }
                        // } else {
                            let content = document.getElementById('content');
                            
                            if(index >= 150){
                                index = -content.offsetHeight;
                                that.$refs['announcement_content'].style.top = -(content.offsetHeight) + 'px';
                            }else{
                                index++;                                
                                that.$refs['announcement_content'].style.top = index + 'px';
                                announcement.scrollTop -= content.offsetHeight;
                            }
                            // if(index == 148){
                            //     direction = 'up';
                            // }
                        // }
                    }
                    that.MyMar = setInterval(Marquee, speed)
                    announcement.onmouseover = function () {
                        clearInterval(that.MyMar)
                    }
                    announcement.onmouseout = function () {
                        that.MyMar = setInterval(Marquee, speed)
                    }
                })
            }
        }
    };
</script>



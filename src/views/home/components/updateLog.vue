<template>
<span>
    <div style="height:150px;overflow-y: scroll;padding:0 5px 0 5px">
        <Timeline v-for="item in updateLogList" :key="item.id">
            <TimelineItem color="green">
                <p class="time pointer" @click="selected(item)" :class="{active: active == item}">{{item.summary}}</p>
            </TimelineItem>
        </Timeline>
    </div>
    <Modal v-model="changeVisible" @on-cancel="changeCancel" :styles="mystyle" title="发版内容" :width="710" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" :model="showDta" class="demo-form-inline demo-ruleForm" :label-position="left">
                <Col>
                    <span v-html="showDta.releaseContent?showDta.releaseContent:'暂无内容'"></span>
                </Col>
            </el-form>

        </Row>
        <div slot="footer"></div>
    </Modal>
</span>
</template>

<script>
export default {
    name: 'updateLog',
    props: {
        updateLog: Array
    },
    data() {
        return {
            updateLogList: [],
            active: '',
            changeVisible: false,
            showDta: '',
        }
    },
    methods: {
        selected(name) {
            this.showDta = name
            this.active = name;
            this.changeVisible = true
        },
        changeCancel() {
            this.changeVisible = false
        }
    },
    mounted() {
        this.request('masterData_versionLog_page', {
            currentPage: 1,
            pageSize: 10,
        }, false).then((res) => {
            if (res.code == 1) {
                this.updateLogList = res.data.records

            }
        })
    }
};
</script>

<style lang="less" scoped>
.pointer {
    cursor: pointer;
}

.active {
    color: #19be6b;
    font-size: 12px;
}
</style>

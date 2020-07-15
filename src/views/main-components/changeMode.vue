<template>
<span>
    <Tooltip content="点击切换浏览模式" placement="bottom">
        <Icon type="md-aperture" :size="23" style="cursor:pointer" @click="showModal" />
    </Tooltip>
    <Modal v-model="dialogVisible" :styles="mystyle" title="切换浏览模式" @on-cancel='cancel' :width="540" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" class="demo-form-inline demo-ruleForm " :label-position="left">
                <Col>
                <RadioGroup v-model="disabledGroup">
                    <Radio label="新开窗口浏览"></Radio>
                    <Radio label="窗口内浏览"></Radio>
                </RadioGroup>
                </Col>
                <el-form-item style="padding-left:190px">
                    <Button type="primary" @click="confirmSub">确认</Button>
                    <Button type="default" @click="cancel">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
</span>
</template>

<script>
export default {
    name: 'changeMode',
    data() {
        return {
            dialogVisible: false,
            disabledGroup: this.$store.state.app.mode == 1 ? '窗口内浏览' : '新开窗口浏览'
        }
    },
    methods: {
        showModal() {
            this.$store.state.app.mode == 1 ? this.disabledGroup = '窗口内浏览' : this.disabledGroup = '新开窗口浏览'
            this.dialogVisible = true
        },
        confirmSub() {
            if (this.disabledGroup == "窗口内浏览") {
                this.$store.commit('becomeSingle')
                this.$store.commit('clearAllTags'); //清除头部标签
                this.dialogVisible = false
            } else {
                this.$route.query.title='haah'
                this.$store.commit('becomeMore')
                this.$store.commit('clearAllTags'); //清除头部标签
                this.dialogVisible = false
            }
        },
        cancel() {
            this.dialogVisible = false
        }
    },
    created() {

    }
};
</script>

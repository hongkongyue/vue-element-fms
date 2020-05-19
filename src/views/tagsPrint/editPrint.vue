<template>
<div>
    <section class="middle" :style="allHeight">
        <p style="font-weight:900;font-size:14px">编辑申请</p>
        <el-divider></el-divider>
        <el-form :inline="true" :model="formSearch" label-width="100px" class="demo-form-inline ">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="任务号：" size="small">
                        {{mainData.taskNo}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="申请人：" size="small">
                        {{userName}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="品牌：" size="small">
                        {{mainData.scmBrandName}}
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-divider></el-divider>
        <div style="margin-bottom:20px">
            <el-button size="small" type="primary" @click="onAdd">新增明细</el-button>
            <el-button size="small" type="primary" @click="onDelete">删除</el-button>
            <!-- <el-button size="small" type="primary" @click="onEdit">编辑</el-button> -->
            <el-button size="small" type="primary" @click="onSave">保存</el-button>
            <el-button size="small" type="primary" @click="onCancel">取消</el-button>
            <el-checkbox style="margin-left:20px" v-model="fristChecked" @change="changeCheckOne(fristChecked)">合格证打印全选</el-checkbox>
            <el-checkbox v-model="secondChecked" @change="changeCheckTwo(secondChecked)">洗水唛打印全选</el-checkbox>
        </div>

        <el-table :data="tableList" @selection-change="handleSelectionChange" style="width: 100%" border tooltip-effect="dark" :max-height="maxTableHight" size="mini">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
            <el-table-column prop="goodsNo" label="大货款号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="colorName" label="颜色" align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="tagColorCode" label="颜色代码" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="scmSize" label="尺码" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <!-- <el-table-column prop="SKU" label="SKU" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column> -->
            <el-table-column prop="applyNum" label="申请数量" min-width="150" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input-number style="min-width:110px;" v-model="scope.row.applyNum" precision="0" size="mini" controls-position="right" :min="1" :max="10000"></el-input-number>
                    <!-- <el-input   style="min-width:110px;" v-model="scope.row.applyNum" @keyup.native="number($event)"></el-input> -->
                </template>
            </el-table-column>
            <el-table-column prop="certNeeded" label="合格证打印" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.certNeeded"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column prop="washLabelNeeded" label="洗水唛打印" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.washLabelNeeded"></el-checkbox>
                </template>
            </el-table-column>
             <el-table-column prop="certDataStatus" label="合格证" min-width="120" align="center">
                        <template slot-scope="scope">
                            {{scope.row.certDataStatus == -1 ? '' : (scope.row.certDataStatus == 1 ? '获取完成' : (scope.row.certDataStatus == 0 ? '无需获取' : '获取失败'))}}
                            
                            <!-- <p v-if="scope.row.certDataStatus == '0'">{{'无需获取'}}</p>
                            <p v-if="scope.row.certDataStatus == '2'">{{'获取失败'}}</p> -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="washLabelDataStatus" label="洗水唛" min-width="120" align="center">
                        <template slot-scope="scope">
                            {{scope.row.washLabelDataStatus == -1 ? '' : (scope.row.washLabelDataStatus == 1 ? '获取完成' : (scope.row.washLabelDataStatus == 0 ? '无需获取' : '获取失败'))}}
                        </template>
                    </el-table-column>
        </el-table>
    </section>
    <!-- 新增 -->
    <Modal v-model="visible" :styles="mystyle" :rules="rules" title="新增明细" @on-cancel='cancelAdd' :width="470" @on-ok="editSubmit" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="addformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                
                <Col>
                <el-form-item label="款号" size="small" label-width="95px" prop="platform">
                    <el-input v-model="addformdata.goodsNo" @blur="blurGoodsNo(addformdata.goodsNo)" maxlength="30" style="width:200px"></el-input>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="颜色" size="small" label-width="95px">
                    <el-select v-model="addformdata.color" @change="changeColor(addformdata.color)" filterable placeholder="请选择" style="width:200px">
                        <el-option v-for="item in colorList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="尺码" size="small" label-width="95px">
                    <el-select v-model="addformdata.size" multiple filterable placeholder="请选择" style="width:200px">
                        <el-option v-for="item in sizeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                
            </el-form>
        </Row>
        <div slot="footer">
            <Button type="default" @click="cancelAdd">取消</Button>
                <Button type="primary" @click="saveAdd">确认</Button>
                
        </div>
    </Modal>
</div>
</template>

<script>
export default {
    name: 'editPrint',
    data() {
        return {
            testList: [{
                name: '撒旦发射点',
                color: 'red',
                age: '18',
                num: 3
            }, {
                name: '豆腐干地方',
                color: 'hei',
                age: '28',
                num: 2
            }, {
                name: '士大夫',
                color: 'bai',
                age: '8',
                num: 4
            }],
            maxTableHight: null,
            allHeight: null,
            fristChecked: false,
            secondChecked: false,
            brandList: [],
            tableList: [],
            formSearch: {},
            visible: false,
            addformdata: {
                color: '',
                size: []
            },
            colorList: [],
            sizeList: [],
            skuList: [], //做重复校验
            selectionList: [], //选中的数据
            clickFlag: false,
            userName: '',
            mainData:{},
        }
    },
    computed: {},
    mounted() {
        this.getMainData()
        this.getBrandList()
        this.getDetailData()
        this.userName = JSON.parse(window.sessionStorage.getItem('userinfo')).userName
        if (window.screen.height > 1000) {
            this.allHeight = "height:840px"
            this.maxTableHight = 580
        } else {
            this.allHeight = "height:620px"
            this.maxTableHight = 350
        }
    },
    
    destroyed() {

    },
    methods: {
        //获取明细数据
        getDetailData(){
            let data = {}
            data.applyIds = [this.$route.query.id]
            this.request('washlabel_getDetailByQo', data, false).then(res => {
                if (res.code == '1') {
                    this.tableList = res.data
                    let list = []
                    this.tableList.map((item)=>{
                        list.push(item.goodsNo+item.colorId+item.scmSize)
                        this.$set(item,'SKU',item.goodsNo+item.colorId+item.scmSize)
                        if(item.certNeeded == 1){
                            this.$set(item,'certNeeded',true)
                        }else{
                            this.$set(item,'certNeeded',false)
                        }
                        if(item.washLabelNeeded == 1){
                            this.$set(item,'washLabelNeeded',true)
                        }else{
                            this.$set(item,'washLabelNeeded',false)
                        }
                    })
                    setTimeout((i)=>{
                        this.skuList = list
                    },300)
                }
            })
        },
        //获取主表数据
        getMainData() {
            let data = {}
            data.id = this.$route.query.id
            this.request('washlabel_getMainOrderById', data, false).then(res => {
                if (res.code == 1) {
                    this.mainData = res.data
                }
            })
        },
        //获取品牌下拉
        getBrandList() {
            let data = {}
            this.request('washlabel_brandSelector', data, false).then(res => {
                if (res.code == 1) {
                    this.brandList = res.data
                }
            })
        },
        //校验款号
        blurGoodsNo(name) {
            this.addformdata.color = ''
            this.sizeList = []
            this.colorList = []
            this.addformdata.size = []
            let data = {}
            data.goodsNo = name
            data.brandName = this.mainData.scmBrandName
            this.request('washlabel_checkGoodsNoExist', data, true).then(res => {
                if (res.code == 1) {
                    this.colorList = res.data
                } else {
                    this.addformdata.color = ''
                    this.sizeList = []
                    this.colorList = []
                    this.addformdata.size = []
                    this.$message.error(res.msg)
                }
            })
        },
        //获取尺码
        changeColor(name) {
            let data = {}
            data.goodsNo = this.addformdata.goodsNo
            data.color = name
            this.request('washlabel_getSizeByGoodsNoAndColor', data, true).then(res => {
                if (res.code == 1) {
                    this.sizeList = res.data
                } else {
                    this.$message.error(res.msg)
                    this.sizeList = []
                    this.addformdata.size = []
                }
            })
        },
        test() {
            let list = []
            this.testList.map((item) => {
                for (let i = 0; i < item.num; i++) {
                    list.push(item)
                }
            })
            let newList = []
            let twoList = []
            list.map((v, index) => {
                if (index % 2 == 0) {
                    newList.push({
                        name: v.name,
                        color: v.color,
                        age: v.age,
                        num: v.num
                    })
                } else {
                    twoList.push({
                        name: v.name,
                        color: v.color,
                        age: v.age,
                        num: v.num
                    })
                }
            })
            if (newList.length > twoList.length) {
                twoList.push({
                    name: '',
                    color: '',
                    age: '',
                    num: ''
                })
            }
            let oldList = []
            for (let v = 0; v < newList.length; v++) {
                oldList.push({
                    name1: newList[v].name,
                    name2: twoList[v].name,
                    color1: newList[v].color,
                    color2: twoList[v].color,
                    age1: newList[v].age,
                    age2: twoList[v].age,
                    num1: newList[v].num,
                    num2: twoList[v].num,

                })
            }
            let content = []
            oldList.map((item) => {
                content.push({
                    data: item,
                    url: item.name
                })
            })
        },
        //申请数量格式校验
        // number(e) {
        //     let flag = new RegExp("^[1-9]([0-9])*$").test(e.target.value);
        //     if (!flag) {
        //         this.$message({
        //             showClose: true,
        //             message: "请输入正整数",
        //             type: "warning"
        //         });
        //         // e.target.value = 1
        //     }
        // },
        //新增
        onAdd() {
                this.visible = true
        },
        //保存新增
        saveAdd() {
            if (!this.addformdata.goodsNo) {
                this.$message.error('请先填写大货款号')
            } else if (!this.addformdata.color) {
                this.$message.error('请选择颜色')
            } else if (!this.addformdata.size) {
                this.$message.error('请选择尺码')
            } else {
                let brand = this.mainData.scmBrandName
                let brandobj = {} //获取品牌所有信息
                this.brandList.map((i) => {
                    if (brand == i.name) {
                        brandobj = i
                    }
                })
                //获取颜色所有信息
                let color = this.addformdata.color
                let colorobj = {}
                this.colorList.map((i) => {
                    if (color == i.name) {
                        colorobj = i
                    }
                })
                //获取尺码所有信息
                let size = this.addformdata.size
                let sizeobj = {}
                this.sizeList.map((i) => {
                    if (size == i.name) {
                        sizeobj = i
                    }
                })

                let flag = false
                let a = this.addformdata.goodsNo
                let list = this.tableList
                let skulist = this.skuList
                let newSizeList = []
                //选的尺码
                this.addformdata.size.map((i) => {
                    this.sizeList.map((y) => {
                        if (i == y.name) {
                            newSizeList.push(y)
                        }
                    })
                })

                newSizeList.map((item) => {
                    if (skulist.indexOf(a + '-' + colorobj.id + '-' + item.scmSize) == -1) {
                        list.push({
                            goodsNo: a, //大货款号
                            scmBrandId: brandobj.id,
                            brandTagDisplayName: brandobj.code,
                            brandName: brandobj.name, //品牌
                            scmSizeConfBizCode: item.code,
                            scmGoodsManagerId: item.scmGoodsManagerId,
                            scmSizeName: item.name,
                            scmSize: item.scmSize,
                            scmSizeId: item.id, //尺码
                            colorName: colorobj.name,
                            colorId: colorobj.id,
                            tagColorCode: colorobj.code, //颜色
                            applyNum: 1, //打印数量
                            washLabelNeeded: true,
                            certNeeded: true,
                            SKU: a + '-' + colorobj.id + '-' + item.scmSize
                        })
                        skulist.push( //用于判断sku是否重复
                            a + '-' + colorobj.id + '-' + item.scmSize
                        )
                    } else {
                        flag = true //避免多次弹出提示信息
                    }
                })
                if (flag) {
                    this.$message.warning('已去除重复数据')
                }
                this.skuList = skulist
                this.tableList = list
                this.visible = false
                this.addformdata = {
                    color: '',
                    size: []
                }
            }
        },
        //取消新增
        cancelAdd() {
            this.addformdata = {
                color: '',
                size: []
            }
            this.colorList = []
            this.sizeList = []
            this.visible = false
        },
        //合格证打印全选
        changeCheckOne(check) {
            if (check === false) {
                this.tableList.map((item) => {
                    this.$set(item, 'certNeeded', false)
                })
            } else {
                this.tableList.map((item) => {
                    this.$set(item, 'certNeeded', true)
                })
            }
        },
        //洗水唛打印全选
        changeCheckTwo(check) {
            if (check === false) {
                this.tableList.map((item) => {
                    this.$set(item, 'washLabelNeeded', false)
                })
            } else {
                this.tableList.map((item) => {
                    this.$set(item, 'washLabelNeeded', true)
                })
            }
        },
        handleSelectionChange(selection) {
            this.selectionList = selection
        },
        //删除
        onDelete() {
            if (this.selectionList.length == 0) {
                this.$message.warning('请先选中删除的数据')
            } else {
                this.selectionList.map((i, index) => {
                    this.tableList.map((y, t) => {
                        if (i.SKU == y.SKU) {
                            this.tableList.splice(t, 1)
                        }
                    })
                })
                let list = []
                this.tableList.map((item) => {
                    list.push(item.SKU)
                })
                this.skuList = list
            }
        },
        //保存
        onSave() {
            if (this.tableList.length == 0) {
                this.$message.warning('明细不能为空')
            } else {
                //保存接口 保存成功之后关闭新增页面 跳转打印申请
                let data = {}
                let scmBrandId = ''
                this.brandList.map((i) => {
                    if (this.mainData.scmBrandName == i.name) {
                        scmBrandId = i.id
                    }
                })
                data.applyId = this.$route.query.id
                data.detailCreateFOS = this.tableList
                this.request('washlabel_updateTask', data, true).then(res => {
                    if (res.code == 1) {
                        this.$message.success('保存成功')
                        let name = this.$route.query.code
                        this.$root.eventHub.$emit('closePageFromOtherPage', 'editPrint'); //关闭新增页面
                        this.$router.push({ //跳转打印申请
                            name: 'applyForPrint',
                            query: {
                                code: name
                            }
                        });
                    } else {
                        this.$message.error(res.msg)
                    }
                })

            }
        },
        //取消
        onCancel() {
            let name = this.$route.query.code
            this.$root.eventHub.$emit('closePageFromOtherPage', 'addPrint'); //关闭新增页面
            this.$router.push({ //跳转打印申请
                name: 'applyForPrint',
                query: {
                    code: name
                }
            });
        },
    }
}
</script> 

<style lang="less" scoped>
.headerstyle,
.main,
.middle,
.footer {
    width: 99%;
    margin: 0 auto;
    background: #fff;
    padding: 20px 20px 10px 20px;
    margin-bottom: 10px;
}

.getmore {
    padding-top: 6px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
}

.pointer {
    cursor: pointer;
}

.pl20 {
    padding-left: 20px
}
</style>

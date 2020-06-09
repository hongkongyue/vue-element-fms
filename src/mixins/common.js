export const commonMixins = {
    data() {
        return {
            getkeyNum: 0,
            materialTypeList: [],//大类列表
            brandList: [],
            seasonList: [{ name: '春季', value: '春季' }, { name: '夏季', value: '夏季' }, { name: '秋季', value: '秋季' }, { name: '冬季', value: '冬季' }],
            waveList: [],//波段下拉列表
            departmentList: [],//部门下拉列表
            staffList: [],//员工下拉列表
            planningStatusList: [],//企划状态
            adjustTypeList: [],//调整类型
            secondLevel: [],//二级品类列表
            groupList: ["01","02"],//组别
            developStatusList: [],//开发类型
            yearList:[],//年份
        }
    },

    mounted() {
        //  this.getYearList()
        //  this.getBrandList()
        //  this.getwaveList()
        //  this.getStaffList()
        //  this.getDepartmentList()
        //  this.getAdjustType()
        //  this.getPlanningStatus()
        //  this.getSecondLevel()
    },
    methods: {
        //获取年份
        getYearList(){
            this.request('year_list', {}, true).then(res => {
                if (res.code == 1) {
                    this.yearList = res.data
                }
            })
        },
        //获取开发类型
        getDevelopStatusList() {
            this.request('waveBand_selector', {}, true).then(res => {
                if (res.code == 1) {
                    this.developStatusList = res.data
                }
            })
        },
        //获取二级品类
        getSecondLevel() {
            this.request('masterData_basicStyleType_getSecondLevel', {}, true).then(res => {
                if (res.code == 1) {
                    this.secondLevel = res.data
                }
            })
        },
        //获取调整类型
        getAdjustType() {
            this.request('goods_planning_manage_constant', { type: "planning_status" }, true).then(res => {
                if (res.code == 1) {
                    this.planningStatusList = res.data
                }
            })
        },
        //获取企划状态
        getPlanningStatus() {
            this.request('goods_planning_manage_constant', { type: "planning_adjust_type" }, true).then(res => {
                if (res.code == 1) {
                    this.adjustTypeList = res.data
                }
            })
        },
        //取货品牌列表
        getBrandList() {
            this.request('masterData_brand_selector', {}, true).then(res => {
                if (res.code == 1) {
                    this.brandList = res.data
                }
            })
        },
        //获取波段列表
        getwaveList() {
            this.request('waveBand_selector_masterData', {}, true).then(res => {
                if (res.code == 1) {
                    this.waveList = res.data
                }
            })
        },
        //获取部门下拉列表
        getDepartmentList() {
            this.request('masterData_department_selector', {}, true).then(res => {
                if (res.code == 1) {
                    this.departmentList = res.data
                }
            })
        },
        //获取员工下拉列表
        getStaffList() {
            this.request('masterData_staff_singleSelector', {}, true).then(res => {
                if (res.code == 1) {
                    this.staffList = res.data
                }
            })
        },
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //重置搜索条件
        onReset() {
            if (this.formSearch) {
                for (let i in this.formSearch) {
                    this.formSearch[i] = ''
                }
            }
        },
        getMaterialType() {
            this.request('materialType_selector', { level: 1 }, false).then(res => {
                if (res.code == 1) {
                    this.materialTypeList = res.data
                } else {
                    this.materialTypeList = []
                }
            })
        },
        // 导出 或 需要下载文件
        getKey(key) {
            if (this.getkeyNum > 0) {
                const h = this.$createElement;
                let data = {}
                data.taskKey = key
                this.timeAA = setTimeout(() => {
                    this.request('getProcessResultByTaskKey', data, false).then(res => {
                        if (res.code == 1) {
                            if (res.data.processStatus !== 0) {
                                if (res.data.subTitle.indexOf('[') !== -1) {
                                    this.clickA(res.data.subTitle)
                                }
                                this.$notify.success({
                                    title: res.data.title,
                                    message:
                                        h('a', {
                                            props: {
                                                type: 'primary',
                                            },
                                            on: {
                                                click: () => {
                                                    this.clickA(res.data.subTitle)
                                                }
                                            }
                                        }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : "下载"),
                                    duration: 0,
                                });
                                this.cleanKey(key)
                                this.getkeyNum = 0
                                function myStopFunction() {
                                    clearTimeout(this.timeAA);
                                }

                            } else {
                                this.getkeyNum++
                                this.$notify.success({
                                    title: res.data.title,
                                    message: res.data.subTitle,
                                    duration: 3000
                                });
                                this.getKey(key)
                            }
                        } else {
                            this.getkeyNum = 0
                            this.$message.warning(res.msg)
                        }
                    })
                }, 5000)
            } else {
                this.$notify({
                    title: '请稍等',
                    message: ('i', { style: 'color: teal' }, '正在执行！请稍等')
                });
                const h = this.$createElement;
                let data = {}
                data.taskKey = key
                this.timeAA = setTimeout(() => {
                    this.request('getProcessResultByTaskKey', data, false).then(res => {
                        if (res.code == 1) {
                            if (res.data.processStatus !== 0) {
                                if (res.data.subTitle.indexOf('[') !== -1) {
                                    this.clickA(res.data.subTitle)
                                }
                                this.$notify.success({
                                    title: res.data.title,
                                    message:
                                        h('a', {
                                            props: {
                                                type: 'primary',
                                            },
                                            on: {
                                                click: () => {
                                                    this.clickA(res.data.subTitle)
                                                }
                                            }
                                        }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : "下载"),
                                    duration: 0,
                                });
                                this.cleanKey(key)
                                this.getkeyNum = 0
                                function myStopFunction() {
                                    clearTimeout(this.timeAA);
                                }

                            } else {
                                this.getkeyNum++
                                this.$notify.success({
                                    title: res.data.title,
                                    message: res.data.subTitle,
                                    duration: 3000
                                });
                                this.getKey(key)
                            }
                        } else {
                            this.getkeyNum = 0
                            this.$message.warning(res.msg)
                        }
                    })
                }, 5000)
            }
        },
        // 导入 或不需下载文件
        getKeyD(key) {
            if (this.getkeyNum > 0) {
                let data = {}
                data.taskKey = key
                this.timeBB = setTimeout(() => {
                    this.request('getProcessResultByTaskKey', data, false).then(res => {
                        if (res.code == 1) {
                            if (res.data.processStatus !== 0) {

                                this.$notify.success({
                                    title: res.data.title,
                                    message: res.data.subTitle,
                                    // showClose: false,
                                    duration: 0,
                                });
                                this.cleanKey(key)
                                this.getkeyNum = 0
                                function myStopVFunction() {
                                    clearTimeout(this.timeBB);
                                }
                            } else {
                                this.getkeyNum++
                                this.$notify.success({
                                    title: res.data.title,
                                    message: res.data.subTitle,
                                    // showClose: false,
                                    duration: 3000
                                });
                                this.getKeyD(key)
                            }
                        } else {
                            this.getkeyNum = 0
                            this.message.warning(res.msg)
                        }
                    })
                }, 5000)
            } else {
                this.$notify({
                    title: '请稍等',
                    message: ('i', { style: 'color: teal' }, '正在执行！请稍等')
                });
                let data = {}
                data.taskKey = key
                this.timeBB = setTimeout(() => {
                    this.request('getProcessResultByTaskKey', data, false).then(res => {
                        if (res.code == 1) {
                            if (res.data.processStatus !== 0) {

                                this.$notify.success({
                                    title: res.data.title,
                                    message: res.data.subTitle,
                                    // showClose: false,
                                    duration: 0,
                                });
                                this.cleanKey(key)

                                function myStopVFunction() {
                                    clearTimeout(this.timeBB);
                                }
                            } else {
                                this.$notify.success({
                                    title: res.data.title,
                                    message: res.data.subTitle,
                                    // showClose: false,
                                    duration: 3000
                                });
                                this.getKeyD(key)
                            }
                        } else {
                            this.message.warning(res.msg)
                        }
                    })
                }, 5000)
            }
        },
        clickA(url) {
            console.log(url)
            if (url.indexOf('[') == -1) {
                console.log('没有地址')
            } else {
                url.replace()
                let aPos = url.indexOf('[');
                let bPos = url.indexOf(']');
                let r = url.substr(aPos + 1, bPos - aPos - 1);
                window.location.href = r
            }
        },
        cleanKey(key) {
            let data = {}
            data.taskKey = key
            this.request('delByTaskKey', data, false).then(res => {
                if (res.code == 1) {
                    console.log('oooo')
                }
            })
        },
    }
}

<template>
        <div>
              <Modal v-model="visible" title="导入文件" @on-cancel='cancelImport'>
                   
                    <el-form :inline="true" ref="editForm" :model="adjustObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                           <el-form-item label="公司：" size="small" label-width="95px" prop="basicCompanyId">
                            <el-select v-model="formSearch.basicCompanyId" filterable clearable placeholder="请选择" style="width:200px">
                                  <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                            </el-form-item>  
                             <div>
                                <Upload ref="upload" name="file" :show-upload-list="false" :before-upload="handleUpload" :on-success="uploadSuccess" :on-error="uploadError" type="drag" action="/eop-boot/acc/acc-payment/uploadAsync" :data="{}">
                                    <div style="padding: 20px 0">
                                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                        <p>点击或将文件拖拽到此处</p>
                                    </div>
                                </Upload>
                                <div v-if="file !== null">{{file.name}}
                                    <Button type="text" :loading="loadingStatus">{{ loadingStatus ? '上传中...' : '' }}
                                    </Button>
                                </div>
                            </div>
                            <div slot="footer">
                                <Button type="default" @click="cancelImport">取消</Button>
                                <Button type="primary" @click="upload">确定</Button>
                            </div>
                    </el-form>
            </Modal>
        </div>
</template>
<script>
         export default{
                 name:'import',
                 props:['companyList'],
                 data(){
                        return{
                              visible:false,
                              file: null,
                              loadingStatus:false, 
                              importURL:'/eop-boot/acc/acc-payment/uploadAsync',
                              formSearch:{
                                  basicCompanyId:''
                              },
                              rules:{
                           basicCompanyId: [{
                                required: true,
                                                message: '请选择',
                                                trigger: 'change'
                                }],
                                },
                        }
                 },
                 mounted(){

                 },
                 methods:{
                       resetForm(name) {
                            this.$refs[name].resetFields();
                        },
                        submitForm(formName) {
                            this.$refs[formName].validate((valid) => {
                                if (valid) {
                                    this.saveEdit()
                                } else {
                                    return false;
                                }
                            });
                        },
                        upload() {
                                    if (this.file == null) {
                                        this.$message.warning('请先选择文件再导入')
                                    } else {
                                        alert(1)
                                        // this.$refs['upload'].post(this.file);
                                        let data = new FormData
                                        data.append('file', this.file)
                                        this.request('acc_acc_payment_uploadAsync', data, true).then((res) => {
                                            if (res.code == 1) {
                                                this.getKey(res.data)
                                                this.file = null;
                                            }
                                        })
                                        this.visible = false
                                    }
                        },
                        //上传之前
                        handleUpload(file) {
                            if (!/\.xls$|.xlsx$|.csv$|.xlsm$/.test(file.name)) {
                                this.$message.warning('文件类型不符,请重新选择文件');
                                return false
                            } else {
                                this.file = file //需要传给后台的file文件
                                this.name = file.name
                            }
                            return false
                        },
                        //上传成功之后
                        uploadSuccess(res, file) {
                            Vue.prototype.$loading.close();
                            if (res.code == '1') {
                                this.loadingStatus = false;
                                this.file = null;
                                this.getKey(res.data)

                            } else {
                                this.loadingStatus = true;
                                this.$message.error({
                                    content: res.msg,
                                    duration: 3
                                });
                            }
                        },
                        uploadError(res, file) {
                            this.$message.error(res.msg);
                        },
                        cancelImport() {
                            this.file = null
                            this.visible = false
                        },
                         getKey(key) {
                                const h = this.$createElement;
                                let data = {}
                                data.taskKey = key
                                this.timeAA = setTimeout(() => {
                                    this.request('getProcessResultByTaskKey', data, false).then(res => {
                                        if (res.code == 1) {
                                            if (res.data.processStatus !== 0) {

                                                this.$notify.success({
                                                    title: res.data.title,
                                                    message: h('p', null, [
                                                        h('a', {
                                                            on: {
                                                                click: this.clickA(res.data.subTitle)
                                                            }
                                                        }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : "下载链接"),
                                                    ]),
                                                    duration: 0,
                                                });
                                                this.cleanKey(key)

                                                function myStopFunction() {
                                                    clearTimeout(this.timeAA);
                                                }

                                            } else {
                                                this.$notify.success({
                                                    title: res.data.title,
                                                    message: res.data.subTitle,
                                                    duration: 3000
                                                });
                                                this.getKey(key)
                                            }
                                        } else {
                                            this.$message.warning(res.msg)
                                        }
                                    })
                                }, 5000)
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
                 },
         }
</script>
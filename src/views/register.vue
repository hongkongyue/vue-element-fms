<template>
    <div class="register" style="background-color:white;height:100%;width:100%">
    <Row class="header">
    <Col span="6" offset="5">
        <span class="title">EOP管理平台 | 用户注册</span>
    </Col>
    <Col span="4" offset="9">
        <span @click="login" class="logintip">登录</span>
    </Col>
　　</Row>
    <Row style="padding-top: 25vh;" type="flex" justify="space-around">
       <Col span="16" offset="6">
        <Steps :current="currentStep">
         <Step  content="填写邮箱"></Step>
            <Step title="" content="输入验证码"></Step>
            <Step title="" content="填写信息"></Step>
        </Steps>
       </Col>
       <Col  span="6" style="margin-top:60px;">
           <Form  ref="registerForm" :model="registerForm" :rules="ruleValidate" :label-width="90">
                <FormItem v-show="currentStep==0" style="width:300px;" label="邮箱地址：">
                    <Input v-model="registerForm.email"  placeholder="请输入邮箱地址"></Input>  
                      <Alert style="margin-top:8px;" type="warning" show-icon>请填写公司邮箱注册!</Alert>
                </FormItem>
                 <FormItem v-show="currentStep==1">
                   <Alert type="info" show-icon>请输入验证码</Alert>
                  <vue-input-code span-size="20px" type="number" :number="4" height="50px" span-color="#f35252" input-color="#3498db" input-size="24px" :code="code" :getinput="getInput" :success="inputSuccess"></vue-input-code>
                </FormItem>
                <FormItem prop="pwd" v-show="currentStep==2" style="width:300px;" label="密码：">
                    <Input type="password" v-model="registerForm.pwd" autocomplete="off" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem prop="checkpwd" v-show="currentStep==2" style="width:300px;" label="确认密码：">
                    <Input type="password" v-model="registerForm.checkpwd" autocomplete="off" placeholder="请再次输入密码"></Input>
                </FormItem>
                <FormItem prop="userName" v-show="currentStep==2" style="width:300px;" label="真实姓名：">
                    <Input type="text" v-model="registerForm.userName" autocomplete="off" placeholder="请输入真实姓名"></Input>
                </FormItem>
                <FormItem prop="userAccount" v-show="currentStep==2" style="width:300px;" label="账号：">
                    <Input type="text" v-model="registerForm.userAccount" autocomplete="off" placeholder="请输入账号"></Input>
                </FormItem>
                <FormItem prop="mobilePhoneNo" v-show="currentStep==2" style="width:300px;" label="手机号">
                    <Input type="text" v-model="registerForm.mobilePhoneNo" autocomplete="off" placeholder="请输入手机号"></Input>
                </FormItem>
                <FormItem style="text-align:center;width:300px;">
                     <Button type="primary" v-if="currentStep==1" @click="lastStep">上一步</Button>
                     <Button type="primary" :disabled="!(time==60)&&time>0" v-if="currentStep<2" @click="nextStep">下一步{{text}}</Button>
                     <Button type="primary" v-if="currentStep==2" @click="submit">提交</Button>
                </FormItem>
            </Form>
       </Col>
    </Row>
    </div>
</template>
<script>
  import VueInputCode from '../components/inputcode.vue'
  import JSEncrypt from 'jsencrypt/bin/jsencrypt'
  import Util from '../libs/util'
  export default {
     name:"user_register",
     components: {
      VueInputCode
     },
    data(){
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.registerForm.checkpwd !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.registerForm.validateField('checkpwd');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入你的密码'));
                } else if (value !== this.registerForm.pwd) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };

        return {
          sendMailVisible:true,
          time:60,
          code:[],
          currentStep:0,
          registerForm:{
            
          },
           ruleValidate: {
                pwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkpwd: [
                        { validator: validatePassCheck, trigger: 'blur' }
                ],
                userName: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' }
                ],
                mobilePhoneNo: [
                  { required: true, message: '请输入手机号码', trigger: 'blur' }
                ],
                userAccount: [
                  { required: true, message: '请输入账号', trigger: 'blur' }
                ]
          },
        }
    },
    computed: {
                text: function () {
                    return this.time <60&&this.time>0 ? '('+this.time + ')' :'';
                }
    },
    methods:{
        nextStep(){
            if(this.currentStep>=2){
                this.currentStep=0;
                retutn;
            }else if(this.currentStep == 0){//验证邮箱 通过后发送验证码到邮箱
               if(!this.registerForm.email){
                     this.$Message.warning('请输入邮箱地址');
                     return;
               }else{
                     //判断邮箱地址
                     if(this.registerForm.email.indexOf('eptison.com')<0){
                         this.$Message.warning('请输入公司邮箱地址');
                         return;
                     }
                     this.sendEmailCode();
               }
            }else if(this.currentStep == 1){//调用接口验证用户输入的验证码
                 if(this.code.length!=4){
                     this.$Message.warning('请输入完整的验证码');
                     return;
                 }else{
                      this.checkEmailCode();
                 }
            }
            //this.currentStep = this.currentStep+1;
        },
        lastStep(){
            this.currentStep=0;
        },
        //发送验证码到邮箱
        sendEmailCode(){
            this.$nextTick(()=>{
                this.Timer=setInterval(()=>{
                  if(this.time == 0){
                    clearInterval(this.Timer);
                    this.sendMailVisible = false;
                    this.time = 60;
                    return;
                  }
                  this.time--;
                },0)
            })
            this.request('SendEmailCode',{
              ver:'1',
              ts:Date.parse( new Date()),
              sign:'',
              methods:"sendEmailCode",
              data:{
                mail:this.registerForm.email
              }
            },true).then((res)=>{
               if(res.code == 1){
                    this.$Message.info(res.msg);
                    this.code=[];
                    this.time = 0;
                    this.currentStep = 1;
               }else{
                    //this.$Message.error(res.msg);
               }
            })
        },
        //校验用户输入的验证码
        checkEmailCode(){
              this.request('CheckEmailCode',{
              ver:'1',
              ts:Date.parse( new Date()),
              sign:'',
              methods:"checkEmailCode",
              data:{
                mail:this.registerForm.email,
                code:this.code.join('')
              }
            },true).then((res)=>{
               if(res.code == 1){
                    this.$Message.info(res.msg);
                    this.currentStep = 2;
               }else{
                    this.$Message.error(res.msg);
               }
            })
        },
        //提交信息
        submit(){
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4twvFaGUZLb2Lq8sbj/Omz+kgSX2cJtqMtnT0/1itOiP4o7nGZ6zoo8UX+4iQk99ZAAUslN3cPiV42fkJ23MWp25MjDMTRW/VnWSZYndaqoqVdPh+mniEonSz8dHy4nfiH9D1vfdQooKSOsIPtsCE5njMiDR0fS7EGInF+I9ogwIDAQAB');
              let submitData = Util.deepClone(this.registerForm);
              submitData.pwd = encrypt.encrypt(submitData.pwd);
              delete submitData.checkpwd;
              this.$refs['registerForm'].validate((valid) => {
                if (valid) {
                    this.request('RegistEmail',{
                          ver:'1',
                          ts:Date.parse( new Date()),
                          sign:'',
                          methods:"registEmail",
                          data:submitData
                    },true).then((res)=>{

                        if(res.code==1){
                            this.$Message.info(res.msg);
                            setTimeout(() => {
                                this.$router.push('/login')
                            },2000); 
                        }else{
                            this.$Message.error(res.msg);
                        }
                    })
            
                } else {
                    this.$Message.error('请核对表单信息!');
                    return false;
                }
         })
        },
        getInput(){

        },
        inputSuccess(){
        },
        login(){
            this.$router.push('/login')
        }
    },
    created(){
    },
    mounted(){
    }
}
</script>
<style lang="less">
 .header {
        height: 50px;
        background-color: #48A1EF;
        .title{
             line-height:50px;
             color:white;
             font-size: 20px;
        }
        .logintip{
            font-size: 15px;
            line-height:50px;
            color:white;
            cursor: pointer;
        }
    }
</style>
<style lang="less">
@import './login.less';

.login-switch-img {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    width: 40px;
    height: 40px;
}
</style>
<template>
<div class="login" @keydown.enter="newLogin">
    <!-- <div class="login-top"></div> -->
    <div>
        <img style="padding:20px 20px" src="../assets/logo.png" />
    </div>
    <div class="login-bottom">
        <div class="login-tit">
            <Icon type="md-cloud-outline" /> 云系统管理平台</div>
        <div class="login-con">
            <Card :bordered="false">
                <div slot="title" class="com-tit">
                    欢迎登录
                    <img @click="switchLoginMethod()" v-if="loginMethod!='account'" class="login-switch-img" src="@/assets/account.png" />
                    <img @click="switchLoginMethod()" v-if="loginMethod=='account'" class="login-switch-img" src="@/assets/qrcode.png" />

                </div>
                <div v-show="loginMethod=='account'" id="login-account" class="form-con">
                    <Form style="margin-top:50px;" ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model.trim="form.userName" placeholder="请输入用户名">
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model.trim="form.password" placeholder="请输入密码">
                            </Input>
                        </FormItem>
                        <FormItem prop="verificationCode">
                        </FormItem>
                        <FormItem>
                            <Button @click="newLogin" type="primary" long>登录</Button>
                        </FormItem>
                        <FormItem @click="register" style="text-align:right;color:#2d8cf0;cursor:pointer;">
                            <!-- <a @click="resetPwd">忘记密码?</a> -->
                            <!-- <a @click="register">注册账号</a> -->
                        </FormItem>
                    </Form>
                </div>
                <div v-show="loginMethod!='account'" id="login_qrcode">
                </div>
            </Card>
        </div>
    </div>
</div>
</template>

<script>
import Cookies from 'js-cookie';
import JSEncrypt from 'jsencrypt/bin/jsencrypt';
import socket from 'libs/socket';
import util from '@/libs/util.js';
import base64 from 'simple-base64';
import getParams from '../router/directLogin.js'
let tokenFlag = getParams().token;
export default {
    data() {
        return {
            form: {
                userPwd: '', //存放加密后密码 用于自动登录
                userName: '',
                password: '',
                verificationCodeUrl: 'https://m.dev.daimatu.cn/admin/passport/code'
            },
            loginMethod: 'account', //登录方式 账户名：account  钉钉扫码：dingdingScan
            rules: {
                userName: [{
                    required: true,
                    message: '账号不能为空',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        refreshVerificationCode() {
            this.form.verificationCodeUrl = 'https://m.dev.daimatu.cn/admin/passport/code?' + '?v=' + Math.random()
        },
        tokenDirectLogin() {
            this.$store.commit('becomeSingle') //默认单页面浏览
            this.$store.commit('clearAllTags'); //清除头部标签
            this.request('sys_user_loginByToken', {

            }, false).then((res) => {
                if (res.code != 1) {
                    this.$Message.error(res.msg);
                } else {
                    window.sessionStorage.setItem('userAccount', res.data.userName);
                    // window.sessionStorage.setItem('password', password);
                    window.sessionStorage.setItem('token', res.data.token);
                    window.sessionStorage.setItem('userinfo', JSON.stringify(res.data));
                    window.localStorage.setItem('userinfo', JSON.stringify(res.data));
                    this.$store.commit('initMenuList');
                    // localStorage.setItem('password',  password)
                    // localStorage.setItem('userAccount',this.form.userName)
                    Cookies.set('user', res.data.userName);
                    Cookies.set('userId', res.data.userId);
                    // Cookies.set('password', password);
                    this.$router.push({
                        name: 'home_index'
                    });
                    this.$nextTick(() => {
                        let data = {
                            type: 'message',
                            userId: JSON.parse(window.sessionStorage.getItem('userinfo')).userId
                        }
                        socket(data);
                    })
                }
            });
        },
        newLogin() {
            this.$store.commit('becomeSingle') //默认单页面浏览
            this.$store.commit('clearAllTags'); //清除头部标签
            this.$refs.loginForm.validate((valid) => {
                if (this.userPwd) {
                    valid = true
                }
                if (valid) {
                    var password = base64.encode(this.form.password);
                    this.request('sys_user_login', {
                        staffCode: this.form.userName,
                        password: password
                    }, true).then((res) => {
                        if (res.code != 1) {
                            this.$Message.error(res.msg);
                        } else {

                            window.sessionStorage.setItem('userAccount', this.form.userName);
                            window.sessionStorage.setItem('password', password);
                            window.sessionStorage.setItem('token', res.data.token);
                            window.sessionStorage.setItem('userinfo', JSON.stringify(res.data));
                            window.localStorage.setItem('userinfo', JSON.stringify(res.data));
                            this.$store.commit('initMenuList');
                            localStorage.setItem('password', password)
                            localStorage.setItem('userAccount', this.form.userName)
                            Cookies.set('user', res.data.userName);
                            Cookies.set('userId', res.data.userId);
                            Cookies.set('password', password);
                            this.$router.push({
                                name: 'home_index'
                            });
                            this.$nextTick(() => {
                                let data = {
                                    type: 'message',
                                    userId: JSON.parse(window.sessionStorage.getItem('userinfo')).userId
                                }
                                socket(data);
                            })
                        }
                    });
                }
            });
        },
        dingdingScanLogin() {
            this.$store.commit('becomeSingle') //默认单页面浏览
            this.$store.commit('clearAllTags'); //清除头部标签
            this.$refs.loginForm.validate((valid) => {
                if (this.userPwd) {
                    valid = true
                }
                if (valid) {
                    console.log('987654324567890-98765468790875468790987658790')
                    var password = base64.encode(this.form.password);
                    this.request('sys_user_dingdingScanLogin', {
                        // staffCode: this.form.userName,
                        // password: password
                        loginTmpCode: this.$route.query.code
                    }, false).then((res) => {
                        if (res.code != 1) {
                            this.$Message.error(res.msg);
                        } else {
                            console.log('22222222222222222222222222222222')
                            window.sessionStorage.setItem('userAccount', this.form.userName);
                            window.sessionStorage.setItem('password', password);
                            window.sessionStorage.setItem('token', res.data.token);
                            window.sessionStorage.setItem('userinfo', JSON.stringify(res.data));
                            window.localStorage.setItem('userinfo', JSON.stringify(res.data));
                            this.$store.commit('initMenuList');
                            localStorage.setItem('password', password)
                            localStorage.setItem('userAccount', this.form.userName)
                            Cookies.set('user', res.data.userName);
                            Cookies.set('userId', res.data.userId);
                            Cookies.set('password', password);
                            // this.$router.push({
                            //     name: 'home_index'
                            // });
                            this.$nextTick(() => {
                                let data = {
                                    type: 'message',
                                    userId: JSON.parse(window.sessionStorage.getItem('userinfo')).userId
                                }
                                socket(data);
                            })
                        }
                    });
                }
            });
        },
        register() {
            this.$router.push({
                name: 'register'
            });
        },
        resetPwd() {
            this.$router.push({
                name: 'resetPwd'
            });
        },
        switchLoginMethod() {
            if (this.loginMethod == 'dingdingScan') {
                this.loginMethod = 'account';
            } else {
                this.loginMethod = 'dingdingScan';
            }
        }
    },
    mounted() {
        if (tokenFlag) {
            this.tokenDirectLogin()
        }
        var appId = util.getDingtalkAppId()
        console.log(util.getDingtalkAppId(), '098534225787909865634787909876352347890')
        var REDIRECT_URI = 'http://' + window.location.host + '/login';
        var goto = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=' + appId +
            '&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + REDIRECT_URI;
        var obj = DDLogin({
            id: "login_qrcode", //这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
            goto: encodeURIComponent(goto),
            style: "border:none;background-color:#FFFFFF;",
            width: "300",
            height: "300"
        });

        var hanndleMessage = function (event) {
            var origin = event.origin;
            if (origin == "https://login.dingtalk.com") { //判断是否来自ddLogin扫码事件。
                var loginTmpCode = event.data; //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
                location.href = goto + '&loginTmpCode=' + loginTmpCode
            }
        };

        if (typeof window.addEventListener != 'undefined') {
            window.addEventListener('message', hanndleMessage, false);
        } else if (typeof window.attachEvent != 'undefined') {
            window.attachEvent('onmessage', hanndleMessage);
        }

        let code = this.$route.query.code
        if (code) {
            this.request('sys_user_dingdingScanLogin', {
                // staffCode: this.form.userName,
                // password: password
                loginTmpCode: this.$route.query.code
            }, false).then((res) => {
                if (res.code == 1) {
                    console.log(res.data.userId == undefined)
                    if (res.data.userId == undefined) { //未绑定钉钉
                        this.$router.push({
                            name: 'platformAuth',
                            query: {
                                dingdingId: res.data.dingdingId
                            }
                        });
                    } else { //调整登录页
                        this.$Message.success(res.msg);
                        window.sessionStorage.setItem('userAccount', res.data.userName);
                        // window.sessionStorage.setItem('password', password);
                        window.sessionStorage.setItem('token', res.data.token);
                        window.sessionStorage.setItem('userinfo', JSON.stringify(res.data));
                        // localStorage.setItem('password',  password)
                        localStorage.setItem('userAccount', res.data.userName)
                        localStorage.setItem('userinfo', JSON.stringify(res.data))
                        Cookies.set('user', res.data.userName);
                        Cookies.set('userId', res.data.userId);
                        // Cookies.set('password', password);
                        // Cookies.set('validate', this.form.validate);
                        // Cookies.set('isActive', this.form.isActive);
                        this.$router.push({
                            name: 'home_index'
                        });
                        this.$nextTick(() => {
                            let data = {
                                type: 'message',
                                userId: JSON.parse(window.sessionStorage.getItem('userinfo')).userId
                            }
                            socket(data);
                        })
                    }
                } else { //钉钉扫码登录失败
                    this.$message.success(res.msg)
                }
            })
        }

        let userAccountOther = this.$route.params.userAccount
        let userPwdOther = this.$route.params.userPwd
        if (userAccountOther && userPwdOther) {
            this.loginMethod = 'dingdingScan'
            this.userPwd = userPwdOther
            this.form.userName = userAccountOther
            // this.handleSubmit()
            this.dingdingScanLogin()
        }

        let loginMethod = this.$route.params.loginMethod
        if (loginMethod == 'scanDingtalk') {
            this.loginMethod = 'dingdingScan'
        }
    }
}
</script>

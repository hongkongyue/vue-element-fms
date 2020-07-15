export const burypoint = {
    data() {
        return {
            activeMenu: null,
            arr: null,
        }
    },
    mounted() {
        this.activeMenu = localStorage.getItem('activeMenu')
        this.arr = JSON.parse(localStorage.getItem('userinfo')).menuTreeDataBind
        this.setBuryPoint('')
    },
    methods: {
        setBuryPoint(button) {
            let result = null
            for (var i = 0; i < this.arr.length; i++) {
                var flag = this.findTargetText(this.arr[i], this.activeMenu)
                if (flag) {
                    result = flag;
                }
            }
            if (!result) return
            const {
                fistTitle,
                title
            } = this.$route.query
            let array = localStorage.getItem('title').substr(1).split('/')
            let data = {}
            data.module = fistTitle ? fistTitle : array[0]
            data.menu = result
            data.button = button
            data.pageName = fistTitle ? title : array[1]
            this.request('sys_epLog_add', data, false).then(res => {
                if (res.code == 1) {

                } else {
                    //  this.$message.error(res.msg)
                }
            })
        },
        //获取已知的的路由的名称
        findTargetText(dataobj, str) {
            if (dataobj.url == str) {
                return dataobj.text;
            } else {
                if (dataobj.children.length > 0) {
                    for (var i = 0; i < dataobj.children.length; i++) {
                        var flagId = this.findTargetText(dataobj.children[i], str);
                        if (flagId) {
                            return flagId;
                        }
                    }
                }
            }
            return false;
        }
    }
}
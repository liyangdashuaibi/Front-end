<template>
    <div>
        <div class="g-form">
            <div class="g-form-line">
                <span class="g-form-label">用户名</span>
                <div class="g-form-input">
                    <input type="text" v-model="usernameModel" placeholder="请输入用户名">
                </div>
                <span class="error">{{ userError.errorText }}</span>
            </div>
            <div class="g-form-line">
                <span class="g-form-label">密码</span>
                <div class="g-form-input">
                    <input type="password" v-model="passwordModel" placeholder="请输入密码">
                </div>
                <span class="error">{{ passError.errorText }}</span>
            </div>
            <div class="g-form-line">
                <div class="g-form-button">
                    <a class="button"　@click="onLogin">登陆</a>
                </div>
            </div>
            <div class="g-form-verif">{{verif}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'logForm',
    created () {
        
    },
    data () {
        return {
            zhanghao: [],
            usernameModel: '',
            passwordModel: '',
            userFlag: false,
            passFlag: false,
            verif: ''
        }
    },
    computed: {
        userError () {
            let errorText, status;
            if ( !/@/g.test(this.usernameModel) ){
                errorText = '用户名必须包含@';
                status = false;
            } else  {
                errorText = '';
                status = true;
            }
            if ( !this.userFlag ) {
                errorText = '';
                this.userFlag = true;
            }
            return {
                errorText, status
            }
        },
        passError () {
            let errorText, status;
            if ( this.passwordModel.length <= 5 ){
                errorText = '密码不能小于5位';
                status = false;
            } else {
                errorText = '';
                status = true;
            }
            if ( !this.passFlag ) {
                errorText = '';
                this.passFlag = true;
            }
            return {
                errorText, status
            }
        }
    },
    methods: {
        onLogin () {
            if ( this.usernameModel === '' || !this.passwordModel === '' ){
                this.verif = '账号密码不能为空'
                return;
            }
            if ( !this.userError.status || !this.passError.status ) {
                this.verif = '您的输入不符合规范';
                return;
            }
            this.$http.get( 'api/zhanghao' )
            .then( ( res ) => {
                var zobj = this.verifUser( res.data, this.usernameModel, this.passwordModel );
                if ( !zobj.bool ) {
                    this.verif = '您输入的账号密码不正确';
                } else {
                    console.log(zobj.zhanghao)
                    this.verif = '';
                    this.$emit('parent-hide', zobj.zhanghao);
                }
            })
            .catch( ( err ) => {
                console.log( err )
            })
        },
        verifUser ( array, username, password ) {
            for ( let i = 0; i < array.length; i ++ ) {
                if ( username === array[i].username && password === array[i].password ) {
                    return {
                        bool: true ,
                        zhanghao: array[i]
                    }
                }
            }
            return { bool: false };
        }
    }
}
</script>

<style scoped>
    .g-form {
        width: 400px;
        margin:0 auto;
    }
    .g-form-line::after {
        content: '';
        display: table;
        clear: both;
    }
    .g-form-line + .g-form-line {
        margin-top: 8px;
    }
    .g-form-line > span {
        float: left;
    }
    .g-form-line > div {
        float: left;
    }
    .g-form-line:nth-child(2) .g-form-input{
        margin-left: 44px;
    }
    .g-form-input {
        margin-left: 30px;
    }
    .g-form-button .button {
        padding: 5px 15px;
        background-color: rgb(0,200,0);
        color: #fff;
        border: 1px solid rgb(0,200,0);
        border-radius: 3px;
        cursor: pointer;
        font-size: 13px;
        margin-left: 165px;
    }
    .error, .g-form-verif {
        font-size: 12px;
        color: red;
        margin-left: 5px;
    }
</style>

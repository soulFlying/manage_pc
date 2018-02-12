<template>
    <div class="login-wrap">
        <div class="ms-title">仓储管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码123456。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            ruleForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    beforeRouteEnter(to, from, next) {

        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`

        next(vm => {

            if (localStorage.getItem('ms_username')) {
                vm.$router.push('/readme');
            }
        })
    },
    methods: {
        submitForm(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                console.log(valid)
                if (valid) {
                    this.$indexServer.loginByPassword(self.ruleForm.username, self.ruleForm.password)
                        .then(res => {
                            console.log(res)
                            if (res.data.code === 200) {
                                localStorage.setItem('ms_username', self.ruleForm.username);
                                self.$router.push('/readme');
                            } else if (res.data.code === 404) {
                                this.$message({
                                    showClose: true,
                                    message: '用户不存在,请重新填写!',
                                    type: 'warning'
                                });
                            } else if (res.data.code === 401) {
                                this.$message({
                                    showClose: true,
                                    message: '用户密码错误，请重新填写!',
                                    type: 'error'
                                });
                            }

                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -150px;
  padding: 30px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  margin-top: 20px;

  height: 36px;
}
</style>

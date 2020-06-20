<template>
  <div>
    <div class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <h2 class="login-title color-main">Hello, </h2>
        <h2 class="login-title color-main">Welcome back</h2>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
          <span slot="prefix">
            <svg-icon icon-class="user"></svg-icon>
          </span>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码">
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
          <span slot="suffix" @click="showPwd">
            <svg-icon :icon-class="seen" style="width: 20px;height: 20px;" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>

        <el-form-item style="margin-bottom: 20px;text-align: center">
          <el-button style="width: 100%;background-color: #B2C3FB;" type="primary" :loading="loading" @click.native.prevent="handleLogin">
            Login
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-link style="font-size: small;">忘记密码？</el-link>
        </el-form-item>
      </el-form>
    </div>
    <div class="pic-ch">
      <el-carousel height="720px">
        <el-carousel-item v-for="pic in pics" :key="pic.id">
          <img :src="pic.src" style="width: 80%;height: 80%;margin-top: 10%;"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate';
  import {login} from '@/api/login'
  // import myInput from '@/components/myInput.vue'

  export default{
    name:'login',
    components:{
      // 'i-input': myInput
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不能小于3位'))
        } else {
          callback()
        }
      };
      return{
        pics: [
          {id:0,src:require("@/assets/illustration/cat-1.jpg")},
          {id:1, src: require("@/assets/illustration/cat-bg3-2.jpg")}
        ],
        loginForm :{
          username:'',
          password: '',
        },
        loginRules:{
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        pwdType: 'password',
        seen: "eyeClose"
      }
    },
    created() {
      if(this.loginForm.username === undefined||this.loginForm.username==null||this.loginForm.username===''){
        this.loginForm.username = 'admin';
      }
      if(this.loginForm.password === undefined||this.loginForm.password==null){
        this.loginForm.password = '';
      }
    },
    methods:{
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = '';
          this.seen="eyeOpen"
        } else {
          this.pwdType = 'password';
          this.seen="eyeClose"
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            console.log('开始登录')

            login(this.loginForm.username,this.loginForm.password).then(res => {
              console.log(res);
              if(res.data.code == 1){
                this.$store.dispatch('dologin').then(() => {
                  console.log('登录成功')
                  window.location.reload()
                  this.$router.push({path:'/'})
                }).catch(() => {
                  this.loading = false
                })
              }
              else{
                alert("登录失败");
                this.loading = false;
                return false
              }
            });
          } else {
            console.log('参数验证不合法！');
            return false
          }
        })
      },
    }
  }
</script>

<style scoped>
  .new-input{
    font-family: "agency fb";
    font-size: small;
  }
  .pic-ch{
    height: 100%;
    width: 680px;
    float: right;
  }

  .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
       background-color: #EAF0FF;
    }

    .el-carousel__item:nth-child(2n+1) {
       background-color: #F0F4FF;
    }

    .login-form-layout {
      float: left;
      left: 0;
      right: 0;
      width: 300px;
      margin-left: 100px;
      margin-top: 140px;
      /* border-top: 10px solid #F0F4FF; */
    }
    .login-title {
      text-align: left;
    }

    .login-center-layout {
      background: #F0F4FF;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      margin-top: 200px;
    }
</style>

<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="login-title">
        <p class="title-ch">刺客辅助管理系统</p>
        <p class="title-en">Height management system</p>
      </div>
      <div class="login-form">
        <el-form ref="loginFormRef" class="form" :model="param" :rules="rules">
          <div class="form-title">
            <span class="welcome">欢迎！</span>
            <span>登录星辰智慧有一个系统</span>
          </div>
          <!-- <el-form-item prop="abbreviation">
            <el-input v-model="param.abbreviation" placeholder="机构码"></el-input>
          </el-form-item> -->
          <el-form-item prop="username">
            <el-input v-model="param.username" placeholder="登录手机"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="param.password"
              placeholder="密码"
              :type="passwordType"
              show-password
              @keyup.enter="submitForm"
            ></el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button class="btn" type="primary" :loading="btnLoading" @click="submitForm">登录</el-button>
          </div>
        </el-form>
      </div>
      <div class="login-company">让刺客辅助有限公司</div>
    </div>
    <div class="spinner-bg">
      <div class="loading" v-show="btnLoading"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// import { ElMessage } from 'element-plus'
// import { User, Lock, Unlock } from '@element-plus/icons-vue'

const router = useRouter()
const store = useStore()

const btnLoading = ref(false)
const loginFormRef = ref(null)
const passwordLock = ref(true)
const passwordType = ref('password')

const param = reactive({
  abbreviation: '',
  username: '',
  password: '',
  source: 'ADMIN'
})

const validatePassword = (rule, value, callback) => {
  if (value.length < 4) {
    callback(new Error('密码不能小于4位数!'))
  } else {
    callback()
  }
}

const rules = reactive({
  abbreviation: [{ required: true, message: '请输入机构码', trigger: 'blur' }],
  username: [{ required: true, message: '请输入登录手机', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { trigger: 'blur', validator: validatePassword }
  ]
})

const switchPass = () => {
  if (passwordLock.value) {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
  passwordLock.value = !passwordLock.value
}

const submitForm = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      btnLoading.value = true
      // 访问登录接口
      store
        .dispatch('user/login', param)
        .then((result) => {
          btnLoading.value = false
          debugger;
          router.push('/')
        })
        .finally(() => {
          setTimeout(() => {
            btnLoading.value = false
          }, 1000)
        })
    }
  })
}
</script>

<style lang="scss" scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(/img/login_bg.png) no-repeat;
  background-size: cover;
  background-position: 50%;
}

.login-title {
  width: 100%;
  position: absolute;
  bottom: 12%;
  font-size: 20px;
  line-height: 50px;
  color: #fff;
  text-align: left;
  padding-left: 160px;
  .title-ch {
    font-size: 46px;
    letter-spacing: 1.5px;
  }
  .title-en {
    font-size: 23px;
  }
}
.login-company {
  width: 100%;
  color: #fff;
  position: absolute;
  bottom: 17px;
  font-size: 18px;
  padding-left: 18%;
}

.login-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1180px;
  height: 82%;
  overflow: hidden;
  background: url(/img/login_mask.png) no-repeat;
  background-size: cover;
  background-position: 0px -10px;
  border-radius: 5px;
  box-shadow: 10px 5px 20px rgba(0, 0, 0, 0.2);
}

.login-form {
  position: absolute;
  right: 0;
  width: 48%;
  height: 100%;
  background: #fff;
  .form {
    width: 76%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .form-title {
    text-align: center;
    padding-bottom: 30px;
    .welcome {
      font-size: 30px;
    }
  }
}

.login-btn {
  text-align: center;
}

.login-btn .btn {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  margin-top: 30px;
  font-size: 16px;
  letter-spacing: 3px;
  border-color: navajowhite;
  background: #1268e1;
}

.el-icon-lock,
.el-icon-unlock {
  cursor: pointer;
}

.spinner-bg {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loading {
  margin: 50px auto;
  width: 6px;
  height: 10px;
  background-color: #3bae9e;
  position: relative;
  animation: rectangle infinite 1s ease-in-out -0.2s;
}

.loading:before,
.loading:after {
  position: absolute;
  width: 6px;
  height: 10px;
  content: '';
  background-color: #3bae9e;
}
.loading:before {
  left: -14px;
  animation: rectangle infinite 1s ease-in-out -0.4s;
}
.loading:after {
  right: -14px;
  animation: rectangle infinite 1s ease-in-out;
}

@keyframes rectangle {
  0%,
  80%,
  100% {
    height: 20px;
    box-shadow: 0 0 #3bae9e;
  }

  40% {
    height: 30px;
    box-shadow: 0 -20px #3bae9e;
  }
}
</style>

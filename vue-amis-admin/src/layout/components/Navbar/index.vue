<template>
  <div class="navbar">
    <Hamburger class="hamburger-container" :is-active="opened" @toggleClick="toggleSideBar" />
    <div class="nav-title">{{ tenantName }}-有一个系统</div>
    <!-- <Breadcrumb class="breadcrumb-container" /> -->
    <div class="right-menu">
      <el-dropdown class="avatar-container">
        <div class="el-dropdown-link avatar-wrapper">
          <img src="/img/default.png" class="user-avatar" />
          <span class="user-name">{{ username }}</span>
          <el-icon class="el-icon--right">
            <CaretBottom />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/')">首页</el-dropdown-item>
            <el-dropdown-item @click="handleChangePassword">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="menu-logout" @click="loginOut">
        <el-tooltip effect="dark" content="退出登录" placement="bottom">
          <i class="iconfont icon-zhuxiaoguanji" />
        </el-tooltip>
      </div>
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <Screenfull />
      </el-tooltip>
    </div>

    <ChangePassword ref="passwordRef" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import Screenfull from './Screenfull.vue'
import { CaretBottom } from '@element-plus/icons-vue'
import { getName } from '@/utils/auth'
import ChangePassword from '@/components/ChangePassword/index.vue';

const router = useRouter()
const store = useStore()
const opened = computed(() => store.state.app.sidebar.opened)
const username = getName()
const tenantName = computed(() => store.state.user.tenantName)

const passwordRef = ref(null)

const toggleSideBar = () => {
  store.dispatch('app/toggleSideBar')
}

const loginOut = () => {
  ElMessageBox.confirm('退出登录', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      store.dispatch('user/logout').then(() => {
        router.push('/login')
      })
    })
    .catch(() => {})
}

const handleChangePassword = () => {
  passwordRef.value.dialogFormVisible = true
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  overflow: hidden;

  .hamburger-container {
    float: left;
    height: 50px;
    padding: 0 10px;
  }

  .breadcrumb-container {
    float: left;
  }
  .nav-title {
    float: left;
    font-size: 22px;
    color: #555;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    height: 100%;
    margin-right: 20px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      margin: 0 4px;
      vertical-align: middle;
    }

    .international {
      vertical-align: top;
    }

    .theme-switch {
      vertical-align: 15px;
    }

    .avatar-container {
      margin-right: 30px;
      cursor: pointer;
      .avatar-wrapper {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .el-dropdown-link {
          display: flex;
        }
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .user-name {
          display: inline-block;
          padding-left: 5px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          top: 20px;
          right: -16px;
          font-size: 12px;
        }
      }
    }
    .menu-logout {
      display: inline-block;
      height: 100%;
      padding-right: 10px;
      color: #5a5e66;
      cursor: pointer;
    }
    .icon-zhuxiaoguanji {
      font-size: 24px;
    }
  }
}
</style>

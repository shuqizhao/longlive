<template>
    <el-container class="admin-container">
        <el-header class="header">
            <div class="logo">
                <img src="/logo.jpeg" alt="Logo">
                有一个管理系统
            </div>
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
                <el-radio-button :value="false">expand</el-radio-button>
                <el-radio-button :value="true">collapse</el-radio-button>
            </el-radio-group>
            <!-- <el-dropdown class="user-menu">
                <span class="el-dropdown-link">
                  Dropdown List
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="handleFullScreen">全屏</el-dropdown-item>
                    <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
</el-dropdown> -->
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <el-icon>
                        <User />
                    </el-icon>
                    &nbsp;
                    admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click="handleFullScreen"><el-icon>
                                <FullScreen />
                            </el-icon>全屏</el-dropdown-item>
                        <el-dropdown-item divided @click="handleLogout"><el-icon>
                                <SwitchButton />
                            </el-icon>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-header>
        <el-container>
            <el-aside class="el-menu-vertical-demo">
                <el-menu :collapse="isCollapse" :default-active="activeIndex" class="el-menu-vertical-demo"
                    @select="handleMenuSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                    mode="vertical" :router="true">
                    <el-menu-item index="/home">首页</el-menu-item>
                    <el-menu-item index="/user">用户管理</el-menu-item>

                    <el-menu-item index="/settings">系统设置</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <!-- 页面内容 -->
                <router-view v-slot="{ Component }">
                    <transition name="fade-transform" mode="out-in">
                        <keep-alive>
                            <component :is="Component" :key="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
        <el-footer class="footer">备案信息：xxx</el-footer>
    </el-container>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            isCollapse: false,
            activeIndex: '1' // 默认激活的菜单项  
        };
    },
    methods: {
        handleMenuSelect(index) {
            this.activeIndex = index;
            // 根据index路由跳转或其他操作  
        },
        handleFullScreen() {
            if (!document.fullscreenElement &&
                document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen()
                    .catch(err => {
                        console.error('Error attempting to enable full-screen mode:', err);
                    });
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        },
        handleLogout() {
            this.$confirm('确认退出登录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 清除用户状态、跳转到登录页面等  
                Cookies.set('access_token', '')
                this.$router.push('/login');
            }).catch(() => {
                // 取消操作  
            });
        }
    }
};
</script>
<style scoped>  
.el-menu-vertical-demo {  
  width: 100%;  
  /* 自定义样式 */  
  border-right: none;  
}  
  
.el-menu-vertical-demo .el-submenu .el-menu-item {  
  height: 50px;  
  line-height: 50px;  
  /* 自定义样式 */  
  border-bottom: 1px solid #606a73;  
  transition: background-color 0.3s;  
}  
  
.el-menu-vertical-demo .el-submenu .el-menu-item:hover {  
  background-color: #66717d;  
}  
  
.el-menu-vertical-demo .el-submenu .el-submenu__title {  
  height: 50px;  
  line-height: 50px;  
  /* 自定义样式 */  
  padding-left: 20px;  
  background-color: #4e5964;  
}  
  
.el-menu-vertical-demo .el-icon-location,  
.el-menu-vertical-demo .el-icon-menu,  
.el-menu-vertical-demo .el-icon-setting {  
  /* 自定义图标样式 */  
  margin-right: 10px;  
  font-size: 18px;  
  vertical-align: middle;  
}  
</style>
<style scoped>
.admin-container {
    height: 100vh;
    /* 设置容器高度为视口高度 */
    display: flex;
    flex-direction: column;
}

.header {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f5f7fa;
}

.logo {
    display: flex;
    align-items: center;
}

.logo img {
    height: 40px;
    /* 根据你的Logo尺寸调整 */
    margin-right: 10px;
}

.el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 100%;
}

.footer {
    text-align: center;
    background-color: #f5f7fa;
    padding: 10px;
}
</style>
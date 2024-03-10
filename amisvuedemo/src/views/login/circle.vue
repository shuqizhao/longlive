<template>
    <div class="body">
        <div class="ring">
            <i style="--clr:#00ff0a;"></i>
            <i style="--clr:#ff0057;"></i>
            <i style="--clr:#fffd44;"></i>
            <form class="login" @submit.prevent="handleSubmit">
                <h2>有一个系统</h2>
                <div class="ipt-box">
                    <input type="text" placeholder="账号" id="username" v-model="username" required autofocus />
                </div>
                <div class="ipt-box">
                    <input type="password" placeholder="密码" id="password" v-model="password" required />
                </div>
                <div class="ipt-box">
                    <input type="submit" value="登录" />
                </div>
                <div class="links">
                    <a href="#">忘记密码</a>
                    <a href="#">注册</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ElMessage, ElLoading } from 'element-plus'
import axiosInstance from "@/api/axiosUtil";

export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        handleSubmit() {
            // 验证用户名和密码
            if (!this.username || !this.password) {
                ElMessage.error("用户名或密码为必填项！");
                return;
            }

            const loading = ElLoading.service({
                lock: true,
                text: '正在登录...',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            // 发送POST请求
            axiosInstance.post('/auth/login', {
                username: this.username,
                password: this.password
            })
                .then(response => {
                    // 处理登录成功的情况
                    // 例如：保存token、跳转到其他页面等
                    loading.close()
                    console.log('Login successful!', response.data);
                })
                .catch(error1 => {
                    // 处理登录失败的情况
                    loading.close()
                    ElMessage.error(error1.response.data.msg);
                    console.error('Login failed:', error1);
                });
        }
    }
};
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
<style scoped>
.body {
    min-height: 100vh;
    background-color: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.ring {
    position: relative;
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ring i {
    position: absolute;
    border: 2px solid #fff;
    inset: 0;
    transition: all 0.5s;
}

.ring i:nth-child(1) {
    border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
    animation: animate 6s linear infinite;
}

.ring i:nth-child(2) {
    border-radius: 41% 44% 56% 59% / 38% 62% 63% 37%;
    animation: animate 4s linear infinite;
}

.ring i:nth-child(3) {
    border-radius: 41% 44% 56% 59% / 38% 62% 63% 37%;
    animation: animate 10s linear infinite reverse;
}

.ring:hover i {
    border: 6px solid var(--clr);
    filter: drop-shadow(0 0 20px var(--clr));
}

.login {
    position: absolute;
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.login h2 {
    color: #fff;
    font-size: 32px;
    letter-spacing: 16px;
    text-indent: 16px;
    margin-bottom: 16px;
}

.login .ipt-box {
    position: relative;
    width: 100%;
}

.login .ipt-box input {
    position: relative;
    width: 100%;
    padding: 12px 20px;
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 40px;
    font-size: 18px;
    color: #fff;
    box-shadow: none;
    outline: none;
}

.login .ipt-box input[type="submit"] {
    width: 100%;
    background: linear-gradient(45deg, #ff357a, #fff172);
    border: none;
    cursor: pointer;
}

.login .ipt-box input::placeholder {
    color: rgba(255, 255, 255, 0.75);
}

.login .links {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.login .links a {
    color: #fff;
    text-decoration: none;
}

.error {
    color: red;
    /* ... */
}

@keyframes animate {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
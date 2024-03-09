<template>
  <div class="login-container">
    <amis-renderer class="amis-form1" :schema="loginSchema" />
  </div>
</template>

<script>
import { ref } from 'vue';
import AMISRenderer from "@/components/AMISRenderer.vue";

export default {
  components: {
    "amis-renderer": AMISRenderer,
  },
  setup() {
    const loginSchema = ref({
      type: 'page',
      "cssVars": {
        "--Panel-heading-fontSize": "25px"
      },
      title: '',
      body: [
        {

          type: 'form',
          title: '有一个管理系统',
          "mode": "horizontal",
          api: import.meta.env.VITE_BASE_Url + "/auth/login",
          style: {
            "text-align": "center"
          },
          controls: [
            {
              type: 'text',
              name: 'username',
              label: '用户名',
              required: true,
              style: {
                "text-align": "left"
              }
            },
            {
              type: 'password',
              name: 'password',
              label: '密码',
              required: true,
              style: {
                "text-align": "left"
              },
            },
          ],
        }]
    });

    return {
      loginSchema,
    };
  },
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.amis-form1 {
  height: auto;
  display: block;
  /* 确保表单块级显示 */
  max-width: 600px;
  /* 设置表单最大宽度 */
}
</style>
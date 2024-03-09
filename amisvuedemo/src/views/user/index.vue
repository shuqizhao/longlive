<template>
    <div>
        <amis-renderer :schema="userSchema" />
    </div>
</template>

<script>
import { ref } from 'vue';
import AMISRenderer from "@/components/AMISRenderer.vue";
import axiosInstance from "@/api/axiosUtil"
import Cookies from 'js-cookie';

export default {
    components: {
        "amis-renderer": AMISRenderer,
    },
    setup() {

        // 在 AMIS 配置中使用自定义的 requestAdaptor  
        const amisConfig = {
            requestAdaptor: (config) => {
                // 在这里你可以修改 config 对象来定制请求  
                config.headers = {
                    ...config.headers,
                    // 添加 Authorization 头部到每个请求中  
                    Authorization: `Bearer ${Cookies.get('access_token')}`, // 假设 token 存储在 localStorage 中  
                };

                // 使用 axios 发送请求并返回 Promise  
                return axiosInstance(config)
                    .then((response) => {
                        // 你可以在这里处理响应数据，比如转换格式等  
                        return { data: response.data }; // 返回 AMIS 期望的格式  
                    })
                    .catch((error) => {
                        // 处理请求错误，你可以在这里抛出错误或返回一个拒绝的 Promise  
                        throw new Error(error.message);
                    });
            },
        };

        // 使用这个配置来渲染你的 AMIS 组件
        const userSchema = ref({
            "title": "用户管理",
            "remark": "bla bla bla",
            "toolbar": [
                {
                    "type": "button",
                    "actionType": "dialog",
                    "label": "新增用户",
                    "icon": "fa fa-plus pull-left",
                    "primary": true,
                    "dialog": {
                        "title": "新增用户",
                        "body": {
                            "type": "form",
                            "name": "sample-edit-form",
                            "api": "post:" + import.meta.env.VITE_BASE_Url + "/user/save",
                            "body": [
                                {
                                    "type": "input-text",
                                    "name": "name",
                                    "label": "姓名",
                                    "required": true
                                },
                                {
                                    "type": "divider"
                                }
                            ]
                        }
                    }
                }
            ],
            "body": {
                "type": "crud",
                "syncLocation": false,
                "draggable": true,
                // "api": import.meta.env.VITE_BASE_Url + "/user/list",
                "api": {
                    "method": "get",
                    "url": import.meta.env.VITE_BASE_Url + "/user/list",
                    headers: {
                        // 在这里添加 Authorization 头部  
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    },
                    // requestAdaptor: function (api, context) {
                    //     axiosInstance(api);
                    //     return api;
                    // }
                },
                "perPage": 10,
                "keepItemSelectionOnPageChange": true,
                "maxKeepItemSelectionLength": 21,
                // "autoFillHeight": true,
                "labelTpl": "${id} ${name}",
                "autoGenerateFilter": true,
                "bulkActions": [
                    {
                        "label": "批量删除",
                        "actionType": "ajax",
                        "api": "delete:" + import.meta.env.VITE_BASE_Url + "/user/del" + "${ids|raw}",
                        "confirmText": "确定要批量删除?"
                    }
                ],
                "quickSaveApi": import.meta.env.VITE_BASE_Url + "/user/save",
                "quickSaveItemApi": import.meta.env.VITE_BASE_Url + "/user/save/$id",
                "filterTogglable": true,
                "headerToolbar": [
                    "bulkActions",
                    {
                        "type": "tpl",
                        "tpl": "定制内容示例：当前有 ${count} 条数据。",
                        "className": "v-middle"
                    },
                    {
                        "type": "columns-toggler",
                        "align": "right"
                    },
                    {
                        "type": "drag-toggler",
                        "align": "right"
                    },
                    {
                        "type": "pagination",
                        "align": "right"
                    }
                ],
                "footerToolbar": [
                    "statistics",
                    {
                        "type": "pagination",
                        "layout": "perPage,pager,go"
                    }
                ],
                "columns": [
                    {
                        "name": "id",
                        "label": "编号",
                        "fixed": "left"
                    },
                    {
                        "name": "user_name",
                        "label": "用户名",
                        "fixed": "left",
                        "searchable": true
                    },
                    {
                        "name": "is_enabled",
                        "label": "是否启用",
                        "searchable": {
                            "type": "select",
                            "name": "browser",
                            "label": "是否启用",
                            "placeholder": "是否启用",
                            "options": [
                                {
                                    "label": "是 ",
                                    "value": "1"
                                },
                                {
                                    "label": "否",
                                    "value": "0"
                                }
                            ]
                        }
                    },
                    {
                        "name": "create_date",
                        "label": "创建时间"
                    }, {
                        "name": "create_by",
                        "label": "创建人"
                    },
                    {
                        "type": "operation",
                        "label": "操作",
                        "width": 100,
                        "buttons": [
                            {
                                "type": "button",
                                "icon": "fa fa-eye",
                                "actionType": "dialog",
                                "tooltip": "查看用户",
                                "dialog": {
                                    "title": "查看用户",
                                    "body": {
                                        "type": "form",
                                        "body": [
                                            {
                                                "type": "static",
                                                "name": "name",
                                                "label": "用户ming"
                                            },
                                            {
                                                "type": "divider"
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                "type": "button",
                                "icon": "fa fa-pencil",
                                "tooltip": "编辑",
                                "actionType": "drawer",
                                "drawer": {
                                    "position": "left",
                                    "size": "lg",
                                    "title": "编辑",
                                    "body": {
                                        "type": "form",
                                        "name": "sample-edit-form",
                                        "api": import.meta.env.VITE_BASE_Url + "/user/save/$id",
                                        "body": [
                                            {
                                                "type": "input-text",
                                                "name": "name",
                                                "label": "用户名",
                                                "required": true
                                            },
                                            {
                                                "type": "divider"
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                "type": "button",
                                "icon": "fa fa-times text-danger",
                                "actionType": "ajax",
                                "tooltip": "删除",
                                "confirmText": "您确认要删除?",
                                "api": "delete:" + import.meta.env.VITE_BASE_Url + "/user/del" + "/$id"
                            }
                        ],
                        "toggled": true
                    }
                ]
            }
        });

        return {
            userSchema,
        };
    },
};
</script>


<style scoped></style>
const userList = [
  {
    username: 'admin',
    password: '123',
    role: 'admin',
    email: 'admin@qq.com',
    createTime: 1623318878699
  },
  {
    username: 'editor',
    password: '456',
    role: 'editor',
    email: 'editor@qq.com',
    createTime: 1623328878699
  }
]

const userMockList = [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    statusCode: 200,
    response: ({ body }) => {
      let flag = -1
      userList.forEach((item, index) => {
        if (item.username === body.username && item.password === body.password) {
          flag = index
        }
      })
      if (~flag) {
        const data = {
          code: 20000,
          message: '登录成功',
          token: new Date().getTime().toString(32),
          ...userList[flag]
        }
        return data
      } else {
        return {
          code: 40000,
          message: '用户名或密码错误'
        }
      }
    }
  },
  {
    url: '/api/logout',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 20000,
        message: 'success',
        data: query
      }
    }
  }
]

export default userMockList

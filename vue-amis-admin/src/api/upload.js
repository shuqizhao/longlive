import request from '@/utils/request'
import { upAction } from '@/utils/config'
import { getToken } from '@/utils/auth'

export function fileUpload(data) {
  return request({
    url: upAction,
    method: 'post',
    headers: {
      Authorization: getToken()
    },
    data
  })
}

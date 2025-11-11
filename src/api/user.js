import request from '@/utils/request'

//注册接口
export const userRegisterService = ({username,password,repassword})=>{
  return request.post('/api/reg',{username,password,repassword})
}

// 登录接口
export const userLoginService = ({username,password})=>{
  return request.post('/api/login',{username,password})
}

// 获取用户信息
export const userGetInfoService = ()=>{
  return request.get('/my/userinfo')
}

// 更新用户信息
export const userUpdataInfoService = ({id,username,nickname,email})=>{
  return request.put('/my/userinfo',{id,username,nickname,email})
}

// 更新用户头像
export const userUpdataAvatarService = (avatar)=>{
  return request.patch('/my/update/avatar',{avatar})
}

// 更新密码
export const userPasswordService = ({ old_pwd, new_pwd, re_pwd })=>{
  return request.patch('/my/updatepwd',{ old_pwd, new_pwd, re_pwd })
}

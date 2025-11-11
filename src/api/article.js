import request from '@/utils/request'

// 获取文章分类
export const artGetChannelsService = ()=>{
  return request.get('/my/cate/list')
}

// 增加文章分类
export const artAddChannelsService = (data)=>{
  return request.post('/my/cate/add',data)
}

// 更新文章分类 /修改
export const artEditChannelsService = (data)=>{
  return request.put('/my/cate/info',data)
}

// 删除分类
export const artDelChannelsService = (id)=>{
  return request.delete('/my/cate/del',{
    params:{
      id
    }
  })
}
//                List
// 获取文章列表
export const artGetListService = (params)=>{
  return request.get('/my/article/list',{
    params
  })
}

// 发布文章  // form-data形式
export const atrAddListService = (data)=>{
  return request.post('/my/article/add',data)
}

// 获取文章详情
export const artGetDetailService = (id)=>{
  return request.get('my/article/info',{
    params:{id}
  })
}

// 更新编辑文章接口
export const artEditService = (data)=>{
  return request.put('/my/article/info',data)
}

// 删除文章
export const artDelService = (id)=>{
  return request.delete('/my/article/info',{
    params:{id}
  })
}

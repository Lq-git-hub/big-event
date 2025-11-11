<script setup>
import pageContainer from '@/components/pageContainer.vue';
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {useUserstore} from '@/stores/model/user'
import {userUpdataInfoService} from '@/api/user'

const useStore = useUserstore()
const {user:{id,username,nickname,email},getUser} = useStore
// 表单数据
const formModel = ref({
  username, // 示例数据，可根据实际情况修改
  nickname,
  email,
  id
})

// 表单引用
const formRef = ref()
// 加载状态
const loading = ref(false)
// 表单校验规则
const formRules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: 'blur'
    }
  ]
}
// 提交处理
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    // 表单验证
    const valid = await formRef.value.validate()
    if (!valid) return

    loading.value = true

    // 这里可以调用 API 提交数据
    // await updateUserInfo(formModel)
    await userUpdataInfoService(formModel.value)
    getUser()

    ElMessage.success('修改成功')

  } catch (error) {
    // 验证失败或提交失败的处理
    if (error?.errors) {
      ElMessage.warning('请完善表单信息')
    } else {
      ElMessage.error('提交失败，请重试')
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <page-container title="基本资料">
    <el-form
    :model="formModel"
    :rules="formRules" ref="formRef" label-width="80px" size="large"
  >
    <!-- 登录名称 - 禁用状态 -->
    <el-form-item label="登录名称" prop="username">
      <el-input
        v-model="formModel.username" placeholder="" disabled
      />
    </el-form-item>

    <!-- 用户昵称 - 可输入，带校验 -->
    <el-form-item label="用户昵称" prop="nickname">
      <el-input
        v-model="formModel.nickname" placeholder="请输入用户昵称" clearable
      />
    </el-form-item>

    <!-- 用户邮箱 - 可输入，带校验 -->
    <el-form-item label="用户邮箱" prop="email">
      <el-input v-model="formModel.email" placeholder="请输入用户邮箱" clearable
      />
    </el-form-item>

    <!-- 提交按钮 -->
    <el-form-item>
      <el-button
        type="primary" @click="handleSubmit" :loading="loading"
      >
        提交修改
      </el-button>
    </el-form-item>
  </el-form>
  </page-container>
</template>

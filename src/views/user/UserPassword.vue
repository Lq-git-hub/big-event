<script setup>
import pageContainer from '@/components/pageContainer.vue';
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {userPasswordService} from '@/api/user'
import { useUserstore } from '@/stores/model/user';
const userStore = useUserstore()
import {useRouter} from 'vue-router'
const router = useRouter()
// 表单引用
const formRef = ref()

// 加载状态
const loading = ref(false)

// 表单数据
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

// 自定义校验规则 - 原密码和新密码不能相同
const validateDifferentPassword = (rule, value, callback) => {
  if (value === pwdForm.value.old_pwd) {
    callback(new Error('新密码不能与原密码相同'))
  } else {
    callback()
  }
}

// 自定义校验规则 - 确认密码必须与新密码相同
const validateConfirmPassword = (rule, value, callback) => {
  if (value !== pwdForm.value.new_pwd) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

// 表单验证规则
const formRules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    { validator: validateDifferentPassword, trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

// 提交表单
// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    // 表单验证
    const valid = await formRef.value.validate()
    if (!valid) return

    loading.value = true

    console.log('提交的数据:', pwdForm.value) // 调试日志

    // 这里调用修改密码的 API
    await userPasswordService(pwdForm.value)

    ElMessage.success('密码修改成功')
    handleReset() // 重置表单
    userStore.setToken('')
    userStore.removeUser()
    router.push('/login')

  } catch (error) {
    // 详细的错误日志
    console.group('密码修改错误详情')
    console.error('错误对象:', error)
    console.error('响应状态:', error.response?.status)
    console.error('响应数据:', error.response?.data)
    console.error('请求URL:', error.config?.url)
    console.error('请求数据:', error.config?.data)
    console.groupEnd()

    if (error?.errors) {
      ElMessage.warning('请完善表单信息')
    } else if (error.response?.status === 401) {
      ElMessage.error('身份验证失败，请重新登录')
    } else if (error.response?.status === 400) {
      // 显示后端返回的具体错误信息
      const message = error.response.data?.message || '请求参数错误'
      ElMessage.error(message)
    } else if (error.response?.status === 404) {
      ElMessage.error('接口不存在，请检查网络连接')
    } else if (error.response?.data?.message) {
      ElMessage.error(error.response.data.message)
    } else {
      ElMessage.error('提交失败，请重试: ' + (error.message || '未知错误'))
    }
  } finally {
    loading.value = false
  }
}
// 重置表单
const handleReset = () => {
  formRef.value?.resetFields()
}
</script>

<template>
  <page-container title="重置密码">
    <el-form
    ref="formRef"
    :model="pwdForm"
    :rules="formRules"
    label-width="100px"
    size="large"
    class="password-form"
  >
    <!-- 原密码 -->
    <el-form-item label="原密码" prop="old_pwd">
      <el-input
        v-model="pwdForm.old_pwd"
        type="password"
        placeholder="请输入原密码"
        show-password
        clearable
      />
    </el-form-item>

    <!-- 新密码 -->
    <el-form-item label="新密码" prop="new_pwd">
      <el-input
        v-model="pwdForm.new_pwd"
        type="password"
        placeholder="请输入新密码"
        show-password
        clearable
      />
    </el-form-item>

    <!-- 确认密码 -->
    <el-form-item label="确认密码" prop="re_pwd">
      <el-input
        v-model="pwdForm.re_pwd"
        type="password"
        placeholder="请再次输入新密码"
        show-password
        clearable
      />
    </el-form-item>

    <!-- 按钮行 -->
    <el-form-item>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        修改密码
      </el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
  </page-container>
</template>

<style scoped>
.password-form {
  max-width: 500px;
}
</style>

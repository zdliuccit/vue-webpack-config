<template>
  <div>
    <el-form :model="detail" :rules="rules" ref="ruleForm" label-width="108px" onSubmit="return false"
             label-position="left">
      <div title="基础信息">
        <el-form-item label="商家名称" prop="businessName">
          <el-input v-model="detail.businessName"
                    class="base-width"
                    :maxlength="50"
                    placeholder="最多支持50个字">
          </el-input>
        </el-form-item>
        <el-form-item label="商家图片" prop="logoUrl">
        </el-form-item>
        <el-form-item label="商家描述">
          <el-input v-model="detail.describe"
                    resize="none"
                    :autosize="{minRows: 4, maxRows: 6 }"
                    class="middle-width"
                    type="textarea"
                    :maxlength="500">
          </el-input>
        </el-form-item>
      </div>
      <div title="用户信息">
        <el-form-item label="联系人姓名" prop="contactName">
          <el-input v-model="detail.contactName"
                    class="base-width"
                    :maxlength="50">
          </el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="detail.contactPhone"
                    class="base-width"
                    :maxlength="11">
          </el-input>
          <div class="inline-block stress">注:商家登录账户，密码默认为初始化密码</div>
        </el-form-item>
        <el-form-item label="启用状态">
          <el-switch
            v-model="detail.state"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>
      </div>
    </el-form>
    <div class="base-button-warp">
      <el-tooltip content="保存并返回列表" placement="top">
        <el-button type="primary" @click="doSubmit">保存</el-button>
      </el-tooltip>
      <el-button @click="doCancel">取消</el-button>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    data() {
      return {
        rules: {
          businessName: [
            {required: true, message: '请输入名称', trigger: 'change'},
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          contactName: [
            {required: true, message: '请输入联系人姓名', trigger: 'change'},
            {required: true, message: '请输入联系人姓名', trigger: 'blur'},
          ],
          contactPhone: [
            {required: true, message: '请输入联系电话', trigger: 'change'},
            {required: true, message: '请输入联系电话', trigger: 'blur'},
          ],
          logoUrl: [
            {required: true, message: '请上传图片', trigger: 'change'},
            {required: true, message: '请上传图片', trigger: 'blur'},
          ]
        },
        detail: {
          businessName: '', // 商家名称
          describe: '', // 商家描述
          contactName: '', // 联系人姓名
          contactPhone: '', // 联系人电话
          state: true, // 商家状态true启用,false禁用
          logoUrl: '' // 商家logoURL
        },
        title: this.$route.query.id ? '添加商家' : '编辑商家',
      }
    },
    methods: {
      /**
       * 确定事件
       */
      doSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$message.success('提交成功')
          } else {
            this.$message.error('信息填写有误，请核查')
          }
        })
      },
      /**
       * 取消事件
       */
      doCancel() {
        history.go(-1)
      },
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
  .stress {
    margin-left: 5px;
    color: #ff6805;
  }
</style>
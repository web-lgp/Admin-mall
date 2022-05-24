<template>
  <div>
    <h3>商品介绍</h3>
    <el-form
      :model="goodsForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input
          v-model="goodsForm.name"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <el-input
          v-model="goodsForm.desc"
          placeholder="请输入商品描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input
          v-model="goodsForm.price"
          placeholder="请输入商品价格"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          action="http://localhost:8080/api/file/upload"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="goodsForm.imageUrl"
            :src="`${$store.state.path}${goodsForm.imageUrl}`"
            style="width: 250px; height: 250px"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即上架</el-button>
        <el-button @click="cleanForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { insertComm } from "../../api/api";
export default {
  name: "MallAdminCreate",
  data() {
    var checkPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("价格不能为空"));
      }
      setTimeout(() => {
        if (isNaN(value)) {
          console.log(!Number.isInteger(value));
          callback(new Error("请输入数字值"));
        } else {
          if (value <= 0) {
            callback(new Error("不能为0或负数"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      goodsForm: {
        name: "",
        desc: "",
        price: "",
        imageUrl: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        desc: [
          { required: true, message: "请输入商品描述", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { validator: checkPrice, trigger: "blur" },
        ],
        imageUrl: [
          { required: true, message: "请选择商品图片", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      if (
        this.goodsForm.name &&
        this.goodsForm.desc &&
        this.goodsForm.price &&
        this.goodsForm.imageUrl
      ) {
        this.$confirm("确定上传本款商品吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            insertComm(this.goodsForm);
            this.goodsForm.name = "";
            this.goodsForm.desc = "";
            this.goodsForm.price = "";
            this.goodsForm.imageUrl = "";
            this.$message({
              type: "success",
              message: "上传成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消上传",
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "商品信息不完善",
        });
      }
    },
    cleanForm() {
      this.$confirm("检测到未保存的内容，是否重置当前页面内容？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.goodsForm.name = "";
          this.goodsForm.desc = "";
          this.goodsForm.price = "";
          this.goodsForm.imageUrl = "";
        })
        .catch(() => {});
    },
    handleAvatarSuccess(res) {
      this.goodsForm.imageUrl = res;
    },
  },
};
</script>

<style  scoped>
.avatar-uploader {
  width: 250px;
  height: 250px;
  border: 1px dashed #d9dfe8;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 250px;
  height: 250px;
  line-height: 250px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<template>
  <div>
    <el-form :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item>
        <el-input
          size="mini"
          v-model="listQuery.name"
          placeholder="请输入商品关键字"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-search"
          @click="onQuery"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-download"
          @click="onExport"
          >导出</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="商品 ID" prop="id" />
      <el-table-column label="商品名称" prop="name" />
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <el-image :src="`${$store.state.path}${scope.row.img}`"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="商品价格" prop="price" class="price-color" />
      <el-table-column label="商品描述" prop="productDescribe" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="onEditor(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      :current-page="page.page"
    >
    </el-pagination>

    <el-dialog title="更新产品" :visible.sync="dialogFormVisible">
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsForm.name" placeholder="请输入商品名称">
          </el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input v-model="goodsForm.desc" placeholder="请输入商品描述">
          </el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="goodsForm.price" placeholder="请输入商品价格">
          </el-input>
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
              style="width: 100px; height: 100%"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upDateComm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsList, getGoodskey, selectById, updateComm } from "@/api/api";
export default {
  name: "MallAdminList",
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
      page: {
        limit: 5, //一页几条
        page: 1, //第几页
        pages: 1, //总共几页
        total: 0, //总共多少条
      },
      listQuery: {
        name: "",
      },
      tableData: [],
      falgkey: false,
      dialogFormVisible: false,
      commid: "",
    };
  },
  created() {
    getGoodsList(this.page.page, this.page.limit).then((res) => {
      this.tableData = res.data.data.findall.list;
      this.page.total = res.data.data.findall.total;
    });
  },
  methods: {
    onQuery() {
      if (this.listQuery.name) {
        this.falgkey = true;
        getGoodskey(this.listQuery.name, this.page.page, this.page.limit).then(
          (res) => {
            this.tableData = res.data.data.key.list;
            this.page.page = res.data.data.key.pageNum;
            this.page.pages = res.data.data.key.pages;
            this.page.total = res.data.data.key.total;
          }
        );
      }
    },
    onExport() {},
    handleSizeChange(val) {
      if (this.falgkey) {
        if (this.listQuery.name) {
          getGoodskey(this.listQuery.name, this.page.page, val).then((res) => {
            this.tableData = res.data.data.key.list;
            this.page.limit = val;
          });
        }
      } else {
        getGoodsList(this.page.page, val).then((res) => {
          this.tableData = res.data.data.findall.list;
          this.page.limit = val;
        });
      }
    },
    handleCurrentChange(val) {
      console.log(val);
      if (this.falgkey && this.listQuery.name) {
        getGoodskey(this.listQuery.name, val, this.page.limit).then((res) => {
          this.tableData = res.data.data.key.list;
          this.page.page = res.data.data.key.pageNum;
        });
      } else {
        getGoodsList(val, this.page.limit).then((res) => {
          this.tableData = res.data.data.findall.list;
          this.page.page = res.data.data.findall.pageNum;
        });
      }
    },
    onEditor(id) {
      this.dialogFormVisible = true;
      selectById(id).then((res) => {
        this.goodsForm.imageUrl = res.data.data.selByComm.img;
        this.goodsForm.name = res.data.data.selByComm.name;
        this.goodsForm.price = res.data.data.selByComm.price;
        this.goodsForm.desc = res.data.data.selByComm.productDescribe;
        this.commid = res.data.data.selByComm.id;
      });
    },
    handleAvatarSuccess(res) {
      this.goodsForm.imageUrl = res;
    },
    upDateComm() {
      updateComm(this.goodsForm, this.commid);
      this.$confirm("确认更新本商品信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(() => {
          this.dialogFormVisible = false;
          getGoodsList(this.page.page, this.page.limit).then((res) => {
            this.tableData = res.data.data.findall.list;
            this.page.total = res.data.data.findall.total;
          });
          this.$message({
            type: "success",
            message: "更新成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更新",
          });
        });
    },
  },
};
</script>

<style scoped >
.avatar-uploader {
  width: 100px;
  height: 100px;
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
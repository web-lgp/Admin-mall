<template>
  <div class="body">
    <div class="stars" ref="starsRef">
      <div class="star" v-for="(item, index) in starsCount" :key="index"></div>
    </div>

    <div class="box">
      <h2>商城管理系统</h2>
      <form ref="form" :model="form" :rules="rules">
        <div class="inputbox">
          <input type="text" name="" required="" v-model="form.name" />
          <label>Username</label>
        </div>
        <div class="inputbox">
          <input type="password" name=" " required="" v-model="form.pwd" />
          <label>Password</label>
        </div>
        <div @click="login" class="denglu">登 录</div>
      </form>
    </div>
  </div>
</template>

<script>
import { setToken } from "../utils/token";
import { login } from "../api/api";
export default {
  mounted() {
    const starNodes = Array.from(this.$refs.starsRef.children);
    starNodes.forEach((item) => {
      const speed = 0.2 + Math.random() * 1;
      const thisDistance = this.distance + Math.random() * 300;
      item.style.transformOrigin = `0 0 ${thisDistance}px`;
      item.style.transform = `
            translate3d(0,0,-${thisDistance}px)
            rotateY(${Math.random() * 360}deg)
            rotateX(${Math.random() * -50}deg)
            scale(${speed},${speed})`;
    });
  },
  data() {
    return {
      vedioCanPlay: false,
      fixStyle: "",
      form: {
        name: "",
        pwd: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      starsCount: 800,
      distance: 900,
    };
  },
  methods: {
    login() {
      login(this.form).then((res) => {
        if (res.data.data.login != 0) {
          let data=new Date();
          setToken(data.getTime());
          this.$router.push("/");
        } else {
          this.$confirm("账号或密码错误?", "提示", {
            confirmButtonText: "确定",
            showCancelButton:false,
            type: "error",
          })
        }
      });
    },
  },
};
</script>

<style lang="css" scoped>
.denglu {
  width: 80px;
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 50px;
  margin: 0 auto;
  color: #fff;
  font-size: 20px;
  background: transparent;
}
.body {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: radial-gradient(
    200% 100% at bottom center,
    #f7f7b6,
    #e96f92,
    #1b2947
  );
  background: radial-gradient(
    200% 105% at top center,
    #1b2947 10%,
    #75517d 40%,
    #e96f92 65%,
    #f7f7b6
  );
  background-attachment: fixed;
  overflow: hidden;
}

@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}
.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  perspective-origin: 50% 100%;
  left: 45%;
  animation: rotate 90s infinite linear;
  bottom: 0;
}
.star {
  width: 2px;
  height: 2px;
  background: #f7f7b6;
  position: absolute;
  left: 0;
  top: 0;
  backface-visibility: hidden;
}

body {
  margin: 0px;
  padding: 0px;
  font-family: sans-serif;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*实现块元素百分比下居中*/
  width: 450px;
  padding: 50px;
  box-sizing: border-box;
  box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
}
.box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}
.box .inputbox {
  position: relative;
}
.box .inputbox input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.box .inputbox label {
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}
.box .inputbox input:focus ~ label,
.box .inputbox input:valid ~ label {
  top: -18px;
  left: 0;
  color: #03a9f4;
  font-size: 14px;
}
</style>

<template>
  <div id="MallAdminHome">
    <div id="main" style="width: 100%; height: 800px" />
  </div>
</template>

<script>
import JSON from "@/utils/china.json";
import { countSite } from "@/api/api";
export default {
  name: "MallAdminHome",
  data() {
    return {
        time:""
    };
  },
  mounted() {
    this.leftCenterMap();
  },
  methods: {
    leftCenterMap() {
      var myChart = this.$echarts.init(document.getElementById("main")); // 拿到一个实例
      this.$echarts.registerMap("中国", JSON, {}); // 引入地图文件
      let option = {
        title: {
          text: "地区销售分析图",
          subtext: "中国",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter:'{b0}<br />',
        //   formatter:'{b0}:{c0}<br />',
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "map",
            mapType: "中国",// 地图名称
            data:[
                {
                    value:100,
                    name:"安徽省"
                }
            ] 
          },
        ],
      };
      myChart.setOption(option);
      myChart.on("click", (param) => {
        countSite(param.name).then((res) => {
            option.series[0].data[0].name=param.name
            option.series[0].data[0].value=res.data
            option.tooltip.formatter='{b0}:{c0}<br />'
            myChart.setOption(option);
            this.time=setTimeout(()=>{
                option.tooltip.formatter="{b0}<br />"
                myChart.setOption(option);
            },3000)
             
        });
      });
    },
  },
  beforeDestroy(){
    clearTimeout(this.time)
  }
};
</script>

<style scoped>
#MallAdminHome {
  width: 100%;
  height: 100%;
}
#main{
  margin: 0 auto;
}
</style>
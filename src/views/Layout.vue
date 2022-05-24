<template>
    <div class="container">
        <el-container class="container">
            <el-aside :width="isCollapse?'63px':'200px'" class="container">
                <SideBar :isCollapse="isCollapse"/>
            </el-aside>
            <el-container >
                <el-header style="border-bottom: 1px solid gray;">
                    <!-- 面包屑 -->
                    <div>
                        <div class="header-top">
                            <i :class="`el-icon-${isCollapse?'s-unfold':'s-fold'}`" @click="toggleMenu"></i>
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item><span @click="toHome">首页</span></el-breadcrumb-item>
                                <el-breadcrumb-item v-for="(bread,index) in getCurrentMenu" 
                                    :key="index">{{bread}}</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <el-avatar class="touxiang" :src="`${$store.state.path}123.jpg`"/>
                        <span class="name">admin</span>
                    </div>
                    <div>
                        <el-tag v-for="(tag,index) in getTags" :key="index" size="mini" style="margin-right:10px;"
                            :closable="!(tag.path=='/')" :type="tag.path==getActivePath?'success':'info'"
                            @click="tagChange(tag)"
                            @close="tagClose(tag)">
                            {{tag.title}}
                        </el-tag>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import SideBar from "./layout/SideBar"
import {mapGetters} from "vuex"
export default {
    name: 'MallAdminLayout',
    data() {
        return {
            isCollapse:false
        };
    },
    created(){
        if(this.$route.path !== '/'){
            this.$store.commit('addTag',this.$route.path)
        }
    },
    computed: {
        ...mapGetters({
            'getActivePath':'getActivePath',
            'getCurrentMenu':'getCurrentMenu',
            'getTags':'getTags'
        })
    },
    methods: {
        toggleMenu(){
            this.isCollapse=!this.isCollapse
        },
        tagChange(tag){
            if(tag.path !== this.getActivePath){
                this.$store.commit('addTag',tag.path);
                this.$router.push(tag.path);
            }
        },
        tagClose(tag){
           this.$store.commit('delTag',tag);
           if(tag.path === this.getActivePath){
               this.tagChange(this.getTags[this.getTags.length-1]);
           }
        },
        toHome(){
            if('/' !== this.getActivePath){
                this.$store.commit('addTag','/');
                this.$router.push('/');
            }
        }
    },
    components:{
        SideBar
    },
};
</script>

<style lang="less" scoped>
    .container{
        box-sizing: border-box;
        height: 100%;
    }
    .header-top{
        display: flex;
        margin: 10px 5px 5px 5px;
    }
    .touxiang{
        position: absolute;
        top: 5px;
        right: 5%;
    }
    .name{
        position: absolute;
        top: 2%;
        right:2%;
    }
</style>
<template>
    <div class="menu">
        <el-menu
            :default-active="getActivePath"
            router
            class="menu"
            :collapse="isCollapse"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
            @select="menuSelect">
            <template v-for="(item,index) in getMenus">
                <el-submenu v-if="item.isSubMenu" :key="index" :index="item.path">
                    <template slot="title">
                        <i :class="`el-icon-${item.icon}`"></i>
                        <span slot="title">{{item.title}}</span>
                    </template>
                    <el-menu-item v-for="(subItem,subIndex) in item.children" :key="subIndex" 
                        :index="subItem.path">
                        <span slot="title">{{subItem.title}}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item  v-else  :key="index" 
                    :index="item.path">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </template>    
        </el-menu>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
    name: 'MallAdminSidebar',
    props:['isCollapse'],
    data() {
        return {
            
        };
    },
    methods: {
        menuSelect(index){
            this.$store.commit('addTag',index);
        }

    },
    computed:{
        ...mapGetters({
            'getMenus':'getMenus',
            'getActivePath':'getActivePath'
        })
    }
};
</script>

<style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: auto;
        min-height: auto;
    }
    .menu{
        height: 100%;
    }
</style>
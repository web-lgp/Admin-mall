import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    path:'http://localhost:8080/file/',
    menus: [
      { title: '首页', icon: 's-home', isSubMenu: false, path: '/', children: [] },
      {
        title: '商品管理', icon: 's-shop', isSubMenu: true, path: "/goods", children: [
          { title: '商品列表', icon: 'list', isSubMenu: false, path: '/goods/list' },
          { title: '商品上架', icon: 'save', isSubMenu: false, path: '/goods/create' }
        ]
      },
    ],
    activePath: "/",
    currentMenu: [],
    tags: [{ title: '首页', icon: 's-home', isSubMenu: false, path: '/', children: [] }]
  },
  getters: {
    getMenus: state => state.menus,
    getActivePath: state => state.activePath,
    getCurrentMenu: state => state.currentMenu,
    getTags: state => state.tags
  },
  mutations: {
    addTag(state, index) {
      state.activePath = index
      let currentMenu = [];
      let tag;
      state.menus.forEach(element => {
        if (element.path == index) {
          currentMenu.push(element.title);
          tag = element;
        } else if (element.children.length) {
          element.children.forEach(subM => {
            if (subM.path == index) {
              currentMenu.push(element.title);
              currentMenu.push(subM.title);
              tag = subM;
            }
          });
        }
      });
      if(index =='/'){
        currentMenu=[]
      }
      state.currentMenu = currentMenu;
      let tagIndex = state.tags.findIndex(p => {
        return p.path == index;
      })
      if (tagIndex === -1) {
        if (tag)
          state.tags.push(tag);
      }
    },
    delTag(state,tag) {
      let index = state.tags.findIndex(p => {
        return tag.path == p.path;
      })
      if (index !== -1) {
        state.tags.splice(index, 1);
      }
    }
  },
  actions: {
  },
  modules: {
  }
})

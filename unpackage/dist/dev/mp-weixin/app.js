"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/personal/personal .js";
  "./pages/coursetable/coursetable.js";
  "./pages/grades/grades.js";
  "./pages/lostandfound/lostandfound.js";
  "./pages/lost/lost.js";
  "./pages/repair/repair.js";
  "./pages/submitrepair/submitrepair.js";
  "./pages/modificationInformation/modificationInformation.js";
  "./pages/studentmanage/studentmanage.js";
  "./pages/maintenancemanage/maintenancemanage.js";
  "./pages/resultsuploaded/resultsuploaded.js";
  "./pages/courseaddition/courseaddition.js";
  "./pages/login/login.js";
  "./pages/detail/detail.js";
  "./pages/myposting/myposting.js";
  "./pages/adminrpair/adminrpair.js";
  "./pages/adminrpairdetail/adminrpairdetail.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
    common_vendor.index.onAppRoute((route) => {
      if ((route.path === "pages/home/home" || route.path == "pages/personal/personal") && !this.checkLogin()) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
      console.log(route);
    });
    console.log(this.checkLogin());
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    // 检查用户的登录状态
    checkLogin() {
      const token = common_vendor.index.getStorageSync("token") || "";
      if (token) {
        return true;
      } else {
        return false;
      }
    }
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  return {
    app,
    pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;

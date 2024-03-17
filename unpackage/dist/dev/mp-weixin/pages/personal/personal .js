"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "personal ",
  setup(__props) {
    const Isshow = common_vendor.ref(false);
    const Islogin = common_vendor.ref(false);
    const usermessage = common_vendor.reactive({
      account: "",
      username: "",
      usertype: null
    });
    function tomyposting() {
      common_vendor.index.navigateTo({
        url: "/pages/myposting/myposting"
      });
    }
    function modificationInformation() {
      common_vendor.index.navigateTo({
        url: "/pages/modificationInformation/modificationInformation"
      });
    }
    function getmessage() {
      common_vendor.index.getStorage({
        key: "token",
        success: function(e) {
          Isshow.value = true;
          Islogin.value = true;
          console.log(e);
        },
        fail: function(e) {
          console.log(e);
        }
      });
      common_vendor.index.getStorage({
        key: "usermessage",
        success: function(e) {
          usermessage.username = e.data.username;
          usermessage.account = e.data.account;
          usermessage.usertype = e.data.typ;
          console.log("个人信息", e.data);
        },
        fail: function(e) {
          console.log("获取storage失败", e);
        }
      });
    }
    function checkLogin() {
      const token = common_vendor.index.getStorageSync("token") || "";
      if (token) {
        return true;
      } else {
        return false;
      }
    }
    common_vendor.onShow((e) => {
      getmessage();
      common_vendor.index.onAppRoute((route) => {
        if (route.path === "pages/personal/personal " && !checkLogin()) {
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
          console.log("跳转登录也");
        }
        console.log(route);
        console.log(!checkLogin());
      });
    });
    function Signout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "是否退出登录",
        success: function(e) {
          if (e.confirm == true) {
            common_vendor.index.removeStorage({
              key: "usermessage",
              success: function(e2) {
                console.log("移出成功", e2);
              },
              fail: function(e2) {
                console.log("移出失败", e2);
              }
            });
            common_vendor.index.removeStorage({
              key: "token",
              success: function(e2) {
                common_vendor.index.navigateTo({
                  url: "/pages/login/login"
                });
                console.log("移出成功", e2);
              },
              fail: function(e2) {
                console.log("移出失败", e2);
              }
            });
            Isshow.value = false;
            Islogin.value = false;
            usermessage.account = "";
            console.log("退出成功");
          } else {
            console.log("退出失败");
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(Islogin.value ? usermessage.username : "未登录"),
        b: common_vendor.t(usermessage.account),
        c: usermessage.usertype == 1
      }, usermessage.usertype == 1 ? {
        d: common_vendor.o(tomyposting)
      } : {}, {
        e: common_vendor.o(modificationInformation),
        f: Isshow.value
      }, Isshow.value ? {
        g: common_vendor.o(Signout)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-efcefbd9"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/personal/personal .vue"]]);
wx.createPage(MiniProgramPage);

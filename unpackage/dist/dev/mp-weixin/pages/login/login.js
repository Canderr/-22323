"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const items = common_vendor.reactive(["登录", "注册"]);
    const isactive = common_vendor.ref(false);
    const showlogin = common_vendor.ref(0);
    const isshow = common_vendor.ref(0);
    const params = common_vendor.reactive({
      username: "",
      account: "",
      password: ""
    });
    function change(index) {
      if (index == 0) {
        showlogin.value = index;
        isactive.value = false;
      } else {
        showlogin.value = index;
        isactive.value = true;
      }
      console.log(index);
    }
    common_vendor.onShow(() => {
    });
    function Ishow(id) {
      isshow.value = id;
    }
    function studentlogin() {
      api_index.login(params).then((res) => {
        if (res.data.status == 1) {
          const token = res.data.usermessage.token;
          const usermessage = res.data.usermessage;
          common_vendor.index.setStorage({
            key: "token",
            data: token
          });
          common_vendor.index.setStorage({
            key: "usermessage",
            data: usermessage
          });
          common_vendor.index.showToast({
            title: res.data.message,
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: "/pages/home/home"
            });
          }, 1e3);
          console.log("登录成功", res);
        } else {
          common_vendor.index.showModal({
            title: "提示",
            content: res.data.message,
            showCancel: false,
            success: function(res2) {
            }
          });
          console.log("ssss", res);
        }
      }).catch((err) => {
        console.log("登录失败", err);
      });
    }
    function studenregister() {
      api_index.register(params).then((res) => {
        if (res.data.status == 1) {
          common_vendor.index.showToast({
            title: res.data.message,
            icon: "success"
          });
          console.log("注册成功", res);
        } else {
          common_vendor.index.showModal({
            title: "提示",
            content: res.data.message,
            showCancel: false,
            success: function(res2) {
            }
          });
        }
      }).catch((err) => {
        console.log("注册失败", err);
      });
    }
    function admilogingg() {
      api_index.adminlogin(params).then((res) => {
        if (res.data.status == 1) {
          const token = res.data.usermessage.token;
          const usermessage = res.data.usermessage;
          common_vendor.index.setStorage({
            key: "token",
            data: token
          });
          common_vendor.index.setStorage({
            key: "usermessage",
            data: usermessage
          });
          common_vendor.index.showToast({
            title: res.data.message,
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: "/pages/home/home"
            });
          }, 1e3);
          console.log("登录成功", res);
        } else {
          common_vendor.index.showModal({
            title: "提示",
            content: res.data.message,
            showCancel: false,
            success: function(res2) {
            }
          });
          console.log("ssss", res);
        }
      }).catch((err) => {
        console.log("登录失败", err);
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(items, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: isactive.value == index ? 1 : "",
            d: common_vendor.o(($event) => change(index), index)
          };
        }),
        b: showlogin.value == 0
      }, showlogin.value == 0 ? {
        c: common_vendor.o(_ctx.iconClick),
        d: common_vendor.o(($event) => params.account = $event),
        e: common_vendor.p({
          prefixIcon: "person-filled",
          placeholder: "请输入账号",
          modelValue: params.account
        }),
        f: common_vendor.o(_ctx.iconClick),
        g: common_vendor.o(($event) => params.password = $event),
        h: common_vendor.p({
          prefixIcon: "locked-filled",
          placeholder: "请输入密码",
          type: "password",
          modelValue: params.password
        }),
        i: common_vendor.o(studentlogin)
      } : {
        k: common_vendor.o(_ctx.iconClick),
        l: common_vendor.o(($event) => params.username = $event),
        m: common_vendor.p({
          prefixIcon: "person-filled",
          placeholder: "请输入用户名",
          modelValue: params.username
        }),
        n: common_vendor.o(_ctx.iconClick),
        o: common_vendor.o(($event) => params.account = $event),
        p: common_vendor.p({
          prefixIcon: "person-filled",
          placeholder: "请输入账号",
          modelValue: params.account
        }),
        q: common_vendor.o(($event) => params.password = $event),
        r: common_vendor.p({
          prefixIcon: "locked-filled",
          placeholder: "请输入密码",
          ty: true,
          type: "password",
          conClick: "iconClick",
          modelValue: params.password
        }),
        s: common_vendor.o(studenregister)
      }, {
        j: showlogin.value == 1,
        t: isshow.value == 0,
        v: isshow.value == 1
      }, isshow.value == 1 ? {
        w: common_vendor.o(_ctx.iconClick),
        x: common_vendor.o(($event) => params.account = $event),
        y: common_vendor.p({
          prefixIcon: "person-filled",
          placeholder: "请输入账号",
          modelValue: params.account
        }),
        z: common_vendor.o(_ctx.iconClick),
        A: common_vendor.o(($event) => params.password = $event),
        B: common_vendor.p({
          prefixIcon: "locked-filled",
          placeholder: "请输入密码",
          type: "password",
          modelValue: params.password
        }),
        C: common_vendor.o(admilogingg)
      } : {}, {
        D: isshow.value == 2
      }, isshow.value == 2 ? {
        E: common_vendor.o(_ctx.iconClick),
        F: common_vendor.o(($event) => _ctx.account = $event),
        G: common_vendor.p({
          prefixIcon: "person-filled",
          placeholder: "请输入账号",
          modelValue: _ctx.account
        }),
        H: common_vendor.o(_ctx.iconClick),
        I: common_vendor.o(($event) => _ctx.password = $event),
        J: common_vendor.p({
          prefixIcon: "locked-filled",
          placeholder: "请输入密码",
          type: "password",
          modelValue: _ctx.password
        }),
        K: common_vendor.o((...args) => _ctx.maintenancelogin && _ctx.maintenancelogin(...args))
      } : {}, {
        L: isshow.value != 0
      }, isshow.value != 0 ? {
        M: common_vendor.o(($event) => Ishow(0))
      } : {}, {
        N: isshow.value != 1
      }, isshow.value != 1 ? {
        O: common_vendor.o(($event) => Ishow(1))
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);

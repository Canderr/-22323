"use strict";
const common_vendor = require("../../common/vendor.js");
const api_admin = require("../../api/admin.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "studentmanage",
  setup(__props) {
    const studentmessage = common_vendor.reactive([]);
    const config = common_vendor.reactive({
      page: 1,
      //页数
      total: 9
      //每一页的总条数
    });
    function pagqueries() {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      setTimeout(() => {
        api_admin.pageselectstudent(config).then((res) => {
          if (res.data.status == 1) {
            const reults = res.data.users;
            reults.forEach(function(item, index, reults2) {
              studentmessage.push(item);
            });
            config.page = config.page + 1;
            console.log("请求成功", res);
          }
        }).catch((err) => {
          console.log("查询失败", err);
        });
        common_vendor.index.hideLoading();
      }, 1e3);
    }
    function detelstudent(item, index) {
      common_vendor.index.showModal({
        title: "提示",
        content: "是否删除",
        success: function(e) {
          if (e.confirm == true) {
            api_admin.deletestudentid(item).then((res) => {
              if (res.data.status == 1) {
                studentmessage.splice(index, 1);
                console.log("删除成功", res);
              }
            }).catch((err) => {
              console.log("删除失败", err);
            });
          }
        }
      });
    }
    common_vendor.onReachBottom(() => {
      pagqueries();
      console.log("到底刷新了");
    });
    common_vendor.onShow(() => {
      pagqueries();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(studentmessage, (item, index, i0) => {
          return {
            a: common_vendor.t(item.username),
            b: common_vendor.o(($event) => detelstudent(item, index), item.account),
            c: item.account
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-22ecc2c8"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/studentmanage/studentmanage.vue"]]);
wx.createPage(MiniProgramPage);

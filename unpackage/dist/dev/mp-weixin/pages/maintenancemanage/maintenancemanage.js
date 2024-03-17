"use strict";
const common_vendor = require("../../common/vendor.js");
const api_admin = require("../../api/admin.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "maintenancemanage",
  setup(__props) {
    const personnelmessage = common_vendor.reactive([]);
    const config = common_vendor.reactive({
      page: 1,
      //页数
      total: 9
      //每一页的总条数
    });
    function pagqueries() {
      common_vendor.index.showToast({
        title: "加载中",
        icon: "loading",
        mask: true,
        duration: 1e3
      });
      setTimeout(() => {
        api_admin.pageselectpersonnel(config).then((res) => {
          if (res.data.status == 1) {
            const reults = res.data.users;
            reults.forEach(function(item, index, reults2) {
              personnelmessage.push(item);
            });
            if (reults.length == 0)
              ;
            config.page = config.page + 1;
            console.log("请求成功", res);
          }
        }).catch((err) => {
          console.log("查询失败", err);
        });
      }, 1e3);
    }
    function deletperson(item, index) {
      common_vendor.index.showModal({
        title: "提示",
        content: "是否删除",
        success: function(e) {
          if (e.confirm == true) {
            api_admin.deletepersonnelid(item).then((res) => {
              if (res.data.status == 1) {
                personnelmessage.splice(index, 1);
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
        a: common_vendor.f(personnelmessage, (item, index, i0) => {
          return {
            a: common_vendor.t(item.username),
            b: common_vendor.o(($event) => deletperson(item, index), item.account),
            c: item.account
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a3920c41"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/maintenancemanage/maintenancemanage.vue"]]);
wx.createPage(MiniProgramPage);

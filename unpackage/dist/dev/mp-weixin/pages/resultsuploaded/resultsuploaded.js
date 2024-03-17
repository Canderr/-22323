"use strict";
const common_vendor = require("../../common/vendor.js");
const api_admin = require("../../api/admin.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_data_select2 + _easycom_uni_forms_item2 + _easycom_uni_td2 + _easycom_uni_easyinput2 + _easycom_uni_forms2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_forms_item + _easycom_uni_td + _easycom_uni_easyinput + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "resultsuploaded",
  setup(__props) {
    const submitmessage = common_vendor.reactive({
      studentid: null,
      coursevarchid: null,
      couregrade: null,
      academicyea: null
    });
    const students = common_vendor.reactive([]);
    const courses = common_vendor.reactive([]);
    common_vendor.onShow(() => {
      api_admin.selectstudents().then((res) => {
        if (res.data.status == 1) {
          students.length = 0;
          const result = res.data.users;
          result.forEach(function(item) {
            students.push({
              value: item.id,
              text: item.username
            });
          });
        }
      }).catch((err) => {
        console.log("请求失败", err);
      });
    });
    function changestudents(e) {
      submitmessage.studentid = e;
      const config = {
        id: e
      };
      api_admin.selectstudentbyid(config).then((res) => {
        if (res.data.status == 1) {
          courses.length = 0;
          const result = res.data.users;
          result.forEach(function(item) {
            courses.push({
              value: item.coursevarchid,
              text: item.coursename
            });
          });
          console.log("查询成功", res);
        }
      }).catch((err) => {
        console.log("请求失败", err);
      });
      console.log(e);
    }
    function changecourses(e) {
      submitmessage.coursevarchid = e;
      const config = { coursevarchid: e };
      api_admin.selectcouseyear(config).then((res) => {
        if (res.data.status == 1) {
          submitmessage.academicyea = res.data.users[0].academicyear;
          console.log("查询成功", res);
        }
      }).catch((err) => {
        console.log("请求失败", err);
      });
    }
    function submit() {
      api_admin.insertstudentgrade(submitmessage).then((res) => {
        if (res.data.status == 1) {
          common_vendor.index.showToast({
            title: res.data.message,
            icon: "success"
          });
        } else {
          common_vendor.index.showModal({
            title: "提示",
            content: res.data.message,
            showCancel: false
          });
        }
        console.log("请求成功", res);
      }).catch((err) => {
        console.log("请求失败", err);
      });
      console.log(submitmessage);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(changestudents),
        b: common_vendor.o(($event) => students.value = $event),
        c: common_vendor.p({
          localdata: students,
          modelValue: students.value
        }),
        d: common_vendor.p({
          label: "学生"
        }),
        e: common_vendor.o(changecourses),
        f: common_vendor.o(($event) => courses.value = $event),
        g: common_vendor.p({
          localdata: courses,
          modelValue: courses.value
        }),
        h: common_vendor.p({
          label: "课程"
        }),
        i: common_vendor.t(submitmessage.academicyea),
        j: common_vendor.p({
          align: "center"
        }),
        k: common_vendor.p({
          label: "学年"
        }),
        l: common_vendor.o(($event) => submitmessage.couregrade = $event),
        m: common_vendor.p({
          inputBorder: false,
          placeholder: "请输入分数",
          modelValue: submitmessage.couregrade
        }),
        n: common_vendor.p({
          label: "分数"
        }),
        o: common_vendor.p({
          border: true
        }),
        p: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5d98a8c3"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/resultsuploaded/resultsuploaded.vue"]]);
wx.createPage(MiniProgramPage);

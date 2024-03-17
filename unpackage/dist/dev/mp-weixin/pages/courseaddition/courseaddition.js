"use strict";
const common_vendor = require("../../common/vendor.js");
const api_admin = require("../../api/admin.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_data_select2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "courseaddition",
  setup(__props) {
    const students = common_vendor.reactive([]);
    const course = common_vendor.reactive([]);
    const academicyear = common_vendor.reactive([]);
    const submitmessage = common_vendor.reactive({
      studentid: null,
      course: null,
      academicyear: null,
      coursetime: null,
      classtime: null,
      week: null
    });
    const week = common_vendor.reactive([
      {
        value: "周一",
        text: "周一"
      },
      {
        value: "周二",
        text: "周二"
      },
      {
        value: "周三",
        text: "周三"
      },
      {
        value: "周四",
        text: "周四"
      },
      {
        value: "周五",
        text: "周五"
      },
      {
        value: "周六",
        text: "周六"
      },
      {
        value: "周日",
        text: "周日"
      }
    ]);
    const coursetime = common_vendor.reactive([
      {
        value: "1-8周",
        text: "1-8周"
      },
      {
        value: "1-16周",
        text: "1-8周"
      },
      {
        value: "1-12周",
        text: "1-8周"
      },
      {
        value: "4-7周",
        text: "4-7周"
      }
    ]);
    const range = common_vendor.reactive([
      {
        value: "1-2节",
        text: "1-2节"
      },
      {
        value: "1-3节",
        text: "1-3节"
      },
      {
        value: "1-4节",
        text: "1-4节"
      },
      {
        value: "2-4节",
        text: "2-4节"
      },
      {
        value: "3-5节",
        text: "3-5节"
      },
      {
        value: "6-8节",
        text: "6-8节"
      },
      {
        value: "7-8节",
        text: "7-8节"
      },
      {
        value: "9-11节",
        text: "9-11节"
      },
      {
        value: "9-12节",
        text: "9-12节"
      }
    ]);
    function changestudent(e) {
      submitmessage.studentid = e;
    }
    function changecourse(e) {
      submitmessage.course = e;
    }
    function changeacademicyear(e) {
      submitmessage.academicyear = e;
    }
    function changecoursetime(e) {
      submitmessage.coursetime = e;
    }
    function changeclasstime(e) {
      submitmessage.classtime = e;
    }
    function changeweek(e) {
      submitmessage.week = e;
    }
    function submit() {
      api_admin.insertstudentcourseandtime(submitmessage).then((res) => {
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
    common_vendor.onShow(() => {
      api_admin.selectstudents().then((res) => {
        if (res.data.status == 1) {
          students.length = 0;
          const restul = res.data.users;
          restul.forEach(function(item, index, restul2) {
            students.push({
              value: item.id,
              text: item.username
            });
          });
        }
      }).catch((err) => {
        console.log("学生数据请求失败", err);
      });
      api_admin.selectacademicyeartable().then((res) => {
        if (res.data.status == 1) {
          academicyear.length = 0;
          const restul = res.data.users;
          restul.forEach(function(item, index, restul2) {
            academicyear.push({
              value: item.id,
              text: item.academicyear
            });
          });
        }
      }).catch((err) => {
        console.log("学生数据请求失败", err);
      });
      api_admin.selectcourse().then((res) => {
        if (res.data.status == 1) {
          course.length = 0;
          const restul = res.data.users;
          restul.forEach(function(item, index, restul2) {
            course.push({
              value: item.coursevarchid,
              text: item.coursename
            });
          });
        }
      }).catch((err) => {
        console.log("学生数据请求失败", err);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(changestudent),
        b: common_vendor.o(($event) => _ctx.value = $event),
        c: common_vendor.p({
          localdata: students,
          clear: true,
          modelValue: _ctx.value
        }),
        d: common_vendor.p({
          label: "学生"
        }),
        e: common_vendor.o(changecourse),
        f: common_vendor.o(($event) => _ctx.value = $event),
        g: common_vendor.p({
          localdata: course,
          clear: true,
          modelValue: _ctx.value
        }),
        h: common_vendor.p({
          label: "课程"
        }),
        i: common_vendor.o(changeacademicyear),
        j: common_vendor.o(($event) => _ctx.value = $event),
        k: common_vendor.p({
          localdata: academicyear,
          clear: true,
          modelValue: _ctx.value
        }),
        l: common_vendor.p({
          label: "学年"
        }),
        m: common_vendor.o(changecoursetime),
        n: common_vendor.o(($event) => _ctx.value = $event),
        o: common_vendor.p({
          localdata: coursetime,
          clear: true,
          modelValue: _ctx.value
        }),
        p: common_vendor.p({
          label: "课程时间"
        }),
        q: common_vendor.o(changeclasstime),
        r: common_vendor.o(($event) => _ctx.value = $event),
        s: common_vendor.p({
          localdata: range,
          clear: true,
          modelValue: _ctx.value
        }),
        t: common_vendor.p({
          label: "节数"
        }),
        v: common_vendor.o(changeweek),
        w: common_vendor.o(($event) => _ctx.value = $event),
        x: common_vendor.p({
          localdata: week,
          clear: true,
          modelValue: _ctx.value
        }),
        y: common_vendor.p({
          label: "周几"
        }),
        z: common_vendor.p({
          border: true
        }),
        A: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c282f35a"], ["__file", "D:/HBuilderX/HBuider项目/校园综合服务平台/pages/courseaddition/courseaddition.vue"]]);
wx.createPage(MiniProgramPage);

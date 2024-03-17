"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "http://localhost:300";
const http = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseURL + options.url,
      //接口地址：前缀+方法中传入的地址
      method: options.method || "GET",
      //请求方法：传入的方法或者默认是“GET”
      data: options.data || {},
      //传递参数：传入的参数或者默认传递空集合
      header: {
        Authorization: "Bearer " + common_vendor.index.getStorageSync("token")
        //自定义请求头信息
      },
      success: (res) => {
        resolve(res);
      },
      // 这里的接口请求，如果出现问题就输出接口请求失败
      fail: (err) => {
        console.log(err);
        reject(err);
      }
    });
  });
};
const Request = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseURL + options.url,
      //接口地址：前缀+方法中传入的地址
      method: options.method || "GET",
      //请求方法：传入的方法或者默认是“GET”
      data: options.data || {},
      //传递参数：传入的参数或者默认传递空集合
      success: (res) => {
        resolve(res);
      },
      // 这里的接口请求，如果出现问题就输出接口请求失败
      fail: (err) => {
        console.log(err);
        reject(err);
      }
    });
  });
};
exports.Request = Request;
exports.http = http;

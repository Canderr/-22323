"use strict";
const utils_request = require("../utils/request.js");
function login(config) {
  return utils_request.Request({
    url: "/login",
    method: "POST",
    data: config
  });
}
function adminlogin(config) {
  return utils_request.Request({
    url: "/adminlogin",
    method: "POST",
    data: config
  });
}
function register(config) {
  return utils_request.Request({
    url: "/register",
    method: "POST",
    data: config
  });
}
function selectgrade(config) {
  return utils_request.http({
    url: "/student/sutdentgrade",
    method: "GET",
    data: config
  });
}
function selectcourse(config) {
  return utils_request.http({
    url: "/student/studentcourse",
    method: "GET",
    data: config
  });
}
function getqiniutoken() {
  return utils_request.http({
    url: "/student/qiniutoken",
    method: "GET"
  });
}
function insertfindingnotices(config) {
  return utils_request.http({
    url: "/student/insertinsertfindingnotices",
    method: "POST",
    data: config
  });
}
function selectlostandfound() {
  return utils_request.http({
    url: "/student/selectlostandfound",
    method: "GET"
  });
}
function selectfindingnotices() {
  return utils_request.http({
    url: "/student/selectfindingnotices",
    method: "GET"
  });
}
function selectmyposting() {
  return utils_request.http({
    url: "/student/selectposting",
    method: "GET"
  });
}
function updateost(config) {
  return utils_request.http({
    url: "/student/updatelost",
    method: "POST",
    data: config
  });
}
function updatestudentpassword(config) {
  return utils_request.http({
    url: "/student/updatestudentpassword",
    method: "POST",
    data: config
  });
}
function studentinsertrepairorder(config) {
  return utils_request.http({
    url: "/student/studentinsertrepairorder",
    method: "POST",
    data: config
  });
}
function selectpendingrepairorders() {
  return utils_request.http({
    url: "/student/selectpendingrepairorders",
    method: "GET"
  });
}
function selectpendingrepairorderscompleted() {
  return utils_request.http({
    url: "/student/selectpendingrepairorderscompleted",
    method: "GET"
  });
}
exports.adminlogin = adminlogin;
exports.getqiniutoken = getqiniutoken;
exports.insertfindingnotices = insertfindingnotices;
exports.login = login;
exports.register = register;
exports.selectcourse = selectcourse;
exports.selectfindingnotices = selectfindingnotices;
exports.selectgrade = selectgrade;
exports.selectlostandfound = selectlostandfound;
exports.selectmyposting = selectmyposting;
exports.selectpendingrepairorders = selectpendingrepairorders;
exports.selectpendingrepairorderscompleted = selectpendingrepairorderscompleted;
exports.studentinsertrepairorder = studentinsertrepairorder;
exports.updateost = updateost;
exports.updatestudentpassword = updatestudentpassword;

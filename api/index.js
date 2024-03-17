import {http,Request} from '../utils/request.js'
//学生登录接口
export function login(config){
	return Request({
		url:'/login',
		method:'POST',
		data:config
	})
}
//管理员登录接口
export function adminlogin(config){
	return Request({
		url:'/adminlogin',
		method:'POST',
		data:config
	})
}
//学生注册接口
export function register(config){
	return Request({
		url:'/register',
		method:'POST',
		data:config
	})
}

//学生成绩查询
export function selectgrade(config){
	return http({
		url:'/student/sutdentgrade',
		method:'GET',
		data:config
	})
	
}
//学生课程查询
export function selectcourse(config){
	return http({
		url:'/student/studentcourse',
		method:'GET',
		data:config
	})
}
//获取七牛云token
export function getqiniutoken(){
	return http({
		url:'/student/qiniutoken',
		method:'GET'
	})
}
//新增寻物启事
export function insertfindingnotices(config){
	return http({
		url:'/student/insertinsertfindingnotices',
		method:'POST',
		data:config
	})
}
//查询失物招领
export function selectlostandfound(){
	return http({
		url:'/student/selectlostandfound',
		method:'GET'
	})
}
//查询寻物启事
export function selectfindingnotices(){
	return http({
		url:'/student/selectfindingnotices',
		method:'GET'
	})
}
//查询学生发布的寻物启事或失物招领
export function selectmyposting(){
	return http({
		url:'/student/selectposting',
		method:'GET'
	})
}
//修改失物状态为已找到或已认领
export function updateost(config){
	return http({
		url:'/student/updatelost',
		method:'POST',
		data:config
	})
}
//学生密码重置
export function updatestudentpassword(config){
	return http({
		url:'/student/updatestudentpassword',
		method:'POST',
		data:config
	})
}
//学生新增维修订单
export function studentinsertrepairorder(config){
	return http({
		url:'/student/studentinsertrepairorder',
		method:'POST',
		data:config
	})
}
//学生查询维修订单
export function selectpendingrepairorders(){
	return http({
		url:'/student/selectpendingrepairorders',
		method:'GET'
	})
}
//查询学生已完成的维修订单
 export function selectpendingrepairorderscompleted(){
	 return http({
		 url:'/student/selectpendingrepairorderscompleted',
		 method:'GET'
	 })
 }
 export function selectacademicyeartable(){
	 return http({
	 		 url:'/student/selectacademicyeartable',
	 		 method:'GET'
	 })
 }
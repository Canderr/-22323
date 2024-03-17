<template>
	<view>
		<view class="submitmessage">
			<uni-forms border>
				<uni-forms-item label="学生">
					<uni-data-select v-model="students.value" :localdata="students" @change="changestudents"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="课程">
					<uni-data-select v-model="courses.value" :localdata="courses" @change="changecourses"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="学年">
					<uni-td align="center">{{submitmessage.academicyea}}</uni-td>
				</uni-forms-item>
				<uni-forms-item label="分数">
					<uni-easyinput :inputBorder="false" placeholder="请输入分数"
						v-model="submitmessage.couregrade"></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
			<view class="submibutten" @click="submit">提交</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		onShow,
		onLoad,
		onPullDownRefresh,
		onReachBottom
	} from '@dcloudio/uni-app';
	import {
		selectstudents,
		selectstudentbyid,
		selectcouseyear,
		insertstudentgrade
	} from '../../api/admin.js'
	const submitmessage = reactive({
		studentid: null,
		coursevarchid: null,
		couregrade: null,
		academicyea: null
	})
	const students = reactive([])
	const courses = reactive([])
	onShow(() => {
		selectstudents().then((res) => {
			if (res.data.status == 1) {
				students.length = 0
				const result = res.data.users
				result.forEach(function(item) {
					students.push({
						value: item.id,
						text: item.username
					})
				})

			}
		}).catch((err) => {
			console.log('请求失败', err)
		})
	})
	//选择学生
	function changestudents(e) {
		submitmessage.studentid = e
		const config = {
			id: e
		}
		selectstudentbyid(config).then((res) => {
			if (res.data.status == 1) {
				courses.length = 0
				const result = res.data.users
				result.forEach(function(item) {
					courses.push({
						value: item.coursevarchid,
						text: item.coursename
					})
				})
				console.log('查询成功', res)
			}
		}).catch((err) => {
			console.log('请求失败', err)
		})
		console.log(e)
	}
	//选择课程
	function changecourses(e){
		submitmessage.coursevarchid = e
		const config = {coursevarchid:e}
		selectcouseyear(config).then((res)=>{
			if(res.data.status==1){
				submitmessage.academicyea = res.data.users[0].academicyear
				console.log('查询成功',res)
			}
		}).catch((err)=>{console.log('请求失败',err)})
	}
	function submit() {
		insertstudentgrade(submitmessage).then((res)=>{
			if(res.data.status==1){
				uni.showToast({
					title:res.data.message,
					icon:'success'
				})
			}else{
				uni.showModal({
					title: '提示',
					content: res.data.message,
					showCancel: false,
				})
			}
			console.log('请求成功',res)
		}).catch((err)=>{
			console.log('请求失败',err)
		})
		console.log(submitmessage)
	}
</script>

<style lang="scss" scoped>
	view {
		padding: 30rpx;

		.submitmessage {
			box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

			.submibutten {
				line-height: 25rpx;
				text-align: center;
				border-radius: 30rpx;
				margin: 10rpx auto;
				background-color: rgb(77, 116, 247);
				color: #fff;
			}
		}
	}
</style>
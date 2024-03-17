<template>

	<view class="box">
		<view class="backgroud-header">
			<text>Hi</text>
		</view>

		<!-- 学生用户登录 -->
		<view class="login" v-show="isshow==0">
			<view class="control">
				<view v-for="(item,index) in items" :key="index" :class="{active:isactive==index}"
					@click="change(index)">{{item}}</view>
			</view>
			<!-- 登录 -->
			<view class="login-input" v-if="showlogin==0">
				<text>学生用户登录</text>
				<uni-easyinput prefixIcon="person-filled" v-model="params.account" placeholder="请输入账号"
					@iconClick="iconClick"></uni-easyinput>
				<uni-easyinput prefixIcon="locked-filled" v-model="params.password" placeholder="请输入密码" type="password"
					@iconClick="iconClick"></uni-easyinput>
				<view class="sin-up" @click="studentlogin">登录</view>
			</view>
			<!-- 注册 -->
			<view class="login-input" v-else="showlogin==1">
				<uni-easyinput prefixIcon="person-filled" v-model="params.username" placeholder="请输入用户名"
					@iconClick="iconClick"></uni-easyinput>
				<uni-easyinput prefixIcon="person-filled" v-model="params.account" placeholder="请输入账号"
					@iconClick="iconClick"></uni-easyinput>
				<uni-easyinput prefixIcon="locked-filled" v-model="params.password" placeholder="请输入密码" ty
					type="password" conClick="iconClick"></uni-easyinput>
				<view class="sin-up" @click="studenregister">注册</view>
			</view>
		</view>

		<view class="login" v-if="isshow==1">
			<view class="control">
				<view> <text>管理员登录</text></view>
			</view>
			<!-- 登录 -->
			<view class="login-input">
				<uni-easyinput prefixIcon="person-filled" v-model="params.account" placeholder="请输入账号"
					@iconClick="iconClick"></uni-easyinput>
				<uni-easyinput prefixIcon="locked-filled" v-model="params.password" placeholder="请输入密码" type="password"
					@iconClick="iconClick"></uni-easyinput>
				<view class="sin-up" @click="admilogingg">登录</view>

			</view>
		</view>


		<view class="login" v-if="isshow==2">
			<view class="control">
				<view> <text>维修员登录</text></view>
			</view>
			<!-- 登录 -->
			<view class="login-input">

				<uni-easyinput prefixIcon="person-filled" v-model="account" placeholder="请输入账号"
					@iconClick="iconClick"></uni-easyinput>
				<uni-easyinput prefixIcon="locked-filled" v-model="password" placeholder="请输入密码" type="password"
					@iconClick="iconClick"></uni-easyinput>
				<view class="sin-up" @click="maintenancelogin">登录</view>
			</view>
		</view>

	</view>
	
	<view class="isshowusers">
		<view class="users" @click="Ishow(0)"  v-if="isshow!=0">学生登录</view>
		<view class="users" @click="Ishow(1)" v-if="isshow!=1">管理员登录</view>
		<!-- <view class="users" @click="Ishow(2)" v-if="isshow!=2">维修员</view> -->
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	import {
		login,
		register,
		adminlogin
	} from '../../api/index.js'
	const items = reactive(['登录', '注册'])
	const isactive = ref(false) //显示学生端登录注册
	const showlogin = ref(0) //显示学生端登录注册
	const isshow = ref(0)
	const params = reactive({
		username: '',
		account: '',
		password: ''
	})

	function change(index) {
		if (index == 0) {
			showlogin.value = index
			isactive.value = false
		} else {
			showlogin.value = index
			isactive.value = true
		}
		console.log(index)
	}
	onShow(() => {

	})
	function Ishow(id){
		isshow.value =id
	}
	//学生登录请求
	function studentlogin() {
		login(params).then((res) => {
				if (res.data.status == 1) {
					const token = res.data.usermessage.token
					const usermessage = res.data.usermessage
					uni.setStorage({
						key: 'token',
						data: token
					})
					uni.setStorage({
						key: 'usermessage',
						data: usermessage
					})
					uni.showToast({
						title: res.data.message,
						icon: 'success'
					})
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/home/home'
						})
					}, 1000)

					console.log('登录成功', res)
				} else {
					uni.showModal({
						title: '提示',
						content: res.data.message,
						showCancel: false,
						success: function(res) {

						}
					})
					console.log('ssss', res)
				}

			})
			.catch((err) => {
				console.log('登录失败', err)
			})
	}
	
	
	//学生注册接口
	function studenregister() {
		register(params).then((res) => {
				if (res.data.status == 1) {
					uni.showToast({
						title: res.data.message,
						icon: 'success'
					})
					console.log('注册成功', res)
				} else {
					uni.showModal({
						title: '提示',
						content: res.data.message,
						showCancel: false,
						success: function(res) {

						}
					})
				}
			})
			.catch((err) => {
				console.log('注册失败', err)
			})
	}
	
	//管理员登录
	function admilogingg(){
		adminlogin(params).then((res) => {
				if (res.data.status == 1) {
					const token = res.data.usermessage.token
					const usermessage = res.data.usermessage
					uni.setStorage({
						key: 'token',
						data: token
					})
					uni.setStorage({
						key: 'usermessage',
						data: usermessage
					})
					uni.showToast({
						title: res.data.message,
						icon: 'success'
					})
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/home/home'
						})
					}, 1000)
		
					console.log('登录成功', res)
				} else {
					uni.showModal({
						title: '提示',
						content: res.data.message,
						showCancel: false,
						success: function(res) {
		
						}
					})
					console.log('ssss', res)
				}
		
			})
			.catch((err) => {
				console.log('登录失败', err)
			})
	}
</script>

<style lang="scss" scoped>
	.box {
		display: flex;
		justify-content: center;

		.backgroud-header {
			position: fixed;
			font-size: 70rpx;
			text-align: center;
			line-height: 440rpx;
			color: white;
			background: linear-gradient(to bottom left, rgb(110, 73, 212), rgb(105, 125, 222));
			width: 100%;
			height: 650rpx;
			border-bottom-left-radius: 30%;
			border-bottom-right-radius: 30%;
			z-index: -1;
		}


		.login {
			width: 90%;
			// height: 500rpx;
			border: 1px solid rebeccapurple;
			border-radius: 30rpx;
			margin-top: 50%;
			background-color: #fff;

			.control {
				display: flex;
				justify-content: space-around;

				view {
					line-height: 100rpx;
					text-align: center;
					width: 200rpx;
					// border: 1px solid rebeccapurple;

				}

				.active {
					color: rgb(105, 125, 222);
				}
			}

			.login-input {
				padding: 20rpx;
				text-align: center;

				.sin-up {
					width: 35%;
					text-align: center;
					line-height: 50rpx;
					border-radius: 20rpx;
					margin: 50rpx auto;
					background-color: rgb(105, 125, 222);
					color: #fff;
				}
			}

			.chooserole {
				display: flex;

				.chooserole-item {}
			}

		}
	}
	
	.isshowusers{
		width: 90%;
		// margin: 10rpx auto;
		display: flex;
		justify-content: space-between;
		flex-direction: row-reverse;
		.users{
			padding: 5rpx;
			width: 170rpx;
			line-height: 50rpx;
			text-align: center;
			margin-left: 10rpx;
		}
	}
</style>
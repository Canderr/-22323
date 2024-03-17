<template>
	<view class="box">
		<view class="login-header">
			<view class="login-avatar">
				<image
					src="https://tse1-mm.cn.bing.net/th/id/OIP-C.bJ4JHSkZKPvFq81qjo00VAAAAA?w=156&h=176&c=7&r=0&o=5&dpr=1.3&pid=1.7">
				</image>
			</view>
			<text>{{Islogin?usermessage.username:'未登录'}}</text>
		</view>
		<view class="personal-information">
			<view class="information">
				<view class="information-right"><text>工号</text></view>
				<view class="information-left"><text>{{usermessage.account}}</text></view>
			</view>
			<view class="information">
				<view class="information-right"><text>电话</text></view>
				<view class="information-left"><text>33211</text></view>
			</view>
			<view class="information" @click="tomyposting" v-if="usermessage.usertype==1">
				<view class="information-right"><text>我的发布</text></view>
			</view>
			<view class="information" @click="modificationInformation">
				<view class="information-right"><text>重置密码</text></view>
			</view>
		</view>
		<view class="sign-out" v-if="Isshow" @click="Signout">
			<text>退出登录</text>
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
		onLoad
	} from '@dcloudio/uni-app';
	const Isshow = ref(false)
	const Islogin = ref(false)
	const usermessage = reactive({
		account: '',
		username: '',
		usertype:null
	})
	//跳转到我的发布页面
	function tomyposting() {
		uni.navigateTo({
			url: '/pages/myposting/myposting'
		})
	}

	function modificationInformation() {
		uni.navigateTo({
			url: "/pages/modificationInformation/modificationInformation"
		})
	}

	function tologin(index) {
		uni.setStorage({
			key: 'chooserole',
			data: {
				id: index
			}
		})
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}

	function getmessage() {
		uni.getStorage({
			key: 'token',
			success: function(e) {
				Isshow.value = true
				Islogin.value = true
				console.log(e)
			},
			fail: function(e) {
				console.log((e))
			}
		})
		//获取个人信息
		uni.getStorage({
			key: 'usermessage',
			success: function(e) {
				usermessage.username = e.data.username
				usermessage.account = e.data.account
				usermessage.usertype = e.data.typ
				console.log('个人信息', e.data)
			},
			fail: function(e) {
				console.log('获取storage失败', e)
			}
		})
	}
	// 检查用户的登录状态
	function checkLogin() {
		const token = uni.getStorageSync('token') || ''
		if (token) {
			// 检查 token 是否过期等
			return true
		} else {
			return false
		}
	}
	onShow((e) => {
		getmessage()
		//登录权限
		uni.onAppRoute((route) => {
			// 判断页面是否需要登录才能访问
			if (route.path === 'pages/personal/personal ' && !checkLogin()) {
				// 跳转到登录页
				uni.navigateTo({
					url: '/pages/login/login'
				})
				console.log('跳转登录也')
			}
			console.log(route)
			console.log(!checkLogin())
		})
	})
	// 退出登录
	function Signout() {
		uni.showModal({
			title: '提示',
			content: '是否退出登录',
			success: function(e) {
				if(e.confirm==true){
					uni.removeStorage({
						key: 'usermessage',
						success: function(e) {
							console.log('移出成功', e)
						},
						fail: function(e) {
							console.log('移出失败', e)
						}
					})
					uni.removeStorage({
						key: 'token',
						success: function(e) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
							console.log('移出成功', e)
						},
						fail: function(e) {
							console.log('移出失败', e)
						}
					})
					Isshow.value = false
					Islogin.value = false
					usermessage.account = ''
					console.log('退出成功')
				}else{
					console.log('退出失败')
				}
				
			},
		})

	}

</script>

<style lang="scss" scoped>
	.box {
		.login-header {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 320rpx;
			// border-radius: 20rpx;
			background: linear-gradient(to bottom left, rgb(110, 73, 212), rgb(105, 125, 222));
			color: white;

			.login-avatar {
				height: 200rpx;
				width: 200rpx;
				text-align: center;

				image {
					border-radius: 50%;
					height: 100%;
					width: 100%;
				}

			}
		}

		.personal-information {
			.information {
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				border-bottom: 8rpx solid rgb(246, 246, 246);
			}
		}

		.sign-out {
			background-color: rgb(77, 116, 247);
			color: #fff;
			line-height: 100rpx;
			text-align: center;
			margin: 20rpx auto;
			border-radius: 30rpx;
			width: 80%;
		}
	}
</style>
<template>
	<view>
		<view class="submitmessage">
			<uni-forms border>
				<!-- 				<uni-forms-item label="名称">
					<uni-easyinput :inputBorder="false" placeholder="请输入用户名" v-model="submitmessage.username"></uni-easyinput>
				</uni-forms-item> -->
				<uni-forms-item label="旧密码">
					<uni-easyinput :inputBorder="false" placeholder="请输入旧密码"
						v-model="submitmessage.oldpassword" type="password"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="新密码">
					<uni-easyinput :inputBorder="false" placeholder="请输入新密码"
						v-model="submitmessage.password" type="password"></uni-easyinput>
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
		updatestudentpassword
	} from '../../api/index.js'
	const submitmessage = reactive({
		username: '',
		oldpassword: '',
		password: '' //新密码
	})

	function change(e) {
		submitmessage.classify = range[e].text
	}

	function submit() {
		updatestudentpassword(submitmessage).then((res) => {
			if (res.data.status == 1) {
				uni.showToast({
					title: res.data.message,
					icon: 'success'
				})
				setTimeout(() => {
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
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}, 2000)
			} else {
				uni.showModal({
					title: '提示',
					content: res.data.message,
					showCancel: false,
				})

			}
			console.log('修改成功', res)
		}).catch((err) => {
			console.log('修改失败', err)
		})
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
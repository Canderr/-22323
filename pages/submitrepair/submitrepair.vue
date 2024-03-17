<template>
	<view>
		<view class="submitmessage">
			<uni-forms border>
				<uni-forms-item label="设备">
					<uni-easyinput :inputBorder="false" placeholder="请输入设备名"
						v-model="submitmessage.devicename"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="时间">
					<picker mode="date" :value="submitmessage.date" :start="startDate" :end="endDate"
						@change="bindDateChange">
						<view class="uni-input">{{submitmessage.date}}</view>
					</picker>
				</uni-forms-item>
				<uni-forms-item label="电话">
					<uni-easyinput :inputBorder="false" placeholder="请输入联系电话"
						v-model="submitmessage.phone"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="地址">
					<uni-easyinput :inputBorder="false" placeholder="请输入设备地址"
						v-model="submitmessage.address"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="故障">
					<textarea placeholder="请描述故障(150字以内)" v-model="submitmessage.faultdescription"></textarea>
				</uni-forms-item>
			</uni-forms>
			<view class="submibutten" @click="submit">提交</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed
	} from 'vue'
	import {
		studentinsertrepairorder
	} from '../../api/index.js'
	const submitmessage = reactive({
		faultdescription: '',
		devicename: '',
		phone: '',
		address: '',
		date: getDate({
			format: true
		}), //日期
		orderid: Date.now()
	})
	const startDate = computed(() => {
		return getDate('start')
	})
	const endDate = computed(() => {
		return getDate('end');
	})

	function submit() {
		studentinsertrepairorder(submitmessage).then((res) => {
			if (res.data.status == 1) {
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/repair/repair'
					})
				}, 2000)
				uni.showToast({
					title: res.data.message,
					icon: 'success'
				})
			} else {

			}
			console.log('提交成功', res)
		}).catch((err) => {
			console.log('提交失败')
		})
		console.log(submitmessage)
	}
	//获取当前时间
	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}

	function bindDateChange(e) {
		submitmessage.date = e.detail.value
	}
</script>

<style lang="scss" scoped>
	view {
		padding: 30rpx;

		.submitmessage {
			box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

			textarea {
				width: 100%;
				height: 300rpx;
				word-break: break-all;
			}

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
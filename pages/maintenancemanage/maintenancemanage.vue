<template>
	<view>
		<view class="box">
			<view class="students" v-for="(item,index) in personnelmessage" :key="item.account">
				<view class="students-right"><text>{{item.username}}</text></view>
				<view class="students-left">
					<view class="butten" @click="deletperson(item,index)">删除</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onShow,
		onLoad,
		onPullDownRefresh,
		onReachBottom
	} from '@dcloudio/uni-app';
	import {
		reactive,
		ref
	} from 'vue'
	import {
		pageselectpersonnel,
		deletepersonnelid,

	} from '../../api/admin.js'
	const personnelmessage = reactive([])
	const config = reactive({
		page: 1, //页数
		total: 9 //每一页的总条数
	})
	//分页查询
	function pagqueries() {
		// uni.showLoading({
		// 	title: '加载中',
		// 	mask: true
		// })
		uni.showToast({
			title: '加载中',
			icon: 'loading',
			mask: true,
			duration: 1000
		})
		setTimeout(() => {
			pageselectpersonnel(config).then((res) => {
					if (res.data.status == 1) {
						const reults = res.data.users
						reults.forEach(function(item, index, reults) {
							personnelmessage.push(item)
						})
						if (reults.length == 0) {

						}
						config.page = config.page + 1
						console.log('请求成功', res)
					}

				})
				.catch((err) => {
					console.log('查询失败', err)
				})
		}, 1000)
	}
	//根据account删除维修人员
	function deletperson(item, index) {
		uni.showModal({
			title: '提示',
			content: '是否删除',
			success: function(e) {
				if (e.confirm == true) {
					deletepersonnelid(item).then((res) => {
							if (res.data.status == 1) {
								personnelmessage.splice(index, 1)
								console.log('删除成功', res)
							}
						})
						.catch((err) => {
							console.log('删除失败', err)
						})
				}
			}
		})

	}
	onReachBottom(() => {
		pagqueries()
		console.log('到底刷新了')
	})
	onShow(() => {
		pagqueries()
	})
</script>

<style lang="scss" scoped>
	view {
		padding: 20rpx;

		.box {
			box-shadow: 2px 2px 2px 1px rgba(247, 247, 247);

			.students {
				display: flex;
				justify-content: space-between;
				border-bottom: 8rpx solid rgb(246, 246, 246);
				align-items: center;

				.students-left {
					.butten {
						width: 80rpx;
						text-align: center;
						background-color: red;
						color: #fff;
						border-radius: 30rpx;
					}


				}
			}
		}
	}
</style>
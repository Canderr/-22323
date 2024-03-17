<template>
	<view>
		<view class="box">
			<view class="students" v-for="(item,index) in studentmessage" :key="item.account">
				<view class="students-right"><text>{{item.username}}</text></view>
				<view class="students-left">
					<view class="butten" @click="detelstudent(item,index)">删除</view>
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
		pageselectstudent,
		deletestudentid
	} from '../../api/admin.js'
	const studentmessage = reactive([])
	const config = reactive({
		page: 1, //页数
		total: 9 //每一页的总条数
	})
	//分页查询
	function pagqueries() {
		uni.showLoading({
			title: '加载中',
			mask: true
		})
		setTimeout(() => {
			pageselectstudent(config).then((res) => {
					if (res.data.status == 1) {
						const reults = res.data.users
						reults.forEach(function(item, index, reults) {
							studentmessage.push(item)
						})
						config.page = config.page + 1
						console.log('请求成功', res)
					}

				})
				.catch((err) => {
					console.log('查询失败', err)
				})
			uni.hideLoading()
		}, 1000)
	}
	//根据account删除学生
	function detelstudent(item, index) {
		uni.showModal({
			title: '提示',
			content: '是否删除',
			success: function(e) {
				if (e.confirm == true) {
					deletestudentid(item).then((res) => {
							if (res.data.status == 1) {
								studentmessage.splice(index, 1)
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
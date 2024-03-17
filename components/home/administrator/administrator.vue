<template>
	<view class="box">
		<view class="menu" v-for="(item,index) in menu" :key="item.id" @click="tomarrger(item.id)"><text>{{item.text}}</text></view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	const menu = reactive([{
			id: 1,
			text: '学生管理'
		},
		// {
		// 	id: 2,
		// 	text: '维修人员管理'
		// },
		{
			id: 3,
			text: '学生成绩上传'
		}, 
		{
			id:4,
			text:'课程添加'
		},
		{
			id:5,
			text:'报修订单'
		},
		// {
		// 	id:6,
		// 	text:'失物招领订单'
		// }
	])
	function tomarrger(id){
		if(id==1){
			uni.navigateTo({
				url:'/pages/studentmanage/studentmanage'
			})
		}
		if(id==2){
			uni.navigateTo({
				url:'/pages/maintenancemanage/maintenancemanage'
			})
		}
		if(id==3){
			uni.navigateTo({
				url:'/pages/resultsuploaded/resultsuploaded'
			})
		}
		if(id==4){
			uni.navigateTo({
				url:'/pages/courseaddition/courseaddition'
			})
		}
		if(id==5){
			uni.navigateTo({
				url:'/pages/adminrpair/adminrpair'
			})
		}
	}
	
	
</script>

<style lang="scss" scoped>
	.box {
		margin: 100rpx auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.menu {
			margin-bottom: 50rpx;
			width: 43%;
			text-align: center;
			border: 1px solid rebeccapurple;
			line-height: 100rpx;
			// color: #fff;
			// background-color: #fff;
		}
	}
</style>
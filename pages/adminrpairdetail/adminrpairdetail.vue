<template>
	<view>
		维修订单管理详情
	</view>
</template>

<script setup>
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	onLoad((e)=>{
		console.log('接收参数',JSON.parse(e.message))
	})
</script>

<style lang="scss" scoped>

</style>

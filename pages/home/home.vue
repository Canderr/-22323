<template>
	<view class="header">
		<text>校园综合服务平台</text>
	</view>
	<view class="body">
		<homestudent v-if="typ==1"></homestudent>
		<administrator v-if="typ==2"></administrator>
	</view>
</template>

<script setup>
	import homestudent from "@/components/home/homestudent/homestudent.vue"
	import administrator from "@/components/home/administrator/administrator.vue"
	import {
		ref,
		reactive
	} from 'vue'
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	const typ = ref(1)
	const cc = 5
	onShow(()=>{
		uni.getStorage({
			key:'usermessage',
			success:function(e){
				typ.value=e.data.typ
				console.log('usermessag',e.data.typ)
			},
			fail:function(e){
				
			}
		})
	})
</script>

<style lang="scss" scoped>
	.header {
		height: 380rpx;
		background-color: rgb(77, 116, 247);
		// border: 1px solid red;
		line-height: 380rpx;
		color: white;
		text-align: center;
		font-size: 35rpx;
	}

	.body {
		background: linear-gradient(rgb(77, 116, 247), rgb(191, 220, 254));
		padding: 10rpx 20rpx;
	}
</style>
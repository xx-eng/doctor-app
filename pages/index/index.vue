<template>
	<view class="content">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>
		
		<img src="../../static/homebg.jpg" />
		
		<view class="category">
			<view class="category-box" style="position: absolute; left: 20%">
				<view class="icon-style">
					<u-icon name="account" color="#ffffff" size="100" style="position: relative; top: 20rpx;"></u-icon>
				</view>
				<view style="width: 100%; text-align: center; color: #4371af;">医生导览</view>
			</view>
			<view class="category-box" style="position: relative;left: 70%; top: 0px;">
				<view class="icon-style">
					<u-icon name="heart" color="#ffffff" size="100" style="position: relative; top: 20rpx;"></u-icon>
				</view>
				<view style="width: 100%; text-align: center; color: #4371af;">医疗服务</view>
			</view>
		
		</view>
		
		<view class="org">
			<view class="o-title">医院机构介绍</view>
			<img class="o-img" src="../../static/homeOrgnization.jpg"/>
		</view>
		
		<u-tabbar
			v-model="current" 
			:show="show" 
			:bg-color="bgColor" 
			:border-top="borderTop" 
			:list="list" 
			:inactive-color="inactiveColor" 
			:activeColor="activeColor"
			@change="gotoOther">
		</u-tabbar>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '家庭医生',
				backIconName: 'home-fill',
				backText: '',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(79, 121, 164), rgb(130, 174, 222))'
				},
				adverts: [
					{
						image: 'homebg.jpg'
					}
				],
				
				current: 0,
				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						count: 0,
						isDot: true,
						customIcon: false,
						pagePath: '/pages/index/index',
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '医生导览',
						customIcon: false,
						pagePath: '/pages/doctor/index',
					},
					{
						iconPath: "heart",
						selectedIconPath: "heart-fill",
						text: '医疗服务',
						customIcon: false,
						pagePath: '/pages/service/index',
					}
				],
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#4371af'
			}
		},
		onLoad() {

		},
		methods: {
			gotoOther(){
				console.log('index', this.current)
			},
			gotoLogin(){
				uni.navigateTo({
					url: '../login/Login',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.category{
		margin-top: 50rpx;
	}
	.icon-style{
		background-color: #4371af;
		border-radius: 100rpx;
		height: 150rpx;
		width:150rpx;
		text-align: center;
	}
	.org{
		width: 90%;
		position: relative;
		left: 50%;
		transform: translate(-50%);
		margin-top: 50rpx;
		text-align: center;
	}
	.o-title{
		color:#fff;
		background-color: #4371af;
	}
	.o-img{
		width: 100%;
	}

</style>

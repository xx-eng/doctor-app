<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>

		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" @click="gotoPersonal()">
			<view class="u-m-r-10">
				<u-avatar size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userInfo.name}}</view>
				<view class="u-font-14" style="color: rgba(255,255,255, 0.6);">性别:{{userInfo.sex}}</view>
				<view class="u-font-14" style="color: rgba(255,255,255, 0.6);">手机号:{{userInfo.mobile}}</view>
				<view class="u-font-14" style="color: rgba(255,255,255, 0.6);">地址:{{userInfo.address}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="rgba(255,255,255, 0.8)" size="28"></u-icon>
			</view>
		</view>

		<view class="introduction">
			<view class="introduction-title">医疗服务</view>
			<view class="category-box" style="position: absolute; left: 10% ;" @click="goToAppoint()">
				<view class="icon-style">
					<u-icon name="list-dot" color="#ffffff" size="100" style="position: relative; top: 20rpx;"></u-icon>
				</view>
				<view style="width: 100%; text-align: center; color: #4371af;">预约挂号</view>
			</view>
			<view class="category-box" style="position: absolute; left: 40%" @click="goToSign()">
				<view class="icon-style">
					<u-icon name="edit-pen-fill" color="#ffffff" size="100" style="position: relative; top: 20rpx;"></u-icon>
				</view>
				<view style="width: 100%; text-align: center; color: #4371af;">签约</view>
			</view>
			<view class="category-box" style="position: absolute; right: 10%" @click="goToCancel()">
				<view class="icon-style">
					<u-icon name="close" color="#ffffff" size="100" style="position: relative; top: 20rpx;"></u-icon>
				</view>
				<view style="width: 100%; text-align: center; color: #4371af;">解约</view>
			</view>
		</view>
		<view class="introduction">
			<view class="introduction-title">查看预约记录</view>
			<view class="category-box" style="position: absolute; left: 10% ;" @click="goToRecord()">
				<view class="icon-style">
					<u-icon name="calendar" color="#ffffff" size="100" style="position: relative; top: 20rpx;"></u-icon>
				</view>
				<view style="width: 100%; text-align: center; color: #4371af;">查看预约记录</view>
			</view>
		</view>

		<u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor" @change="gotoOther">
		</u-tabbar>
	</view>
</template>

<script>
	import {getUserInfo} from '../../api/user.js'
	import {getSignInfo} from '../../api/sign.js'
	import {getDoctorInfo} from '../../api/doctor.js'
	import user from "@/storev/module/user.js";
	export default {
		data() {
			return {
				title: '医疗服务',
				backIconName: 'home-fill',
				backText: '',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(79, 121, 164), rgb(130, 174, 222))'
				},
				adverts: [{
					image: 'homebg.jpg'
				}],

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
				activeColor: '#4371af',

				borderColor: '#e4e7ed',
				align: 'center',

				userInfo: {
					// id: 1,
					// name: '汪道文',
					// sex: '男',
					// time: '2015-10',
					// age: '50',
					// mobile: '15843568907',
					// idCard: 100000000000000,
					// addressId: '1',
					// address: 'XX社区',
					// medicalHistory: '',
					// allergy: ''
				},
				signInfo: {},
				doctor: {}
			};
		},
		onLoad() {
			// this.getInfo()
			// if(user.state.userId === ''){
			// 	console.log('user', user.state.userId)
			// 	this.gotoLogin()
			// }else{
			// 	this.getInfo()
			// }
		},
		computed: {},
		mounted(){
			console.log('************', this.userInfo)
			if(user.state.userId === ''){
				console.log('user', user.state.userId)
				this.gotoLogin()
			}else{
				this.getInfo()
			}
		},
		methods: {
			gotoOther() {
				console.log('index', this.current)
			},
			goToSign() {
				// if(this.signInfo === null){
					uni.navigateTo({
						url: 'sign/sign',
						success: (res) => {
							console.log(res)
						},
						fail: (err) => {
							console.log(err)
						}
					})
				// }else{
				// 	uni.showToast({
				// 		title: '您已签约'
				// 	})
				// }
			},
			goToCancel() {
				if(this.signInfo !== null){
					uni.navigateTo({
						url: 'cancel/cancel',
						success: (res) => {
							console.log(res)
						},
						fail: (err) => {
							console.log(err)
						}
					})
				}else{
					uni.showToast({
						title:'您未签约'
					})
				}
			},
			goToAppoint() {
				if(this.signInfo !== null){
					uni.navigateTo({
						url: 'appoint/appoint',
						success: (res) => {
							console.log(res)
						},
						fail: (err) => {
							console.log(err)
						}
					})
				}else{
					uni.showToast({
						title:'您未签约'
					})
				}
			},
			goToRecord() {
				if(this.signInfo !== null){
					uni.navigateTo({
						url: 'record/record',
						success: (res) => {
							console.log(res)
						},
						fail: (err) => {
							console.log(err)
						}
					})
				}else{
					uni.showToast({
						title:'您未签约'
					})
				}
			},
			gotoPersonal() {
				uni.navigateTo({
					url: 'personal/personal?user='+ encodeURIComponent(JSON.stringify(this.userInfo)),
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
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
			},
			getInfo() {
				getUserInfo().then(res => {
					this.userInfo = res.data
					console.log('userInfo', this.userInfo)
					getSignInfo(this.userInfo.id).then(res => {
						this.signInfo = res.data
						getDoctorInfo(this.signInfo.doctorId).then(res => {
							this.doctor = res.data
							this.doctor.photo = process.env.VUE_APP_API_HOST + '/' + this.doctor.photo
						})
					})
				})
			}
		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.user-box {
		background-image: linear-gradient(45deg, rgb(79, 121, 164), rgb(130, 174, 222));
		width: 100%;
		height: 300rpx;
		color: #FFFFFF;
	}

	.introduction {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;
		height: 380rpx;

	}

	.introduction-title {
		font-size: 35rpx;
		font-weight: bold;
		letter-spacing: 5rpx;
		font-family: 'DFKai-SB';
		position: relative;
		left: 3%;
		margin-bottom: 40rpx;
	}

	.introduction-info {
		width: 96%;
		position: relative;
		left: 50%;
		transform: translate(-50%);
		margin-top: 15rpx;
		color: #999999;
	}

	.icon-style {
		background-color: #4371af;
		border-radius: 100rpx;
		height: 150rpx;
		width: 150rpx;
		text-align: center;
	}
</style>

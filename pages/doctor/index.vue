<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#4371af" ref="tabs" :list="swiperList" :current="current" @change="change" :is-scroll="false"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in doctorList" :key="item.id">
								<view class="item">
									<!-- v-for="(item, index) in res.goodsList" :key="index" -->
									<view class="left">
										<image :src="item.photo" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.name }}</view>
										<view class="type">性别：{{ item.sex }}</view>
										<view class="delivery-time">职称：{{ item.professionalTitle }}</view>
										<view class="type u-line-2">剩余签约人数：{{ item.remainNum }}</view>
									</view>
									<view class="right">
										<view class="price">
											<view class="evaluate btn" @click="goToDetail()">详细信息</view>
											<!-- <text class="decimal">.</text> -->
										</view>
									</view>
								</view>
								<!-- <view class="total">
									共{{ totalNum(res.goodsList) }}件商品 合计: 
									<text class="total-price">
										￥ {{ priceInt(totalPrice(res.goodsList)) }}. 
										<text class="decimal"> {{ priceDecimal(totalPrice(res.goodsList)) }}</text>
									</text>
								</view> -->
								<!-- <view class="bottom">
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view>
									<view class="evaluate btn">详细信息</view>
								</view> -->
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		
		</view>

		<u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor" @change="gotoOther">
		</u-tabbar>
	</view>
</template>

<script>
	import {
		listDoctor
	} from '../../api/doctor.js'
	import user from "@/storev/module/user.js";
	const imageUrl = 'http://121.40.235.133:8181/'
	
	export default {
		data() {
			return {
				title: '医生列表',
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

				doctorList: [{
						id: 1,
						name: '汪道文',
						photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F08%2F28%2Ffe620dddf5de38d32c98aa33b5e13a26.jpg%21%2Ffwfh%2F804x985%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625485100&t=91f3c9f29ef13f66371353e1bc3b0810',
						professionalTitle: '主任医师',
						sex: '男',
						time: '2015-10',
						age: '50',
						mobile: '15843568907',
						remainNum: 25,
						addressId: '1',
						address: 'XX社区',
						experience: '1975年毕业于同济医科大学医疗系，1986年赴西德乌尔姆大学学习，' +
							'获医学博士学位。主研优生优育，高危妊娠，获多项国家自然科学基金，在多年的临床工作与研究中，共发表百余篇论著，参与多部著作的编写。任中华医学会武汉市分会妇产科学会荣誉主委、中国优生优育协会理事、湖北省优生优育协会副会长、湖北省预防医学会副主任委员。任“中华临床杂志”、“实用妇产科杂志”、“中华中西医杂志”、“华中医学杂志”常务编委，任“中国实用妇科与产科杂志”编委等'

					},
					{
						id: 2,
						name: '汪道文',
						photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F08%2F28%2Ffe620dddf5de38d32c98aa33b5e13a26.jpg%21%2Ffwfh%2F804x985%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625485100&t=91f3c9f29ef13f66371353e1bc3b0810',
						professionalTitle: '主任医师',
						sex: '男',
						time: '2015-10',
						age: '50',
						mobile: '15843568907',
						remainNum: 25,
						addressId: '1',
						address: 'XX社区',
						experience: '1975年毕业于同济医科大学医疗系，1986年赴西德乌尔姆大学学习，' +
							'获医学博士学位。主研优生优育，高危妊娠，获多项国家自然科学基金，在多年的临床工作与研究中，共发表百余篇论著，参与多部著作的编写。任中华医学会武汉市分会妇产科学会荣誉主委、中国优生优育协会理事、湖北省优生优育协会副会长、湖北省预防医学会副主任委员。任“中华临床杂志”、“实用妇产科杂志”、“中华中西医杂志”、“华中医学杂志”常务编委，任“中国实用妇科与产科杂志”编委等'

					}
				],
				swiperList: [{
					name: '医生列表'
				}],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onLoad() {
			// if(user.state.userId === ''){
			// 	console.log('user', user.state.userId)
			// 	this.gotoLogin()
			// }
			// this.getDoctorList()
		},
		mounted() {
			if(user.state.userId === ''){
				console.log('user', user.state.userId)
				this.gotoLogin()
			}
			this.getDoctorList()
		},
		computed: {},
		methods: {
			gotoOther() {
				console.log('index', this.current)
			},
			goToDetail() {
				console.log('gotoDetail')
				uni.navigateTo({
					url: 'doctorInfo/doctorInfo',
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			reachBottom() {
				// 此tab为空数据
				if (this.current != 2) {
					this.loadStatus.splice(this.current, 1, "loading")
					setTimeout(() => {
						this.getDoctorList(this.current);
					}, 1200);
				}
			},
			// 页面数据
			getDoctorList(idx) {
				console.log('doctorlist???')
				listDoctor().then(res => {
					this.doctorList = res.data
					for(let doctor of this.doctorList){
						doctor.photo = imageUrl + doctor.photo
					}
					console.log(this.doctorList)
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
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.getOrderList(index);
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
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
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: #4371af;
				// $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #4371af;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 90rpx;
				padding-top: 60rpx;
				text-align: right;

				.btn {
					line-height: 52rpx;
					width: 160rpx;
					border-radius: 26rpx;
					border: 2rpx solid $u-border-color;
					font-size: 26rpx;
					text-align: center;
					color: $u-type-info-dark;
				}

				.evaluate {
					color: #4371af;
					// $u-type-warning-dark;
					border-color: #4371af;
					// $u-type-warning-dark;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: #4371af;
				// $u-type-warning-dark;
				border-color: #4371af;
				// $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(79, 121, 164, 1) 0%, rgba(130, 174, 222, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>

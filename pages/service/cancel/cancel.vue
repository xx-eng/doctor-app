<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>

		<view class="basic-info">
			<image :src="doctor.photo" class="doctor-photo"></image>
			<view class="basic">
				<view>{{doctor.name}}「{{doctor.sex}}」</view>
				<view style="margin-top: 20rpx;">职称：{{doctor.professionalTitle}}</span></view>
				<view style="margin-top: 20rpx;">办公电话：{{doctor.mobile}}</span></view>
			</view>
		</view>
		<view class="introduction" v-if="model.status === 1">
			<view class="introduction-title">提交解约信息</view>
			<view>
				<u-form :model="model" ref="uForm" :rules="rules">
					<u-form-item label="解约原因" label-width="200rpx">
						<u-input v-model="model.reason"></u-input>
					</u-form-item>
				</u-form>
				<u-button @click="submit()">提交</u-button>
			</view>
			<view></view>
		</view>
		<view class="introduction" v-else-if="model.status === 2">
			<view class="introduction-title">解约状态</view>
			<view style="margin-top: 50rpx;">
				<u-steps :list="numList" :current="1"></u-steps>
			</view>
		</view>
		<view class="introduction" v-else-if="model.status === 3">
			<view class="introduction-title">解约状态</view>
			<view style="margin-top: 50rpx;">
				<u-steps :list="numList" :current="2"></u-steps>
			</view>
		</view>
		<view class="introduction" v-else-if="model.status === 4">
			<view class="introduction-title">解约状态</view>
			<view style="margin-top: 50rpx;">
				<u-steps :list="numList" :current="2"></u-steps>
			</view>
		</view>

		<u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor" @change="gotoOther">
		</u-tabbar>
	</view>
</template>

<script>
	import {
		cancelDoctor
	} from '../../../api/sign.js'
	import {
		getUserInfo
	} from '../../../api/user.js'
	import {
		getSignInfo
	} from '../../../api/sign.js'
	import {
		getDoctorInfo
	} from '../../../api/doctor.js'
	export default {
		data() {
			return {
				title: '解约医生',
				backIconName: 'nav-back',
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

				doctor: {
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
				userInfo: {},

				model: {
					id: 1,
					doctorId: 1,
					userId: 1,
					status: 2,
					reason: ''
				},
				rules: {
					reason: [{
							required: true,
							message: '请输入原因',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.cancelForm.form.reason;
							},
							message: '请输入原因',
							trigger: ['change', 'blur'],
						}
					]
				},
				numList: [{
					name: '申请解约'
				}, {
					name: '等待审核'
				}, {
					name: '审核通过'
				} ],
			};
		},
		onLoad() {},
		computed: {},
		mounted() {
			this.getInfo()
		},
		methods: {
			gotoOther() {
				console.log('index', this.current)
			},
			submit() {
				if (this.model.reason != '') {
					cancelDoctor({
						do_id: this.model.doctorId,
						reason: this.model.reason
					}).then(res => {
						console.log(res)
					})
				} else {
					uni.showToast({
						title: '请输入原因'
					})
				}
				console.log('提交')
				// this.$refs.uForm.validate(valid => {
				// 	console.log('???')
				// 	if (valid) {

				// 		console.log('验证通过');
				// 	} else {
				// 		console.log('验证失败');
				// 	}
				// });
			},
			getInfo() {
				getUserInfo().then(res => {
					this.userInfo = res.data
					console.log('userInfo', this.userInfo)
					getSignInfo(this.userInfo.id).then(res => {
						this.model = res.data
						console.log('signInfo', this.model)
						getDoctorInfo(this.model.doctorId).then(res => {
							this.doctor = res.data
							this.doctor.photo = 'http://121.40.235.133:8181' + '/' + this.doctor.photo
							console.log('doctor', this.doctor)
						})
					})
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
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
	.basic-info {
		background-image: linear-gradient(45deg, rgb(79, 121, 164), rgb(130, 174, 222));
		width: 100%;
		height: 300rpx;
		color: #FFFFFF;
	}

	.doctor-photo {
		width: 150rpx;
		height: 150rpx;
		margin-top: 70rpx;
		margin-left: 20%;
		border-radius: 20rpx;
	}

	.basic {
		position: relative;
		top: -170rpx;
		left: 45%;

	}

	.introduction {
		width: 710rpx;
		background-color: #ffffff;
		// position: relative;
		// top: 600rpx;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

	}

	.introduction-title {
		font-size: 35rpx;
		font-weight: bold;
		letter-spacing: 5rpx;
		font-family: 'DFKai-SB';
		position: relative;
		left: 3%;
	}

	.introduction-info {
		width: 96%;
		position: relative;
		left: 50%;
		transform: translate(-50%);
		margin-top: 15rpx;
		color: #999999;
	}

	.table {
		width: 710rpx;
		position: relative;
		left: 50%;
		transform: translate(-50%);
		margin-bottom: 20rpx;
	}

	.btn {
		line-height: 30rpx;
		width: 100rpx;
		border-radius: 26rpx;
		border: 2rpx solid $u-border-color;
		font-size: 26rpx;
		text-align: center;
		color: $u-type-info-dark;
		position: relative;
		left: 50%;
		transform: translate(-50%);
	}

	.evaluate {
		color: #4371af;
		// $u-type-warning-dark;
		border-color: #4371af;
		// $u-type-warning-dark;
	}

	.u-th {
		background-color: #4371af;
		color: #FFFFFF;
	}
</style>

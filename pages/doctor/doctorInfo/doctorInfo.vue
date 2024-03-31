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
		
		<view class="introduction">
			<view class="introduction-title">个人介绍</view>
			<view class="introduction-info">{{ doctor.experience }}</view>
		</view>
		
		<u-table :borderColor="borderColor" class="table">
			<u-tr class="u-tr">
				<u-th class="u-th">日期</u-th>
				<u-th class="u-th">星期</u-th>
				<u-th class="u-th">上午</u-th>
				<u-th class="u-th">下午</u-th>
			</u-tr>
			<u-tr class="u-tr">
				<u-td class="u-td">
					{{week[0].month}}
				</u-td>
				<u-td class="u-td">
					{{week[0].week}}
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[0].morning" class="evaluate btn" @click="appointDoctor(week[0].day,1)">预约</view>
					<view v-else>----</view>
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[0].afternoon" class="evaluate btn" @click="appointDoctor(week[0].day,2)">预约</view>
					<view v-else>----</view>
				</u-td>
			</u-tr>
			<u-tr class="u-tr">
				<u-td class="u-td">
					{{week[1].month}}
				</u-td>
				<u-td class="u-td">
					{{week[1].week}}
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[1].morning" class="evaluate btn" @click="appointDoctor(week[1].day,1)">预约</view>
					<view v-else>----</view>
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[1].afternoon" class="evaluate btn" @click="appointDoctor(week[1].day,2)">预约</view>
					<view v-else>----</view>
				</u-td>
			</u-tr>
			<u-tr class="u-tr">
				<u-td class="u-td">
					{{week[2].month}}
				</u-td>
				<u-td class="u-td">
					{{week[2].week}}
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[2].morning" class="evaluate btn" @click="appointDoctor(week[2].day,1)">预约</view>
					<view v-else>----</view>
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[2].afternoon" class="evaluate btn" @click="appointDoctor(week[2].day,2)">预约</view>
					<view v-else>----</view>
				</u-td>
			</u-tr>
			<u-tr class="u-tr">
				<u-td class="u-td">
					{{week[3].month}}
				</u-td>
				<u-td class="u-td">
					{{week[3].week}}
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[3].morning" class="evaluate btn" @click="appointDoctor(week[3].day,1)">预约</view>
					<view v-else>----</view>
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[3].afternoon" class="evaluate btn" @click="appointDoctor(week[3].day,2)">预约</view>
					<view v-else>----</view>
				</u-td>
			</u-tr>
			<u-tr class="u-tr">
				<u-td class="u-td">
					{{week[4].month}}
				</u-td>
				<u-td class="u-td">
					{{week[4].week}}
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[4].morning" class="evaluate btn" @click="appointDoctor(week[4].day,1)">预约</view>
					<view v-else>----</view>
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[4].afternoon" class="evaluate btn" @click="appointDoctor(week[4].day,2)">预约</view>
					<view v-else>----</view>
				</u-td>
			</u-tr>
			<u-tr class="u-tr">
				<u-td class="u-td">
					{{week[5].month}}
				</u-td>
				<u-td class="u-td">
					{{week[5].week}}
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[5].morning" class="evaluate btn" @click="appointDoctor(week[5].day,1)">预约</view>
					<view v-else>----</view>
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[5].afternoon" class="evaluate btn" @click="appointDoctor(week[5].day,2)">预约</view>
					<view v-else>----</view>
				</u-td>
			</u-tr>
			<u-tr class="u-tr">
				<u-td class="u-td">
					{{week[6].month}}
				</u-td>
				<u-td class="u-td">
					{{week[6].week}}
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[6].morning" class="evaluate btn" @click="appointDoctor(week[6].day,1)">预约</view>
					<view v-else>----</view>
				</u-td>
				<u-td class="u-td">
					<view v-if="schedule[6].afternoon" class="evaluate btn" @click="appointDoctor(week[6].day,2)">预约</view>
					<view v-else>----</view>
				</u-td>
			</u-tr>
		</u-table>
		
		
		<u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor" @change="gotoOther">
		</u-tabbar>
	</view>
</template>

<script>
	import {
		getSchedule
	} from '../../../api/doctor.js';
	import {
		getUserInfo
	} from '../../../api/user.js';
	import {
		getSignInfo
	} from '../../../api/sign.js';
	import {
		getDoctorInfo
	} from '../../../api/doctor.js';
	import user from "@/storev/module/user.js";
	import moment from 'moment'
	export default {
		data() {
			return {
				title: '医生详情',
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
				signInfo: {},
				schedule: [{
						morning: false,
						afternoon: false
					},
					{
						morning: false,
						afternoon: false
					},
					{
						morning: false,
						afternoon: false
					},
					{
						morning: false,
						afternoon: false
					},
					{
						morning: false,
						afternoon: false
					},
					{
						morning: false,
						afternoon: false
					},
					{
						morning: false,
						afternoon: false
					}
				],
				week: [],
			};
		},
		onLoad() {
		},
		mounted() {
			console.log('************', user.state.userId)
			if (user.state.userId === '') {
				console.log('user', user.state.userId)
				this.gotoLogin()
			} else {
				this.getInfo()
				this.getTime()
			}
		},
		computed: {
		},
		methods: {
			gotoOther() {
				console.log('index', this.current)
			},
			getInfo() {
				getUserInfo().then(res => {
					this.userInfo = res.data
					console.log('userInfo', this.userInfo)
					getSignInfo(this.userInfo.id).then(res => {
						this.signInfo = res.data
						getDoctorInfo(this.signInfo.doctorId).then(res => {
							this.doctor = res.data
							this.doctor.photo = 'http://121.40.235.133:8181' + '/' + this.doctor.photo
							if (this.doctor.sex === 1) {
								this.doctor.sexName = '男'
							} else if (this.doctor.sex === 2) {
								this.doctor.sexName = '女'
							}
						})
					})
				})
			},
			getTime() {
				var w = moment().format('E')
				for (var i = 0; i < 7; i++) {
					var dayWeek = (Number(w) + i) % 7
					if (dayWeek === 0) {
						dayWeek = '周日'
					} else if (dayWeek === 1) {
						dayWeek = '周一'
					} else if (dayWeek === 2) {
						dayWeek = '周二'
					} else if (dayWeek === 3) {
						dayWeek = '周三'
					} else if (dayWeek === 4) {
						dayWeek = '周四'
					} else if (dayWeek === 5) {
						dayWeek = '周五'
					} else if (dayWeek === 6) {
						dayWeek = '周六'
					}
					this.week[i] = {
						day: moment().add(i, 'days').format('YYYY-MM-DD'),
						week: dayWeek,
						month: moment().add(i, 'days').format('YYYY-MM-DD').substring(5, 10)
					}
				}
				console.log(this.week)
				getSchedule().then(res => {
					/*for(let s of res.data){
					  for(var j = 0 ; j < 7; j++){
					    let obj = []
					    if(s.date === this.week[j].day && s.time === 1){
					      obj.push(s)
					    }else{
					      obj.push(null)
					    }
					    if(s.date === this.week[j].day && s.time === 2){
					      obj.push(s)
					    }else{
					      obj.push(null)
					    }
					    // console.log(j, this.list)
					    this.schedule.push(obj)
					    this.list = []
					  }
					}*/
					for (let j = 0; j < 7; j++) {
						for (let s of res.data) {
							console.log('*****************')
							console.log('s:', s.date, ' time:', s.time, ' week:', this.week[j])
							console.log(s.date === this.week[j].day && s.time === 1)
							console.log(s.date === this.week[j].day && s.time === 2)
							if (s.date === this.week[j].day && s.time === 1) {
								this.schedule[j].morning = true
							}
							if (s.date === this.week[j].day && s.time === 2) {
								this.schedule[j].afternoon = true
							}
						}
					}
					console.log('schedule', this.schedule)
				})
			},
			gotoLogin() {
				uni.navigateTo({
					url: '../../login/Login',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
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
	.basic-info{
		background-image: linear-gradient(45deg, rgb(79, 121, 164), rgb(130, 174, 222));
		width: 100%;
		height: 300rpx;
		color: #FFFFFF;
	}
	.doctor-photo{
		width: 150rpx;
		height: 150rpx;
		margin-top: 70rpx;
		margin-left: 20%;
		border-radius: 20rpx;
	}
	.basic{
		position: relative;
		top: -170rpx;
		left: 45%;
		
	}
	.introduction{
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;
		
	}
	.introduction-title{
		font-size: 35rpx;
		font-weight: bold;
		letter-spacing: 5rpx;
		font-family: 'DFKai-SB';
		position: relative;
		left: 3%;
	}
	.introduction-info{
		width: 96%;
		position: relative;
		left: 50%;
		transform: translate(-50%);
		margin-top: 15rpx;
		color: #999999;
	}
	.table{
		width: 710rpx;
		position: relative;
		// left: 50%;
		// transform: translate(-50%);
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
	.u-th{
		background-color: #4371af;
		color: #FFFFFF;
	}
</style>

<template>
	<view class="wrap">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>

		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120"
			 :label-position="labelPosition" label="姓名" prop="name">
				<u-input :border="border" v-model="model.name" type="text" disabled></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="性别" prop="sex">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.sexName"></u-input><!--  @click="actionSheetShow = true"-->
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="年龄" prop="age">
				<u-input disabled :border="border" v-model="model.age" />
			</u-form-item>
			<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai" :label-position="labelPosition"
			 label="手机号码" prop="mobile" label-width="150">
				<u-input disabled :border="border" placeholder="请输入手机号" v-model="model.mobile" type="number"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="地址" prop="address">
				<u-input disabled type="textarea" :border="border" v-model="model.address"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="家族病史" prop="medicalHistory" label-width="150">
				<u-input type="textarea" :border="border" v-model="model.medicalHistory"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="过敏史" prop="allergy" label-width="150">
				<u-input type="textarea" :border="border" v-model="model.allergy"></u-input>
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>

	</view>
</template>

<script>
	import { updateUserInfo } from '../../../api/user.js'
	import {getUserInfo} from '../../../api/user.js'
	import {getSignInfo} from '../../../api/sign.js'
	import {getDoctorInfo} from '../../../api/doctor.js'
	export default {
		data() {
			let that = this;
			return {
				title: '个人信息',
				backIconName: 'nav-back',
				backText: '',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(79, 121, 164), rgb(130, 174, 222))'
				},
				adverts: [{
					image: 'homebg.jpg'
				}],
				model: {
					id: '',
					name: '张三',
					sexName: '男',
					sex: '',
					age: 50,
					mobile: '15623233125',
					addressId: '',
					address: 'xx小区',
					medicalHistory: '',
					allergy: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur',
						},
						{
							min: 2,
							max: 10,
							message: '姓名长度在2到10个字符',
							trigger: ['change', 'blur'],
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.chinese(value);
							},
							message: '姓名必须为中文',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						},
						// 异步验证，用途：比如用户注册时输入完账号，后端检查账号是否已存在
						// {
						// 	trigger: ['blur'],
						// 	// 异步验证需要通过调用callback()，并且在里面抛出new Error()
						// 	// 抛出的内容为需要提示的信息，和其他方式的message属性的提示一样
						// 	asyncValidator: (rule, value, callback) => {
						// 		this.$u.post('/ebapi/public_api/index').then(res => {
						// 			// 如果验证出错，需要在callback()抛出new Error('错误提示信息')
						// 			if(res.error) {
						// 				callback(new Error('姓名重复'));
						// 			} else {
						// 				// 如果没有错误，也要执行callback()回调
						// 				callback();
						// 			}
						// 		})
						// 	},
						// }
					],
					/*sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}, ],*/
					age: [{
						required: true,
						message: '请填写年龄'
					}],
					address: [{
						required: true,
						message: '请填写地址',
						trigger: 'change'
					}],
					/*mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						}
					],*/
					code: [{
							required: true,
							message: '请输入验证码',
							trigger: ['change', 'blur'],
						},
						{
							type: 'number',
							message: '验证码只能为数字',
							trigger: ['change', 'blur'],
						}
					],
				},
				border: false,
				check: false,
				selectStatus: 'close',
				actionSheetList: [{
						text: '男'
					},
					{
						text: '女'
					}
				],
				actionSheetShow: false,
				pickerShow: false,
				selectShow: false,
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				labelPosition: 'left',
				codeTips: '',
				errorType: ['message'],
			};
		},
		onLoad: function(option) {
			const user = JSON.parse(decodeURIComponent(option.user));
			this.model = user
			if (this.model.sex === 1) {
				this.model.sexName = '男'
			} else if (this.model.sex === 2) {
				this.model.sexName = '女'
			}
		},
		mounted() {
			this.getInfo()
		},
		computed: {
			borderCurrent() {
				return this.border ? 0 : 1;
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			getInfo() {
				getUserInfo().then(res => {
					this.model = res.data
					console.log('userInfo', this.model)
					if (this.model.sex === 1) {
						this.model.sexName = '男'
					} else if (this.model.sex === 2) {
						this.model.sexName = '女'
					}
					getSignInfo(this.model.id).then(res => {
						this.signInfo = res.data
						getDoctorInfo(this.signInfo.doctorId).then(res => {
							this.doctor = res.data
							this.doctor.photo = process.env.VUE_APP_API_HOST + '/' + this.doctor.photo
						})
					})
				})
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						updateUserInfo(this.model).then(res => {
							console.log(res)
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.model.sex = this.actionSheetList[index].text;
			},
			// checkbox选择发生变化
			checkboxGroupChange(e) {
				this.model.likeFruit = e;
			},
			// radio选择发生变化
			radioGroupChange(e) {
				this.model.payType = e;
			},
			// 勾选版权协议
			checkboxChange(e) {
				this.model.agreement = e.value;
			},
			// 选择地区回调
			regionConfirm(e) {
				this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
			// 选择商品类型回调
			selectConfirm(e) {
				this.model.goodsType = '';
				e.map((val, index) => {
					this.model.goodsType += this.model.goodsType == '' ? val.label : '-' + val.label;
				})
			},
			borderChange(index) {
				this.border = !index;
			},
			radioCheckboxChange(index) {
				if (index == 0) {
					this.radioCheckWrap = false;
					this.radioCheckWidth = 'auto';
				} else if (index == 1) {
					this.radioCheckWrap = true;
					this.radioCheckWidth = 'auto';
				} else if (index == 2) {
					this.radioCheckWrap = false;
					this.radioCheckWidth = '50%';
				}
			},
			labelPositionChange(index) {
				this.labelPosition = index == 0 ? 'left' : 'top';
			},
			codeChange(text) {
				this.codeTips = text;
			},
			// 获取验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			errorChange(index) {
				if (index == 0) this.errorType = ['message'];
				if (index == 1) this.errorType = ['toast'];
				if (index == 2) this.errorType = ['border-bottom'];
				if (index == 3) this.errorType = ['border'];
			}
		}
	};
</script>

<style scoped lang="scss">
	.wrap {
		padding: 30rpx;
	}

	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 0;

		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}
	}
</style>

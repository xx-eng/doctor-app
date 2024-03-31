<template>
	<view class="login-container">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>
		<view class="photo">
			<image src="../../static/personalbg.png" mode="widthFix"></image>
		</view>
		<u-form ref="form" :model="form" :rules="rules" class="form">
			<u-form-item prop="account">
				<span class="gray">您的账号：</span>
				<u-input v-model="form.account" size="large" clearable autocomplete="false" tabindex="1" placeholder="请输入用户名">
					<!-- <a-icon slot="prefix" type="user" class="gray"/> -->
				</u-input>
			</u-form-item>
			<u-form-item prop="password">
				<span class="gray">您的密码：</span>
				<u-input v-model="form.password" clearable size="large" type="password" autocomplete="false" tabindex="2" password
				 placeholder="请输入密码" @keyup.enter.native="handleLogin">
					<!-- <a-icon slot="prefix" type="lock" class="gray"/> -->
				</u-input>
			</u-form-item>
		</u-form>

		<br /><br />


		<u-button size="large" type="primary" class="login-btn" tabindex="5" @click="handleLogin" block>
			<span v-if="!loading">登录</span>
			<span v-else>登录中...</span>
		</u-button>
		
		<view class="alternative">
			<view class="password" @click="gotoRegister">立即注册>></view>
		</view>



		<!--<a-row class="foot">
      <a-row type="flex" justify="space-around" class="help">
        <a class="item" href="#" target="_blank">帮助</a>
        <a class="item" href="#" target="_blank">隐私</a>
        <a class="item" href="#" target="_blank">条款</a>
      </a-row>
      <a-row type="flex" justify="center">
        Copyright © 2020 - Present
        <a href="javascript:void(0);" target="_blank" style="margin:0 5px;">XXXXXXX</a>
        版权所有
      </a-row>
    </a-row>-->
	</view>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				title: '登录',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(to right, #2d8cf0, #4371af, #2d8cf0)'
				},
				redirect: undefined,
				loading: false,
				form: {
					account: '',
					password: '',
					keepLogin: true
				},
				rules: {
					account: [{
						required: true,
						trigger: 'blur',
						message: '请输入用户名'
					}],
					password: [{
						required: true,
						trigger: 'blur',
						message: '请输入密码'
					}]
				}
			}
		},
		watch: {
			$route: {
				handler: function(route) {
					this.redirect = route.query && route.query.redirect
				},
				immediate: true
			}
		},
		methods: {
			onBackPress(e) {
				console.log("监听返回按钮事件", e);
				//正常返回页面
				uni.switchTab({
					url: "/pages/index/index",
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
				// 此处一定要return为true，否则页面不会返回到指定路径
				return true;
			},
			gotoRegister(){
				uni.navigateTo({
					url: '../Register/Register',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			handleLogin() {
				this.$refs.form.validate(valid => {
					if (valid) {
						this.loading = true
						this.$store.dispatch('Login', this.form).then(() => {
							// this.$router.push({ path: this.redirect || '/' })
							uni.switchTab({
								url: '../index/index',
								success: (res) => {
									console.log(res)
								},
								fail: (err) => {
									console.log(err)
								}
							})
						}).finally(() => {
							this.loading = false
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss"  scoped>
	.login-container {
		height: 100vh;
		/* background: url("../../assets/images/login/background2.svg") no-repeat; */
		background-size: cover;

		.login-main {
			position: absolute;
			top: 50%;
			left: 50%;
			box-shadow: 0 8px 19px 2px rgba(0, 0, 0, 0.16);
			border-radius: 20px;
			background: #FFFFFF;
			width: 800px;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);

			.login-carousel {
				height: 30px;

				img {
					border-radius: 18px 0 0 18px;
					display: inline-block;
					height: 100%;
					width: 100%;
					background-size: cover;
				}
			}

			.login-form-container {
				margin-top: 30px;
				padding: 0 50px;

				.title {
					padding: 36px 0 20px 0;
					font-size: 30px;
					text-align: center;
					color: #333333;
				}

				// /deep/
				.ant-form-item {
					margin-bottom: 14px;
				}

				.forget-pass,
				.other-way {
					font-size: 14px;
				}

				.login-btn,
				.other-login {
					margin-top: 5vh;
				}
			}
		}

		.foot {
			position: absolute;
			left: 50%;
			bottom: 10px;
			color: rgba(0, 0, 0, 0.45);
			font-size: 14px;
			-webkit-transform: translate(-50%);
			transform: translate(-50%);

			.help {
				margin: 0 auto 2vh;
				width: 60%;

				.item {
					color: rgba(0, 0, 0, 0.45);
				}

				:hover {
					color: rgba(0, 0, 0, 0.65);
				}
			}

			a {
				color: #2d8cf0;
				background: 0 0;
				text-decoration: none;
				outline: 0;
				cursor: pointer;
				transition: color 0.2s ease;
				font-size: 14px;
			}
		}
		
		.photo {
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				width: 100%;
			}
		}
	}
	.form{
		width: 65%;
		position: absolute;
		left: 50%;
		transform: translate(-50%);
	}
	
	.login-btn{
		position: absolute;
		left: 50%;
		transform: translate(-50%);
		top: 1000rpx;
		// background-color: #f0ad4e;
		color: #fff;
		border: none;
		font-size: 30rpx;
		padding: 12rpx 0;
		width: 80%;
		// height: 50px;
		// line-height: 50px;
	}
	
	// /deep/
	.u-btn.u-primary-hover::after {
		background-color: #4371af;
		border: 0;
		z-index: -1;
		color: #fff;
	}
	
	.alternative {
		position: absolute;
		margin-top: 410rpx;
		right: 50px;
		color: #4371af;
	}
</style>

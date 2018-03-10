<template>
	<div id="app">
    	<div class="app-head">
			<div class="app-head-inner">
				<router-link to="/" tag="a"><img src="./assets/l.png" width="30px"></router-link>
				<div class="head-nav">
					<ul class="nav-list">
						<li @click="logClick"><a href="javascript:;">{{header.one}}</a></li>
						<li class="nav-pile">|</li>
						<li @click="regClick"><a href="javascript:;">{{header.two}}</a></li>
						<li class="nav-pile">|</li>
						<li @click="aboutClick"><a href="javascript:;">关于</a></li>
						<li class="nav-pile">|</li>
						<li @click="linkProlist"><a href="javascript:;">我的产品</a></li>
					</ul>
				</div>
			</div>
    	</div>
    	<div class="app-content">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
    	<div class="app-foot">
			<div class="app-foot-inner">
				@ 2017 www.liyangshigedashuaibi@163.com
			</div>
		</div>
		<my-dialog :is-show="isShowLogDialog" @on-close="closeDiglog('isShowLogDialog')">
			<log-form @parent-hide="success"></log-form>
		</my-dialog>
		<my-dialog :is-show="isShowRegDialog" @on-close="closeDiglog('isShowRegDialog')">
			<reg-form></reg-form>
		</my-dialog>
		<my-dialog :is-show="isShowAboutDialog" @on-close="closeDiglog('isShowAboutDialog')">
			<about-form></about-form>
		</my-dialog>
  	</div>
</template>

<script>
import myDialog from './conponents/dialog'
import logForm from './dialog/logForm'
import regForm from './dialog/regForm'
import aboutForm from './dialog/aboutForm'
export default {
	name: 'app',
	components: {
		myDialog, logForm, regForm, aboutForm
	},
	data () {
		return {
			isShowLogDialog: false,
			isShowRegDialog: false,
			isShowAboutDialog: false,
			header: {
				one: '登录',
				two: '注册'
			}
		}
	},
	methods: {
		logClick () {
			this.isShowLogDialog = true
		},
		regClick () {
			this.isShowRegDialog = true
		},
		aboutClick () {
			this.isShowAboutDialog = true
		},
		closeDiglog ( attr ) {
			this[attr] = false
		},
		success ( data ) {
			this.closeDiglog('isShowLogDialog')
			this.header.one = data.username;
			this.header.two = '退出';
		},
		linkProlist() {
			this.$router.push({path: '/prolist'})
		}
	}
}
</script>

<style>
body,p,ul,h1,h2,h3,h4,h5,h6 {
	margin: 0;
	padding: 0;
}
a {
	text-decoration: none;
}
a:hover {
	text-decoration: underline;
}
body {
	font-size: 14px;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
.app-head {
	width: 100%;
	background-color: #000;
	padding: 10px 0;
}
.app-head-inner {
	width: 1150px;
	margin: 0 auto;
	overflow: hidden;
}
.head-nav {
	float: right;
	line-height: 33px;
}
.nav-list {
	list-style: none;
	overflow: hidden;
	font-size: 12px;
}
.nav-list li {
	float: left;
	color: rgb(210, 210, 210);
}
.nav-list li a {
	color: rgb(210, 210, 210);
	text-decoration: none;
}
.nav-list li a:hover {
	text-decoration: underline;
}
.nav-pile {
	padding: 0 10px;
}
.app-foot {
	widows: 100%;
	padding: 20px;
	background-color: rgb(170,170,170)
}
.app-foot-inner{
	width: 75%;
	margin: 0 auto;
	text-align: center
}
</style>

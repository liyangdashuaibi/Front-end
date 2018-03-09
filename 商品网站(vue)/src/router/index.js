import Vue from 'vue'
import Router from 'vue-router'
import home from '../conponents/home'
import detail from '../conponents/detail'
import prolist from '../conponents/prolist'
import analysis from '../detail/analysis'
import count from '../detail/count'
import forecast from '../detail/forecast'
import publish from '../detail/publish'


Vue.use(Router)

export default new Router({
	mode: 'history',	
	routes: [
		{
			path:'/',
			component: home
		},
		{
			path: '/detail',
			component: detail,
			redirect: '/detail/analysis',
			children: [
				{
					path: 'analysis',
					component: analysis,
				},
				{
					path: 'count',
					component: count,
				},
				{
					path: 'forecast',
					component: forecast,
				},
				{
					path: 'publish',
					component: publish,
				},
			]
		},
		{
			path: '/prolist',
			component: prolist
		}
	]
})

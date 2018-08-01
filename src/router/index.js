import Vue from 'vue'
import Router from 'vue-router'
import IOS from '@/components/IOS'
import Android from '@/components/Android'
Vue.use(Router)

export default new Router({
	routes: [
	{
		path: '/',
		name: 'IOS',
		component: IOS
	},
	{
		path: '/Android',
		name: 'Android',
		component: Android
	}
	]
})

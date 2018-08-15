import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/index'
import Project from '@/pages/project/project'
import Crowdfunding from '@/pages/crowdfunding/crowdfunding'
import Mine from '@/pages/mine/mine'
import Purse from '@/pages/mine/purse/purse'
import Revenue from '@/pages/mine/revenue/revenue'

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/index',
        name: 'index',
        component: Index
    },
    {
        path: '/project',
        name: 'project',
        component: Project
    },
    {
        path: '/crowdfunding',
        name: 'crowdfunding',
        component: Crowdfunding
    },
    {
        path: '/mine',
        name: 'mine',
        component: Mine,

    },
    {
        path: '/purse',
        name: 'purse',
        component: Purse
    }, {
        path: '/revenue',
        name: 'revenue',
        component: Revenue
    }]
})
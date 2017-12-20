import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Cur/index'
import Detail from '@/components/Cur/Customer-1'
import Transaction from '@/components/transaction/index'
import Finance from '@/components/Finance/index'
import Risk from '@/components/Risk/index'
import Statistics from '@/components/Statistics/index'
import collection from '@/components/collection/index'


// 风控
import RiskRgxs from '@/components/Risk/risk-rgxs'
import RiskLsxs from '@/components/Risk/risk-lsxs'
import Work from '@/components/Risk/Workbench'
import Admin from '@/components/Risk/Administration'
import dapan from '@/components/Risk/dapan'
import jiben from '@/components/Risk/roter/jiben'
import jiedai from '@/components/Risk/roter/jiedai'
import zhengxin from '@/components/Risk/roter/zhengxin'
import mingzhong from '@/components/Risk/roter/mingzhong'
import xinyong from '@/components/Risk/roter/xinyong'
import zhima from'@/components/Risk/roter/zhima'
import yunying from'@/components/Risk/roter/yunying'





// 财务
import confirm from '@/components/Finance/confirm'
import Success from '@/components/Finance/Success'
import History from '@/components/Finance/History'
import Workb from '@/components/Finance/Workb'
import Admini from '@/components/Finance/Admini'
import dsklb from '@/components/Finance/dsklb'
import yqlb from '@/components/Finance/yqlb'
import ysklb from '@/components/Finance/ysklb'
import sdxzjl from '@/components/Finance/sdxzjl'
import dwyh from '@/components/Finance/dwyh'


import Allloan from '@/components/Finance/dis/Allloan'
import fullpay from '@/components/Finance/dis/fullpay'
import partpay from '@/components/Finance/dis/partpay'
import oneself from '@/components/Finance/dis/oneself'
import contact from '@/components/Finance/dis/contact'
import dsk from '@/components/Finance/dis2/dsk'

import A1 from '@/components/Finance/dis2/A1'
import D0 from '@/components/Finance/dis2/D0'
import D1 from '@/components/Finance/dis2/D1'
import D2 from '@/components/Finance/dis2/D2'
import D3 from '@/components/Finance/dis2/D3'





// 催收
import distribution from '@/components/collection/distribution'
import list from '@/components/collection/list'
import Record from '@/components/collection/Record'
import Track from '@/components/collection/Track'
import Tranl from '@/components/collection/Tranl'


import jtyf from '@/components/collection/dis/jtyf'
import jtwf from '@/components/collection/dis/jtwf'
import yqyf from '@/components/collection/dis/yqyf'
import yqwf from '@/components/collection/dis/yqwf'
import Partial from '@/components/collection/dis/Partial'
import All from '@/components/collection/dis/All'



// 登录
import login from '@/components/login'





Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Cur',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
      	{
      		  path: '/Cur/Customer-1',
    	      name: 'Detail',
    	      component: Detail
      	},
      	{
      		  path: '/Cur/Customer-2',
    	      name: 'Detail',
    	      component: Detail
      	}
        ]
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: Transaction,
      children:[
      	{
      		  path: '/transaction/transaction-1',
    	      name: 'Detail',
    	      component: Detail
      	},
      	{
      		  path: '/transaction/transaction-2',
    	      name: 'Detail',
    	      component: Detail
      	},
      	{
      		  path: '/transaction/transaction-3',
    	      name: 'Detail',
    	      component: Detail
      	}
        ]
    },
    {
      path: '/Finance',
      name: 'Finance',
      component: Finance,
      children:[
      	{
      		  path: '/Finance/confirm',
    	      name: 'confirm',
    	      component: confirm,
            children:[
              {
                path:'/Finance/confirm/Workb',
                name:'Workb',
                component: Workb
              },
              {
                path:'/Finance/confirm/Admini',
                name:'Admini',
                component: Admini
              }
            ]
      	},
      	{
      		  path: '/Finance/Success',
    	      name: 'Success',
    	      component: Success
      	},
      	{
      		  path: '/Finance/History',
    	      name: 'History',
    	      component: History
      	},
        {
            path: '/Finance/dsklb',
            name: 'dsklb',
            component: dsklb
        },
        {
            path: '/Finance/dsk',
            name: 'dsk',
            component: dsk
        },
        {
            path: '/Finance/yqlb',
            name: 'yqlb',
            component: yqlb,
            children:[
              {
                path:'/Finance/yqlb/A1',
                name:'A1',
                component:A1
              },
              {
                path:'/Finance/yqlb/D0',
                name:'D0',
                component:D0
              },
               {
                path:'/Finance/yqlb/D1',
                name:'D1',
                component:D1
              },
              {
                path:'/Finance/yqlb/D2',
                name:'D2',
                component:D2
              },
               {
                path:'/Finance/yqlb/D3',
                name:'D3',
                component:D3
              }
            ]
        },
        {
            path: '/Finance/ysklb',
            name: 'ysklb',
            component: ysklb,
            children:[
              {
                path:'/Finance/ysklb/Allloan',
                name:'Allloan',
                component:Allloan
              },
              {
                path:'/Finance/ysklb/fullpay',
                name:'fullpay',
                component:fullpay
              },
               {
                path:'/Finance/ysklb/partpay',
                name:'partpay',
                component:partpay
              }
            ]
        },
        {
            path: '/Finance/sdxzjl',
            name: 'sdxzjl',
            component: sdxzjl
        },
        {
            path: '/Finance/dwyh',
            name: 'dwyh',
            component: dwyh,
             children:[
              {
                path:'/Finance/dwyh/oneself',
                name:'oneself',
                component:oneself
              },
              {
                path:'/Finance/dwyh/contact',
                name:'contact',
                component:contact
              }
            ]
        }
        ]
    },
    {
      path: '/Risk',
      name: 'Risk',
      component: Risk,
      children:[
      	{
      		  path: '/Risk/risk-lsxs',
    	      name: 'Risk-lsxs',
    	      component: RiskLsxs
      	},
      	{
      		  path: '/Risk/risk-rgxs',
    	      name: 'Risk-rgxs',
    	      component: RiskRgxs,
            children:[
              {
                path:'/Risk/risk-rgxs/Workbench',
                name:'Workbench',
                component:Work
              },
              {
                path:'/Risk/risk-rgxs/Administration',
                name:'Admin',
                component:Admin
              }
            ]
      	},
          {
            path:'/Risk/dapan',
            name:'dapan',
            component:dapan,
            children:[
            {
              path:'/Risk/dapan/jiben',
              name:'jiben',
              component:jiben
            },
            {
              path:'/Risk/dapan/jiedai',
              name:'jiedai',
              component:jiedai
            },
            {
              path:'/Risk/dapan/mingzhong',
              name:'mingzhong',
              component:mingzhong
            },
            {
              path:'/Risk/dapan/zhengxin',
              name:'zhengxin',
              component:zhengxin,
              children:[
                {
                  path:"/Risk/dapan/zhengxin/zhima",
                  name:'zhima',
                  component:zhima
                },
                {
                  path:"/Risk/dapan/zhengxin/yunying",
                  name:'yunying',
                  component:yunying
                }
              ]
            },
            {
              path:'/Risk/dapan/xinyong',
              name:'xinyong',
              component:xinyong
            }
            ]
          }
        ]
    },
    {
      path: '/Statistics',
      name: 'Statistics',
      component: Statistics,
      children:[
      	{
      		  path: '/Statistics/Statistics-1',
    	      name: 'Detail',
    	      component: Detail
      	}
        ]
    },
    {
      path: '/collection',
      name: 'collection',
      component: collection,
      children:[
      
      	{
      		  path: '/collection/distribution',
    	      name: 'distribution',
    	      component: distribution,
            children:[
              {
                path: '/collection/distribution/jtwf',
                name: 'jtwf',
                component: jtwf
              },
              {
                path: '/collection/distribution/jtyf',
                name: 'jtyf',
                component: jtyf
              },
              {
                path: '/collection/distribution/yqwf',
                name: 'yqwf',
                component: yqwf
              },
              {
                path: '/collection/distribution/yqyf',
                name: 'yqyf',
                component: yqyf
              }
            ]
      	},
      	{
      		  path: '/collection/list',
    	      name: 'list',
    	      component: list
      	},
      	{
      		  path: '/collection/Record',
    	      name: 'Record',
    	      component: Record,
            children:[
              {
                path: '/collection/Record/Partial',
                name: 'Partial',
                component: Partial
              },
              {
                path: '/collection/Record/All',
                name: 'All',
                component: All
              },
            ]
      	},
      	{
      		  path: '/collection/Track',
    	      name: 'Track',
    	      component: Track
      	},
        {
            path: '/collection/Tranl',
            name: 'Tranl',
            component: Tranl
        }
        ]
    },{
            path: '/login',
            name: 'login',
            component: login
      }
  ]
})

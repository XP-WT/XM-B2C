(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/seckill/seckill/seckill"],{3937:function(t,e,i){"use strict";var n,o=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"b",function(){return o}),i.d(e,"c",function(){return s}),i.d(e,"a",function(){return n})},4268:function(t,e,i){"use strict";(function(t){i("e146"),i("921b");n(i("66fd"));var e=n(i("e158"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},"4adf":function(t,e,i){},6408:function(t,e,i){"use strict";i.r(e);var n=i("7ab3"),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);e["default"]=o.a},7317:function(t,e,i){"use strict";var n=i("4adf"),o=i.n(n);o.a},"7ab3":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{headerPosition:"fixed",tabIndex:0,timeList:[],goodsList:[],stime:"",etime:""}},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onLoad:function(){},onShow:function(){this.getTime()},methods:{getTime:function(){var t=this;this.$xm.post("/Index/seckill","",function(e){e.data.forEach(function(e){if(1==e.status){e.state="倒计时";var i=t.$xm.changeTime(1e3*e.etime);e.time=i.slice(5,i.length)}else if(2==e.status){e.state="即将开始";var n=t.$xm.changeTime(1e3*e.stime);e.time=n.slice(5,n.length)}}),console.log(e.data),t.timeList=e.data,t.stime=e.data[0].stime,t.etime=e.data[0].etime,t.getGoodS()})},getGoodS:function(){var t=this,e={stime:this.stime,etime:this.etime};this.$xm.post("/Index/seckillpro",e,function(e){t.goodsList=e.data,t.goodsList.forEach(function(t){t.pro_sn="http://img.xmvogue.com/thumb/"+t.pro_sn+".jpg?x-oss-process=style/300"})})},changeList:function(t,e){this.stime=t.stime,this.etime=t.etime,this.tabIndex=e,this.getGoodS()},toGoods:function(e){t.navigateTo({url:"../../goods/goods?gid="+e.id})},joinCart:function(e){var i=this,n={proid:e.id,pronum:1};this.$xm.post("/Cart/add",n,function(e){var n=e.msg;"加入购物车成功"==n&&t.showToast({title:"已加入购物车"}),i.$xm.post("/Cart","",function(e){t.setStorage({key:"cart",data:e.count,success:function(e){t.getStorage({key:"cart",success:function(e){var i=e.data;null!==e.data&&(i=i.toString(),t.setTabBarBadge({index:2,text:i}))}})}})})})}}};e.default=i}).call(this,i("543d")["default"])},e158:function(t,e,i){"use strict";i.r(e);var n=i("3937"),o=i("6408");for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);i("7317");var a,c=i("f0c5"),u=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);e["default"]=u.exports}},[["4268","common/runtime","common/vendor"]]]);
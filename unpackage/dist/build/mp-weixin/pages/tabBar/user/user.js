(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/user/user"],{"2e21":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){return n.e("components/icon/icon").then(n.bind(null,"be58"))},u=function(){return n.e("components/modal/modal").then(n.bind(null,"8214"))},s={components:{tuiIcon:o,tuiModal:u},data:function(){return{secret:{},userInfo:"",showModal:!0,orderList:[{text:"未付款",icon:"fukuan",id:"0",num:0},{text:"已付款",icon:"fahuo",id:"1",num:0},{text:"已发货",icon:"shouhuo",id:"3",num:0},{text:"已收货",icon:"pingjia",id:"4",num:0},{text:"退款",icon:"tuihuo",id:"8",num:0}],mytoolbarList:[{url:"../../user/address/address",text:"收货地址"},{url:"../../user/keep/keep",text:"我的收藏"},{url:"",text:"团购专享"},{url:"",text:"关于我们"}],count:0}},onLoad:function(){var e=this;t.getStorage({key:"user",success:function(t){e.secret=t.data}})},onShow:function(){var e=this;this.getcount(),t.getStorage({key:"cart",success:function(t){e.count=t.data}}),t.getStorage({key:"userInfo",success:function(t){e.userInfo=t.data,e.userInfo?e.showModal=!1:e.showModal=!0}})},methods:{getuserinfo:function(){var e=this;t.login({success:function(n){if(n.code){n.code;t.getUserInfo({success:function(n){e.userInfo=n.userInfo,e.showModal=!1;var o={encryptedData:n.encryptedData,iv:n.iv,sessionKey:e.secret.sessionKey,secret:e.secret.secret,timestamp:e.secret.timestamp};e.$xm.post("/Index/getUnionid",o,function(n){e.secret.unionid=n.unionid,t.setStorage({key:"user",data:e.secret,success:function(t){console.log(t)}})}),t.setStorage({key:"userInfo",data:n.userInfo,success:function(t){console.log(t)}})},fail:function(t){}})}}})},toOrderList:function(e){e||(e="s"),console.log(e),t.setStorageSync("tbIndex",e),t.navigateTo({url:"../../user/order_list/order_list?tbIndex="+e})},getcount:function(){var t=this;this.$xm.post("/Mine/index","",function(e){console.log(e);var n=e.order_state;for(var o in n)n[o].order_state==t.orderList[o].id&&(t.orderList[o].num=n[o].state)})},toCart:function(){t.switchTab({url:"../cart/cart"})},toPage:function(e){console.log(e),e?t.navigateTo({url:e}):t.showToast({title:"此内容正在开发中",icon:"none"})},close:function(){this.showModal=!1}}};e.default=s}).call(this,n("543d")["default"])},"4de6":function(t,e,n){"use strict";var o,u=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"b",function(){return u}),n.d(e,"c",function(){return s}),n.d(e,"a",function(){return o})},"6ba3":function(t,e,n){"use strict";var o=n("a555"),u=n.n(o);u.a},"7e9f":function(t,e,n){"use strict";n.r(e);var o=n("4de6"),u=n("d6be");for(var s in u)"default"!==s&&function(t){n.d(e,t,function(){return u[t]})}(s);n("6ba3");var r,c=n("f0c5"),i=Object(c["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=i.exports},"90eb":function(t,e,n){"use strict";(function(t){n("e146"),n("921b");o(n("66fd"));var e=o(n("7e9f"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},a555:function(t,e,n){},d6be:function(t,e,n){"use strict";n.r(e);var o=n("2e21"),u=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);e["default"]=u.a}},[["90eb","common/runtime","common/vendor"]]]);
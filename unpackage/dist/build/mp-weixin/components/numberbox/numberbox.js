(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/numberbox/numberbox"],{"16b2":function(t,e,u){},"4b3a":function(t,e,u){"use strict";u.r(e);var n=u("5e78"),i=u.n(n);for(var a in n)"default"!==a&&function(t){u.d(e,t,function(){return n[t]})}(a);e["default"]=i.a},"5e78":function(t,e,u){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"tuiNumberbox",props:{value:{type:Number,default:0},min:{type:Number,default:0},max:{type:Number,default:99},step:{type:Number,default:1},disabled:{type:Boolean,default:!1},iconSize:{type:Number,default:26},iconColor:{type:String,default:"#666666"},height:{type:Number,default:42},width:{type:Number,default:80},size:{type:Number,default:28},bgcolor:{type:String,default:"#F5F5F5"},color:{type:String,default:"#333"},index:{type:[Number,String],default:0},custom:{type:[Number,String],default:0}},created:function(){this.inputValue=+this.value},data:function(){return{inputValue:0}},watch:{value:function(t){this.inputValue=+t}},methods:{getScale:function(){var t=1;return Number.isInteger(this.step)||(t=Math.pow(10,(this.step+"").split(".")[1].length)),t},calcNum:function(t){if(!this.disabled){var e=this.getScale(),u=this.value*e,n=this.step*e;"reduce"===t?u-=n:"plus"===t&&(u+=n);var i=u/e;"plus"===t&&i<this.min?i=this.min:"reduce"===t&&i>this.max&&(i=this.max),this.handleChange(i,t)}},plus:function(){this.calcNum("plus")},reduce:function(){this.calcNum("reduce")},blur:function(t){var e=t.detail.value;e?(~e.indexOf(".")&&Number.isInteger(this.step)&&(e=e.split(".")[0]),e=Number(e),e>this.max?e=this.max:e<this.min&&(e=this.min)):e=this.min,e==this.value&&e!=this.inputValue&&(this.inputValue=e),this.handleChange(e,"blur")},handleChange:function(t,e){this.disabled||this.$emit("change",{value:t,type:e,index:this.index,custom:this.custom})}}};e.default=n},9963:function(t,e,u){"use strict";var n,i=function(){var t=this,e=t.$createElement;t._self._c},a=[];u.d(e,"b",function(){return i}),u.d(e,"c",function(){return a}),u.d(e,"a",function(){return n})},b3a8:function(t,e,u){"use strict";var n=u("16b2"),i=u.n(n);i.a},e58b:function(t,e,u){"use strict";u.r(e);var n=u("9963"),i=u("4b3a");for(var a in i)"default"!==a&&function(t){u.d(e,t,function(){return i[t]})}(a);u("b3a8");var r,l=u("f0c5"),s=Object(l["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=s.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/numberbox/numberbox-create-component',
    {
        'components/numberbox/numberbox-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e58b"))
        })
    },
    [['components/numberbox/numberbox-create-component']]
]);
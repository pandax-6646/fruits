(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e884f"],{"8a2b":function(e,r,s){"use strict";s.r(r);var t=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"booking-push-address-container"},[s("van-nav-bar",{attrs:{title:"添加地址","left-arrow":"",border:!0},on:{"click-left":e.toAddressList}}),s("van-address-edit",{attrs:{"show-postal":"","show-set-default":"","show-search-result":"","area-columns-placeholder":["请选择","请选择","请选择"],"area-list":e.areaList},on:{save:e.onSave}})],1)},a=[],n=s("9163"),o=s("365c"),u={name:"pushAddress",data:function(){return{areaList:n["areaList"]}},methods:{onSave:function(e){var r=this;o["g"].pushAddressInfo(e).then((function(e){666==e.code&&(r.$toast.success("地址添加成功"),r.$router.push({path:"/booking/address",query:{isBuyAgain:r.$route.query.isBuyAgain,preOrderId:r.$route.query.preOrderId}}))})).catch((function(e){return r.$toast.fail(e)}))},toAddressList:function(){this.$router.push({path:"/booking/address",quary:{isBuyAgain:this.$route.query.isBuyAgain,preOrderId:this.$route.query.preOrderId}})}}},i=u,d=s("2877"),c=Object(d["a"])(i,t,a,!1,null,"b595e1c8",null);r["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0e884f.5bbd1eda.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cc7f5"],{"4dd3":function(e,s,t){"use strict";t.r(s);var r=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"booking-push-address-container"},[t("van-nav-bar",{attrs:{title:"修改地址","left-arrow":"",border:!0},on:{"click-left":e.toAddressList}}),t("van-address-edit",{attrs:{"area-list":e.areaList,"show-postal":"","show-delete":"","show-set-default":"","area-columns-placeholder":["请选择","请选择","请选择"],"address-info":e.$route.params},on:{save:e.onSave,delete:e.onDelete}})],1)},a=[],d=t("365c"),o=t("9163"),n={name:"editAddress",data:function(){return{areaList:o["areaList"]}},methods:{onSave:function(e){var s=this;d["g"].editAddressInfo({addressId:this.$route.params.addressId}).then((function(e){666==e.code&&(s.$toast.success("小主，地址修改成功！"),s.$router.push({path:"/booking/address",query:{isBuyAgain:s.$route.params.isBuyAgain,preOrderId:s.$route.params.preOrderId}}))})).catch((function(e){return s.$toast.fail("地址修改失败")}))},onDelete:function(){var e=this;d["g"].delAddressInfo({addressId:this.$route.params.addressId}).then((function(s){666==s.code&&(e.$toast.success("小主，地址删除成功！"),e.$router.push({path:"/booking/address",query:{isBuyAgain:e.$route.params.isBuyAgain,preOrderId:e.$route.params.preOrderId}}))})).catch((function(s){return e.$toast.fail("地址删除失败")}))},toAddressList:function(){this.$router.push({path:"/booking/address",quary:{isBuyAgain:this.$route.query.isBuyAgain}})}}},i=n,u=t("2877"),c=Object(u["a"])(i,r,a,!1,null,"70d3a1f0",null);s["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0cc7f5.d534ed13.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7cfd8ca7"],{"159b":function(t,r,e){var n=e("da84"),a=e("fdbc"),i=e("17c2"),o=e("9112");for(var s in a){var c=n[s],u=c&&c.prototype;if(u&&u.forEach!==i)try{o(u,"forEach",i)}catch(d){u.forEach=i}}},"17c2":function(t,r,e){"use strict";var n=e("b727").forEach,a=e("a640"),i=a("forEach");t.exports=i?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},1819:function(t,r,e){},"1dde":function(t,r,e){var n=e("d039"),a=e("b622"),i=e("2d00"),o=a("species");t.exports=function(t){return i>=51||!n((function(){var r=[],e=r.constructor={};return e[o]=function(){return{foo:1}},1!==r[t](Boolean).foo}))}},4624:function(t,r,e){"use strict";e.d(r,"a",(function(){return n}));var n={methods:{showLoading:function(){this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0})}}}},"4de4":function(t,r,e){"use strict";var n=e("23e7"),a=e("b727").filter,i=e("1dde"),o=i("filter");n({target:"Array",proto:!0,forced:!o},{filter:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},5608:function(t,r,e){"use strict";var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"count-down-container"},["02"===t.newOrderState?e("div",{staticClass:"count-down flex jc-sb"},[e("div",[t._v("订单可支付时间：")]),e("div",[t._v(t._s(t.randerTime))])]):"01"===t.newOrderState?e("div",[t._v("订单状态：已支付,正在发货")]):"00"===t.newOrderState?e("div",{staticClass:"fc-666"},[t._v(" 订单状态：已自动取消 ")]):t._e()])},a=[],i=(e("a9e3"),{data:function(){return{countDownTime:null,newOrderState:"02",randerTime:""}},props:{time:{type:Number,default:10},createdOrderTime:{type:Number,required:!0},orderState:{type:String,default:"02"}},created:function(){this.newOrderState=this.orderState,this.countDownTime=Math.floor((this.createdOrderTime+4e3+60*this.time*1e3-(new Date).getTime())/1e3),this.countDown()},watch:{newOrderState:function(t){"00"===t&&this.$emit("changeOrderState")}},methods:{countDown:function(){var t=this,r=setInterval((function(){"01"===t.orderState?(t.newOrderState="01",clearInterval(r)):t.countDownTime>=1?t.newOrderState="02":t.countDownTime<1&&(t.newOrderState="00",clearInterval(r)),t.countDownTime--,t.randerTime=Math.floor(t.countDownTime/60)+" 分 "+Math.floor(t.countDownTime%60)+" 秒"}),1e3)}}}),o=i,s=e("2877"),c=Object(s["a"])(o,n,a,!1,null,null,null);r["a"]=c.exports},5899:function(t,r){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,r,e){var n=e("1d80"),a=e("5899"),i="["+a+"]",o=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$"),c=function(t){return function(r){var e=String(n(r));return 1&t&&(e=e.replace(o,"")),2&t&&(e=e.replace(s,"")),e}};t.exports={start:c(1),end:c(2),trim:c(3)}},"65f0":function(t,r,e){var n=e("861d"),a=e("e8b5"),i=e("b622"),o=i("species");t.exports=function(t,r){var e;return a(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!a(e.prototype)?n(e)&&(e=e[o],null===e&&(e=void 0)):e=void 0),new(void 0===e?Array:e)(0===r?0:r)}},7156:function(t,r,e){var n=e("861d"),a=e("d2bb");t.exports=function(t,r,e){var i,o;return a&&"function"==typeof(i=r.constructor)&&i!==e&&n(o=i.prototype)&&o!==e.prototype&&a(t,o),t}},a640:function(t,r,e){"use strict";var n=e("d039");t.exports=function(t,r){var e=[][t];return!!e&&n((function(){e.call(null,r||function(){throw 1},1)}))}},a9e3:function(t,r,e){"use strict";var n=e("83ab"),a=e("da84"),i=e("94ca"),o=e("6eeb"),s=e("5135"),c=e("c6b6"),u=e("7156"),d=e("c04e"),f=e("d039"),l=e("7c73"),v=e("241c").f,h=e("06cf").f,p=e("9bf2").f,m=e("58a8").trim,w="Number",b=a[w],g=b.prototype,O=c(l(g))==w,_=function(t){var r,e,n,a,i,o,s,c,u=d(t,!1);if("string"==typeof u&&u.length>2)if(u=m(u),r=u.charCodeAt(0),43===r||45===r){if(e=u.charCodeAt(2),88===e||120===e)return NaN}else if(48===r){switch(u.charCodeAt(1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+u}for(i=u.slice(2),o=i.length,s=0;s<o;s++)if(c=i.charCodeAt(s),c<48||c>a)return NaN;return parseInt(i,n)}return+u};if(i(w,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var I,S=function(t){var r=arguments.length<1?0:t,e=this;return e instanceof S&&(O?f((function(){g.valueOf.call(e)})):c(e)!=w)?u(new b(_(r)),e,S):_(r)},y=n?v(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),x=0;y.length>x;x++)s(b,I=y[x])&&!s(S,I)&&p(S,I,h(b,I));S.prototype=g,g.constructor=S,o(a,w,S)}},b727:function(t,r,e){var n=e("0366"),a=e("44ad"),i=e("7b0b"),o=e("50c4"),s=e("65f0"),c=[].push,u=function(t){var r=1==t,e=2==t,u=3==t,d=4==t,f=6==t,l=7==t,v=5==t||f;return function(h,p,m,w){for(var b,g,O=i(h),_=a(O),I=n(p,m,3),S=o(_.length),y=0,x=w||s,C=r?x(h,S):e||l?x(h,0):void 0;S>y;y++)if((v||y in _)&&(b=_[y],g=I(b,y,O),t))if(r)C[y]=g;else if(g)switch(t){case 3:return!0;case 5:return b;case 6:return y;case 2:c.call(C,b)}else switch(t){case 4:return!1;case 7:c.call(C,b)}return f?-1:u||d?d:C}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6),filterOut:u(7)}},dc4d:function(t,r,e){"use strict";e("1819")},e24c:function(t,r,e){"use strict";e.r(r);var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"my-order-container"},[e("van-nav-bar",{attrs:{title:"我的订单","left-arrow":"",border:!0},on:{"click-left":function(r){return t.$router.push("/my")}}}),e("van-sticky",[e("van-cell",{staticClass:"tab-bar"},[e("van-tabs",{model:{value:t.active,callback:function(r){t.active=r},expression:"active"}},[e("van-tab",{attrs:{title:"全部"}}),e("van-tab",{attrs:{title:"待付款"}}),e("van-tab",{attrs:{title:"待发货"}}),e("van-tab",{attrs:{title:"已取消"}})],1)],1)],1),e("ul",{staticClass:"container wp-100"},t._l(t.changeOrderList,(function(r){return e("li",{key:r.orderId,staticClass:"mt-10 bc-fff"},[e("div",{staticClass:"goods"},[e("router-link",{staticClass:"flex jc-sb ai-c wp-100",attrs:{to:"/my/orderDetail/"+r.orderId}},[e("div",{staticClass:"flex fw-nw"},t._l(r.carts,(function(t){return e("img",{key:t.cartId,attrs:{src:t.imgUrl,alt:""}})})),0),1==r.carts.length?e("div",{staticClass:"fg-1 flex wp-100 fw-w"},[e("p",{staticClass:"fs-15"},[t._v(t._s(r.carts[0].masterName))]),e("p",{staticClass:"flex jc-sb wp-100"},[e("span",{staticClass:"fs-22 ml-10"},[t._v("￥"+t._s((r.allFee/100).toFixed(2)))]),e("span",{staticClass:"fc-999 mr-10 fs-14"},[t._v("x "+t._s(t._f("getOrderGoodsNum")(r.carts)))])])]):t._e(),e("van-icon",{directives:[{name:"show",rawName:"v-show",value:1!=r.carts.length,expression:"order.carts.length != 1"}],staticClass:"ml-10",attrs:{name:"arrow"}})],1)],1),e("div",{staticClass:"goods-num wp-100 flex fs-14"},[e("div",[e("span",[t._v("共"+t._s(t._f("getOrderGoodsNum")(r.carts))+"件商品 ")]),e("span",[t._v(" 实付 ")]),e("span",[t._v(" ￥"+t._s((r.allFee/100).toFixed(2)))])])]),e("div",{staticClass:"orderState flex jc-sb fs-12 ai-c"},[e("CountDown",{attrs:{time:5,createdOrderTime:r.createTime,orderState:r.orderStatus},on:{changeOrderState:t.changeOrderState}}),e("div",{staticClass:"flex ai-c"},["02"===r.orderStatus?e("span",{on:{click:function(e){return t.toPay(r.orderId,r.allFee,r.createTime,r.qrcode)}}},[t._v("去支付")]):"01"===r.orderStatus?e("span",{on:{click:function(e){return t.toPreOrderDetail(r.preOrderId)}}},[t._v("再次购买")]):e("span",{on:{click:function(e){return t.toPreOrderDetail(r.preOrderId)}}},[t._v("重新购买")]),"01"!==r.orderStatus?e("span",{on:{click:function(e){return t.delOrder(r.orderId)}}},[t._v("删除订单")]):t._e()])],1)])})),0)],1)},a=[],i=(e("4de4"),e("159b"),e("5608")),o=e("365c"),s=e("4624"),c={name:"order",data:function(){return{active:0,orderList:[]}},mixins:[s["a"]],components:{CountDown:i["a"]},created:function(){this.getOrderAllInfo()},computed:{changeOrderList:function(){var t=[];return t=1==this.active?this.orderList.filter((function(t){return"02"===t.orderStatus})):2==this.active?this.orderList.filter((function(t){return"01"===t.orderStatus})):3==this.active?this.orderList.filter((function(t){return"00"===t.orderStatus})):this.orderList,t}},filters:{getOrderGoodsNum:function(t){var r=0;return t.forEach((function(t){return r+=t.buyNum})),r}},methods:{getOrderAllInfo:function(){var t=this;this.showLoading(),o["f"].getOrderAll().then((function(r){t.orderList=r.list,t.$toast.clear()})).catch((function(r){return t.$toast.fail(r)}))},toPay:function(t,r,e,n){this.$router.push({name:"pay",params:{orderId:t,allFee:r,createdOrderTime:e,qrCode:n}})},delOrder:function(t){var r=this;window.confirm("是否删除该订单？")&&(this.showLoading(),o["f"].delOrder({orderId:t}).then((function(e){666==e.code&&(r.orderList=r.orderList.filter((function(r){return r.orderId!=t})),r.$toast.clear(),r.$toast.success("小主，订单删除成功"))})).catch((function(t){return r.$toast.fail(t)})))},changeOrderState:function(){this.getOrderAllInfo()},toPreOrderDetail:function(t){this.$router.push({name:"preOrderDatail",params:{preOrderId:t,isBuyAgain:!0}})}}},u=c,d=(e("dc4d"),e("2877")),f=Object(d["a"])(u,n,a,!1,null,"5d60002a",null);r["default"]=f.exports},e8b5:function(t,r,e){var n=e("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}}}]);
//# sourceMappingURL=chunk-7cfd8ca7.5c180f07.js.map
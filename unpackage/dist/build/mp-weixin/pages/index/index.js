(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"38eb":function(n,e,t){"use strict";(function(n){t("3799");o(t("66fd"));var e=o(t("8c84"));function o(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},"4a22":function(n,e,t){"use strict";var o=t("5cf0"),a=t.n(o);a.a},"4a4e":function(n,e,t){"use strict";t.d(e,"b",(function(){return a})),t.d(e,"c",(function(){return c})),t.d(e,"a",(function(){return o}));var o={uNavbar:function(){return t.e("uview-ui/components/u-navbar/u-navbar").then(t.bind(null,"1940"))},uIcon:function(){return t.e("uview-ui/components/u-icon/u-icon").then(t.bind(null,"1d22"))},uTabbar:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-tabbar/u-tabbar")]).then(t.bind(null,"da49"))}},a=function(){var n=this,e=n.$createElement,o=(n._self._c,t("807a")),a=t("0a45");n.$mp.data=Object.assign({},{$root:{m0:o,m1:a}})},c=[]},"5cf0":function(n,e,t){},"8c84":function(n,e,t){"use strict";t.r(e);var o=t("4a4e"),a=t("fe1e");for(var c in a)"default"!==c&&function(n){t.d(e,n,(function(){return a[n]}))}(c);t("4a22");var u,i=t("f0c5"),r=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=r.exports},f71d:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{title:"家庭医生",backIconName:"home-fill",backText:"",background:{"background-image":"linear-gradient(45deg, rgb(79, 121, 164), rgb(130, 174, 222))"},adverts:[{image:"homebg.jpg"}],current:0,show:!0,bgColor:"#ffffff",borderTop:!0,list:[{iconPath:"home",selectedIconPath:"home-fill",text:"首页",count:0,isDot:!0,customIcon:!1,pagePath:"/pages/index/index"},{iconPath:"account",selectedIconPath:"account-fill",text:"医生导览",customIcon:!1,pagePath:"/pages/doctor/index"},{iconPath:"heart",selectedIconPath:"heart-fill",text:"医疗服务",customIcon:!1,pagePath:"/pages/service/index"}],midButton:!0,inactiveColor:"#909399",activeColor:"#4371af"}},onLoad:function(){},methods:{gotoOther:function(){console.log("index",this.current)},gotoLogin:function(){n.navigateTo({url:"../login/Login",success:function(n){console.log(n)},fail:function(n){console.log(n)}})}}};e.default=t}).call(this,t("543d")["default"])},fe1e:function(n,e,t){"use strict";t.r(e);var o=t("f71d"),a=t.n(o);for(var c in o)"default"!==c&&function(n){t.d(e,n,(function(){return o[n]}))}(c);e["default"]=a.a}},[["38eb","common/runtime","common/vendor"]]]);
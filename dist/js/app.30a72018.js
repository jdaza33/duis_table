(function(e){function t(t){for(var s,a,o=t[0],u=t[1],c=t[2],d=0,f=[];d<o.length;d++)a=o[d],r[a]&&f.push(r[a][0]),r[a]=0;for(s in u)Object.prototype.hasOwnProperty.call(u,s)&&(e[s]=u[s]);l&&l(t);while(f.length)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],s=!0,o=1;o<n.length;o++){var u=n[o];0!==r[u]&&(s=!1)}s&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var s={},r={app:0},i=[];function a(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=s,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(n,s,function(t){return e[t]}.bind(null,s));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var l=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2856:function(e,t,n){},3672:function(e,t,n){"use strict";var s=n("d248"),r=n.n(s);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d"),n("684e"),n("6d93");var s=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("router-view")],1)},i=[],a={},o=a,u=(n("5c0b"),n("2877")),c=Object(u["a"])(o,r,i,!1,null,null,null);c.options.__file="App.vue";var l=c.exports,d=n("8c4f"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"columns"},[n("div",{staticClass:"column is-one-third master"},[n("section",{staticClass:"section"},[n("p",{staticClass:"title is-3 has-text-centered"},[e._v("¡Bienvenido!")]),n("b-field",[n("b-input",{attrs:{placeholder:"Username",type:"text","icon-pack":"fas",icon:"user",maxlength:"12",min:"5",rounded:""}})],1),n("b-field",[n("b-input",{attrs:{placeholder:"Contraseña",type:"password","icon-pack":"fas",icon:"key","password-reveal":"",rounded:""}})],1),n("div",{staticClass:"has-text-centered"},[n("a",{staticClass:"button is-vcentered is-primary is-outlined is-rounded",on:{click:function(t){e.go("panel")}}},[e._v("Iniciar Sesión")])])],1)]),e._m(0)])},p=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"interactive-bg column master submaster"},[n("img",{staticClass:"login-logo",attrs:{src:"img/duis-full.png"}})])}],v=(n("96cf"),n("3040")),b={name:"login",data:function(){return{show:1}},methods:{go:function(){var e=Object(v["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.$router.push({name:t});case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}},m=b,h=(n("d2f1"),Object(u["a"])(m,f,p,!1,null,"0c13e63a",null));h.options.__file="Login.vue";var g=h.exports,_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"dash"}},[n("nav",{staticClass:"navbar"},[n("div",{staticClass:"navbar-brand"},[n("a",{staticClass:"navbar-item",on:{click:function(t){e.go("home")}}},[n("img",{attrs:{src:"img/duis-min.png",width:"30",height:"28"}}),n("h1",{staticClass:"title is-3 titlecolor"},[e._v("Duis")])]),n("div",{staticClass:"navbar-burger burger",attrs:{"data-target":"nav-phone"},on:{click:function(t){e.burger()}}},[n("span"),n("span"),n("span")])]),n("div",{staticClass:"navbar-menu",attrs:{id:"nav-phone"}},[n("div",{staticClass:"navbar-end"},[n("b-dropdown",{attrs:{position:"is-bottom-left"}},[n("a",{staticClass:"navbar-item is-info",attrs:{slot:"trigger"},slot:"trigger"},[n("span",[e._v("J. Daza")]),n("b-icon",{attrs:{icon:"caret-down",pack:"fas"}})],1),n("b-dropdown-item",{attrs:{value:"logout"},on:{click:function(t){e.logout()}}},[n("b-icon",{attrs:{icon:"sign-out-alt",pack:"fas"}}),e._v("\n                     Salir\n               ")],1)],1)],1)])]),n("div",{staticClass:"center"},[n("div",{staticClass:"is-main-content"},[n("router-view")],1)]),e._m(0),n("b-loading",{attrs:{"is-full-page":e.isFullPage,active:e.isLoading,"can-cancel":!1},on:{"update:active":function(t){e.isLoading=t}}})],1)},y=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"footer"},[n("div",{staticClass:"content has-text-centered"},[n("p",[e._v("\n        ©2018 — "),n("strong",[e._v("PDF-Viewer")])])])])}],w={data:function(){return{drawer:!0,preLoading:0,isLoading:!1,isFullPage:!0,userData:"",userInfoData:"",right:null,menus:[{title:"Cerrar Sesión"}]}},methods:{logout:function(){this.go("login")},go:function(e){this.$router.push({name:e})},burger:function(){var e=document.querySelector(".burger"),t=document.querySelector("#"+e.dataset.target);e.classList.toggle("is-active"),t.classList.toggle("is-active")},isNotLoading:function(){2==this.preLoading&&(this.isLoading=!1)}},created:function(){},watch:{}},C=w,j=(n("3672"),Object(u["a"])(C,_,y,!1,null,"3c45f48a",null));j.options.__file="Panel.vue";var O=j.exports,M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"session"},on:{error:e.errorHandler}},[n("publisher",{attrs:{session:e.session},on:{error:e.errorHandler}}),e._l(e.streams,function(t){return n("div",{key:t.streamId,attrs:{id:"subscribers"}},[n("subscriber",{attrs:{stream:t,session:e.session},on:{error:e.errorHandler}})],1)})],2)},N=[],S=n("33ba"),k=n.n(S),x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},D=[],T={name:"publisher",props:{session:{type:k.a.Session,required:!1},opts:{type:Object,required:!1}},mounted:function(){var e=this,t=k.a.initPublisher(this.$el,this.opts,function(t){t?e.$emit("error",t):e.$emit("publisherCompleted")});this.$emit("publisherCreated",t);var n=function(){e.session.publish(t,function(n){n?e.$emit("error",n):e.$emit("publisherConnected",t)})};this.session&&this.session.isConnected()&&n(),this.session&&this.session.on("sessionConnected",n)}},$=T,E=Object(u["a"])($,x,D,!1,null,null,null);E.options.__file="Publisher.vue";var L=E.exports,P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},Z=[],z={name:"subscriber",props:{stream:{type:OT.Stream,required:!0},session:{type:OT.Session,required:!0},opts:{type:Object,required:!1}},mounted:function(){var e=this,t=this.session.subscribe(this.stream,this.$el,this.opts,function(n){n?e.$emit("error",n):e.$emit("subscriberConnected",t)});this.$emit("subscriberCreated",t)}},W=z,F=Object(u["a"])(W,P,Z,!1,null,null,null);F.options.__file="Subscriber.vue";var I=F.exports,U=function(e){alert(e.message)},Y={name:"session",data:function(){return{apiKey:"46204402",sessionId:"2_MX40NjIwNDQwMn5-MTUzOTgxNjIzOTg1Nn4zaFBSZDQ0VHNuZG5sOFgvbFpLN3l1cHV-QX4",token:"T1==cGFydG5lcl9pZD00NjIwNDQwMiZzaWc9MzE5Y2I5MWIzNjY2MWNjY2JjYTQyN2M2Y2U1ZjNiYTI2ZWUwZDkyMDpzZXNzaW9uX2lkPTJfTVg0ME5qSXdORFF3TW41LU1UVXpPVGd4TmpJek9UZzFObjR6YUZCU1pEUTBWSE51Wkc1c09GZ3ZiRnBMTjNsMWNIVi1RWDQmY3JlYXRlX3RpbWU9MTUzOTgxNjIzOSZyb2xlPW1vZGVyYXRvciZub25jZT0xNTM5ODE2MjM5Ljg5NDExNzY5NDg0MTEzJmV4cGlyZV90aW1lPTE1NDA0MjEwMzkmY29ubmVjdGlvbl9kYXRhPW5hbWUlM0RKb2hubnk=",streams:[],session:null}},components:{Publisher:L,Subscriber:I},created:function(){var e=this;this.session=k.a.initSession(this.apiKey,this.sessionId),this.session.connect(this.token,function(e){e&&U(e)}),this.session.on("streamCreated",function(t){e.streams.push(t.stream)}),this.session.on("streamDestroyed",function(t){var n=e.streams.indexOf(t.stream);n>-1&&e.streams.splice(n,1)})},methods:{errorHandler:U}},V=Y,J=(n("f04d"),Object(u["a"])(V,M,N,!1,null,null,null));J.options.__file="Session.vue";var R=J.exports;s["default"].use(d["a"]);var X=new d["a"]({routes:[{path:"/",name:"login",component:g},{path:"/panel",name:"panel",redirect:"/panel/session",component:O,children:[{path:"session",name:"session",component:R}]}]}),q=n("00e7"),G=n.n(q),H=n("85ff"),Q=n.n(H),A=n("8a03"),B=n.n(A);n("5abe");s["default"].use(G.a),s["default"].use(B.a,{defaultDayNames:["D","L","M","Mi","J","V","S"],defaultMonthNames:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],defaultFirstDayOfWeek:1,defaultDateFormatter:function(e){return e.toLocaleDateString("es-ES")}});var K={isEnabled:!0,logLevel:"debug",stringifyArguments:!1,showLogLevel:!1,showMethodName:!1,separator:"|",showConsoleColors:!1};s["default"].use(Q.a,K),s["default"].config.productionTip=!1,new s["default"]({router:X,render:function(e){return e(l)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var s=n("2856"),r=n.n(s);r.a},b854:function(e,t,n){},d248:function(e,t,n){},d2f1:function(e,t,n){"use strict";var s=n("b854"),r=n.n(s);r.a},ec0d:function(e,t,n){},f04d:function(e,t,n){"use strict";var s=n("ec0d"),r=n.n(s);r.a}});
//# sourceMappingURL=app.30a72018.js.map
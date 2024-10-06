(function(){"use strict";var e={1041:function(e,t,n){var r=n(5130),o=n(4373),a=n(6942),i=n(6768);const s={class:"laoderWrap d-flex justify-content-center align-items-center"},c=(0,i.Fv)('<div class="loadingBox d-flex justify-content-center align-items-center" data-v-36fb3016><span class="loader1" data-v-36fb3016></span><span class="loader2" data-v-36fb3016></span><span class="loader3" data-v-36fb3016></span><text class="text-dark" data-v-36fb3016>Loading...</text></div>',1),u=[c];function d(e,t){return(0,i.uX)(),(0,i.CE)("div",s,u)}var l=n(1241);const f={},p=(0,l.A)(f,[["render",d],["__scopeId","data-v-36fb3016"]]);var h=p;function m(e,t,n,r,o,a){const s=(0,i.g2)("MessagesView"),c=(0,i.g2)("router-view");return(0,i.uX)(),(0,i.CE)(i.FK,null,[(0,i.bF)(s),(0,i.bF)(c)],64)}var b=n(3497),v=n.n(b);const g={class:"toast-container end-0 mt-3 container-fluid"};function y(e,t,n,r,o,a){const s=(0,i.g2)("ToastView");return(0,i.uX)(),(0,i.CE)("div",g,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(o.messages,((e,t)=>((0,i.uX)(),(0,i.Wv)(s,{key:e+t,msg:e},null,8,["msg"])))),128))])}n(4114);var x=n(4232);const k={ref:"toast",class:"toast mb-2 shadow-none",role:"alert","aria-live":"assertive","aria-atomic":"true"},w={class:"d-flex"},E={class:"d-flex align-items-center ms-2 px-2 py-1"},C={class:"text-dark fs-6"},_=(0,i.Lk)("button",{type:"button",class:"btn-close me-2 m-auto","data-bs-dismiss":"toast","aria-label":"Close"},null,-1),P={key:0,class:"toast-body text-danger border-top ps-4"},j=(0,i.Lk)("strong",null,"必填欄位：",-1);function A(e,t,n,r,o,a){return(0,i.uX)(),(0,i.CE)("div",k,[(0,i.Lk)("div",w,[(0,i.Lk)("div",E,[(0,i.Lk)("div",{class:(0,x.C4)([a.iconStyle,"me-3 fs-3"])},null,2),(0,i.Lk)("div",C,(0,x.v_)(n.msg.title),1)]),_]),n.msg.content?((0,i.uX)(),(0,i.CE)("div",P,[j,(0,i.eW)((0,x.v_)(n.msg.content),1)])):(0,i.Q3)("",!0)],512)}var O=n(1560),S=n.n(O),L={data(){return{}},props:["msg"],computed:{iconStyle(){return"success"===this.msg.style?"bi bi-check-circle-fill text-success":"bi bi-x-circle-fill text-danger"}},mounted(){const e=this.$refs.toast,t=new(S())(e,{delay:3e3});t.show()}};const T=(0,l.A)(L,[["render",A]]);var F=T,M={data(){return{messages:[]}},components:{ToastView:F},inject:["emitter"],mounted(){this.emitter.on("push-message",(e=>{const{style:t="success",title:n,content:r}=e;this.messages.push({style:t,title:n,content:r})}))}};const N=(0,l.A)(M,[["render",y],["__scopeId","data-v-649f3720"]]);var B=N,X=n(595);const D=(0,X.A)();var I=D,V={components:{MessagesView:B},provide(){return{emitter:I}},mounted(){v().init()}};const K=(0,l.A)(V,[["render",m]]);var Q=K,W=n(1387);const $=[{path:"/login",component:()=>n.e(192).then(n.bind(n,9192))},{path:"/dashboard",component:()=>Promise.all([n.e(886),n.e(248)]).then(n.bind(n,4248)),children:[{path:"admin-products",component:()=>Promise.all([n.e(985),n.e(906)]).then(n.bind(n,8906))},{path:"coupons",component:()=>Promise.all([n.e(985),n.e(387)]).then(n.bind(n,387))},{path:"order-list",component:()=>Promise.all([n.e(985),n.e(238)]).then(n.bind(n,7238))},{path:"admin-QA",component:()=>Promise.all([n.e(985),n.e(328)]).then(n.bind(n,328))}]},{path:"/",component:()=>Promise.all([n.e(886),n.e(292)]).then(n.bind(n,6292)),children:[{path:"",component:()=>Promise.all([n.e(112),n.e(913)]).then(n.bind(n,6545))},{path:"user-products",component:()=>n.e(842).then(n.bind(n,842))},{path:"user-products/:currentCategory",component:()=>n.e(842).then(n.bind(n,842))},{path:"product/:id",component:()=>Promise.all([n.e(112),n.e(668)]).then(n.bind(n,5340))},{path:"cart",component:()=>Promise.all([n.e(985),n.e(791)]).then(n.bind(n,3791)),children:[{path:"",component:()=>n.e(912).then(n.bind(n,7912))}]},{path:"favorite",component:()=>n.e(842).then(n.bind(n,842))},{path:"order/:orderId",component:()=>n.e(12).then(n.bind(n,8012)),children:[{path:"",component:()=>n.e(912).then(n.bind(n,7912))}]},{path:"order-list",component:()=>n.e(928).then(n.bind(n,4928))},{path:"QA",component:()=>n.e(969).then(n.bind(n,9969))}]},{path:"/:pathMatch(.*)*",redirect:"/"}],q=(0,W.aE)({history:(0,W.Bt)(),routes:$});var U=q;function H(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function z(e){return new Date(1e3*e).toLocaleDateString()}function G(e){I.emit("push-message",{style:"success",title:e})}function J(e,t){const n=[];Object.values(e.data.message).forEach((e=>{" title 欄位為必填"===e&&(e="名稱或標題",n.push(e))," category 欄位為必填"===e&&(e="類別",n.push(e))," unit 欄位為必填"===e&&(e="單位",n.push(e))," origin_price 欄位為必填"===e&&(e="原價",n.push(e))," price 欄位為必填"===e&&(e="售價",n.push(e))," code 欄位為必填"===e&&(e="折扣碼",n.push(e))," percent 欄位為必填"===e&&(e="總金額折扣％",n.push(e))," due_date 欄位為必填"===e&&(e="使用期限",n.push(e))," is_enabled 欄位為必填"===e&&(e="啟用",n.push(e)),"code 屬性不得為空"===e&&(e="折扣碼",n.push(e)),"percent 屬性不得為空"===e&&(e="總金額折扣％",n.push(e)),"due_date 屬性不得為空"===e&&(e="使用期限",n.push(e)),"due_date 型別錯誤"===e&&(e="使用期限",n.push(e)),"title 屬性不得為空"===e&&(e="名稱或標題",n.push(e)),"unit 屬性不得為空"===e&&(e="單位",n.push(e)),"origin_price 屬性不得為空"===e&&(e="原價",n.push(e)),"price 屬性不得為空"===e&&(e="售價",n.push(e)),"category 型別錯誤"===e&&(e="類別",n.push(e)),"content 屬性不得為空"===e&&(e="問題解答",n.push(e)),"author 屬性不得為空"===e&&(e="發布者",n.push(e))," author 欄位為必填"===e&&(e="發布者",n.push(e))," content 欄位為必填"===e&&(e="問題解答",n.push(e))," isPublic 欄位為必填"===e&&(e="公開此問答",n.push(e))})),I.emit("push-message",{style:"failure",title:t,content:n.join("、")})}var R=n(961);const Y=(0,r.Ef)(Q);Y.config.globalProperties.$filters={currency:H,changeDateStyle:z},Y.config.globalProperties.$pushMsg={status200:G,status404:J},Y.use(a.A,o.A),Y.use(U),Y.component("LoadingView",h),Y.component("v-select",R.A),Y.mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.loaded=!0,a.exports}n.m=e,function(){n.amdO={}}(),function(){var e=[];n.O=function(t,r,o,a){if(!r){var i=1/0;for(d=0;d<e.length;d++){r=e[d][0],o=e[d][1],a=e[d][2];for(var s=!0,c=0;c<r.length;c++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(s=!1,a<i&&(i=a));if(s){e.splice(d--,1);var u=o();void 0!==u&&(t=u)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[r,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{12:"61f09468",112:"b76f210c",192:"c933f25a",238:"5c41ec95",248:"af018aeb",292:"c30254bd",328:"a9d788a8",387:"1e70dfb6",668:"00961295",791:"01e09456",842:"18cb5864",886:"fe941309",906:"c739b6f9",912:"f3683a4e",913:"048b7a5c",928:"01d47d19",969:"0663ed7f",985:"97f81520"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{12:"c8c6375a",192:"41429c63",238:"207d281b",248:"ed040fa3",292:"1a613c6a",328:"0ed8cd8b",387:"4dffa717",668:"315f0d50",791:"def519c4",842:"387c4913",906:"19fa1104",912:"5e007d2d",913:"7c647155",928:"d79507ab",969:"790c9a0b"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="fresh_box:";n.l=function(r,o,a,i){if(e[r])e[r].push(o);else{var s,c;if(void 0!==a)for(var u=document.getElementsByTagName("script"),d=0;d<u.length;d++){var l=u[d];if(l.getAttribute("src")==r||l.getAttribute("data-webpack")==t+a){s=l;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+a),s.src=r),e[r]=[o];var f=function(t,n){s.onerror=s.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/fresh_box/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,r,o,a){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",n.nc&&(i.nonce=n.nc);var s=function(n){if(i.onerror=i.onload=null,"load"===n.type)o();else{var r=n&&n.type,s=n&&n.target&&n.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+": "+s+")");c.name="ChunkLoadError",c.code="CSS_CHUNK_LOAD_FAILED",c.type=r,c.request=s,i.parentNode&&i.parentNode.removeChild(i),a(c)}};return i.onerror=i.onload=s,i.href=t,r?r.parentNode.insertBefore(i,r.nextSibling):document.head.appendChild(i),i},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){o=i[r],a=o.getAttribute("data-href");if(a===e||a===t)return o}},r=function(r){return new Promise((function(o,a){var i=n.miniCssF(r),s=n.p+i;if(t(i,s))return o();e(r,s,null,o,a)}))},o={524:0};n.f.miniCss=function(e,t){var n={12:1,192:1,238:1,248:1,292:1,328:1,387:1,668:1,791:1,842:1,906:1,912:1,913:1,928:1,969:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}}(),function(){var e={524:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=a);var i=n.p+n.u(t),s=new Error,c=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,o[1](s)}};n.l(i,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,i=r[0],s=r[1],c=r[2],u=0;if(i.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(c)var d=c(n)}for(t&&t(r);u<i.length;u++)a=i[u],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(d)},r=self["webpackChunkfresh_box"]=self["webpackChunkfresh_box"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[504],(function(){return n(1041)}));r=n.O(r)})();
//# sourceMappingURL=app.8c7a9d8f.js.map
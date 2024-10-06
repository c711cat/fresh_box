(self["webpackChunkfresh_box"]=self["webpackChunkfresh_box"]||[]).push([[328],{2896:function(e,t,s){s(4114),
/*!
  * Bootstrap collapse.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
function(t,i){e.exports=i(s(6e3),s(1617),s(4822),s(1752))}(0,(function(e,t,s,i){"use strict";const a="collapse",n="bs.collapse",l=`.${n}`,o=".data-api",r=`show${l}`,c=`shown${l}`,d=`hide${l}`,h=`hidden${l}`,p=`click${l}${o}`,u="show",g="collapse",m="collapsing",f="collapsed",b=`:scope .${g} .${g}`,_="collapse-horizontal",A="width",k="height",L=".collapse.show, .collapse.collapsing",Q='[data-bs-toggle="collapse"]',v={parent:null,toggle:!0},y={parent:"(null|element)",toggle:"boolean"};class C extends e{constructor(e,t){super(e,t),this._isTransitioning=!1,this._triggerArray=[];const i=s.find(Q);for(const a of i){const e=s.getSelectorFromElement(a),t=s.find(e).filter((e=>e===this._element));null!==e&&t.length&&this._triggerArray.push(a)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return v}static get DefaultType(){return y}static get NAME(){return a}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let e=[];if(this._config.parent&&(e=this._getFirstLevelChildren(L).filter((e=>e!==this._element)).map((e=>C.getOrCreateInstance(e,{toggle:!1})))),e.length&&e[0]._isTransitioning)return;const s=t.trigger(this._element,r);if(s.defaultPrevented)return;for(const t of e)t.hide();const i=this._getDimension();this._element.classList.remove(g),this._element.classList.add(m),this._element.style[i]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const a=()=>{this._isTransitioning=!1,this._element.classList.remove(m),this._element.classList.add(g,u),this._element.style[i]="",t.trigger(this._element,c)},n=i[0].toUpperCase()+i.slice(1),l=`scroll${n}`;this._queueCallback(a,this._element,!0),this._element.style[i]=`${this._element[l]}px`}hide(){if(this._isTransitioning||!this._isShown())return;const e=t.trigger(this._element,d);if(e.defaultPrevented)return;const a=this._getDimension();this._element.style[a]=`${this._element.getBoundingClientRect()[a]}px`,i.reflow(this._element),this._element.classList.add(m),this._element.classList.remove(g,u);for(const t of this._triggerArray){const e=s.getElementFromSelector(t);e&&!this._isShown(e)&&this._addAriaAndCollapsedClass([t],!1)}this._isTransitioning=!0;const n=()=>{this._isTransitioning=!1,this._element.classList.remove(m),this._element.classList.add(g),t.trigger(this._element,h)};this._element.style[a]="",this._queueCallback(n,this._element,!0)}_isShown(e=this._element){return e.classList.contains(u)}_configAfterMerge(e){return e.toggle=Boolean(e.toggle),e.parent=i.getElement(e.parent),e}_getDimension(){return this._element.classList.contains(_)?A:k}_initializeChildren(){if(!this._config.parent)return;const e=this._getFirstLevelChildren(Q);for(const t of e){const e=s.getElementFromSelector(t);e&&this._addAriaAndCollapsedClass([t],this._isShown(e))}}_getFirstLevelChildren(e){const t=s.find(b,this._config.parent);return s.find(e,this._config.parent).filter((e=>!t.includes(e)))}_addAriaAndCollapsedClass(e,t){if(e.length)for(const s of e)s.classList.toggle(f,!t),s.setAttribute("aria-expanded",t)}static jQueryInterface(e){const t={};return"string"===typeof e&&/show|hide/.test(e)&&(t.toggle=!1),this.each((function(){const s=C.getOrCreateInstance(this,t);if("string"===typeof e){if("undefined"===typeof s[e])throw new TypeError(`No method named "${e}"`);s[e]()}}))}}return t.on(document,p,Q,(function(e){("A"===e.target.tagName||e.delegateTarget&&"A"===e.delegateTarget.tagName)&&e.preventDefault();for(const t of s.getMultipleElementsFromSelector(this))C.getOrCreateInstance(t,{toggle:!1}).toggle()})),i.defineJQueryPlugin(C),C}))},291:function(e,t,s){"use strict";s.d(t,{A:function(){return m}});var i=s(6768),a=s(5130),n=s(4232);const l={class:"pt-3","aria-label":"Page navigation"},o={class:"pagination my-3 justify-content-center"},r={class:"page-item"},c=["onClick"],d={class:"page-item"};function h(e,t,s,h,p,u){return(0,i.uX)(),(0,i.CE)("nav",l,[(0,i.Lk)("ul",o,[(0,i.Lk)("li",r,[(0,i.Lk)("a",{onClick:t[0]||(t[0]=(0,a.D$)((e=>u.goToPrePage(s.pages.current_page)),["prevent"])),class:(0,n.C4)([{"disabledPreNext disabled":1===s.pages.current_page},"page-link text-black bi bi-chevron-double-left mx-1"]),"aria-hidden":"true",href:"#"},null,2)]),((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(s.pages.total_pages,(e=>((0,i.uX)(),(0,i.CE)("li",{key:e,class:"page-item"},[(0,i.Lk)("a",{onClick:(0,a.D$)((t=>u.updatePage(e)),["prevent"]),class:(0,n.C4)([{"currentPageStyle disabled":e===s.pages.current_page},"page-link text-black mx-1"]),href:"#"},(0,n.v_)(e),11,c)])))),128)),(0,i.Lk)("li",d,[(0,i.Lk)("a",{onClick:t[1]||(t[1]=(0,a.D$)((e=>u.goToNextPage(s.pages.current_page)),["prevent"])),class:(0,n.C4)([{"disabledPreNext disabled":s.pages.current_page===s.pages.total_pages},"page-link text-black bi bi-chevron-double-right mx-1"]),href:"#"},null,2)])])])}var p={data(){return{}},props:["pages"],methods:{updatePage(e){this.$emit("emit-pages",e)},goToPrePage(e){const t=e-1;this.$emit("emit-pages",t)},goToNextPage(e){const t=e+1;this.$emit("emit-pages",t)}}},u=s(1241);const g=(0,u.A)(p,[["render",h],["__scopeId","data-v-19377b96"]]);var m=g},328:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return Z}});var i=s(6768),a=s(4232);const n=e=>((0,i.Qi)("data-v-22f3ae15"),e=e(),(0,i.jt)(),e),l={key:1,class:"wrap mx-auto col-11 col-md-10 col-lg-8"},o={class:"px-1 mb-2 d-flex justify-content-between align-items-center flex-wrap"},r=n((()=>(0,i.Lk)("h3",{class:"mb-0"},"常見問題",-1))),c={class:"accordion",id:"QAList"},d={class:"accordion-header"},h=["data-bs-target","aria-controls"],p={class:"d-flex flex-wrap align-items-center py-2"},u={key:0,class:"d-inline text-danger border border-danger p-1 me-2 rounded"},g={class:"py-2"},m=["id"],f={class:"accordion-body"},b={class:"overflow-x-auto mb-3"},_={class:"col-12 text-end flex-wrap"},A=["onClick"],k=["onClick"];function L(e,t,s,n,L,Q){const v=(0,i.g2)("LoadingView"),y=(0,i.g2)("PaginationView"),C=(0,i.g2)("QAModal"),x=(0,i.g2)("DelModal");return(0,i.uX)(),(0,i.CE)(i.FK,null,[L.isLoading?((0,i.uX)(),(0,i.Wv)(v,{key:0})):((0,i.uX)(),(0,i.CE)("main",l,[(0,i.Lk)("header",o,[r,(0,i.Lk)("button",{onClick:t[0]||(t[0]=e=>Q.openQA_Modal(!0)),class:"btn btn-primary",type:"button"}," 新增 ")]),(0,i.Lk)("section",c,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(L.QA_List,((e,t)=>((0,i.uX)(),(0,i.CE)("div",{key:e.id,class:"accordion-item"},[(0,i.Lk)("h2",d,[(0,i.Lk)("button",{class:(0,a.C4)([{"bg-secondary-subtle":!1===e.isPublic},"accordion-button py-0"]),type:"button","data-bs-toggle":"collapse","data-bs-target":`#QA_List${t}`,"aria-expanded":"true","aria-controls":`QA_List${t}`},[(0,i.Lk)("div",p,[!1===e.isPublic?((0,i.uX)(),(0,i.CE)("div",u," 未公開 ")):(0,i.Q3)("",!0),(0,i.Lk)("div",g,"Q"+(0,a.v_)(e.num)+". "+(0,a.v_)(e.title),1)])],10,h)]),(0,i.Lk)("div",{id:`QA_List${t}`,class:(0,a.C4)([{"bg-body-secondary text-secondary":!1===e.isPublic},"accordion-collapse collapse"])},[(0,i.Lk)("div",f,[(0,i.Lk)("p",b,"A : "+(0,a.v_)(e.description),1),(0,i.Lk)("div",_,[(0,i.Lk)("button",{onClick:t=>Q.openQA_Modal(L.isNew,e),class:"btn btn-outline-dark-primary me-2",type:"button"}," 編輯 ",8,A),(0,i.Lk)("button",{onClick:t=>Q.openDelModal(e),class:"btn btn-outline-danger",type:"button"}," 刪除 ",8,k)])])],10,m)])))),128))]),(0,i.Lk)("footer",null,[(0,i.bF)(y,{pages:L.pagination,onEmitPages:Q.getQAList},null,8,["pages","onEmitPages"])])])),(0,i.bF)(C,{ref:"QA_Modal",QA:L.tempQA,onAddQA:Q.addQA,onEditQA:Q.editQA},null,8,["QA","onAddQA","onEditQA"]),(0,i.bF)(x,{ref:"delModal",QA:L.tempQA,onDelQA:Q.delQA},null,8,["QA","onDelQA"])],64)}var Q=s(2896),v=s.n(Q),y=s(5130);const C={ref:"Modal",class:"modal fade",id:"admin's_QA_Modal","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"},x={class:"modal-dialog modal-xl"},$={class:"modal-content"},w={class:"modal-header ps-4"},M={class:"mb-0"},P=(0,i.Lk)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),E={class:"modal-body ms-3"},T={class:"row m-0 g-3"},D=(0,i.Lk)("div",{class:"d-inline text-danger"},"＊",-1),S=(0,i.Lk)("label",{class:"form-label",for:"author"},"發布者",-1),F=(0,i.Lk)("div",{class:"d-inline text-danger"},"＊",-1),X=(0,i.Lk)("label",{class:"form-label",for:"question_title"},"問題標題",-1),N=(0,i.Lk)("div",{class:"d-inline text-danger"},"＊",-1),I=(0,i.Lk)("label",{class:"form-label",for:"answer"},"問題解答",-1),V={class:"col-6 form-check"},q=(0,i.Lk)("label",{class:"form-check-label",for:"isPublic"}," 公開此問答",-1),j={class:"modal-footer"},O=(0,i.Lk)("button",{type:"button",class:"btn btn-outline-dark","data-bs-dismiss":"modal"}," 取消 ",-1);function U(e,t,s,n,l,o){return(0,i.uX)(),(0,i.CE)("div",C,[(0,i.Lk)("div",x,[(0,i.Lk)("div",$,[(0,i.Lk)("header",w,[(0,i.Lk)("h5",M,(0,a.v_)(o.headerText),1),P]),(0,i.Lk)("section",E,[(0,i.Lk)("form",T,[(0,i.Lk)("div",null,[D,S,(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>l.tempQA.author=e),class:"form-control",type:"text",name:"author",id:"author",placeholder:"例如：BOSS"},null,512),[[y.Jo,l.tempQA.author]])]),(0,i.Lk)("div",null,[F,X,(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>l.tempQA.title=e),class:"form-control",type:"text",name:"question_title",id:"question_title",placeholder:"例如：運費計算"},null,512),[[y.Jo,l.tempQA.title]])]),(0,i.Lk)("div",null,[N,I,(0,i.bo)((0,i.Lk)("textarea",{"onUpdate:modelValue":t[2]||(t[2]=e=>l.tempQA.description=e),type:"text",class:"form-control",id:"answer"},"\n              ",512),[[y.Jo,l.tempQA.description]])]),(0,i.Lk)("div",V,[q,(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[3]||(t[3]=e=>l.tempQA.isPublic=e),class:"form-check-input",type:"checkbox","true-value":!0,"false-value":!1,id:"isPublic"},null,512),[[y.lH,l.tempQA.isPublic]])])])]),(0,i.Lk)("footer",j,[O,s.QA.id?((0,i.uX)(),(0,i.CE)("button",{key:0,onClick:t[4]||(t[4]=t=>e.$emit("edit-QA",l.tempQA)),type:"button",class:"btn btn-primary"}," 更新問答 ")):((0,i.uX)(),(0,i.CE)("button",{key:1,onClick:t[5]||(t[5]=t=>e.$emit("add-QA",l.tempQA)),type:"button",class:"btn btn-primary"}," 新增問答 "))])])])],512)}var B=s(3286),J={data(){return{modal:{},tempQA:{}}},mixins:[B.A],props:{QA:{type:Object,default(){return{}}}},watch:{QA(){this.tempQA=this.QA,this.QA.id||(this.tempQA.isPublic=!1)}},computed:{headerText(){return this.QA.id?"更新問答":"新增問答"}}},z=s(1241);const K=(0,z.A)(J,[["render",U]]);var H=K,R=s(3985),W=s(291),G={data(){return{QA_List:{},tempQA:{},isNew:!1,isLoading:!1,pagination:{}}},components:{QAModal:H,DelModal:R.A,PaginationView:W.A},methods:{getQAList(e=1){this.isLoading=!0;const t=`https://vue3-course-api.hexschool.io/v2/api/fresh_box-api/admin/articles?page=${e}`;this.$http.get(t).then((e=>{this.pagination=e.data.pagination,this.QA_List=e.data.articles})).catch((e=>{this.$pushMsg.status404(e.response,"取得問答資料失敗")})).finally((()=>{this.isLoading=!1}))},openQA_Modal(e,t){this.$refs.QA_Modal.showModal(),this.tempQA=e?{}:{...t}},addQA(e){e.create_at=1e3*new Date/1e3,e.content=e.description;const t="https://vue3-course-api.hexschool.io/v2/api/fresh_box-api/admin/article";this.$http.post(t,{data:e}).then((()=>{this.$refs.QA_Modal.hideModal(),this.$pushMsg.status200("新增問答成功")})).catch((e=>{this.$pushMsg.status404(e.response,"新增問答失敗")})).finally((()=>{this.getQAList()}))},editQA(e){e.create_at=1e3*new Date/1e3,e.content=e.description;const t=`https://vue3-course-api.hexschool.io/v2/api/fresh_box-api/admin/article/${e.id}`;this.$http.put(t,{data:e}).then((()=>{this.$refs.QA_Modal.hideModal(),this.$pushMsg.status200("更新問答成功")})).catch((e=>{this.$pushMsg.status404(e.response,"更新問答失敗")})).finally((()=>{this.getQAList()}))},openDelModal(e){this.$refs.delModal.showModal(),this.tempQA={...e}},delQA(e){const t=`https://vue3-course-api.hexschool.io/v2/api/fresh_box-api/admin/article/${e.id}`;this.$http.delete(t).then((()=>{this.$refs.delModal.hideModal(),this.$pushMsg.status200("刪除問答成功")})).catch((e=>{this.$pushMsg.status404(e.response,"刪除失敗")})).finally((()=>{this.getQAList()}))}},created(){this.getQAList()},mounted(){const e=document.querySelectorAll(".collapse");this.QA_List=[...e].map((e=>new(v())(e)))}};const Y=(0,z.A)(G,[["render",L],["__scopeId","data-v-22f3ae15"]]);var Z=Y}}]);
//# sourceMappingURL=328.a9d788a8.js.map
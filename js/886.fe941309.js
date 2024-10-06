(self["webpackChunkfresh_box"]=self["webpackChunkfresh_box"]||[]).push([[886],{8886:function(t,e,i){
/*!
  * Bootstrap offcanvas.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,s){t.exports=s(i(6e3),i(1617),i(4822),i(7100),i(4755),i(2888),i(1752),i(6714))})(0,(function(t,e,i,s,n,o,r,a){"use strict";const l="offcanvas",c="bs.offcanvas",h=`.${c}`,u=".data-api",d=`load${h}${u}`,_="Escape",f="show",m="showing",g="hiding",p="offcanvas-backdrop",b=".offcanvas.show",w=`show${h}`,A=`shown${h}`,v=`hide${h}`,k=`hidePrevented${h}`,E=`hidden${h}`,y=`resize${h}`,x=`click${h}${u}`,C=`keydown.dismiss${h}`,$='[data-bs-toggle="offcanvas"]',D={backdrop:!0,keyboard:!0,scroll:!1},N={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class T extends t{constructor(t,e){super(t,e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return D}static get DefaultType(){return N}static get NAME(){return l}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){if(this._isShown)return;const i=e.trigger(this._element,w,{relatedTarget:t});if(i.defaultPrevented)return;this._isShown=!0,this._backdrop.show(),this._config.scroll||(new a).hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(m);const s=()=>{this._config.scroll&&!this._config.backdrop||this._focustrap.activate(),this._element.classList.add(f),this._element.classList.remove(m),e.trigger(this._element,A,{relatedTarget:t})};this._queueCallback(s,this._element,!0)}hide(){if(!this._isShown)return;const t=e.trigger(this._element,v);if(t.defaultPrevented)return;this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(g),this._backdrop.hide();const i=()=>{this._element.classList.remove(f,g),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||(new a).reset(),e.trigger(this._element,E)};this._queueCallback(i,this._element,!0)}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const t=()=>{"static"!==this._config.backdrop?this.hide():e.trigger(this._element,k)},i=Boolean(this._config.backdrop);return new s({className:p,isVisible:i,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:i?t:null})}_initializeFocusTrap(){return new o({trapElement:this._element})}_addEventListeners(){e.on(this._element,C,(t=>{t.key===_&&(this._config.keyboard?this.hide():e.trigger(this._element,k))}))}static jQueryInterface(t){return this.each((function(){const e=T.getOrCreateInstance(this,t);if("string"===typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}return e.on(document,x,$,(function(t){const s=i.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&t.preventDefault(),r.isDisabled(this))return;e.one(s,E,(()=>{r.isVisible(this)&&this.focus()}));const n=i.findOne(b);n&&n!==s&&T.getInstance(n).hide();const o=T.getOrCreateInstance(s);o.toggle(this)})),e.on(window,d,(()=>{for(const t of i.find(b))T.getOrCreateInstance(t).show()})),e.on(window,y,(()=>{for(const t of i.find("[aria-modal][class*=show][class*=offcanvas-]"))"fixed"!==getComputedStyle(t).position&&T.getOrCreateInstance(t).hide()})),n.enableDismissTrigger(T),r.defineJQueryPlugin(T),T}))},7100:function(t,e,i){
/*!
  * Bootstrap backdrop.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,s){t.exports=s(i(1617),i(540),i(1752))})(0,(function(t,e,i){"use strict";const s="backdrop",n="fade",o="show",r=`mousedown.bs.${s}`,a={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},l={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class c extends e{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return a}static get DefaultType(){return l}static get NAME(){return s}show(t){if(!this._config.isVisible)return void i.execute(t);this._append();const e=this._getElement();this._config.isAnimated&&i.reflow(e),e.classList.add(o),this._emulateAnimation((()=>{i.execute(t)}))}hide(t){this._config.isVisible?(this._getElement().classList.remove(o),this._emulateAnimation((()=>{this.dispose(),i.execute(t)}))):i.execute(t)}dispose(){this._isAppended&&(t.off(this._element,r),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add(n),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=i.getElement(t.rootElement),t}_append(){if(this._isAppended)return;const e=this._getElement();this._config.rootElement.append(e),t.on(e,r,(()=>{i.execute(this._config.clickCallback)})),this._isAppended=!0}_emulateAnimation(t){i.executeAfterTransition(t,this._getElement(),this._config.isAnimated)}}return c}))},2888:function(t,e,i){
/*!
  * Bootstrap focustrap.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,s){t.exports=s(i(1617),i(4822),i(540))})(0,(function(t,e,i){"use strict";const s="focustrap",n="bs.focustrap",o=`.${n}`,r=`focusin${o}`,a=`keydown.tab${o}`,l="Tab",c="forward",h="backward",u={autofocus:!0,trapElement:null},d={autofocus:"boolean",trapElement:"element"};class _ extends i{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return u}static get DefaultType(){return d}static get NAME(){return s}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),t.off(document,o),t.on(document,r,(t=>this._handleFocusin(t))),t.on(document,a,(t=>this._handleKeydown(t))),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,t.off(document,o))}_handleFocusin(t){const{trapElement:i}=this._config;if(t.target===document||t.target===i||i.contains(t.target))return;const s=e.focusableChildren(i);0===s.length?i.focus():this._lastTabNavDirection===h?s[s.length-1].focus():s[0].focus()}_handleKeydown(t){t.key===l&&(this._lastTabNavDirection=t.shiftKey?h:c)}}return _}))},6714:function(t,e,i){
/*!
  * Bootstrap scrollbar.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,s){t.exports=s(i(7492),i(4822),i(1752))})(0,(function(t,e,i){"use strict";const s=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",n=".sticky-top",o="padding-right",r="margin-right";class a{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,o,(e=>e+t)),this._setElementAttributes(s,o,(e=>e+t)),this._setElementAttributes(n,r,(e=>e-t))}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,o),this._resetElementAttributes(s,o),this._resetElementAttributes(n,r)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,i){const s=this.getWidth(),n=t=>{if(t!==this._element&&window.innerWidth>t.clientWidth+s)return;this._saveInitialAttribute(t,e);const n=window.getComputedStyle(t).getPropertyValue(e);t.style.setProperty(e,`${i(Number.parseFloat(n))}px`)};this._applyManipulationCallback(t,n)}_saveInitialAttribute(e,i){const s=e.style.getPropertyValue(i);s&&t.setDataAttribute(e,i,s)}_resetElementAttributes(e,i){const s=e=>{const s=t.getDataAttribute(e,i);null!==s?(t.removeDataAttribute(e,i),e.style.setProperty(i,s)):e.style.removeProperty(i)};this._applyManipulationCallback(e,s)}_applyManipulationCallback(t,s){if(i.isElement(t))s(t);else for(const i of e.find(t,this._element))s(i)}}return a}))}}]);
//# sourceMappingURL=886.fe941309.js.map
/*! nice Validator 0.6.8
 * (c) 2012-2013 Jony Zhang <zj86@live.cn>, MIT Licensed
 * http://niceue.com/validator/
 */
!function(e,t){"use strict";function i(r,n){var s=this;return!s instanceof i?new i(r,n):(s.$el=e(r),s._init(r,n),t)}function r(e,t){var i=t?t===!0?this:t:r.prototype;if(U(e))for(var n in e)i[n]=s(e[n])}function n(e,t){var i=t?t===!0?this:t:n.prototype;if(U(e))for(var r in e){if(!e[r])return;i[r]=e[r]}}function s(t){switch(e.type(t)){case"function":return t;case"array":return function(e){return t[0].test(e.value)||t[1]||!1};case"regexp":return function(e){return t.test(e.value)}}}function a(t){var i="";return e.map(t.split(" "),function(e){i+=","+("#"===e.charAt(0)?e:'[name="'+e+'"]')}),i.substring(1)}function l(t){var i;if(t&&t.tagName){switch(t.tagName){case"INPUT":case"SELECT":case"TEXTAREA":case"BUTTON":case"FIELDSET":i=t.form||e(t).closest(".n-"+p);break;case"FORM":i=t;break;default:i=e(t).closest(".n-"+p)}return e(i).data(p)||e(i)[p]().data(p)}}function u(t,i){if(t.form&&null===H(t.form,F)){var r=l(t);r?(r._parse(t),e(t).trigger(i)):H(t,x,null)}}function o(i,r){var n=e.trim(H(i,x+"-"+r));if(n)return n=Function("return "+n)(),n?s(n):t}function d(e,t,i){var r=t.msg;return U(r)&&i&&(r=r[i]),W(r)||(r=H(e,"data-msg-"+i)||H(e,"data-msg")||""),r}function c(e){var t;return e&&(t=E.exec(e)),t?t[1]:""}function f(e){return"INPUT"===e.tagName&&"checkbox"===e.type||"radio"===e.type}function g(e){return Date.parse(e.replace(/\.|\-/g,"/"))}var h,p="validator",m="n-ok",v="n-error",y="n-tip",b="n-loading",k="n-valid",_="n-invalid",w="msg-box",M="aria-required",O="aria-invalid",x="data-rule",$="data-target",A="data-tip",T="data-inputstatus",F="novalidate",V=":verifiable",C=/(\w+)(?:\[(.*)\]$|\((.*)\)$)?/,S=/(?:([^:;\(\[]*):)?(.*)/,R=/[^\x00-\xff]/g,E=/^.*(top|right|bottom|left).*$/,N=/(?:(post|get):)?(.+)/i,j=/<|>/g,q=e.noop,D=e.proxy,I=e.isFunction,L=e.isArray,W=function(e){return"string"==typeof e},U=function(e){return e&&"[object Object]"===Object.prototype.toString.call(e)},P=!window.XMLHttpRequest,H=function(e,i,r){return r===t?e.getAttribute(i):(null===r?e.removeAttribute(i):e.setAttribute(i,""+r),t)},B=window.console||{log:q,info:q},X={debug:0,timely:1,theme:"default",ignore:"",focusInvalid:!0,msgWrapper:"span",msgMaker:function(e){var t,i={error:v,ok:m,tip:y,loading:b}[e.type];return t='<span class="msg-wrap '+i+'" role="alert">',t+=(e.arrow||"")+(e.icon||"")+'<span class="n-msg">'+e.msg+"</span>",t+="</span>"},msgIcon:'<span class="n-icon"></span>',msgArrow:"",msgClass:"",defaultMsg:"{0} is not valid.",loadingMsg:"Validating..."},J={"default":{formClass:"n-default",msgClass:"n-right",showOk:""}};e.fn[p]=function(t){var r=this,n=arguments;return r.is(":input")?r:(!r.is("form")&&(r=this.find("form")),!r.length&&(r=this),r.each(function(){var r=e(this).data(p);if(r)if(W(t)){if("_"===t.charAt(0))return;r[t].apply(r,Array.prototype.slice.call(n,1))}else t&&(r._reset(!0),r._init(this,t));else new i(this,t)}),this)},e.fn.isValid=function(e,i){var r,n,s=l(this[0]);return s?(i===t&&(i=!0),s.checkOnly=i,r=this.is(":input")?this:this.find(V),n=s._multiValidate(r,function(t){I(e)&&e.call(null,t),s.checkOnly=!1}),I(e)?this:n):!0},e.expr[":"].verifiable=function(e){var t=e.nodeName.toLowerCase();return("input"===t&&"submit"!==e.type&&"button"!==e.type&&"reset"!==e.type||"select"===t||"textarea"===t)&&e.disabled===!1&&null===H(e,F)},i.prototype={_init:function(t,i){var s,l,u,o=this;if(I(i)&&(i={valid:i}),i=i||{},u=H(t,"data-"+p+"-option"),u=u&&"{"===u.charAt(0)?Function("return "+u)():{},l=J[i.theme||u.theme||X.theme],s=o.options=e.extend({},X,l,u,this.options,i),o.rules=new r(s.rules,!0),o.messages=new n(s.messages,!0),o.elements=o.elements||{},o.deferred={},o.errors={},o.fields={},o._initFields(s.fields),L(s.groups)&&e.map(s.groups,function(t){if(!W(t.fields)||!I(t.callback))return null;var i=o.$el.find(a(t.fields)),r=function(){return t.callback.call(o,i)};e.extend(r,t),e.map(t.fields.split(" "),function(e){o.fields[e]=o.fields[e]||{},o.fields[e].group=r})}),o.msgOpt={type:"error",pos:c(s.msgClass),wrapper:s.msgWrapper,cls:s.msgClass,style:s.msgStyle,icon:s.msgIcon,arrow:s.msgArrow,show:s.msgShow,hide:s.msgHide},o.isAjaxSubmit=!1,s.valid||null===H(t,"action"))o.isAjaxSubmit=!0;else{var d=e[e._data?"_data":"data"](t,"events");d&&d.valid&&e.map(d.valid,function(e){return-1!==e.namespace.indexOf("form")?1:null}).length&&(o.isAjaxSubmit=!0)}o.$el.data(p)||(o.$el.data(p,o).addClass("n-"+p+" "+s.formClass).on("submit."+p+" validate."+p,D(o,"_submit")).on("reset."+p,D(o,"_reset")).on("showtip."+p,D(o,"_showTip")).on("validated.field."+p,V,D(o,"_validatedField")).on("validated.rule."+p,V,D(o,"_validatedRule")).on("focusin."+p+" click."+p+" showtip."+p,V,D(o,"_focus")).on("focusout."+p+" validate."+p,V,D(o,"_blur")).on("click."+p,"input:radio,input:checkbox",D(o,"_click")),s.timely>=2&&o.$el.on("keyup."+p+" paste."+p,V,D(o,"_blur")).on("change."+p,"select",D(o,"_click")),o.NOVALIDATE=H(t,F),H(t,F,F))},_initFields:function(t){var i=this;U(t)&&e.each(t,function(e,t){var r=i.elements[e];!t&&r&&i._resetElement(r,!0),i.fields[e]=W(t)?{rule:t}:t}),i.$el.find(V).each(function(){i._parse(this)})},_multiValidate:function(i,r){var n=this,s=n.options;return n.isValid=!0,n.deferred={},s.ignore&&(i=i.not(s.ignore)),i.each(function(e,i){var r=n.getField(i);if(r)return n._validate(i,r),!n.isValid&&s.stopOnError?!1:t}),e.when.apply(null,e.map(n.deferred,function(e){return e})).done(function(){r.call(n,n.isValid)}),e.isEmptyObject(n.deferred)?n.isValid:t},_submit:function(i,r){var n=this,s=n.options,a=i.target;if(h)return h=!1,t;if("only"!==r&&("validate"!==i.type||n.$el[0]===a))return i.preventDefault(),n.submiting?(I(n.submiting)&&n.submiting.call(n),t):(I(s.beforeSubmit)&&s.beforeSubmit.call(n,a)===!1||(n._reset(),n.submiting=!0,n.autoSubmit="submit"===i.type,s.debug&&B.log("\n"+i.type+" form"),n._multiValidate(n.$el.find(V),function(t){var i,r,l="focus.field",u=t||2===s.debug?"valid":"invalid";t||(s.focusInvalid&&(i=n.$el.find(":input["+O+'="true"]:first').trigger(l),P&&i.trigger(l)),r=e.map(n.errors,function(e){return e})),n.submiting=!1,I(s[u])&&s[u].call(n,a,r),n.$el.trigger(u+".form",[a,r]),t&&!n.isAjaxSubmit&&n.autoSubmit&&(h=!0,a.submit())})),t)},_reset:function(e){var t=this;t.errors={},e&&t.$el.find(V).each(function(e,i){t._resetElement(i)})},_resetElement:function(t,i){e(t).removeClass(k+" "+_),this.hideMsg(t),i&&H(t,M,null)},_focus:function(t){var i,r=t.target;if("showtip"!==t.type){if(t.isTrigger||this.submiting)return;if(""!==r.value&&"tip"===H(r,T))return;this.options.focusCleanup&&"error"===H(r,T)&&(e(r).removeClass(_),this.hideMsg(r))}i=H(r,A),i&&this.showMsg(r,{msg:i,type:"tip"})},_blur:function(t,i){var r,n,s=this,a=s.options,l=t.target,u=t.type,o=150;if(!i&&"paste"!==u){if("validate"===u)n=!0,o=0;else{if(H(l,"notimely"))return;if(a.timely>=2&&"keyup"!==u)return}if(a.ignore&&e(l).is(a.ignore))return;if("keyup"===u){var d=t.keyCode,c={8:1,9:1,16:1,32:1,46:1};if(9===d&&!l.value)return;if(48>d&&!c[d])return;o=a.timely>=100?a.timely:500}}r=s.getField(l),r&&(o?(r.timeout&&clearTimeout(r.timeout),r.timeout=setTimeout(function(){s._validate(l,r,n)},o)):s._validate(l,r,n))},_click:function(e){this._blur(e,!0)},_showTip:function(e){var t=this;t.$el[0]===e.target&&t.$el.find(V+"["+A+"]").each(function(){t.showMsg(this,{msg:H(this,A),type:"tip"})})},_parse:function(e){var t,i=this,r=e.name,n=H(e,x);n&&H(e,x,null),(e.id&&"#"+e.id in i.fields||!e.name)&&(r="#"+e.id),r&&(t=i.fields[r]||{},t.key=r,t.old={},null!==i.fields[r]&&(t.rule=t.rule||n||""),t.rule&&(t.rule.match(/match|checked/)&&(t.must=!0),-1!==t.rule.indexOf("required")&&(t.required=!0,H(e,M,!0)),("timely"in t&&!t.timely||!i.options.timely)&&H(e,"notimely",!0),W(t.target)&&H(e,$,t.target),W(t.tip)&&H(e,A,t.tip),i.fields[r]=i._parseRule(t)))},_parseRule:function(i){var r,n=S.exec(i.rule);if(n)return i.display=n[1],i.rules=[],r=(n[2]||"").split(";"),e.map(r,function(r){var n=C.exec(r);return n?(n[3]&&(n[2]=n[3]),i.rules.push({method:n[1],params:n[2]?e.trim(n[2]).split(", "):t}),t):null}),i.vid=0,i.rid=i.rules[0].method,i},_validatedField:function(t,i,r){var n=this,s=n.options,a=t.target,l=r.isValid=i.isValid=!!r.isValid,u=l?"valid":"invalid";r.key=i.key,r.rule=i.rid,l?r.type="ok":(n.submiting&&(n.errors[i.key]=r.msg),n.isValid=!1),i.old.value=a.value,i.old.id=a.id,n.elements[i.key]=a,n.checkOnly||(I(i[u])&&i[u].call(n,a,r),e(a).attr(O,l?null:!0).removeClass(l?_:k).addClass(r.skip?"":l?k:_).trigger(u+".field",[r,n]),(i.msgMaker||s.msgMaker)&&(!r.showOk&&r.msg||r.showOk&&s.showOk!==!1?n.showMsg(a,r,i):n.hideMsg(a,r,i)))},_validatedRule:function(i,r,n,s){var a,l=this,u=l.options,o=i.target,c="",f=!1,g=!1;if(s=s||{},r=r||l.getField(o),a=r.rid,null===n)return e(o).trigger("validated.field",[r,{isValid:!0,skip:!0}]),t;if(n===!0||n===t?f=!0:(c=d(o,r,a),c||(W(n)?(c=n,n={error:c}):U(n)&&(n.error?c=n.error:(f=!0,n.ok&&W(n.ok)&&(g=!0),c=n.ok))),s.msg=(f?c:c||l.messages[a]||X.defaultMsg).replace("{0}",r.display||"")),u.debug&&B.log("   "+r.vid+": "+a+" => "+(s.msg||!0)),f){if(s.isValid=!0,!g){var h=r.ok||H(o,"data-ok");h?(g=!0,s.msg=h):W(u.showOk)&&(g=!0,s.msg=u.showOk)}s.showOk=g,e(o).trigger("valid.rule",[a,s.msg])}else e(o).trigger("invalid.rule",[a,s.msg]);f&&r.vid<r.rules.length-1?(r.vid++,l._checkRule(o,r)):(r.vid=0,e(o).trigger("validated.field",[r,s]))},_checkRule:function(i,r){var n,s,a=this,l=r.key,u=r.rules[r.vid],d=u.method,c=u.params;if(!a.submiting||!a.deferred[l])if(s=r.old,r.rid=d,n=!r.must&&s.ret!==t&&s.rule===u&&s.id===i.id&&i.value&&s.value===i.value?s.ret:(o(i,d)||a.rules[d]||function(){return!0}).call(a,i,c,r),U(n)&&I(n.then)){var f=function(e){return W(e)||U(e)&&("error"in e||"ok"in e)?e:t};a.deferred[l]=n,!a.checkOnly&&a.showMsg(i,{type:"loading",msg:a.options.loadingMsg},r),n.then(function(n,l,o){var d,c=o.responseText,g=r.dataFilter||a.options.dataFilter;"json"===this.dataType?c=n:"{"===c.charAt(0)&&(c=e.parseJSON(c)||{}),I(g)?c=g(c):""===c?c=!0:(d=f(c),d===t&&(d=f(c.data)),c=d||!0),s.rule=u,s.ret=c,e(i).trigger("validated.rule",[r,c])},function(t,n){e(i).trigger("validated.rule",[r,n])}),r.isValid=t}else e(i).trigger("validated.rule",[r,n])},_validate:function(i,r){if(!i.disabled&&null===H(i,F)){r.rules||this._parse(i);var n,s=this,a=s.options,l=e(i),u={},o=r.group,d=r.isValid=!0;if(a.debug&&B.info(r.key),o&&(n=o.call(s),n===!0||n===t?n=t:(W(n)&&(n={error:n}),r.vid=0,r.rid="group",d=!1,s.hideMsg(i,{},r),e.extend(u,o))),d&&!r.required&&!r.must&&!i.value){if("tip"===H(i,T))return;if(!f(i))return l.trigger("validated.field",[r,{isValid:!0}]),t}n!==t?l.trigger("validated.rule",[r,n,u]):r.rule&&s._checkRule(i,r)}},_getMsgOpt:function(t){return e.extend({},this.msgOpt,W(t)?{msg:t}:t)},getField:function(e){var t,i=this;return t=e.id&&"#"+e.id in i.fields||!e.name?"#"+e.id:e.name,H(e,x)&&i._parse(e),i.fields[t]},test:function(i,r){var n,s,a,l=this,u=C.exec(r);return u?(u[3]&&(u[2]=u[3]),s=u[1],a=u[2]?e.trim(u[2]).split(", "):t,s in l.rules&&(n=l.rules[s].call(l,i,a)),n===!0||n===t||null===n||!1):!0},getRangeMsg:function(e,t,i,r){if(t){var n=this,s=n.messages[i]||"",a=t[0].split("~"),l=a[0],u=a[1],o="rg",d=[""],c=+e===+e;if(2===a.length){if(l&&u){if(c&&e>=+l&&+u>=e)return!0;d=d.concat(a)}else if(l&&!u){if(c&&e>=+l)return!0;d.push(l),o="gt"}else if(!l&&u){if(c&&+u>=e)return!0;d.push(u),o="lt"}}else{if(e===+l)return!0;d.push(l),o="eq"}return s&&(r&&s[o+r]&&(o+=r),d[0]=s[o]),n.renderMsg.apply(null,d)}},renderMsg:function(){var e=arguments,t=e[0],i=e.length;if(t){for(;--i;)t=t.replace("{"+i+"}",e[i]);return t}},_getMsgDOM:function(t,i){var r,n,s,a=e(t);if(a.is(":input")?(s=i.target||H(t,$),s&&(s=this.$el.find(s),s.length&&(s.is(":input")?t=s.get(0):r=s)),r||(n=!f(t)&&t.id?t.id:t.name,r=this.$el.find(i.wrapper+"."+w+'[for="'+n+'"]'))):r=a,!r.length)if(a=this.$el.find(s||t),r=e("<"+i.wrapper+">").attr({"class":w+(i.cls?" "+i.cls:""),style:i.style||"","for":n}),f(t)){var l=a.parent();r.appendTo(l.is("label")?l.parent():l)}else r[i.pos&&"right"!==i.pos?"insertBefore":"insertAfter"](a);return r},showMsg:function(t,i,r){if(i=this._getMsgOpt(i),i.msg||i.showOk){t=e(t).get(0),e(t).is(V)&&(H(t,T,i.type),r=r||this.getField(t),r&&(r.msgStyle&&(i.style=r.msgStyle),r.msgClass&&(i.cls=r.msgClass),r.msgWrapper&&(i.wrapper=r.msgWrapper)));var n=this._getMsgDOM(t,i),s=n[0].className;!E.test(s)&&n.addClass(i.cls),P&&"bottom"===i.pos&&(n[0].style.marginTop=e(t).outerHeight()+"px"),n.html(((r||{}).msgMaker||this.options.msgMaker).call(this,i)),n[0].style.display="",I(i.show)&&i.show.call(this,n,i.type)}},hideMsg:function(t,i,r){t=e(t).get(0),i=this._getMsgOpt(i),e(t).is(V)&&(H(t,T,null),H(t,O,null),r=r||this.getField(t),r&&r.msgWrapper&&(i.wrapper=r.msgWrapper));var n=this._getMsgDOM(t,i);n.length&&(I(i.hide)?i.hide.call(this,n,i.type):n[0].style.display="none")},mapMsg:function(t){var i=this;e.each(t,function(e,t){var r=i.elements[e]||i.$el.find(':input[name="'+e+'"]')[0];i.showMsg(r,t)})},setMsg:function(e){new n(e,this.messages)},setRule:function(t){new r(t,this.rules),e.map(this.fields,function(e){e.old={}})},setField:function(e,t){var i={};W(e)?i[e]=t:U(e)&&(i=e),this._initFields(i)},holdSubmit:function(e){e===t&&(e=!0),this.submiting=e},cleanUp:function(){this._reset(!0)},destroy:function(){this._reset(!0),this.$el.off("."+p).removeData(p),H(this.$el[0],F,this.NOVALIDATE)}},e(document).on("focusin",":input["+x+"]",function(){u(this,"focusin")}).on("click","input,button",function(){if(this.form)if("submit"===this.type)null!==H(this,F)&&(h=!0);else if(this.name&&f(this)){var e=this.form.elements[this.name];e.length&&(e=e[0]),H(e,x)&&u(e,"validate")}}).on("submit validate","form",function(t){if(null===H(this,F)){var i,r=e(this);r.data(p)||(i=r[p]().data(p),e.isEmptyObject(i.fields)?(H(this,F,F),r.off("."+p).removeData(p)):i._submit(t))}}),new r({required:function(t,i){var r=e.trim(t.value),n=!0;if(i)if(1===i.length){if(!r&&!this.test(t,i[0]))return H(t,M,null),null;H(t,M,!0)}else"not"===i[0]&&e.map(i.slice(1),function(t){r===e.trim(t)&&(n=!1)});return n&&!!r},integer:function(e,t){var i,r="0|",n="[1-9]\\d*",s=t?t[0]:"*";switch(s){case"+":i=n;break;case"-":i="-"+n;break;case"+0":i=r+n;break;case"-0":i=r+"-"+n;break;default:i=r+"-?"+n}return i="^(?:"+i+")$",RegExp(i).test(e.value)||this.messages.integer[s]},match:function(t,i,r){if(i){var n,s,a,l,u,o,d,c="eq";if(1===i.length?a=i[0]:(c=i[0],a=i[1]),u="#"===a.charAt(0)?a:':input[name="'+a+'"]',o=this.$el.find(u)[0]){if(d=this.getField(o),n=t.value,s=o.value,r.init_match||(this.$el.on("valid.field."+p,u,function(){e(t).trigger("validate")}),r.init_match=d.init_match=1),!r.required&&""===n&&""===s)return null;if(i[2]&&("date"===i[2]?(n=g(n),s=g(s)):"time"===i[2]&&(n=+n.replace(":",""),s=+s.replace(":",""))),"eq"!==c&&!isNaN(+n)&&isNaN(+s))return!0;switch(l=this.messages.match[c].replace("{1}",d.display||a),c){case"lt":return+s>+n||l;case"lte":return+s>=+n||l;case"gte":return+n>=+s||l;case"gt":return+n>+s||l;case"neq":return n!==s||l;default:return n===s||l}}}},range:function(e,t){return this.getRangeMsg(+e.value,t,"range")},checked:function(t,i,r){if(f(t)){var n,s;return s=this.$el.find('input[name="'+t.name+'"]').filter(function(){return!n&&f(this)&&(n=this),!this.disabled&&this.checked&&e(this).is(":visible")}).length,i?this.getRangeMsg(s,i,"checked"):!!s||d(n,r,"checked")||this.messages.required}},length:function(e,t){var i=e.value,r=(t[1]?i.replace(R,"xx"):i).length;return t&&"~"===t[0].charAt(0)&&(t[0]="0"+t[0]),this.getRangeMsg(r,t,"length",t[1]?"_2":"")},remote:function(t,i){if(i){var r,n=this,s=N.exec(i[0]),a=s[2],l=(s[1]||"POST").toUpperCase(),u={};return u[t.name]=t.value,i[1]&&e.map(i.slice(1),function(t){u[e.trim(t)]=n.$el.find(':input[name="'+t+'"]').val()}),u=e.param(u),"POST"===l&&(r=a.indexOf("?"),-1!==r&&(u+="&"+a.substring(r+1,a.length),a=a.substring(0,r))),e.ajax({url:a,type:l,data:u,async:!0,cache:!1})}},filter:function(e,t){e.value=e.value.replace(t?RegExp("["+t[0]+"]","g"):j,"")}}),i.config=function(t){e.each(t,function(e,t){"rules"===e?new r(t):"messages"===e?new n(t):X[e]=t})},i.setTheme=function(t,i){U(t)?e.each(t,function(e,t){J[e]=t}):W(t)&&U(i)&&(J[t]=i)},e[p]=i}(jQuery);

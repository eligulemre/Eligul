// input mask kütüphane
var $jscomp={scope:{},findInternal:function(t,a,e){t instanceof String&&(t=String(t));for(var n=t.length,s=0;s<n;s++){var r=t[s];if(a.call(e,r,s,t))return{i:s,v:r}}return{i:-1,v:void 0}}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(t,a,e){if(e.get||e.set)throw new TypeError("ES3 does not support getters and setters.");t!=Array.prototype&&t!=Object.prototype&&(t[a]=e.value)},$jscomp.getGlobal=function(t){return"undefined"!=typeof window&&window===t?t:"undefined"!=typeof global&&null!=global?global:t},$jscomp.global=$jscomp.getGlobal(this),$jscomp.polyfill=function(t,a,e,n){if(a){for(e=$jscomp.global,t=t.split("."),n=0;n<t.length-1;n++){var s=t[n];s in e||(e[s]={}),e=e[s]}(a=a(n=e[t=t[t.length-1]]))!=n&&null!=a&&$jscomp.defineProperty(e,t,{configurable:!0,writable:!0,value:a})}},$jscomp.polyfill("Array.prototype.find",function(t){return t||function(t,a){return $jscomp.findInternal(this,t,a).v}},"es6-impl","es3"),function(t,a,e){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):t(a||e)}(function(t){var a=function(a,e,n){var s={invalid:[],getCaret:function(){try{var t,e=0,n=a.get(0),r=document.selection,o=n.selectionStart;return r&&-1===navigator.appVersion.indexOf("MSIE 10")?((t=r.createRange()).moveStart("character",-s.val().length),e=t.text.length):(o||"0"===o)&&(e=o),e}catch(t){}},setCaret:function(t){try{if(a.is(":focus")){var e,n=a.get(0);n.setSelectionRange?n.setSelectionRange(t,t):((e=n.createTextRange()).collapse(!0),e.moveEnd("character",t),e.moveStart("character",t),e.select())}}catch(t){}},events:function(){a.on("keydown.mask",function(t){a.data("mask-keycode",t.keyCode||t.which),a.data("mask-previus-value",a.val()),a.data("mask-previus-caret-pos",s.getCaret()),s.maskDigitPosMapOld=s.maskDigitPosMap}).on(t.jMaskGlobals.useInput?"input.mask":"keyup.mask",s.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){a.keydown().keyup()},100)}).on("change.mask",function(){a.data("changed",!0)}).on("blur.mask",function(){i===s.val()||a.data("changed")||a.trigger("change"),a.data("changed",!1)}).on("blur.mask",function(){i=s.val()}).on("focus.mask",function(a){!0===n.selectOnFocus&&t(a.target).select()}).on("focusout.mask",function(){n.clearIfNotMatch&&!r.test(s.val())&&s.val("")})},getRegexMask:function(){for(var t,a,n,s,r=[],i=0;i<e.length;i++)(t=o.translation[e.charAt(i)])?(a=t.pattern.toString().replace(/.{1}$|^.{1}/g,""),n=t.optional,(t=t.recursive)?(r.push(e.charAt(i)),s={digit:e.charAt(i),pattern:a}):r.push(n||t?a+"?":a)):r.push(e.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));return r=r.join(""),s&&(r=r.replace(new RegExp("("+s.digit+"(.*"+s.digit+")?)"),"($1)?").replace(new RegExp(s.digit,"g"),s.pattern)),new RegExp(r)},destroyEvents:function(){a.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(t){var e=a.is("input")?"val":"text";return 0<arguments.length?(a[e]()!==t&&a[e](t),e=a):e=a[e](),e},calculateCaretPosition:function(){var t=a.data("mask-previus-value")||"",e=s.getMasked(),n=s.getCaret();if(t!==e){var r,o=a.data("mask-previus-caret-pos")||0,i=(e=e.length,t.length),l=t=0,c=0,u=0;for(r=n;r<e&&s.maskDigitPosMap[r];r++)l++;for(r=n-1;0<=r&&s.maskDigitPosMap[r];r--)t++;for(r=n-1;0<=r;r--)s.maskDigitPosMap[r]&&c++;for(r=o-1;0<=r;r--)s.maskDigitPosMapOld[r]&&u++;n>i?n=10*e:o>=n&&o!==i?s.maskDigitPosMapOld[n]||(o=n,n=n-(u-c)-t,s.maskDigitPosMap[n]&&(n=o)):n>o&&(n=n+(c-u)+l)}return n},behaviour:function(e){e=e||window.event,s.invalid=[];var n=a.data("mask-keycode");if(-1===t.inArray(n,o.byPassKeys)){n=s.getMasked();var r=s.getCaret();return setTimeout(function(){s.setCaret(s.calculateCaretPosition())},t.jMaskGlobals.keyStrokeCompensation),s.val(n),s.setCaret(r),s.callbacks(e)}},getMasked:function(t,a){var r,i,l,c=[],u=void 0===a?s.val():a+"",p=0,f=e.length,d=0,k=u.length,h=1,v="push",g=-1,m=0,y=[];for(n.reverse?(v="unshift",h=-1,r=0,p=f-1,d=k-1,i=function(){return-1<p&&-1<d}):(r=f-1,i=function(){return p<f&&d<k});i();){var M=e.charAt(p),b=u.charAt(d),j=o.translation[M];j?(b.match(j.pattern)?(c[v](b),j.recursive&&(-1===g?g=p:p===r&&p!==g&&(p=g-h),r===g&&(p-=h)),p+=h):b===l?(m--,l=void 0):j.optional?(p+=h,d-=h):j.fallback?(c[v](j.fallback),p+=h,d-=h):s.invalid.push({p:d,v:b,e:j.pattern}),d+=h):(t||c[v](M),b===M?(y.push(d),d+=h):(l=M,y.push(d+m),m++),p+=h)}return u=e.charAt(r),f!==k+1||o.translation[u]||c.push(u),c=c.join(""),s.mapMaskdigitPositions(c,y,k),c},mapMaskdigitPositions:function(t,a,e){for(t=n.reverse?t.length-e:0,s.maskDigitPosMap={},e=0;e<a.length;e++)s.maskDigitPosMap[a[e]+t]=1},callbacks:function(t){var r=s.val(),o=r!==i,l=[r,t,a,n],c=function(t,a,e){"function"==typeof n[t]&&a&&n[t].apply(this,e)};c("onChange",!0===o,l),c("onKeyPress",!0===o,l),c("onComplete",r.length===e.length,l),c("onInvalid",0<s.invalid.length,[r,t,a,s.invalid,n])}};a=t(a);var r,o=this,i=s.val();e="function"==typeof e?e(s.val(),void 0,a,n):e,o.mask=e,o.options=n,o.remove=function(){var t=s.getCaret();return o.options.placeholder&&a.removeAttr("placeholder"),a.data("mask-maxlength")&&a.removeAttr("maxlength"),s.destroyEvents(),s.val(o.getCleanVal()),s.setCaret(t),a},o.getCleanVal=function(){return s.getMasked(!0)},o.getMaskedVal=function(t){return s.getMasked(!1,t)},o.init=function(i){if(i=i||!1,n=n||{},o.clearIfNotMatch=t.jMaskGlobals.clearIfNotMatch,o.byPassKeys=t.jMaskGlobals.byPassKeys,o.translation=t.extend({},t.jMaskGlobals.translation,n.translation),o=t.extend(!0,{},o,n),r=s.getRegexMask(),i)s.events(),s.val(s.getMasked());else{n.placeholder&&a.attr("placeholder",n.placeholder),a.data("mask")&&a.attr("autocomplete","off"),i=0;for(var l=!0;i<e.length;i++){var c=o.translation[e.charAt(i)];if(c&&c.recursive){l=!1;break}}l&&a.attr("maxlength",e.length).data("mask-maxlength",!0),s.destroyEvents(),s.events(),i=s.getCaret(),s.val(s.getMasked()),s.setCaret(i)}},o.init(!a.is("input"))};t.maskWatchers={};var e=function(){var e=t(this),s={},r=e.attr("data-mask");if(e.attr("data-mask-reverse")&&(s.reverse=!0),e.attr("data-mask-clearifnotmatch")&&(s.clearIfNotMatch=!0),"true"===e.attr("data-mask-selectonfocus")&&(s.selectOnFocus=!0),n(e,r,s))return e.data("mask",new a(this,r,s))},n=function(a,e,n){n=n||{};var s=t(a).data("mask"),r=JSON.stringify;a=t(a).val()||t(a).text();try{return"function"==typeof e&&(e=e(a)),"object"!=typeof s||r(s.options)!==r(n)||s.mask!==e}catch(t){}},s=function(t){var a,e=document.createElement("div");return(a=(t="on"+t)in e)||(e.setAttribute(t,"return;"),a="function"==typeof e[t]),a};t.fn.mask=function(e,s){s=s||{};var r=this.selector,o=(i=t.jMaskGlobals).watchInterval,i=s.watchInputs||i.watchInputs,l=function(){if(n(this,e,s))return t(this).data("mask",new a(this,e,s))};return t(this).each(l),r&&""!==r&&i&&(clearInterval(t.maskWatchers[r]),t.maskWatchers[r]=setInterval(function(){t(document).find(r).each(l)},o)),this},t.fn.masked=function(t){return this.data("mask").getMaskedVal(t)},t.fn.unmask=function(){return clearInterval(t.maskWatchers[this.selector]),delete t.maskWatchers[this.selector],this.each(function(){var a=t(this).data("mask");a&&a.remove().removeData("mask")})},t.fn.cleanVal=function(){return this.data("mask").getCleanVal()},t.applyDataMask=function(a){((a=a||t.jMaskGlobals.maskElements)instanceof t?a:t(a)).filter(t.jMaskGlobals.dataMaskAttr).each(e)},s={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,keyStrokeCompensation:10,useInput:!/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent)&&s("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}},t.jMaskGlobals=t.jMaskGlobals||{},(s=t.jMaskGlobals=t.extend(!0,{},s,t.jMaskGlobals)).dataMask&&t.applyDataMask(),setInterval(function(){t.jMaskGlobals.watchDataMask&&t.applyDataMask()},s.watchInterval)},window.jQuery,window.Zepto);

var hypeExitIntent = function(hypeOptions) {
  hypeWidth = hypeOptions.width || "600";
  hypeBackground = hypeOptions.background || "none";
  hypeHtml = hypeOptions.html || "";
  hypeCss = hypeOptions.css || "";
  window.bioEp = {
  	// Private variables
  	bgEl: {},
  	popupEl: {},
  	closeBtnEl: {},
  	shown: false,
  	overflowDefault: "visible",
  	transformDefault: "",

  	// Popup options
  	width: hypeWidth,
  	// height: auto,
  	html: "",
  	css: "",
  	fonts: [],
  	delay: 1,
  	showOnDelay: false,
  	cookieExp: 30,
  	showOncePerSession: false,
  	onPopup: null,

  	// Object for handling cookies, taken from QuirksMode
  	// http://www.quirksmode.org/js/cookies.html
  	cookieManager: {
  		// Create a cookie
  		create: function(name, value, days, sessionOnly) {
  			var expires = "";

  			if(sessionOnly)
  				expires = "; expires=0"
  			else if(days) {
  				var date = new Date();
  				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  				expires = "; expires=" + date.toGMTString();
  			}

  			document.cookie = name + "=" + value + expires + "; path=/";
  		},

  		// Get the value of a cookie
  		get: function(name) {
  			var nameEQ = name + "=";
  			var ca = document.cookie.split(";");

  			for(var i = 0; i < ca.length; i++) {
  				var c = ca[i];
  				while (c.charAt(0) == " ") c = c.substring(1, c.length);
  				if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  			}

  			return null;
  		},

  		// Delete a cookie
  		erase: function(name) {
  			this.create(name, "", -1);
  		}
  	},

  	// Handle the bioep_shown cookie
  	// If present and true, return true
  	// If not present or false, create and return false
  	checkCookie: function() {
  		// Handle cookie reset
  		if(this.cookieExp <= 0) {
  			// Handle showing pop up once per browser session.
  			if(this.showOncePerSession && this.cookieManager.get("bioep_shown_session") == "true")
  				return true;

  			this.cookieManager.erase("bioep_shown");
  			return false;
  		}

  		// If cookie is set to true
  		if(this.cookieManager.get("bioep_shown") == "true")
  			return true;

  		return false;
  	},

  	// Add font stylesheets and CSS for the popup
  	addCSS: function() {
  		// Add font stylesheets
  		for(var i = 0; i < this.fonts.length; i++) {
  			var font = document.createElement("link");
  			font.href = this.fonts[i];
  			font.type = "text/css";
  			font.rel = "stylesheet";
  			document.head.appendChild(font);
  		}

  		// Base CSS styles for the popup
  		var css = document.createTextNode(
  			"#bio_ep_bg {display: none; cursor:pointer; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #000; opacity: 0.85; z-index: 10001;}" +
  			"#bio_ep {display: none; position: fixed; width: " + this.width + "px; height: " + this.height + "px; font-family: 'Titillium Web', sans-serif; font-size: 16px; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%); -webkit-transform: translateX(-50%) translateY(-50%); -ms-transform: translateX(-50%) translateY(-50%); background-color: none; z-index: 10002;}" +
  			"#bio_ep_close {position: absolute; top: 0; right: 0; margin:0; width: 35px; height: 35px; color: #fff; font-size: 12px; font-weight: bold; text-align: center; cursor: pointer; transform: scale(1.1); -webkit-transform: scale(1.1); background: url(//useruploads.visualwebsiteoptimizer.com/useruploads/328336/images/387f05df829850eccf01cb159bd4568c_exit.png) no-repeat; background-size: 35px; z-index: 9;}" +
  			this.css
  		);

  		// Create the style element
  		var style = document.createElement("style");
  		style.type = "text/css";
  		style.appendChild(css);

  		// Insert it before other existing style
  		// elements so user CSS isn't overwritten
  		document.head.insertBefore(style, document.getElementsByTagName("style")[0]);
  	},

  	// Add the popup to the page
  	addPopup: function() {
  		// Add the background div
  		this.bgEl = document.createElement("div");
  		this.bgEl.id = "bio_ep_bg";
  		document.body.appendChild(this.bgEl);

  		// Add the popup
  		if(document.getElementById("bio_ep"))
  			this.popupEl = document.getElementById("bio_ep");
  		else {
  			this.popupEl = document.createElement("div");
  			this.popupEl.id = "bio_ep";
  			this.popupEl.innerHTML = this.html;
  			document.body.appendChild(this.popupEl);
  		}

  		// Add the close button
  		if(document.getElementById("bio_ep_close"))
  			this.closeBtnEl = document.getElementById("bio_ep_close");
  		else {
  			this.closeBtnEl = document.createElement("div");
  			this.closeBtnEl.id = "bio_ep_close";
  			this.closeBtnEl.appendChild(document.createTextNode(""));
  			this.popupEl.insertBefore(this.closeBtnEl, this.popupEl.firstChild);
  		}
  	},

  	// Show the popup
  	showPopup: function() {
  			if(this.shown) return;

  			this.bgEl.style.display = "block";
  			this.popupEl.style.display = "block";

  			// Handle scaling
  			this.scalePopup();

  			// Save body overflow value and hide scrollbars
  			this.overflowDefault = document.body.style.overflow;
  			document.body.style.overflow = "hidden";

  			this.shown = true;

  			this.cookieManager.create("bioep_shown", "true", this.cookieExp, false);
  			this.cookieManager.create("bioep_shown_session", "true", 0, true);

  			if(typeof this.onPopup === "function") {
  				this.onPopup();
  			}

  	},

  	// Hide the popup
  	hidePopup: function() {
  		this.bgEl.style.display = "none";
  		this.popupEl.style.display = "none";

  		// Set body overflow back to default to show scrollbars
  		document.body.style.overflow = this.overflowDefault;
  	},

  	// Handle scaling the popup
  	scalePopup: function() {
  		var margins = { width: 40, height: 40 };
  		var popupSize = { width: bioEp.popupEl.offsetWidth, height: bioEp.popupEl.offsetHeight };
  		var windowSize = { width: window.innerWidth, height: window.innerHeight };
  		var newSize = { width: 0, height: 0 };
  		var aspectRatio = popupSize.width / popupSize.height;

  		// First go by width, if the popup is larger than the window, scale it
  		if(popupSize.width > (windowSize.width - margins.width)) {
  			newSize.width = windowSize.width - margins.width;
  			newSize.height = newSize.width / aspectRatio;

  			// If the height is still too big, scale again
  			if(newSize.height > (windowSize.height - margins.height)) {
  				newSize.height = windowSize.height - margins.height;
  				newSize.width = newSize.height * aspectRatio;
  			}
  		}

  		// If width is fine, check for height
  		if(newSize.height === 0) {
  			if(popupSize.height > (windowSize.height - margins.height)) {
  				newSize.height = windowSize.height - margins.height;
  				newSize.width = newSize.height * aspectRatio;
  			}
  		}

  		// Set the scale amount
  		var scaleTo = newSize.width / popupSize.width;

  		// If the scale ratio is 0 or is going to enlarge (over 1) set it to 1
  		if(scaleTo <= 0 || scaleTo > 1) scaleTo = 1;

  		// Save current transform style
  		if(this.transformDefault === "")
  			this.transformDefault = window.getComputedStyle(this.popupEl, null).getPropertyValue("transform");

  		// Apply the scale transformation
  		this.popupEl.style.transform = this.transformDefault + " scale(" + scaleTo + ")";
  	},

  	// Event listener initialisation for all browsers
  	addEvent: function (obj, event, callback) {
  		if(obj.addEventListener)
  			obj.addEventListener(event, callback, false);
  		else if(obj.attachEvent)
  			obj.attachEvent("on" + event, callback);
  	},

  	// Load event listeners for the popup
  	loadEvents: function() {
  		// Track mouseout event on document
  		this.addEvent(document, "mouseout", function(e) {
  			e = e ? e : window.event;

  			// If this is an autocomplete element.
  			if(e.target.tagName.toLowerCase() == "input")
  				return;

  			// Get the current viewport width.
  			var vpWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  			// If the current mouse X position is within 50px of the right edge
  			// of the viewport, return.
  			if(e.clientX >= (vpWidth - 50))
  				return;

  			// If the current mouse Y position is not within 50px of the top
  			// edge of the viewport, return.
  			if(e.clientY >= 50)
  				return;

  			// Reliable, works on mouse exiting window and
  			// user switching active program
  			var from = e.relatedTarget || e.toElement;
  			if(!from)
  				bioEp.showPopup();
  		}.bind(this));

  		// Handle the popup close button
  		this.addEvent(this.closeBtnEl, "click", function() {
  			bioEp.hidePopup();
  		});

  		// Handle window resizing
  		this.addEvent(window, "resize", function() {
  			bioEp.scalePopup();
  		});
  	},

  	// Set user defined options for the popup
  	setOptions: function(opts) {
  		this.width = (typeof opts.width === 'undefined') ? this.width : opts.width;
  		this.height = (typeof opts.height === 'undefined') ? this.height : opts.height;
  		this.html = (typeof opts.html === 'undefined') ? this.html : opts.html;
  		this.css = (typeof opts.css === 'undefined') ? this.css : opts.css;
  		this.fonts = (typeof opts.fonts === 'undefined') ? this.fonts : opts.fonts;
  		this.delay = (typeof opts.delay === 'undefined') ? this.delay : opts.delay;
  		this.showOnDelay = (typeof opts.showOnDelay === 'undefined') ? this.showOnDelay : opts.showOnDelay;
  		this.cookieExp = (typeof opts.cookieExp === 'undefined') ? this.cookieExp : opts.cookieExp;
  		this.showOncePerSession = (typeof opts.showOncePerSession === 'undefined') ? this.showOncePerSession : opts.showOncePerSession;
  		this.onPopup = (typeof opts.onPopup === 'undefined') ? this.onPopup : opts.onPopup;
  	},

  	// Ensure the DOM has loaded
  	domReady: function(callback) {
  		(document.readyState === "interactive" || document.readyState === "complete") ? callback() : this.addEvent(document, "DOMContentLoaded", callback);
  	},

  	// Initialize
  	init: function(opts) {
  		// Handle options
  		if(typeof opts !== 'undefined')
  			this.setOptions(opts);

  		// Add CSS here to make sure user HTML is hidden regardless of cookie
  		this.addCSS();

  		// Once the DOM has fully loaded
  		this.domReady(function() {
  			// Handle the cookie
  			if(bioEp.checkCookie()) return;

  			// Add the popup
  			bioEp.addPopup();

  			// Load events
  			setTimeout(function() {
  				bioEp.loadEvents();

  				if(bioEp.showOnDelay)
  					bioEp.showPopup();
  			}, bioEp.delay * 1000);
  		});
  	}
  }

  bioEp.init({
  		 html: '<div id="bio_ep_content">' + hypeHtml +'</div>',
  		 css: hypeCss,
  		 cookieExp: 1
   });

   $("#bio_ep_bg").click(function(){
   	$("#bio_ep").fadeOut(400);
   	$("#bio_ep_bg").fadeOut(400);
   });
}







//

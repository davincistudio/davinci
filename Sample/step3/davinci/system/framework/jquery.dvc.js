/******************************************
 * DaVinci UI Framework
 * 
 * js Revision : 1017
 * 
 ******************************************/

/*
 * Copyright (c) 2012 Incross co., LTD. http://www.davincisdk.com/
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
*/
(function( $, undefined ) {

$(document).bind("mobileinit", function() {
	console.log("mobileinit - in");
	
	if(typeof device !== "undefined") {
		$.mobile.autoInitializePage = false;
	}
	
	document.addEventListener("deviceready", function() {
		console.log("called deviceready");
		$.mobile.initializePage();
		
		$.davinci.deviceReady = true;
	});
	
	document.addEventListener("back", function() {
		if($.davinci.deviceReady) {
			// body 바로 밑에 있는 page의 .ui-page-active를 찾는다.
			var $ap = $("body>.ui-page-active");
			var pageid = $ap[0].id;

			$._fnCallPageEvent(pageid, "ev_back");
		}
	});
	
	var mobileDevice = window.navigator.userAgent.toLowerCase().match(/iphone|ipad|ipod|android/);
	var desktop = false;
	if(!mobileDevice) {
		desktop = window.navigator.userAgent.toLowerCase().match(/win|linux|mac/);
	}
	
	if(desktop) {
		$(window).bind("resize", function() {
			var mode = $.event.special.orientationchange.orientation();
			
			// body 바로 밑에 있는 page의 .ui-page-active를 찾는다.
			var $ap = $("body>.ui-page-active");
			var pageid = $ap[0].id;

			$._fnCallPageEvent(pageid, "ev_orientationchange", [mode]);
		});
	}
	else {
		$(window).bind("orientationchange", function() {
			if($.davinci.deviceReady) {
				var mode = $.event.special.orientationchange.orientation();
				
				// body 바로 밑에 있는 page의 .ui-page-active를 찾는다.
				var $ap = $("body>.ui-page-active");
				var pageid = $ap[0].id;
	
				$._fnCallPageEvent(pageid, "ev_orientationchange", [mode]);
			}
		});
	}
	
	document.addEventListener("notification", function() {
		if($.davinci.deviceReady) {
			var $firstPage = $(".ui-page:first");
			var pageid = $firstPage[0].id;
			var param = device.system.event.getParameter("notification");
			
			$._fnCallPageEvent(pageid, "ev_onnotification", [param]);
		}
	});

	document.addEventListener("push", function() {
		if($.davinci.deviceReady) {
			var $firstPage = $(".ui-page:first");
			var pageid = $firstPage[0].id;
			var param = device.system.event.getParameter("push");
			$._fnCallPageEvent(pageid, "ev_onpush", [param]);
		}
	});
	
	console.log("mobileinit - out");	
});

})( jQuery );
/*
* jQuery Mobile Framework 1.0
* http://jquerymobile.com
*
* Copyright 2011 (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
*/
/*!
 * jQuery UI Widget @VERSION
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */

(function( $, undefined ) {

// jQuery 1.4+
if ( $.cleanData ) {
	var _cleanData = $.cleanData;
	$.cleanData = function( elems ) {
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			$( elem ).triggerHandler( "remove" );
		}
		_cleanData( elems );
	};
} else {
	var _remove = $.fn.remove;
	$.fn.remove = function( selector, keepData ) {
		return this.each(function() {
			if ( !keepData ) {
				if ( !selector || $.filter( selector, [ this ] ).length ) {
					$( "*", this ).add( [ this ] ).each(function() {
						$( this ).triggerHandler( "remove" );
					});
				}
			}
			return _remove.call( $(this), selector, keepData );
		});
	};
}

$.widget = function( name, base, prototype ) {
	var namespace = name.split( "." )[ 0 ],
		fullName;
	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName ] = function( elem ) {
		return !!$.data( elem, name );
	};

	$[ namespace ] = $[ namespace ] || {};
	$[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without initializing for simple inheritance
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};

	var basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
//	$.each( basePrototype, function( key, val ) {
//		if ( $.isPlainObject(val) ) {
//			basePrototype[ key ] = $.extend( {}, val );
//		}
//	});
	basePrototype.options = $.extend( true, {}, basePrototype.options );
	$[ namespace ][ name ].prototype = $.extend( true, basePrototype, {
		namespace: namespace,
		widgetName: name,
		widgetEventPrefix: $[ namespace ][ name ].prototype.widgetEventPrefix || name,
		widgetBaseClass: fullName
	}, prototype );

	$.widget.bridge( name, $[ namespace ][ name ] );
};

$.widget.bridge = function( name, object ) {
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = Array.prototype.slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.extend.apply( null, [ true, options ].concat(args) ) :
			options;

		// prevent calls to internal methods
		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}

		if ( isMethodCall ) {
			this.each(function() {
				var instance = $.data( this, name );
				if ( !instance ) {
					throw "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'";
				}
				if ( !$.isFunction( instance[options] ) ) {
					throw "no such method '" + options + "' for " + name + " widget instance";
				}
				var methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, name );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, name, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( options, element ) {
	// allow instantiation without initializing for simple inheritance
	if ( arguments.length ) {
		this._createWidget( options, element );
	}
};

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	options: {
		disabled: false
	},
	_createWidget: function( options, element ) {
		// $.widget.bridge stores the plugin instance, but we do it anyway
		// so that it's stored even before the _create function runs
		$.data( element, this.widgetName, this );
		this.element = $( element );
		this.options = $.extend( true, {},
			this.options,
			this._getCreateOptions(),
			options );

		var self = this;
		this.element.bind( "remove." + this.widgetName, function() {
			self.destroy();
		});

		this._create();
		this._trigger( "create" );
		this._init();
	},
	_getCreateOptions: function() {
		var options = {};
		if ( $.metadata ) {
			options = $.metadata.get( element )[ this.widgetName ];
		}
		return options;
	},
	_create: function() {},
	_init: function() {},

	destroy: function() {
		this.element
			.unbind( "." + this.widgetName )
			.removeData( this.widgetName );
		this.widget()
			.unbind( "." + this.widgetName )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetBaseClass + "-disabled " +
				"ui-state-disabled" );
	},

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.extend( {}, this.options );
		}

		if  (typeof key === "string" ) {
			if ( value === undefined ) {
				return this.options[ key ];
			}
			options = {};
			options[ key ] = value;
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var self = this;
		$.each( options, function( key, value ) {
			self._setOption( key, value );
		});

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				[ value ? "addClass" : "removeClass"](
					this.widgetBaseClass + "-disabled" + " " +
					"ui-state-disabled" )
				.attr( "aria-disabled", value );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_trigger: function( type, event, data ) {
		var callback = this.options[ type ];

		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		data = data || {};

		// copy original event properties over to the new event
		// this would happen if we could call $.event.fix instead of $.Event
		// but we don't have a way to force an event to be fixed multiple times
		if ( event.originalEvent ) {
			for ( var i = $.event.props.length, prop; i; ) {
				prop = $.event.props[ --i ];
				event[ prop ] = event.originalEvent[ prop ];
			}
		}

		this.element.trigger( event, data );

		return !( $.isFunction(callback) &&
			callback.call( this.element[0], event, data ) === false ||
			event.isDefaultPrevented() );
	}
};

})( jQuery );
/*
* widget factory extentions for mobile
*/

(function( $, undefined ) {

$.widget( "mobile.widget", {
	// decorate the parent _createWidget to trigger `widgetinit` for users
	// who wish to do post post `widgetcreate` alterations/additions
	//
	// TODO create a pull request for jquery ui to trigger this event
	// in the original _createWidget
	_createWidget: function() {
		$.Widget.prototype._createWidget.apply( this, arguments );
		this._trigger( 'init' );
	},

	_getCreateOptions: function() {

		var elem = this.element,
			options = {};

		$.each( this.options, function( option ) {

			var value = elem.jqmData( option.replace( /[A-Z]/g, function( c ) {
							return "-" + c.toLowerCase();
						})
					);

			if ( value !== undefined ) {
				options[ option ] = value;
			}
		});

		return options;
	},

	enhanceWithin: function( target ) {
		// TODO remove dependency on the page widget for the keepNative.
		// Currently the keepNative value is defined on the page prototype so
		// the method is as well
		var page = $(target).closest(":jqmData(role='page')").data( "page" ),
			keepNative = (page && page.keepNativeSelector()) || "";

		$( this.options.initSelector, target ).not( keepNative )[ this.widgetName ]();
	}
});

})( jQuery );
/*
* a workaround for window.matchMedia
*/

(function( $, undefined ) {

var $window = $( window ),
	$html = $( "html" );

/* $.mobile.media method: pass a CSS media type or query and get a bool return
	note: this feature relies on actual media query support for media queries, though types will work most anywhere
	examples:
		$.mobile.media('screen') //>> tests for screen media type
		$.mobile.media('screen and (min-width: 480px)') //>> tests for screen media type with window width > 480px
		$.mobile.media('@media screen and (-webkit-min-device-pixel-ratio: 2)') //>> tests for webkit 2x pixel ratio (iPhone 4)
*/
$.mobile.media = (function() {
	// TODO: use window.matchMedia once at least one UA implements it
	var cache = {},
		testDiv = $( "<div id='jquery-mediatest'>" ),
		fakeBody = $( "<body>" ).append( testDiv );

	return function( query ) {
		if ( !( query in cache ) ) {
			var styleBlock = document.createElement( "style" ),
				cssrule = "@media " + query + " { #jquery-mediatest { position:absolute; } }";

			//must set type for IE!
			styleBlock.type = "text/css";

			if ( styleBlock.styleSheet  ){
				styleBlock.styleSheet.cssText = cssrule;
			} else {
				styleBlock.appendChild( document.createTextNode(cssrule) );
			}

			$html.prepend( fakeBody ).prepend( styleBlock );
			cache[ query ] = testDiv.css( "position" ) === "absolute";
			fakeBody.add( styleBlock ).remove();
		}
		return cache[ query ];
	};
})();

})(jQuery);
/*
* support tests
*/

(function( $, undefined ) {

var fakeBody = $( "<body>" ).prependTo( "html" ),
	fbCSS = fakeBody[ 0 ].style,
	vendors = [ "Webkit", "Moz", "O" ],
	webos = "palmGetResource" in window, //only used to rule out scrollTop
	operamini = window.operamini && ({}).toString.call( window.operamini ) === "[object OperaMini]",
	bb = window.blackberry; //only used to rule out box shadow, as it's filled opaque on BB

// thx Modernizr
function propExists( prop ) {
	var uc_prop = prop.charAt( 0 ).toUpperCase() + prop.substr( 1 ),
		props = ( prop + " " + vendors.join( uc_prop + " " ) + uc_prop ).split( " " );

	for ( var v in props ){
		if ( fbCSS[ props[ v ] ] !== undefined ) {
			return true;
		}
	}
}

// Test for dynamic-updating base tag support ( allows us to avoid href,src attr rewriting )
function baseTagTest() {
	var fauxBase = location.protocol + "//" + location.host + location.pathname + "ui-dir/",
		base = $( "head base" ),
		fauxEle = null,
		href = "",
		link, rebase;

	if ( !base.length ) {
		base = fauxEle = $( "<base>", { "href": fauxBase }).appendTo( "head" );
	} else {
		href = base.attr( "href" );
	}

	link = $( "<a href='testurl' />" ).prependTo( fakeBody );
	rebase = link[ 0 ].href;
	base[ 0 ].href = href || location.pathname;

	if ( fauxEle ) {
		fauxEle.remove();
	}
	return rebase.indexOf( fauxBase ) === 0;
}


// non-UA-based IE version check by James Padolsey, modified by jdalton - from http://gist.github.com/527683
// allows for inclusion of IE 6+, including Windows Mobile 7
$.mobile.browser = {};
$.mobile.browser.ie = (function() {
	var v = 3,
	div = document.createElement( "div" ),
	a = div.all || [];

	while ( div.innerHTML = "<!--[if gt IE " + ( ++v ) + "]><br><![endif]-->", a[ 0 ] );

	return v > 4 ? v : !v;
})();


$.extend( $.support, {
	orientation: "orientation" in window && "onorientationchange" in window,
	touch: "ontouchend" in document,
	cssTransitions: "WebKitTransitionEvent" in window,
	pushState: "pushState" in history && "replaceState" in history,
	mediaquery: $.mobile.media( "only all" ),
	cssPseudoElement: !!propExists( "content" ),
	touchOverflow: !!propExists( "overflowScrolling" ),
	boxShadow: !!propExists( "boxShadow" ) && !bb,
	scrollTop: ( "pageXOffset" in window || "scrollTop" in document.documentElement || "scrollTop" in fakeBody[ 0 ] ) && !webos && !operamini,
	dynamicBaseTag: baseTagTest()
});

fakeBody.remove();


// $.mobile.ajaxBlacklist is used to override ajaxEnabled on platforms that have known conflicts with hash history updates (BB5, Symbian)
// or that generally work better browsing in regular http for full page refreshes (Opera Mini)
// Note: This detection below is used as a last resort.
// We recommend only using these detection methods when all other more reliable/forward-looking approaches are not possible
var nokiaLTE7_3 = (function(){

	var ua = window.navigator.userAgent;

	//The following is an attempt to match Nokia browsers that are running Symbian/s60, with webkit, version 7.3 or older
	return ua.indexOf( "Nokia" ) > -1 &&
			( ua.indexOf( "Symbian/3" ) > -1 || ua.indexOf( "Series60/5" ) > -1 ) &&
			ua.indexOf( "AppleWebKit" ) > -1 &&
			ua.match( /(BrowserNG|NokiaBrowser)\/7\.[0-3]/ );
})();

$.mobile.ajaxBlacklist =
			// BlackBerry browsers, pre-webkit
			window.blackberry && !window.WebKitPoint ||
			// Opera Mini
			operamini ||
			// Symbian webkits pre 7.3
			nokiaLTE7_3;

// Lastly, this workaround is the only way we've found so far to get pre 7.3 Symbian webkit devices
// to render the stylesheets when they're referenced before this script, as we'd recommend doing.
// This simply reappends the CSS in place, which for some reason makes it apply
if ( nokiaLTE7_3 ) {
	$(function() {
		$( "head link[rel='stylesheet']" ).attr( "rel", "alternate stylesheet" ).attr( "rel", "stylesheet" );
	});
}

// For ruling out shadows via css
if ( !$.support.boxShadow ) {
	$( "html" ).addClass( "ui-mobile-nosupport-boxshadow" );
}

})( jQuery );
/*
* "mouse" plugin
*/

// This plugin is an experiment for abstracting away the touch and mouse
// events so that developers don't have to worry about which method of input
// the device their document is loaded on supports.
//
// The idea here is to allow the developer to register listeners for the
// basic mouse events, such as mousedown, mousemove, mouseup, and click,
// and the plugin will take care of registering the correct listeners
// behind the scenes to invoke the listener at the fastest possible time
// for that device, while still retaining the order of event firing in
// the traditional mouse environment, should multiple handlers be registered
// on the same element for different events.
//
// The current version exposes the following virtual events to jQuery bind methods:
// "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel"

(function( $, window, document, undefined ) {

var dataPropertyName = "virtualMouseBindings",
	touchTargetPropertyName = "virtualTouchID",
	virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split( " " ),
	touchEventProps = "clientX clientY pageX pageY screenX screenY".split( " " ),
	activeDocHandlers = {},
	resetTimerID = 0,
	startX = 0,
	startY = 0,
	didScroll = false,
	clickBlockList = [],
	blockMouseTriggers = false,
	blockTouchTriggers = false,
	eventCaptureSupported = "addEventListener" in document,
	$document = $( document ),
	nextTouchID = 1,
	lastTouchID = 0;

$.vmouse = {
	moveDistanceThreshold: 10,
	clickDistanceThreshold: 10,
	resetTimerDuration: 1500
};

function getNativeEvent( event ) {

	while ( event && typeof event.originalEvent !== "undefined" ) {
		event = event.originalEvent;
	}
	return event;
}

function createVirtualEvent( event, eventType ) {

	var t = event.type,
		oe, props, ne, prop, ct, touch, i, j;

	event = $.Event(event);
	event.type = eventType;

	oe = event.originalEvent;
	props = $.event.props;

	// copy original event properties over to the new event
	// this would happen if we could call $.event.fix instead of $.Event
	// but we don't have a way to force an event to be fixed multiple times
	if ( oe ) {
		for ( i = props.length, prop; i; ) {
			prop = props[ --i ];
			event[ prop ] = oe[ prop ];
		}
	}

	// make sure that if the mouse and click virtual events are generated
	// without a .which one is defined
	if ( t.search(/mouse(down|up)|click/) > -1 && !event.which ){
		event.which = 1;
	}

	if ( t.search(/^touch/) !== -1 ) {
		ne = getNativeEvent( oe );
		t = ne.touches;
		ct = ne.changedTouches;
		touch = ( t && t.length ) ? t[0] : ( (ct && ct.length) ? ct[ 0 ] : undefined );

		if ( touch ) {
			for ( j = 0, len = touchEventProps.length; j < len; j++){
				prop = touchEventProps[ j ];
				event[ prop ] = touch[ prop ];
			}
		}
	}

	return event;
}

function getVirtualBindingFlags( element ) {

	var flags = {},
		b, k;

	while ( element ) {

		b = $.data( element, dataPropertyName );

		for (  k in b ) {
			if ( b[ k ] ) {
				flags[ k ] = flags.hasVirtualBinding = true;
			}
		}
		element = element.parentNode;
	}
	return flags;
}

function getClosestElementWithVirtualBinding( element, eventType ) {
	var b;
	while ( element ) {

		b = $.data( element, dataPropertyName );

		if ( b && ( !eventType || b[ eventType ] ) ) {
			return element;
		}
		element = element.parentNode;
	}
	return null;
}

function enableTouchBindings() {
	blockTouchTriggers = false;
}

function disableTouchBindings() {
	blockTouchTriggers = true;
}

function enableMouseBindings() {
	lastTouchID = 0;
	clickBlockList.length = 0;
	blockMouseTriggers = false;

	// When mouse bindings are enabled, our
	// touch bindings are disabled.
	disableTouchBindings();
}

function disableMouseBindings() {
	// When mouse bindings are disabled, our
	// touch bindings are enabled.
	enableTouchBindings();
}

function startResetTimer() {
	clearResetTimer();
	resetTimerID = setTimeout(function(){
		resetTimerID = 0;
		enableMouseBindings();
	}, $.vmouse.resetTimerDuration );
}

function clearResetTimer() {
	if ( resetTimerID ){
		clearTimeout( resetTimerID );
		resetTimerID = 0;
	}
}

function triggerVirtualEvent( eventType, event, flags ) {
	var ve;

	if ( ( flags && flags[ eventType ] ) ||
				( !flags && getClosestElementWithVirtualBinding( event.target, eventType ) ) ) {

		ve = createVirtualEvent( event, eventType );

		$( event.target).trigger( ve );
	}

	return ve;
}

function mouseEventCallback( event ) {
	var touchID = $.data(event.target, touchTargetPropertyName);

	if ( !blockMouseTriggers && ( !lastTouchID || lastTouchID !== touchID ) ){
		var ve = triggerVirtualEvent( "v" + event.type, event );
		if ( ve ) {
			if ( ve.isDefaultPrevented() ) {
				event.preventDefault();
			}
			if ( ve.isPropagationStopped() ) {
				event.stopPropagation();
			}
			if ( ve.isImmediatePropagationStopped() ) {
				event.stopImmediatePropagation();
			}
		}
	}
}

function handleTouchStart( event ) {

	var touches = getNativeEvent( event ).touches,
		target, flags;

	if ( touches && touches.length === 1 ) {

		target = event.target;
		flags = getVirtualBindingFlags( target );

		if ( flags.hasVirtualBinding ) {

			lastTouchID = nextTouchID++;
			$.data( target, touchTargetPropertyName, lastTouchID );

			clearResetTimer();

			disableMouseBindings();
			didScroll = false;

			var t = getNativeEvent( event ).touches[ 0 ];
			startX = t.pageX;
			startY = t.pageY;

			triggerVirtualEvent( "vmouseover", event, flags );
			triggerVirtualEvent( "vmousedown", event, flags );
		}
	}
}

function handleScroll( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	if ( !didScroll ) {
		triggerVirtualEvent( "vmousecancel", event, getVirtualBindingFlags( event.target ) );
	}

	didScroll = true;
	startResetTimer();
}

function handleTouchMove( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	var t = getNativeEvent( event ).touches[ 0 ],
		didCancel = didScroll,
		moveThreshold = $.vmouse.moveDistanceThreshold;
		didScroll = didScroll ||
			( Math.abs(t.pageX - startX) > moveThreshold ||
				Math.abs(t.pageY - startY) > moveThreshold ),
		flags = getVirtualBindingFlags( event.target );

	if ( didScroll && !didCancel ) {
		triggerVirtualEvent( "vmousecancel", event, flags );
	}

	triggerVirtualEvent( "vmousemove", event, flags );
	startResetTimer();
}

function handleTouchEnd( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	disableTouchBindings();

	var flags = getVirtualBindingFlags( event.target ),
		t;
	triggerVirtualEvent( "vmouseup", event, flags );

	if ( !didScroll ) {
		var ve = triggerVirtualEvent( "vclick", event, flags );
		if ( ve && ve.isDefaultPrevented() ) {
			// The target of the mouse events that follow the touchend
			// event don't necessarily match the target used during the
			// touch. This means we need to rely on coordinates for blocking
			// any click that is generated.
			t = getNativeEvent( event ).changedTouches[ 0 ];
			clickBlockList.push({
				touchID: lastTouchID,
				x: t.clientX,
				y: t.clientY
			});

			// Prevent any mouse events that follow from triggering
			// virtual event notifications.
			blockMouseTriggers = true;
		}
	}
	triggerVirtualEvent( "vmouseout", event, flags);
	didScroll = false;

	startResetTimer();
}

function hasVirtualBindings( ele ) {
	var bindings = $.data( ele, dataPropertyName ),
		k;

	if ( bindings ) {
		for ( k in bindings ) {
			if ( bindings[ k ] ) {
				return true;
			}
		}
	}
	return false;
}

function dummyMouseHandler(){}

function getSpecialEventObject( eventType ) {
	var realType = eventType.substr( 1 );

	return {
		setup: function( data, namespace ) {
			// If this is the first virtual mouse binding for this element,
			// add a bindings object to its data.

			if ( !hasVirtualBindings( this ) ) {
				$.data( this, dataPropertyName, {});
			}

			// If setup is called, we know it is the first binding for this
			// eventType, so initialize the count for the eventType to zero.
			var bindings = $.data( this, dataPropertyName );
			bindings[ eventType ] = true;

			// If this is the first virtual mouse event for this type,
			// register a global handler on the document.

			activeDocHandlers[ eventType ] = ( activeDocHandlers[ eventType ] || 0 ) + 1;

			if ( activeDocHandlers[ eventType ] === 1 ) {
				$document.bind( realType, mouseEventCallback );
			}

			// Some browsers, like Opera Mini, won't dispatch mouse/click events
			// for elements unless they actually have handlers registered on them.
			// To get around this, we register dummy handlers on the elements.

			$( this ).bind( realType, dummyMouseHandler );

			// For now, if event capture is not supported, we rely on mouse handlers.
			if ( eventCaptureSupported ) {
				// If this is the first virtual mouse binding for the document,
				// register our touchstart handler on the document.

				activeDocHandlers[ "touchstart" ] = ( activeDocHandlers[ "touchstart" ] || 0) + 1;

				if (activeDocHandlers[ "touchstart" ] === 1) {
					$document.bind( "touchstart", handleTouchStart )
						.bind( "touchend", handleTouchEnd )

						// On touch platforms, touching the screen and then dragging your finger
						// causes the window content to scroll after some distance threshold is
						// exceeded. On these platforms, a scroll prevents a click event from being
						// dispatched, and on some platforms, even the touchend is suppressed. To
						// mimic the suppression of the click event, we need to watch for a scroll
						// event. Unfortunately, some platforms like iOS don't dispatch scroll
						// events until *AFTER* the user lifts their finger (touchend). This means
						// we need to watch both scroll and touchmove events to figure out whether
						// or not a scroll happenens before the touchend event is fired.

						.bind( "touchmove", handleTouchMove )
						.bind( "scroll", handleScroll );
				}
			}
		},

		teardown: function( data, namespace ) {
			// If this is the last virtual binding for this eventType,
			// remove its global handler from the document.

			--activeDocHandlers[ eventType ];

			if ( !activeDocHandlers[ eventType ] ) {
				$document.unbind( realType, mouseEventCallback );
			}

			if ( eventCaptureSupported ) {
				// If this is the last virtual mouse binding in existence,
				// remove our document touchstart listener.

				--activeDocHandlers[ "touchstart" ];

				if ( !activeDocHandlers[ "touchstart" ] ) {
					$document.unbind( "touchstart", handleTouchStart )
						.unbind( "touchmove", handleTouchMove )
						.unbind( "touchend", handleTouchEnd )
						.unbind( "scroll", handleScroll );
				}
			}

			var $this = $( this ),
				bindings = $.data( this, dataPropertyName );

			// teardown may be called when an element was
			// removed from the DOM. If this is the case,
			// jQuery core may have already stripped the element
			// of any data bindings so we need to check it before
			// using it.
			if ( bindings ) {
				bindings[ eventType ] = false;
			}

			// Unregister the dummy event handler.

			$this.unbind( realType, dummyMouseHandler );

			// If this is the last virtual mouse binding on the
			// element, remove the binding data from the element.

			if ( !hasVirtualBindings( this ) ) {
				$this.removeData( dataPropertyName );
			}
		}
	};
}

// Expose our custom events to the jQuery bind/unbind mechanism.

for ( var i = 0; i < virtualEventNames.length; i++ ){
	$.event.special[ virtualEventNames[ i ] ] = getSpecialEventObject( virtualEventNames[ i ] );
}

// Add a capture click handler to block clicks.
// Note that we require event capture support for this so if the device
// doesn't support it, we punt for now and rely solely on mouse events.
if ( eventCaptureSupported ) {
	document.addEventListener( "click", function( e ){
		var cnt = clickBlockList.length,
			target = e.target,
			x, y, ele, i, o, touchID;

		if ( cnt ) {
			x = e.clientX;
			y = e.clientY;
			threshold = $.vmouse.clickDistanceThreshold;

			// The idea here is to run through the clickBlockList to see if
			// the current click event is in the proximity of one of our
			// vclick events that had preventDefault() called on it. If we find
			// one, then we block the click.
			//
			// Why do we have to rely on proximity?
			//
			// Because the target of the touch event that triggered the vclick
			// can be different from the target of the click event synthesized
			// by the browser. The target of a mouse/click event that is syntehsized
			// from a touch event seems to be implementation specific. For example,
			// some browsers will fire mouse/click events for a link that is near
			// a touch event, even though the target of the touchstart/touchend event
			// says the user touched outside the link. Also, it seems that with most
			// browsers, the target of the mouse/click event is not calculated until the
			// time it is dispatched, so if you replace an element that you touched
			// with another element, the target of the mouse/click will be the new
			// element underneath that point.
			//
			// Aside from proximity, we also check to see if the target and any
			// of its ancestors were the ones that blocked a click. This is necessary
			// because of the strange mouse/click target calculation done in the
			// Android 2.1 browser, where if you click on an element, and there is a
			// mouse/click handler on one of its ancestors, the target will be the
			// innermost child of the touched element, even if that child is no where
			// near the point of touch.

			ele = target;

			while ( ele ) {
				for ( i = 0; i < cnt; i++ ) {
					o = clickBlockList[ i ];
					touchID = 0;

					if ( ( ele === target && Math.abs( o.x - x ) < threshold && Math.abs( o.y - y ) < threshold ) ||
								$.data( ele, touchTargetPropertyName ) === o.touchID ) {
						// XXX: We may want to consider removing matches from the block list
						//      instead of waiting for the reset timer to fire.
						e.preventDefault();
						e.stopPropagation();
						return;
					}
				}
				ele = ele.parentNode;
			}
		}
	}, true);
}
})( jQuery, window, document );
/* 
* "events" plugin - Handles events
*/

(function( $, window, undefined ) {

// add new event shortcuts
$.each( ( "touchstart touchmove touchend orientationchange throttledresize " +
					"tap taphold swipe swipeleft swiperight scrollstart scrollstop" ).split( " " ), function( i, name ) {

	$.fn[ name ] = function( fn ) {
		return fn ? this.bind( name, fn ) : this.trigger( name );
	};

	$.attrFn[ name ] = true;
});

var supportTouch = $.support.touch,
	scrollEvent = "touchmove scroll",
	touchStartEvent = supportTouch ? "touchstart" : "mousedown",
	touchStopEvent = supportTouch ? "touchend" : "mouseup",
	touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

function triggerCustomEvent( obj, eventType, event ) {
	var originalType = event.type;
	event.type = eventType;
	$.event.handle.call( obj, event );
	event.type = originalType;
}

// also handles scrollstop
$.event.special.scrollstart = {

	enabled: true,

	setup: function() {

		var thisObject = this,
			$this = $( thisObject ),
			scrolling,
			timer;

		function trigger( event, state ) {
			scrolling = state;
			triggerCustomEvent( thisObject, scrolling ? "scrollstart" : "scrollstop", event );
		}

		// iPhone triggers scroll after a small delay; use touchmove instead
		$this.bind( scrollEvent, function( event ) {

			if ( !$.event.special.scrollstart.enabled ) {
				return;
			}

			if ( !scrolling ) {
				trigger( event, true );
			}

			clearTimeout( timer );
			timer = setTimeout(function() {
				trigger( event, false );
			}, 50 );
		});
	}
};

// also handles taphold
$.event.special.tap = {
	setup: function() {
		var thisObject = this,
			$this = $( thisObject );

		$this.bind( "vmousedown", function( event ) {

			if ( event.which && event.which !== 1 ) {
				return false;
			}

			var origTarget = event.target,
				origEvent = event.originalEvent,
				timer;

			function clearTapTimer() {
				clearTimeout( timer );
			}

			function clearTapHandlers() {
				clearTapTimer();

				$this.unbind( "vclick", clickHandler )
					.unbind( "vmouseup", clearTapTimer )
					.unbind( "vmousecancel", clearTapHandlers );
			}

			function clickHandler(event) {
				clearTapHandlers();

				// ONLY trigger a 'tap' event if the start target is
				// the same as the stop target.
				if ( origTarget == event.target ) {
					triggerCustomEvent( thisObject, "tap", event );
				}
			}

			$this.bind( "vmousecancel", clearTapHandlers )
				.bind( "vmouseup", clearTapTimer )
				.bind( "vclick", clickHandler );

			timer = setTimeout(function() {
					triggerCustomEvent( thisObject, "taphold", $.Event( "taphold" ) );
			}, 750 );
		});
	}
};

// also handles swipeleft, swiperight
$.event.special.swipe = {
	scrollSupressionThreshold: 10, // More than this horizontal displacement, and we will suppress scrolling.

	durationThreshold: 1000, // More time than this, and it isn't a swipe.

	horizontalDistanceThreshold: 30,  // Swipe horizontal displacement must be more than this.

	verticalDistanceThreshold: 75,  // Swipe vertical displacement must be less than this.

	setup: function() {
		var thisObject = this,
			$this = $( thisObject );

		$this.bind( touchStartEvent, function( event ) {
			var data = event.originalEvent.touches ?
								event.originalEvent.touches[ 0 ] : event,
				start = {
					time: ( new Date() ).getTime(),
					coords: [ data.pageX, data.pageY ],
					origin: $( event.target )
				},
				stop;

			function moveHandler( event ) {

				if ( !start ) {
					return;
				}

				var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] : event;

				stop = {
					time: ( new Date() ).getTime(),
					coords: [ data.pageX, data.pageY ]
				};

				// prevent scrolling
				if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold ) {
					event.preventDefault();
				}
			}

			$this.bind( touchMoveEvent, moveHandler )
				.one( touchStopEvent, function( event ) {
					$this.unbind( touchMoveEvent, moveHandler );

					if ( start && stop ) {
						if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
								Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
								Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {

							start.origin.trigger( "swipe" )
								.trigger( start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight" );
						}
					}
					start = stop = undefined;
				});
		});
	}
};

(function( $, window ) {
	// "Cowboy" Ben Alman

	var win = $( window ),
		special_event,
		get_orientation,
		last_orientation;

	$.event.special.orientationchange = special_event = {
		setup: function() {
			// If the event is supported natively, return false so that jQuery
			// will bind to the event using DOM methods.
			if ( $.support.orientation && $.mobile.orientationChangeEnabled ) {
				return false;
			}

			// Get the current orientation to avoid initial double-triggering.
			last_orientation = get_orientation();

			// Because the orientationchange event doesn't exist, simulate the
			// event by testing window dimensions on resize.
			win.bind( "throttledresize", handler );
		},
		teardown: function(){
			// If the event is not supported natively, return false so that
			// jQuery will unbind the event using DOM methods.
			if ( $.support.orientation && $.mobile.orientationChangeEnabled ) {
				return false;
			}

			// Because the orientationchange event doesn't exist, unbind the
			// resize event handler.
			win.unbind( "throttledresize", handler );
		},
		add: function( handleObj ) {
			// Save a reference to the bound event handler.
			var old_handler = handleObj.handler;


			handleObj.handler = function( event ) {
				// Modify event object, adding the .orientation property.
				event.orientation = get_orientation();

				// Call the originally-bound event handler and return its result.
				return old_handler.apply( this, arguments );
			};
		}
	};

	// If the event is not supported natively, this handler will be bound to
	// the window resize event to simulate the orientationchange event.
	function handler() {
		// Get the current orientation.
		var orientation = get_orientation();

		if ( orientation !== last_orientation ) {
			// The orientation has changed, so trigger the orientationchange event.
			last_orientation = orientation;
			win.trigger( "orientationchange" );
		}
	}

	// Get the current page orientation. This method is exposed publicly, should it
	// be needed, as jQuery.event.special.orientationchange.orientation()
	$.event.special.orientationchange.orientation = get_orientation = function() {
		var isPortrait = true, elem = document.documentElement;

		// prefer window orientation to the calculation based on screensize as
		// the actual screen resize takes place before or after the orientation change event
		// has been fired depending on implementation (eg android 2.3 is before, iphone after).
		// More testing is required to determine if a more reliable method of determining the new screensize
		// is possible when orientationchange is fired. (eg, use media queries + element + opacity)
		if ( $.support.orientation ) {
			// if the window orientation registers as 0 or 180 degrees report
			// portrait, otherwise landscape
			isPortrait = window.orientation % 180 == 0;
		} else {
			isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
		}

		return isPortrait ? "portrait" : "landscape";
	};

})( jQuery, window );


// throttled resize event
(function() {

	$.event.special.throttledresize = {
		setup: function() {
			$( this ).bind( "resize", handler );
		},
		teardown: function(){
			$( this ).unbind( "resize", handler );
		}
	};

	var throttle = 250,
		handler = function() {
			curr = ( new Date() ).getTime();
			diff = curr - lastCall;

			if ( diff >= throttle ) {

				lastCall = curr;
				$( this ).trigger( "throttledresize" );

			} else {

				if ( heldCall ) {
					clearTimeout( heldCall );
				}

				// Promise a held call will still execute
				heldCall = setTimeout( handler, throttle - diff );
			}
		},
		lastCall = 0,
		heldCall,
		curr,
		diff;
})();


$.each({
	scrollstop: "scrollstart",
	taphold: "tap",
	swipeleft: "swipe",
	swiperight: "swipe"
}, function( event, sourceEvent ) {

	$.event.special[ event ] = {
		setup: function() {
			$( this ).bind( sourceEvent, $.noop );
		}
	};
});

})( jQuery, this );
// Script: jQuery hashchange event
// 
// *Version: 1.3, Last updated: 7/21/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// Also note that should a browser natively support the window.onhashchange 
// event, but not report that it does, the fallback polling loop will be used.
// 
// About: Release History
// 
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added 
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Reused string.
  var str_hashchange = 'hashchange',
    
    // Method / object references.
    doc = document,
    fake_onhashchange,
    special = $.event.special,
    
    // Does the browser support window.onhashchange? Note that IE8 running in
    // IE7 compatibility mode reports true for 'onhashchange' in window, even
    // though the event isn't supported, so also test document.documentMode.
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || location.href;
    return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Method: jQuery.fn.hashchange
  // 
  // Bind a handler to the window.onhashchange event or trigger all bound
  // window.onhashchange event handlers. This behavior is consistent with
  // jQuery's built-in event handlers.
  // 
  // Usage:
  // 
  // > jQuery(window).hashchange( [ handler ] );
  // 
  // Arguments:
  // 
  //  handler - (Function) Optional handler to be bound to the hashchange
  //    event. This is a "shortcut" for the more verbose form:
  //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
  //    all bound window.onhashchange event handlers will be triggered. This
  //    is a shortcut for the more verbose
  //    jQuery(window).trigger( 'hashchange' ). These forms are described in
  //    the <hashchange event> section.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements.
  
  // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
  // $(elem).hashchange() for triggering, like jQuery does for built-in events.
  $.fn[ str_hashchange ] = function( fn ) {
    return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
  };
  
  // Property: jQuery.fn.hashchange.delay
  // 
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 50.
  
  // Property: jQuery.fn.hashchange.domain
  // 
  // If you're setting document.domain in your JavaScript, and you want hash
  // history to work in IE6/7, not only must this property be set, but you must
  // also set document.domain BEFORE jQuery is loaded into the page. This
  // property is only applicable if you are supporting IE6/7 (or IE8 operating
  // in "IE7 compatibility" mode).
  // 
  // In addition, the <jQuery.fn.hashchange.src> property must be set to the
  // path of the included "document-domain.html" file, which can be renamed or
  // modified if necessary (note that the document.domain specified must be the
  // same in both your main JavaScript as well as in this file).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.domain = document.domain;
  
  // Property: jQuery.fn.hashchange.src
  // 
  // If, for some reason, you need to specify an Iframe src file (for example,
  // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
  // do so using this property. Note that when using this property, history
  // won't be recorded in IE6/7 until the Iframe src file loads. This property
  // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
  // compatibility" mode).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.src = 'path/to/file.html';
  
  $.fn[ str_hashchange ].delay = 50;
  /*
  $.fn[ str_hashchange ].domain = null;
  $.fn[ str_hashchange ].src = null;
  */
  
  // Event: hashchange event
  // 
  // Fired when location.hash changes. In browsers that support it, the native
  // HTML5 window.onhashchange event is used, otherwise a polling loop is
  // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
  // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
  // compatibility" mode), a hidden Iframe is created to allow the back button
  // and hash-based history to work.
  // 
  // Usage as described in <jQuery.fn.hashchange>:
  // 
  // > // Bind an event handler.
  // > jQuery(window).hashchange( function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).hashchange();
  // 
  // A more verbose usage that allows for event namespacing:
  // 
  // > // Bind an event handler.
  // > jQuery(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).trigger( 'hashchange' );
  // 
  // Additional Notes:
  // 
  // * The polling loop and Iframe are not created until at least one handler
  //   is actually bound to the 'hashchange' event.
  // * If you need the bound handler(s) to execute immediately, in cases where
  //   a location.hash exists on page load, via bookmark or page refresh for
  //   example, use jQuery(window).hashchange() or the more verbose 
  //   jQuery(window).trigger( 'hashchange' ).
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a DOM ready handler.
  
  // Override existing $.event.special.hashchange methods (allowing this plugin
  // to be defined after jQuery BBQ in BBQ's source code).
  special[ str_hashchange ] = $.extend( special[ str_hashchange ], {
    
    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },
    
    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }
    
  });
  
  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function(){
    var self = {},
      timeout_id,
      
      // Remember the initial hash so it doesn't get triggered immediately.
      last_hash = get_fragment(),
      
      fn_retval = function(val){ return val; },
      history_set = fn_retval,
      history_get = fn_retval;
    
    // Start the polling loop.
    self.start = function() {
      timeout_id || poll();
    };
    
    // Stop the polling loop.
    self.stop = function() {
      timeout_id && clearTimeout( timeout_id );
      timeout_id = undefined;
    };
    
    // This polling loop checks every $.fn.hashchange.delay milliseconds to see
    // if location.hash has changed, and triggers the 'hashchange' event on
    // window when necessary.
    function poll() {
      var hash = get_fragment(),
        history_hash = history_get( last_hash );
      
      if ( hash !== last_hash ) {
        history_set( last_hash = hash, history_hash );
        
        $(window).trigger( str_hashchange );
        
      } else if ( history_hash !== last_hash ) {
        location.href = location.href.replace( /#.*/, '' ) + history_hash;
      }
      
      timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
    };
    
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvv REMOVE IF NOT SUPPORTING IE6/7/8 vvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    $.browser.msie && !supports_onhashchange && (function(){
      // Not only do IE6/7 need the "magical" Iframe treatment, but so does IE8
      // when running in "IE7 compatibility" mode.
      
      var iframe,
        iframe_src;
      
      // When the event is bound and polling starts in IE 6/7, create a hidden
      // Iframe for history handling.
      self.start = function(){
        if ( !iframe ) {
          iframe_src = $.fn[ str_hashchange ].src;
          iframe_src = iframe_src && iframe_src + get_fragment();
          
          // Create hidden Iframe. Attempt to make Iframe as hidden as possible
          // by using techniques from http://www.paciellogroup.com/blog/?p=604.
          iframe = $('<iframe tabindex="-1" title="empty"/>').hide()
            
            // When Iframe has completely loaded, initialize the history and
            // start polling.
            .one( 'load', function(){
              iframe_src || history_set( get_fragment() );
              poll();
            })
            
            // Load Iframe src if specified, otherwise nothing.
            .attr( 'src', iframe_src || 'javascript:0' )
            
            // Append Iframe after the end of the body to prevent unnecessary
            // initial page scrolling (yes, this works).
            .insertAfter( 'body' )[0].contentWindow;
          
          // Whenever `document.title` changes, update the Iframe's title to
          // prettify the back/next history menu entries. Since IE sometimes
          // errors with "Unspecified error" the very first time this is set
          // (yes, very useful) wrap this with a try/catch block.
          doc.onpropertychange = function(){
            try {
              if ( event.propertyName === 'title' ) {
                iframe.document.title = doc.title;
              }
            } catch(e) {}
          };
          
        }
      };
      
      // Override the "stop" method since an IE6/7 Iframe was created. Even
      // if there are no longer any bound event handlers, the polling loop
      // is still necessary for back/next to work at all!
      self.stop = fn_retval;
      
      // Get history by looking at the hidden Iframe's location.hash.
      history_get = function() {
        return get_fragment( iframe.location.href );
      };
      
      // Set a new history item by opening and then closing the Iframe
      // document, *then* setting its location.hash. If document.domain has
      // been set, update that as well.
      history_set = function( hash, history_hash ) {
        var iframe_doc = iframe.document,
          domain = $.fn[ str_hashchange ].domain;
        
        if ( hash !== history_hash ) {
          // Update Iframe with any initial `document.title` that might be set.
          iframe_doc.title = doc.title;
          
          // Opening the Iframe's document after it has been closed is what
          // actually adds a history entry.
          iframe_doc.open();
          
          // Set document.domain for the Iframe document as well, if necessary.
          domain && iframe_doc.write( '<script>document.domain="' + domain + '"</script>' );
          
          iframe_doc.close();
          
          // Update the Iframe's hash, for great justice.
          iframe.location.hash = hash;
        }
      };
      
    })();
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^ REMOVE IF NOT SUPPORTING IE6/7/8 ^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
    return self;
  })();
  
})(jQuery,this);
/*
* "page" plugin
*/

(function( $, undefined ) {

$.widget( "mobile.page", $.mobile.widget, {
	options: {
		theme: "c",
		domCache: false,
		keepNativeDefault: ":jqmData(role='none'), :jqmData(role='nojs')"
	},

	_create: function() {

		this._trigger( "beforecreate" );

		this.element
			.attr( "tabindex", "0" )
			.addClass( "ui-page ui-body-" + this.options.theme );
	},

	keepNativeSelector: function() {
		var options = this.options,
			keepNativeDefined = options.keepNative && $.trim(options.keepNative);

		if( keepNativeDefined && options.keepNative !== options.keepNativeDefault ){
			return [options.keepNative, options.keepNativeDefault].join(", ");
		}

		return options.keepNativeDefault;
	}
});
})( jQuery );
/* 
* "core" - The base file for jQm
*/

(function( $, window, undefined ) {

	var nsNormalizeDict = {};

	// jQuery.mobile configurable options
	$.extend( $.mobile, {

		// Namespace used framework-wide for data-attrs. Default is no namespace
		ns: "",

		// Define the url parameter used for referencing widget-generated sub-pages.
		// Translates to to example.html&ui-page=subpageIdentifier
		// hash segment before &ui-page= is used to make Ajax request
		subPageUrlKey: "ui-page",

		// Class assigned to page currently in view, and during transitions
		activePageClass: "ui-page-active",

		// Class used for "active" button state, from CSS framework
		activeBtnClass: "ui-btn-active",

		// Automatically handle clicks and form submissions through Ajax, when same-domain
		ajaxEnabled: true,

		// Automatically load and show pages based on location.hash
		hashListeningEnabled: true,

		// disable to prevent jquery from bothering with links
		linkBindingEnabled: true,

		// Set default page transition - 'none' for no transitions
		defaultPageTransition: "slide",

		// Minimum scroll distance that will be remembered when returning to a page
		minScrollBack: 250,

		// Set default dialog transition - 'none' for no transitions
		defaultDialogTransition: "pop",

		// Show loading message during Ajax requests
		// if false, message will not appear, but loading classes will still be toggled on html el
		loadingMessage: "loading",

		// Error response message - appears when an Ajax page request fails
		pageLoadErrorMessage: "Error Loading Page",

		//automatically initialize the DOM when it's ready
		autoInitializePage: true,

		pushStateEnabled: true,

		// turn of binding to the native orientationchange due to android orientation behavior
		orientationChangeEnabled: true,

		// Support conditions that must be met in order to proceed
		// default enhanced qualifications are media query support OR IE 7+
		gradeA: function(){
			return $.support.mediaquery || $.mobile.browser.ie && $.mobile.browser.ie >= 7;
		},

		// TODO might be useful upstream in jquery itself ?
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91, // COMMAND
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93, // COMMAND_RIGHT
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91 // COMMAND
		},

		// Scroll page vertically: scroll to 0 to hide iOS address bar, or pass a Y value
		silentScroll: function( ypos ) {
			if ( $.type( ypos ) !== "number" ) {
				ypos = $.mobile.defaultHomeScroll;
			}

			// prevent scrollstart and scrollstop events
			$.event.special.scrollstart.enabled = false;

			setTimeout(function() {
				window.scrollTo( 0, ypos );
				$( document ).trigger( "silentscroll", { x: 0, y: ypos });
			}, 20 );

			setTimeout(function() {
				$.event.special.scrollstart.enabled = true;
			}, 150 );
		},

		// Expose our cache for testing purposes.
		nsNormalizeDict: nsNormalizeDict,

		// Take a data attribute property, prepend the namespace
		// and then camel case the attribute string. Add the result
		// to our nsNormalizeDict so we don't have to do this again.
		nsNormalize: function( prop ) {
			if ( !prop ) {
				return;
			}

			return nsNormalizeDict[ prop ] || ( nsNormalizeDict[ prop ] = $.camelCase( $.mobile.ns + prop ) );
		},

		getInheritedTheme: function( el, defaultTheme ) {

			// Find the closest parent with a theme class on it. Note that
			// we are not using $.fn.closest() on purpose here because this
			// method gets called quite a bit and we need it to be as fast
			// as possible.

			var e = el[ 0 ],
				ltr = "",
				re = /ui-(bar|body)-([a-z])\b/,
				c, m;

			while ( e ) {
				var c = e.className || "";
				if ( ( m = re.exec( c ) ) && ( ltr = m[ 2 ] ) ) {
					// We found a parent with a theme class
					// on it so bail from this loop.
					break;
				}
				e = e.parentNode;
			}
			
			// Return the theme letter we found, if none, return the
			// specified default.

			return ltr || defaultTheme || "a";
		}
	});

	// Mobile version of data and removeData and hasData methods
	// ensures all data is set and retrieved using jQuery Mobile's data namespace
	$.fn.jqmData = function( prop, value ) {
		var result;
		if ( typeof prop != "undefined" ) {
			result = this.data( prop ? $.mobile.nsNormalize( prop ) : prop, value );
		}
		return result;
	};

	$.jqmData = function( elem, prop, value ) {
		var result;
		if ( typeof prop != "undefined" ) {
			result = $.data( elem, prop ? $.mobile.nsNormalize( prop ) : prop, value );
		}
		return result;
	};

	$.fn.jqmRemoveData = function( prop ) {
		return this.removeData( $.mobile.nsNormalize( prop ) );
	};

	$.jqmRemoveData = function( elem, prop ) {
		return $.removeData( elem, $.mobile.nsNormalize( prop ) );
	};

	$.fn.removeWithDependents = function() {
		$.removeWithDependents( this );
	};

	$.removeWithDependents = function( elem ) {
		var $elem = $( elem );

		( $elem.jqmData('dependents') || $() ).remove();
		$elem.remove();
	};

	$.fn.addDependents = function( newDependents ) {
		$.addDependents( $(this), newDependents );
	};

	$.addDependents = function( elem, newDependents ) {
		var dependents = $(elem).jqmData( 'dependents' ) || $();

		$(elem).jqmData( 'dependents', $.merge(dependents, newDependents) );
	};

	// note that this helper doesn't attempt to handle the callback
	// or setting of an html elements text, its only purpose is
	// to return the html encoded version of the text in all cases. (thus the name)
	$.fn.getEncodedText = function() {
		return $( "<div/>" ).text( $(this).text() ).html();
	};

	// Monkey-patching Sizzle to filter the :jqmData selector
	var oldFind = $.find,
		jqmDataRE = /:jqmData\(([^)]*)\)/g;

	$.find = function( selector, context, ret, extra ) {
		selector = selector.replace( jqmDataRE, "[data-" + ( $.mobile.ns || "" ) + "$1]" );

		return oldFind.call( this, selector, context, ret, extra );
	};

	$.extend( $.find, oldFind );

	$.find.matches = function( expr, set ) {
		return $.find( expr, null, null, set );
	};

	$.find.matchesSelector = function( node, expr ) {
		return $.find( expr, null, null, [ node ] ).length > 0;
	};
})( jQuery, this );

/*
* core utilities for auto ajax navigation, base tag mgmt,
*/

( function( $, undefined ) {

	//define vars for interal use
	var $window = $( window ),
		$html = $( 'html' ),
		$head = $( 'head' ),

		//url path helpers for use in relative url management
		path = {

			// This scary looking regular expression parses an absolute URL or its relative
			// variants (protocol, site, document, query, and hash), into the various
			// components (protocol, host, path, query, fragment, etc that make up the
			// URL as well as some other commonly used sub-parts. When used with RegExp.exec()
			// or String.match, it parses the URL into a results array that looks like this:
			//
			//     [0]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content
			//     [1]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread
			//     [2]: http://jblas:password@mycompany.com:8080/mail/inbox
			//     [3]: http://jblas:password@mycompany.com:8080
			//     [4]: http:
			//     [5]: //
			//     [6]: jblas:password@mycompany.com:8080
			//     [7]: jblas:password
			//     [8]: jblas
			//     [9]: password
			//    [10]: mycompany.com:8080
			//    [11]: mycompany.com
			//    [12]: 8080
			//    [13]: /mail/inbox
			//    [14]: /mail/
			//    [15]: inbox
			//    [16]: ?msg=1234&type=unread
			//    [17]: #msg-content
			//
			urlParseRE: /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,

			//Parse a URL into a structure that allows easy access to
			//all of the URL components by name.
			parseUrl: function( url ) {
				// If we're passed an object, we'll assume that it is
				// a parsed url object and just return it back to the caller.
				if ( $.type( url ) === "object" ) {
					return url;
				}

				var matches = path.urlParseRE.exec( url || "" ) || [];

					// Create an object that allows the caller to access the sub-matches
					// by name. Note that IE returns an empty string instead of undefined,
					// like all other browsers do, so we normalize everything so its consistent
					// no matter what browser we're running on.
					return {
						href:         matches[  0 ] || "",
						hrefNoHash:   matches[  1 ] || "",
						hrefNoSearch: matches[  2 ] || "",
						domain:       matches[  3 ] || "",
						protocol:     matches[  4 ] || "",
						doubleSlash:  matches[  5 ] || "",
						authority:    matches[  6 ] || "",
						username:     matches[  8 ] || "",
						password:     matches[  9 ] || "",
						host:         matches[ 10 ] || "",
						hostname:     matches[ 11 ] || "",
						port:         matches[ 12 ] || "",
						pathname:     matches[ 13 ] || "",
						directory:    matches[ 14 ] || "",
						filename:     matches[ 15 ] || "",
						search:       matches[ 16 ] || "",
						hash:         matches[ 17 ] || ""
					};
			},

			//Turn relPath into an asbolute path. absPath is
			//an optional absolute path which describes what
			//relPath is relative to.
			makePathAbsolute: function( relPath, absPath ) {
				if ( relPath && relPath.charAt( 0 ) === "/" ) {
					return relPath;
				}

				relPath = relPath || "";
				absPath = absPath ? absPath.replace( /^\/|(\/[^\/]*|[^\/]+)$/g, "" ) : "";

				var absStack = absPath ? absPath.split( "/" ) : [],
					relStack = relPath.split( "/" );
				for ( var i = 0; i < relStack.length; i++ ) {
					var d = relStack[ i ];
					switch ( d ) {
						case ".":
							break;
						case "..":
							if ( absStack.length ) {
								absStack.pop();
							}
							break;
						default:
							absStack.push( d );
							break;
					}
				}
				return "/" + absStack.join( "/" );
			},

			//Returns true if both urls have the same domain.
			isSameDomain: function( absUrl1, absUrl2 ) {
				return path.parseUrl( absUrl1 ).domain === path.parseUrl( absUrl2 ).domain;
			},

			//Returns true for any relative variant.
			isRelativeUrl: function( url ) {
				// All relative Url variants have one thing in common, no protocol.
				return path.parseUrl( url ).protocol === "";
			},

			//Returns true for an absolute url.
			isAbsoluteUrl: function( url ) {
				return path.parseUrl( url ).protocol !== "";
			},

			//Turn the specified realtive URL into an absolute one. This function
			//can handle all relative variants (protocol, site, document, query, fragment).
			makeUrlAbsolute: function( relUrl, absUrl ) {
				if ( !path.isRelativeUrl( relUrl ) ) {
					return relUrl;
				}

				var relObj = path.parseUrl( relUrl ),
					absObj = path.parseUrl( absUrl ),
					protocol = relObj.protocol || absObj.protocol,
					doubleSlash = relObj.protocol ? relObj.doubleSlash : ( relObj.doubleSlash || absObj.doubleSlash ),
					authority = relObj.authority || absObj.authority,
					hasPath = relObj.pathname !== "",
					pathname = path.makePathAbsolute( relObj.pathname || absObj.filename, absObj.pathname ),
					search = relObj.search || ( !hasPath && absObj.search ) || "",
					hash = relObj.hash;

				return protocol + doubleSlash + authority + pathname + search + hash;
			},

			//Add search (aka query) params to the specified url.
			addSearchParams: function( url, params ) {
				var u = path.parseUrl( url ),
					p = ( typeof params === "object" ) ? $.param( params ) : params,
					s = u.search || "?";
				return u.hrefNoSearch + s + ( s.charAt( s.length - 1 ) !== "?" ? "&" : "" ) + p + ( u.hash || "" );
			},

			convertUrlToDataUrl: function( absUrl ) {
				var u = path.parseUrl( absUrl );
				if ( path.isEmbeddedPage( u ) ) {
				    // For embedded pages, remove the dialog hash key as in getFilePath(),
				    // otherwise the Data Url won't match the id of the embedded Page.
					return u.hash.split( dialogHashKey )[0].replace( /^#/, "" );
				} else if ( path.isSameDomain( u, documentBase ) ) {
					return u.hrefNoHash.replace( documentBase.domain, "" );
				}
				return absUrl;
			},

			//get path from current hash, or from a file path
			get: function( newPath ) {
				if( newPath === undefined ) {
					newPath = location.hash;
				}
				return path.stripHash( newPath ).replace( /[^\/]*\.[^\/*]+$/, '' );
			},

			//return the substring of a filepath before the sub-page key, for making a server request
			getFilePath: function( path ) {
				var splitkey = '&' + $.mobile.subPageUrlKey;
				return path && path.split( splitkey )[0].split( dialogHashKey )[0];
			},

			//set location hash to path
			set: function( path ) {
				location.hash = path;
			},

			//test if a given url (string) is a path
			//NOTE might be exceptionally naive
			isPath: function( url ) {
				return ( /\// ).test( url );
			},

			//return a url path with the window's location protocol/hostname/pathname removed
			clean: function( url ) {
				return url.replace( documentBase.domain, "" );
			},

			//just return the url without an initial #
			stripHash: function( url ) {
				return url.replace( /^#/, "" );
			},

			//remove the preceding hash, any query params, and dialog notations
			cleanHash: function( hash ) {
				return path.stripHash( hash.replace( /\?.*$/, "" ).replace( dialogHashKey, "" ) );
			},

			//check whether a url is referencing the same domain, or an external domain or different protocol
			//could be mailto, etc
			isExternal: function( url ) {
				var u = path.parseUrl( url );
				return u.protocol && u.domain !== documentUrl.domain ? true : false;
			},

			hasProtocol: function( url ) {
				return ( /^(:?\w+:)/ ).test( url );
			},

			//check if the specified url refers to the first page in the main application document.
			isFirstPageUrl: function( url ) {
				// We only deal with absolute paths.
				var u = path.parseUrl( path.makeUrlAbsolute( url, documentBase ) ),

					// Does the url have the same path as the document?
					samePath = u.hrefNoHash === documentUrl.hrefNoHash || ( documentBaseDiffers && u.hrefNoHash === documentBase.hrefNoHash ),

					// Get the first page element.
					fp = $.mobile.firstPage,

					// Get the id of the first page element if it has one.
					fpId = fp && fp[0] ? fp[0].id : undefined;

					// The url refers to the first page if the path matches the document and
					// it either has no hash value, or the hash is exactly equal to the id of the
					// first page element.
					return samePath && ( !u.hash || u.hash === "#" || ( fpId && u.hash.replace( /^#/, "" ) === fpId ) );
			},

			isEmbeddedPage: function( url ) {
				var u = path.parseUrl( url );

				//if the path is absolute, then we need to compare the url against
				//both the documentUrl and the documentBase. The main reason for this
				//is that links embedded within external documents will refer to the
				//application document, whereas links embedded within the application
				//document will be resolved against the document base.
				if ( u.protocol !== "" ) {
					return ( u.hash && ( u.hrefNoHash === documentUrl.hrefNoHash || ( documentBaseDiffers && u.hrefNoHash === documentBase.hrefNoHash ) ) );
				}
				return (/^#/).test( u.href );
			}
		},

		//will be defined when a link is clicked and given an active class
		$activeClickedLink = null,

		//urlHistory is purely here to make guesses at whether the back or forward button was clicked
		//and provide an appropriate transition
		urlHistory = {
			// Array of pages that are visited during a single page load.
			// Each has a url and optional transition, title, and pageUrl (which represents the file path, in cases where URL is obscured, such as dialogs)
			stack: [],

			//maintain an index number for the active page in the stack
			activeIndex: 0,

			//get active
			getActive: function() {
				return urlHistory.stack[ urlHistory.activeIndex ];
			},

			getPrev: function() {
				return urlHistory.stack[ urlHistory.activeIndex - 1 ];
			},

			getNext: function() {
				return urlHistory.stack[ urlHistory.activeIndex + 1 ];
			},

			// addNew is used whenever a new page is added
			addNew: function( url, transition, title, pageUrl, role ) {
				//if there's forward history, wipe it
				if( urlHistory.getNext() ) {
					urlHistory.clearForward();
				}

				urlHistory.stack.push( {url : url, transition: transition, title: title, pageUrl: pageUrl, role: role } );

				urlHistory.activeIndex = urlHistory.stack.length - 1;
			},

			//wipe urls ahead of active index
			clearForward: function() {
				urlHistory.stack = urlHistory.stack.slice( 0, urlHistory.activeIndex + 1 );
			},

			directHashChange: function( opts ) {
				var back , forward, newActiveIndex, prev = this.getActive();

				// check if url isp in history and if it's ahead or behind current page
				$.each( urlHistory.stack, function( i, historyEntry ) {

					//if the url is in the stack, it's a forward or a back
					if( opts.currentUrl === historyEntry.url ) {
						//define back and forward by whether url is older or newer than current page
						back = i < urlHistory.activeIndex;
						forward = !back;
						newActiveIndex = i;
					}
				});

				// save new page index, null check to prevent falsey 0 result
				this.activeIndex = newActiveIndex !== undefined ? newActiveIndex : this.activeIndex;

				if( back ) {
					( opts.either || opts.isBack )( true );
				} else if( forward ) {
					( opts.either || opts.isForward )( false );
				}
			},

			//disable hashchange event listener internally to ignore one change
			//toggled internally when location.hash is updated to match the url of a successful page load
			ignoreNextHashChange: false
		},

		//define first selector to receive focus when a page is shown
		focusable = "[tabindex],a,button:visible,select:visible,input",

		//queue to hold simultanious page transitions
		pageTransitionQueue = [],

		//indicates whether or not page is in process of transitioning
		isPageTransitioning = false,

		//nonsense hash change key for dialogs, so they create a history entry
		dialogHashKey = "&ui-state=dialog",

		//existing base tag?
		$base = $head.children( "base" ),

		//tuck away the original document URL minus any fragment.
		documentUrl = path.parseUrl( location.href ),

		//if the document has an embedded base tag, documentBase is set to its
		//initial value. If a base tag does not exist, then we default to the documentUrl.
		documentBase = $base.length ? path.parseUrl( path.makeUrlAbsolute( $base.attr( "href" ), documentUrl.href ) ) : documentUrl,

		//cache the comparison once.
		documentBaseDiffers = ( documentUrl.hrefNoHash !== documentBase.hrefNoHash );

		//base element management, defined depending on dynamic base tag support
		var base = $.support.dynamicBaseTag ? {

			//define base element, for use in routing asset urls that are referenced in Ajax-requested markup
			element: ( $base.length ? $base : $( "<base>", { href: documentBase.hrefNoHash } ).prependTo( $head ) ),

			//set the generated BASE element's href attribute to a new page's base path
			set: function( href ) {
				base.element.attr( "href", path.makeUrlAbsolute( href, documentBase ) );
			},

			//set the generated BASE element's href attribute to a new page's base path
			reset: function() {
				base.element.attr( "href", documentBase.hrefNoHash );
			}

		} : undefined;

/*
	internal utility functions
--------------------------------------*/


	//direct focus to the page title, or otherwise first focusable element
	function reFocus( page ) {
		var pageTitle = page.find( ".ui-title:eq(0)" );

		if( pageTitle.length ) {
			pageTitle.focus();
		}
		else{
			page.focus();
		}
	}

	//remove active classes after page transition or error
	function removeActiveLinkClass( forceRemoval ) {
		if( !!$activeClickedLink && ( !$activeClickedLink.closest( '.ui-page-active' ).length || forceRemoval ) ) {
			$activeClickedLink.removeClass( $.mobile.activeBtnClass );
		}
		$activeClickedLink = null;
	}

	function releasePageTransitionLock() {
		isPageTransitioning = false;
		if( pageTransitionQueue.length > 0 ) {
			$.mobile.changePage.apply( null, pageTransitionQueue.pop() );
		}
	}

	// Save the last scroll distance per page, before it is hidden
	var setLastScrollEnabled = true,
		firstScrollElem, getScrollElem, setLastScroll, delayedSetLastScroll;

	getScrollElem = function() {
		var scrollElem = $window, activePage,
			touchOverflow = $.support.touchOverflow && $.mobile.touchOverflowEnabled;

		if( touchOverflow ){
			activePage = $( ".ui-page-active" );
			scrollElem = activePage.is( ".ui-native-fixed" ) ? activePage.find( ".ui-content" ) : activePage;
		}

		return scrollElem;
	};

	setLastScroll = function( scrollElem ) {
		// this barrier prevents setting the scroll value based on the browser
		// scrolling the window based on a hashchange
		if( !setLastScrollEnabled ) {
			return;
		}

		var active = $.mobile.urlHistory.getActive();

		if( active ) {
			var lastScroll = scrollElem && scrollElem.scrollTop();

			// Set active page's lastScroll prop.
			// If the location we're scrolling to is less than minScrollBack, let it go.
			active.lastScroll = lastScroll < $.mobile.minScrollBack ? $.mobile.defaultHomeScroll : lastScroll;
		}
	};

	// bind to scrollstop to gather scroll position. The delay allows for the hashchange
	// event to fire and disable scroll recording in the case where the browser scrolls
	// to the hash targets location (sometimes the top of the page). once pagechange fires
	// getLastScroll is again permitted to operate
	delayedSetLastScroll = function() {
		setTimeout( setLastScroll, 100, $(this) );
	};

	// disable an scroll setting when a hashchange has been fired, this only works
	// because the recording of the scroll position is delayed for 100ms after
	// the browser might have changed the position because of the hashchange
	$window.bind( $.support.pushState ? "popstate" : "hashchange", function() {
	 	setLastScrollEnabled = false;
	});

	// handle initial hashchange from chrome :(
	$window.one( $.support.pushState ? "popstate" : "hashchange", function() {
		setLastScrollEnabled = true;
	});

	// wait until the mobile page container has been determined to bind to pagechange
	$window.one( "pagecontainercreate", function(){
		// once the page has changed, re-enable the scroll recording
		$.mobile.pageContainer.bind( "pagechange", function() {
			var scrollElem = getScrollElem();

	 		setLastScrollEnabled = true;

			// remove any binding that previously existed on the get scroll
			// which may or may not be different than the scroll element determined for
			// this page previously
			scrollElem.unbind( "scrollstop", delayedSetLastScroll );

			// determine and bind to the current scoll element which may be the window
			// or in the case of touch overflow the element with touch overflow
			scrollElem.bind( "scrollstop", delayedSetLastScroll );
		});
	});

	// bind to scrollstop for the first page as "pagechange" won't be fired in that case
	getScrollElem().bind( "scrollstop", delayedSetLastScroll );

	// Make the iOS clock quick-scroll work again if we're using native overflow scrolling
	/*
	if( $.support.touchOverflow ){
		if( $.mobile.touchOverflowEnabled ){
			$( window ).bind( "scrollstop", function(){
				if( $( this ).scrollTop() === 0 ){
					$.mobile.activePage.scrollTop( 0 );
				}
			});
		}
	}
	*/

	//function for transitioning between two existing pages
	function transitionPages( toPage, fromPage, transition, reverse ) {

		//get current scroll distance
		var active	= $.mobile.urlHistory.getActive(),
			touchOverflow = $.support.touchOverflow && $.mobile.touchOverflowEnabled,
			toScroll = active.lastScroll || ( touchOverflow ? 0 : $.mobile.defaultHomeScroll ),
			screenHeight = getScreenHeight();

		// Scroll to top, hide addr bar
		window.scrollTo( 0, $.mobile.defaultHomeScroll );

		if( fromPage ) {
			//trigger before show/hide events
			fromPage.data( "page" )._trigger( "beforehide", null, { nextPage: toPage } );
		}

		if( !touchOverflow){
			toPage.height( screenHeight + toScroll );
		}

		toPage.data( "page" )._trigger( "beforeshow", null, { prevPage: fromPage || $( "" ) } );

		//clear page loader
		$.mobile.hidePageLoadingMsg();

		if( touchOverflow && toScroll ){

			toPage.addClass( "ui-mobile-pre-transition" );
			// Send focus to page as it is now display: block
			reFocus( toPage );

			//set page's scrollTop to remembered distance
			if( toPage.is( ".ui-native-fixed" ) ){
				toPage.find( ".ui-content" ).scrollTop( toScroll );
			}
			else{
				toPage.scrollTop( toScroll );
			}
		}

		//find the transition handler for the specified transition. If there
		//isn't one in our transitionHandlers dictionary, use the default one.
		//call the handler immediately to kick-off the transition.
		var th = $.mobile.transitionHandlers[transition || "none"] || $.mobile.defaultTransitionHandler,
			promise = th( transition, reverse, toPage, fromPage );

		promise.done(function() {
			//reset toPage height back
			if( !touchOverflow ){
				toPage.height( "" );
				// Send focus to the newly shown page
				reFocus( toPage );
			}

			// Jump to top or prev scroll, sometimes on iOS the page has not rendered yet.
			if( !touchOverflow ){
				$.mobile.silentScroll( toScroll );
			}

			//trigger show/hide events
			if( fromPage ) {
				if( !touchOverflow ){
					fromPage.height( "" );
				}

				fromPage.data( "page" )._trigger( "hide", null, { nextPage: toPage } );
			}

			//trigger pageshow, define prevPage as either fromPage or empty jQuery obj
			toPage.data( "page" )._trigger( "show", null, { prevPage: fromPage || $( "" ) } );
		});

		return promise;
	}

	//simply set the active page's minimum height to screen height, depending on orientation
	function getScreenHeight(){
		var orientation 	= $.event.special.orientationchange.orientation(),
			port			= orientation === "portrait",
			winMin			= port ? 480 : 320,
			screenHeight	= port ? screen.availHeight : screen.availWidth,
			winHeight		= Math.max( winMin, $( window ).height() ),
			pageMin			= Math.min( screenHeight, winHeight );

		return pageMin;
	}

	$.mobile.getScreenHeight = getScreenHeight;

	//simply set the active page's minimum height to screen height, depending on orientation
	function resetActivePageHeight(){
		// Don't apply this height in touch overflow enabled mode
		if( $.support.touchOverflow && $.mobile.touchOverflowEnabled ){
			return;
		}
		$( "." + $.mobile.activePageClass ).css( "min-height", getScreenHeight() );
	}

	//shared page enhancements
	function enhancePage( $page, role ) {
		// If a role was specified, make sure the data-role attribute
		// on the page element is in sync.
		if( role ) {
			$page.attr( "data-" + $.mobile.ns + "role", role );
		}

		//run page plugin
		$page.page();
	}

/* exposed $.mobile methods	 */

	//animation complete callback
	$.fn.animationComplete = function( callback ) {
		if( $.support.cssTransitions ) {
			return $( this ).one( 'webkitAnimationEnd', callback );
		}
		else{
			// defer execution for consistency between webkit/non webkit
			setTimeout( callback, 0 );
			return $( this );
		}
	};

	//expose path object on $.mobile
	$.mobile.path = path;

	//expose base object on $.mobile
	$.mobile.base = base;

	//history stack
	$.mobile.urlHistory = urlHistory;

	$.mobile.dialogHashKey = dialogHashKey;

	//default non-animation transition handler
	$.mobile.noneTransitionHandler = function( name, reverse, $toPage, $fromPage ) {
		if ( $fromPage ) {
			$fromPage.removeClass( $.mobile.activePageClass );
		}
		$toPage.addClass( $.mobile.activePageClass );

		return $.Deferred().resolve( name, reverse, $toPage, $fromPage ).promise();
	};

	//default handler for unknown transitions
	$.mobile.defaultTransitionHandler = $.mobile.noneTransitionHandler;

	//transition handler dictionary for 3rd party transitions
	$.mobile.transitionHandlers = {
		none: $.mobile.defaultTransitionHandler
	};

	//enable cross-domain page support
	$.mobile.allowCrossDomainPages = false;

	//return the original document url
	$.mobile.getDocumentUrl = function(asParsedObject) {
		return asParsedObject ? $.extend( {}, documentUrl ) : documentUrl.href;
	};

	//return the original document base url
	$.mobile.getDocumentBase = function(asParsedObject) {
		return asParsedObject ? $.extend( {}, documentBase ) : documentBase.href;
	};

	$.mobile._bindPageRemove = function() {
		var page = $(this);

		// when dom caching is not enabled or the page is embedded bind to remove the page on hide
		if( !page.data("page").options.domCache
				&& page.is(":jqmData(external-page='true')") ) {

			page.bind( 'pagehide.remove', function() {
				var $this = $( this ),
					prEvent = new $.Event( "pageremove" );

				$this.trigger( prEvent );

				if( !prEvent.isDefaultPrevented() ){
					$this.removeWithDependents();
				}
			});
		}
	};

	// Load a page into the DOM.
	$.mobile.loadPage = function( url, options ) {
		// This function uses deferred notifications to let callers
		// know when the page is done loading, or if an error has occurred.
		var deferred = $.Deferred(),

			// The default loadPage options with overrides specified by
			// the caller.
			settings = $.extend( {}, $.mobile.loadPage.defaults, options ),

			// The DOM element for the page after it has been loaded.
			page = null,

			// If the reloadPage option is true, and the page is already
			// in the DOM, dupCachedPage will be set to the page element
			// so that it can be removed after the new version of the
			// page is loaded off the network.
			dupCachedPage = null,

			// determine the current base url
			findBaseWithDefault = function(){
				var closestBase = ( $.mobile.activePage && getClosestBaseUrl( $.mobile.activePage ) );
				return closestBase || documentBase.hrefNoHash;
			},

			// The absolute version of the URL passed into the function. This
			// version of the URL may contain dialog/subpage params in it.
			absUrl = path.makeUrlAbsolute( url, findBaseWithDefault() );


		// If the caller provided data, and we're using "get" request,
		// append the data to the URL.
		if ( settings.data && settings.type === "get" ) {
			absUrl = path.addSearchParams( absUrl, settings.data );
			settings.data = undefined;
		}

		// If the caller is using a "post" request, reloadPage must be true
		if(  settings.data && settings.type === "post" ){
			settings.reloadPage = true;
		}

			// The absolute version of the URL minus any dialog/subpage params.
			// In otherwords the real URL of the page to be loaded.
		var fileUrl = path.getFilePath( absUrl ),

			// The version of the Url actually stored in the data-url attribute of
			// the page. For embedded pages, it is just the id of the page. For pages
			// within the same domain as the document base, it is the site relative
			// path. For cross-domain pages (Phone Gap only) the entire absolute Url
			// used to load the page.
			dataUrl = path.convertUrlToDataUrl( absUrl );

		// Make sure we have a pageContainer to work with.
		settings.pageContainer = settings.pageContainer || $.mobile.pageContainer;

		// Check to see if the page already exists in the DOM.
		page = settings.pageContainer.children( ":jqmData(url='" + dataUrl + "')" );

		// If we failed to find the page, check to see if the url is a
		// reference to an embedded page. If so, it may have been dynamically
		// injected by a developer, in which case it would be lacking a data-url
		// attribute and in need of enhancement.
		if ( page.length === 0 && dataUrl && !path.isPath( dataUrl ) ) {
			page = settings.pageContainer.children( "#" + dataUrl )
				.attr( "data-" + $.mobile.ns + "url", dataUrl );
		}

		// If we failed to find a page in the DOM, check the URL to see if it
		// refers to the first page in the application. If it isn't a reference
		// to the first page and refers to non-existent embedded page, error out.
		if ( page.length === 0 ) {
			if ( $.mobile.firstPage && path.isFirstPageUrl( fileUrl ) ) {
				// Check to make sure our cached-first-page is actually
				// in the DOM. Some user deployed apps are pruning the first
				// page from the DOM for various reasons, we check for this
				// case here because we don't want a first-page with an id
				// falling through to the non-existent embedded page error
				// case. If the first-page is not in the DOM, then we let
				// things fall through to the ajax loading code below so
				// that it gets reloaded.
				if ( $.mobile.firstPage.parent().length ) {
					page = $( $.mobile.firstPage );
				}
			} else if ( path.isEmbeddedPage( fileUrl )  ) {
				deferred.reject( absUrl, options );
				return deferred.promise();
			}
		}

		// Reset base to the default document base.
		if ( base ) {
			base.reset();
		}

		// If the page we are interested in is already in the DOM,
		// and the caller did not indicate that we should force a
		// reload of the file, we are done. Otherwise, track the
		// existing page as a duplicated.
		if ( page.length ) {
			if ( !settings.reloadPage ) {
				enhancePage( page, settings.role );
				deferred.resolve( absUrl, options, page );
				return deferred.promise();
			}
			dupCachedPage = page;
		}

		var mpc = settings.pageContainer,
			pblEvent = new $.Event( "pagebeforeload" ),
			triggerData = { url: url, absUrl: absUrl, dataUrl: dataUrl, deferred: deferred, options: settings };

		// Let listeners know we're about to load a page.
		mpc.trigger( pblEvent, triggerData );

		// If the default behavior is prevented, stop here!
		if( pblEvent.isDefaultPrevented() ){
			return deferred.promise();
		}

		if ( settings.showLoadMsg ) {

			// This configurable timeout allows cached pages a brief delay to load without showing a message
			var loadMsgDelay = setTimeout(function(){
					$.mobile.showPageLoadingMsg();
				}, settings.loadMsgDelay ),

				// Shared logic for clearing timeout and removing message.
				hideMsg = function(){

					// Stop message show timer
					clearTimeout( loadMsgDelay );

					// Hide loading message
					$.mobile.hidePageLoadingMsg();
				};
		}

		if ( !( $.mobile.allowCrossDomainPages || path.isSameDomain( documentUrl, absUrl ) ) ) {
			deferred.reject( absUrl, options );
		} else {
			// Load the new page.
			$.ajax({
				url: fileUrl,
				type: settings.type,
				data: settings.data,
				dataType: "html",
				success: function( html, textStatus, xhr ) {
					//pre-parse html to check for a data-url,
					//use it as the new fileUrl, base path, etc
					var all = $( "<div></div>" ),

						//page title regexp
						newPageTitle = html.match( /<title[^>]*>([^<]*)/ ) && RegExp.$1,

						// TODO handle dialogs again
						pageElemRegex = new RegExp( "(<[^>]+\\bdata-" + $.mobile.ns + "role=[\"']?page[\"']?[^>]*>)" ),
						dataUrlRegex = new RegExp( "\\bdata-" + $.mobile.ns + "url=[\"']?([^\"'>]*)[\"']?" );


					// data-url must be provided for the base tag so resource requests can be directed to the
					// correct url. loading into a temprorary element makes these requests immediately
					if( pageElemRegex.test( html )
							&& RegExp.$1
							&& dataUrlRegex.test( RegExp.$1 )
							&& RegExp.$1 ) {
						url = fileUrl = path.getFilePath( RegExp.$1 );
					}

					if ( base ) {
						base.set( fileUrl );
					}

					//workaround to allow scripts to execute when included in page divs
					all.get( 0 ).innerHTML = html;
					page = all.find( ":jqmData(role='page'), :jqmData(role='dialog')" ).first();

					//if page elem couldn't be found, create one and insert the body element's contents
					if( !page.length ){
						page = $( "<div data-" + $.mobile.ns + "role='page'>" + html.split( /<\/?body[^>]*>/gmi )[1] + "</div>" );
					}

					if ( newPageTitle && !page.jqmData( "title" ) ) {
						if ( ~newPageTitle.indexOf( "&" ) ) {
							newPageTitle = $( "<div>" + newPageTitle + "</div>" ).text();
						}
						page.jqmData( "title", newPageTitle );
					}

					//rewrite src and href attrs to use a base url
					if( !$.support.dynamicBaseTag ) {
						var newPath = path.get( fileUrl );
						page.find( "[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]" ).each(function() {
							var thisAttr = $( this ).is( '[href]' ) ? 'href' :
									$(this).is('[src]') ? 'src' : 'action',
								thisUrl = $( this ).attr( thisAttr );

							// XXX_jblas: We need to fix this so that it removes the document
							//            base URL, and then prepends with the new page URL.
							//if full path exists and is same, chop it - helps IE out
							thisUrl = thisUrl.replace( location.protocol + '//' + location.host + location.pathname, '' );

							if( !/^(\w+:|#|\/)/.test( thisUrl ) ) {
								$( this ).attr( thisAttr, newPath + thisUrl );
							}
						});
					}

					//append to page and enhance
					// TODO taging a page with external to make sure that embedded pages aren't removed
					//      by the various page handling code is bad. Having page handling code in many
					//      places is bad. Solutions post 1.0
					page
						.attr( "data-" + $.mobile.ns + "url", path.convertUrlToDataUrl( fileUrl ) )
						.attr( "data-" + $.mobile.ns + "external-page", true )
						.appendTo( settings.pageContainer );

					// wait for page creation to leverage options defined on widget
					page.one( 'pagecreate', $.mobile._bindPageRemove );

					enhancePage( page, settings.role );

					// Enhancing the page may result in new dialogs/sub pages being inserted
					// into the DOM. If the original absUrl refers to a sub-page, that is the
					// real page we are interested in.
					if ( absUrl.indexOf( "&" + $.mobile.subPageUrlKey ) > -1 ) {
						page = settings.pageContainer.children( ":jqmData(url='" + dataUrl + "')" );
					}

					//bind pageHide to removePage after it's hidden, if the page options specify to do so

					// Remove loading message.
					if ( settings.showLoadMsg ) {
						hideMsg();
					}

					// Add the page reference and xhr to our triggerData.
					triggerData.xhr = xhr;
					triggerData.textStatus = textStatus;
					triggerData.page = page;

					// Let listeners know the page loaded successfully.
					settings.pageContainer.trigger( "pageload", triggerData );

					deferred.resolve( absUrl, options, page, dupCachedPage );
				},
				error: function( xhr, textStatus, errorThrown ) {
					//set base back to current path
					if( base ) {
						base.set( path.get() );
					}

					// Add error info to our triggerData.
					triggerData.xhr = xhr;
					triggerData.textStatus = textStatus;
					triggerData.errorThrown = errorThrown;

					var plfEvent = new $.Event( "pageloadfailed" );

					// Let listeners know the page load failed.
					settings.pageContainer.trigger( plfEvent, triggerData );

					// If the default behavior is prevented, stop here!
					// Note that it is the responsibility of the listener/handler
					// that called preventDefault(), to resolve/reject the
					// deferred object within the triggerData.
					if( plfEvent.isDefaultPrevented() ){
						return;
					}

					// Remove loading message.
					if ( settings.showLoadMsg ) {

						// Remove loading message.
						hideMsg();

						//show error message
						$( "<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>"+ $.mobile.pageLoadErrorMessage +"</h1></div>" )
							.css({ "display": "block", "opacity": 0.96, "top": $window.scrollTop() + 100 })
							.appendTo( settings.pageContainer )
							.delay( 800 )
							.fadeOut( 400, function() {
								$( this ).remove();
							});
					}

					deferred.reject( absUrl, options );
				}
			});
		}

		return deferred.promise();
	};

	$.mobile.loadPage.defaults = {
		type: "get",
		data: undefined,
		reloadPage: false,
		role: undefined, // By default we rely on the role defined by the @data-role attribute.
		showLoadMsg: false,
		pageContainer: undefined,
		loadMsgDelay: 50 // This delay allows loads that pull from browser cache to occur without showing the loading message.
	};

	// Show a specific page in the page container.
	$.mobile.changePage = function( toPage, options ) {
		// If we are in the midst of a transition, queue the current request.
		// We'll call changePage() once we're done with the current transition to
		// service the request.
		if( isPageTransitioning ) {
			pageTransitionQueue.unshift( arguments );
			return;
		}

		var settings = $.extend( {}, $.mobile.changePage.defaults, options );

		// Make sure we have a pageContainer to work with.
		settings.pageContainer = settings.pageContainer || $.mobile.pageContainer;

		// Make sure we have a fromPage.
		settings.fromPage = settings.fromPage || $.mobile.activePage;

		var mpc = settings.pageContainer,
			pbcEvent = new $.Event( "pagebeforechange" ),
			triggerData = { toPage: toPage, options: settings };

		// Let listeners know we're about to change the current page.
		mpc.trigger( pbcEvent, triggerData );

		// If the default behavior is prevented, stop here!
		if( pbcEvent.isDefaultPrevented() ){
			return;
		}

		// We allow "pagebeforechange" observers to modify the toPage in the trigger
		// data to allow for redirects. Make sure our toPage is updated.

		toPage = triggerData.toPage;

		// Set the isPageTransitioning flag to prevent any requests from
		// entering this method while we are in the midst of loading a page
		// or transitioning.

		isPageTransitioning = true;

		// If the caller passed us a url, call loadPage()
		// to make sure it is loaded into the DOM. We'll listen
		// to the promise object it returns so we know when
		// it is done loading or if an error ocurred.
		if ( typeof toPage == "string" ) {
			$.mobile.loadPage( toPage, settings )
				.done(function( url, options, newPage, dupCachedPage ) {
					isPageTransitioning = false;
					options.duplicateCachedPage = dupCachedPage;
					$.mobile.changePage( newPage, options );
				})
				.fail(function( url, options ) {
					isPageTransitioning = false;

					//clear out the active button state
					removeActiveLinkClass( true );

					//release transition lock so navigation is free again
					releasePageTransitionLock();
					settings.pageContainer.trigger( "pagechangefailed", triggerData );
				});
			return;
		}

		// If we are going to the first-page of the application, we need to make
		// sure settings.dataUrl is set to the application document url. This allows
		// us to avoid generating a document url with an id hash in the case where the
		// first-page of the document has an id attribute specified.
		if ( toPage[ 0 ] === $.mobile.firstPage[ 0 ] && !settings.dataUrl ) {
			settings.dataUrl = documentUrl.hrefNoHash;
		}

		// The caller passed us a real page DOM element. Update our
		// internal state and then trigger a transition to the page.
		var fromPage = settings.fromPage,
			url = ( settings.dataUrl && path.convertUrlToDataUrl( settings.dataUrl ) ) || toPage.jqmData( "url" ),
			// The pageUrl var is usually the same as url, except when url is obscured as a dialog url. pageUrl always contains the file path
			pageUrl = url,
			fileUrl = path.getFilePath( url ),
			active = urlHistory.getActive(),
			activeIsInitialPage = urlHistory.activeIndex === 0,
			historyDir = 0,
			pageTitle = document.title,
			isDialog = settings.role === "dialog" || toPage.jqmData( "role" ) === "dialog";

		// By default, we prevent changePage requests when the fromPage and toPage
		// are the same element, but folks that generate content manually/dynamically
		// and reuse pages want to be able to transition to the same page. To allow
		// this, they will need to change the default value of allowSamePageTransition
		// to true, *OR*, pass it in as an option when they manually call changePage().
		// It should be noted that our default transition animations assume that the
		// formPage and toPage are different elements, so they may behave unexpectedly.
		// It is up to the developer that turns on the allowSamePageTransitiona option
		// to either turn off transition animations, or make sure that an appropriate
		// animation transition is used.
		if( fromPage && fromPage[0] === toPage[0] && !settings.allowSamePageTransition ) {
			isPageTransitioning = false;
			mpc.trigger( "pagechange", triggerData );
			return;
		}

		// We need to make sure the page we are given has already been enhanced.
		enhancePage( toPage, settings.role );

		// If the changePage request was sent from a hashChange event, check to see if the
		// page is already within the urlHistory stack. If so, we'll assume the user hit
		// the forward/back button and will try to match the transition accordingly.
		if( settings.fromHashChange ) {
			urlHistory.directHashChange({
				currentUrl:	url,
				isBack:		function() { historyDir = -1; },
				isForward:	function() { historyDir = 1; }
			});
		}

		// Kill the keyboard.
		// XXX_jblas: We need to stop crawling the entire document to kill focus. Instead,
		//            we should be tracking focus with a live() handler so we already have
		//            the element in hand at this point.
		// Wrap this in a try/catch block since IE9 throw "Unspecified error" if document.activeElement
		// is undefined when we are in an IFrame.
		try {
			if(document.activeElement && document.activeElement.nodeName.toLowerCase() != 'body') {
				$(document.activeElement).blur();
			} else {
				$( "input:focus, textarea:focus, select:focus" ).blur();
			}
		} catch(e) {}

		// If we're displaying the page as a dialog, we don't want the url
		// for the dialog content to be used in the hash. Instead, we want
		// to append the dialogHashKey to the url of the current page.
		if ( isDialog && active ) {
			// on the initial page load active.url is undefined and in that case should
			// be an empty string. Moving the undefined -> empty string back into
			// urlHistory.addNew seemed imprudent given undefined better represents
			// the url state
			url = ( active.url || "" ) + dialogHashKey;
		}

		// Set the location hash.
		if( settings.changeHash !== false && url ) {
			//disable hash listening temporarily
			urlHistory.ignoreNextHashChange = true;
			//update hash and history
			path.set( url );
		}

		// if title element wasn't found, try the page div data attr too
		// If this is a deep-link or a reload ( active === undefined ) then just use pageTitle
		var newPageTitle = ( !active )? pageTitle : toPage.jqmData( "title" ) || toPage.children(":jqmData(role='header')").find(".ui-title" ).getEncodedText();
		if( !!newPageTitle && pageTitle == document.title ) {
			pageTitle = newPageTitle;
		}
		if ( !toPage.jqmData( "title" ) ) {
			toPage.jqmData( "title", pageTitle );
		}

		// Make sure we have a transition defined.
		settings.transition = settings.transition
			|| ( ( historyDir && !activeIsInitialPage ) ? active.transition : undefined )
			|| ( isDialog ? $.mobile.defaultDialogTransition : $.mobile.defaultPageTransition );

		//add page to history stack if it's not back or forward
		if( !historyDir ) {
			urlHistory.addNew( url, settings.transition, pageTitle, pageUrl, settings.role );
		}

		//set page title
		document.title = urlHistory.getActive().title;

		//set "toPage" as activePage
		$.mobile.activePage = toPage;

		// If we're navigating back in the URL history, set reverse accordingly.
		settings.reverse = settings.reverse || historyDir < 0;

		transitionPages( toPage, fromPage, settings.transition, settings.reverse )
			.done(function() {
				removeActiveLinkClass();

				//if there's a duplicateCachedPage, remove it from the DOM now that it's hidden
				if ( settings.duplicateCachedPage ) {
					settings.duplicateCachedPage.remove();
				}

				//remove initial build class (only present on first pageshow)
				$html.removeClass( "ui-mobile-rendering" );

				releasePageTransitionLock();

				// Let listeners know we're all done changing the current page.
				mpc.trigger( "pagechange", triggerData );
			});
	};

	$.mobile.changePage.defaults = {
		transition: undefined,
		reverse: false,
		changeHash: true,
		fromHashChange: false,
		role: undefined, // By default we rely on the role defined by the @data-role attribute.
		duplicateCachedPage: undefined,
		pageContainer: undefined,
		showLoadMsg: true, //loading message shows by default when pages are being fetched during changePage
		dataUrl: undefined,
		fromPage: undefined,
		allowSamePageTransition: false
	};

/* Event Bindings - hashchange, submit, and click */
	function findClosestLink( ele )
	{
		while ( ele ) {
			// Look for the closest element with a nodeName of "a".
			// Note that we are checking if we have a valid nodeName
			// before attempting to access it. This is because the
			// node we get called with could have originated from within
			// an embedded SVG document where some symbol instance elements
			// don't have nodeName defined on them, or strings are of type
			// SVGAnimatedString.
			if ( ( typeof ele.nodeName === "string" ) && ele.nodeName.toLowerCase() == "a" ) {
				break;
			}
			ele = ele.parentNode;
		}
		return ele;
	}

	// The base URL for any given element depends on the page it resides in.
	function getClosestBaseUrl( ele )
	{
		// Find the closest page and extract out its url.
		var url = $( ele ).closest( ".ui-page" ).jqmData( "url" ),
			base = documentBase.hrefNoHash;

		if ( !url || !path.isPath( url ) ) {
			url = base;
		}

		return path.makeUrlAbsolute( url, base);
	}


	//The following event bindings should be bound after mobileinit has been triggered
	//the following function is called in the init file
	$.mobile._registerInternalEvents = function(){

		//bind to form submit events, handle with Ajax
		$( "form" ).live('submit', function( event ) {
			var $this = $( this );
			if( !$.mobile.ajaxEnabled ||
				$this.is( ":jqmData(ajax='false')" ) ) {
					return;
				}

			var type = $this.attr( "method" ),
				target = $this.attr( "target" ),
				url = $this.attr( "action" );

			// If no action is specified, browsers default to using the
			// URL of the document containing the form. Since we dynamically
			// pull in pages from external documents, the form should submit
			// to the URL for the source document of the page containing
			// the form.
			if ( !url ) {
				// Get the @data-url for the page containing the form.
				url = getClosestBaseUrl( $this );
				if ( url === documentBase.hrefNoHash ) {
					// The url we got back matches the document base,
					// which means the page must be an internal/embedded page,
					// so default to using the actual document url as a browser
					// would.
					url = documentUrl.hrefNoSearch;
				}
			}

			url = path.makeUrlAbsolute(  url, getClosestBaseUrl($this) );

			//external submits use regular HTTP
			if( path.isExternal( url ) || target ) {
				return;
			}

			$.mobile.changePage(
				url,
				{
					type:		type && type.length && type.toLowerCase() || "get",
					data:		$this.serialize(),
					transition:	$this.jqmData( "transition" ),
					direction:	$this.jqmData( "direction" ),
					reloadPage:	true
				}
			);
			event.preventDefault();
		});

		//add active state on vclick
		$( document ).bind( "vclick", function( event ) {
			// if this isn't a left click we don't care. Its important to note
			// that when the virtual event is generated it will create
			if ( event.which > 1 || !$.mobile.linkBindingEnabled ){
				return;
			}

			var link = findClosestLink( event.target );
			if ( link ) {
				if ( path.parseUrl( link.getAttribute( "href" ) || "#" ).hash !== "#" ) {
					removeActiveLinkClass( true );
					$activeClickedLink = $( link ).closest( ".ui-btn" ).not( ".ui-disabled" );
					$activeClickedLink.addClass( $.mobile.activeBtnClass );
					$( "." + $.mobile.activePageClass + " .ui-btn" ).not( link ).blur();
				}
			}
		});

		// click routing - direct to HTTP or Ajax, accordingly
		$( document ).bind( "click", function( event ) {
			if( !$.mobile.linkBindingEnabled ){
				return;
			}

			var link = findClosestLink( event.target );

			// If there is no link associated with the click or its not a left
			// click we want to ignore the click
			if ( !link || event.which > 1) {
				return;
			}

			var $link = $( link ),
				//remove active link class if external (then it won't be there if you come back)
				httpCleanup = function(){
					window.setTimeout( function() { removeActiveLinkClass( true ); }, 200 );
				};

			//if there's a data-rel=back attr, go back in history
			if( $link.is( ":jqmData(rel='back')" ) ) {
				window.history.back();
				return false;
			}

			var baseUrl = getClosestBaseUrl( $link ),

				//get href, if defined, otherwise default to empty hash
				href = path.makeUrlAbsolute( $link.attr( "href" ) || "#", baseUrl );

			//if ajax is disabled, exit early
			if( !$.mobile.ajaxEnabled && !path.isEmbeddedPage( href ) ){
				httpCleanup();
				//use default click handling
				return;
			}

			// XXX_jblas: Ideally links to application pages should be specified as
			//            an url to the application document with a hash that is either
			//            the site relative path or id to the page. But some of the
			//            internal code that dynamically generates sub-pages for nested
			//            lists and select dialogs, just write a hash in the link they
			//            create. This means the actual URL path is based on whatever
			//            the current value of the base tag is at the time this code
			//            is called. For now we are just assuming that any url with a
			//            hash in it is an application page reference.
			if ( href.search( "#" ) != -1 ) {
				href = href.replace( /[^#]*#/, "" );
				if ( !href ) {
					//link was an empty hash meant purely
					//for interaction, so we ignore it.
					event.preventDefault();
					return;
				} else if ( path.isPath( href ) ) {
					//we have apath so make it the href we want to load.
					href = path.makeUrlAbsolute( href, baseUrl );
				} else {
					//we have a simple id so use the documentUrl as its base.
					href = path.makeUrlAbsolute( "#" + href, documentUrl.hrefNoHash );
				}
			}

				// Should we handle this link, or let the browser deal with it?
			var useDefaultUrlHandling = $link.is( "[rel='external']" ) || $link.is( ":jqmData(ajax='false')" ) || $link.is( "[target]" ),

				// Some embedded browsers, like the web view in Phone Gap, allow cross-domain XHR
				// requests if the document doing the request was loaded via the file:// protocol.
				// This is usually to allow the application to "phone home" and fetch app specific
				// data. We normally let the browser handle external/cross-domain urls, but if the
				// allowCrossDomainPages option is true, we will allow cross-domain http/https
				// requests to go through our page loading logic.
				isCrossDomainPageLoad = ( $.mobile.allowCrossDomainPages && documentUrl.protocol === "file:" && href.search( /^https?:/ ) != -1 ),

				//check for protocol or rel and its not an embedded page
				//TODO overlap in logic from isExternal, rel=external check should be
				//     moved into more comprehensive isExternalLink
				isExternal = useDefaultUrlHandling || ( path.isExternal( href ) && !isCrossDomainPageLoad );

			if( isExternal ) {
				httpCleanup();
				//use default click handling
				return;
			}

			//use ajax
			var transition = $link.jqmData( "transition" ),
				direction = $link.jqmData( "direction" ),
				reverse = ( direction && direction === "reverse" ) ||
							// deprecated - remove by 1.0
							$link.jqmData( "back" ),

				//this may need to be more specific as we use data-rel more
				role = $link.attr( "data-" + $.mobile.ns + "rel" ) || undefined;

			$.mobile.changePage( href, { transition: transition, reverse: reverse, role: role } );
			event.preventDefault();
		});

		//prefetch pages when anchors with data-prefetch are encountered
		$( ".ui-page" ).live( "pageshow.prefetch", function() {
			var urls = [];
			$( this ).find( "a:jqmData(prefetch)" ).each(function(){
				var $link = $(this),
					url = $link.attr( "href" );

				if ( url && $.inArray( url, urls ) === -1 ) {
					urls.push( url );

					$.mobile.loadPage( url, {role: $link.attr("data-" + $.mobile.ns + "rel")} );
				}
			});
		});

		$.mobile._handleHashChange = function( hash ) {
			//find first page via hash
			var to = path.stripHash( hash ),
				//transition is false if it's the first page, undefined otherwise (and may be overridden by default)
				transition = $.mobile.urlHistory.stack.length === 0 ? "none" : undefined,

				// default options for the changPage calls made after examining the current state
				// of the page and the hash
				changePageOptions = {
					transition: transition,
					changeHash: false,
					fromHashChange: true
				};

			//if listening is disabled (either globally or temporarily), or it's a dialog hash
			if( !$.mobile.hashListeningEnabled || urlHistory.ignoreNextHashChange ) {
				urlHistory.ignoreNextHashChange = false;
				return;
			}

			// special case for dialogs
			if( urlHistory.stack.length > 1 && to.indexOf( dialogHashKey ) > -1 ) {

				// If current active page is not a dialog skip the dialog and continue
				// in the same direction
				if(!$.mobile.activePage.is( ".ui-dialog" )) {
					//determine if we're heading forward or backward and continue accordingly past
					//the current dialog
					urlHistory.directHashChange({
						currentUrl: to,
						isBack: function() { window.history.back(); },
						isForward: function() { window.history.forward(); }
					});

					// prevent changePage()
					return;
				} else {
					// if the current active page is a dialog and we're navigating
					// to a dialog use the dialog objected saved in the stack
					urlHistory.directHashChange({
						currentUrl: to,

						// regardless of the direction of the history change
						// do the following
						either: function( isBack ) {
							var active = $.mobile.urlHistory.getActive();

							to = active.pageUrl;

							// make sure to set the role, transition and reversal
							// as most of this is lost by the domCache cleaning
							$.extend( changePageOptions, {
								role: active.role,
								transition:	 active.transition,
								reverse: isBack
							});
						}
					});
				}
			}

			//if to is defined, load it
			if ( to ) {
				// At this point, 'to' can be one of 3 things, a cached page element from
				// a history stack entry, an id, or site-relative/absolute URL. If 'to' is
				// an id, we need to resolve it against the documentBase, not the location.href,
				// since the hashchange could've been the result of a forward/backward navigation
				// that crosses from an external page/dialog to an internal page/dialog.
				to = ( typeof to === "string" && !path.isPath( to ) ) ? ( path.makeUrlAbsolute( '#' + to, documentBase ) ) : to;
				$.mobile.changePage( to, changePageOptions );
			}	else {
				//there's no hash, go to the first page in the dom
				$.mobile.changePage( $.mobile.firstPage, changePageOptions );
			}
		};

		//hashchange event handler
		$window.bind( "hashchange", function( e, triggered ) {
			$.mobile._handleHashChange( location.hash );
		});

		//set page min-heights to be device specific
		//$( document ).bind( "pageshow", resetActivePageHeight );
		//$( window ).bind( "throttledresize", resetActivePageHeight );

	};//_registerInternalEvents callback

})( jQuery );
/*
* history.pushState support, layered on top of hashchange
*/

( function( $, window ) {
	// For now, let's Monkeypatch this onto the end of $.mobile._registerInternalEvents
	// Scope self to pushStateHandler so we can reference it sanely within the
	// methods handed off as event handlers
	var	pushStateHandler = {},
		self = pushStateHandler,
		$win = $( window ),
		url = $.mobile.path.parseUrl( location.href );

	$.extend( pushStateHandler, {
		// TODO move to a path helper, this is rather common functionality
		initialFilePath: (function() {
			return url.pathname + url.search;
		})(),

		initialHref: url.hrefNoHash,

		// Flag for tracking if a Hashchange naturally occurs after each popstate + replace
		hashchangeFired: false,

		state: function() {
			return {
				hash: location.hash || "#" + self.initialFilePath,
				title: document.title,

				// persist across refresh
				initialHref: self.initialHref
			};
		},

		resetUIKeys: function( url ) {
			var dialog = $.mobile.dialogHashKey,
				subkey = "&" + $.mobile.subPageUrlKey,
				dialogIndex = url.indexOf( dialog );

			if( dialogIndex > -1 ) {
				url = url.slice( 0, dialogIndex ) + "#" + url.slice( dialogIndex );
			} else if( url.indexOf( subkey ) > -1 ) {
				url = url.split( subkey ).join( "#" + subkey );
			}

			return url;
		},

		// TODO sort out a single barrier to hashchange functionality
		nextHashChangePrevented: function( value ) {
			$.mobile.urlHistory.ignoreNextHashChange = value;
			self.onHashChangeDisabled = value;
		},

		// on hash change we want to clean up the url
		// NOTE this takes place *after* the vanilla navigation hash change
		// handling has taken place and set the state of the DOM
		onHashChange: function( e ) {
			// disable this hash change
			if( self.onHashChangeDisabled ){
				return;
			}
			
			var href, state,
				hash = location.hash,
				isPath = $.mobile.path.isPath( hash ),
				resolutionUrl = isPath ? location.href : $.mobile.getDocumentUrl();
			hash = isPath ? hash.replace( "#", "" ) : hash;

			// propulate the hash when its not available
			state = self.state();

			// make the hash abolute with the current href
			href = $.mobile.path.makeUrlAbsolute( hash, resolutionUrl );

			if ( isPath ) {
				href = self.resetUIKeys( href );
			}

			// replace the current url with the new href and store the state
			// Note that in some cases we might be replacing an url with the
			// same url. We do this anyways because we need to make sure that
			// all of our history entries have a state object associated with
			// them. This allows us to work around the case where window.history.back()
			// is called to transition from an external page to an embedded page.
			// In that particular case, a hashchange event is *NOT* generated by the browser.
			// Ensuring each history entry has a state object means that onPopState()
			// will always trigger our hashchange callback even when a hashchange event
			// is not fired.
			history.replaceState( state, document.title, href );
		},

		// on popstate (ie back or forward) we need to replace the hash that was there previously
		// cleaned up by the additional hash handling
		onPopState: function( e ) {
			var poppedState = e.originalEvent.state, holdnexthashchange = false;

			// if there's no state its not a popstate we care about, ie chrome's initial popstate
			// or forward popstate
			if( poppedState ) {
				// disable any hashchange triggered by the browser
				self.nextHashChangePrevented( true );

				// defer our manual hashchange until after the browser fired
				// version has come and gone
				setTimeout(function() {
					// make sure that the manual hash handling takes place
					self.nextHashChangePrevented( false );

					// change the page based on the hash
					$.mobile._handleHashChange( poppedState.hash );
				}, 100);
			}
		},

		init: function() {
			$win.bind( "hashchange", self.onHashChange );

			// Handle popstate events the occur through history changes
			$win.bind( "popstate", self.onPopState );

			// if there's no hash, we need to replacestate for returning to home
			if ( location.hash === "" ) {
				history.replaceState( self.state(), document.title, location.href );
			}
		}
	});

	$( function() {
		if( $.mobile.pushStateEnabled && $.support.pushState ){
			pushStateHandler.init();
		}
	});
})( jQuery, this );
/*
* "transitions" plugin - Page change tranistions
*/

(function( $, window, undefined ) {

function css3TransitionHandler( name, reverse, $to, $from ) {

	var deferred = new $.Deferred(),
		reverseClass = reverse ? " reverse" : "",
		viewportClass = "ui-mobile-viewport-transitioning viewport-" + name,
		doneFunc = function() {

			$to.add( $from ).removeClass( "out in reverse " + name );

			if ( $from && $from[ 0 ] !== $to[ 0 ] ) {
				$from.removeClass( $.mobile.activePageClass );
			}

			$to.parent().removeClass( viewportClass );

			deferred.resolve( name, reverse, $to, $from );
		};

	$to.animationComplete( doneFunc );

	$to.parent().addClass( viewportClass );

	if ( $from ) {
		$from.addClass( name + " out" + reverseClass );
	}
	$to.addClass( $.mobile.activePageClass + " " + name + " in" + reverseClass );

	return deferred.promise();
}

// Make our transition handler public.
$.mobile.css3TransitionHandler = css3TransitionHandler;

// If the default transition handler is the 'none' handler, replace it with our handler.
if ( $.mobile.defaultTransitionHandler === $.mobile.noneTransitionHandler ) {
	$.mobile.defaultTransitionHandler = css3TransitionHandler;
}

})( jQuery, this );
/*
* "degradeInputs" plugin - degrades inputs to another type after custom enhancements are made.
*/

(function( $, undefined ) {

$.mobile.page.prototype.options.degradeInputs = {
	color: false,
	date: false,
	datetime: false,
	"datetime-local": false,
	email: false,
	month: false,
	number: false,
	range: "number",
	search: "text",
	tel: false,
	time: false,
	url: false,
	week: false
};


//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){

	var page = $(e.target).closest(':jqmData(role="page")').data("page"), options;

	if( !page ) {
		return;
	}

	options = page.options;

	// degrade inputs to avoid poorly implemented native functionality
	$( e.target ).find( "input" ).not( page.keepNativeSelector() ).each(function() {
		var $this = $( this ),
			type = this.getAttribute( "type" ),
			optType = options.degradeInputs[ type ] || "text";

		if ( options.degradeInputs[ type ] ) {
			var html = $( "<div>" ).html( $this.clone() ).html(),
				// In IE browsers, the type sometimes doesn't exist in the cloned markup, so we replace the closing tag instead
				hasType = html.indexOf( " type=" ) > -1,
				findstr = hasType ? /\s+type=["']?\w+['"]?/ : /\/?>/,
				repstr = " type=\"" + optType + "\" data-" + $.mobile.ns + "type=\"" + type + "\"" + ( hasType ? "" : ">" );

			$this.replaceWith( html.replace( findstr, repstr ) );
		}
	});

});

})( jQuery );/*
* "dialog" plugin.
*/

(function( $, window, undefined ) {

$.widget( "mobile.dialog", $.mobile.widget, {
	options: {
		closeBtnText 	: "Close",
		overlayTheme	: "a",
		initSelector	: ":jqmData(role='dialog')"
	},
	_create: function() {
		var self = this,
			$el = this.element,
			headerCloseButton = $( "<a href='#' data-" + $.mobile.ns + "icon='delete' data-" + $.mobile.ns + "iconpos='notext'>"+ this.options.closeBtnText + "</a>" );

		$el.addClass( "ui-overlay-" + this.options.overlayTheme );

		// Class the markup for dialog styling
		// Set aria role
		$el.attr( "role", "dialog" )
			.addClass( "ui-dialog" )
			.find( ":jqmData(role='header')" )
			.addClass( "ui-corner-top ui-overlay-shadow" )
				.prepend( headerCloseButton )
			.end()
			.find( ":jqmData(role='content'),:jqmData(role='footer')" )
				.addClass( "ui-overlay-shadow" )
				.last()
				.addClass( "ui-corner-bottom" );

		// this must be an anonymous function so that select menu dialogs can replace
		// the close method. This is a change from previously just defining data-rel=back
		// on the button and letting nav handle it
		headerCloseButton.bind( "vclick", function() {
			self.close();
		});

		/* bind events
			- clicks and submits should use the closing transition that the dialog opened with
			  unless a data-transition is specified on the link/form
			- if the click was on the close button, or the link has a data-rel="back" it'll go back in history naturally
		*/
		$el.bind( "vclick submit", function( event ) {
			var $target = $( event.target ).closest( event.type === "vclick" ? "a" : "form" ),
				active;

			if ( $target.length && !$target.jqmData( "transition" ) ) {

				active = $.mobile.urlHistory.getActive() || {};

				$target.attr( "data-" + $.mobile.ns + "transition", ( active.transition || $.mobile.defaultDialogTransition ) )
					.attr( "data-" + $.mobile.ns + "direction", "reverse" );
			}
		})
		.bind( "pagehide", function() {
			$( this ).find( "." + $.mobile.activeBtnClass ).removeClass( $.mobile.activeBtnClass );
		});
	},

	// Close method goes back in history
	close: function() {
		window.history.back();
	}
});

//auto self-init widgets
$( $.mobile.dialog.prototype.options.initSelector ).live( "pagecreate", function(){
	$( this ).dialog();
});

})( jQuery, this );
/*
* This plugin handles theming and layout of headers, footers, and content areas
*/

(function( $, undefined ) {

$.mobile.page.prototype.options.backBtnText  = "Back";
$.mobile.page.prototype.options.addBackBtn   = false;
$.mobile.page.prototype.options.backBtnTheme = null;
$.mobile.page.prototype.options.headerTheme  = "a";
$.mobile.page.prototype.options.footerTheme  = "a";
$.mobile.page.prototype.options.contentTheme = null;

$( ":jqmData(role='page'), :jqmData(role='dialog')" ).live( "pagecreate", function( e ) {
	
	var $page = $( this ),
		o = $page.data( "page" ).options,
		pageRole = $page.jqmData( "role" ),
		pageTheme = o.theme;
	
	$( ":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')", this ).each(function() {
		var $this = $( this ),
			role = $this.jqmData( "role" ),
			theme = $this.jqmData( "theme" ),
			contentTheme = theme || o.contentTheme || ( pageRole === "dialog" && pageTheme ),
			$headeranchors,
			leftbtn,
			rightbtn,
			backBtn;
			
		$this.addClass( "ui-" + role );	

		//apply theming and markup modifications to page,header,content,footer
		if ( role === "header" || role === "footer" ) {
			
			var thisTheme = theme || ( role === "header" ? o.headerTheme : o.footerTheme ) || pageTheme;

			$this
				//add theme class
				.addClass( "ui-bar-" + thisTheme )
				// Add ARIA role
				.attr( "role", role === "header" ? "banner" : "contentinfo" );

			// Right,left buttons
			$headeranchors	= $this.children( "a" );
			leftbtn	= $headeranchors.hasClass( "ui-btn-left" );
			rightbtn = $headeranchors.hasClass( "ui-btn-right" );

			leftbtn = leftbtn || $headeranchors.eq( 0 ).not( ".ui-btn-right" ).addClass( "ui-btn-left" ).length;
			
			rightbtn = rightbtn || $headeranchors.eq( 1 ).addClass( "ui-btn-right" ).length;
			
			// Auto-add back btn on pages beyond first view
			if ( o.addBackBtn && 
				role === "header" &&
				$( ".ui-page" ).length > 1 &&
				$this.jqmData( "url" ) !== $.mobile.path.stripHash( location.hash ) &&
				!leftbtn ) {

				backBtn = $( "<a href='#' class='ui-btn-left' data-"+ $.mobile.ns +"rel='back' data-"+ $.mobile.ns +"icon='arrow-l'>"+ o.backBtnText +"</a>" )
					// If theme is provided, override default inheritance
					.attr( "data-"+ $.mobile.ns +"theme", o.backBtnTheme || thisTheme )
					.prependTo( $this );				
			}

			// Page title
			$this.children( "h1, h2, h3, h4, h5, h6" )
				.addClass( "ui-title" )
				// Regardless of h element number in src, it becomes h1 for the enhanced page
				.attr({
					"tabindex": "0",
					"role": "heading",
					"aria-level": "1"
				});

		} else if ( role === "content" ) {
			if ( contentTheme ) {
			    $this.addClass( "ui-body-" + ( contentTheme ) );
			}

			// Add ARIA role
			$this.attr( "role", "main" );
		}
	});
});

})( jQuery );/*
* "collapsible" plugin
*/

(function( $, undefined ) {

$.widget( "mobile.collapsible", $.mobile.widget, {
	options: {
		expandCueText: " click to expand contents",
		collapseCueText: " click to collapse contents",
		collapsed: true,
		heading: "h1,h2,h3,h4,h5,h6,legend",
		theme: null,
		contentTheme: null,
		iconTheme: "d",
		initSelector: ":jqmData(role='collapsible')"
	},
	_create: function() {

		var $el = this.element,
			o = this.options,
			collapsible = $el.addClass( "ui-collapsible" ),
			collapsibleHeading = $el.children( o.heading ).first(),
			collapsibleContent = collapsible.wrapInner( "<div class='ui-collapsible-content'></div>" ).find( ".ui-collapsible-content" ),
			collapsibleSet = $el.closest( ":jqmData(role='collapsible-set')" ).addClass( "ui-collapsible-set" ),
			collapsiblesInSet = collapsibleSet.children( ":jqmData(role='collapsible')" );

		// Replace collapsibleHeading if it's a legend
		if ( collapsibleHeading.is( "legend" ) ) {
			collapsibleHeading = $( "<div role='heading'>"+ collapsibleHeading.html() +"</div>" ).insertBefore( collapsibleHeading );
			collapsibleHeading.next().remove();
		}

		// If we are in a collapsible set
		if ( collapsibleSet.length ) {
			// Inherit the theme from collapsible-set
			if ( !o.theme ) {
				o.theme = collapsibleSet.jqmData( "theme" );
			}
			// Inherit the content-theme from collapsible-set
			if ( !o.contentTheme ) {
				o.contentTheme = collapsibleSet.jqmData( "content-theme" );
			}
		}

		collapsibleContent.addClass( ( o.contentTheme ) ? ( "ui-body-" + o.contentTheme ) : "");

		collapsibleHeading
			//drop heading in before content
			.insertBefore( collapsibleContent )
			//modify markup & attributes
			.addClass( "ui-collapsible-heading" )
			.append( "<span class='ui-collapsible-heading-status'></span>" )
			.wrapInner( "<a href='#' class='ui-collapsible-heading-toggle'></a>" )
			.find( "a" )
				.first()
				.buttonMarkup({
					shadow: false,
					corners: false,
					iconPos: "left",
					icon: "plus",
					theme: o.theme
				});

		if ( !collapsibleSet.length ) {
			collapsibleHeading
				.find( "a" ).first().add( collapsibleHeading.find( ".ui-btn-inner" ) )
					.addClass( "ui-corner-top ui-corner-bottom" );
		} else {
			// If we are in a collapsible set

			// Initialize the collapsible set if it's not already initialized
			if ( !collapsibleSet.jqmData( "collapsiblebound" ) ) {

				collapsibleSet
					.jqmData( "collapsiblebound", true )
					.bind( "expand", function( event ) {

						$( event.target )
							.closest( ".ui-collapsible" )
							.siblings( ".ui-collapsible" )
							.trigger( "collapse" );

					});
			}

			collapsiblesInSet.first()
				.find( "a" )
					.first()
					.addClass( "ui-corner-top" )
						.find( ".ui-btn-inner" )
							.addClass( "ui-corner-top" );

			collapsiblesInSet.last()
				.jqmData( "collapsible-last", true )
				.find( "a" )
					.first()
					.addClass( "ui-corner-bottom" )
						.find( ".ui-btn-inner" )
							.addClass( "ui-corner-bottom" );


			if ( collapsible.jqmData( "collapsible-last" ) ) {
				collapsibleHeading
					.find( "a" ).first().add ( collapsibleHeading.find( ".ui-btn-inner" ) )
						.addClass( "ui-corner-bottom" );
			}
		}

		//events
		collapsible
			.bind( "expand collapse", function( event ) {
				if ( !event.isDefaultPrevented() ) {

					event.preventDefault();

					var $this = $( this ),
						isCollapse = ( event.type === "collapse" ),
					    contentTheme = o.contentTheme;

					collapsibleHeading
						.toggleClass( "ui-collapsible-heading-collapsed", isCollapse)
						.find( ".ui-collapsible-heading-status" )
							.text( isCollapse ? o.expandCueText : o.collapseCueText )
						.end()
						.find( ".ui-icon" )
							.toggleClass( "ui-icon-minus", !isCollapse )
							.toggleClass( "ui-icon-plus", isCollapse );

					$this.toggleClass( "ui-collapsible-collapsed", isCollapse );
					collapsibleContent.toggleClass( "ui-collapsible-content-collapsed", isCollapse ).attr( "aria-hidden", isCollapse );

					if ( contentTheme && ( !collapsibleSet.length || collapsible.jqmData( "collapsible-last" ) ) ) {
						collapsibleHeading
							.find( "a" ).first().add( collapsibleHeading.find( ".ui-btn-inner" ) )
							.toggleClass( "ui-corner-bottom", isCollapse );
						collapsibleContent.toggleClass( "ui-corner-bottom", !isCollapse );
					}
					collapsibleContent.trigger( "updatelayout" );
				}
			})
			.trigger( o.collapsed ? "collapse" : "expand" );

		collapsibleHeading
			.bind( "click", function( event ) {

				var type = collapsibleHeading.is( ".ui-collapsible-heading-collapsed" ) ?
										"expand" : "collapse";

				collapsible.trigger( type );

				event.preventDefault();
			});
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( $.mobile.collapsible.prototype.options.initSelector, e.target ).collapsible();
});

})( jQuery );
/*
* "fieldcontain" plugin - simple class additions to make form row separators
*/

(function( $, undefined ) {

$.fn.fieldcontain = function( options ) {
	return this.addClass( "ui-field-contain ui-body ui-br" );
};

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( ":jqmData(role='fieldcontain')", e.target ).fieldcontain();
});

})( jQuery );/*
* plugin for creating CSS grids
*/

(function( $, undefined ) {

$.fn.grid = function( options ) {
	return this.each(function() {

		var $this = $( this ),
			o = $.extend({
				grid: null
			},options),
			$kids = $this.children(),
			gridCols = {solo:1, a:2, b:3, c:4, d:5},
			grid = o.grid,
			iterator;

			if ( !grid ) {
				if ( $kids.length <= 5 ) {
					for ( var letter in gridCols ) {
						if ( gridCols[ letter ] === $kids.length ) {
							grid = letter;
						}
					}
				} else {
					grid = "a";
				}
			}
			iterator = gridCols[grid];

		$this.addClass( "ui-grid-" + grid );

		$kids.filter( ":nth-child(" + iterator + "n+1)" ).addClass( "ui-block-a" );

		if ( iterator > 1 ) {
			$kids.filter( ":nth-child(" + iterator + "n+2)" ).addClass( "ui-block-b" );
		}
		if ( iterator > 2 ) {
			$kids.filter( ":nth-child(3n+3)" ).addClass( "ui-block-c" );
		}
		if ( iterator > 3 ) {
			$kids.filter( ":nth-child(4n+4)" ).addClass( "ui-block-d" );
		}
		if ( iterator > 4 ) {
			$kids.filter( ":nth-child(5n+5)" ).addClass( "ui-block-e" );
		}
	});
};
})( jQuery );/*
* "navbar" plugin
*/

(function( $, undefined ) {

$.widget( "mobile.navbar", $.mobile.widget, {
	options: {
		iconpos: "top",
		grid: null,
		initSelector: ":jqmData(role='navbar')"
	},

	_create: function(){

		var $navbar = this.element,
			$navbtns = $navbar.find( "a" ),
			iconpos = $navbtns.filter( ":jqmData(icon)" ).length ?
									this.options.iconpos : undefined;

		$navbar.addClass( "ui-navbar" )
			.attr( "role","navigation" )
			.find( "ul" )
				.grid({ grid: this.options.grid });

		if ( !iconpos ) {
			$navbar.addClass( "ui-navbar-noicons" );
		}

		$navbtns.buttonMarkup({
			corners:	false,
			shadow:		false,
			iconpos:	iconpos
		});

		$navbar.delegate( "a", "vclick", function( event ) {
			$navbtns.not( ".ui-state-persist" ).removeClass( $.mobile.activeBtnClass );
			$( this ).addClass( $.mobile.activeBtnClass );
		});
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( $.mobile.navbar.prototype.options.initSelector, e.target ).navbar();
});

})( jQuery );
/*
* "listview" plugin
*/

(function( $, undefined ) {

//Keeps track of the number of lists per page UID
//This allows support for multiple nested list in the same page
//https://github.com/jquery/jquery-mobile/issues/1617
var listCountPerPage = {};

$.widget( "mobile.listview", $.mobile.widget, {
	options: {
		theme: null,
		countTheme: "c",
		headerTheme: "b",
		dividerTheme: "b",
		splitIcon: "arrow-r",
		splitTheme: "b",
		inset: false,
		initSelector: ":jqmData(role='listview')"
	},

	_create: function() {
		var t = this;

		// create listview markup
		t.element.addClass(function( i, orig ) {
			return orig + " ui-listview " + ( t.options.inset ? " ui-listview-inset ui-corner-all ui-shadow " : "" );
		});

		t.refresh( true );
	},

	_removeCorners: function( li, which ) {
		var top = "ui-corner-top ui-corner-tr ui-corner-tl",
			bot = "ui-corner-bottom ui-corner-br ui-corner-bl";

		li = li.add( li.find( ".ui-btn-inner, .ui-li-link-alt, .ui-li-thumb" ) );

		if ( which === "top" ) {
			li.removeClass( top );
		} else if ( which === "bottom" ) {
			li.removeClass( bot );
		} else {
			li.removeClass( top + " " + bot );
		}
	},

	_refreshCorners: function( create ) {
		var $li,
			$visibleli,
			$topli,
			$bottomli;

		if ( this.options.inset ) {
			$li = this.element.children( "li" );
			// at create time the li are not visible yet so we need to rely on .ui-screen-hidden
			$visibleli = create?$li.not( ".ui-screen-hidden" ):$li.filter( ":visible" );

			this._removeCorners( $li );

			// Select the first visible li element
			$topli = $visibleli.first()
				.addClass( "ui-corner-top" );

			$topli.add( $topli.find( ".ui-btn-inner" )
					.not( ".ui-li-link-alt span:first-child" ) )
                                .addClass( "ui-corner-top" )
                                .end()
				.find( ".ui-li-link-alt, .ui-li-link-alt span:first-child" )
					.addClass( "ui-corner-tr" )
				.end()
				.find( ".ui-li-thumb" )
					.not(".ui-li-icon")
					.addClass( "ui-corner-tl" );

			// Select the last visible li element
			$bottomli = $visibleli.last()
				.addClass( "ui-corner-bottom" );

			$bottomli.add( $bottomli.find( ".ui-btn-inner" ) )
				.find( ".ui-li-link-alt" )
					.addClass( "ui-corner-br" )
				.end()
				.find( ".ui-li-thumb" )
					.not(".ui-li-icon")
					.addClass( "ui-corner-bl" );
		}
		if ( !create ) {
			this.element.trigger( "updatelayout" );
		}
	},

	// This is a generic utility method for finding the first
	// node with a given nodeName. It uses basic DOM traversal
	// to be fast and is meant to be a substitute for simple
	// $.fn.closest() and $.fn.children() calls on a single
	// element. Note that callers must pass both the lowerCase
	// and upperCase version of the nodeName they are looking for.
	// The main reason for this is that this function will be
	// called many times and we want to avoid having to lowercase
	// the nodeName from the element every time to ensure we have
	// a match. Note that this function lives here for now, but may
	// be moved into $.mobile if other components need a similar method.
	_findFirstElementByTagName: function( ele, nextProp, lcName, ucName )
	{
		var dict = {};
		dict[ lcName ] = dict[ ucName ] = true;
		while ( ele ) {
			if ( dict[ ele.nodeName ] ) {
				return ele;
			}
			ele = ele[ nextProp ];
		}
		return null;
	},
	_getChildrenByTagName: function( ele, lcName, ucName )
	{
		var results = [],
			dict = {};
		dict[ lcName ] = dict[ ucName ] = true;
		ele = ele.firstChild;
		while ( ele ) {
			if ( dict[ ele.nodeName ] ) {
				results.push( ele );
			}
			ele = ele.nextSibling;
		}
		return $( results );
	},

	_addThumbClasses: function( containers )
	{
		var i, img, len = containers.length;
		for ( i = 0; i < len; i++ ) {
			img = $( this._findFirstElementByTagName( containers[ i ].firstChild, "nextSibling", "img", "IMG" ) );
			if ( img.length ) {
				img.addClass( "ui-li-thumb" );
				$( this._findFirstElementByTagName( img[ 0 ].parentNode, "parentNode", "li", "LI" ) ).addClass( img.is( ".ui-li-icon" ) ? "ui-li-has-icon" : "ui-li-has-thumb" );
			}
		}
	},

	refresh: function( create ) {
		this.parentPage = this.element.closest( ".ui-page" );
		this._createSubPages();

		var o = this.options,
			$list = this.element,
			self = this,
			dividertheme = $list.jqmData( "dividertheme" ) || o.dividerTheme,
			listsplittheme = $list.jqmData( "splittheme" ),
			listspliticon = $list.jqmData( "spliticon" ),
			li = this._getChildrenByTagName( $list[ 0 ], "li", "LI" ),
			counter = $.support.cssPseudoElement || !$.nodeName( $list[ 0 ], "ol" ) ? 0 : 1,
			itemClassDict = {},
			item, itemClass, itemTheme,
			a, last, splittheme, countParent, icon, imgParents, img;

		if ( counter ) {
			$list.find( ".ui-li-dec" ).remove();
		}
		
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( this.element, "c" );
		}

		for ( var pos = 0, numli = li.length; pos < numli; pos++ ) {
			item = li.eq( pos );
			itemClass = "ui-li";

			// If we're creating the element, we update it regardless
			if ( create || !item.hasClass( "ui-li" ) ) {
				itemTheme = item.jqmData("theme") || o.theme;
				a = this._getChildrenByTagName( item[ 0 ], "a", "A" );

				if ( a.length ) {
					icon = item.jqmData("icon");

					item.buttonMarkup({
						wrapperEls: "div",
						shadow: false,
						corners: false,
						iconpos: "right",
						icon: a.length > 1 || icon === false ? false : icon || "arrow-r",
						theme: itemTheme
					});

					if ( ( icon != false ) && ( a.length == 1 ) ) {
						item.addClass( "ui-li-has-arrow" );
					}

					a.first().addClass( "ui-link-inherit" );

					if ( a.length > 1 ) {
						itemClass += " ui-li-has-alt";

						last = a.last();
						splittheme = listsplittheme || last.jqmData( "theme" ) || o.splitTheme;

						last.appendTo(item)
							.attr( "title", last.getEncodedText() )
							.addClass( "ui-li-link-alt" )
							.empty()
							.buttonMarkup({
								shadow: false,
								corners: false,
								theme: itemTheme,
								icon: false,
								iconpos: false
							})
							.find( ".ui-btn-inner" )
								.append(
									$( document.createElement( "span" ) ).buttonMarkup({
										shadow: true,
										corners: true,
										theme: splittheme,
										iconpos: "notext",
										icon: listspliticon || last.jqmData( "icon" ) || o.splitIcon
									})
								);
					}
				} else if ( item.jqmData( "role" ) === "list-divider" ) {

					itemClass += " ui-li-divider ui-btn ui-bar-" + dividertheme;
					item.attr( "role", "heading" );

					//reset counter when a divider heading is encountered
					if ( counter ) {
						counter = 1;
					}

				} else {
					itemClass += " ui-li-static ui-body-" + itemTheme;
				}
			}

			if ( counter && itemClass.indexOf( "ui-li-divider" ) < 0 ) {
				countParent = item.is( ".ui-li-static:first" ) ? item : item.find( ".ui-link-inherit" );

				countParent.addClass( "ui-li-jsnumbering" )
					.prepend( "<span class='ui-li-dec'>" + (counter++) + ". </span>" );
			}

			// Instead of setting item class directly on the list item and its
			// btn-inner at this point in time, push the item into a dictionary
			// that tells us what class to set on it so we can do this after this
			// processing loop is finished.

			if ( !itemClassDict[ itemClass ] ) {
				itemClassDict[ itemClass ] = [];
			}

			itemClassDict[ itemClass ].push( item[ 0 ] );
		}

		// Set the appropriate listview item classes on each list item
		// and their btn-inner elements. The main reason we didn't do this
		// in the for-loop above is because we can eliminate per-item function overhead
		// by calling addClass() and children() once or twice afterwards. This
		// can give us a significant boost on platforms like WP7.5.

		for ( itemClass in itemClassDict ) {
			$( itemClassDict[ itemClass ] ).addClass( itemClass ).children( ".ui-btn-inner" ).addClass( itemClass );
		}

		$list.find( "h1, h2, h3, h4, h5, h6" ).addClass( "ui-li-heading" )
			.end()

			.find( "p, dl" ).addClass( "ui-li-desc" )
			.end()

			.find( ".ui-li-aside" ).each(function() {
					var $this = $(this);
					$this.prependTo( $this.parent() ); //shift aside to front for css float
				})
			.end()

			.find( ".ui-li-count" ).each( function() {
					$( this ).closest( "li" ).addClass( "ui-li-has-count" );
				}).addClass( "ui-btn-up-" + ( $list.jqmData( "counttheme" ) || this.options.countTheme) + " ui-btn-corner-all" );

		// The idea here is to look at the first image in the list item
		// itself, and any .ui-link-inherit element it may contain, so we
		// can place the appropriate classes on the image and list item.
		// Note that we used to use something like:
		//
		//    li.find(">img:eq(0), .ui-link-inherit>img:eq(0)").each( ... );
		//
		// But executing a find() like that on Windows Phone 7.5 took a
		// really long time. Walking things manually with the code below
		// allows the 400 listview item page to load in about 3 seconds as
		// opposed to 30 seconds.

		this._addThumbClasses( li );
		this._addThumbClasses( $list.find( ".ui-link-inherit" ) );

		this._refreshCorners( create );
	},

	//create a string for ID/subpage url creation
	_idStringEscape: function( str ) {
		return str.replace(/[^a-zA-Z0-9]/g, '-');
	},

	_createSubPages: function() {
		var parentList = this.element,
			parentPage = parentList.closest( ".ui-page" ),
			parentUrl = parentPage.jqmData( "url" ),
			parentId = parentUrl || parentPage[ 0 ][ $.expando ],
			parentListId = parentList.attr( "id" ),
			o = this.options,
			dns = "data-" + $.mobile.ns,
			self = this,
			persistentFooterID = parentPage.find( ":jqmData(role='footer')" ).jqmData( "id" ),
			hasSubPages;

		if ( typeof listCountPerPage[ parentId ] === "undefined" ) {
			listCountPerPage[ parentId ] = -1;
		}

		parentListId = parentListId || ++listCountPerPage[ parentId ];

		$( parentList.find( "li>ul, li>ol" ).toArray().reverse() ).each(function( i ) {
			var self = this,
				list = $( this ),
				listId = list.attr( "id" ) || parentListId + "-" + i,
				parent = list.parent(),
				nodeEls = $( list.prevAll().toArray().reverse() ),
				nodeEls = nodeEls.length ? nodeEls : $( "<span>" + $.trim(parent.contents()[ 0 ].nodeValue) + "</span>" ),
				title = nodeEls.first().getEncodedText(),//url limits to first 30 chars of text
				id = ( parentUrl || "" ) + "&" + $.mobile.subPageUrlKey + "=" + listId,
				theme = list.jqmData( "theme" ) || o.theme,
				countTheme = list.jqmData( "counttheme" ) || parentList.jqmData( "counttheme" ) || o.countTheme,
				newPage, anchor;

			//define hasSubPages for use in later removal
			hasSubPages = true;

			newPage = list.detach()
						.wrap( "<div " + dns + "role='page' " +	dns + "url='" + id + "' " + dns + "theme='" + theme + "' " + dns + "count-theme='" + countTheme + "'><div " + dns + "role='content'></div></div>" )
						.parent()
							.before( "<div " + dns + "role='header' " + dns + "theme='" + o.headerTheme + "'><div class='ui-title'>" + title + "</div></div>" )
							.after( persistentFooterID ? $( "<div " + dns + "role='footer' " + dns + "id='"+ persistentFooterID +"'>") : "" )
							.parent()
								.appendTo( $.mobile.pageContainer );

			newPage.page();

			anchor = parent.find('a:first');

			if ( !anchor.length ) {
				anchor = $( "<a/>" ).html( nodeEls || title ).prependTo( parent.empty() );
			}

			anchor.attr( "href", "#" + id );

		}).listview();

		// on pagehide, remove any nested pages along with the parent page, as long as they aren't active
		// and aren't embedded
		if( hasSubPages &&
			parentPage.is( ":jqmData(external-page='true')" ) &&
			parentPage.data("page").options.domCache === false ) {

			var newRemove = function( e, ui ){
				var nextPage = ui.nextPage, npURL;

				if( ui.nextPage ){
					npURL = nextPage.jqmData( "url" );
					if( npURL.indexOf( parentUrl + "&" + $.mobile.subPageUrlKey ) !== 0 ){
						self.childPages().remove();
						parentPage.remove();
					}
				}
			};

			// unbind the original page remove and replace with our specialized version
			parentPage
				.unbind( "pagehide.remove" )
				.bind( "pagehide.remove", newRemove);
		}
	},

	// TODO sort out a better way to track sub pages of the listview this is brittle
	childPages: function(){
		var parentUrl = this.parentPage.jqmData( "url" );

		return $( ":jqmData(url^='"+  parentUrl + "&" + $.mobile.subPageUrlKey +"')");
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( $.mobile.listview.prototype.options.initSelector, e.target ).listview();
});

})( jQuery );
/*
* "listview" filter extension
*/

(function( $, undefined ) {

$.mobile.listview.prototype.options.filter = false;
$.mobile.listview.prototype.options.filterPlaceholder = "Filter items...";
$.mobile.listview.prototype.options.filterTheme = "c";
$.mobile.listview.prototype.options.filterCallback = function( text, searchValue ){
	return text.toLowerCase().indexOf( searchValue ) === -1;
};

$( ":jqmData(role='listview')" ).live( "listviewcreate", function() {

	var list = $( this ),
		listview = list.data( "listview" );

	if ( !listview.options.filter ) {
		return;
	}

	var wrapper = $( "<form>", {
			"class": "ui-listview-filter ui-bar-" + listview.options.filterTheme,
			"role": "search"
		}),
		search = $( "<input>", {
			placeholder: listview.options.filterPlaceholder
		})
		.attr( "data-" + $.mobile.ns + "type", "search" )
		.jqmData( "lastval", "" )
		.bind( "keyup change", function() {

			var $this = $(this),
				val = this.value.toLowerCase(),
				listItems = null,
				lastval = $this.jqmData( "lastval" ) + "",
				childItems = false,
				itemtext = "",
				item, change;

			// Change val as lastval for next execution
			$this.jqmData( "lastval" , val );
			change = val.substr( 0 , lastval.length - 1 ).replace( lastval , "" );

			if ( val.length < lastval.length || change.length != ( val.length - lastval.length ) ) {

				// Removed chars or pasted something totally different, check all items
				listItems = list.children();
			} else {

				// Only chars added, not removed, only use visible subset
				listItems = list.children( ":not(.ui-screen-hidden)" );
			}

			if ( val ) {

				// This handles hiding regular rows without the text we search for
				// and any list dividers without regular rows shown under it

				for ( var i = listItems.length - 1; i >= 0; i-- ) {
					item = $( listItems[ i ] );
					itemtext = item.jqmData( "filtertext" ) || item.text();

					if ( item.is( "li:jqmData(role=list-divider)" ) ) {

						item.toggleClass( "ui-filter-hidequeue" , !childItems );

						// New bucket!
						childItems = false;

					} else if ( listview.options.filterCallback( itemtext, val ) ) {

						//mark to be hidden
						item.toggleClass( "ui-filter-hidequeue" , true );
					} else {

						// There's a shown item in the bucket
						childItems = true;
					}
				}

				// Show items, not marked to be hidden
				listItems
					.filter( ":not(.ui-filter-hidequeue)" )
					.toggleClass( "ui-screen-hidden", false );

				// Hide items, marked to be hidden
				listItems
					.filter( ".ui-filter-hidequeue" )
					.toggleClass( "ui-screen-hidden", true )
					.toggleClass( "ui-filter-hidequeue", false );

			} else {

				//filtervalue is empty => show all
				listItems.toggleClass( "ui-screen-hidden", false );
			}
			listview._refreshCorners();
		})
		.appendTo( wrapper )
		.textinput();

	if ( $( this ).jqmData( "inset" ) ) {
		wrapper.addClass( "ui-listview-filter-inset" );
	}

	wrapper.bind( "submit", function() {
		return false;
	})
	.insertBefore( list );
});

})( jQuery );/*
* "nojs" plugin - class to make elements hidden to A grade browsers
*/

(function( $, undefined ) {

$( document ).bind( "pagecreate create", function( e ){
	$( ":jqmData(role='nojs')", e.target ).addClass( "ui-nojs" );
	
});

})( jQuery );/*
* "checkboxradio" plugin
*/

(function( $, undefined ) {

$.widget( "mobile.checkboxradio", $.mobile.widget, {
	options: {
		theme: null,
		initSelector: "input[type='checkbox'],input[type='radio']"
	},
	_create: function() {
		var self = this,
			input = this.element,
			// NOTE: Windows Phone could not find the label through a selector
			// filter works though.
			label = input.closest( "form,fieldset,:jqmData(role='page')" ).find( "label[for='" + input[ 0 ].id + "']"),
			inputtype = input.attr( "type" ),
			checkedState = inputtype + "-on",
			uncheckedState = inputtype + "-off",
			icon = input.parents( ":jqmData(type='horizontal')" ).length ? undefined : uncheckedState,
			activeBtn = icon ? "" : " " + $.mobile.activeBtnClass,
			checkedClass = "ui-" + checkedState + activeBtn,
			uncheckedClass = "ui-" + uncheckedState,
			checkedicon = "ui-icon-" + checkedState,
			uncheckedicon = "ui-icon-" + uncheckedState;

		if ( inputtype !== "checkbox" && inputtype !== "radio" ) {
			return;
		}

		// Expose for other methods
		$.extend( this, {
			label: label,
			inputtype: inputtype,
			checkedClass: checkedClass,
			uncheckedClass: uncheckedClass,
			checkedicon: checkedicon,
			uncheckedicon: uncheckedicon
		});

		// If there's no selected theme...
		if( !this.options.theme ) {
			this.options.theme = this.element.jqmData( "theme" );
		}

		label.buttonMarkup({
			theme: this.options.theme,
			icon: icon,
			shadow: false
		});

		// Wrap the input + label in a div
		input.add( label )
			.wrapAll( "<div class='ui-" + inputtype + "'></div>" );

		label.bind({
			vmouseover: function( event ) {
				if ( $( this ).parent().is( ".ui-disabled" ) ) {
					event.stopPropagation();
				}
			},

			vclick: function( event ) {
				if ( input.is( ":disabled" ) ) {
					event.preventDefault();
					return;
				}

				self._cacheVals();

				input.prop( "checked", inputtype === "radio" && true || !input.prop( "checked" ) );

				// trigger click handler's bound directly to the input as a substitute for
				// how label clicks behave normally in the browsers
				// TODO: it would be nice to let the browser's handle the clicks and pass them
				//       through to the associate input. we can swallow that click at the parent
				//       wrapper element level
				input.triggerHandler( 'click' );

				// Input set for common radio buttons will contain all the radio
				// buttons, but will not for checkboxes. clearing the checked status
				// of other radios ensures the active button state is applied properly
				self._getInputSet().not( input ).prop( "checked", false );

				self._updateAll();
				return false;
			}

		});

		input
			.bind({
				vmousedown: function() {
					self._cacheVals();
				},

				vclick: function() {
					var $this = $(this);

					// Adds checked attribute to checked input when keyboard is used
					if ( $this.is( ":checked" ) ) {

						$this.prop( "checked", true);
						self._getInputSet().not($this).prop( "checked", false );
					} else {

						$this.prop( "checked", false );
					}

					self._updateAll();
				},

				focus: function() {
					label.addClass( "ui-focus" );
				},

				blur: function() {
					label.removeClass( "ui-focus" );
				}
			});

		this.refresh();
	},

	_cacheVals: function() {
		this._getInputSet().each(function() {
			var $this = $(this);

			$this.jqmData( "cacheVal", $this.is( ":checked" ) );
		});
	},

	//returns either a set of radios with the same name attribute, or a single checkbox
	_getInputSet: function(){
		if(this.inputtype == "checkbox") {
			return this.element;
		}

		return this.element.closest( "form,fieldset,:jqmData(role='page')" )
			.find( "input[name='"+ this.element.attr( "name" ) +"'][type='"+ this.inputtype +"']" );
	},

	_updateAll: function() {
		var self = this;

		this._getInputSet().each(function() {
			var $this = $(this);

			if ( $this.is( ":checked" ) || self.inputtype === "checkbox" ) {
				$this.trigger( "change" );
			}
		})
		.checkboxradio( "refresh" );
	},

	refresh: function() {
		var input = this.element,
			label = this.label,
			icon = label.find( ".ui-icon" );

		// input[0].checked expando doesn't always report the proper value
		// for checked='checked'
		if ( $( input[ 0 ] ).prop( "checked" ) ) {

			label.addClass( this.checkedClass ).removeClass( this.uncheckedClass );
			icon.addClass( this.checkedicon ).removeClass( this.uncheckedicon );

		} else {

			label.removeClass( this.checkedClass ).addClass( this.uncheckedClass );
			icon.removeClass( this.checkedicon ).addClass( this.uncheckedicon );
		}

		if ( input.is( ":disabled" ) ) {
			this.disable();
		} else {
			this.enable();
		}
	},

	disable: function() {
		this.element.prop( "disabled", true ).parent().addClass( "ui-disabled" );
	},

	enable: function() {
		this.element.prop( "disabled", false ).parent().removeClass( "ui-disabled" );
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$.mobile.checkboxradio.prototype.enhanceWithin( e.target );
});

})( jQuery );
/*
* "button" plugin - links that proxy to native input/buttons
*/

(function( $, undefined ) {

$.widget( "mobile.button", $.mobile.widget, {
	options: {
		theme: null,
		icon: null,
		iconpos: null,
		inline: null,
		corners: true,
		shadow: true,
		iconshadow: true,
		initSelector: "button, [type='button'], [type='submit'], [type='reset'], [type='image']"
	},
	_create: function() {
		var $el = this.element,
			o = this.options,
			type,
			name,
			$buttonPlaceholder;

		// Add ARIA role
		this.button = $( "<div></div>" )
			.text( $el.text() || $el.val() )
			.insertBefore( $el )
			.buttonMarkup({
				theme: o.theme,
				icon: o.icon,
				iconpos: o.iconpos,
				inline: o.inline,
				corners: o.corners,
				shadow: o.shadow,
				iconshadow: o.iconshadow
			})
			.append( $el.addClass( "ui-btn-hidden" ) );

		type = $el.attr( "type" );
		name = $el.attr( "name" );

		// Add hidden input during submit if input type="submit" has a name.
		if ( type !== "button" && type !== "reset" && name ) {
				$el.bind( "vclick", function() {
					// Add hidden input if it doesn?�t already exist.
					if( $buttonPlaceholder === undefined ) {
						$buttonPlaceholder = $( "<input>", {
							type: "hidden",
							name: $el.attr( "name" ),
							value: $el.attr( "value" )
						}).insertBefore( $el );

						// Bind to doc to remove after submit handling
						$( document ).one("submit", function(){
							$buttonPlaceholder.remove();

							// reset the local var so that the hidden input
							// will be re-added on subsequent clicks
							$buttonPlaceholder = undefined;
						});
					}
				});
		}

		this.refresh();
	},

	enable: function() {
		this.element.attr( "disabled", false );
		this.button.removeClass( "ui-disabled" ).attr( "aria-disabled", false );
		return this._setOption( "disabled", false );
	},

	disable: function() {
		this.element.attr( "disabled", true );
		this.button.addClass( "ui-disabled" ).attr( "aria-disabled", true );
		return this._setOption( "disabled", true );
	},

	refresh: function() {
		var $el = this.element;

		if ( $el.prop("disabled") ) {
			this.disable();
		} else {
			this.enable();
		}

		// the textWrapper is stored as a data element on the button object
		// to prevent referencing by it's implementation details (eg 'class')
		this.button.data( 'textWrapper' ).text( $el.text() || $el.val() );
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$.mobile.button.prototype.enhanceWithin( e.target );
});

})( jQuery );/*
* "slider" plugin
*/

( function( $, undefined ) {

$.widget( "mobile.slider", $.mobile.widget, {
	options: {
		theme: null,
		trackTheme: null,
		disabled: false,
		initSelector: "input[type='range'], :jqmData(type='range'), :jqmData(role='slider')"
	},

	_create: function() {

		// TODO: Each of these should have comments explain what they're for
		var self = this,

			control = this.element,

			parentTheme = $.mobile.getInheritedTheme( control, "c" ),

			theme = this.options.theme || parentTheme,

			trackTheme = this.options.trackTheme || parentTheme,

			cType = control[ 0 ].nodeName.toLowerCase(),

			selectClass = ( cType == "select" ) ? "ui-slider-switch" : "",

			controlID = control.attr( "id" ),

			labelID = controlID + "-label",

			label = $( "[for='"+ controlID +"']" ).attr( "id", labelID ),

			val = function() {
				return  cType == "input"  ? parseFloat( control.val() ) : control[0].selectedIndex;
			},

			min =  cType == "input" ? parseFloat( control.attr( "min" ) ) : 0,

			max =  cType == "input" ? parseFloat( control.attr( "max" ) ) : control.find( "option" ).length-1,

			step = window.parseFloat( control.attr( "step" ) || 1 ),

			slider = $( "<div class='ui-slider " + selectClass + " ui-btn-down-" + trackTheme +
									" ui-btn-corner-all' role='application'></div>" ),

			handle = $( "<a href='#' class='ui-slider-handle'></a>" )
				.appendTo( slider )
				.buttonMarkup({ corners: true, theme: theme, shadow: true })
				.attr({
					"role": "slider",
					"aria-valuemin": min,
					"aria-valuemax": max,
					"aria-valuenow": val(),
					"aria-valuetext": val(),
					"title": val(),
					"aria-labelledby": labelID
				}),
			options;

		$.extend( this, {
			slider: slider,
			handle: handle,
			dragging: false,
			beforeStart: null,
			userModified: false,
			mouseMoved: false
		});

		if ( cType == "select" ) {

			slider.wrapInner( "<div class='ui-slider-inneroffset'></div>" );
			
			// make the handle move with a smooth transition
			handle.addClass( "ui-slider-handle-snapping" );

			options = control.find( "option" );

			control.find( "option" ).each(function( i ) {

				var side = !i ? "b":"a",
					corners = !i ? "right" :"left",
					theme = !i ? " ui-btn-down-" + trackTheme :( " " + $.mobile.activeBtnClass );

				$( "<div class='ui-slider-labelbg ui-slider-labelbg-" + side + theme + " ui-btn-corner-" + corners + "'></div>" )
					.prependTo( slider );

				$( "<span class='ui-slider-label ui-slider-label-" + side + theme + " ui-btn-corner-" + corners + "' role='img'>" + $( this ).getEncodedText() + "</span>" )
					.prependTo( handle );
			});

		}

		label.addClass( "ui-slider" );

		// monitor the input for updated values
		control.addClass( cType === "input" ? "ui-slider-input" : "ui-slider-switch" )
			.change( function() {
				// if the user dragged the handle, the "change" event was triggered from inside refresh(); don't call refresh() again
				if (!self.mouseMoved) {
					self.refresh( val(), true );
				}
			})
			.keyup( function() { // necessary?
				self.refresh( val(), true, true );
			})
			.blur( function() {
				self.refresh( val(), true );
			});

		// prevent screen drag when slider activated
		$( document ).bind( "vmousemove", function( event ) {
			if ( self.dragging ) {
				// self.mouseMoved must be updated before refresh() because it will be used in the control "change" event
				self.mouseMoved = true;
				
				if ( cType === "select" ) {
					// make the handle move in sync with the mouse
					handle.removeClass( "ui-slider-handle-snapping" );
				}
				
				self.refresh( event );
				
				// only after refresh() you can calculate self.userModified
				self.userModified = self.beforeStart !== control[0].selectedIndex;
				return false;
			}
		});

		slider.bind( "vmousedown", function( event ) {
			self.dragging = true;
			self.userModified = false;
			self.mouseMoved = false;

			if ( cType === "select" ) {
				self.beforeStart = control[0].selectedIndex;
			}
			
			self.refresh( event );
			return false;
		});

		slider.add( document )
			.bind( "vmouseup", function() {
				if ( self.dragging ) {

					self.dragging = false;

					if ( cType === "select") {
					
						// make the handle move with a smooth transition
						handle.addClass( "ui-slider-handle-snapping" );
					
						if ( self.mouseMoved ) {
						
							// this is a drag, change the value only if user dragged enough
							if ( self.userModified ) {
								self.refresh( self.beforeStart == 0 ? 1 : 0 );
							}
							else {
								self.refresh( self.beforeStart );
							}
							
						}
						else {
							// this is just a click, change the value
							self.refresh( self.beforeStart == 0 ? 1 : 0 );
						}
						
					}
					
					self.mouseMoved = false;
					
					return false;
				}
			});

		slider.insertAfter( control );

		// NOTE force focus on handle
		this.handle
			.bind( "vmousedown", function() {
				$( this ).focus();
			})
			.bind( "vclick", false );

		this.handle
			.bind( "keydown", function( event ) {
				var index = val();

				if ( self.options.disabled ) {
					return;
				}

				// In all cases prevent the default and mark the handle as active
				switch ( event.keyCode ) {
				 case $.mobile.keyCode.HOME:
				 case $.mobile.keyCode.END:
				 case $.mobile.keyCode.PAGE_UP:
				 case $.mobile.keyCode.PAGE_DOWN:
				 case $.mobile.keyCode.UP:
				 case $.mobile.keyCode.RIGHT:
				 case $.mobile.keyCode.DOWN:
				 case $.mobile.keyCode.LEFT:
					event.preventDefault();

					if ( !self._keySliding ) {
						self._keySliding = true;
						$( this ).addClass( "ui-state-active" );
					}
					break;
				}

				// move the slider according to the keypress
				switch ( event.keyCode ) {
				 case $.mobile.keyCode.HOME:
					self.refresh( min );
					break;
				 case $.mobile.keyCode.END:
					self.refresh( max );
					break;
				 case $.mobile.keyCode.PAGE_UP:
				 case $.mobile.keyCode.UP:
				 case $.mobile.keyCode.RIGHT:
					self.refresh( index + step );
					break;
				 case $.mobile.keyCode.PAGE_DOWN:
				 case $.mobile.keyCode.DOWN:
				 case $.mobile.keyCode.LEFT:
					self.refresh( index - step );
					break;
				}
			}) // remove active mark
			.keyup( function( event ) {
				if ( self._keySliding ) {
					self._keySliding = false;
					$( this ).removeClass( "ui-state-active" );
				}
			});

		this.refresh(undefined, undefined, true);
	},

	refresh: function( val, isfromControl, preventInputUpdate ) {

		if ( this.options.disabled || this.element.attr('disabled')) { 
			this.disable();
		}

		var control = this.element, percent,
			cType = control[0].nodeName.toLowerCase(),
			min = cType === "input" ? parseFloat( control.attr( "min" ) ) : 0,
			max = cType === "input" ? parseFloat( control.attr( "max" ) ) : control.find( "option" ).length - 1;

		if ( typeof val === "object" ) {
			var data = val,
				// a slight tolerance helped get to the ends of the slider
				tol = 8;
			if ( !this.dragging ||
					data.pageX < this.slider.offset().left - tol ||
					data.pageX > this.slider.offset().left + this.slider.width() + tol ) {
				return;
			}
			percent = Math.round( ( ( data.pageX - this.slider.offset().left ) / this.slider.width() ) * 100 );
		} else {
			if ( val == null ) {
				val = cType === "input" ? parseFloat( control.val() ) : control[0].selectedIndex;
			}
			percent = ( parseFloat( val ) - min ) / ( max - min ) * 100;
		}

		if ( isNaN( percent ) ) {
			return;
		}

		if ( percent < 0 ) {
			percent = 0;
		}

		if ( percent > 100 ) {
			percent = 100;
		}

		var newval = Math.round( ( percent / 100 ) * ( max - min ) ) + min;

		if ( newval < min ) {
			newval = min;
		}

		if ( newval > max ) {
			newval = max;
		}

		// Flip the stack of the bg colors
		if ( percent > 60 && cType === "select" ) {
			// TODO: Dead path?
		}
		this.handle.css( "left", percent + "%" );
		this.handle.attr( {
				"aria-valuenow": cType === "input" ? newval : control.find( "option" ).eq( newval ).attr( "value" ),
				"aria-valuetext": cType === "input" ? newval : control.find( "option" ).eq( newval ).getEncodedText(),
				title: newval
			});

		// add/remove classes for flip toggle switch
		if ( cType === "select" ) {
			if ( newval === 0 ) {
				this.slider.addClass( "ui-slider-switch-a" )
					.removeClass( "ui-slider-switch-b" );
			} else {
				this.slider.addClass( "ui-slider-switch-b" )
					.removeClass( "ui-slider-switch-a" );
			}
		}

		if ( !preventInputUpdate ) {
			var valueChanged = false;

			// update control"s value
			if ( cType === "input" ) {
				valueChanged = control.val() !== newval;
				control.val( newval );
			} else {
				valueChanged = control[ 0 ].selectedIndex !== newval;
				control[ 0 ].selectedIndex = newval;
			}
			if ( !isfromControl && valueChanged ) {
				control.trigger( "change" );
			}
		}
	},

	enable: function() {
		this.element.attr( "disabled", false );
		this.slider.removeClass( "ui-disabled" ).attr( "aria-disabled", false );
		return this._setOption( "disabled", false );
	},

	disable: function() {
		this.element.attr( "disabled", true );
		this.slider.addClass( "ui-disabled" ).attr( "aria-disabled", true );
		return this._setOption( "disabled", true );
	}

});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$.mobile.slider.prototype.enhanceWithin( e.target );
});

})( jQuery );
/*
* "textinput" plugin for text inputs, textareas
*/

(function( $, undefined ) {

$.widget( "mobile.textinput", $.mobile.widget, {
	options: {
		theme: null,
		initSelector: "input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type])"
	},

	_create: function() {

		var input = this.element,
			o = this.options,
			theme = o.theme || $.mobile.getInheritedTheme( this.element, "c" ),
			themeclass  = " ui-body-" + theme,
			focusedEl, clearbtn;

		$( "label[for='" + input.attr( "id" ) + "']" ).addClass( "ui-input-text" );

		focusedEl = input.addClass("ui-input-text ui-body-"+ theme );

		// XXX: Temporary workaround for issue 785 (Apple bug 8910589).
		//      Turn off autocorrect and autocomplete on non-iOS 5 devices
		//      since the popup they use can't be dismissed by the user. Note
		//      that we test for the presence of the feature by looking for
		//      the autocorrect property on the input element. We currently
		//      have no test for iOS 5 or newer so we're temporarily using
		//      the touchOverflow support flag for jQM 1.0. Yes, I feel dirty. - jblas
		if ( typeof input[0].autocorrect !== "undefined" && !$.support.touchOverflow ) {
			// Set the attribute instead of the property just in case there
			// is code that attempts to make modifications via HTML.
			input[0].setAttribute( "autocorrect", "off" );
			input[0].setAttribute( "autocomplete", "off" );
		}


		//"search" input widget
		if ( input.is( "[type='search'],:jqmData(type='search')" ) ) {

			focusedEl = input.wrap( "<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield" + themeclass + "'></div>" ).parent();
			clearbtn = $( "<a href='#' class='ui-input-clear' title='clear text'>clear text</a>" )
				.tap(function( event ) {
					input.val( "" ).focus();
					input.trigger( "change" );
					clearbtn.addClass( "ui-input-clear-hidden" );
					event.preventDefault();
				})
				.appendTo( focusedEl )
				.buttonMarkup({
					icon: "delete",
					iconpos: "notext",
					corners: true,
					shadow: true
				});

			function toggleClear() {
				setTimeout(function() {
					clearbtn.toggleClass( "ui-input-clear-hidden", !input.val() );
				}, 0);
			}

			toggleClear();

			input.bind('paste cut keyup focus change blur', toggleClear);

		} else {
			input.addClass( "ui-corner-all ui-shadow-inset" + themeclass );
		}

		input.focus(function() {
				focusedEl.addClass( "ui-focus" );
			})
			.blur(function(){
				focusedEl.removeClass( "ui-focus" );
			});

		// Autogrow
		if ( input.is( "textarea" ) ) {
			var extraLineHeight = 15,
				keyupTimeoutBuffer = 100,
				keyup = function() {
					var scrollHeight = input[ 0 ].scrollHeight,
						clientHeight = input[ 0 ].clientHeight;

					if ( clientHeight < scrollHeight ) {
						input.height(scrollHeight + extraLineHeight);
					}
				},
				keyupTimeout;

			input.keyup(function() {
				clearTimeout( keyupTimeout );
				keyupTimeout = setTimeout( keyup, keyupTimeoutBuffer );
			});

			// Issue 509: the browser is not providing scrollHeight properly until the styles load
			if ( $.trim( input.val() ) ) {
				// bind to the window load to make sure the height is calculated based on BOTH
				// the DOM and CSS
				$( window ).load( keyup );

				// binding to pagechange here ensures that for pages loaded via
				// ajax the height is recalculated without user input
				$( document ).one( "pagechange", keyup );
			}
		}
	},

	disable: function(){
		( this.element.attr( "disabled", true ).is( "[type='search'],:jqmData(type='search')" ) ?
			this.element.parent() : this.element ).addClass( "ui-disabled" );
	},

	enable: function(){
		( this.element.attr( "disabled", false).is( "[type='search'],:jqmData(type='search')" ) ?
			this.element.parent() : this.element ).removeClass( "ui-disabled" );
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$.mobile.textinput.prototype.enhanceWithin( e.target );
});

})( jQuery );
/*
* custom "selectmenu" plugin
*/

(function( $, undefined ) {
	var extendSelect = function( widget ){

		var select = widget.select,
			selectID  = widget.selectID,
			label = widget.label,
			thisPage = widget.select.closest( ".ui-page" ),
			screen = $( "<div>", {"class": "ui-selectmenu-screen ui-screen-hidden"} ).appendTo( thisPage ),
			selectOptions = widget._selectOptions(),
			isMultiple = widget.isMultiple = widget.select[ 0 ].multiple,
			buttonId = selectID + "-button",
			menuId = selectID + "-menu",
			menuPage = $( "<div data-" + $.mobile.ns + "role='dialog' data-" +$.mobile.ns + "theme='"+ widget.options.theme +"' data-" +$.mobile.ns + "overlay-theme='"+ widget.options.overlayTheme +"'>" +
				"<div data-" + $.mobile.ns + "role='header'>" +
				"<div class='ui-title'>" + label.getEncodedText() + "</div>"+
				"</div>"+
				"<div data-" + $.mobile.ns + "role='content'></div>"+
				"</div>" ).appendTo( $.mobile.pageContainer ).page(),

			listbox =  $("<div>", { "class": "ui-selectmenu ui-selectmenu-hidden ui-overlay-shadow ui-corner-all ui-body-" + widget.options.overlayTheme + " " + $.mobile.defaultDialogTransition } ).insertAfter(screen),

			list = $( "<ul>", {
				"class": "ui-selectmenu-list",
				"id": menuId,
				"role": "listbox",
				"aria-labelledby": buttonId
			}).attr( "data-" + $.mobile.ns + "theme", widget.options.theme ).appendTo( listbox ),

			header = $( "<div>", {
				"class": "ui-header ui-bar-" + widget.options.theme
			}).prependTo( listbox ),

			headerTitle = $( "<h1>", {
				"class": "ui-title"
			}).appendTo( header ),

			headerClose = $( "<a>", {
				"text": widget.options.closeText,
				"href": "#",
				"class": "ui-btn-left"
			}).attr( "data-" + $.mobile.ns + "iconpos", "notext" ).attr( "data-" + $.mobile.ns + "icon", "delete" ).appendTo( header ).buttonMarkup(),

			menuPageContent = menuPage.find( ".ui-content" ),

			menuPageClose = menuPage.find( ".ui-header a" );


		$.extend( widget, {
			select: widget.select,
			selectID: selectID,
			buttonId: buttonId,
			menuId: menuId,
			thisPage: thisPage,
			menuPage: menuPage,
			label: label,
			screen: screen,
			selectOptions: selectOptions,
			isMultiple: isMultiple,
			theme: widget.options.theme,
			listbox: listbox,
			list: list,
			header: header,
			headerTitle: headerTitle,
			headerClose: headerClose,
			menuPageContent: menuPageContent,
			menuPageClose: menuPageClose,
			placeholder: "",

			build: function() {
				var self = this;

				// Create list from select, update state
				self.refresh();

				self.select.attr( "tabindex", "-1" ).focus(function() {
					$( this ).blur();
					self.button.focus();
				});

				// Button events
				self.button.bind( "vclick keydown" , function( event ) {
					if ( event.type == "vclick" ||
							 event.keyCode && ( event.keyCode === $.mobile.keyCode.ENTER ||
																	event.keyCode === $.mobile.keyCode.SPACE ) ) {

						self.open();
						event.preventDefault();
					}
				});

				// Events for list items
				self.list.attr( "role", "listbox" )
					.delegate( ".ui-li>a", "focusin", function() {
						$( this ).attr( "tabindex", "0" );
					})
					.delegate( ".ui-li>a", "focusout", function() {
						$( this ).attr( "tabindex", "-1" );
					})
					.delegate( "li:not(.ui-disabled, .ui-li-divider)", "click", function( event ) {

						// index of option tag to be selected
						var oldIndex = self.select[ 0 ].selectedIndex,
							newIndex = self.list.find( "li:not(.ui-li-divider)" ).index( this ),
							option = self._selectOptions().eq( newIndex )[ 0 ];

						// toggle selected status on the tag for multi selects
						option.selected = self.isMultiple ? !option.selected : true;

						// toggle checkbox class for multiple selects
						if ( self.isMultiple ) {
							$( this ).find( ".ui-icon" )
								.toggleClass( "ui-icon-checkbox-on", option.selected )
								.toggleClass( "ui-icon-checkbox-off", !option.selected );
						}

						// trigger change if value changed
						if ( self.isMultiple || oldIndex !== newIndex ) {
							self.select.trigger( "change" );
						}

						//hide custom select for single selects only
						if ( !self.isMultiple ) {
							self.close();
						}

						event.preventDefault();
					})
					.keydown(function( event ) {  //keyboard events for menu items
						var target = $( event.target ),
							li = target.closest( "li" ),
							prev, next;

						// switch logic based on which key was pressed
						switch ( event.keyCode ) {
							// up or left arrow keys
						 case 38:
							prev = li.prev();

							// if there's a previous option, focus it
							if ( prev.length ) {
								target
									.blur()
									.attr( "tabindex", "-1" );

								prev.find( "a" ).first().focus();
							}

							return false;
							break;

							// down or right arrow keys
						 case 40:
							next = li.next();

							// if there's a next option, focus it
							if ( next.length ) {
								target
									.blur()
									.attr( "tabindex", "-1" );

								next.find( "a" ).first().focus();
							}

							return false;
							break;

							// If enter or space is pressed, trigger click
						 case 13:
						 case 32:
							target.trigger( "click" );

							return false;
							break;
						}
					});

				// button refocus ensures proper height calculation
				// by removing the inline style and ensuring page inclusion
				self.menuPage.bind( "pagehide", function() {
					self.list.appendTo( self.listbox );
					self._focusButton();

					// TODO centralize page removal binding / handling in the page plugin.
					// Suggestion from @jblas to do refcounting
					//
					// TODO extremely confusing dependency on the open method where the pagehide.remove
					// bindings are stripped to prevent the parent page from disappearing. The way
					// we're keeping pages in the DOM right now sucks
					//
					// rebind the page remove that was unbound in the open function
					// to allow for the parent page removal from actions other than the use
					// of a dialog sized custom select
					//
					// doing this here provides for the back button on the custom select dialog
					$.mobile._bindPageRemove.call( self.thisPage );
				});

				// Events on "screen" overlay
				self.screen.bind( "vclick", function( event ) {
					self.close();
				});

				// Close button on small overlays
				self.headerClose.click( function() {
					if ( self.menuType == "overlay" ) {
						self.close();
						return false;
					}
				});

				// track this dependency so that when the parent page
				// is removed on pagehide it will also remove the menupage
				self.thisPage.addDependents( this.menuPage );
			},

			_isRebuildRequired: function() {
				var list = this.list.find( "li" ),
					options = this._selectOptions();

				// TODO exceedingly naive method to determine difference
				// ignores value changes etc in favor of a forcedRebuild
				// from the user in the refresh method
				return options.text() !== list.text();
			},

			refresh: function( forceRebuild , foo ){
				var self = this,
				select = this.element,
				isMultiple = this.isMultiple,
				options = this._selectOptions(),
				selected = this.selected(),
				// return an array of all selected index's
				indicies = this.selectedIndices();

				if (  forceRebuild || this._isRebuildRequired() ) {
					self._buildList();
				}

				self.setButtonText();
				self.setButtonCount();

				self.list.find( "li:not(.ui-li-divider)" )
					.removeClass( $.mobile.activeBtnClass )
					.attr( "aria-selected", false )
					.each(function( i ) {

						if ( $.inArray( i, indicies ) > -1 ) {
							var item = $( this );

							// Aria selected attr
							item.attr( "aria-selected", true );

							// Multiple selects: add the "on" checkbox state to the icon
							if ( self.isMultiple ) {
								item.find( ".ui-icon" ).removeClass( "ui-icon-checkbox-off" ).addClass( "ui-icon-checkbox-on" );
							} else {
								item.addClass( $.mobile.activeBtnClass );
							}
						}
					});
			},

			close: function() {
				if ( this.options.disabled || !this.isOpen ) {
					return;
				}

				var self = this;

				if ( self.menuType == "page" ) {
					// doesn't solve the possible issue with calling change page
					// where the objects don't define data urls which prevents dialog key
					// stripping - changePage has incoming refactor
					window.history.back();
				} else {
					self.screen.addClass( "ui-screen-hidden" );
					self.listbox.addClass( "ui-selectmenu-hidden" ).removeAttr( "style" ).removeClass( "in" );
					self.list.appendTo( self.listbox );
					self._focusButton();
				}

				// allow the dialog to be closed again
				self.isOpen = false;
			},

			open: function() {
				if ( this.options.disabled ) {
					return;
				}

				var self = this,
					menuHeight = self.list.parent().outerHeight(),
					menuWidth = self.list.parent().outerWidth(),
					activePage = $( ".ui-page-active" ),
					tOverflow = $.support.touchOverflow && $.mobile.touchOverflowEnabled,
					tScrollElem = activePage.is( ".ui-native-fixed" ) ? activePage.find( ".ui-content" ) : activePage;
					scrollTop = tOverflow ? tScrollElem.scrollTop() : $( window ).scrollTop(),
					btnOffset = self.button.offset().top,
					screenHeight = window.innerHeight,
					screenWidth = window.innerWidth;

				//add active class to button
				self.button.addClass( $.mobile.activeBtnClass );

				//remove after delay
				setTimeout( function() {
					self.button.removeClass( $.mobile.activeBtnClass );
				}, 300);

				function focusMenuItem() {
					self.list.find( $.mobile.activeBtnClass ).focus();
				}

				if ( menuHeight > screenHeight - 80 || !$.support.scrollTop ) {
					// prevent the parent page from being removed from the DOM,
					// otherwise the results of selecting a list item in the dialog
					// fall into a black hole
					self.thisPage.unbind( "pagehide.remove" );

					//for WebOS/Opera Mini (set lastscroll using button offset)
					if ( scrollTop == 0 && btnOffset > screenHeight ) {
						self.thisPage.one( "pagehide", function() {
							$( this ).jqmData( "lastScroll", btnOffset );
						});
					}

					self.menuPage.one( "pageshow", function() {
						// silentScroll() is called whenever a page is shown to restore
						// any previous scroll position the page may have had. We need to
						// wait for the "silentscroll" event before setting focus to avoid
						// the browser"s "feature" which offsets rendering to make sure
						// whatever has focus is in view.
						$( window ).one( "silentscroll", function() {
							focusMenuItem();
						});

						self.isOpen = true;
					});

					self.menuType = "page";
					self.menuPageContent.append( self.list );
					self.menuPage.find("div .ui-title").text(self.label.text());
					$.mobile.changePage( self.menuPage, {
						transition: $.mobile.defaultDialogTransition
					});
				} else {
					self.menuType = "overlay";

					self.screen.height( $(document).height() )
						.removeClass( "ui-screen-hidden" );

					// Try and center the overlay over the button
					var roomtop = btnOffset - scrollTop,
						roombot = scrollTop + screenHeight - btnOffset,
						halfheight = menuHeight / 2,
						maxwidth = parseFloat( self.list.parent().css( "max-width" ) ),
						newtop, newleft;

					if ( roomtop > menuHeight / 2 && roombot > menuHeight / 2 ) {
						newtop = btnOffset + ( self.button.outerHeight() / 2 ) - halfheight;
					} else {
						// 30px tolerance off the edges
						newtop = roomtop > roombot ? scrollTop + screenHeight - menuHeight - 30 : scrollTop + 30;
					}

					// If the menuwidth is smaller than the screen center is
					if ( menuWidth < maxwidth ) {
						newleft = ( screenWidth - menuWidth ) / 2;
					} else {

						//otherwise insure a >= 30px offset from the left
						newleft = self.button.offset().left + self.button.outerWidth() / 2 - menuWidth / 2;

						// 30px tolerance off the edges
						if ( newleft < 30 ) {
							newleft = 30;
						} else if ( (newleft + menuWidth) > screenWidth ) {
							newleft = screenWidth - menuWidth - 30;
						}
					}

					self.listbox.append( self.list )
						.removeClass( "ui-selectmenu-hidden" )
						.css({
							top: newtop,
							left: newleft
						})
						.addClass( "in" );

					focusMenuItem();

					// duplicate with value set in page show for dialog sized selects
					self.isOpen = true;
				}
			},

			_buildList: function() {
				var self = this,
					o = this.options,
					placeholder = this.placeholder,
					optgroups = [],
					lis = [],
					dataIcon = self.isMultiple ? "checkbox-off" : "false";

				self.list.empty().filter( ".ui-listview" ).listview( "destroy" );

				// Populate menu with options from select element
				self.select.find( "option" ).each( function( i ) {
					var $this = $( this ),
						$parent = $this.parent(),
						text = $this.getEncodedText(),
						anchor = "<a href='#'>"+ text +"</a>",
						classes = [],
						extraAttrs = [];

					// Are we inside an optgroup?
					if ( $parent.is( "optgroup" ) ) {
						var optLabel = $parent.attr( "label" );

						// has this optgroup already been built yet?
						if ( $.inArray( optLabel, optgroups ) === -1 ) {
							lis.push( "<li data-" + $.mobile.ns + "role='list-divider'>"+ optLabel +"</li>" );
							optgroups.push( optLabel );
						}
					}

					// Find placeholder text
					// TODO: Are you sure you want to use getAttribute? ^RW
					if ( !this.getAttribute( "value" ) || text.length == 0 || $this.jqmData( "placeholder" ) ) {
						if ( o.hidePlaceholderMenuItems ) {
							classes.push( "ui-selectmenu-placeholder" );
						}
						placeholder = self.placeholder = text;
					}

					// support disabled option tags
					if ( this.disabled ) {
						classes.push( "ui-disabled" );
						extraAttrs.push( "aria-disabled='true'" );
					}

					lis.push( "<li data-" + $.mobile.ns + "option-index='" + i + "' data-" + $.mobile.ns + "icon='"+ dataIcon +"' class='"+ classes.join(" ") + "' " + extraAttrs.join(" ") +">"+ anchor +"</li>" );
				});

				self.list.html( lis.join(" ") );

				self.list.find( "li" )
					.attr({ "role": "option", "tabindex": "-1" })
					.first().attr( "tabindex", "0" );

				// Hide header close link for single selects
				if ( !this.isMultiple ) {
					this.headerClose.hide();
				}

				// Hide header if it's not a multiselect and there's no placeholder
				if ( !this.isMultiple && !placeholder.length ) {
					this.header.hide();
				} else {
					this.headerTitle.text( this.placeholder );
				}

				// Now populated, create listview
				self.list.listview();
			},

			_button: function(){
				return $( "<a>", {
					"href": "#",
					"role": "button",
					// TODO value is undefined at creation
					"id": this.buttonId,
					"aria-haspopup": "true",

					// TODO value is undefined at creation
					"aria-owns": this.menuId
				});
			}
		});
	};

	$( "select" ).live( "selectmenubeforecreate", function(){
		var selectmenuWidget = $( this ).data( "selectmenu" );

		if( !selectmenuWidget.options.nativeMenu ){
			extendSelect( selectmenuWidget );
		}
	});
})( jQuery );
/*
* "selectmenu" plugin
*/

(function( $, undefined ) {

$.widget( "mobile.selectmenu", $.mobile.widget, {
	options: {
		theme: null,
		disabled: false,
		icon: "arrow-d",
		iconpos: "right",
		inline: null,
		corners: true,
		shadow: true,
		iconshadow: true,
		menuPageTheme: "b",
		overlayTheme: "a",
		hidePlaceholderMenuItems: true,
		closeText: "Close",
		nativeMenu: true,
		initSelector: "select:not(:jqmData(role='slider'))"
	},

	_button: function(){
		return $( "<div/>" );
	},

	_setDisabled: function( value ) {
		this.element.attr( "disabled", value );
		this.button.attr( "aria-disabled", value );
		return this._setOption( "disabled", value );
	},

	_focusButton : function() {
		var self = this;

		setTimeout( function() {
			self.button.focus();
		}, 40);
	},

  _selectOptions: function() {
    return this.select.find( "option" );
  },

	// setup items that are generally necessary for select menu extension
	_preExtension: function(){
		this.select = this.element.wrap( "<div class='ui-select'>" );
		this.selectID  = this.select.attr( "id" );
		this.label = $( "label[for='"+ this.selectID +"']" ).addClass( "ui-select" );
		this.isMultiple = this.select[ 0 ].multiple;
		if ( !this.options.theme ) {
			this.options.theme = $.mobile.getInheritedTheme( this.select, "c" );
		}
	},

	_create: function() {
		this._preExtension();

 		// Allows for extension of the native select for custom selects and other plugins
		// see select.custom for example extension
		// TODO explore plugin registration
		this._trigger( "beforeCreate" );

		this.button = this._button();

		var self = this,

			options = this.options,

			// IE throws an exception at options.item() function when
			// there is no selected item
			// select first in this case
			selectedIndex = this.select[ 0 ].selectedIndex == -1 ? 0 : this.select[ 0 ].selectedIndex,

			// TODO values buttonId and menuId are undefined here
			button = this.button
				.text( $( this.select[ 0 ].options.item( selectedIndex ) ).text() )
				.insertBefore( this.select )
				.buttonMarkup( {
					theme: options.theme,
					icon: options.icon,
					iconpos: options.iconpos,
					inline: options.inline,
					corners: options.corners,
					shadow: options.shadow,
					iconshadow: options.iconshadow
				});

		// Opera does not properly support opacity on select elements
		// In Mini, it hides the element, but not its text
		// On the desktop,it seems to do the opposite
		// for these reasons, using the nativeMenu option results in a full native select in Opera
		if ( options.nativeMenu && window.opera && window.opera.version ) {
			this.select.addClass( "ui-select-nativeonly" );
		}

		// Add counter for multi selects
		if ( this.isMultiple ) {
			this.buttonCount = $( "<span>" )
				.addClass( "ui-li-count ui-btn-up-c ui-btn-corner-all" )
				.hide()
				.appendTo( button.addClass('ui-li-has-count') );
		}

		// Disable if specified
		if ( options.disabled || this.element.attr('disabled')) {
			this.disable();
		}

		// Events on native select
		this.select.change( function() {
			self.refresh();
		});

		this.build();
	},

	build: function() {
		var self = this;

		this.select
			.appendTo( self.button )
			.bind( "vmousedown", function() {
				// Add active class to button
				self.button.addClass( $.mobile.activeBtnClass );
			})
			.bind( "focus vmouseover", function() {
				self.button.trigger( "vmouseover" );
			})
			.bind( "vmousemove", function() {
				// Remove active class on scroll/touchmove
				self.button.removeClass( $.mobile.activeBtnClass );
			})
			.bind( "change blur vmouseout", function() {
				self.button.trigger( "vmouseout" )
					.removeClass( $.mobile.activeBtnClass );
			})
			.bind( "change blur", function() {
				self.button.removeClass( "ui-btn-down-" + self.options.theme );
			});
	},

	selected: function() {
		return this._selectOptions().filter( ":selected" );
	},

	selectedIndices: function() {
		var self = this;

		return this.selected().map( function() {
			return self._selectOptions().index( this );
		}).get();
	},

	setButtonText: function() {
		var self = this, selected = this.selected();

		this.button.find( ".ui-btn-text" ).text( function() {
			if ( !self.isMultiple ) {
				return selected.text();
			}

			return selected.length ? selected.map( function() {
				return $( this ).text();
			}).get().join( ", " ) : self.placeholder;
		});
	},

	setButtonCount: function() {
		var selected = this.selected();

		// multiple count inside button
		if ( this.isMultiple ) {
			this.buttonCount[ selected.length > 1 ? "show" : "hide" ]().text( selected.length );
		}
	},

	refresh: function() {
		this.setButtonText();
		this.setButtonCount();
	},

	// open and close preserved in native selects
	// to simplify users code when looping over selects
	open: $.noop,
	close: $.noop,

	disable: function() {
		this._setDisabled( true );
		this.button.addClass( "ui-disabled" );
	},

	enable: function() {
		this._setDisabled( false );
		this.button.removeClass( "ui-disabled" );
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$.mobile.selectmenu.prototype.enhanceWithin( e.target );
});
})( jQuery );
/*
* "buttons" plugin - for making button-like links
*/

( function( $, undefined ) {

$.fn.buttonMarkup = function( options ) {
	options = options || {};

	for ( var i = 0; i < this.length; i++ ) {
		var el = this.eq( i ),
			e = el[ 0 ],
			o = $.extend( {}, $.fn.buttonMarkup.defaults, {
				icon:       options.icon       !== undefined ? options.icon       : el.jqmData( "icon" ),
				iconpos:    options.iconpos    !== undefined ? options.iconpos    : el.jqmData( "iconpos" ),
				theme:      options.theme      !== undefined ? options.theme      : el.jqmData( "theme" ),
				inline:     options.inline     !== undefined ? options.inline     : el.jqmData( "inline" ),
				shadow:     options.shadow     !== undefined ? options.shadow     : el.jqmData( "shadow" ),
				corners:    options.corners    !== undefined ? options.corners    : el.jqmData( "corners" ),
				iconshadow: options.iconshadow !== undefined ? options.iconshadow : el.jqmData( "iconshadow" )
			}, options ),

			// Classes Defined
			innerClass = "ui-btn-inner",
			textClass = "ui-btn-text",
			buttonClass, iconClass,

			// Button inner markup
			buttonInner = document.createElement( o.wrapperEls ),
			buttonText = document.createElement( o.wrapperEls ),
			buttonIcon = o.icon ? document.createElement( "span" ) : null;

		if ( attachEvents ) {
			attachEvents();
		}

		// if not, try to find closest theme container
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( el, "c" );
		}

		buttonClass = "ui-btn ui-btn-up-" + o.theme;

		if ( o.inline ) {
			buttonClass += " ui-btn-inline";
		}

		if ( o.icon ) {
			o.icon = "ui-icon-" + o.icon;
			o.iconpos = o.iconpos || "left";

			iconClass = "ui-icon " + o.icon;

			if ( o.iconshadow ) {
				iconClass += " ui-icon-shadow";
			}
		}

		if ( o.iconpos ) {
			buttonClass += " ui-btn-icon-" + o.iconpos;

			if ( o.iconpos == "notext" && !el.attr( "title" ) ) {
				el.attr( "title", el.getEncodedText() );
			}
		}

		if ( o.corners ) {
			buttonClass += " ui-btn-corner-all";
			innerClass += " ui-btn-corner-all";
		}

		if ( o.shadow ) {
			buttonClass += " ui-shadow";
		}

		e.setAttribute( "data-" + $.mobile.ns + "theme", o.theme );
		el.addClass( buttonClass );

		buttonInner.className = innerClass;
		buttonInner.setAttribute("aria-hidden", "true");

		buttonText.className = textClass;
		buttonInner.appendChild( buttonText );

		if ( buttonIcon ) {
			buttonIcon.className = iconClass;
			buttonInner.appendChild( buttonIcon );
		}

		while ( e.firstChild ) {
			buttonText.appendChild( e.firstChild );
		}

		e.appendChild( buttonInner );
		
		// TODO obviously it would be nice to pull this element out instead of
		// retrieving it from the DOM again, but this change is much less obtrusive
		// and 1.0 draws nigh
		$.data( e, 'textWrapper', $( buttonText ) );
	}

	return this;
};

$.fn.buttonMarkup.defaults = {
	corners: true,
	shadow: true,
	iconshadow: true,
	inline: false,
	wrapperEls: "span"
};

function closestEnabledButton( element ) {
    var cname;

    while ( element ) {
		// Note that we check for typeof className below because the element we
		// handed could be in an SVG DOM where className on SVG elements is defined to
		// be of a different type (SVGAnimatedString). We only operate on HTML DOM
		// elements, so we look for plain "string".

        cname = ( typeof element.className === 'string' ) && element.className.split(' ');

        if ( cname && $.inArray( "ui-btn", cname ) > -1 && $.inArray( "ui-disabled", cname ) < 0 ) {
            break;
        }
        element = element.parentNode;
    }

    return element;
}

var attachEvents = function() {
	$( document ).bind( {
		"vmousedown": function( event ) {
			var btn = closestEnabledButton( event.target ),
				$btn, theme;

			if ( btn ) {
				$btn = $( btn );
				theme = $btn.attr( "data-" + $.mobile.ns + "theme" );
				$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-down-" + theme );
			}
		},
		"vmousecancel vmouseup": function( event ) {
			var btn = closestEnabledButton( event.target ),
				$btn, theme;

			if ( btn ) {
				$btn = $( btn );
				theme = $btn.attr( "data-" + $.mobile.ns + "theme" );
				$btn.removeClass( "ui-btn-down-" + theme ).addClass( "ui-btn-up-" + theme );
			}
		},
		"vmouseover focus": function( event ) {
			var btn = closestEnabledButton( event.target ),
				$btn, theme;

			if ( btn ) {
				$btn = $( btn );
				theme = $btn.attr( "data-" + $.mobile.ns + "theme" );
				$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-hover-" + theme );
			}
		},
		"vmouseout blur": function( event ) {
			var btn = closestEnabledButton( event.target ),
				$btn, theme;

			if ( btn ) {
				$btn = $( btn );
				theme = $btn.attr( "data-" + $.mobile.ns + "theme" );
				$btn.removeClass( "ui-btn-hover-" + theme  + " ui-btn-down-" + theme ).addClass( "ui-btn-up-" + theme );
			}
		}
	});

	attachEvents = null;
};

//links in bars, or those with  data-role become buttons
//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){

	$( ":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a", e.target )
		.not( ".ui-btn, :jqmData(role='none'), :jqmData(role='nojs')" )
		.buttonMarkup();
});

})( jQuery );
/* 
* "controlgroup" plugin - corner-rounding for groups of buttons, checks, radios, etc
*/

(function( $, undefined ) {

$.fn.controlgroup = function( options ) {

	return this.each(function() {

		var $el = $( this ),
			o = $.extend({
						direction: $el.jqmData( "type" ) || "vertical",
						shadow: false,
						excludeInvisible: true
					}, options ),
			groupheading = $el.children( "legend" ),
			flCorners = o.direction == "horizontal" ? [ "ui-corner-left", "ui-corner-right" ] : [ "ui-corner-top", "ui-corner-bottom" ],
			type = $el.find( "input" ).first().attr( "type" );

		// Replace legend with more stylable replacement div
		if ( groupheading.length ) {
			$el.wrapInner( "<div class='ui-controlgroup-controls'></div>" );
			$( "<div role='heading' class='ui-controlgroup-label'>" + groupheading.html() + "</div>" ).insertBefore( $el.children(0) );
			groupheading.remove();
		}

		$el.addClass( "ui-corner-all ui-controlgroup ui-controlgroup-" + o.direction );

		// TODO: This should be moved out to the closure
		// otherwise it is redefined each time controlgroup() is called
		function flipClasses( els ) {
			els.removeClass( "ui-btn-corner-all ui-shadow" )
				.eq( 0 ).addClass( flCorners[ 0 ] )
				.end()
				.last().addClass( flCorners[ 1 ] ).addClass( "ui-controlgroup-last" );
		}

		flipClasses( $el.find( ".ui-btn" + ( o.excludeInvisible ? ":visible" : "" ) ) );
		flipClasses( $el.find( ".ui-btn-inner" ) );

		if ( o.shadow ) {
			$el.addClass( "ui-shadow" );
		}
	});
};

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( ":jqmData(role='controlgroup')", e.target ).controlgroup({ excludeInvisible: false });
});

})(jQuery);/*
* "links" plugin - simple class additions for links
*/

(function( $, undefined ) {

$( document ).bind( "pagecreate create", function( e ){
	
	//links within content areas
	$( e.target )
		.find( "a" )
		.not( ".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')" )
		.addClass( "ui-link" );

});

})( jQuery );/*
* "fixHeaderFooter" plugin - on-demand positioning for headers,footers
*/

(function( $, undefined ) {

var slideDownClass = "ui-header-fixed ui-fixed-inline fade",
	slideUpClass = "ui-footer-fixed ui-fixed-inline fade",

	slideDownSelector = ".ui-header:jqmData(position='fixed')",
	slideUpSelector = ".ui-footer:jqmData(position='fixed')";

$.fn.fixHeaderFooter = function( options ) {

	if ( !$.support.scrollTop || ( $.support.touchOverflow && $.mobile.touchOverflowEnabled ) ) {
		return this;
	}

	return this.each(function() {
		var $this = $( this );

		if ( $this.jqmData( "fullscreen" ) ) {
			$this.addClass( "ui-page-fullscreen" );
		}

		// Should be slidedown
		$this.find( slideDownSelector ).addClass( slideDownClass );

		// Should be slideup
		$this.find( slideUpSelector ).addClass( slideUpClass );
	});
};

// single controller for all showing,hiding,toggling
$.mobile.fixedToolbars = (function() {

	if ( !$.support.scrollTop || ( $.support.touchOverflow && $.mobile.touchOverflowEnabled ) ) {
		return;
	}

	var stickyFooter, delayTimer,
		currentstate = "inline",
		autoHideMode = false,
		showDelay = 100,
		ignoreTargets = "a,input,textarea,select,button,label,.ui-header-fixed,.ui-footer-fixed",
		toolbarSelector = ".ui-header-fixed:first, .ui-footer-fixed:not(.ui-footer-duplicate):last",
		// for storing quick references to duplicate footers
		supportTouch = $.support.touch,
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = supportTouch ? "touchend" : "mouseup",
		stateBefore = null,
		scrollTriggered = false,
		touchToggleEnabled = true;

	function showEventCallback( event ) {
		// An event that affects the dimensions of the visual viewport has
		// been triggered. If the header and/or footer for the current page are in overlay
		// mode, we want to hide them, and then fire off a timer to show them at a later
		// point. Events like a resize can be triggered continuously during a scroll, on
		// some platforms, so the timer is used to delay the actual positioning until the
		// flood of events have subsided.
		//
		// If we are in autoHideMode, we don't do anything because we know the scroll
		// callbacks for the plugin will fire off a show when the scrolling has stopped.
		if ( !autoHideMode && currentstate === "overlay" ) {
			if ( !delayTimer ) {
				$.mobile.fixedToolbars.hide( true );
			}

			$.mobile.fixedToolbars.startShowTimer();
		}
	}

	$(function() {
		var $document = $( document ),
			$window = $( window );

		$document
			.bind( "vmousedown", function( event ) {
				if ( touchToggleEnabled ) {
					stateBefore = currentstate;
				}
			})
			.bind( "vclick", function( event ) {
				if ( touchToggleEnabled ) {

					if ( $(event.target).closest( ignoreTargets ).length ) {
						return;
					}

					if ( !scrollTriggered ) {
						$.mobile.fixedToolbars.toggle( stateBefore );
						stateBefore = null;
					}
				}
			})
			.bind( "silentscroll", showEventCallback );


		// The below checks first for a $(document).scrollTop() value, and if zero, binds scroll events to $(window) instead.
		// If the scrollTop value is actually zero, both will return zero anyway.
		//
		// Works with $(document), not $(window) : Opera Mobile (WinMO phone; kinda broken anyway)
		// Works with $(window), not $(document) : IE 7/8
		// Works with either $(window) or $(document) : Chrome, FF 3.6/4, Android 1.6/2.1, iOS
		// Needs work either way : BB5, Opera Mobile (iOS)

		( ( $document.scrollTop() === 0 ) ? $window : $document )
			.bind( "scrollstart", function( event ) {

				scrollTriggered = true;

				if ( stateBefore === null ) {
					stateBefore = currentstate;
				}

				// We only enter autoHideMode if the headers/footers are in
				// an overlay state or the show timer was started. If the
				// show timer is set, clear it so the headers/footers don't
				// show up until after we're done scrolling.
				var isOverlayState = stateBefore == "overlay";

				autoHideMode = isOverlayState || !!delayTimer;

				if ( autoHideMode ) {
					$.mobile.fixedToolbars.clearShowTimer();

					if ( isOverlayState ) {
						$.mobile.fixedToolbars.hide( true );
					}
				}
			})
			.bind( "scrollstop", function( event ) {

				if ( $( event.target ).closest( ignoreTargets ).length ) {
					return;
				}

				scrollTriggered = false;

				if ( autoHideMode ) {
					$.mobile.fixedToolbars.startShowTimer();
					autoHideMode = false;
				}
				stateBefore = null;
			});

			$window.bind( "resize updatelayout", showEventCallback );
	});

	// 1. Before page is shown, check for duplicate footer
	// 2. After page is shown, append footer to new page
	$( ".ui-page" )
		.live( "pagebeforeshow", function( event, ui ) {

			var page = $( event.target ),
				footer = page.find( ":jqmData(role='footer')" ),
				id = footer.data( "id" ),
				prevPage = ui.prevPage,
				prevFooter = prevPage && prevPage.find( ":jqmData(role='footer')" ),
				prevFooterMatches = prevFooter.length && prevFooter.jqmData( "id" ) === id;

			if ( id && prevFooterMatches ) {
				stickyFooter = footer;
				setTop( stickyFooter.removeClass( "fade in out" ).appendTo( $.mobile.pageContainer ) );
			}
		})
		.live( "pageshow", function( event, ui ) {

			var $this = $( this );

			if ( stickyFooter && stickyFooter.length ) {

				setTimeout(function() {
					setTop( stickyFooter.appendTo( $this ).addClass( "fade" ) );
					stickyFooter = null;
				}, 500);
			}

			$.mobile.fixedToolbars.show( true, this );
		});

	// When a collapsiable is hidden or shown we need to trigger the fixed toolbar to reposition itself (#1635)
	$( ".ui-collapsible-contain" ).live( "collapse expand", showEventCallback );

	// element.getBoundingClientRect() is broken in iOS 3.2.1 on the iPad. The
	// coordinates inside of the rect it returns don't have the page scroll position
	// factored out of it like the other platforms do. To get around this,
	// we'll just calculate the top offset the old fashioned way until core has
	// a chance to figure out how to handle this situation.
	//
	// TODO: We'll need to get rid of getOffsetTop() once a fix gets folded into core.

	function getOffsetTop( ele ) {
		var top = 0,
			op, body;

		if ( ele ) {
			body = document.body;
			op = ele.offsetParent;
			top = ele.offsetTop;

			while ( ele && ele != body ) {
				top += ele.scrollTop || 0;

				if ( ele == op ) {
					top += op.offsetTop;
					op = ele.offsetParent;
				}

				ele = ele.parentNode;
			}
		}
		return top;
	}

	function setTop( el ) {
		var fromTop = $(window).scrollTop(),
			thisTop = getOffsetTop( el[ 0 ] ), // el.offset().top returns the wrong value on iPad iOS 3.2.1, call our workaround instead.
			thisCSStop = el.css( "top" ) == "auto" ? 0 : parseFloat(el.css( "top" )),
			screenHeight = window.innerHeight,
			thisHeight = el.outerHeight(),
			useRelative = el.parents( ".ui-page:not(.ui-page-fullscreen)" ).length,
			relval;

		if ( el.is( ".ui-header-fixed" ) ) {

			relval = fromTop - thisTop + thisCSStop;

			if ( relval < thisTop ) {
				relval = 0;
			}

			return el.css( "top", useRelative ? relval : fromTop );
		} else {
			// relval = -1 * (thisTop - (fromTop + screenHeight) + thisCSStop + thisHeight);
			// if ( relval > thisTop ) { relval = 0; }
			relval = fromTop + screenHeight - thisHeight - (thisTop - thisCSStop );

			return el.css( "top", useRelative ? relval : fromTop + screenHeight - thisHeight );
		}
	}

	// Exposed methods
	return {

		show: function( immediately, page ) {

			$.mobile.fixedToolbars.clearShowTimer();

			currentstate = "overlay";

			var $ap = page ? $( page ) :
					( $.mobile.activePage ? $.mobile.activePage :
						$( ".ui-page-active" ) );

			return $ap.children( toolbarSelector ).each(function() {

				var el = $( this ),
					fromTop = $( window ).scrollTop(),
					// el.offset().top returns the wrong value on iPad iOS 3.2.1, call our workaround instead.
					thisTop = getOffsetTop( el[ 0 ] ),
					screenHeight = window.innerHeight,
					thisHeight = el.outerHeight(),
					alreadyVisible = ( el.is( ".ui-header-fixed" ) && fromTop <= thisTop + thisHeight ) ||
														( el.is( ".ui-footer-fixed" ) && thisTop <= fromTop + screenHeight );

				// Add state class
				el.addClass( "ui-fixed-overlay" ).removeClass( "ui-fixed-inline" );

				if ( !alreadyVisible && !immediately ) {
					el.animationComplete(function() {
						el.removeClass( "in" );
					}).addClass( "in" );
				}
				setTop(el);
			});
		},

		hide: function( immediately ) {

			currentstate = "inline";

			var $ap = $.mobile.activePage ? $.mobile.activePage :
									$( ".ui-page-active" );

			return $ap.children( toolbarSelector ).each(function() {

				var el = $(this),
					thisCSStop = el.css( "top" ),
					classes;

				thisCSStop = thisCSStop == "auto" ? 0 :
											parseFloat(thisCSStop);

				// Add state class
				el.addClass( "ui-fixed-inline" ).removeClass( "ui-fixed-overlay" );

				if ( thisCSStop < 0 || ( el.is( ".ui-header-fixed" ) && thisCSStop !== 0 ) ) {

					if ( immediately ) {
						el.css( "top", 0);
					} else {

						if ( el.css( "top" ) !== "auto" && parseFloat( el.css( "top" ) ) !== 0 ) {

							classes = "out reverse";

							el.animationComplete(function() {
								el.removeClass( classes ).css( "top", 0 );
							}).addClass( classes );
						}
					}
				}
			});
		},

		startShowTimer: function() {

			$.mobile.fixedToolbars.clearShowTimer();

			var args = [].slice.call( arguments );

			delayTimer = setTimeout(function() {
				delayTimer = undefined;
				$.mobile.fixedToolbars.show.apply( null, args );
			}, showDelay);
		},

		clearShowTimer: function() {
			if ( delayTimer ) {
				clearTimeout( delayTimer );
			}
			delayTimer = undefined;
		},

		toggle: function( from ) {
			if ( from ) {
				currentstate = from;
			}
			return ( currentstate === "overlay" ) ? $.mobile.fixedToolbars.hide() :
								$.mobile.fixedToolbars.show();
		},

		setTouchToggleEnabled: function( enabled ) {
			touchToggleEnabled = enabled;
		}
	};
})();

//auto self-init widgets
$( document ).bind( "pagecreate create", function( event ) {

	if ( $( ":jqmData(position='fixed')", event.target ).length ) {

		$( event.target ).each(function() {

			if ( !$.support.scrollTop || ( $.support.touchOverflow && $.mobile.touchOverflowEnabled ) ) {
				return this;
			}

			var $this = $( this );

			if ( $this.jqmData( "fullscreen" ) ) {
				$this.addClass( "ui-page-fullscreen" );
			}

			// Should be slidedown
			$this.find( slideDownSelector ).addClass( slideDownClass );

			// Should be slideup
			$this.find( slideUpSelector ).addClass( slideUpClass );

		});

	}
});

})( jQuery );
/*
* "fixHeaderFooter" native plugin - Behavior for "fixed" headers,footers, and scrolling inner content
*/

(function( $, undefined ) {

// Enable touch overflow scrolling when it's natively supported
$.mobile.touchOverflowEnabled = false;

// Enabled zoom when touch overflow is enabled. Can cause usability issues, unfortunately
$.mobile.touchOverflowZoomEnabled = false;

$( document ).bind( "pagecreate", function( event ) {
	if( $.support.touchOverflow && $.mobile.touchOverflowEnabled ){
		
		var $target = $( event.target ),
			scrollStartY = 0;
			
		if( $target.is( ":jqmData(role='page')" ) ){
			
			$target.each(function() {
				var $page = $( this ),
					$fixies = $page.find( ":jqmData(role='header'), :jqmData(role='footer')" ).filter( ":jqmData(position='fixed')" ),
					fullScreen = $page.jqmData( "fullscreen" ),
					$scrollElem = $fixies.length ? $page.find( ".ui-content" ) : $page;
				
				$page.addClass( "ui-mobile-touch-overflow" );
				
				$scrollElem.bind( "scrollstop", function(){
					if( $scrollElem.scrollTop() > 0 ){
						window.scrollTo( 0, $.mobile.defaultHomeScroll );
					}
				});	
				
				if( $fixies.length ){
					
					$page.addClass( "ui-native-fixed" );
					
					if( fullScreen ){

						$page.addClass( "ui-native-fullscreen" );

						$fixies.addClass( "fade in" );

						$( document ).bind( "vclick", function(){
							$fixies
								.removeClass( "ui-native-bars-hidden" )
								.toggleClass( "in out" )
								.animationComplete(function(){
									$(this).not( ".in" ).addClass( "ui-native-bars-hidden" );
								});
						});
					}
				}
			});
		}
	}
});

})( jQuery );
/*
* "init" - Initialize the framework
*/

(function( $, window, undefined ) {
	var	$html = $( "html" ),
			$head = $( "head" ),
			$window = $( window );

 	// trigger mobileinit event - useful hook for configuring $.mobile settings before they're used
	$( window.document ).trigger( "mobileinit" );

	// support conditions
	// if device support condition(s) aren't met, leave things as they are -> a basic, usable experience,
	// otherwise, proceed with the enhancements
	if ( !$.mobile.gradeA() ) {
		return;
	}

	// override ajaxEnabled on platforms that have known conflicts with hash history updates
	// or generally work better browsing in regular http for full page refreshes (BB5, Opera Mini)
	if ( $.mobile.ajaxBlacklist ) {
		$.mobile.ajaxEnabled = false;
	}

	// add mobile, initial load "rendering" classes to docEl
	$html.addClass( "ui-mobile ui-mobile-rendering" );

	// loading div which appears during Ajax requests
	// will not appear if $.mobile.loadingMessage is false
	var $loader = $( "<div class='ui-loader ui-body-a ui-corner-all'><span class='ui-icon ui-icon-loading spin'></span><h1></h1></div>" );

	$.extend($.mobile, {
		// turn on/off page loading message.
		showPageLoadingMsg: function() {
			if ( $.mobile.loadingMessage ) {
				var activeBtn = $( "." + $.mobile.activeBtnClass ).first();

				$loader
					.find( "h1" )
						.text( $.mobile.loadingMessage )
						.end()
					.appendTo( $.mobile.pageContainer )
					// position at y center (if scrollTop supported), above the activeBtn (if defined), or just 100px from top
					.css({
						top: $.support.scrollTop && $window.scrollTop() + $window.height() / 2 ||
						activeBtn.length && activeBtn.offset().top || 100
					});
			}

			$html.addClass( "ui-loading" );
		},

		hidePageLoadingMsg: function() {
			$html.removeClass( "ui-loading" );
		},

		// find and enhance the pages in the dom and transition to the first page.
		initializePage: function() {
			// find present pages
			var $pages = $( ":jqmData(role='page')" );

			// if no pages are found, create one with body's inner html
			if ( !$pages.length ) {
				$pages = $( "body" ).wrapInner( "<div data-" + $.mobile.ns + "role='page'></div>" ).children( 0 );
			}

			// add dialogs, set data-url attrs
			$pages.add( ":jqmData(role='dialog')" ).each(function() {
				var $this = $(this);

				// unless the data url is already set set it to the pathname
				if ( !$this.jqmData("url") ) {
					$this.attr( "data-" + $.mobile.ns + "url", $this.attr( "id" ) || location.pathname + location.search );
				}
			});

			// define first page in dom case one backs out to the directory root (not always the first page visited, but defined as fallback)
			$.mobile.firstPage = $pages.first();

			// define page container
			$.mobile.pageContainer = $pages.first().parent().addClass( "ui-mobile-viewport" );

			// alert listeners that the pagecontainer has been determined for binding
			// to events triggered on it
			$window.trigger( "pagecontainercreate" );

			// cue page loading message
			$.mobile.showPageLoadingMsg();

			// if hashchange listening is disabled or there's no hash deeplink, change to the first page in the DOM
			if ( !$.mobile.hashListeningEnabled || !$.mobile.path.stripHash( location.hash ) ) {
				$.mobile.changePage( $.mobile.firstPage, { transition: "none", reverse: true, changeHash: false, fromHashChange: true } );
			}
			// otherwise, trigger a hashchange to load a deeplink
			else {
				$window.trigger( "hashchange", [ true ] );
			}
		}
	});
	
	// This function injects a meta viewport tag to prevent scaling. Off by default, on by default when touchOverflow scrolling is enabled
	function disableZoom() {
		var cont = "user-scalable=no",
			meta = $( "meta[name='viewport']" );
			
		if( meta.length ){
			meta.attr( "content", meta.attr( "content" ) + ", " + cont );
		}
		else{
			$( "head" ).prepend( "<meta>", { "name": "viewport", "content": cont } );
		}
	}
	
	// if touch-overflow is enabled, disable user scaling, as it creates usability issues
	if( $.support.touchOverflow && $.mobile.touchOverflowEnabled && !$.mobile.touchOverflowZoomEnabled ){
		disableZoom();
	}

	// initialize events now, after mobileinit has occurred
	$.mobile._registerInternalEvents();

	// check which scrollTop value should be used by scrolling to 1 immediately at domready
	// then check what the scroll top is. Android will report 0... others 1
	// note that this initial scroll won't hide the address bar. It's just for the check.
	$(function() {
		window.scrollTo( 0, 1 );

		// if defaultHomeScroll hasn't been set yet, see if scrollTop is 1
		// it should be 1 in most browsers, but android treats 1 as 0 (for hiding addr bar)
		// so if it's 1, use 0 from now on
		$.mobile.defaultHomeScroll = ( !$.support.scrollTop || $(window).scrollTop() === 1 ) ? 0 : 1;

		//dom-ready inits
		if( $.mobile.autoInitializePage ){
			$.mobile.initializePage();
		}

		// window load event
		// hide iOS browser chrome on load
		$window.load( $.mobile.silentScroll );
	});
})( jQuery, this );
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 *//*!
 * Da Vinci Component
 * 
 * Component name : utils
 * js version : 1.0.0
 * 
 */
(function($, undefined ) {
$.davinci = {
	deviceReady : false, 
	/**
	 * 페이지를 전환 한다.
	 * 
	 * @param {String} to 전환 할 page의 id
	 * @param {Object} options
	 *		transition: 				{String}	전환 효과 "none" | "slide" | "slideup" | "slidedown" | "fade" | "pop" | "flip"<br>
	 *		reverse: 					{Boolean}	true면 전환 효과의 반대, false면 전환 효과를 그대로 적용한다.<br>
	 *		changeHash: 				{Boolean}	true,<br>
	 *		fromHashChange: 			{Boolean}	false,<br>
	 *		role: 						{String}	By default we rely on the role defined by the @data-role attribute.<br>
	 *		duplicateCachedPage: 		undefined,
	 *		pageContainer: 				undefined,
	 *		showLoadMsg: 				{Boolean}	loading message shows by default when pages are being fetched during changePage<br>
	 *		dataUrl: 					undefined,
	 *		fromPage: 					{String}	이미 보여지고 있었던 페이지의 pageid<br>
	 *		allowSamePageTransition:	{Boolean}	같은 페이지로의 전환을 허용하는지의 여부
	 */
	changePage : function(to, options){
		if( typeof to === "string") {
			if(to.length > 0 && to[0] != "#"){
				to = "#" + to;
			}
		}
		var $to = $(to);
		if($to.length) {
			var transition = $to.jqmData("transition");
			if(transition) {
				options = options || {};

				if(!options.transition) {
					options.transition = transition;
				}
			}
		}

		$.mobile.changePage( to, options );
	},

	/**
	 * Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getInstance : function (id, subid, lineIndex) {
		var $el, role, query_id, query_subid;

		if( typeof id === "string") {
			if(id.length > 0 && id[0] != "#"){
				id = "#" + id;
			}
		}

		if(subid === undefined){	// container widget
			if( typeof id === "string") {
				$el = $(id);
			}
			else if(id instanceof $) {
				$el = id;
			}
			else if(id instanceof $.mobile.widget) {
				return id;
			}
		}
		else if(lineIndex === undefined){	// basic widget in container without listview
			query_id = "[id='" + subid + "']";
			query_subid = "[subid='" + subid + "']";

			if( typeof id === "string") {
				$el = $(id + " " + query_id);
				if($el.length == 0) {
					$el = $( id + " " + query_subid);	
				}
			}
			else if(id instanceof $) {
				$el = id.find(query_id);
				if($el.length == 0) {
					$el = id.find(query_subid);
				}
			}
			else if(id instanceof $.mobile.widget) {
				$el = id.element.find(query_id);
				if($el.length == 0) {
					$el = id.element.find(query_subid);
				}
			}
		}
		else{	// basic widget in listview
			query_id =  ".dvc-listview-item-indexable:eq(" + lineIndex + ") [id='" + subid + "']";
			query_subid = ".dvc-listview-item-indexable:eq(" + lineIndex + ") [subid='" + subid + "']";

			if( typeof id === "string") {
				$el = $(id + " " + query_id);
				if($el.length == 0) {
					$el = $(id + " " + query_subid);	
				}
			}
			else if(id instanceof $) {
				$el = id.find(query_id);
				if($el.length == 0) {
					$el = id.find(query_subid);
				}
			}
			else if(id instanceof $.mobile.widget) {
				$el = id.element.find(query_id);
				if($el.length == 0) {
					$el = id.element.find(query_subid);
				}
			}
		}

		if($el.length == 0){
			console.log("!!!ERROR!!! $.davinci.getInstance("+id+", "+subid+", "+lineIndex + ") : Instance not found!");
			return false;
		}

		role = $el.jqmData('role');
		if(role == "dvcRadioButton" || role == "dvcCheckbox") {
			role = "dvcButton";	
		}
		return $el.data(role);
	},

	/**
	 * dvcAudio Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getAudio : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcAudio"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcButton Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getButton : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcButton"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcCarousel Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getCarousel : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcCarousel"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcCollapseview Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getCollapseview : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcCollapseview"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcContent Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getContent : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcContent"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcDivision Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getDivision : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcDivision"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcFooter Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getFooter : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcFooter"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcGrid Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getGrid : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcGrid"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcHeader Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getHeader : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcHeader"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcHtmlview Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getHtmlview : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcHtmlview"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcImage Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getImage : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcImage"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcImageButton Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getImageButton : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcImageButton"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcLabel Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getLabel : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcLabel"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcLayoutview Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getLayoutview : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcLayoutview"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcListview Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getListview : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcListview"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcPagebox Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getPagebox : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcPagebox"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcPicker Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getPicker : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcPicker"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcPopup Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getPopup : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcPopup"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcProgress Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getProgress : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcProgress"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcScrollview Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getScrollview : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcScrollview"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcSlider Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getSlider : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcSlider"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcSwitch Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getSwitch : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcSwitch"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcTextarea Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getTextarea : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcTextarea"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcTextfield Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getTextfield : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcTextfield"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcTreeview Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getTreeview : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcTreeview"){
			return ret;
		}
		return null;
	},

	/**
	 * dvcVideo Widget의 instance를 가져온다.
	 * 
	 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
	 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
	 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
	 */
	getVideo : function (id, subid, lineIndex) {
		var ret = this.getInstance(id, subid, lineIndex);
		if(ret.widgetName === "dvcVideo"){
			return ret;
		}
		return null;
	},
	
	/**
	 * body의 child인 page중에서 현재 활성화된 page id를 가지고 온다.
	 * 
	 * @returns {String} page id
	 */
	getActivePage : function(){
		var $ap = $("body>.ui-page-active");
		return $ap[0].id;
	},
	
	isAppleDevice : function() {
	    switch( navigator.platform )
	    {
	    case "iPhone":
	    case "iPad":
	    case "iPhone Simulator":
	    case "iPad Simulator":
	        return true;
	    }
	    
	    return false;
	}
};

})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcBase", $.mobile.widget, {
	options: {
		visible: true,
		enable: true,
		customStyle: false
	},

	enable: function(e) {
		if ( arguments[0] != undefined ) {
			this.options.enable = e;
			if(e == true) {
				this.element.removeClass("dvc-disabled");
			}
			else {
				this.element.addClass("dvc-disabled");
			}
		}
		else {
			return this.options.enable;
		}
	},
	
	visible: function(v) {
		if ( arguments[0] != undefined) {
			this.options.visible = v;
			if(v == true) {
				this.element.removeClass("dvc-hidden");
			}
			else {
				this.element.addClass("dvc-hidden");
			}
		}
		else {
			return this.options.visible;
		}
	},
	
	refresh: function(){
		var e = this.enable();
		this.enable(e);
		
		var v = this.visible();
		this.visible(v);
	},
	
	
	// scrollview가 Drag 되었는 지를 확인한다.
	scrollviewDragged: function() {
		if(this.scrollview === undefined) {
			if(!this._findScrollview()) {
				this.scrollview = 0;
			}
		}
		if(this.scrollview && this.scrollview._didDrag) {
			return true;
		}
		return false;
	},
	
	getEventNames: function() {
		return [];
	},
	
	_getAncestorEnable: function() {
		var $el = this.element;
		var ret = true;
		
		$el.parents(":jqmData(role^='dvc'), .dvc-listview-item").each(function() {
			if($(this).hasClass("dvc-disabled")) {
				ret = false;
				return false;
			}
		});

		return ret;
	},
	
	_findScrollview: function() {
		var $el = this.element;
		var $scrollview = $el.closest(":jqmData(role='dvcScrollview')");
		if($scrollview.length > 0) {
			this.scrollview = $scrollview.data('dvcScrollview');
			return true;
		}
	},
	
	_getNativeEvent: function(e) {
		while (e && typeof e.originalEvent !== "undefined") {
			e = e.originalEvent;
		}
		return e;
	},
	
	_prevmousedown: function() {
		this._vmouseStatus = 1;		
	},
	
	_prevmouseup: function(e) {
		if(e.type == "vmousecancel") {
			return false;
		}
		
		if(this._vmouseStatus != 1) {
			return true;
		}
		this._vmouseStatus = 2;
		return false;
	},
	
	_prevclick: function() {
		if(this._vmouseStatus != 2) {
			return true;
		}
		this._vmouseStatus = 3;
		return false;
	}
});

})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcButton", $.mobile.dvcBase, {
	options: {
		text: "",
		buttonType: "default",
		upImage: "",
		downImage: "",
		upImageChecked: "",
		downImageChecked: "",
		borderWidths: "1 1 1 1",
		upIcon: "",
		downIcon: "",
		upIconChecked: "",
		downIconChecked: "",
		iconPos: "left",
		iconMargin: 0,	// iconPos가 "top"일때 사용
		textMargin: 0,	// iconPos가 "top"일때 사용
		checked: false,
		groupName: "",
		radioEvent: "up",	// radio일때 event 발생하는 시점
		initSelector: ":jqmData(role='dvcButton'), :jqmData(role='dvcCheckbox'), :jqmData(role='dvcRadioButton')"
	},
	
	_create: function(){
		var $el = this.element, self = this, o = this.options;
		
		$el.addClass( "dvc-button dvc-button-up");
		
		// initialize Button Type
		switch(o.buttonType) {
		case "back":
			$el.addClass("dvc-button-back");
			break;
		case "cancel":
			$el.addClass("dvc-button-cancel");
			break;
		case "ok":
			$el.addClass("dvc-button-ok");
			break;
		}
		if($el.jqmData("role") == "dvcCheckbox") {
			$el.addClass("dvc-button-checkbox");
			o.buttonType = "checkbox";
		}
		else if($el.jqmData("role") == "dvcRadioButton") {
			$el.addClass("dvc-button-radio");
			o.buttonType = "radio";
		}

		// initialize iconPos 		
		switch(o.iconPos) {
		case "top":
			$el.addClass("dvc-button-icon-top");
			break;
		case "right":
			$el.addClass("dvc-button-icon-right");
			break;
		case "bottom":
			$el.addClass("dvc-button-icon-bottom");
			break;
		default:
			$el.addClass("dvc-button-icon-left");
			break;
		}		

		var display = $el.css("display");
		if(display == "block") {
			$el.css("display","-webkit-box");
		}
		else if(display == "inline" || display == "inline-block") {
			$el.css("display","-webkit-inline-box");
		}


		var $iconBody = $("<div class='dvc-button-icon-body'></div>");
		self.$icon = $("<img class='dvc-button-icon'>");
		$iconBody.append(self.$icon);
		
		var $textBody = $("<div class='dvc-button-text-body'></div>");
		self.$text = $("<div class='dvc-button-text'></div>");
		$textBody.append(self.$text);
		
		$el.append($iconBody);
		$el.append($textBody);

		// top일때만 margin을 적용한다.
		if(o.iconPos == "top") {
			$iconBody.css("margin-top", o.iconMargin);
			$textBody.css("margin-bottom", o.textMargin);
		}

		self.text(o.text);

		// radio나 checkbox일때, bg를 바꿨다면, 기본 icon 설정을 없앤다.
		if(o.buttonType == "radio" || o.buttonType == "checkbox") {
			if(o.upImage || o.downImage) {
				$el.addClass("dvc-button-custom");
			}
		}

		// up-image, down-image, up-image-checkd, down-image-checked
		// 4가지 상태가 있지만, 실제로는 up-image이외 3가지는 동일할 가능성이 크다.
		// 그러므로 down-image만 있고 2개의 이미지가 없을 경우에는 대표로 down-image를 사용하도록 한다.

		function drawButton(state, checked) {
			// o.upImage나 o.downImage 둘 중 하나가 있다는 것은 기본 css는 사용하지 않는다는 의지라고 판단.
			if(o.upImage || o.downImage) {
				var border_width_px = o.borderWidths.replace(/(\d+)/g, '$1px');
				$el.css("border-width", border_width_px);
				
				if(state == "up" && checked == false && o.upImage) {
					var urlUpImage = "url('" + o.upImage + "')";
					$el.css("-webkit-border-image", urlUpImage + " " + o.borderWidths + " stretch stretch");
				}
				else if(state == "down" && checked == false && o.downImage) {
					var urlDownImage = "url('" + o.downImage + "')";
					$el.css("-webkit-border-image", urlDownImage + " " + o.borderWidths + " stretch stretch");
				}
				else if(state == "up" && checked == true && o.upImageChecked) {
					var urlUpImageChecked = "url('" + o.upImageChecked + "')";
					$el.css("-webkit-border-image", urlUpImageChecked + " " + o.borderWidths + " stretch stretch");
				}
				else if(state == "down" && checked == true && o.downImageChecked) {
					var urlDownImageChecked = "url('" + o.downImageChecked + "')";
					$el.css("-webkit-border-image", urlDownImageChecked + " " + o.borderWidths + " stretch stretch");
				}
				else {
					if((state == "up" && checked == true) || (state == "down" && checked == true)) {
						var urlDownImage = "url('" + o.downImage + "')";
						$el.css("-webkit-border-image", urlDownImage + " " + o.borderWidths + " stretch stretch");
					}
					else {
						$el.css({
							"-webkit-border-image" : "none",
							"border-color" : "transparent",
							"border-style" : "solid"
						});
					}
				}
			}
		}
		
		function drawIcon(state, checked) {
			if(state == "up" && checked == false && o.upIcon) {
				self.$icon[0].style.content = "url('" + o.upIcon + "')";
			} else if(state == "down" && checked == false && o.downIcon) {
				self.$icon[0].style.content = "url('" + o.downIcon + "')";
			} else if(state == "up" && checked == true && o.upIconChecked) {
				self.$icon[0].style.content = "url('" + o.upIconChecked + "')";
			} else if(state == "down" && checked == true && o.downIconChecked) {
				self.$icon[0].style.content = "url('" + o.downIconChecked + "')";
			}
			else {
				if(o.upIcon || o.downIcon) {
					if((state == "up" && checked == true) || (state == "down" && checked == true)) {
						self.$icon[0].style.content = "url('" + o.downIcon + "')";
					}
				}
				else {
					if($el.hasClass("dvc-button-custom")) {
						//self.$icon[0].style.content = "none";	// android 2.3에서는 동작이 안되서 뺌.
					}	
				}
			}
		}
		
		self.drawButton = drawButton;
		self.drawIcon = drawIcon;
		
		self._checked(o.checked);

/////////////////////////////////////////////////////////////////
		
		$el.bind({
			"vmousedown": function(e) {
				self._prevmousedown();
				
				if(self.enable() && self._getAncestorEnable()) {
					$el.addClass("dvc-button-down").removeClass("dvc-button-up");
					drawButton("down", o.checked);
					drawIcon("down", o.checked);
					
					if(o.buttonType == "radio" && o.radioEvent == "down") {
						// sibling중에서 groupName이 같은 것을 찾는다.
						if(self.checked() == false) {
							self.checked(true);
						}
	
						var subid = $el.attr("subid");
						if(!subid) {
							subid = $el[0].id;
						}
						$el.trigger("ev_change", [subid, true]);
					}
					
					e.preventDefault();
					e.stopPropagation();
				}
			},
			"vmouseup vmousecancel": function(e) {
				if(self._prevmouseup(e)) return;
				
				if(self.enable() && self._getAncestorEnable()) {
					// cancel 일때는 제외
					if(e.type == "vmousecancel" || (o.buttonType != "radio" && o.buttonType != "checkbox")) {
						$el.addClass("dvc-button-up").removeClass("dvc-button-down");
						drawButton("up", o.checked);
						drawIcon("up", o.checked);
					}
					e.stopPropagation();
				}
			},
			"vclick": function(e){
				if(self._prevclick()) return;
				
				if(self.enable() && self._getAncestorEnable()) {
					if(self.scrollviewDragged()) {
						e.stopPropagation();
						return;
					}
					
					var subid = $el.attr("subid");
					if(!subid) {
						subid = $el[0].id;
					}

					if(o.buttonType != "radio" || o.radioEvent != "down") {
						if(o.buttonType == "radio" || o.buttonType == "checkbox") {
							if(o.buttonType == "checkbox") {
								self.toggle();
							}
							else {
								if(self.checked() == false) {
									self.checked(true);
								}
							}
							
							$el.addClass("dvc-button-up").removeClass("dvc-button-down");
							
							$el.trigger("ev_change", [subid, self.checked()]);
						}
						else {
							$el.trigger("ev_click", subid);
						}
					}
					
					// event를 상위로 전달하지 않도록 한다.
					e.stopPropagation();
				}
			}
		});

		this.refresh();
	},
	
	text: function(t) {
		var $el = this.element, self = this, o = this.options;
		
		if ( arguments.length ) {
			o.text = t;
			self.$text.text(t);
			return this;
		}
		else {
			return o.text;
		}
	},
	
	_checked: function(v) {
		var $el = this.element, self = this, o = this.options;
		if(v) {
			$el.addClass("dvc-button-checked");
		}
		else {
			$el.removeClass("dvc-button-checked");
		}
		o.checked = v;
		
		// 화면 갱신을 해야함.
		self.drawButton("up", v);
		self.drawIcon("up", v);
	},
	
	checked: function(v) {
		var $el = this.element, self = this, o = this.options;
		
		if ( arguments.length ) {
			var oldChecked = o.checked;
			
			self._checked(v);			
			
			if(o.buttonType == "radio" && oldChecked == false) {
				// id가 있는 parent를 찾는다.
				var $ancestorWithID = null;
				$el.parents().each(function() {
					if(this.id && $(this).jqmData("role") != "GridItem") {
						$ancestorWithID = $(this);
						return false;
					}
				});
				
				if($ancestorWithID) {
					$ancestorWithID.find(":jqmData(group-name=" + o.groupName + ")").each(function() {
						if(this !== $el[0]) {
							var $this = $(this);
							var role = $this.jqmData("role");
							if(role == "dvcCheckbox" || role == "dvcRadioButton") {
								role = "dvcButton";
							}
							$this.data(role)._checked(false);
						}
					});
				}
			}
			
			return this;
		}
		else {
			return o.checked;
		}
	},
	
	toggle: function() {
		this.checked(!this.checked());
		
		return this;
	},
	
	getEventNames: function() {
		return ["ev_click", "ev_change"];
	}
});

})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcImageButton", $.mobile.dvcBase, {
	options: {
		text: "",
		upImage: "",
		downImage: "",
		imageType : "",
		initSelector: ":jqmData(role='dvcImageButton')"
	},
	
	_create: function(){
		var $el = this.element, self = this, o = this.options;
		
		$el.addClass( "dvc-imagebutton");
		
		var urlUpImage, urlDownImage;
		
		if(o.upImage && o.downImage) {
			urlUpImage = "url('" + o.upImage + "')";
			urlDownImage = "url('" + o.downImage + "')";

			if(o.upImage == "transparent") {
				$el.css({"background-image": "none"});
			}
			else {
				$el.css({"background-image": urlUpImage});
			}
		}
		
/////////////////////////////////////////////////////////////////
		$el.bind({
			"vmousedown": function(e) {
				self._prevmousedown();
				
				if(self.enable() && self._getAncestorEnable()) {
					$el.addClass("dvc-imagebutton-down");

					if(urlDownImage) {
						if(o.downImage == "transparent") {
							$el.css({"background-image": "none"});
						}
						else {
							$el.css({"background-image": urlDownImage});
						}
					}

					e.stopPropagation();
				}
			},
			"vmouseup vmousecancel": function(e) {
				if(self._prevmouseup(e)) return;
				
				if(self.enable() && self._getAncestorEnable()) {
					$el.removeClass("dvc-imagebutton-down");

					if(urlUpImage) {
						if(o.upImage == "transparent") {
							$el.css({"background-image": "none"});
						}
						else {
							$el.css({"background-image": urlUpImage});
						}
					}

					e.stopPropagation();
				}
			},
			"vclick": function(e){
				if(self._prevclick()) return;
				
				if(self.enable() && self._getAncestorEnable()) {
					if(self.scrollviewDragged()) {
						e.stopPropagation();
						return;
					}

					var subid = $el.attr("subid");
					if(!subid) {
						subid = $el[0].id;
					}
					
					$el.trigger("ev_click", subid);
					
					e.stopPropagation();
				}
			}
		});
		
		if(o.imageType) {
			this.imageType(o.imageType);
		}
		var t = self.text();
		if(t) {
			self.$buttonText = $("<div class='dvc-imagebutton-text'></div>");
			$el.append(self.$buttonText);
		
			self.text(t);
		}
		
		this.refresh();
	},
	
	imageType : function(type){
		var $el = this.element;
		
		$el.removeClass("dvc-imagebutton-tile dvc-imagebutton-stretch dvc-imagebutton-zoom dvc-imagebutton-center");
		switch(type) {
		case "tile":
			$el.addClass("dvc-imagebutton-tile");
			break;
		case "stretch":
			$el.addClass("dvc-imagebutton-stretch");
			break;
		case "zoom":
			$el.addClass("dvc-imagebutton-zoom");
			break;
		case "center":
			$el.addClass("dvc-imagebutton-center");
			break;
		}
	},

	text: function(t){
		var $el = this.element, self = this, o = this.options;
		if ( arguments.length ) {
			o.text = t;
			self.$buttonText[0].innerHTML = t;		
		}
		else {
			return o.text;
		}
 	},
 	
 	getEventNames: function() {
		return ["ev_click"];
	}
});

})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcCollapseview", $.mobile.dvcBase, {
	options: {
		expand: true,
		initSelector: ":jqmData(role='dvcCollapseview')"
	},
	
	_create: function(){
		var $el = this.element, self = this, o = this.options;
		
		$el.addClass( "dvc-collapseview");

		self.expand(self.expand(), true);

		self.refresh();
	},
	
	expand: function(e, noAnimation, animatedCallback) {
		var $el = this.element, self = this, o = this.options;
		if ( arguments.length ) {
			o.expand = e;
			
			var callAnimatedCallback = function() {
				if(animatedCallback) {
					animatedCallback();
				}
				
				if(e) {
					$el.addClass("dvc-collapseview-expand");
				}
				else {
					$el.removeClass("dvc-collapseview-expand");
				}
			};
			
			if(e) {
				if(noAnimation) {
					$el.show();
					callAnimatedCallback();
				}
				else {
					$el.slideDown("fast", function() {
						callAnimatedCallback();
					});
				}
			}
			else {
				if(noAnimation) {
					$el.hide();
					callAnimatedCallback();
				}
				else {
					$el.slideUp("fast", function() {
						callAnimatedCallback();
					});
				}
			}

			return this;
		}
		else {
			return o.expand;
		}
	}
});


})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcGrid",  $.mobile.dvcBase, {
	options: {
		initSelector: ":jqmData(role='dvcGrid')"
	},
	
	_create: function(){
		var $el = this.element, self = this, o = this.options;
		
		$el.addClass( "dvc-grid");
		var $items = $el.find(".dvc-grid-item");

		self.refresh();
	},
		
	refresh: function() {
		var $el = this.element, self = this;
		
		var $items = $el.find(".dvc-grid-item");
		var count = $items.length;
		var width = 100/count;
		var strWidth = width.toString();
		
		$items.each(function(i) {
			var strLeft = (i*width).toString() + "%";
			if(i == count - 1) {	// 마지막이면,
				$(this).css({
					left: strLeft,
					right : "0px"
				});
			}
			else {
				$(this).css({
					left: strLeft,
					width : strWidth + "%"
				});		
			}
		});
	}
});

})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcHtmlview", $.mobile.dvcBase, {
	options: {
		initSelector: ":jqmData(role='dvcHtmlview')"
	},
	_create: function(){
		var $el = this.element, self = this, o = this.options;
		$el.addClass( "dvc-htmlview" );
		
		self._findScrollview();
	},
	
	html: function(value, scrollviewWidth){
		var $el = this.element, self = this;

		if ( arguments.length ) {
			if(!scrollviewWidth){
				self.scrollview._$view.width(scrollviewWidth);
			}
			
			$el.html(value);
			
			$el.find("link,style").remove();
		}
		else {
			var value = $el.html();
			return value;
		}
 	},
	
	clear: function(){
		var $el = this.element, self = this;
		this.html("");
		self.scrollview.scrollTo(0,0);
	}	
});

})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcImage", $.mobile.dvcBase , {
	options: {
		src : "",
		imageType : "",
		initSelector: ":jqmData(role='dvcImage')"
	},
	
	_create: function(){
		var $el = this.element, self = this, o = this.options;
		$el.addClass( "dvc-image");

		if(o.src) {
			this.src(o.src);
		}
		
		if(o.imageType) {
			this.imageType(o.imageType);
		}
		
		self.refresh();
	},
	src: function(url) {
		if ( arguments.length ) {
			this.element.css("background-image", "url('" + url + "')");
		} else {
			var ret = this.element.css("background-image");
			if(ret.length > 5 && ret.indexOf("url(") === 0){
				return ret.slice(4, -1);
			};
			return ret;
		}
	},
	
	imageType : function(type){
		var $el = this.element;
		
		$el.removeClass("dvc-image-tile dvc-image-stretch dvc-image-zoom dvc-image-center");
		switch(type) {
		case "tile":
			$el.addClass("dvc-image-tile");
			break;
		case "stretch":
			$el.addClass("dvc-image-stretch");
			break;
		case "zoom":
			$el.addClass("dvc-image-zoom");
			break;
		case "center":
			$el.addClass("dvc-image-center");
			break;
		}
	}
	
});

})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcLabel", $.mobile.dvcBase, {
	options: {
		text: "",
		textAlign: "left",
		multiline: false,
		enable: false,
		initSelector: ":jqmData(role='dvcLabel')"
	},
	
	_create: function(){
		var $el = this.element, self = this, o = this.options;
		
		$el.addClass( "dvc-label");
		
		self.$labelText = $("<div cLass='dvc-label-text'></div>").appendTo($el);
		
		self.text(self.text());
		
		$el.bind({
			"vmousedown": function(e) {
				self._prevmousedown();
				
				if(self.enable() && self._getAncestorEnable()) {
					$el.addClass("dvc-label-down");
					e.stopPropagation();
				}
			},
			"vmouseup vmousecancel": function(e) {
				if(self._prevmouseup(e)) return;
				
				if(self.enable() && self._getAncestorEnable()) {
					$el.removeClass("dvc-label-down");
					e.stopPropagation();
				}
			},
			"vclick": function(e){
				if(self._prevclick()) return;
				
				if(self.enable() && self._getAncestorEnable()) {
					if(self.scrollviewDragged()) {
						e.stopPropagation();
						return;
					}

					var subid = $el.attr("subid");
					if(!subid) {
						subid = $el[0].id;
					}
					
					$el.trigger("ev_click", subid);
					e.stopPropagation();
				}
			}
		});

		this.refresh();
	},
	
	textAlign: function(ta) {
		var $el = this.element, self = this, o = this.options;
		if ( arguments[0] != undefined ) {
			$el.jqmData("text-align", ta);
			o.textAlign = ta;
			
			return this;
		} else {
			return o.textAlign;
		}
	},
	
	text: function(t) {
		var $el = this.element, self = this, o = this.options;
		
		if ( arguments.length ) {
			var $divText = self.$labelText;
			o.text = t;
			$divText[0].innerHTML = t;
			
			if(!o.customStyle) {
				$divText.css({"text-align": self.textAlign()});
			}
			
			if(o.multiline) {
				$divText.addClass("dvc-label-multi");
			}
			else {
				$divText.addClass("dvc-label-single");
			}
			
			return this;
		}
		else {
			return o.text;
		}
	},
	
	getEventNames: function() {
		return ["ev_click"];
	}
});

})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcHeader", $.mobile.dvcBase, {
	options: {
		initSelector: ":jqmData(role='dvcHeader')"
	},
	_create: function(){
		var $el = this.element, self = this, o = this.options;
	
		$el.addClass("dvc-header ui-title");
		
		this.refresh();
	},
	refresh: function() {
		$.mobile.dvcBase.prototype.refresh.call(this);
		
		var $el = this.element;
		var $siblings = $el.siblings();
		var $content = $siblings.filter(":jqmData(role='dvcContent')");
		$content.css("top", $el.height()+"px");
	},
	getEventNames: function() {
		return ["ev_click", "ev_change", "ev_keyup"];
	}
});
})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcFooter", $.mobile.dvcBase, {
	options: {
		initSelector: ":jqmData(role='dvcFooter')"
	},
	_create: function(){
		var $el = this.element, self = this, o = this.options;
	
		$el.addClass("dvc-footer");
		this.refresh();
	},
	refresh: function() {
		$.mobile.dvcBase.prototype.refresh.call(this);

		var $el = this.element;
		var $siblings = $el.siblings();
		var $content = $siblings.filter(":jqmData(role='dvcContent')");
		$content.css("bottom", $el.height()+"px");
	},
	getEventNames: function() {
		return ["ev_click", "ev_change", "ev_keyup"];
	}
});
})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcContent", $.mobile.dvcBase, {
	options: {
		initSelector: ":jqmData(role='dvcContent')"
	},
	_create: function(){
		var $el = this.element, self = this, o = this.options;
	
		$el.addClass("dvc-content");
	}
});
})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcLayoutview", $.mobile.dvcBase, {
	options: {
		buttonType: "none",
		checked: false,
		groupName:"",
		initSelector: ":jqmData(role='dvcLayoutview')"
	},
	_create: function(){
		var $el = this.element, self = this, o = this.options;
		$el.addClass("dvc-layoutview");
	
		self._buttonType();
		self._attachEvent();
		self.refresh();
	},
	
	_attachEvent: function() {
		var $el = this.element, self = this, o = this.options;
		
		$el.bind({
			'swipeleft': function(e, ui) {
				if(o.buttonType == "none") {
					return;
				}
				
				if(self.enable() && self._getAncestorEnable()) {
					var subid = $el.attr("subid");
					if(!subid) {
						subid = $el[0].id;
					}
					
					$el.trigger("ev_swipeleft", [subid]);
					e.stopPropagation();
				}
			},
			'swiperight': function(e, ui) {
				if(o.buttonType == "none") {
					return;
				}
				
				if(self.enable() && self._getAncestorEnable()) {
					var subid = $el.attr("subid");
					if(!subid) {
						subid = $el[0].id;
					}
					
					$el.trigger("ev_swiperight", [subid]);
					e.stopPropagation();
				}
			},
			"vmousedown": function(e) {
				self._prevmousedown();
				
				if(o.buttonType == "none") {
					return;
				}
				
				if(self.enable() && self._getAncestorEnable()) {
					$(this).removeClass("dvc-layoutview-up").addClass( "dvc-layoutview-down");
					e.stopPropagation();
				}
			},
			"vmouseup vmousecancel": function(e) {
				if(self._prevmouseup(e)) return;
				
				if(o.buttonType == "none") {
					return;
				}

				if(self.enable() && self._getAncestorEnable()) {
					$(this).removeClass("dvc-layoutview-down").addClass( "dvc-layoutview-up");
					e.stopPropagation();
				}
			},
			"vclick": function(e) {
				if(self._prevclick()) return;
				
				if(o.buttonType == "none") {
					return;
				}

				if(self.enable() && self._getAncestorEnable()) {
					if(self.scrollviewDragged()) {
						return;
					}
					
					var subid = $el.attr("subid");
					if(!subid) {
						subid = $el[0].id;
					}
					
					if(o.buttonType == "checkbox") {
						self._toggleCheckbox();
						$el.trigger("ev_change", [subid, self.checked()]);
					}
					else if(o.buttonType == "radio" || o.buttonType == "checkboxradio") {
						if(self.checked() == false) {
							self.checked(true);
						}
						$el.trigger("ev_change", [subid, true]);
					}
					else {
						$el.trigger("ev_click", subid);
					}
					e.stopPropagation();
				}
			}
		});
	},
	
	_buttonType: function() {
		var $el = this.element, self = this, o = this.options;
		
		switch(o.buttonType) {
		case "none":
			$el.addClass("dvc-layoutview-none");
			break;
		case "link":
			$el.addClass("dvc-layoutview-link dvc-layoutview-up");
			
			var $link = $("<div class='dvc-layoutview-link-icon'></div>");
			$link.appendTo($el);
			break;
		case "button":
			$el.addClass("dvc-layoutview-button dvc-layoutview-up");
			break;
		case "checkbox":
			$el.addClass("dvc-layoutview-checkbox dvc-layoutview-up");

			var $checkbox = $("<div class='dvc-layoutview-checkbox-icon'></div>");
			$checkbox.appendTo($el);
			self.$checkbox = $checkbox;
			break;
		case "radio":
			$el.addClass("dvc-layoutview-radio dvc-layoutview-up");

			if(self.checked()) {
				self.checked(true);
			}
			break;
		case "checkboxradio":
			$el.addClass("dvc-layoutview-checkboxradio dvc-layoutview-up");
			
			if(self.checked()) {
				self.checked(true);
			}
			
			var $checkbox = $("<div class='dvc-layoutview-checkbox-icon'></div>");
			$checkbox.appendTo($el);
			self.$checkbox = $checkbox;
			break;
		}
	},
	
	_toggleCheckbox: function() {
		this.checked(!this.checked());
	},
	
	_checked: function(v) {
		var $el = this.element, o = this.options;
		o.checked = v;
		
		this.refresh();		
	},
	
	checked: function(v){
		var $el = this.element, self = this, o = this.options;
		
		if ( arguments[0] != undefined ) {
			if(o.buttonType == "radio" || o.buttonType == "checkboxradio") {
				if(o.checked == false) {
					// id가 있는 parent를 찾는다.
					var $ancestorWithID = null;
					$el.parents().each(function() {
						if(this.id) {
							$ancestorWithID = $(this);
							return false;
						}
					});
					
					if($ancestorWithID) {
						$ancestorWithID.find(":jqmData(group-name=" + o.groupName + ")").each(function() {
							if(this !== $el[0]) {
								var $this = $(this);
								var role = $this.jqmData("role");
								if(role == "dvcCheckbox" || role == "dvcRadioButton") {
									role = "dvcButton";	
								}
								$this.data(role)._checked(false);
							}
						});
					}
					
					self._checked(true);
				}
			} else {
				o.checked = v;
				this.refresh();
			}
			
			return this;
		}
		else {
			return o.checked;
		}
	},
	
	refresh: function() {
		$.mobile.dvcBase.prototype.refresh.call(this);
	
		var $el = this.element, o = this.options;
		if(o.buttonType == "checkbox" || o.buttonType == "checkboxradio") {
			if(o.checked) {
				this.$checkbox.removeClass("dvc-layoutview-checkbox-icon-hidden");
			}
			else {
				this.$checkbox.addClass("dvc-layoutview-checkbox-icon-hidden");
			}
		}
		else if(o.buttonType == "radio") {
			if(o.checked) {
				$el.addClass("dvc-layoutview-radio-checked");
			}
			else {
				$el.removeClass("dvc-layoutview-radio-checked");
			}
		}
		return this;
	},
	
	getEventNames: function() {
		return ["ev_click", "ev_change", "ev_keyup", "ev_swipeleft", "ev_swiperight"];
	}
});

})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcListview", $.mobile.dvcBase, {
	options: {
		buttonType: "button",
		initSelector: ":jqmData(role='dvcListview')"
	},
	_create: function(){
		var $el = this.element, self = this, o = this.options;
	
		$el.addClass("dvc-listview");

		var itemHeight = $el.css("height");
		$el.css("height", "auto");

		var $designItem = $("<div class='dvc-listview-item-design dvc-listview-item-indexable-design'></div>");
		var $items = $("<div class='dvc-listview-items'></div>");
		self.$designItem = $designItem;
		self.$items = $items;
		
		if(itemHeight) {
			$designItem.css("min-height", itemHeight);
		}
		
		// 하위 widget 중 subid가 없을 경우에는 id를 subid로 변경한다.
		$el.find("[id]").not("[subid]").each(function(){
			this.outerHTML = this.outerHTML.replace(/\sid/g, " subid");
		});

		var htmlString = $el[0].innerHTML;
		$el.children().remove();
		
		$designItem.append(htmlString);
		$el.append($designItem);
		$el.append($items);

		if(o.buttonType == "checkboxradio" || o.buttonType == "checkbox") {
			var $checkbox = $("<div class='dvc-listview-checkbox-icon dvc-listview-checkbox-icon-hidden'></div>");
			$checkbox.clone().appendTo(self.$designItem);
		}
		else if(o.buttonType == "link") {
			var $link = $("<div class='dvc-listview-link-icon'></div>");
			$link.appendTo(self.$designItem);
		}

		self._findScrollview();
		self._attachEvent();
		self.refresh();
	},
	
	
	updateItems: function(items, posIndex) {
		var $el = this.element, self = this;
		
		if(posIndex == undefined) {
			posIndex = 0;
		}		

		for(var i=0;i<items.length;++i) {
			var item = items[i];

			var $posItem = $el.find('.dvc-listview-item-indexable').eq(posIndex);
			if($posItem.length == 0) {
				return;
			}
			posIndex++;

			$posItem.find("div:jqmData(role^='dvc')").each(function(){
				var role = $(this).jqmData('role');
				if(role) {
					var $this = $(this);
					
					var subid = $this.attr("subid");
					var instance = $this.data(role);
					
					if(item[subid]) {
						if(role == "dvcImage") {
							instance.src(item[subid]);
						}
						else if(role == "dvcLabel") {
							instance.text(item[subid]);
						}
						else if(role == "dvcRadioButton" || role == "dvcCheckbox" || role == "dvcSwitch") {
							instance.checked(item[subid]);
						}
						else if(role == "dvcProgress" || role == "dvcSlider") {
							instance.value(item[subid]);
						}
						else if(item["userClass"]) {
							instance.element.addClass(item["userClass"]);
						}
						else if(item["userData"]) {
							instance.element.data("userData", item["userData"]);
						}
					}
				}
			});
		}
	},
	
	addItems: function(items, posIndex) {
		var $el = this.element, self = this;
		
		// 현재 item이 몇개있는 지를 알아온다.
		var html = this.$designItem[0].outerHTML;
		// 2. 이 문자열에서 -design을 제거한다.
		html = html.replace(/-design/g,"");
		var $html = $(html);
		
		var $newItem;
		// item은 아래와 같은 형식이다.
		/*
			{
				[subid의 실제이름]: "",
				userClass: "",		// item에 추가할 class
				userData: null		// item에 추가할 data
			}
		
		*/

		for(var i=0;i<items.length;++i) {
			var item = items[i];

			if(typeof item == "string") {
				item = item.replace(/\sid/g, " subid");
				$newItem = $(item);
			}
			else {
				$newItem = $html.clone();
				if(item["userClass"]) {
					$newItem.addClass(item["userClass"]);
				}
	
				if(item["userData"]) {
					$newItem.data("userData", item["userData"]);
				}
			}

			if(posIndex != undefined) {
				var $posItem = $el.find('.dvc-listview-item-indexable').eq(posIndex);
				if($posItem.length == 0) {
					self.$items.append($newItem);
				}
				else {
					$newItem.insertBefore($posItem);
				}
				posIndex++;
			}
			else {
				self.$items.append($newItem);
			}

			$newItem.find("div:jqmData(role^='dvc')").each(function(){
				var role = $(this).jqmData('role');
				if(role) {
					var $this = $(this);
					
					var subid = $this.attr("subid");
					var options = {};
					if(item[subid]) {
						if(role == "dvcImage") {
							options.src = item[subid];
						}
						else if(role == "dvcLabel" || role == "dvcCount") {
							options.text = item[subid];
						}
						else if(role == "dvcRadioButton" || role == "dvcCheckbox" || role == "dvcSwitch") {
							options.checked = item[subid];
						}
						else if(role == "dvcProgress" || role == "dvcSlider") {
							options.value = item[subid];
						}
					}
					
					if(role == "dvcRadioButton" || role == "dvcCheckbox") {
						role = "dvcButton";
					}
					
					if($this.data(role)) {
					//	console.log("duplicate skip role = " + role + ", id = " + subid);
						return true;
					}
					
					$this[role](options);
				}
			});

		}
		return this;
	},
	
	removeItem: function(index) {
		var $el = this.element, self = this;
		$el.find(".dvc-listview-item-indexable").eq(index).remove();
		if(self.scrollview) {
			self.scrollview.scrollTo(0,0);
		}
		return this;
	},

	removeAllItems: function() {
		var $el = this.element, self = this;
		$el.find(".dvc-listview-items").children().remove();
		if(self.scrollview) {
			self.scrollview.scrollTo(0,0);
		}
		return this;
	},
	
	setItems: function(items) {
		this.removeAllItems();
		this.addItems(items);
		return this;
	},
	
	getItemCount: function() {
		var $el = this.element, self = this;
		return $el.find(".dvc-listview-item-indexable").length;
	},
	
	_attachEvent: function() {
		var $el = this.element, self = this, o = this.options;

		$el.find(".dvc-listview-item").live({
			'swipeleft': function(e) {
				if(o.buttonType == "none") {
					return;
				}
				
				var index = $el.find(".dvc-listview-item-indexable").index($(this));
				if(self.enable(index)) {
					var id = $el[0].id;
					$el.trigger("ev_swipeleft", [id, index]);
					e.stopPropagation();
				}
			},
			'swiperight': function(e) {
				if(o.buttonType == "none") {
					return;
				}
				
				var index = $el.find(".dvc-listview-item-indexable").index($(this));
				if(self.enable(index)) {
					var id = $el[0].id;
					$el.trigger("ev_swiperight", [id, index]);
					e.stopPropagation();
				}
			},
			'vmousedown': function(e) {
				self._prevmousedown();
				
				if(o.buttonType == "none") {
					return;
				}
				
				var index = $el.find(".dvc-listview-item-indexable").index($(this));
				
				if(self.enable(index) == true) {
					$(this).addClass("dvc-listview-item-down");
					e.stopPropagation();
				}
			},
			'vmouseup vmousecancel': function(e) {
				if(self._prevmouseup(e)) return;
				
				if(o.buttonType == "none") {
					return;
				}
				
				var index = $el.find(".dvc-listview-item-indexable").index($(this));
				
				if(self.enable(index) == true) {
					$(this).removeClass("dvc-listview-item-down");
					e.stopPropagation();
				}
			},
			'vclick': function(e){
				if(self._prevclick()) return;
				
				if(o.buttonType == "none") {
					return;
				}
				
				if(self.scrollview && self.scrollview._didDrag) {
					return;
				}

				var index = $el.find(".dvc-listview-item-indexable").index($(this));
				
				if(self.enable(index)) {
					var id = $el[0].id;
					
					if(o.buttonType == "checkboxradio" || o.buttonType == "radio") {
						if(self.checked(index) == false) { 
							self.checked(index, true);
						}
						$el.trigger("ev_change", [id, true, index]);
					}
					else if(o.buttonType == "button" || o.buttonType == "link") {
						$el.trigger("ev_click", [id, index]);
					}
					else if(o.buttonType == "checkbox") {
						self.checked(index, !self.checked(index));
						$el.trigger("ev_change", [id, self.checked(index), index]);
					}
					
					e.stopPropagation();					
				}
			}
		});

		$el.find(":jqmData(role^='dvc')").live('ev_click', function(e, id) {
			$(this).parents().each(function() {
				var $this = $(this);
				
				if($this.hasClass("dvc-listview-item-indexable")) {
					var lineIndex = $el.find(".dvc-listview-item-indexable").index($this);
					$el.trigger("ev_click", [id, lineIndex]);
					return false;	// each - break;
				}
				return true; // each - continue;
			});
			
			return false;
		});
		
		$el.find(":jqmData(role^='dvc')").live('ev_change', function(e, id, value) {
			$(this).parents().each(function() {
				var $this = $(this);
				
				if($this.hasClass("dvc-listview-item-indexable")) {
					var lineIndex = $el.find(".dvc-listview-item-indexable").index($this);
					$el.trigger("ev_change", [id, value, lineIndex]);
					return false;	// each - break;
				}
				return true; // each - continue;
			});
			
			return false;
		});
	},
	
	refresh: function() {
		this.enable(-1, this.enable(-1));
		this.visible(this.visible());
		return this;
	},
	
	// jquery 1.6.1이후부터 disabled에 대해 적용되지 않아 수정하였음.
	enable: function(lineIndex, e) {
		var $el = this.element, self = this;
		
		if ( arguments.length == 2 ) {
			if(lineIndex < 0) {
				$.mobile.dvcBase.prototype.enable.call(this, e);
			}
			else {
				var $item = $el.find(".dvc-listview-item-indexable").eq(lineIndex);
				if(e) {
					$item.removeClass("dvc-disabled");
				}
				else {
					$item.addClass("dvc-disabled");
				}
			}
		}
		else {
			if(lineIndex < 0) {
				return $.mobile.dvcBase.prototype.enable.call(this);
			}
			else {
				var $item = $el.find(".dvc-listview-item-indexable").eq(lineIndex);
				return !$item.hasClass("dvc-disabled");
			}
		}
		return this;
	},
	
	checked: function(lineIndex, v){
		var $el = this.element;
		if ( arguments.length == 2 ) {
			if(this.options.buttonType == "checkboxradio") {
				$el.find(".dvc-listview-item-indexable").each(function(index) {
					if(index == lineIndex) {
						$(this).find(".dvc-listview-checkbox-icon").removeClass("dvc-listview-checkbox-icon-hidden");
					}
					else {
						$(this).find(".dvc-listview-checkbox-icon").addClass("dvc-listview-checkbox-icon-hidden");
					}
				});
			}
			else if(this.options.buttonType == "radio") {
				$el.find(".dvc-listview-item-indexable").each(function(index) {
					if(index == lineIndex) {
						$(this).addClass("dvc-listview-radio-down");
					}
					else {
						$(this).removeClass("dvc-listview-radio-down");
					}
				});
			}
			else if(this.options.buttonType == "checkbox") {
				var $item = $el.find(".dvc-listview-item-indexable").eq(lineIndex);
				var $icon = $item.find(".dvc-listview-checkbox-icon");
				
				if(v) {
					$icon.removeClass("dvc-listview-checkbox-icon-hidden");
				}
				else {
					$icon.addClass("dvc-listview-checkbox-icon-hidden");
				}
			}
			return this;
		}
		else {
			var $item = $el.find(".dvc-listview-item-indexable").eq(lineIndex);
			if($item.length) {
				if(this.options.buttonType == "checkboxradio") {
					return !$item.find(".dvc-listview-checkbox-icon").hasClass("dvc-listview-checkbox-icon-hidden");
				}
				else if(this.options.buttonType == "radio") {
					return $item.hasClass("dvc-listview-radio-down");
				}
				else if(this.options.buttonType == "checkbox") {
					return !$item.find(".dvc-listview-checkbox-icon").hasClass("dvc-listview-checkbox-icon-hidden");
				}
			}

			return false;
		}
	},
	
	userData: function(lineIndex, d) {
		var $el = this.element;

		var $item = $el.find(".dvc-listview-item-indexable").eq(lineIndex);
		if ( arguments.length == 2 ) {
			$item.data("userData", d);
			return this;
		}
		else {
			return $item.data("userData");
		}
	},
	
	getEventNames: function() {
		return ["ev_click", "ev_change", "ev_keyup", "ev_swipeleft", "ev_swiperight"];
	}
});

})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcProgress", $.mobile.dvcBase, {
	options: {
		value: 0,
		min:0,
		max:100,
		initSelector: ":jqmData(role='dvcProgress')"
	},
	
	_create: function(){
		var self = this, $el = this.element, o = this.options;
		$el.addClass("dvc-progress");
				
		var progress = $('<div class="dvc-progress-bar" style="width: 0%;"></div>');
		progress.appendTo($el);
		
		this.refresh();
	},

	refresh: function(){
		var self = this, $el = this.element, o = this.options;
		
		$.mobile.dvcBase.prototype.refresh.call(this);
	
		var value = o.value;
		var min = o.min;
		var max = o.max;

		var percent = (parseFloat(value) - min) / (max - min) * 100;
		if ( isNaN(percent) ) { return; }
		if ( percent < 0 ) { percent = 0; }
		if ( percent > 100 ) { percent = 100; }
		
		var $progressbar = $el.find(".dvc-progress-bar");
		$progressbar.css("width", percent + "%");
		
		if(percent == 0) {
			$progressbar.hide();
		}
		else {
			$progressbar.show();
		}
		
		return this;
	},
	
	value: function(percent){
		var self = this, $el = this.element, o = this.options;
		
		if( arguments.length > 0 ) {
			var value = percent;
			var min = o.min;
			var max = o.max;
	
			if( value < min ) {
				value = min;
			} else if( value > max ) {
				value = max;
			}
		
			o.value = value;
			this.refresh();
			
			return this;
		} else {
			var val = o.value;
			if(!val) {
				val = 0;
			}
			return val;
		}
	}
});

})( jQuery );
( function($, undefined) {
$.widget( "mobile.dvcSlider", $.mobile.dvcBase, {
	options: {
		min: 			0,
		max: 			100,
		value: 			0,
		initSelector: 	":jqmData(role='dvcSlider')"
	},

	_create: function() {
		var $el = this.element, self = this, o = self.options; 
		
		$el.addClass( 'dvc-slider' );
		self.range = $( "<div class='dvc-slider-range'></div>" ).appendTo( $el );
   		self.handle = $( "<div class='dvc-slider-handle'></div>" ).appendTo( $el );
   		
   		//slider를 위치수정
		var halfHandle =  self.handle.width() / 2;
		self.handle.css( "margin-left", -halfHandle );
		$el.css( { "margin-left" : halfHandle, "margin-right" : halfHandle } );
		
		self._attachEvent();

		// pageshow가 호출되고 난 후에 refresh를 한다.
		$el.closest( ".ui-page" ).one( "ev_pageshow", function() {
			self.refresh();
		});
	},
	
	_attachEvent: function() {
		var $el = this.element, self = this, o = self.options;
		self.dragState = false;
		
		$el.bind( 'vmousedown', function(event) {
			if ( self.enable() && self._getAncestorEnable() ) {
				self.handle.addClass( "dvc-slider-handle-down" );
				
				self._changehandle( event );
				
				self.dragState = true;				
				return false;
			}
		});
		
		$( document ).bind( 'vmousemove', function(event) {
			if ( self.dragState ) {
				if ( self.enable() && self._getAncestorEnable() ) {
					self._changehandle( event );
				}
			}
		});
		
		$el.add( document ).bind( 'vmouseup', function(event) {
			if ( self.dragState ) {
				if ( self.enable() && self._getAncestorEnable() ) {
					self.handle.removeClass( "dvc-slider-handle-down" );
					self.dragState = false;
					return false;
				}
			}
		});
	},
	
	_changehandle: function(event, skip) {
		var $el = this.element, self = this , o = self.options;
		
		var min = parseInt( o.min );
		var max = parseInt( o.max );
		var bgLeftInPage= $el.offset().left;		//background left- 페이지 전체에서의 위치
		var elBgWidth = $el.width();
		var average = elBgWidth / (max - min);	//min.ax값에 따른 평균 이동거리 (슬라이더길이/(max-min))
		
		var round = 0;
		var section = 0;
		var position = 0;

		if ( typeof(event) == "object" ) {
			position = ( event.pageX - bgLeftInPage ); //선택한 위치px값 (선택위치- background의 left값)
			
			if ( position < 0 ) {
				position = 0;
			} else if ( position > elBgWidth ) {
				position = elBgWidth;					
			}
			round = Math.round( position / average );	//선택한 위치의 구간값을 round시킴
			section = round + min;
		} else {
			section = event;			//사용자가 지정하는 handle의 section값
			round = section - min;	//handle의 section값이 들어오므로 min 값을 빼준다.
			
			//round로 position을 구한다.
			position = round * average;
		}

		if ( round < 0 || round > ( max - min ) ) {
			return;
		}

		if ( !skip ) {
			if ( this.oldValue === section ) {
				return;
			}
		}

		o.value = this.oldValue = section;
		
		self.handle[0].style.left = position + "px";
		self.range[0].style.width = position + "px";
		
		if ( !skip ) {
			var subid = $el.attr( "subid" );
			if ( !subid ) {
				subid = $el[0].id;
			}
			
			$el.trigger( "ev_change", [subid, section] );
		}
	},
	
	refresh: function() {
		var self = this, o = self.options;
		$.mobile.dvcBase.prototype.refresh.call( this );
		
		if ( o.value < o.min ) {
			o.value = o.min;
		} else if ( o.value > o.max ) {
			o.value = o.max;
		}

		self.value( o.value );
		return this;
	},
	
	min: function(v) {
		var self = this , o = self.options;

		o.min = v;
		self.refresh();
		return this;
	},

	max: function(v) {
		var self = this , o = self.options;

		o.max = v;
		self.refresh();
		return this;
	},

	value: function(v) {
		var $el = this.element, self = this , o = self.options;
		
		if ( arguments.length ) {
			self._changehandle( v, true );
			return this;
		} else {
			var val = o.value;
			return val;
		}
	},
	
	getEventNames: function() {
		return ["ev_change"];
	}

});
})(jQuery);
(function($, undefined ) {
$.widget( "mobile.dvcSwitch", $.mobile.dvcBase , {
	options: {
		checked: false,
		duration:          200,                       // Time spent during slide animation
		checkedLabel:      'ON',                      // Text content of "on" state
		uncheckedLabel:    'OFF',                     // Text content of "off" state
		resizeHandle:      true,                      // Automatically resize the handle to cover either label
		resizeContainer:   true,                      // Automatically resize the widget to contain the labels
		containerClass:    'dvc-switch-container',
		labelOnClass:      'dvc-switch-label-on',
		labelOffClass:     'dvc-switch-label-off',
		handleClass:       'dvc-switch-handle',
		handleCenterClass: 'dvc-switch-center',
		handleRightClass:  'dvc-switch-right',
		dragThreshold:     5,                          // Pixels that must be dragged for a click to be ignored
		initSelector: ":jqmData(role='dvcSwitch')"
	},
	
	_create: function(){
		var $el = this.element, self = this, o = self.options;

		$el.addClass( "dvc-switch" );
		
		self._wrapCheckboxWithDivs();
		self._attachEvents();
		self._disableTextSelection();

		if (o.resizeHandle)    { self._optionallyResize('handle'); }
		if (o.resizeContainer) { self._optionallyResize('container'); }
		
		self._initialPosition();
		
		self.refresh();
	},
	
	_wrapCheckboxWithDivs: function() {
		var $el = this.element, self = this, o = self.options;

		$el.addClass(o.containerClass);
		this.container = $el;
		
		this.offLabel  = $('<label class="'+ o.labelOffClass +'">' +
							 '<div style="text-align:center;">'+ o.uncheckedLabel +'</div>' +
						   '</label>').appendTo(this.container);
		this.offSpan   = this.offLabel.children('div');

		this.onLabel   = $('<label class="'+ o.labelOnClass +'">' +
							 '<div style="text-align:center;">'+ o.checkedLabel +'</div>' +
						   '</label>').appendTo(this.container);
		this.onSpan    = this.onLabel.children('div');

		this.handle    = $('<div class="' + o.handleClass + '">' +
							 '<div class="' + o.handleRightClass + '">' +
							   '<div class="' + o.handleCenterClass + '" />' +
							 '</div>' +
						   '</div>').appendTo(this.container);

		// page가 보이지 않는 상태에서 label의 width를 구할 수 없으므로 body에 넣어서 width를 구함.
		var $offLabel = $('<div style="position:absolute;left:-2000px;" class="dvc-switch-container"><label class="'+ o.labelOffClass +'">' +
							 '<div style="text-align:center;">'+ o.uncheckedLabel +'</div>' +
						   '</label></div>');
		$("body").append($offLabel);
		this.offLabelWidth = $offLabel.children().width();
		$offLabel.remove();
		
		var $onLabel = $('<div style="position:absolute;left:-2000px;" class="dvc-switch-container"><label class="'+ o.labelOnClass +'">' +
							 '<div style="text-align:center;">'+ o.checkedLabel +'</div>' +
						   '</label></div>');
		$("body").append($onLabel);
		this.onLabelWidth = $onLabel.children().width();
		$onLabel.remove();
	},
	
	_attachEvents: function() {
		var $el = this.element, self = this, o = self.options;

		// drag에 대해 한번만
		if (!$.mobile.dvcSwitch.initComplete) {
			// As the mouse moves on the page, animate if we are in a drag state
			$(document)
			.bind('vmousemove', function(event) {
				if (!$.mobile.dvcSwitch.currentlyClicking) { return; }
				event.preventDefault();

				var x = event.pageX || event.originalEvent.changedTouches[0].pageX;
				if (!$.mobile.dvcSwitch.dragging &&
					(Math.abs($.mobile.dvcSwitch.dragStartPosition - x) > o.dragThreshold)) { 
					$.mobile.dvcSwitch.dragging = true; 
				}

				$(event.target).trigger('iPhoneDrag', [x]);
			})

			// When the mouse comes up, leave drag state
			.bind('vmouseup', function(event) {
				if (!$.mobile.dvcSwitch.currentlyClicking) { return; }
				event.preventDefault();

				var x = event.pageX || event.originalEvent.changedTouches[0].pageX;
				$($.mobile.dvcSwitch.currentlyClicking).trigger('iPhoneDragEnd', [x]);
			});

			$.mobile.dvcSwitch.initComplete = true;
		}
		
		// A mousedown anywhere in the control will start tracking for dragging
		self.container
		.bind('vmousedown', function(event) {          
			event.preventDefault();

			if(self.enable() == false && self.getAncestorEnable() == true) {
				return;
			}
			
//			jqmDavinci.hideKeypad();
			var x = event.pageX || event.originalEvent.changedTouches[0].pageX;
				$.mobile.dvcSwitch.currentlyClicking = self.handle;
				$.mobile.dvcSwitch.dragStartPosition = x;
				$.mobile.dvcSwitch.handleLeftOffset  = parseInt(self.handle.css('left'), 10) || 0;
				$.mobile.dvcSwitch.dragStartedOn     = self.element;
			})

		// Utilize event bubbling to handle drag on any element beneath the container
		.bind('iPhoneDrag', function(event, x) {
			event.preventDefault();

			if(self.enable() == false && self.getAncestorEnable() == true) {
				return;
			}
			
			if (self.element != $.mobile.dvcSwitch.dragStartedOn) { return; }

			var p = (x + $.mobile.dvcSwitch.handleLeftOffset - $.mobile.dvcSwitch.dragStartPosition) / self.rightSide;
			if (p < 0) { p = 0; }
			if (p > 1) { p = 1; }
			self.handle.css({ left: p * self.rightSide });
			self.offLabel.css({ width: (1 - p) * self.rightSide + 4 });
			self.onLabel.css({ width: p * self.rightSide + 4 });
			self.offSpan.css({ marginRight: -p * self.rightSide });
			self.onSpan.css({ marginLeft: -(1 - p) * self.rightSide });
		})

		// Utilize event bubbling to handle drag end on any element beneath the container
		.bind('iPhoneDragEnd', function(event, x) {
			if(self.enable() == false && self.getAncestorEnable() == true) {
				return;
			}

			var checked, oldChecked = self.checked();
			
			if ($.mobile.dvcSwitch.dragging) {
				var p = (x - $.mobile.dvcSwitch.dragStartPosition) / self.rightSide;
				checked = (p < 0) ? Math.abs(p) < 0.5 : p >= 0.5;
			} else {
				checked = !self.checked();
			}

			if(oldChecked != checked) {
				self.checked(checked);

				var subid = $el.attr("subid");
				if(!subid) {
					subid = $el[0].id;
				}
				
				self.element.trigger("ev_change", [subid, checked]);
			}
			else {
				self._change();	
			}
			
			$.mobile.dvcSwitch.currentlyClicking = null;
			$.mobile.dvcSwitch.dragging = null;			
		});
	},

	// Animate when we get a change event
	_change: function() {
		var $el = this.element, self = this, o = self.options;
	
		if(this.enable() == false && self.getAncestorEnable() == true) {
			return;
		}

		var new_left = 0;
		if(this.checked()) {
			new_left = this.rightSide;
		}

		this.handle.animate({         left: new_left },                 o.duration);
		this.offLabel.animate({ 	width: this.rightSide + 4 },				o.duration);
		this.onLabel.animate({       width: new_left + 4 },             o.duration);
		this.offSpan.animate({ marginRight: -new_left },                o.duration);
		this.onSpan.animate({   marginLeft: new_left - this.rightSide }, o.duration);
	},	
	
	_disableTextSelection: function() {
		if (!$.browser.msie) { return; }

		// Elements containing text should be unselectable
		$.each([this.handle, this.offLabel, this.onLabel, this.container], function() {
			$(this).attr("unselectable", "on");
		});
	},
	
	// Automatically resize the handle or container
	_optionallyResize: function(mode) {
		var onLabelWidth = this.onLabelWidth,
		offLabelWidth = this.offLabelWidth;
		
		// 최소 31px보다 작지 않게 한다.
		if(onLabelWidth < 31) {
			onLabelWidth = 31;
		}
		if(offLabelWidth < 31) {
			offLabelWidth = 31;
		}

		if (mode == 'container') {
			var newWidth = (onLabelWidth > offLabelWidth) ? onLabelWidth : offLabelWidth;
			newWidth += this.handle.width() + 15; 
		} else { 
			var newWidth = (onLabelWidth < offLabelWidth) ? onLabelWidth : offLabelWidth;
		}

		this[mode].css({ width: newWidth });
	},
	
	_initialPosition: function() {
		var onLabelWidth = this.onLabelWidth;
		// 최소 31px보다 작지 않게 한다.
		if(onLabelWidth < 31) {
			onLabelWidth = 31;
		}
		this.offLabel.css({ width: this.container.width() - onLabelWidth });

		var offset = ($.browser.msie && $.browser.version < 7) ? 3 : 6;
		this.rightSide = this.container.width() - this.handle.width() - offset;

		if(this.checked()) {
			this.handle.css({ left: this.rightSide });
			this.onLabel.css({ width: this.rightSide + 4 });
			this.offSpan.css({ marginRight: -this.rightSide });
		} else {
			this.onLabel.css({ width: 0 });
			this.onSpan.css({ marginLeft: -this.rightSide });
		}
	},

	checked: function(v) {
		if ( arguments.length ) {
			this.options.checked = v;
			this._change();
			return this;
		}
		else {
			return this.options.checked;
		}
	},
	
	getEventNames: function() {
		return ["ev_change"];
	}
	
});

})( jQuery );
// jQuery Mobile의 experiment에 있는 mobile.scrollview의 코드를 사용했음.

(function($,window,document,undefined){

jQuery.widget( "mobile.dvcScrollview", $.mobile.dvcBase, {
	options: {
		fps:               60,    // Frames per second in msecs.
		direction:         null,  // "x", "y", or null for both.
		
		scrollDuration:    2000,  // Duration of the scrolling animation in msecs.
		overshootDuration: 250,   // Duration of the overshoot animation in msecs.
		snapbackDuration:  500,   // Duration of the snapback animation in msecs.
		
		moveThreshold:     10,   // User must move this many pixels in any direction to trigger a scroll.
		moveIntervalThreshold:     300,   // Time between mousemoves must not exceed this threshold.
		
		scrollMethod:      "translate",  // "translate", "position", "scroll"
		
		startEventName:    "ev_scrollstart",
		updateEventName:   "ev_scrollupdate",
		stopEventName:     "ev_scrollstop",
	
		eventType:         $.support.touch ? "touch" : "mouse",
	
		showScrollBars:    true,
		
		pagingEnabled:     false,
		
		delayedClickSelector: ".dvc-treeview-node-background *, textarea, input, .dvc-listview-item, .dvc-layoutview, .dvc-label, .dvc-button, .dvc-imagebutton, .dvc-switch-container, .dvc-radiobutton, .dvc-checkbox, .dvc-slider",
		delayedClickEnabled: true,
		
		scrollBodyWidth: 0,
		nextLoadingBarHeight:0,			// Listview 상단에 표시되는 LoadingBar의 높이
		initSelector: ":jqmData(role='dvcScrollview')"
	},
	
	_makePositioned: function($ele)
	{
		if ($ele.css("position") == "static")
			$ele.css("position", "relative");
	},
	
	delayedClickSelector: function(d) {
		if (arguments[0] != undefined) {
			this.options.delayedClickSelector = d;
		}
		else {
			return this.options.delayedClickSelector;
		}
	},

	_create: function()
	{ 
		this._$clip = $(this.element).addClass("ui-scrollview-clip");
		this._$clip.wrapInner($("<div>"));

		var $child = this._$clip.children();
		this._$view = $child.addClass("ui-scrollview-view");
		
		if(this.options.scrollBodyWidth) {
			this._$view.css("min-width", this.options.scrollBodyWidth);
		}
	
		this._$clip.css("overflow", this.options.scrollMethod === "scroll" ? "scroll" : "hidden");
		this._makePositioned(this._$clip);

		this._$view.css("overflow", "hidden");

		// Turn off our faux scrollbars if we are using native scrolling
		// to position the view.

		this.options.showScrollBars = this.options.scrollMethod === "scroll" ? false : this.options.showScrollBars;

		// We really don't need this if we are using a translate transformation
		// for scrolling. We set it just in case the user wants to switch methods
		// on the fly.

		this._makePositioned(this._$view);
		this._$view.css({ left: 0, top: 0 });

		this._sx = 0;
		this._sy = 0;

		this._initMomentumTracker();
		
		this.refresh();
	},
	
	_initMomentumTracker: function() {
		var direction = this.options.direction;
		this._hTracker = (direction !== "y")   ? new MomentumTracker(this.options) : null;
		this._vTracker = (direction !== "x") ? new MomentumTracker(this.options) : null;
	
		this._timerInterval = 1000/this.options.fps;
		this._timerID = 0;
	
		var self = this;
		this._timerCB = function(){ self._handleMomentumScroll(); };
	
		this._addBehaviors();
	
		this._setScrollPosition(0, -this.options.nextLoadingBarHeight);		
	},
	
	_startMScroll: function(speedX, speedY)
	{
		this._stopMScroll();
		this._showScrollBars();

		var keepGoing = false;
		var duration = this.options.scrollDuration;
		
		var subid = this.element.attr("subid");
		if(!subid) {
			subid = this.element[0].id;
		}

		this._$clip.trigger(this.options.startEventName, subid);

		var ht = this._hTracker;
		if (ht)
		{
			var c = this._$clip.width();
			var v = this._$view.width();
			ht.start(this._sx, speedX, duration, (v > c) ? -(v - c) : 0, 0);
			keepGoing = !ht.done();
		}

		var vt = this._vTracker;
		if (vt)
		{
			var c = this._$clip.height();
			var v = this._$view.height();
			vt.start(this._sy, speedY, duration, (v > (c + this.options.nextLoadingBarHeight)) ? -(v - c) : -this.options.nextLoadingBarHeight, -this.options.nextLoadingBarHeight);
			keepGoing = keepGoing || !vt.done();
		}

		if (keepGoing)
			this._timerID = setTimeout(this._timerCB, this._timerInterval);
		else
			this._stopMScroll();
	},
	
	_setScrollPosition: function(x, y)
	{
		this._sx = x;
		this._sy = y;

		var $v = this._$view;

		var $vsb = this._$vScrollBar;
		var $hsb = this._$hScrollBar;

		var sm = this.options.scrollMethod;
		var vheight = this._viewHeight;
		var vwidth = this._viewWidth;
		var yyy = -y/vheight * this.vsbtHeight;
		var xxx = -x/vwidth * this.hsbtWidth;

		switch (sm)
		{
			case "translate":
				//setElementTransform($v, x + "px", y + "px");
				$v[0].style['webkitTransform'] = 'translate3d(' + x + 'px,' + y + 'px' + ',0)';
				break;
			case "position":
				$v.css({left: x + "px", top: y + "px"});
				break;
			case "scroll":
				var c = this._$clip[0];
				c.scrollLeft = -x;
				c.scrollTop = -y;
				break;
		}
		if ($vsb)
		{
			if (sm === "translate")
//				//setElementTransform($sbt, "0px", -y/$v.height() * $sbt.parent().height() + "px");
				this.$vsbt[0].style['webkitTransform'] = 'translate3d(0px,' + yyy + 'px' + ',0)';
			else
				this.$vsbt.css("top", -y/$v.height()*100 + "%");
		}
	

		if ($hsb)
		{
			if (sm === "translate")
				//setElementTransform($sbt,  -x/$v.width() * $sbt.parent().width() + "px", "0px");
				this.$hsbt[0].style['webkitTransform'] = 'translate3d(' + xxx + 'px, 0, 0)';
			else
				$sbt.css("left", -x/$v.width()*100 + "%");
		}
	},
	
	_stopMScroll: function(skip)
	{
		if (this._timerID)
		{
			var subid = this.element.attr("subid");
			if(!subid) {
				subid = this.element[0].id;
			}
			
			this._$clip.trigger(this.options.stopEventName, subid);
			clearTimeout(this._timerID);
		}
		this._timerID = 0;

		if (this._vTracker)
			this._vTracker.reset();

		if (this._hTracker)
			this._hTracker.reset();
		
		if(!skip) {
			this._hideScrollBars();
		}
	},
	
	_getScrollHierarchy: function()
	{
		var svh = [];
		this._$clip.parents(".ui-scrollview-clip").each(function(){
			var d = $(this).jqmData("dvcScrollview");
			if (d) svh.unshift(d);
		});
		return svh;
	},

	_getAncestorByDirection: function(dir)
	{
		var svh = this._getScrollHierarchy();
		var n = svh.length;
		while (0 < n--)
		{
			var sv = svh[n];
			var svdir = sv.options.direction;

			if (!svdir || svdir == dir)
				return sv;
		}
		return null;
	},
	
	_addBehaviors: function()
	{
		var self = this;
		if (this.options.eventType === "mouse")
		{
			this._dragStartEvt = "mousedown";
			this._dragStartCB = function(e){ return self._handleDragStart(e, e.clientX, e.clientY); };

			this._dragMoveEvt = "mousemove";
			this._dragMoveCB = function(e){ return self._handleDragMove(e, e.clientX, e.clientY); };

			this._dragStopEvt = "mouseup";
			this._dragStopCB = function(e){ return self._handleDragStop(e); };
		}
		else // "touch"
		{
			this._dragStartEvt = "touchstart";
			this._dragStartCB = function(e)
			{
				var t = e.originalEvent.targetTouches[0];
				return self._handleDragStart(e, t.pageX, t.pageY);
			};

			this._dragMoveEvt = "touchmove";
			this._dragMoveCB = function(e)
			{
				var t = e.originalEvent.targetTouches[0];
				return self._handleDragMove(e, t.pageX, t.pageY);
			};

			this._dragStopEvt = "touchend";
			this._dragStopCB = function(e){ return self._handleDragStop(e); };
		}

		this._$clip.bind(this._dragStartEvt, this._dragStartCB);		// $view가 아닌 $clip전체에서 dragStart가 되도록 함.

		if (this.options.showScrollBars)
		{
			var $c = this._$clip;
			var prefix = "<div class=\"ui-scrollbar ui-scrollbar-";
			var suffix = "\"><div class=\"ui-scrollbar-track\"><div class=\"ui-scrollbar-thumb\"></div></div></div>";
			if (this._vTracker)
			{
				$c.append(prefix + "y" + suffix);
				this._$vScrollBar = $c.children(".ui-scrollbar-y");
				this.$vsbt = this._$vScrollBar.find(".ui-scrollbar-thumb");
			}
			if (this._hTracker)
			{
				$c.append(prefix + "x" + suffix);
				this._$hScrollBar = $c.children(".ui-scrollbar-x");
				this.$hsbt = this._$hScrollBar.find(".ui-scrollbar-thumb");
			}
		}
	},

	_handleDragStart: function(e, ex, ey)
	{
		if(this.enable()==false) {
			return;
		}
		
		// Stop any scrolling of elements in our parent hierarcy.
		$.each(this._getScrollHierarchy(),function(i,sv){ sv._stopMScroll(); sv._didDrag = false;});
		this._stopMScroll();

		var c = this._$clip;
		var v = this._$view;
		this._viewHeight = v.height();
		this._viewWidth = v.width();
		this.sendVMoustdown = false;

		if (this.options.delayedClickEnabled) {
			this._$clickEle = $(e.target).closest(this.options.delayedClickSelector);
			if(this._$clickEle.length > 0) {
				if(this._$clickEle[0].nodeName != "INPUT" && this._$clickEle[0].nodeName != "TEXTAREA") {
					var self = this;
					var ev = new $.Event("vmousedown");
					ev.originalEvent = e.originalEvent;
					ev.pageX = ex;
					ev.pageY = ey;
					
					// slider나 switch 처럼 vmousemove를 받아야 하는 애들한테는 직접 넘겨줘야 한다.
					if(this._$clickEle.hasClass("dvc-switch-container") || this._$clickEle.hasClass("dvc-slider")) {
						this._$clickEle.trigger(ev);
					}
					else {
						// 50ms후에 vmousedown을 보낼 것을 예약한다.
						this.timerID = setTimeout(function(ev) {
							self._$clickEle.trigger(ev);
							self.timerID = 0;
							self.sendVMoustdown = true;
						}, 50, ev);
					}
				}
				else {
					// input이면, event를 전달하도록 한다.
					return;
				}
			}
		}
		
		this._lastX = ex;
		this._lastY = ey;
		this._doSnapBackX = false;
		this._doSnapBackY = false;
		this._speedX = 0;
		this._speedY = 0;
		this._directionLock = "";
		this._didDrag = false;

		if (this._hTracker)
		{
			var cw = parseInt(c.css("width"), 10);
			var vw = parseInt(v.css("width"), 10);
			this._maxX = cw - vw;
			if (this._maxX > 0) this._maxX = 0;
			if (this._$hScrollBar) {
				this.$hsbt.css("width", (cw >= vw ? "100%" : Math.floor(cw/vw*100) +"%"));
				this.hsbtWidth = this.$hsbt.parent().width();
			}
		}

		if (this._vTracker)
		{
			var ch = parseInt(c.css("height"), 10);
			var vh = parseInt(v.css("height"), 10);
			this._maxY = ch - vh;
			if (this._maxY > 0) this._maxY = 0;
			if (this._$vScrollBar) {
				this.$vsbt.css("height", (ch >= vh ? "100%" : Math.floor(ch/vh*100) + "%"));
				this.vsbtHeight = this.$vsbt.parent().height();
			}
		}

		var svdir = this.options.direction;

		this._pageDelta = 0;
		this._pageSize = 0;
		this._pagePos = 0; 

		if (this.options.pagingEnabled && (svdir === "x" || svdir === "y"))
		{
			this._pageSize = svdir === "x" ? cw : ch;
			this._initPagePos = svdir === "x" ? this._sx : this._sy;
			this._pagePos = this._initPagePos - (this._initPagePos % this._pageSize);
		}
		this._lastMove = 0;
		this._enableTracking();

		// If we're using mouse events, we need to prevent the default
		// behavior to suppress accidental selection of text, etc. We
		// can't do this on touch devices because it will disable the
		// generation of "click" events.
		//
		// XXX: We should test if this has an effect on links! - kin

		if (this.options.eventType == "mouse" || this.options.delayedClickEnabled)
			e.preventDefault();
		e.stopPropagation();
	},

	_propagateDragMove: function(sv, e, ex, ey, dir)
	{
		this._hideScrollBars();
		this._disableTracking();
		sv._handleDragStart(e,ex,ey);
		sv._directionLock = dir;
		sv._didDrag = this._didDrag;
	},
	
	_handleDragMove: function(e, ex, ey)
	{
		if(this.enable()==false) {
			return;
		}
		
		this._lastMove = getCurrentTime();

		var v = this._$view;

		var dx = ex - this._lastX;
		var dy = ey - this._lastY;
		var svdir = this.options.direction;

		if (this._didDrag == false && this.options.delayedClickEnabled) {
			if(this._$clickEle.length > 0) {
				if(this._$clickEle.hasClass("dvc-switch-container") || this._$clickEle.hasClass("dvc-slider")) {
					var ev = new $.Event("vmousemove");
					ev.originalEvent = e.originalEvent;
					ev.pageX = ex;
					ev.pageY = ey;
					this._$clickEle.trigger(ev);
					return false;
				}
			}
		}
		
		if (!this._directionLock)
		{
			var x = Math.abs(dx);
			var y = Math.abs(dy);
			var mt = this.options.moveThreshold;

			if (x < mt && y < mt) {
				return false;
			}

			var dir = null;
			var r = 0;
			if (x < y && (x/y) < 0.5) {
				dir = "y";
			}
			else if (x > y && (y/x) < 0.5) {
				dir = "x";
			}

			if (svdir && dir && svdir != dir)
			{
				// This scrollview can't handle the direction the user
				// is attempting to scroll. Find an ancestor scrollview
				// that can handle the request.

				var sv = this._getAncestorByDirection(dir);
				if (sv)
				{
					this._propagateDragMove(sv, e, ex, ey, dir);
					return false;
				}
			}

			this._directionLock = svdir ? svdir : (dir ? dir : "none");
		}

		var newX = this._sx;
		var newY = this._sy;

		if (this._directionLock !== "y" && this._hTracker)
		{
			var x = this._sx;
			this._speedX = dx;
			newX = x + dx;

			// Simulate resistance.

			this._doSnapBackX = false;
			if (newX > 0 || newX < this._maxX)
			{
				if (this._directionLock === "x")
				{
					var sv = this._getAncestorByDirection("x");
					if (sv)
					{
						this._setScrollPosition(newX > 0 ? 0 : this._maxX, newY);
						this._propagateDragMove(sv, e, ex, ey, dir);
						return false;
					}
				}
				newX = x + (dx/2);
				this._doSnapBackX = true;
			}
		}

		if (this._directionLock !== "x" && this._vTracker)
		{
			var y = this._sy;
			this._speedY = dy;
			newY = y + dy;

			// Simulate resistance.
			this._doSnapBackY = false;
			if (newY > -this.options.nextLoadingBarHeight || newY < this._maxY)
			{
				if (this._directionLock === "y")
				{
					var sv = this._getAncestorByDirection("y");
					if (sv)
					{
						this._setScrollPosition(newX, newY > 0 ? 0 : this._maxY);
						this._propagateDragMove(sv, e, ex, ey, dir);
						return false;
					}
				}

				newY = y + (dy/2);
				this._doSnapBackY = true;
			}
		}

		if (this.options.pagingEnabled && (svdir === "x" || svdir === "y"))
		{
			if (this._doSnapBackX || this._doSnapBackY)
				this._pageDelta = 0;
			else
			{
				// _pagePos는 touchstart가 아닌, touchmove시에 방향을 확인한 후에 추출해야 한다.
				var cpos = svdir === "x" ? newX : newY;
				var delta = svdir === "x" ? dx : dy;
				
				if(delta < 0) {	// 오른쪽 또는 아래
					this._pagePos = this._initPagePos - this._pageSize;
				}
				else {
					this._pagePos = this._initPagePos;
				}
				
				this._pagePos -= (this._initPagePos % this._pageSize);
				var opos = this._pagePos;
				
				this._pageDelta = (opos > cpos && delta < 0) ? this._pageSize : ((opos < cpos && delta > 0) ? -this._pageSize : 0);
			}
		}

		if(this._didDrag == false) {
			// vmousedown이 예약되어 있으면...
			if(this.timerID) {
				clearTimeout(this.timerID);
				this.timerID = 0;
			}
			
			var ev = new $.Event("vmousecancel");
			ev.originalEvent = e.originalEvent;
			ev.pageX = e.pageX;
			ev.pageY = e.pageY;
			this._$clickEle.trigger(ev);
		}
		
		if(this.options.nextLoadingBarHeight > 0 || this.oldNextLoadingBarHeight) {
			if(newY > 0) {
				if(!this._toggleRefresh) {
					this._toggleRefresh = true;
					this.oldNextLoadingBarHeight = this.options.nextLoadingBarHeight;
					this.options.nextLoadingBarHeight = 0;
					this._$clip.trigger("ev_change", [this.element[0].id, "refresh-pulldown"]);
				}
			}
			else {
				if(this._toggleRefresh) {
					this._toggleRefresh = false;
					this.options.nextLoadingBarHeight = this.oldNextLoadingBarHeight;
					this.oldNextLoadingBarHeight = 0;
					this._$clip.trigger("ev_change", [this.element[0].id, "refresh-pushup"]);
				}
			}

			var c = this._$clip.height();
			var v = this._$view.height();
			if(v > (c + this.options.nextLoadingBarHeight)) {
				if(!this._toggleMore) {
					// 이때, 이전페이지가 보였는 지를 검사한다.
					if((v - c) < -(newY)) {
						this._toggleMore = true;
						this._$clip.trigger("ev_change", [this.element[0].id, "more-pullup"]);
					}
				}
				else {
					// 이때, 이전페이지가 보였는 지를 검사한다.
					if((v - c) > -(newY)) {
						this._toggleMore = false;
						this._$clip.trigger("ev_change", [this.element[0].id, "more-pushdown"]);
					}
				}
			}
		}

		this._didDrag = true;
		this._lastX = ex;
		this._lastY = ey;

		this._setScrollPosition(newX, newY);

		this._showScrollBars();

		// Call preventDefault() to prevent touch devices from
		// scrolling the main window.

		// e.preventDefault();
		
		return false;
	},
	
	_handleMomentumScroll: function()
	{
		var keepGoing = false;
		var v = this._$view;

		var x = 0, y = 0;

		var vt = this._vTracker;
		if (vt)
		{
			vt.update();
			y = vt.getPosition();
			keepGoing = !vt.done();
		}

		var ht = this._hTracker;
		if (ht)
		{
			ht.update();
			x = ht.getPosition();
			keepGoing = keepGoing || !ht.done();
		}

		this._setScrollPosition(x, y);

		var subid = this.element.attr("subid");
		if(!subid) {
			subid = this.element[0].id;
		}
		this._$clip.trigger(this.options.updateEventName, [subid, { x: x, y: y } ]);

		if (keepGoing)
			this._timerID = setTimeout(this._timerCB, this._timerInterval);	
		else {
			if(this._toggleRefresh) {
				this._toggleRefresh = false;
				this.options.nextLoadingBarHeight = this.oldNextLoadingBarHeight;
				this.oldNextLoadingBarHeight = 0;
				this._$clip.trigger("ev_change", [this.element[0].id, "refresh-release"]);
			}
			
			if(this._toggleMore) {
				this._toggleMore = false;
				this._$clip.trigger("ev_change", [this.element[0].id, "more-release"]);
			}
			this._stopMScroll();
		}
	},
	
	scrollTo: function(x, y, duration)
	{
		this._stopMScroll();
		
		var v = this._$view.height();
		var c = this._$clip.height();
		if (!duration) {
			if((v - c - this.options.nextLoadingBarHeight) > 0) {
				if(y < -(v - c - this.options.nextLoadingBarHeight)) {
					y = -(v - c - this.options.nextLoadingBarHeight);
				}
			}
			
			return this._setScrollPosition(x, y - this.options.nextLoadingBarHeight);
		}

		if((v - c - this.options.nextLoadingBarHeight) > 0) {
			if(y > (v - c - this.options.nextLoadingBarHeight)) {
				y = (v - c - this.options.nextLoadingBarHeight);
			}
		}

		y = y + this.options.nextLoadingBarHeight;

		x = -x;
		y = -y;

		var self = this;
		var start = getCurrentTime();
		var efunc = $.easing["easeOutQuad"];
		var sx = this._sx;
		var sy = this._sy;
		var dx = x - sx;
		var dy = y - sy;
		var tfunc = function(){
			var elapsed = getCurrentTime() - start;
			if (elapsed >= duration)
			{
				self._timerID = 0;
				self._setScrollPosition(x, y);
			}
			else
			{
				var ec = efunc(elapsed/duration, elapsed, 0, 1, duration);
				self._setScrollPosition(sx + (dx * ec), sy + (dy * ec));
				self._timerID = setTimeout(tfunc, self._timerInterval);
			}
		};

		this._timerID = setTimeout(tfunc, this._timerInterval);
	},

	getScrollPosition: function()
	{
		return { x: -this._sx, y: -(this._sy + this.options.nextLoadingBarHeight) };
	},

	_handleDragStop: function(e)
	{
		if(this.enable()==false) {
			return;
		}
		
		var l = this._lastMove;
		var t = getCurrentTime();
		var doScroll = l && (t - l) <= this.options.moveIntervalThreshold;

		// scrollview가 멈춰있어야 할 곳을 넘어가 있으면... 강제로 this._doSnapBackY = true로 하여 위나 아래로 붙도록 한다.
		var v = this._$view.height();
		var c = this._$clip.height();
		var posY = this.getScrollPosition().y;
		if((v - c - this.options.nextLoadingBarHeight) > 0) {
			if(posY < 0 || posY > (v - c - this.options.nextLoadingBarHeight)) {
				this._doSnapBackY = true;
			}
		}
		else {
			if(posY != 0) {
				this._doSnapBackY = true;
			}
		}
		
		var sx = (this._hTracker && this._speedX && doScroll) ? this._speedX : (this._doSnapBackX ? 1 : 0);
		var sy = (this._vTracker && this._speedY && doScroll) ? this._speedY : (this._doSnapBackY ? 1 : 0);

		var svdir = this.options.direction;
		if (this.options.pagingEnabled && (svdir === "x" || svdir === "y") && !this._doSnapBackX && !this._doSnapBackY)
		{
			var x = this._sx;
			var y = this._sy;
			if (svdir === "x")
				x = -this._pagePos + this._pageDelta;
			else
				y = -this._pagePos + this._pageDelta;

			this.scrollTo(x, y, this.options.snapbackDuration);
		}
		else if (sx || sy)
			this._startMScroll(sx, sy);
		else
			this._hideScrollBars();

		this._disableTracking();

		if (!this._didDrag && this.options.delayedClickEnabled && this._$clickEle.length) {
			if(this.timerID) {
				clearTimeout(this.timerID);
				this.timerID = 0;
			}
			
			var ev = new $.Event("vmouseup");
			ev.originalEvent = e.originalEvent;
			ev.pageX = e.pageX;
			ev.pageY = e.pageY;
			
			if(this._$clickEle.hasClass("dvc-switch-container")) {
				$(document).trigger(ev);
			}
			else {
				this._$clickEle.trigger(ev);
			}
			
			if(this.options.eventType == "touch") {
				this._$clickEle.trigger("vclick");
			}
		}

		return false;
	},
	
	_enableTracking: function()
	{
		$(document).bind(this._dragMoveEvt, this._dragMoveCB);
		$(document).bind(this._dragStopEvt, this._dragStopCB);
	},

	_disableTracking: function()
	{
		$(document).unbind(this._dragMoveEvt, this._dragMoveCB);
		$(document).unbind(this._dragStopEvt, this._dragStopCB);
	},

	_showScrollBars: function()
	{
		var vclass = "ui-scrollbar-visible";
		if (this._$vScrollBar) this._$vScrollBar.addClass(vclass);
		if (this._$hScrollBar) this._$hScrollBar.addClass(vclass);
	},

	_hideScrollBars: function()
	{
		var vclass = "ui-scrollbar-visible";
		if (this._$vScrollBar) this._$vScrollBar.removeClass(vclass);
		if (this._$hScrollBar) this._$hScrollBar.removeClass(vclass);
	},
	
	getEventNames: function() {
		return ["ev_change", "ev_scrollstart", "ev_scrollupdate", "ev_scrollstop"];
	}
});

function setElementTransform($ele, x, y)
{
	var v = "translate3d(" + x + "," + y + ", 0px)";
	$ele.css({
		"-moz-transform": v,
		"-webkit-transform": v,
		"transform": v
	});
}

function MomentumTracker(options)
{
	this.options = $.extend({}, options);
	this.easing = "easeOutQuad";
	this.reset();
}

var tstates = {
	scrolling: 0,
	overshot:  1,
	snapback:  2,
	done:      3
};

function getCurrentTime() { return (new Date()).getTime(); }

$.extend(MomentumTracker.prototype, {
	start: function(pos, speed, duration, minPos, maxPos)
	{
		this.state = (speed != 0) ? ((pos < minPos || pos > maxPos) ? tstates.snapback : tstates.scrolling) : tstates.done;
		this.pos = pos;
		this.speed = speed;
		this.duration = (this.state == tstates.snapback) ? this.options.snapbackDuration : duration;
		this.minPos = minPos;
		this.maxPos = maxPos;

		this.fromPos = (this.state == tstates.snapback) ? this.pos : 0;
		this.toPos = (this.state == tstates.snapback) ? ((this.pos < this.minPos) ? this.minPos : this.maxPos) : 0;

		this.startTime = getCurrentTime();
	},

	reset: function()
	{
		this.state = tstates.done;
		this.pos = 0;
		this.speed = 0;
		this.minPos = 0;
		this.maxPos = 0;
		this.duration = 0;
	},

	update: function()
	{
		var state = this.state;
		if (state == tstates.done)
			return this.pos;

		var duration = this.duration;
		var elapsed = getCurrentTime() - this.startTime;
		elapsed = elapsed > duration ? duration : elapsed;

		if (state == tstates.scrolling || state == tstates.overshot)
		{
			var dx = this.speed * (1 - $.easing[this.easing](elapsed/duration, elapsed, 0, 1, duration));
	
			var x = this.pos + dx;
	
			var didOverShoot = (state == tstates.scrolling) && (x < this.minPos || x > this.maxPos);
			if (didOverShoot)
				x = (x < this.minPos) ? this.minPos : this.maxPos;
		
			this.pos = x;
	
			if (state == tstates.overshot)
			{
				if (elapsed >= duration)
				{
					this.state = tstates.snapback;
					this.fromPos = this.pos;
					this.toPos = (x < this.minPos) ? this.minPos : this.maxPos;
					this.duration = this.options.snapbackDuration;
					this.startTime = getCurrentTime();
					elapsed = 0;
				}
			}
			else if (state == tstates.scrolling)
			{
				if (didOverShoot)
				{
					this.state = tstates.overshot;
					this.speed = dx / 2;
					this.duration = this.options.overshootDuration;
					this.startTime = getCurrentTime();
				}
				else if (elapsed >= duration)
					this.state = tstates.done;
			}
		}
		else if (state == tstates.snapback)
		{
			if (elapsed >= duration)
			{
				this.pos = this.toPos;
				this.state = tstates.done;		
			}
			else
				this.pos = this.fromPos + ((this.toPos - this.fromPos) * $.easing[this.easing](elapsed/duration, elapsed, 0, 1, duration));
		}

		return this.pos;
	},

	done: function() { return this.state == tstates.done; },
	getPosition: function(){ return this.pos; }
});

})(jQuery,window,document); // End Component
(function($, undefined ) {
$.widget( "mobile.dvcPicker", $.mobile.dvcScrollview, {
	options: {
		itemHeight: 36,
		showScrollBars: false,
		direction: "y",
		initSelector: ":jqmData(role='dvcPicker')"
	},
	
	_create: function() {
		var $el = this.element, self = this;
		$el.addClass("dvc-picker");
		
		$("<div class='dvc-picker-slots-wrapper'><div class='dvc-picker-slots ui-scrollview-view'><ul></ul></div><div class='dvc-picker-frame'></div></div>").appendTo($el);
		
		this._$clip = $el.children().addClass("scrollview-clip");
		var $child = this._$clip.find(".ui-scrollview-view");
		if ($child.length > 1) {
			$child = this._$clip.wrapInner("<div></div>").children();
		}
		this._$view = $child;

		this._$clip.css("overflow", "hidden");
		this._makePositioned(this._$clip);

		this._$view.css("overflow", "hidden");

		this._makePositioned(this._$view);
		this._$view.css({ left: 0, top: 0 });

		this._sy = 0;
		
		this._oldIndex = -1;
	
		this._initMomentumTracker();
	},

	_handleMomentumScroll: function()
	{
		var keepGoing = false;
		var v = this._$view;

		var y = 0;

		var vt = this._vTracker;
		if (vt)
		{
			vt.update();
			y = vt.getPosition();
			keepGoing = !vt.done();
		}

		this._setScrollPosition(0, y);

		if (keepGoing)
			this._timerID = setTimeout(this._timerCB, this._timerInterval);	
		else {
			// 여기가 drag시 마지막 멈추는 시점임.
			// 36px은 한 라인의 height이고, 이 값을 기준으로 라인에 맞게 pixel을 보정한다.
			this._pixelCorrection(y);
		}
	},

	addItems: function(html) {
		var $ul = this.element.find("ul");
		$(html).appendTo($ul);
		return this;
	},
	
	removeItemAll: function() {
		var $ul = this.element.find("ul");
		$ul.children().remove();
		this.scrollTo(0,0);
		return this;
	},
	
	getCount: function() {
		var o = this.options;
		var $ul = this.element.find("ul");
		var count = $ul.height() / o.itemHeight;
		if(!count) {
			count = 0;
		}
		
		return count;
	},
	
	_handleDragStop: function(e)
	{
		var l = this._lastMove;
		//var t = getCurrentTime();
		var t = (new Date()).getTime();
		
		var doScroll = l && (t - l) <= this.options.moveIntervalThreshold;

		// scrollview가 멈춰있어야 할 곳을 넘어가 있으면... 강제로 this._doSnapBackY = true로 하여 위나 아래로 붙도록 한다.
		var v = this._$view.height();
		var c = this._$clip.height();
		var posY = this.getScrollPosition().y;
		if((v - c - this.options.nextLoadingBarHeight) > 0) {
			if(posY < 0 || posY > (v - c - this.options.nextLoadingBarHeight)) {
				this._doSnapBackY = true;
			}
		}
		else {
			if(posY != 0) {
				this._doSnapBackY = true;
			}
		}
		
		var sx = (this._hTracker && this._speedX && doScroll) ? this._speedX : (this._doSnapBackX ? 1 : 0);
		var sy = (this._vTracker && this._speedY && doScroll) ? this._speedY : (this._doSnapBackY ? 1 : 0);

		var svdir = this.options.direction;
		if (this.options.pagingEnabled && (svdir === "x" || svdir === "y") && !this._doSnapBackX && !this._doSnapBackY)
		{
			var x = this._sx;
			var y = this._sy;
			if (svdir === "x")
				x = -this._pagePos + this._pageDelta;
			else
				y = -this._pagePos + this._pageDelta;

			this.scrollTo(x, y, this.options.snapbackDuration);
		}
		else if (sx || sy)
			this._startMScroll(sx, sy);
		else {
			var y = this._sy;
			this._pixelCorrection(y, e);
		}

		this._disableTracking();

		if (!this._didDrag && this.options.delayedClickEnabled && this._$clickEle.length) {
			if(this.timerID) {
				clearTimeout(this.timerID);
				this.timerID = 0;
			}
			
			if(this.sendVMoustdown == true) {

				var ev = new $.Event("vmouseup");
				ev.originalEvent = e.originalEvent;
				ev.pageX = e.pageX;
				ev.pageY = e.pageY;
				this._$clickEle.trigger(ev);
				
				if(this.options.eventType == "touch") {
					this._$clickEle.trigger("vclick");
				}
			}
		}

		return false;
	},

	// 한line의 높이에 맞게 pixel을 보정한다.
	_pixelCorrection: function(y, e)
	{
		var o = this.options, $el = this.element;
	
		y = -y;
		var index = parseInt(y/o.itemHeight);
		var mod = y%o.itemHeight;
		if(mod > (o.itemHeight/2)) {
			index++;
		}
		y = (index*o.itemHeight);
		
		if(this.getScrollPosition().y == y) {
			// drag하지 않고 클릭만 했을 경우
			if(e != undefined) {
				
				var offsetTop = 0;
				var divT = $el[0];
				while(divT.offsetParent.nodeName != "BODY") {
					offsetTop += divT.offsetTop; 
					divT = divT.offsetParent;
				}
				
				var offsetY = (this._lastY - offsetTop);
				var add = Math.floor((offsetY / o.itemHeight) - 2);
				index += add;
				
				var count = this.getCount();
				if(index < 0) {
					index = 0;
				}
				else if(index > count - 1) {
					index = count - 1;
				}

				y = (index*o.itemHeight);
				this.scrollTo(0, y, o.snapbackDuration);
				
				if(index != this._oldIndex) {
					var subid = $el.attr("subid");
					if(!subid) {
						subid = $el[0].id;
					}
					
					$el.trigger("ev_change", [subid, index]);
					this._oldIndex = index;
				}
			}
			else {
				this.scrollTo(0, y, o.overshootDuration);
				
				if(index != this._oldIndex) {
					var subid = $el.attr("subid");
					if(!subid) {
						subid = $el[0].id;
					}
					
					$el.trigger("ev_change", [subid, index]);
					this._oldIndex = index;
				}
			}
		}
		else {
			this.scrollTo(0, y, o.overshootDuration);
			
			if(index != this._oldIndex) {
				var subid = $el.attr("subid");
				if(!subid) {
					subid = $el[0].id;
				}
					
				$el.trigger("ev_change", [subid, index]);
				this._oldIndex = index;
			}
		}
	},
	
	getIndex: function() {
		var o = this.options;

		var y = -this._sy;
		
		var index = parseInt(y/o.itemHeight);
		var mod = y%o.itemHeight;
		if(mod > (o.itemHeight/2)) {
			index++;
		}
		
		return index;
	},
	
	setIndex: function(index) {
		var o = this.options;

		var y = -(index*o.itemHeight);
		this.scrollTo(0, y, 0);
		return this;
	},
	
	getEventNames: function() {
		return ["ev_change", "ev_scrollstart", "ev_scrollupdate", "ev_scrollstop"];
	}
});

})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcPagebox", $.mobile.dvcBase, {
	options: {
		pageid: "",
		initSelector: ":jqmData(role='dvcPagebox')"
	},
	
	defaults: {
		transition: "none",
		reverse: false,
		changeHash: true,
		fromHashChange: false,
		pageContainer: undefined,
		fromPage: undefined,
		allowSamePageTransition: false
	},
	
	activePageClass: "dvc-pagebox-activepage",
	isPageTransitioning: false,
	
	_create: function() {
		var $el = this.element, self = this, o = this.options;
		
		$el.addClass( "dvc-pagebox" );
		$el.wrapInner( "<div class='dvc-pagebox-item'></div>" );
		
		self._initialize();
		
		var mobileDevice = window.navigator.userAgent.toLowerCase().match(/iphone|ipad|ipod|android/);
		var desktop = false;
		if(!mobileDevice) {
			desktop = window.navigator.userAgent.toLowerCase().match(/win|linux|mac/);
		}
		
		if(desktop) {
			$(window).bind("resize", function() {
				var mode = $.event.special.orientationchange.orientation();
				var pageid = self.getActivePage();
				if(pageid) {
					$._fnCallPageEvent(pageid, "ev_orientationchange", [mode]);
				}
			});
		}
		else {
			$(window).bind("orientationchange", function() {
				if($.davinci.deviceReady) {
					var mode = $.event.special.orientationchange.orientation();
					var pageid = self.getActivePage();
					if(pageid) {
						$._fnCallPageEvent(pageid, "ev_orientationchange", [mode]);
					}
				}
			});
		}
	},

	// function _initialize()
	// dvcPagebox 가 생성될 때에 초기화해주는 작업을 하는 함수로 최초 1회만 호출된다.
	//  1. pageContainer 생성
	//  2. firstPage, pageContainer 정보 저장
	//  3. changePage() 호출( 초기 pageid 값이 없을 경우에는 빈 페이지를 생성 )
	_initialize: function() {
		var $el = this.element, self = this, o = this.options;
	
		self.pageContainer = $el.find( ">.dvc-pagebox-item" );
	
		if ( o.pageid.length ) {
			if ( o.pageid[0] == '#' ) { o.pageid.replace('#', ''); }
			
			var $page = $( "#" + o.pageid );
			var pageid = $page[0].id;
			
			self.pageContainer.append( $page );
			$page.addClass( self.activePageClass );
					
			self._enhancePage( $page );
			self.activePage = $page;
		} else {
			self._createEmptyPage();
		}
	},
	
	_createEmptyPage: function() {
		var $page = $( "<div data-" + $.mobile.ns + "role='page' class='" + this.activePageClass + "'></div>" );
		
		this.pageContainer.append( $page );
		this._enhancePage( $page);
		this.activePage = $page;
	},
	
	_checkPageId: function( _pageid ) {
		var pageId = "";
		if ( _pageid[0] == '#' ) {
			pageId = _pageid;
		} else {
			pageId = '#' + _pageid;
		}
		
		return pageId;
	},
	
	_enhancePage: function( $page, role ) {
		//run page plugin
		$page.page();
		$page.css("min-height", 0);	// jQueryMobile이 변경하는 min-height를 0으로 없애버림.
	},
	
	_reFocus: function( page ) {
		var pageTitle = page.find( ".ui-title:eq(0)" );

		if( pageTitle.length ) {
			pageTitle.focus();
		}
		else{
			page.focus();
		}
	},
	
	_releasePageTransitionLock: function() {
		this.isPageTransitioning = false;
	},
		
	_noneTransitionHandler: function( name, reverse, $toPage, $fromPage ) {
		var $el = this.element, self = this, o = this.options;
		
		if ( $fromPage ) {
			$fromPage.removeClass( self.activePageClass );
		}
		$toPage.addClass( self.activePageClass );

		return $.Deferred().resolve( name, reverse, $toPage, $fromPage ).promise();
	},
	
	_css3TransitionHandler: function( name, reverse, $to, $from ) {
		var $el = this.element, self = this, o = this.options;
		
		var deferred = new $.Deferred(),
			reverseClass = reverse ? " reverse" : "",
			viewportClass = "ui-mobile-viewport-transitioning viewport-" + name,
			doneFunc = function() {

				$to.add( $from ).removeClass( "out in reverse " + name );

				if ( $from && $from[ 0 ] !== $to[ 0 ] ) {
					$from.removeClass( self.activePageClass );
				}
				
				$to.parent().removeClass( viewportClass );
				
				deferred.resolve( name, reverse, $to, $from );
			};

		$to.animationComplete( doneFunc );

		$to.parent().addClass( viewportClass );

		if ( $from ) {
			$from.addClass( name + " out" + reverseClass );
		}
		$to.addClass( self.activePageClass + " " + name + " in" + reverseClass );

		return deferred.promise();
	},
	
	//function for transitioning between two existing pages
	_transitionPages: function( toPage, fromPage, transition, reverse ) {
		var $el = this.element, self = this, o = this.options;
		
		//get current scroll distance
		var active	= self.activePage;

		if( fromPage ) {
			//trigger before show/hide events
			fromPage.data( "page" )._trigger( "beforehide", null, { nextPage: toPage } );
		}

		toPage.data( "page" )._trigger( "beforeshow", null, { prevPage: fromPage || $( "" ) } );

		var promise = {};
		if ( transition == "none" ) {
			promise = self._noneTransitionHandler( transition, reverse, toPage, fromPage );
		} else {
			promise = self._css3TransitionHandler( transition, reverse, toPage, fromPage );
		}

		promise.done(function() {
			//trigger show/hide events
			if( fromPage ) {
				fromPage.data( "page" )._trigger( "hide", null, { nextPage: toPage } );
			}

			//trigger pageshow, define prevPage as either fromPage or empty jQuery obj
			toPage.data( "page" )._trigger( "show", null, { prevPage: fromPage || $( "" ) } );
		});

		return promise;
	},
	
	changePage: function( _pageid, options ) {
		var $el = this.element, self = this, o = this.options;
			
		if( self.isPageTransitioning ) {
			return;
		}
		
		var pageId = self._checkPageId( _pageid );
		var toPage = $( pageId );
		
		if ( toPage.length == 0 ) {
			return ;
		}
		
		if(toPage.length) {
			var transition = toPage.jqmData("transition");
			if(transition) {
				options = options || {};

				if(!options.transition) {
					options.transition = transition;
				}
			}
		}
		
		if ( self.pageContainer.find( pageId ).length == 0 ) {
			
			var fromView = undefined;
			var $fromView = toPage.closest(".dvc-pagebox").first();
			if ( $fromView ) {
				fromView = $fromView.data("dvcPagebox");
			}

			var fromIsActive = toPage.hasClass( self.activePageClass );
			
			self.pageContainer.prepend( toPage );
			
			if ( fromView ) {
				var fromPages = $fromView.find( ":jqmData(role='page')" );
				
				if ( fromPages.length > 0 ) {
					if ( fromIsActive ) {
						var firstPage = fromPages.first();
						firstPage.addClass( fromView.activePageClass );
						fromView.activePage = firstPage;
					}
				} else {
					fromView._createEmptyPage();
				}
			}
		}
		
		var settings = $.extend( {}, self.defaults, options );
		settings.pageContainer = settings.pageContainer || self.pageContainer;
		settings.fromPage = settings.fromPage || self.activePage;

		var fromPage = settings.fromPage;
		if( fromPage && fromPage[0] === toPage[0] && !settings.allowSamePageTransition ) {
			self.isPageTransitioning = false;
			return;
		}
		
		self._enhancePage( toPage );
		self.activePage = toPage;
		self._transitionPages( toPage, fromPage, settings.transition, settings.reverse )
			.done(function() {
				self._releasePageTransitionLock();
			});
	},
	
	getActivePage: function() {
		var activeId = this.activePage[0].id;
		return activeId;
	}
});

})( jQuery );/*!
 * Da Vinci Component
 * 
 * Component name : textarea
 * js version : 1.0.0
 * 
 */

(function($, undefined ) {
$.widget( "mobile.dvcTextarea", $.mobile.dvcBase, {
	options: {
		text:"",
		initSelector: ":jqmData(role='dvcTextarea')"
	},
	_create: function(){
		var $el = this.element, self = this, o = this.options;

		$el.addClass("dvc-textarea");
		
		var font_weight = $el.css("font-weight");
		var font_size = $el.css("font-size");
		var font_color = $el.css("color");
		
		var $input = $("<textarea></textarea>");
		
		$input.css({
			"font-weight": font_weight,
			"font-size": font_size,
			"color": font_color
		});
		
		if(o.text) {
			$input.val(o.text);
		}
		
		$el.append($input);
		
		var $input = $el.find('textarea');
		$input.bind('vclick', function(e) {
			// 만약 id가 있으면, id를 보낸다.
			var subid = $el.attr("subid");
			if(!subid) {
				subid = $el[0].id;
			}
			
			$el.trigger("ev_click", subid);
			// event를 상위로 전달하지 않도록 한다.
			e.stopPropagation();
		});
		
	},
	
	text: function(value){
		var $input = this.element.find('textarea');
		if ( arguments.length ) {
			$input.val(value);
			return this;
		}
		else {
			var value = $input.val();
			return value;
		}
	},
	
	getEventNames: function() {
		return ["ev_click"];
	}

});

})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcTextfield", $.mobile.dvcBase , {
	options: {
		inputType : "",
		text : "",
		placeholder : "",
		clearButton : true,
		initSelector: ":jqmData(role='dvcTextfield')"
	},
	
	_create: function(){
		var $el = this.element, self = this,
		o = this.options;
		
		$el.addClass('dvc-textfield');
		
		if($.davinci.isAppleDevice() == false) {	// android이면,
			$el.addClass("dvc-textfield-android");
		}
		
		var font_weight = $el.css("font-weight");
		var font_size = $el.css("font-size");
		var font_color = $el.css("color");
		
		var $input = $("<input data-role='none' style='position:absolute; left:0; right:0' type='" + o.inputType +"'></input>");
		this._o = $input[0];
		$input.css({
			"font-weight": font_weight,
			"font-size": font_size,
			"color": font_color
		});
		
		if(o.text) {
			$input.val(o.text);
		}
		if(o.placeholder) {
			$input.attr("placeholder", o.placeholder);
		}

		$el.append($input);
		$el.append($("<div class='dvc-textfield-btn-clear'></div>"));		
		
		if(o.clearButton) {
			var $btnClear = $el.find(".dvc-textfield-btn-clear");
			if($btnClear) {
				$btnClear.dvcButton();
				$btnClear.hide();
			}
		}
		
		$input.focus(function() {
			if($input.val()) {
				if(o.clearButton) {
					$btnClear.show();
					$input.css("right",30);
				}
			}
			if (self._timer) clearInterval(self._timer);
		    self._timer = setInterval(function() {
		    
		      if (self._value != self._o.value) {
		            self._value = self._o.value;
		            self._fireEvent();  
		      }
		    },
		    100);
		});
		
		$input.blur(function() {
			// input내부의 x버튼에서 blur가 발생했으면...skip
			// fTextfieldBtnClearSkip는 dvcImageButton에서 설정하는 전역변수
			//if(!fTextfieldBtnClearSkip) {
				if(o.clearButton) {
					$btnClear.hide();
					$input.css("right",0);
				}
			//}
		    if (self._timer) clearInterval(self._timer);
		    self._timer = null;
		});

		$input.bind('keyup', function(e) {
			if($input.val()) {
				if(o.clearButton) {
					$btnClear.show();
					$input.css("right",30);
				}
			}
			else {
				if(o.clearButton) {
					$btnClear.hide();
					$input.css("right",0);
				}
			}
			
			if(self.enable() == true) {
				// 만약 id가 있으면, id를 보낸다.
				var id = $el[0].id;
				if(!id) {
					id = $el.attr("subid");
				}
				$el.trigger("ev_keyup", [id, self.text(), e.keyCode]);
				// event를 상위로 전달하지 않도록 한다.
				e.stopPropagation();
			}
		});
		
		$input.bind('vclick', function(e) {
			if(self.enable() == true) {
				// 만약 id가 있으면, id를 보낸다.
				var id = $el[0].id;
				if(!id) {
					id = $el.attr("subid");
				}
				$el.trigger("ev_click", id);
				// event를 상위로 전달하지 않도록 한다.
				e.stopPropagation();
			}
		});
		
		if(o.clearButton) {
			$btnClear.bind('ev_click', function() {
				$input.val('');
				$btnClear.hide();
				$input.css("right",0);
				return false;
			});
		}
	},
	_fireEvent: function(){
		if (document.createEvent) {
			var e;
			if (window.KeyEvent) {
				e = document.createEvent('KeyEvents');
				e.initKeyEvent('keyup', true, true, window, false, false, false, false, 65, 0);
			}
			else {
				e = document.createEvent('UIEvents');
				e.initUIEvent('keyup', true, true, window, 1);
				e.keyCode = 65;
			}
			this._o.dispatchEvent(e);
		}
		else {
			var e = document.createEventObject();
			e.keyCode = 65;
			this._o.fireEvent('onkeyup', e);
		}
	},
	
	focus: function() {
		var input = this.element.find("input");
		input.focus();
		return this;
	},
	
	text: function(value){
		var $input = this.element.find('input');
		if ( arguments.length ) {
			$input.val(value);
			return this;
		}
		else {
			var value = $input.val();
			return value;
		}
	},
	
	getEventNames: function() {
		return ["ev_click", "ev_keyup"];
	}
});

})( jQuery );
(function($, undefined ) {
$.widget( "mobile.dvcCarousel", $.mobile.dvcScrollview, {
	options: {
		showScrollBars: false,
		pagingEnabled: true,
		infinite : false,
		direction: "x",
		pageGap : 0,
		initSelector: ":jqmData(role='dvcCarousel')"
	},
	
	_create: function(){
		var $el = this.element, self = this, o = this.options;

		$el.addClass("dvc-carousel ui-scrollview-clip");
		this._$clip = $el;

		var $child = $("<div class='ui-scrollview-view'></div>");
		$el.append($child);
		this._$view = $child;
		
		this._$clip.css("overflow", "hidden");
		this._makePositioned(this._$clip);

		this._$view.css("overflow", "hidden");
		this._makePositioned(this._$view);
		
		if(o.direction == "y") {
			this._$view.css({ left: 0, top: 0, width: "100%" });
		}
		else {
			o.direction = "x";
			this._$view.css({ left: 0, top: 0, height: "100%" });
		}

		this._sx = 0;
		this._sy = 0;

		this.totalPages = 0;
		this.nowPage = 1;
		
		this.once = false;

		this._initMomentumTracker();
	},

	addPage: function(html, dynamicPage) {
		var $el = this.element,self = this, o = this.options;
		
		this.totalPages++;
		
		var $carouselPage = $("<div class='dvc-carousel-page'>");
		$carouselPage.attr("page-index", this.totalPages);

		// html이 jQuery Object이면 바로 append, string이면 $("")로 변환
		if(typeof html == "string") {
			$(html).appendTo($carouselPage);
		}
		else if(html instanceof $) {
			if(dynamicPage) {
				html.addClass("dvc-carousel-dynamic-page");
			}
			
			$carouselPage.append(html);
		}
		else {
			console.log("addPage Error");
			return;
		}
		
		this._$view.append($carouselPage);
		
		return this;
	},
	
	refresh: function() {
		var $el = this.element,self = this, o = self.options;
		
		var totalPages;
		var $carouselPage = this._$view.children(".dvc-carousel-page");
		var pagesOuterWidth = maxWidthPage = 0;
		var pagesOuterHeight = maxHeightPage = 0;
		var totalPages = $carouselPage.length;
		
		maxWidthPage = $el.width();
		maxHeightPage = $el.height();

		if(totalPages > 0) {
			if(o.direction == "y") {
				$carouselPage.each(function(i, elem) { 
					$(elem).css({
						"height": maxHeightPage - o.pageGap * 2,
						"padding-top": o.pageGap,
						"padding-bottom": o.pageGap,
						"float": "none"});

					pagesOuterHeight += $(elem).outerHeight(true);
					maxHeightPage = ($(elem).outerHeight(true) >= maxHeightPage) ? $(elem).outerHeight(true) : maxHeightPage;
				});
				
				self._$view.height(pagesOuterHeight).width($el.width());
			}
			else {
				$carouselPage.each(function(i, elem) { 
					$(elem).css({
						"width": maxWidthPage - o.pageGap * 2,
						"padding-left": o.pageGap,
						"padding-right": o.pageGap});

					pagesOuterWidth += $(elem).outerWidth(true);
					maxWidthPage = ($(elem).outerWidth(true) >= maxWidthPage) ? $(elem).outerWidth(true) : maxWidthPage;
				});
				
				self._$view.width(pagesOuterWidth).height($el.height());
			}
		}
		
		// $carouselPage 내에 page가 있으면, new함.
		var $dvcPages = $carouselPage.find(":jqmData(role='page')");
		for(var i=0;i<$dvcPages.length;i++) {
			var $dvcPage = $dvcPages.eq(i);
			
			$dvcPage.page();
			$dvcPage.css("min-height", 0);
			var pageid = $dvcPage[0].id;
			
			$._fnFindActivePagesInPagebox($dvcPage).each(function() {
				$._fnSubpageEventGenerate(this, "ev_pagebeforeshow");
			});

			$._fnCallPageEvent(pageid, "ev_pagebeforeshow", [pageid]);
		}

		$carouselPage.css({ 'display' : 'block' });

		for(var i=0;i<$dvcPages.length;i++) {
			var $dvcPage = $dvcPages.eq(i);
			var pageid = $dvcPage[0].id;
			
			$._fnFindActivePagesInPagebox($dvcPage).each(function() {
				$._fnSubpageEventGenerate(this, "ev_pageshow");
			});

			$._fnCallPageEvent(pageid, "ev_pageshow", [pageid]);			
		}

		if(o.infinite && totalPages >= 3) {
			if(this.once == false) {
				// 처음에 refresh할 때는 oldePage가 2이고, PageNumber가 1이어야 한다.
				// duration은 1이상이어야 조건에 들어감.
				this.nowPage = 2;
				this.setCurPage(1, 1, true);	// event skip
				this.once = true;
			}
			else {
				// 그 후에는 
				this.setCurPage(this.nowPage, 1, true);	// event skip
			}
		}
		else {
			this.setCurPage(this.nowPage, 1, true);	// event skip
		}
		
		return this;
	},
	
	getTotalPage: function() {
		return this.totalPages;
	},
	
	getCurPage: function() {
		return this.nowPage;
	},
	
	// 이벤트를 보낸 page면 보내지 않고, skipEvent일 경우에도 보내지 않는다.
	_triggerEvent: function(subid, $pageContainer, pageNumber, skipEvent) {
		if(this.sentPage == pageNumber) {
			return;
		}

		var sentPage = this.sentPage;
		this.sentPage = pageNumber;
		
		if(!skipEvent) {
			var slideDirection = "";
			var totalPages = this.totalPages;

			// sentPage와 pageNumber의 관계를 알면 <-인지 ->인지 알수 있다.
			
			if(this.options.infinite) {
				if(sentPage == totalPages && pageNumber == 1) {
					slideDirection = "next";
				}
				else if(sentPage == 1 && pageNumber == totalPages) {
					slideDirection = "prev";
				}
				else if(sentPage > pageNumber) {
					slideDirection = "prev";
				}
				else {
					slideDirection = "next";
				}
			}
			else {
				if(sentPage > pageNumber) {
					slideDirection = "prev";
				}
				else {
					slideDirection = "next";
				}
			}
			
			this.element.trigger("ev_change", [subid, $pageContainer, pageNumber, slideDirection]);
		}
	},
	
	nextPage: function(skipEvent) {
		var duration = this.options.snapbackDuration;
		var pageNumber = this.nowPage + 1;
		var totalPages = this.totalPages;
		
		if(this.options.infinite) {
			if(totalPages < pageNumber) {
				pageNumber = 1;
			}
		}
		else {
			if(totalPages < pageNumber) {
				return;
			}
		}
		
		this.setCurPage(pageNumber, duration, skipEvent);
	},
	
	prevPage: function(skipEvent) {
		var duration = this.options.snapbackDuration;
		var pageNumber = this.nowPage - 1;
		var totalPages = this.totalPages;
		
		if(this.options.infinite) {
			if(1 > pageNumber) {
				pageNumber = totalPages;
			}
		}
		else {
			if(1 > pageNumber) {
				return;
			}
		}
		
		this.setCurPage(pageNumber, duration, skipEvent);
	},
	
	setCurPage: function(pageNumber, duration, skipEvent) {
		var $el = this.element,self = this, o = self.options;
		
		var pageElem = self._$view.children(".dvc-carousel-page");
		var subid = this.element.attr("subid");
		if(!subid) {
			subid = this.element[0].id;
		}
		
		var $pageContainer;
		var matchedPageIndex;
		
		// pageNumber에 해당하느 page Element를 찾는다.
		pageElem.each(function(index) { 
			var $ele = $(this);
			if(parseInt($ele.attr("page-index")) == pageNumber) {
				$pageContainer = $(this);
				matchedPageIndex = index;
				return false;
			}
		});

		if(!$pageContainer) {
			console.log("pageContainer is not found.");
		}

		var totalPages = this.totalPages;
		var oldPage = this.nowPage;
		this.nowPage = pageNumber;
		
		if(o.infinite == false) {
			this._setCurPage(pageNumber, duration);
			this._triggerEvent(subid, $pageContainer, pageNumber, skipEvent);
		}
		else {
			this._setCurPage(matchedPageIndex + 1, duration);
			
			if(duration) {	
				this.element.unbind(".ysjung");
				this.element.bind("ysScrollTo.ysjung", function( e, pos ) {
					if(o.infinite && totalPages >= 3) {
						var centerPage = Math.ceil(totalPages/2);
				
						if(pageNumber!=oldPage) {
							self._changePageElement(pageNumber, oldPage);
							
							if(o.direction == "y") {
								self._setScrollPosition(0, -(centerPage - 1) * $el.height());
							}
							else {
								self._setScrollPosition(-(centerPage - 1) * $el.width(), 0);
							}
							
							self._triggerEvent(subid, $pageContainer, pageNumber, skipEvent);
						}					
					}
	
					$(this).unbind(".ysjung");
				});
			}
			else {
				this._triggerEvent(subid, $pageContainer, pageNumber, skipEvent);
			}
		}
		
		return this;
	},
	
	_setCurPage: function(page, duration) {
		var $el = this.element,self = this, o = self.options;

		if(o.direction == "y") {
			var pos = $el.height() * (page - 1);
			pos = (duration) ? pos : -pos;
			this.scrollTo(0, pos, duration);
		}
		else {
			var pos = $el.width() * (page - 1);
			pos = (duration) ? pos : -pos;
			this.scrollTo(pos, 0, duration);
		}
		
		return this;
	},
	
	removeAllPages: function() {
		var $el = this.element, self = this;

		self._$view.children().find(":jqmData(role='page')").not(".dvc-carousel-dynamic-page").appendTo($("body"));
		self._$view.children().remove();
		
		this.totalPages = 0;
		this.nowPage = 1;
		this.scrollTo(0, 0);
		
		self.refresh();
		
		return this;
	},
	
	_changePageElement:function(pageNumber, oldPage) {
		var ahead, behind, handler = this._$view;
		for(var i=1; i<=Math.abs(oldPage-pageNumber); i++) {
			ahead = handler.children(':first');
			behind = handler.children(':last');
			if(oldPage-pageNumber>0) {
				ahead.before(behind);
			} else if(oldPage-pageNumber<0) {
				behind.after(ahead);
			}
		}
	},
	
	_infiniteAdjust: function(pageNumber, totalPages) {
		var $el = this.element, self = this, o = self.options;
		var centerPage = Math.ceil(totalPages/2);

		if(pageNumber!=centerPage) {
			if(o.direction == "y") {
				var pos = $el.height() * (centerPage - 1);
				this._setScrollPosition(0, -pos);
				
			}
			else {
				var pos = $el.width() * (centerPage - 1);
				this._setScrollPosition(-pos, 0);
			}			
			
			self._changePageElement(pageNumber, centerPage);			
		}
	},
	
	_handleDragStop: function(e) {
		var self = this;
		
		this.element.unbind(".ysjung");
		
		this.element.bind("ysScrollTo.ysjung", function( e, pos ) {
			self._slideCallback(pos);
			$(this).unbind(".ysjung");
		});
		
		$.mobile.dvcScrollview.prototype._handleDragStop.call(this, e);
	},
	
	_handleMomentumScroll: function()
	{
		var keepGoing = false;
		var v = this._$view;

		var x = 0, y = 0;

		var vt = this._vTracker;
		if (vt)
		{
			vt.update();
			y = vt.getPosition();
			keepGoing = !vt.done();
		}

		var ht = this._hTracker;
		if (ht)
		{
			ht.update();
			x = ht.getPosition();
			keepGoing = keepGoing || !ht.done();
		}

		this._setScrollPosition(x, y);

		var subid = this.element.attr("subid");
		if(!subid) {
			subid = this.element[0].id;
		}
		this._$clip.trigger(this.options.updateEventName, [subid, [ { x: x, y: y } ]]);

		if (keepGoing)
			this._timerID = setTimeout(this._timerCB, this._timerInterval);	
		else {
			this.element.triggerHandler("ysScrollTo", {"x": x, "y": y});
			this._stopMScroll();
		}
	},
	
	scrollTo: function(x, y, duration)
	{
		function getCurrentTime() {
			return (new Date()).getTime();
		}
		
		this._stopMScroll();
		
		var v = this._$view.height();
		var c = this._$clip.height();
		if (!duration) {
			if((v - c) > 0) {
				if(y < -(v - c)) {
					y = -(v - c);
				}
			}
			
			this._setScrollPosition(x, y);
			this.element.triggerHandler("ysScrollTo", {"x": x, "y": y});
			return;
		}

		if((v - c) > 0) {
			if(y > (v - c)) {
				y = (v - c);
			}
		}

		x = -x;
		y = -y;

		var self = this;
		var start = getCurrentTime();
		var efunc = $.easing["easeOutQuad"];
		var sx = this._sx;
		var sy = this._sy;
		var dx = x - sx;
		var dy = y - sy;
		
		var tfunc = function(){
			var elapsed = getCurrentTime() - start;
			if (elapsed >= duration)
			{
				self._timerID = 0;
				self._setScrollPosition(x, y);
				self.element.triggerHandler("ysScrollTo", {"x": x, "y": y});
			}
			else
			{
				var ec = efunc(elapsed/duration, elapsed, 0, 1, duration);
				self._setScrollPosition(sx + (dx * ec), sy + (dy * ec));
				self._timerID = setTimeout(tfunc, self._timerInterval);
			}
		};

		this._timerID = setTimeout(tfunc, this._timerInterval);
	},
	
	_slideCallback: function(pos) {
		var $el = this.element,self = this, o = self.options;

		var subid = $el.attr("subid");
		if(!subid) {
			subid = $el[0].id;
		}
		
		// nowPage를 계산해서 알아낸다.
		// 전체 width에서 현재 transition을 알아내고,
		var pageWidth = $el.width();
		var pageHeight = $el.height();
		
		if(o.direction == "y") {
			var nowPage = -parseInt(pos.y / pageHeight) + 1;
		}
		else {
			var nowPage = -parseInt(pos.x / pageWidth) + 1;
		}		
		
		var $pageContainer;
		var page = nowPage;
		var totalPages = this.totalPages;
		$pageContainer = self._$view.children(".dvc-carousel-page").eq(page-1);
		
		if(o.infinite && totalPages >= 3) {
			self._infiniteAdjust(page, totalPages);
			nowPage = parseInt($pageContainer.attr("page-index"));
		}
		
		this.nowPage = nowPage;

		this._triggerEvent(subid, $pageContainer, nowPage);
	},
	
	getEventNames: function() {
		return ["ev_change"];
	}
});

$.widget( "mobile.dvcCarouselIndicator", $.mobile.dvcBase, {
	options: {
		gap: 10,
		itemWidth: 6
	},
	
	_create: function(){
		var $el = this.element, self = this, o = this.options;
		$el.addClass("dvc-carousel-indicator");
		
		this.totalPage = 0;
		this.nowPage = 1;
		this.refresh();
	},
	
	setTotalPage: function(p) {
		var $el = this.element, self = this, o = this.options;
		if(p < 0) return;
		
		this.totalPage = p;
		this.refresh();
		return this;
	},
	
	setCurPage: function(p) {
		var $el = this.element, self = this, o = this.options;
		if(this.totalpage <= 0) return;
		
		this.nowPage = p;
		$el.find(".dvc-carousel-indicator-on").removeClass("dvc-carousel-indicator-on");
		$el.find(".dvc-carousel-indicator-item").eq(p-1).addClass("dvc-carousel-indicator-on");
		return this;
	},
	
	removeAllPages: function() {
		this.setCurPage(1);
		this.setTotalPage(0);
		return this;
	},
	
	refresh: function() {
		$.mobile.dvcBase.prototype.refresh.call(this);
	
		var $el = this.element, self = this, o = this.options;
		
		$el.find(".dvc-carousel-indicator-item").remove();
		
		if(this.totalPage <= 0) return;
		
		var item_left = ($el.width() - (o.itemWidth*this.totalPage + (this.totalPage - 1)*o.gap))/2;
		var $item = $("<div class='dvc-carousel-indicator-item'></div>");
		
		for(var i=0;i<this.totalPage;i++) {
			var itemclone = $item.clone().css("left", item_left).appendTo($el);
			// 다음 left를 결정
			item_left += (o.gap + o.itemWidth);
			if(this.nowPage == i+1) {
				itemclone.addClass("dvc-carousel-indicator-on");
			}
		}
		return this;
	}
});

})( jQuery );
(function($, undefined ) {
	$.widget( "mobile.dvcTreeview", $.mobile.dvcBase, {
	options: {
		data: null, 
		treeType: "basic", //basic(use expandIcon, line, text), 
						   //check(use checkbox), 
						   //depticon(use dept icon(root/haschild/nohaschild)), 
						   //all(use expandIcon, checkbox, depticon)
		iconWidth:"23",
		initSelector: ":jqmData(role='dvcTreeview')"
	},
	
	_create: function(){
		var $el = this.element, self = this, o = this.options;
		$el.addClass("dvc-treeview");
		$($el).prepend("<div class='dvc-treeview-node-body' style='position:relative;'></div>");
		
		self._findScrollview();
		self._attachEvent();
	},
	
	_attachEvent: function() {
		var $el = this.element, self = this, o = this.options;
		
		$el.find(".dvc-treeview-node-name-back").live({
			'vclick': function(e, ui){
				if(self.scrollview && self.scrollview._didDrag) {
					return false;
				}
				var target = $(e.currentTarget);
				var parent = target.parent();					
				var beforeSelected = $(".dvc-treeview-selected-node", $el);		
				if(beforeSelected.length)				
				{
					//beforeSelected.parent().parent() : li				
					self.getItems(beforeSelected.parent().parent().attr("path")).selected = false;
					beforeSelected.removeClass("dvc-treeview-selected-node");
				}
				target.addClass("dvc-treeview-selected-node");
				//(ev_click, [id, item, path])
				var path = parent.parent().attr("path");
				self.getItems(path).selected = true;
				$el.trigger("ev_click", [parent.parent()[0].id, self.getItems(path), path]);
				
				return false;
			}//vclick		
		});	
		
		$el.find(".dvc-treeview-line-group").live({				
			'vclick': function(e, ui){
				var target = $(e.currentTarget.parentNode); //dvc-node-background			
				var openCloseIcon = $(".dvc-treeview-open-icon", target);			
				var isOpen = true;
				if(!openCloseIcon.length)
				{												
					$(".dvc-treeview-close-icon", target).removeClass("dvc-treeview-close-icon").addClass("dvc-treeview-open-icon");
					//선택된 하위요소 show (target.parent():상위 li)
					target.parent().children("ul").css("display", "block");					
				}	
				else{
					openCloseIcon.removeClass("dvc-treeview-open-icon").addClass("dvc-treeview-close-icon");
					//선택된 하위요소 hidden (target.parent():상위 li)
					target.parent().children("ul").css("display", "none");	
					isOpen = false;					
				}	
				//update itemData(isexpand value)
				var path = target.parent().attr("path");
				var itemData = self.getItems(path);
				itemData.isexpand = isOpen;
				//(ev_ecclick, [id, item, path])								
				$el.trigger("ev_ecclick",  [target.parent()[0].id, itemData, path]);
				
				return false;
			}//vclick
		});	
		
		$el.find(".dvc-treeview-expend-icon").live({				
			'vclick': function(e, ui){
				var target = e.currentTarget; 
				var parent = $(target).parent();	//div	
				var	isOpen = true;
				if(!$(target).hasClass("dvc-treeview-open-icon"))
				{					
					$(target).removeClass("dvc-treeview-close-icon").addClass("dvc-treeview-open-icon");					
					//선택된 하위요소 show (parent.parent():상위 li)
					parent.parent().children("ul").css("display", "block");						
				}	
				else{
					$(target).removeClass("dvc-treeview-open-icon").addClass("dvc-treeview-close-icon");
					//선택된 하위요소 hidden (parent.parent():상위 li)
					parent.parent().children("ul").css("display", "none");		
					isOpen = false;
				}		
				//update itemData(isexpand value)
				var itemData = self.getItems(parent.parent().attr("path"));
				itemData.isexpand = isOpen;
				//(ev_ecclick, [id, item, path])				
				$el.trigger("ev_ecclick", [parent.parent()[0].id, itemData]);
				
				return false;
			}//vclick
		});	

		$el.find(".dvc-treeview-ischeck-back").live({	
			"vmousedown": function(e) {
				var target = $($(e.currentTarget).children().eq(0));
				if(target.hasClass("dvc-treeview-check-up"))
				{		
					target.removeClass("dvc-treeview-check-up").addClass("dvc-treeview-check-down");
				}
				else
				{
					target.removeClass("dvc-treeview-check-down").addClass("dvc-treeview-check-up");
				}
				return false;
			},
			
			'vclick': function(e, ui){
				var target = $($(e.currentTarget).children().eq(0));
				var parent = target.parent().parent().parent(); //li
				var isCheck = false;
				/* item-check/uncheck */							
				if(target.hasClass("dvc-treeview-checked"))
				{		
					isCheck = true;
					target.removeClass("dvc-treeview-checked").removeClass("dvc-treeview-check-down").addClass("dvc-treeview-check-up");
				}
				else
				{
					target.removeClass("dvc-treeview-check-down").addClass("dvc-treeview-checked dvc-treeview-check-up");
				}				
				//(ev_change, [id, item, checkValue]) 
				$el.trigger("ev_change", [parent[0].id, self.getItems(parent.attr("path")), isCheck]);
				
				return false;
			}//vclick
		});	
	},
	
	setIconWidth: function(w)
	{		
		var self = this, o = this.options;
		o.iconWidth = w;
		self.drawTreeview(o.data);
		self.refresh();
		return this;
	},
	
	drawTreeview: function(_datas)
	{		
		var $el = this.element, self = this, o = this.options;
			
		var rootDataLen = _datas.length;			
		var path = [0];
		var html = [];		
		o.data = _datas;
		
		self.removeAll();
		
		html.push("<ul class='dvc-treeview-node-container'>");	
		var treeviewWidth = $(".dvc-treeview").css("width");
		for(var i=0; i<rootDataLen; i++)			
		{
			var isLast = false;
			path[0] = i;
			if(i+1 == rootDataLen)
			{isLast = true;}

			self._drawLi(parseInt(treeviewWidth.replace("px",""),10),_datas[i], html, 0, ""+path[0], isLast);							
		}//for
		html.push("</ul>");	
		
		//screen draw
		$(".dvc-treeview").prepend(html.join(""));	
		
		self.refresh();
		return this;
	},	
	
	_drawLi: function(treeviewWidth, liData, html, deep, path, isLast)
	{
		var $el = this.element, self = this, o = this.options;
		var iconWidth = o.iconWidth;
		var liClass="";			
		var isChildren = false;
		var hasChildClass = "dvc-treeview-nohaschild-icon";
		var middleClass = "";
		var lineClass = "dvc-treeview-middle-line";	
		var leftStyle = "margin-left:"+(deep*iconWidth)+"px;";
		var target = [];
		var iconCnt = 0;
		
		if(isLast)
		{
			lineClass = " ";
			liClass = lineClass;
		}
		html.push("<li id='"+liData.id+"' deep='"+deep+"' path='"+path+"' class='"+liClass+"'>");
		html.push("<div class='dvc-treeview-node-background dvc-treeview-li-back-style'>"); 
		
		//draw line
		html.push("<span class='dvc-treeview-line-group'>");
		var lastCheckSet = (path.indexOf("."))?self._isLastParent(path):[0];
		for(var idx=0; idx< deep; idx++)
		{
			var idxStyle = "";
			//상위 부모가 그 상위 부모의 마지막 노드일 경우
			if(lastCheckSet[idx])
			{idxStyle = "visibility:hidden;";}
			html.push("<span class='dvc-treeview-line-icon dvc-treeview-basic-line' style='"+idxStyle+"'></span>");
			iconCnt++;
		}
		//current line
		if(isLast)
		{html.push("<span class='dvc-treeview-line-icon dvc-treeview-last-line' style=''></span>");}			
		else{html.push("<span class='dvc-treeview-line-icon "+lineClass+"' style='"+middleClass+"'></span>");}
		iconCnt++;
		//
		if(liData.childnodes != undefined)
		{isChildren = true;	}
		else
		{html.push("<span class='dvc-treeview-line-icon dvc-treeview-horizontal-line'></span>");iconCnt++;}
		html.push("</span>");
		//end draw line
		
		if(isChildren)
		{							
			var expandIcon = "dvc-treeview-open-icon";				
			hasChildClass = "dvc-treeview-haschild-icon";
			if(!liData.isexpand)
			{	expandIcon = "dvc-treeview-close-icon"; }	
			html.push("<span class='dvc-treeview-expend-icon "+expandIcon+"'></span>");
			iconCnt++;
		}		
		
		if(path == "0")
		{hasChildClass = "dvc-treeview-root-icon";}
		
		if(o.treeType == "depticon" || o.treeType == "all")
		{html.push("<span class='"+hasChildClass+"'></span>");iconCnt++;}
		
		var selectedStyle = " ";
		if(liData.selected){selectedStyle = " dvc-treeview-selected-node";}
		var nameBackStyle = "";
		if(o.treeType == "check" || o.treeType == "all")
		{
			nameBackStyle = "width:"+(treeviewWidth-(iconWidth*iconCnt)-25)+"px;"; //treeview width-(icon width*icon cnt)-(check area/2)
		}
		else
		{
			nameBackStyle = "width:"+(treeviewWidth-(iconWidth*iconCnt)-5)+"px;";
		}
		if(nameBackStyle.indexOf("-")>=0){nameBackStyle = "width:"+iconCnt+"px;";}
		html.push("<span class='dvc-treeview-node-name-back "+selectedStyle+"' style='"+nameBackStyle+"'><span class='dvc-treeview-node-name'>"+liData.text+"</span></span>");				
		
		if(o.treeType == "check" || o.treeType == "all")
		{			
			html.push("<span class='dvc-treeview-ischeck-back'><span class='dvc-treeview-ischeck-icon dvc-treeview-check-up'></span></span>");
		}
		html.push("</div>");
		
		if(isChildren)
		{
			var childrenLen = liData.childnodes.length;
			var children = liData.childnodes;
			var ulStyle="";
			var arrPath = (""+path).split(".");
			if(isLast){ulStyle = "background-image:none;";}				
			arrPath.push(0);
			
			if(!liData.isexpand)
			{ulStyle+= "display:none;";}
			html.push("<ul style='"+ulStyle+"' >");
			deep++;
			for(var i=0; i< childrenLen; i++)
			{	
				var isParentLast = false;
				arrPath[arrPath.length-1] = i;
				if(i == childrenLen-1)
				{isParentLast = true;}					
				self._drawLi(treeviewWidth, children[i], html, deep, arrPath.join("."), isParentLast);				
			}
			html.push("</ul>");					
		}
		html.push("</li>");				
	},
	
	_isLastParent: function(path)
	{
		var result = [];
		var nodeData = this.options.data;
		var arrPt = path.split(".");
		var	arrPtLen = arrPt.length;
		
		for (var i = 0; i < arrPtLen; i++) {			
			var idx = arrPt[i];
			var len = 0;
			if (i == 0) {
				len = nodeData.length-1;
				nodeData = nodeData[idx];				
			}
			else {
				len = nodeData.childnodes.length-1;	
				nodeData = nodeData.childnodes[idx];						
			}
			result.push(len==idx?true:false);
		}
		return result;
	},
	
	addNode: function(target, data, type)
	{
		var $el = this.element, self = this, o = this.options;
		var html = [];
		if(!type){type = "after";}
		self._setItems(target, data, type);
		self.drawTreeview(o.data);
		return this;
	},
	
	removeNode: function(target, isunwrap)
	{
		var self = this, o = this.options;
		
		self._removeItems(target.attr("path"), isunwrap);		
		self.drawTreeview(o.data);
		return this;
	},
	
	removeAll: function()
	{				
		$(this.element).find(".dvc-treeview-node-container").remove();
		this.refresh();
		return this;
	},	
	
	getSelectedNode:function(type)
	{		
		var selectedNode = $(this.element).find(".dvc-treeview-selected-node").parent().parent(); //li
		if(selectedNode[0].nodeName == "DIV")
		{selectedNode = selectedNode.parent();}
		if(type == "id")
		{
			return selectedNode.length?selectedNode.id:null;
		}
		else if(type == "path")
		{
			return selectedNode.length?selectedNode.attr("path"):null;
		}
		else
		{
			return selectedNode.length?selectedNode:null;
		}
		return -1;
	},
	
	getCheckedNodes: function(type)
	{
		var self = this;
		var checkedNode = $(this.element).find(".dvc-treeview-checked").parent().parent().parent(); //li
		var checkedItems = [];
		var checkedLen = checkedNode.length;
		
		if(type == "data")
		{
			for(var i=0; i<checkedLen; i++)
			{
				checkedItems.push(self.getItems(checkedNode.attr("path")));
			}
			return checkedItems;
		}
		else //target
		{
			return (checkedLen)?checkedNode:null;
		}
		
		return null;
	},
	
	getItems:function(path)
	{		
		var nodeData = this.options.data;
		var arrPt = path.split(".");
		var arrPtLen = arrPt.length;
		for (var i = 0; i < arrPtLen; i++) {
			if (i == 0) {
				nodeData = nodeData[arrPt[i]];
			}
			else {
				nodeData = nodeData.childnodes[arrPt[i]];
			}
		}
		return nodeData;		
	},	
	
	_removeItems:function(path, isunwrap)
	{
		var self = this;
		var nodeData = this.options.data;
		var arrPt = path.split(".");
		var arrPtLen = arrPt.length;
		
		for (var i = 0; i < arrPtLen; i++) {
			if(i == arrPtLen-1)
			{
				var at = arrPt[i];
				if (i == 0) {
					nodeData.splice(at, 1);					
				}
				else {	
					var deleteNode = nodeData.childnodes[at];
					//at remove
					nodeData.childnodes.splice(at, 1);
					
					if(isunwrap && deleteNode.childnodes != undefined)
					{	//삭제한 노드의 child를 상위로 add
						nodeData.childnodes = self._atJoinArray(nodeData.childnodes, deleteNode.childnodes, at);					
					}					
					
					if(!nodeData.childnodes.length)
					{
						nodeData.childnodes = null;
						nodeData.isexpand = false;
					}
				}
			}
			else
			{						
				if (i == 0) {					
					nodeData = nodeData[arrPt[i]];
				}
				else {
					nodeData = nodeData.childnodes[arrPt[i]];
				}				
			}
		}
		
	}, 
	
	_setItems:function(target, data, type)
	{
		var self = this;
		var nodeData = this.options.data;
		var arrPt = target.attr("path").split(".");
		var arrPtLen = arrPt.length;
		
		for (var i = 0; i < arrPtLen; i++) {
			if(i == arrPtLen-1)
			{
				var at = arrPt[i];
				if (i == 0) {
					if(type == "after")
					{this.options.data = nodeData.concat(data);}
					else //before
					{this.options.data = data.concat(nodeData);}
				}
				else {							
					nodeData.childnodes = self._atJoinArray(nodeData.childnodes, data, at, (type == "after")?true:false);
				}
			}
			else
			{	
				if (i == 0) {
					nodeData = nodeData[arrPt[i]];
				}
				else {
					nodeData = nodeData.childnodes[arrPt[i]];
				}
			}
		}
	},
	
	/*
	when inner is true and index is 0, target[0] start addArray.
	when inner is false and index is 0, target[0] start target.
	*/
	_atJoinArray: function(target, addArray, index, inner){		
		var targetLen = target.length;			
		var joinArray = [];
		index = parseInt(index, 10);		
		
		if(targetLen > index+1)
		{			
			var firstIdx = inner?index+1:index;
			if(firstIdx)
			{joinArray = target.slice(0, firstIdx);}
			joinArray = joinArray.concat(addArray);
			joinArray = joinArray.concat(target.slice(firstIdx, targetLen));
			return joinArray;
		}			
		return target.concat(addArray);
	},
	
	refresh: function() {
		$.mobile.dvcBase.prototype.refresh.call(this);
		
	},
	
	getEventNames: function() {
		return ["ev_click", "ev_change", "ev_ecclick"];
	}
});
})( jQuery );
(function($, undefined ) {

$.davinci.popup = {};
$.davinci.popup.zIndex = 3000;
$.davinci.popup.open = function(id, options) {
	if (id[0] == '#') { id.replace('#', ''); }
	var popupInstance = $("#"+ id).data("dvcPopup");
	if(popupInstance) {
		var $popup = popupInstance.element;
	}
	else {
		var $popup = $("<div data-" + $.mobile.ns + "role='dvcPopup'></div>");
		$popup[0].id = id;
		$("body").append($popup);
		$popup.dvcPopup();
		var popupInstance = $popup.data("dvcPopup");
	}
	$.davinci.popup.zIndex += 2;
	popupInstance.open(options);
	
	return popupInstance;
};

$.davinci.popup.close = function(id) {
	if (id[0] == '#') { id.replace('#', ''); }
	var popupInstance = $("#" + id).data("dvcPopup");
	if(popupInstance) {
		popupInstance.close();
	}
};

$.davinci.popup.isShown = function(id) {
	if (id[0] == '#') { id.replace('#', ''); }
	var popupInstance = $("#" + id).data("dvcPopup");
	if(popupInstance) {
		return popupInstance.isShown();
	}
	return false;
};

$.davinci.popup.reposition = function(id, popupPos) {
	if (id[0] == '#') { id.replace('#', ''); }
	var popupInstance = $("#" + id).data("dvcPopup");
	if(popupInstance) {
		return popupInstance.reposition(popupPos);
	}
};

$.davinci.popup.adjustPopupPos = function($el, popupLeft, popupWidth, popupHeight, popupType) {
	var ARROW_HEIGHT = 16, ARROW_WIDTH = 30;

	var pos = {left:0, top:0};
	var el = $el[0];
	var buttonWidth = el.clientWidth, buttonHeight = el.offsetHeight;
	var buttonBorderLeftWidth = parseInt($el.css("border-left-width"));
	while(el) {
		pos.left += el.offsetLeft;
		pos.top += el.offsetTop;
		el = el.offsetParent;
	}

	// anchorPos = pos.left(고정값) - popup의 left
	var anchorPos = 0;
	
	if(popupType == "top") {	// top
		pos.top += (buttonHeight + ARROW_HEIGHT);
		anchorPos = pos.left - popupLeft + (buttonWidth + buttonBorderLeftWidth - ARROW_WIDTH)/2;
	}
	else {		// bottom
		pos.top -= (popupHeight + buttonHeight);
		var centerPos = (pos.left + (buttonWidth + buttonBorderLeftWidth)/2);
		// 8은 보정값인데, 어떻게 해서 8인가?
		anchorPos = popupWidth - centerPos - 8 + popupLeft;
	}
	
	// button의 borderWidth의 경우는 position밖의 범위라 버튼의 가운데를 계산하려면 buttonBorderLeftWidth를 알아야 한다.
	return {left: popupLeft, top : pos.top, width: popupWidth, height: popupHeight, anchorPos: anchorPos, type: popupType};
};

////////////////////////////////////////////////////////////////
	
$.widget( "mobile.dvcPopup", $.mobile.dvcPagebox, {
	options: {
		modal: false,
		transition: "pop",
		overlay: 0,
		onbeforeshow: undefined,
		onshow: undefined,
		onbeforehide: undefined,
		onhide: undefined
	},
	
	_create: function() {
		var $el = this.element, self = this, o = this.options;
		
		$el.addClass( "dvc-popup" );
		
		self.pageContainer = $("<div class='dvc-pagebox-item'></div>");
		self.anchor = $("<div class='dvc-anchor'></div>");
		$el.append(self.pageContainer);
		$el.append(self.anchor);

		self._isShown = false;
	},
	isShown: function() {
		return this._isShown;
	},
	
	reposition: function(PopupPos) {
		var $el = this.element, self = this, o = this.options;
		if(o.anchor && o.anchor.pos) {
			if(PopupPos.anchorPos < 0) {
				PopupPos.anchorPos = 0;
			}
			o.anchor.pos = PopupPos.anchorPos;
			
			
			switch(o.anchor.type) {
			case "left":
				self.anchor.css("bottom", o.anchor.pos);
				break;
			case "top":
				self.anchor.css("left", o.anchor.pos);
				break;
			case "right":
				self.anchor.css("top", o.anchor.pos);
				break;
			case "bottom":
				self.anchor.css("right", o.anchor.pos);
				break;
			}			
		}
		
		$el.css({
			"left": PopupPos.left,
			"top": PopupPos.top,
			"width": PopupPos.width,
			"height": PopupPos.height
		});
	},
	
	open: function(options) {
		var $el = this.element, self = this;
		var o = $.extend(this.options, options, true);
		
		if(!o.pageid) {
			// 보여줄 page가 없음.
			return;
		}

		if(self._isShown) {
			return;
		}

		// options.pageid를 open시 표시한다.
		if ( o.pageid[0] == '#' ) { o.pageid.replace('#', ''); }
		var $page = $("#" + o.pageid);
		if($page.length == 0) {
			//해당 page가 없다.
			return;
		}
		
		if(o.css) {
			$el.css(o.css);
		}
		
		self.anchor.removeClass("dvc-anchor-top dvc-anchor-bottom dvc-anchor-right dvc-anchor-left");
		if(o.anchor && o.anchor.type) {
			if(o.anchor.pos < 0) {
				o.anchor.pos = 0;
			}
			switch(o.anchor.type) {
			case "left":
				self.anchor.addClass("dvc-anchor-left");
				self.anchor.css("bottom", o.anchor.pos);
				break;
			case "top":
				self.anchor.addClass("dvc-anchor-top");
				self.anchor.css("left", o.anchor.pos);
				break;
			case "right":
				self.anchor.addClass("dvc-anchor-right");
				self.anchor.css("top", o.anchor.pos);
				break;
			case "bottom":
				self.anchor.addClass("dvc-anchor-bottom");
				self.anchor.css("right", o.anchor.pos);
				break;
			}
		}
				
		var pageid = $page[0].id;

		if(!o.overlay) {
			o.overlay = 0;
		}
		
		var obj = $('<div></div>').css({height:'100%',width:'100%',position:'absolute',left:0,top:0,'z-index':$.davinci.popup.zIndex-1,opacity:o.overlay/100});
		$el.css('z-index', $.davinci.popup.zIndex);
		if(o.modal) {
			obj.css('cursor','wait');
		}
		else if(o.overlay >= 0) {
			// 바탕화면을 찍으면 종료되도록 event를 bind해둔다.
			obj.bind("vclick", function(e) {
				self.close();
			});
		}
		else {
			obj = false;
		}

		self.obj = (obj) ? obj.addClass('dvc-popup-overlay').prependTo('body') : false;
		
		self.pageContainer.append($page);
		$page.addClass(self.activePageClass);
				
		self._enhancePage($page);
		self.activePage = $page;

		if(o.onbeforeshow) {
			o.onbeforeshow();
		}

		$._fnFindActivePagesInPagebox($page).each(function() {
			$._fnSubpageEventGenerate(this, "ev_pagebeforeshow");
		});

		$._fnCallPageEvent(pageid, "ev_pagebeforeshow", [pageid]);

		// show
		$el.show();

		var _fnShow = function() {
			$._fnFindActivePagesInPagebox($page).each(function() {
				$._fnSubpageEventGenerate(this, "ev_pageshow");
			});
			
			
			$._fnCallPageEvent(pageid, "ev_pageshow", [pageid]);	

			if(o.onshow) {
				o.onshow();
			}

			self._isShown = true;			
		};

		if(o.transition != "none") {
			$el.addClass(o.transition + " in")			
				.animationComplete(function() {
					_fnShow();
			});			
		}
		else {
			_fnShow();
		}
	},
	
	close: function() {
		var $el = this.element, self = this, o = this.options;

		if(self._isShown == false) {
			return;
		}

		if(o.onbeforehide) {
			o.onbeforehide();
		}

		var $page = self.pageContainer.find(">."+self.activePageClass);
		
		// 하위의 subpage위젯의 _onhide를 호출한다.
		$._fnFindActivePagesInPagebox($page).each(function() {
			$._fnSubpageEventGenerate(this, "ev_pagebeforehide");
		});
		
		var pageid = $page[0].id;
		$._fnCallPageEvent(pageid, "ev_pagebeforehide", [pageid]);

		var _fnHide = function() {
			if(o.transition != "none") {
				$el.removeClass("out in reverse " + o.transition);
			}
			if(self.obj) {
				self.obj.remove();
			}
			$el.hide();

			$page.removeClass(self.activePageClass);

			// 하위의 subpage위젯의 _onhide를 호출한다.
			$._fnFindActivePagesInPagebox($page).each(function() {
				$._fnSubpageEventGenerate(this, "ev_pagehide");
			});
			
			$._fnCallPageEvent(pageid, "ev_pagehide", [pageid]);
			
			self._isShown = false;
			
			$.davinci.popup.zIndex -= 2;
			
			if(o.onhide) {
				o.onhide();
			}			
		};

		if(o.transition != "none") {		
			$el.removeClass("in")
				.addClass(o.transition + " out reverse")
				.animationComplete(function() {
					_fnHide();
			});
		}
		else {
			_fnHide();
		}
	}
	
});

})( jQuery );(function($,undefined){
$.widget("mobile.dvcAudio",$.mobile.dvcBase,{
	options:{
		loop: false,
		controls: false,
		autoplay: false,
		src: "",
		playing: false,
		initSelector: ":jqmData(role='dvcAudio')"
	},
	_create:function(){
		var $el= this.element, self= this, o= self.options; 
		
		$el.addClass('dvc-audio');
		var $audio = $("<audio>").appendTo($el);
		$audio[0].id = $el[0].id + "_audio";
		if(o.loop) {
			$audio.attr("loop", "");
		}
		if(o.controls) {
			$audio.attr("controls", "");
		}
		if(o.autoplay) {
			$audio.attr("autoplay", "");
		}
		if(o.src) {
			$audio.attr("src", o.src);
		}
		
		var audio = $audio[0];
		self._audio = audio;
		
		audio.addEventListener("ended", function(e) {
			self.playing = false;
			$el.trigger("ev_ended");
		});
	},
	
	audio: function() {
		return this._audio;
	},
	
	play: function() {
		this.playing = true;
		this._audio.play();
	},
	
	isPlaying: function() {
		return this.playing;
	},
	
	pause: function() {
		this.playing = false;
		this._audio.pause();
	},
	
	getEventNames: function() {
		return ["ev_ended"];
	}
});
})(jQuery);(function($,undefined){
$.widget("mobile.dvcVideo",$.mobile.dvcBase,{
	options:{
		poster: "",
		loop: false,
		controls: true,
		autoplay: false,
		src: "",
		initSelector: ":jqmData(role='dvcVideo')"
	},
	_create:function(){
		var $el= this.element, self= this, o= self.options; 
		
		$el.addClass('dvc-video');
		
		var $video = $("<video style='display: none !important;'>").appendTo($el);
		$video[0].id = $el[0].id + "_video";
		var $poster;
		if(o.poster) {
			$poster = $("<div class='dvc-video-poster' style='background-image:url(" + o.poster + ")'></div>");
		}
		else {
			$poster = $("<div class='dvc-video-poster'></div>");
		}
		$el.append($poster);
		self.$poster = $poster;
		
		if(o.loop) {
			$video.attr("loop", "");
		}
		if(o.controls) {
			$video.attr("controls", "");
		}
		if(o.autoplay) {
			$video.attr("autoplay", "");
		}
		if(o.src) {
			$video.attr("src", o.src);
		}

		this.element.css({
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"background-color": "black"
		});

		var video = $video[0];
		self._video = video;
		
		self.$video = $video;
				
		video.addEventListener("pause", function(e) {
			console.log("ev_pause");

			self.$poster.show();

			var video = self.video();
			video.style.cssText = "position: absolute; top:-3000px !important;";
		});
		
		$poster.bind("vclick", function() {
			var platform = window.navigator.platform;
			
			if(platform == "iPod" || platform == "iPhone") {
				video.style.cssText = "position: absolute; top:-3000px !important;";
			}
			else {
				if(platform == "iPad" || platform == "Win32") {
					video.style.cssText = "position: absolute; top:0px !important;";					
				}
				else {
					// Android 버전2만 폰이라고 가정한다.
					var reAndroid = /Android\s(\d)/;
					var androidVersion = reAndroid.exec(window.navigator.appVersion);
					if(androidVersion && androidVersion[1] == 2) {
						setTimeout(function() {
		                	video.style.cssText = "position: absolute; top:-3000px !important;";
		                	self.play();
		            	}, 10);	
		            	return false;
					}
					else {
						video.style.cssText = "position: absolute; top:0px !important;";
					}
				}
			}
			self.$poster.hide();
			self.play();
			return false;
		});
		
		this.refresh();
	},
	
	play: function() {
		var video = this.video();

		var width = this.element.width();
		var $video = this.element.children();
		
		if(width) {
			$video.attr("width", width);
		}
		
		var height = this.element.height();
		if(height) {
			$video.attr("height", height);
		}
		
		video.play();
		setTimeout(function() {
			video.play();
		}, 10);
	},
	
	video: function() {
		return this._video;
	}
});
})(jQuery);(function($, undefined ) {
$.widget( "mobile.dvcDivision", $.mobile.widget, {
	options: {
		initSelector: ":jqmData(role='dvcDivision')"
	},
	_create: function(){
		var $el = this.element;
		$el.addClass( "dvc-division" );
	},
	triggerinit:function(){
		var $el = this.element;

		$el.trigger("ev_dvcdivisioninit", $el[0].id);
	},
	getEventNames: function() {
		return ["ev_dvcdivisioninit"];
	}
});
})( jQuery );
(function( $, undefined ) {

$.fn._eventRegs = function(evtNames) {
	var self = this;
	
	function _eventReg(evtname) {
		var splt = evtname.split("_");
		if(splt.length != 2) {
			return;
		}
		var evt_attName = splt[0] + "-on" + splt[1];
		
		var evtfunction = self.attr(evt_attName);
		if(evtfunction) {
			var splt = evtfunction.split(".");
			if(splt.length == 1) {
				if(typeof window[evtfunction] == "function") {
					$('#' + self[0].id).live(evtname, function(e, id, param1, param2, param3) {
						window[evtfunction](e, id, param1, param2, param3);
						
						return false;	// event bubbling이 되지 않도록 차단함.
					});
				}
				else {
					console.log(evtfunction + " function not found.");
				}
			}
			else {
				var obj = window;
				for(var i=0;i<splt.length - 1;i++) {
					obj = obj[splt[i]];
					if(!obj) {
						return;
					}
				}
				var fn = obj[splt[i]];
				if(typeof fn == "function") {
					$('#' + self[0].id).live(evtname, function(e, id, param1, param2, param3) {
						obj[splt[i]].call(obj, e, id, param1, param2, param3);
						
						return false;	// event bubbling이 되지 않도록 차단함.
					});
				}
				else {
					console.log(evtfunction + " function not found.");
				}
			}
		}
		else {
			// page이벤트 + ev_orientationchange + ev_back 일 경우 bubble up 되지 않도록 추가.
			if(/ev_page\w+/.test(evtname) || evtname == "ev_orientationchange" || evtname == "ev_back") {
				$('#' + self[0].id).live(evtname, function(e, id, param1, param2, param3) {
					return false;
				});
			}
		}
	}
	
	var len = evtNames.length;
	for(var i=0;i<len;i++) {
		_eventReg(evtNames[i]);
	}
};

$._fnFindActivePagesInPagebox = function($page) {
	var id = $page[0].id;
	return $page.find(".dvc-pagebox-activepage").filter(function() {
		var $childPage = $(this);
		var $closetPage = $childPage.parent().closest(".ui-page");
		if($closetPage[0].id == id) {
			if($childPage.parent().parent().hasClass("dvc-pagebox")) {
				return true;
			}
		}
		return false;
	});
};

$._fnCallPageEvent = function(id, evtname, params) {
	$('#' + id).trigger(evtname, params);
};

$._fnSubpageEventGenerate = function(thiz, evtname) {
	var $page = $(thiz);
	var pageid = thiz.id;
	
	// 이 page가 instance가 생성된 것인지를 확인하여 생성되지 않았으면 skip
	var pageInstance = $page.data("page");
	if(!pageInstance)
		return;

	$._fnCallPageEvent(pageid, evtname, [pageid]);

	$._fnFindActivePagesInPagebox($page).each(function() {
		$._fnSubpageEventGenerate(this, evtname);
	});
	
};

$._fnPageInitialize = function($page) {
	// item의 하위에 type이 dvc로 시작하는 것을 모두 찾아서 new instance한다.
	$page.find("div:jqmData(role^='dvc')").each(function(){
		var self = this, $this = $(this);
		var role = $this.jqmData('role');
		var id = this.id;
		if(!id) {
			id = $this.attr("subid");
		}
						
		var fListviewItemDesign = false;
		// 이 위젯의 상위에 dvc-listview-item-design가 있으면 skip
		$this.parents().each(function() {
			if($(this).hasClass("dvc-listview-item-design")) {
				fListviewItemDesign = true;
				return false;
			}
		});

		if(fListviewItemDesign) {
			//console.log("design skip role = " + role + ", id = " + id);
			return true;
		}			

		if(role) {
			if(role == "dvcRadioButton" || role == "dvcCheckbox") {
				role = "dvcButton";
			}
			
			if($this.data(role)) {
				//console.log("duplicate skip role = " + role + ", id = " + id);
				return true;
			}
			
			//console.log("role = " + role + ", id = " + id);
			
			$this[role]();

			// id가 없는 widget에 대해서는 event 등록 절차를 실행하지 않는다.
			if($this[0].id) {
				// 해당 위젯의 event를 등록한다.
				var instance = $this.data(role);
				var eventNames = instance.getEventNames();
				if(eventNames.length) {
					$this._eventRegs(eventNames);
				}
				if(role === "dvcDivision"){
					instance.triggerinit();
				}
			}
		}
	});	
	
	var eventNames = ['ev_pageinit', 'ev_pagebeforehide', 'ev_pagehide', 'ev_pagebeforeshow', 'ev_pageshow', 'ev_orientationchange', 'ev_back'];
	if($page[0].id) {
		$page._eventRegs(eventNames);
	}
};

$( ".ui-page" ).live( "pageinit", function(){
	var $page = $(this);
	var pageid = this.id;
	
	$._fnPageInitialize($page);

	$._fnCallPageEvent(pageid, "ev_pageinit", [pageid]);
	
	// 이벤트가 상위로 올라가는 것을 막는다.
	return false;
});

$( ".ui-page" ).live( "pagebeforeshow", function(){
	var $page = $(this);
	var pageid = this.id;
	
	$._fnFindActivePagesInPagebox($page).each(function() {
		$._fnSubpageEventGenerate(this, "ev_pagebeforeshow");
	});
	
	$._fnCallPageEvent(pageid, "ev_pagebeforeshow", [pageid]);
	
	// 이벤트가 상위로 올라가는 것을 막는다.
	return false;
});
  
$( ".ui-page" ).live( "pageshow", function(){
	var $page = $(this);
	var pageid = this.id;
	
	$._fnFindActivePagesInPagebox($page).each(function() {
		$._fnSubpageEventGenerate(this, "ev_pageshow");
	});

	$._fnCallPageEvent(pageid, "ev_pageshow", [pageid]);
	    
	// 이벤트가 상위로 올라가는 것을 막는다.
	return false;
});

$( ".ui-page" ).live( "pagebeforehide", function(){
	var $page = $(this);
	var pageid = this.id;
	
	$._fnFindActivePagesInPagebox($page).each(function() {
		$._fnSubpageEventGenerate(this, "ev_pagebeforehide");
	});
	
	$._fnCallPageEvent(pageid, "ev_pagebeforehide", [pageid]);
	
	// 이벤트가 상위로 올라가는 것을 막는다.
	return false;
});

$( ".ui-page" ).live( "pagehide", function(){
	var $page = $(this);
	var pageid = this.id;
	
	$._fnFindActivePagesInPagebox($page).each(function() {
		$._fnSubpageEventGenerate(this, "ev_pagehide");
	});
	
	$._fnCallPageEvent(pageid, "ev_pagehide", [pageid]);
	
	// 이벤트가 상위로 올라가는 것을 막는다.
	return false;
});

})( jQuery );

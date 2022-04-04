
var hasScolled = false;
var muted = true;
var scheduledAnimationFrame;

$(document).ready(function() {

	//
	// SCROLLING
	//

	// function: make element visible over specified rangw
	// parameters:
	//		targetEl 			- (jquery obj) to make visible/invisible
	//		triggerOffset 		- offset on page
	//		minTopTriggerPos 	- (int) min scroll pos
	//		maxTopTriggerPos 	- (int) max scroll pos
	//			element is not hidden between min and max positions
	function makeVisibleInScrollRange(targetEl, triggerElPos, minTopTriggerPos, maxTopTriggerPos, note) {
		// if pos within min and max, make visible
		if (triggerElPos >= minTopTriggerPos && triggerElPos < maxTopTriggerPos) {
			if (targetEl.hasClass("hidden")) {
				targetEl.removeClass("hidden");
				console.log("Showing: ", note, " pos:", triggerElPos, " min:", minTopTriggerPos, " max:", maxTopTriggerPos);
			}
		}
		// else make invisible
		else {
			if (!targetEl.hasClass("hidden")) {
				targetEl.addClass("hidden");
				console.log("Hiding: ", note, " pos:", triggerElPos, " min:", minTopTriggerPos, " max:", maxTopTriggerPos);
			}
		}
	}

	// function: cue all elements triggered by scroll
	//
	function cueScrollElements() {	
		console.log("cueScrollElements()")
		// don't render new animations until we need to
		scheduledAnimationFrame = false;
		//
		var windowHeight = $(window).height();
		var bannerHeight = $('#banner').height();
		// var windowBottomPos = windowTopPos + windowHeight;
		// console.log("windowTopPos:", windowTopPos, "  windowBottomPos:", windowBottomPos);

		// backgrounds
		//
		var bkgdLen = $("#banner .background").length;
		for (i=0; i<bkgdLen; i++) {
			makeVisibleInScrollRange(
				// target element
		    	$('#banner .background' + i), 
		    	// trigger element position
		    	$(document).scrollTop(), 
		    	// from pos
		    	(bannerHeight - windowHeight) * i / bkgdLen, 
		    	// to pos
		    	bannerHeight,
		    	// note
		    	'#banner .background' + i
	    	);
		}
	}

	// onScroll - things that happen when scrolling
	//
	function onScroll() {
		// Prevent multiple rAF callbacks.
		if (scheduledAnimationFrame){
			return;
		}
		scheduledAnimationFrame = true;
		requestAnimationFrame(cueScrollElements);
	}

	// initialize elements
	//
	cueScrollElements();
	
	// scroll event handler
	//
	var scrollDisabled = false;
	$(window).scroll(onScroll);

});
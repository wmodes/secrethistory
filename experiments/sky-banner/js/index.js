// index.js - Secret History site js
// author: Wes Modes <wes@peoplesriverhistory.us>
// date: May 2020
// license: MIT 2.0

// TODO:
//	* add debounce to scroll function so it is is triggered less frequently

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
		// don't render new animations until we need to
		scheduledAnimationFrame = false;
		//
		var windowHeight = $(window).height();
		var headerHeight = $('#banner').height();
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
		    	(headerHeight - windowHeight) * i / (bkgdLen+4),
		    	// (headerHeight) * i / bkgdLen,  
		    	// to pos
		    	headerHeight,
		    	// note
		    	'#banner .background' + i
	    	);
		}
		//
	    // stars
	    //
	    makeVisibleInScrollRange(
	    	// target element
	    	$('#banner .stars1'), 
	    	// trigger element position
	    	$(document).scrollTop() + $('#banner').offset().top,
	    	// from pos
	    	-1, 
	    	// to pos
	    	headerHeight * 2 / bkgdLen,
	    	// note
	    	'#banner .stars1'
    	);
	    //
	    // title
	    //
	    makeVisibleInScrollRange(
	    	// target element
	    	$('#banner .title'), 
	    	// trigger element position
	    	$(document).scrollTop() + $('#banner').offset().top, 
	    	// from pos
	    	-1, 
	    	// to pos
	    	$('#banner').height() - (windowHeight * 1.5),
	    	// note
	    	'#banner .title'
    	);
	    //
	    // quick-links
	    //
	    makeVisibleInScrollRange(
	    	// target element
	    	$('#banner .quick-links'), 
	    	// trigger element position
	    	$(document).scrollTop() + $('#banner').offset().top, 
	    	// from pos
	    	100, 
	    	// to pos
	    	$('#banner').height() - (windowHeight *  1.25),
	    	// note
	    	'#banner .quick-links'
    	);
	} 

	// hint to user they should scroll down
	//
	function scrollHint() {
		if (!hasScolled) {
			$("#banner .down-arrow").removeClass("hidden");
			setTimeout(function(){
				$("#banner .down-arrow").addClass("hidden");
			}, 5000);
			setTimeout(function(){
				scrollHint();
			},10000)
		}
	}
	setTimeout(function(){
		scrollHint()
	}, 3000);

	// onScroll - things that happen when scrolling
	//
	function onScroll() {
		hasScolled = true;
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

	//
	// AUDIO
	//

	// audio controls
	//
	var backAudio = $('#audio-player');
	$('.audio-button').click(function() {
        var button = $(this);
        if (!muted) {
        	button.addClass('muted');
            backAudio.animate({volume: 0}, 3000, function () {
                muted = true;
                backAudio.trigger("pause");
            });
        }
        else {
        	backAudio.prop("volume", 0);
        	backAudio.trigger("play");
        	button.removeClass('muted');
            $('#audio-player').animate({volume: 1}, 3000, function () {
                muted = false;
            });
        }
	});	

	//
	// Formatting tweaks
	//

	// In widecard elements, make the image and text the same height
	//
	$('.widecard figure').each(function(){
		var textHeight = $(this).find("figcaption .text").outerHeight();
		$(this).find(".image").height(textHeight);
	})


});
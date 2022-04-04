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
				// console.log("Showing: ", note, " pos:", triggerElPos, " min:", minTopTriggerPos, " max:", maxTopTriggerPos);
			}
		}
		// else make invisible
		else {
			if (!targetEl.hasClass("hidden")) {
				targetEl.addClass("hidden");
				// console.log("Hiding: ", note, " pos:", triggerElPos, " min:", minTopTriggerPos, " max:", maxTopTriggerPos);
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
		var pageHeight = $(document).height();
		// var windowBottomPos = windowTopPos + windowHeight;
		// console.log("windowTopPos:", windowTopPos, "  windowBottomPos:", windowBottomPos);

		// backgrounds
		//
		var bkgdLen = $(".backgrounds .background").length;
		for (i=0; i<bkgdLen; i++) {
			makeVisibleInScrollRange(
				// target element
		    	$('.backgrounds .background' + i), 
		    	// trigger element position
		    	$(document).scrollTop(), 
		    	// from pos
		    	(pageHeight - windowHeight) * i / bkgdLen, 
		    	// to pos
		    	pageHeight,
		    	// note
		    	'.backgrounds .background' + i
	    	);
			makeVisibleInScrollRange(
				// target element
		    	$('.footer-backgrounds .footer-background' + i), 
		    	// trigger element position
		    	$(document).scrollTop(), 
		    	// from pos
		    	(pageHeight - windowHeight) * i / bkgdLen, 
		    	// to pos
		    	(pageHeight - windowHeight) * (i + 1) / bkgdLen,
		    	// note
		    	'.footer-backgrounds .footer-background' + i
	    	);
		}
		//
	    // stars
	    //
	    makeVisibleInScrollRange(
	    	// target element
	    	$('.backgrounds .stars1'), 
	    	// trigger element position
	    	$(document).scrollTop() + $('.banner-placeholder').offset().top,
	    	// from pos
	    	-1, 
	    	// to pos
	    	pageHeight * 2 / bkgdLen,
	    	// note
	    	'.backgrounds .stars1'
    	);
	    //
	    // title
	    //
	    makeVisibleInScrollRange(
	    	// target element
	    	$('.banner .title'), 
	    	// trigger element position
	    	$(document).scrollTop() + $('.banner-placeholder').offset().top, 
	    	// from pos
	    	-1, 
	    	// to pos
	    	$('.banner-placeholder').height() - (windowHeight) - 200,
	    	// note
	    	'.banner .title'
    	);
	    //
	    // quick-links
	    //
	    makeVisibleInScrollRange(
	    	// target element
	    	$('.banner .quick-links'), 
	    	// trigger element position
	    	$(document).scrollTop() + $('.banner-placeholder').offset().top, 
	    	// from pos
	    	100, 
	    	// to pos
	    	$('.banner-placeholder').height() - windowHeight,
	    	// note
	    	'.banner .quick-links'
    	);
	    //
    	// small elements - fade in as soon as they clear the footer
    	//
		var footerOffset = $(".silhouette").offset().top;
    	$(".fade-in-past-footer").each(function(){
			makeVisibleInScrollRange(
		    	// target element
		    	$(this), 
		    	// trigger element position
		    	$(this).offset().top, 
		    	// from pos
		    	$(document).scrollTop() - $(this).height() + 150,
		    	// to pos
		    	footerOffset + 150,
		    	// note
		    	".fade-in-past-footer"
	    	);
    	})
    	//
    	// larger elements - fade in as soon they are partly into the page
    	//
    	$(".fade-in-part-way").each(function(){
    		makeVisibleInScrollRange(
		    	// target element
		    	$(this), 
		    	// trigger element position
		    	$(this).offset().top, 
		    	// from pos
		    	$(document).scrollTop() - $(this).height() + 100,
		    	// to pos
		    	footerOffset - 100,
		    	// note
		    	".fade-in-part-way"
	    	);
    	})
	} 

	// hint to user they should scroll down
	//
	function scrollHint() {
		if (!hasScolled) {
			$(".down-arrow").removeClass("hidden");
			setTimeout(function(){
				$(".down-arrow").addClass("hidden");
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
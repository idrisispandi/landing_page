/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			// $window.on('load', function() {

			// 	$('#two').poptrox({
			// 		caption: function($a) { return $a.next('h3').text(); },
			// 		overlayColor: '#2c2c2c',
			// 		overlayOpacity: 0.85,
			// 		popupCloserText: '',
			// 		popupLoaderText: '',
			// 		selector: '.work-item a.image',
			// 		usePopupCaption: true,
			// 		usePopupDefaultStyling: false,
			// 		usePopupEasyClose: false,
			// 		usePopupNav: true,
			// 		windowMargin: (breakpoints.active('<=small') ? 0 : 50)
			// 	});

			// });

function initProjectCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var slides = Array.from(carousel.querySelectorAll('a.image'));
    if (slides.length <= 1) return;

    var btnPrev = carousel.querySelector('.carousel-btn.prev');
    var btnNext = carousel.querySelector('.carousel-btn.next');

    var intervalMs = parseInt(carousel.getAttribute('data-interval'), 10);
    if (Number.isNaN(intervalMs)) intervalMs = 0;

    var idx = Math.max(0, slides.findIndex(function (s) { return s.classList.contains('is-active'); }));
    var timer = null;

    function show(i) {
      slides[idx].classList.remove('is-active');
      idx = (i + slides.length) % slides.length;
      slides[idx].classList.add('is-active');
    }

    function next() { show(idx + 1); }
    function prev() { show(idx - 1); }

    if (btnNext) btnNext.addEventListener('click', function (e) { e.preventDefault(); next(); });
    if (btnPrev) btnPrev.addEventListener('click', function (e) { e.preventDefault(); prev(); });

    // Pause autoplay on hover/focus (optional but nice)
    function start() {
      if (intervalMs > 0 && !timer) timer = window.setInterval(next, intervalMs);
    }
    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    start();
  });
}


$window.on('load', function () {

  // 1) Inline carousel buttons
  initProjectCarousels();

  // 2) Lightbox: one gallery PER project card (nav stays within that card)
  $('#two article.work-item').each(function () {
    var $item = $(this);

    $item.poptrox({
      selector: 'a.image', // <-- IMPORTANT: relative to THIS work-item only
      caption: function ($a) {
        return $a.find('img').attr('alt') || '';
      },
      overlayColor: '#2c2c2c',
      overlayOpacity: 0.85,
      popupCloserText: '',
      popupLoaderText: '',
      usePopupCaption: true,
      usePopupDefaultStyling: false,
      usePopupEasyClose: false,
      usePopupNav: true,
      windowMargin: (breakpoints.active('<=small') ? 0 : 50)
    });
  });

});



// $window.on('load', function() {

//   // Lightbox: one gallery per work-item (so nav is per project)
//   $('#two article.work-item').each(function() {
//     var $item = $(this);

//     $item.poptrox({
//       selector: 'article.work-item a.image', // <-- IMPORTANT (works for carousel + normal)
//     //   caption: function ($a) {
// 	// 	var title = $a.closest('article.work-item').find('h3').first().text();
// 	// 	var alt = $a.find('img').attr('alt') || '';
// 	// 	return alt ? (title + ' — ' + alt) : title;
// 	// 	},
// 	caption: function ($a) {
// 		return $a.find('img').attr('alt') || '';
// 		},
//   overlayColor: '#2c2c2c',
//   overlayOpacity: 0.85,
//   popupCloserText: '',
//   popupLoaderText: '',
//   usePopupCaption: true,
//   usePopupDefaultStyling: false,
//   usePopupEasyClose: false,
//   usePopupNav: true,
//   windowMargin: (breakpoints.active('<=small') ? 0 : 50)
//     });
//   });

//   // Carousel init
//   initProjectCarousels();

// });


// $window.on('load', function () {

//   $('#two').poptrox({
//     selector: 'article.work-item a.image',
//     caption: function ($a) { return $a.find('img').attr('alt') || ''; },
//     overlayColor: '#2c2c2c',
//     overlayOpacity: 0.85,
//     popupCloserText: '',
//     popupLoaderText: '',
//     usePopupCaption: true,
//     usePopupDefaultStyling: false,
//     usePopupEasyClose: false,
//     usePopupNav: true,
//     windowMargin: (breakpoints.active('<=small') ? 0 : 50)
//   });

//   initProjectCarousels();
// });








})(jQuery);
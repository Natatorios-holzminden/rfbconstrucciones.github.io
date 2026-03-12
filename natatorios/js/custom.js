$(window).on('load', function () {

	"use strict";


	/* ========================================================== */
	/*   Navigation Background Color                              */
	/* ========================================================== */

	var lastScrollTop = 0;
	$(window).on('scroll', function () {
		var st = $(this).scrollTop();

		// Navbar opaque al pasar 450px
		if (st > 450) {
			$('.navbar-fixed-top').addClass('opaque');
		} else {
			$('.navbar-fixed-top').removeClass('opaque');
		}

		// Ocultar navbar al bajar, mostrar WA — desde 50px
		if (st > 50) {
			if (st > lastScrollTop) {
				// Bajando: navbar se oculta, WA aparece
				$('.navbar-fixed-top').addClass('nav-hidden');
				$('.whatsapp_float').addClass('visible');
			} else {
				// Subiendo: navbar vuelve, WA desaparece
				$('.navbar-fixed-top').removeClass('nav-hidden');
				$('.whatsapp_float').removeClass('visible');
			}
		} else {
			$('.navbar-fixed-top').removeClass('nav-hidden');
			$('.whatsapp_float').removeClass('visible');
		}

		lastScrollTop = st;
	});


	/* ========================================================== */
	/*   Hide Responsive Navigation On-Click                      */
	/* ========================================================== */

	$(".navbar-nav li a").on('click', function (event) {
		$(".navbar-collapse").collapse('hide');
	});


	/* ========================================================== */
	/*   Navigation Color                                         */
	/* ========================================================== */

	$('#navbarCollapse').onePageNav({
		filter: ':not(.external)'
	});


	/* ========================================================== */
	/*   SmoothScroll                                             */
	/* ========================================================== */

	$(".navbar-nav li a, a.scrool").on('click', function (e) {

		var full_url = this.href;
		var parts = full_url.split("#");
		var trgt = parts[1];
		var target_offset = $("#" + trgt).offset();
		var target_top = target_offset.top;

		$('html,body').animate({ scrollTop: target_top - 70 }, 1000);
		return false;

	});


	/* ========================================================== */
	/*   Newsletter                                               */
	/* ========================================================== */

	$('.newsletter-form').each(function () {
		var form = $(this);
		//form.validate();
		form.submit(function (e) {
			if (!e.isDefaultPrevented()) {
				jQuery.post(this.action, {
					'email': $('input[name="nf_email"]').val(),
				}, function (data) {
					form.fadeOut('fast', function () {
						$(this).siblings('p.newsletter_success_box').show();
					});
				});
				e.preventDefault();
			}
		});
	});


	/* ========================================================== */
	/*   Register                                                 */
	/* ========================================================== */

	// Capturar UTMs y GCLID al cargar
	(function() {
		var params = new URLSearchParams(window.location.search);
		var gclid = params.get('gclid') || sessionStorage.getItem('gclid') || '';
		if (params.get('gclid')) sessionStorage.setItem('gclid', params.get('gclid'));
		if (params.get('utm_source')) sessionStorage.setItem('utm_source', params.get('utm_source'));
		if (params.get('utm_medium')) sessionStorage.setItem('utm_medium', params.get('utm_medium'));
		if (params.get('utm_campaign')) sessionStorage.setItem('utm_campaign', params.get('utm_campaign'));
		$('#rfb_gclid').val(gclid);
		$('#rfb_utm_source').val(params.get('utm_source') || sessionStorage.getItem('utm_source') || '');
		$('#rfb_utm_medium').val(params.get('utm_medium') || sessionStorage.getItem('utm_medium') || '');
		$('#rfb_utm_campaign').val(params.get('utm_campaign') || sessionStorage.getItem('utm_campaign') || '');
	})();

	$('#register-form').on('submit', function (e) {
		e.preventDefault();

		var form = $(this);
		var submitBtn = form.find('input[type="submit"]');
		var name    = form.find('input[name="register_names"]').val();
		var phone   = form.find('input[name="register_phone"]').val();
		var email   = form.find('input[name="register_email"]').val();
		var message = form.find('input[name="register_mensage"]').val();

		submitBtn.prop('disabled', true).val('ENVIANDO...');

		jQuery.ajax({
			url: 'https://formsubmit.co/ajax/maxi.flores.mp@gmail.com',
			method: 'POST',
			dataType: 'json',
			data: {
				Nombre:        name,
				Telefono:      phone,
				Email:         email,
				Consulta:      message,
				GCLID:         $('#rfb_gclid').val(),
				UTM_Source:    $('#rfb_utm_source').val(),
				UTM_Medium:    $('#rfb_utm_medium').val(),
				UTM_Campaign:  $('#rfb_utm_campaign').val(),
				_subject:      'RFB PILETAS - Nueva consulta de ' + name,
				_template:     'table'
			},
			success: function () {
				if (typeof gtag !== 'undefined') {
					gtag_report_conversion();
					gtag_form_submit();
				}
				form.fadeOut('fast', function () {
					$(this).siblings('p.register_success_box').show();
				});
			},
			error: function () {
				// Fallback: abrir mailto
				var mailBody = 'Nombre: ' + name + '%0D%0A' +
					'Telefono: ' + phone + '%0D%0A' +
					'Email: ' + email + '%0D%0A' +
					'Consulta: ' + message;
				window.location.href = 'mailto:maxi.flores.mp@gmail.com?subject=RFB PILETAS - Nueva consulta&body=' + mailBody;
				form.fadeOut('fast', function () {
					$(this).siblings('p.register_success_box').show();
				});
			}
		});
	});


	/* ========================================================== */
	/*   Contact                                                 */
	/* ========================================================== */

	$('#contact-form').each(function () {
		var form = $(this);
		//form.validate();
		form.submit(function (e) {
			if (!e.isDefaultPrevented()) {
				jQuery.post(this.action, {
					'names': $('input[name="contact_names"]').val(),
					'phone': $('input[name="contact_phone"]').val(),
					'email': $('input[name="contact_email"]').val(),
					'ticket': $('select[name="contact_ticket"]').val(),
					'message': $('textarea[name="contact_message"]').val(),
				}, function (data) {
					form.fadeOut('fast', function () {
						$(this).siblings('p.contact_success_box').show();
					});
				});
				e.preventDefault();
			}
		});
	})
});



/* ========================================================== */
/*   Popup-Gallery                                            */
/* ========================================================== */
$('.popup-gallery').find('a.popup1').magnificPopup({
	type: 'image',
	gallery: {
		enabled: true
	}
});

$('.popup-gallery').find('a.popup2').magnificPopup({
	type: 'image',
	gallery: {
		enabled: true
	}
});

$('.popup-gallery').find('a.popup3').magnificPopup({
	type: 'image',
	gallery: {
		enabled: true
	}
});

$('a.popup4').on('click', function(e) {
	e.preventDefault();
	$.magnificPopup.open({
		items: { src: '#video-popup', type: 'inline' },
		callbacks: {
			open: function() {
				gtag('event', 'video_play', { 'event_category': 'engagement', 'event_label': 'Mariana Fabbiani DDM' });
			},
			close: function() {
				var iframe = document.querySelector('#video-popup iframe');
				if (iframe) {
					var src = iframe.src;
					iframe.src = '';
					iframe.src = src;
				}
			}
		}
	});
});

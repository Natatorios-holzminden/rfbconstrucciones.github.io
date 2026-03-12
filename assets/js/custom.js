/*-----------------------------------------------------------------------------------

    Template Name: Websole


    Note: This is Custom Js file
  
      ## accordion-item
      ## loaded
      ## heading hover


-----------------------------------------------------------------------------------*/

/*************  accordion-item ****************/

$('.accordion-item .heading').on('click', function (e) {
  e.preventDefault();

  if ($(this).closest('.accordion-item').hasClass('active')) {
    $('.accordion-item').removeClass('active');
  } else {
    $('.accordion-item').removeClass('active');

    $(this).closest('.accordion-item').addClass('active');
  }
  var $content = $(this).next();
  $content.slideToggle(100);
  $('.accordion-item .content').not($content).slideUp('fast');
});


function inVisible(element) {
  var WindowTop = $(window).scrollTop();
  var WindowBottom = WindowTop + $(window).height();
  var ElementTop = element.offset().top;
  var ElementBottom = ElementTop + element.height();
  if ((ElementBottom <= WindowBottom) && ElementTop >= WindowTop)
    animate(element);
}

function animate(element) {
  if (!element.hasClass('ms-animated')) {
    var maxval = element.data('max');
    var html = element.html();
    element.addClass("ms-animated");
    $({
      countNum: element.html()
    }).animate({
      countNum: maxval
    }, {
      duration: 5000,
      easing: 'linear',
      step: function () {
        element.html(Math.floor(this.countNum) + html);
      },
      complete: function () {
        element.html(this.countNum + html);
      }
    });
  }

}

$(function () {
  $(window).scroll(function () {
    $("h2[data-max]").each(function () {
      inVisible($(this));
    });
  })
});


/* loaded */
/* Page loaded class added in HTML body tag */


/* heading hover  */

(function ($) {
  function title_animation() {
    var tg_var = jQuery('.sec-title-animation');
    if (!tg_var.length) {
      return;
    }
    const quotes = document.querySelectorAll(".sec-title-animation .title-animation");

    quotes.forEach(quote => {

      //Reset if needed
      if (quote.animation) {
        quote.animation.progress(1).kill();
        quote.split.revert();
      }

      var getclass = quote.closest('.sec-title-animation').className;
      var animation = getclass.split('animation-');
      if (animation[1] == "style4") return

      quote.split = new SplitText(quote, {
        type: "lines,words,chars",
        linesClass: "split-line"
      });
      gsap.set(quote, {
        perspective: 400
      });

      if (animation[1] == "style2") {
        gsap.set(quote.split.chars, {
          opacity: 0,
          x: "50"
        });
      }
      quote.animation = gsap.to(quote.split.chars, {
        scrollTrigger: {
          trigger: quote,
          start: "top 90%",
        },
        x: "0",
        y: "0",
        rotateX: "0",
        opacity: 1,
        duration: 1,
        ease: Back.easeOut,
        stagger: .02
      });
    });
  }
  // ScrollTrigger.addEventListener("refresh", title_animation);


  $(window).on('load', function () {
    // title_animation();
  });

})(window.jQuery);

// WhatsApp flotante: aparece al primer scroll
function initWspButton() {
  var el = document.getElementById('scroll-percentage');
  if (!el) return;

  function updateWsp() {
    if (window.scrollY > 10) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  }

  window.addEventListener('scroll', updateWsp);
  updateWsp(); // estado inicial
}

window.addEventListener('load', initWspButton);

// Tracking Google Ads: click en cualquier botón de WhatsApp
document.addEventListener('click', function (e) {
  var link = e.target.closest('a[href*="wa.me"]');
  if (link && typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': 'AW-932575203/0GltCOOX-_sbEOPv17wD'
    });
  }
});

// Configuración para videos verticales (Instagram/TikTok style)
$(document).ready(function () {
  // Destruir cualquier inicialización previa
  $('[data-fancybox]').off('click.fb-start');

  // Configurar Fancybox para videos verticales
  $('[data-fancybox]').fancybox({
    youtube: {
      controls: 1,
      showinfo: 0,
      autoplay: 1
    },
    afterLoad: function (instance, current) {
      // Si el video contiene el ID específico, aplicar formato vertical
      if (current.src && current.src.includes('jGQCCtIUYZw')) {
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();

        // Forzar dimensiones verticales - 95% de la altura
        var height = windowHeight * 0.95;
        var width = height * (9 / 16); // Ratio 9:16

        // Limitar ancho máximo
        if (width > 500) {
          width = 500;
          height = width * (16 / 9);
        }

        // Forzar las dimensiones después de que cargue
        setTimeout(function () {
          current.$content.css({
            'width': width + 'px !important',
            'height': height + 'px !important',
            'max-width': width + 'px',
            'max-height': height + 'px'
          });

          current.$content.find('iframe').css({
            'width': '100%',
            'height': '100%'
          });

          // Agregar clase personalizada
          instance.$refs.container.addClass('fancybox-vertical-video');
        }, 100);
      }
    }
  });
});
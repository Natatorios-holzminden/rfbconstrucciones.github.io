// Capturar parámetros de URL (gclid, UTMs) al cargar
jQuery(document).ready(function () {
  var params = new URLSearchParams(window.location.search);
  var gclid = params.get('gclid') || sessionStorage.getItem('gclid') || '';
  if (params.get('gclid')) sessionStorage.setItem('gclid', params.get('gclid'));
  jQuery('#gclid_field').val(gclid);
  jQuery('#utm_source_field').val(params.get('utm_source') || sessionStorage.getItem('utm_source') || '');
  jQuery('#utm_medium_field').val(params.get('utm_medium') || sessionStorage.getItem('utm_medium') || '');
  jQuery('#utm_campaign_field').val(params.get('utm_campaign') || sessionStorage.getItem('utm_campaign') || '');
  if (params.get('utm_source')) sessionStorage.setItem('utm_source', params.get('utm_source'));
  if (params.get('utm_medium')) sessionStorage.setItem('utm_medium', params.get('utm_medium'));
  if (params.get('utm_campaign')) sessionStorage.setItem('utm_campaign', params.get('utm_campaign'));
});

jQuery(document).ready(function () {
  jQuery('#contact-form').on('submit', function (e) {
    e.preventDefault();

    var form = jQuery(this);
    var submitBtn = form.find('button[type="submit"]');

    // Obtener valores del formulario
    var name = form.find('input[name="Complete_Name"]').val();
    var email = form.find('input[name="Email_Address"]').val();
    var phone = form.find('input[name="Phone_No"]').val();
    var message = form.find('textarea[name="Message"]').val();

    // Deshabilitar botón mientras envía
    submitBtn.prop('disabled', true);
    submitBtn.find('span').text('ENVIANDO...');

    // Enviar vía Formsubmit.co (gratis, sin registro previo)
    jQuery.ajax({
      url: 'https://formsubmit.co/ajax/maxi.flores.mp@gmail.com',
      method: 'POST',
      dataType: 'json',
      data: {
        Nombre: name,
        Email: email,
        Telefono: phone,
        Mensaje: message,
        GCLID: jQuery('#gclid_field').val(),
        UTM_Source: jQuery('#utm_source_field').val(),
        UTM_Medium: jQuery('#utm_medium_field').val(),
        UTM_Campaign: jQuery('#utm_campaign_field').val(),
        _subject: 'RFB HORMIGON - Nueva consulta desde Web',
        _template: 'table'
      },
      success: function (response) {
        // Evento GA4: lead generado
        if (typeof gtag !== 'undefined') {
          gtag('event', 'generate_lead', {
            event_category: 'form',
            event_label: 'RFB_HORMIGON'
          });
          gtag('event', 'conversion', {
            'send_to': 'AW-932575203/c3CTCOCX-_sbEOPv17wD'
          });
        }
        // Ocultar formulario y mostrar mensaje de agradecimiento
        jQuery('#form-content').fadeOut(300, function () {
          jQuery('#form-thank-you').fadeIn(400);
        });
      },
      error: function () {
        // Fallback: abrir mailto
        var mailBody = 'Nombre: ' + name + '%0D%0A' +
          'Email: ' + email + '%0D%0A' +
          'Teléfono: ' + phone + '%0D%0A' +
          'Mensaje: ' + message;

        window.location.href = 'mailto:maxi.flores.mp@gmail.com?subject=RFB HORMIGON - Consulta desde Web&body=' + mailBody;

        // Mostrar mensaje de agradecimiento igual
        jQuery('#form-content').fadeOut(300, function () {
          jQuery('#form-thank-you').fadeIn(400);
        });
      }
    });
  });
});
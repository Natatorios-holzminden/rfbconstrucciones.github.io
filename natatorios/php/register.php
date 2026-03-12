<?php

$field_first_name = isset($_POST['name'])    ? trim($_POST['name'])    : '';
$field_phone      = isset($_POST['phone'])   ? trim($_POST['phone'])   : '';
$field_mensage    = isset($_POST['mensage']) ? trim($_POST['mensage']) : '';
$field_email      = isset($_POST['email'])   ? trim($_POST['email'])   : '';

// Honeypot: si el campo oculto "website" fue completado, es un bot
$honeypot = isset($_POST['website']) ? trim($_POST['website']) : '';
if ($honeypot !== '') {
    // Silenciosamente redirigir sin enviar email
    header('Location: ../index.html');
    exit;
}

// Validación server-side: rechazar si faltan campos obligatorios
if (empty($field_first_name) || empty($field_phone) || empty($field_mensage)) {
    header('Location: ../index.html');
    exit;
}

$mail_to = 'maxi.flores.mp@gmail.com';

$subject = 'Nueva consulta de pileta - ' . $field_first_name;

date_default_timezone_set('America/Argentina/Buenos_Aires');
$fecha = date('d/m/Y H:i');

$body_message  = "Nueva consulta recibida desde rfbconstrucciones.com.ar\n";
$body_message .= "Fecha: " . $fecha . " (hora Argentina)\n\n";
$body_message .= "Nombre: "   . $field_first_name . "\n";
$body_message .= "Email: "    . $field_email      . "\n";
$body_message .= "Telefono: " . $field_phone      . "\n";
$body_message .= "Mensaje: "  . $field_mensage    . "\n";

$headers  = 'From: RFB Construcciones <noreply@rfbconstrucciones.com.ar>' . "\r\n";
$headers .= 'Reply-To: ' . $field_email . "\r\n";

$mail_status = mail($mail_to, $subject, $body_message, $headers);

?>
<script type="text/javascript">
    window.location = '../index.html';
</script>

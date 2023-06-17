<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
/*require 'phpmailer/src/SMTP.php';*/

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru','phpmailer/language/'); 
$mail->IsHTML(true);

$mail->setFrom('ukaptelinin@gmail.com','Лендинг');
$mail->addAddress('100-21@mail.ru');
$mail->Subject = 'Заявка на консультацию';

$body = '<h1>Заявка на консультацию<\h1>'

if(trim(!empty($_POST['name']))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}

if(trim(!empty($_POST['email']))) {
    $body.='<p><strong>Почта:</strong> '.$_POST['email'].'</p>';
}

if(trim(!empty($_POST['phone']))) {
    $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
}

$mail->Body = $body;

if(!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];
header('Content-type; application/json');
echo json_encode($response);
?>
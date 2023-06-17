<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = "UTF-8";
$mail->isHTML(true);
if(isset($_POST["sum_of_debt"])){
     $sum_of_debt= $_POST["sum_of_debt"];
     $delay = $_POST["delay"];
     $installment = $_POST["installment"];
     $property = $_POST["property"];
     $creditor = $_POST["creditor"];
     $payment = $_POST["payment"];
     $transact = $_POST["transact"];
     $feedback = $_POST["feedback"];
     $name = $_POST["name"];
     $email = $_POST["email"];
     $phone = $_POST["phone"];

     $email_template = "template_mail_b.html";
     $body = file_get_contents($email_template);
     $body = str_replace('%sum_of_debt%',$sum_of_debt, $body);
     $body = str_replace('%delay%',$delay, $body);
     $body = str_replace('%installment%',$installment, $body);
     $body = str_replace('%property%',$property, $body);
     $body = str_replace('%creditor%',$creditor, $body);
     $body = str_replace('%payment%',$payment, $body);
     $body = str_replace('%transact%',$transact, $body);
     $body = str_replace('%feedback%',$feedback, $body);
     $body = str_replace('%name%',$name, $body);
     $body = str_replace('%email%',$email, $body);
     $body = str_replace('%phone%',$phone, $body);
     $theme = "[Заявка с квиза]";
}else{
     $name = $_POST["name"];
     $email = $_POST["email"];
     $phone = $_POST["phone"];

     $email_template = "template_mail_s.html";
     $body = file_get_contents($email_template);
     $body = str_replace('%name%',$name, $body);
     $body = str_replace('%email%',$email, $body);
     $body = str_replace('%phone%',$phone, $body);
     $theme = "[Заявка на консультацию]";
}



$mail->addAddress("psi_prep@mail.ru");

$mail->Subject = $theme;
$mail->MsgHTML($body);

if(!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}

$response = ["message" => $message];
header('Content-type; application/json');
echo json_encode($response);
?>
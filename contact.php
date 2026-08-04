<?php

require_once 'config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once 'vendor/autoload.php';

header("Content-Type: application/json");

  $name = trim($_POST['name']??'');
  $email = trim($_POST['email']??'');
  $subject = trim($_POST['subject']??'');
  $message = trim($_POST['message']??'');

  if(empty($name) || empty($email) || empty($subject) || empty($message)){
    echo json_encode([
      "success" => false,
      "message" => "Please Fill in all required fields."
    ]);
    exit;
  }

  if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    echo json_encode([
      "success" => false,
      "message" => "Invalid email address"
    ]);
    exit;

  }

     
  $stmt = mysqli_prepare($conn, "INSERT INTO contact_messages (Name, Email, Subject, Message)
  values (?,?,?,?)");

  mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $subject, $message);
  $result = mysqli_stmt_execute($stmt);


  // Email for contact form //
    $mail = new PHPMailer(true);

    $mail->isSMTP();

    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    $mail->Username = "alohussan1@gmail.com";
    $mail->Password = $mailPassword;

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail-> Port = 587;

    $mail->setFrom(
      'alohussan1@gmail.com',
      'Portfolio Contact Form'
    );
    $mail->addAddress(
      'alohussan1@gmail.com'
    );

    $mail->isHTML(true);
    $mail->Subject = "New Portfolio Message";
    $mail->Body = "
    <h2> New Contact Form Submission </h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Subject:</strong> $subject</p>
    <p><strong>Message:</strong></p>
    <p>$message</p>
    ";

    
    try{
    $mail->send();
    echo json_encode([
      "success" => true,
      "message" => "✅ Thanks for contacting me! I'll reach out to you soon."
      ]);

  } 
  catch(Exception $e){
    echo json_encode([
      "success" => false,
      "message" => "Email could not be sent! Please try again."
    ]);
  }

?>

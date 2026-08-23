<?php

header("Content-Type: application/json; charset=UTF-8");

require_once 'config.php';
require_once 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {

    // -----------------------------
    // Get form data
    // -----------------------------
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    $errors = [];

    // -----------------------------
    // Validation
    // -----------------------------
    if (empty($name)) {
        $errors['name'] = "*Name is required";
    }

    if (empty($email)) {
        $errors['email'] = "*Email is required";
    }

    if (empty($subject)) {
        $errors['subject'] = "*Subject is required";
    }

    if (empty($message)) {
        $errors['message'] = "*Message is required";
    }

    if (!empty($errors)) {
        echo json_encode([
            "success" => false,
            "errors" => $errors
        ]);
        exit;
    }

    // -----------------------------
    // Validate email
    // -----------------------------
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid email address"
        ]);
        exit;
    }

    // -----------------------------
    // Database
    // -----------------------------
    $stmt = mysqli_prepare(
        $conn,
        "INSERT INTO contact_messages (Name, Email, Subject, Message)
         VALUES (?, ?, ?, ?)"
    );

    if (!$stmt) {
        throw new Exception("Database prepare failed: " . mysqli_error($conn));
    }

    mysqli_stmt_bind_param(
        $stmt,
        "ssss",
        $name,
        $email,
        $subject,
        $message
    );

    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception("Database insert failed: " . mysqli_stmt_error($stmt));
    }

    mysqli_stmt_close($stmt);

    // -----------------------------
    // Send email
    // -----------------------------
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    $mail->Username = "alohussan1@gmail.com";
    $mail->Password = $mailPassword;

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom(
        'alohussan1@gmail.com',
        'Portfolio Contact Form'
    );

    $mail->addAddress('alohussan1@gmail.com');

    $mail->isHTML(true);

    $mail->Subject = "New Portfolio Message";

    $mail->Body = "
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
        <p><strong>Subject:</strong> " . htmlspecialchars($subject) . "</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br(htmlspecialchars($message)) . "</p>
    ";

    $mail->send();

    // -----------------------------
    // Success
    // -----------------------------
    echo json_encode([
        "success" => true,
        "message" => "✅ Thanks for contacting me! I'll reach out to you soon."
    ]);

} catch (Exception $e) {

    error_log("Contact form error: " . $e->getMessage());

    echo json_encode([
        "success" => false,
        "message" => "Something went wrong. Please try again."
    ]);
}
?>
<?php

$SERVERNAME = "Localhost";
$USERNAME = "root";
$PASSWORD = "";
$DBNAME = "personalportfolio";

$conn = mysqli_connect($SERVERNAME, $USERNAME, $PASSWORD, $DBNAME);


if(isset($_POST['submit'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
     
    $stmt = mysqli_prepare($conn, "INSERT INTO contact_messages (Name, Email, Subject, Message)
    values (?,?,?,?)");

   mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $subject, $message);
    mysqli_stmt_execute($stmt);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="POST" class="contact-form reveal-right" id="contactForm" >
      <div class="form-row">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" id="subject" name="subject" required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
      </div>
      <button type="submit" name="submit" class="btn btn-primary ripple full">Send Message</button>
      <p class="form-status" id="formStatus" role="status"></p>
    </form>
</body>
</html>
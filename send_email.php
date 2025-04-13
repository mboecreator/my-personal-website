<?php
// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Recipient email (your Gmail address)
$to = "mbongeninsingo@gmail.com"; // Replace with your Gmail address

// Email headers
$headers = "From: $name <$email>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

// Email body
$email_body = "
<html>
<head>
    <title>New Contact Form Submission</title>
</head>
<body>
    <h2>Contact Form Submission</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Subject:</strong> $subject</p>
    <p><strong>Message:</strong></p>
    <p>$message</p>
</body>
</html>
";

// Send email
$mail_sent = mail($to, $subject, $email_body, $headers);

// Return response
if ($mail_sent) {
    echo json_encode(["success" => true, "message" => "Your message has been sent successfully!"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to send message. Please try again."]);
}
?> 
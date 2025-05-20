<?php

require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize inputs
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $destination = mysqli_real_escape_string($conn, $_POST['destination']);
    $message = mysqli_real_escape_string($conn, $_POST['message']);

    // Validate inputs
    if (empty($name) || empty($email) || empty($phone)) {
        echo json_encode(['status' => 'error', 'message' => 'Please fill all required fields']);
        exit;
    }

    // Insert into database
    $sql = "INSERT INTO contact_inquiries (name, email, phone, destination, message) 
            VALUES ('$name', '$email', '$phone', '$destination', '$message')";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(['status' => 'success', 'message' => 'Thank you for contacting us!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . mysqli_error($conn)]);
    }

    mysqli_close($conn);
    exit;
}

// If not POST request
echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);

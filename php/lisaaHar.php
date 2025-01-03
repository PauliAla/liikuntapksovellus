<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "liikuntapksovellus";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Create table if it doesn't exist
$sql = "CREATE TABLE IF NOT EXISTS harjoitus (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Harjoitus VARCHAR(255) NOT NULL,
  Paivamaara DATE NOT NULL,
  Aika TIME,
  Matka Float,
  Vastaus1 TEXT,
  Vastaus2 TEXT,
  Linkki VARCHAR(255)
)";

mysqli_query($conn, $sql);

    // Insert data from form into table
    $Harjoutus = $_POST["Harjoitus"];
    $Paivamaara = $_POST["Paivamaara"];
    $Aika = $_POST["Aika"];
    $Matka = $_POST["Matka"];
    $Vastaus1 = $_POST["Vastaus1"];
    $Vastaus2 = $_POST["Vastaus2"];
    $Linkki = $_POST["Linkki"];

    $sql = "INSERT INTO harjoitus (Harjoitus, Pvm, Aika, Matka, Vastaus1, Vastaus2, Linkki, OppilasID)
VALUES ('$Harjoitus', '$Paivamaara', '$Aika', '$Matka', '$Vastaus1', '$Vastaus2', '$Linkki')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
?>
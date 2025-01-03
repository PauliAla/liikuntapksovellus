<?php 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once('yhteys/config.php');

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Tietokantayhteys epäonnistui"]);
    exit();
}

$posti = $_POST['posti'];
$salasana = $_POST['salasana'];

// Käytä valmisteltuja lauseita SQL-injektion estämiseksi
$sql = "SELECT OppilasID, S_posti FROM oppilas WHERE S_posti = ? AND Salasana = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $posti, $salasana);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "status" => "success",
        "message" => "Kirjaudutaan sisään...",
        "id" => $row['OppilasID'],
        "email" => $row['S_posti']
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Käyttäjätunnusta tai salasanaa ei löydy!"]);
}

$stmt->close();
$conn->close();
<?php 
   header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

    require_once('yhteys/config.php');

    $conn = mysqli_connect($servername, $username, $password, $dbname);
     
    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }else{
      $url= $_SERVER['REQUEST_URI'];
      $data = basename($url);
      $Harjoitus = $_POST["harjoitus2"];

      
      $Paivamaara = $_POST["paivamaara"];
      $Aika = $_POST["kaytettyAika"];
      $Matka = $_POST["kuljettuMatka"];
      $Vastaus1 = $_POST["kunnonVastaus"];
      $Vastaus2 = $_POST["tyokykyVastaus"];
      $Linkki = $_POST["linkki"];

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

      $sql = "INSERT INTO harjoitus (harjoitus, Aika, Matka, Vastaus1, Vastaus2, Linkki, OppilasID)
VALUES ('$Harjoitus', '$Aika', '$Matka',  '$Vastaus1', '$Vastaus2', '$Linkki','$data')";
mysqli_query($conn, $sql);
      }
mysqli_close($conn);
  

?>
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once('yhteys/config.php');

$con = mysqli_connect($servername, $username, $password, $dbname);

if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
}
$id = '';
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
      
  case 'GET':
      $sql = "SELECT OppilasID, Etunimi, Sukunimi, S_posti, Pvm, Suoritukset FROM oppilas ORDER BY Suoritukset DESC";
      $result = mysqli_query($con,$sql);
      
      if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
      }
      if ($method == 'GET') {
          if (!$id) echo '[';
          for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
            echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
          }
          if (!$id) echo ']';
        } else {
          echo mysqli_affected_rows($con);
        }
    break;

  case 'DELETE':
    $path = explode('/', $_SERVER['REQUEST_URI']);

    $url= $_SERVER['REQUEST_URI'];
      $data = basename($url);
   
    mysqli_autocommit($con,FALSE);

    // poisto kaikista tauluista
    mysqli_query($con,"DELETE FROM profiili WHERE OppilasID = '$data'");
    mysqli_query($con,"DELETE FROM liikuntasuunnitelma WHERE OppilasID = '$data'");
    mysqli_query($con,"DELETE FROM harjoitus WHERE OppilasID = '$data'");
    mysqli_query($con,"DELETE FROM oppilas WHERE OppilasID = '$data'");

    // poisto epäonnistui
    if (!mysqli_commit($con)) {
      echo json_encode("Poisto epäonnistui!");
      exit();
    }
    else{
      echo json_encode(["success"=>"ID: $data Käyttäjä poistettu järjestelmästä!"]);
      return;
    }

    case 'PUT':
      $path = explode('/', $_SERVER['REQUEST_URI']);

      $url= $_SERVER['REQUEST_URI'];
      $data = basename($url);
      $sql = "UPDATE oppilas SET Suoritukset =(SELECT SUM( extract(hour from Aika) + extract(minute from Aika) / 60 + extract(second from Aika) / 3600 ) hours FROM harjoitus WHERE OppilasID= '$data') WHERE OppilasID='$data'";
      $result = mysqli_query($con,$sql);
      if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
      }else{
        echo json_encode($result);
      }
      break;

}

$con->close();

//UPDATE oppilas SET Suoritukset =(SELECT SUM( extract(hour from Aika) + extract(minute from Aika) / 60 + extract(second from Aika) / 3600 ) hours FROM harjoitus WHERE OppilasID= 5) WHERE OppilasID=5;
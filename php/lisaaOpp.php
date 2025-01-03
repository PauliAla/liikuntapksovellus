<?php 
    header('Access-Control-Allow-Origin: *');
    
    require_once('yhteys/config.php');

    $conn = mysqli_connect($servername, $username, $password, $dbname);
     
    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }else{
    $posti = $_POST['posti'];
    $etunimi = $_POST['etunimi'];
    $sukunimi = $_POST['sukunimi'];

    $sql="SELECT * FROM oppilas WHERE S_posti='$posti'";
	$result=$conn->query($sql);
	
	if ($result->num_rows > 0) {
            echo json_encode("Sähköpostiosoite on jo käytössä?");
        }
        else {
        $sql = "INSERT INTO oppilas(Etunimi, Sukunimi, S_posti) VALUES('$etunimi', '$sukunimi', '$posti')";
        if($conn->query($sql)=== true) {
           echo json_encode("Käyttäjä lisätty sovellukseen ja salasana lähetetty sähköpostiin!");

        //luodaan salasana
        $n = 10;
        function getRandomString($n){
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $randomString = '';

            for ($i = 0; $i < $n; $i++) {
                $index = rand(0, strlen($characters) - 1);
                $randomString .= $characters[$index];
            }
            return $randomString;
        }
        $randomString = getRandomString($n);
        $md = md5($randomString); //salasana tietokantaan
        $qry ="UPDATE oppilas SET Salasana='$md' WHERE S_posti= '$posti'";
        $result=mysqli_query($conn, $qry);
        if($result) {
        // viesti sähköpostiin
        //$msg = "Salasanasi liikuntapäiväkirjaan on:\n$md \nTerveisin ylläpito";
        // lähetä maili
        //mail("$posti","Salasana",$msg);
        }
        }
        else{
            echo json_encode("Jokin meni pieleen?");
        }
        }
    }
$conn->close();
 
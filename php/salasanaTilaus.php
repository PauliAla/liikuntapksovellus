<?php 
    header('Access-Control-Allow-Origin: *');
    
    require_once('yhteys/config.php');

    $conn = mysqli_connect($servername, $username, $password, $dbname);
     
    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
    else{
        $email = $_POST['email'];//lomakkeen tiedot
        
        $sql = "SELECT * FROM opettajat WHERE S_posti='$email'";//haetaan opettajat taulusta tiedot
        $res = mysqli_query($conn, $sql);
         
        if($res){
            if(mysqli_num_rows($res) == 1) {//jos s-posti löytyy
            echo json_encode("Uusi salasana lähetetty annettuun sähköpostiosoitteeseen!");
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
        $qry ="UPDATE opettajat SET Salasana='$md' WHERE S_posti= '$email'";
        $result=mysqli_query($conn, $qry);
        if($result) {
        // viesti sähköpostiin
        //$msg = "Uusi salasanasi liikuntapäiväkirjaan on:\n$md \nTerveisin ylläpito";
        // lähetä maili
        //mail("$email","Salasana",$msg);
        }
        }
        else{//jos s-posti tai salasana väärin 
            echo json_encode("Sähköpostiosoitetta ei löydy!");
        }
        }
        $conn->close();
    }
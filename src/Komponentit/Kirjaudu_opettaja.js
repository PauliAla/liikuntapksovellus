import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';


function Login() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [posti,setPosti] = useState('');
  const [salasana,setSalasana] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  
  useEffect(() => {   
    let login = localStorage.getItem("kirjaudu");
    if(login){//jos kirjautuminen tosi ohjataan etusivulle
        navigate("/Etusivu");
    }
    let loginStatus = localStorage.getItem("loginStatus");
    if(loginStatus){//jos ei kirjautunut error sivun lataus uudestaan
        setError(loginStatus);
        setTimeout(function(){
            localStorage.clear();
            window.location.reload();
        }, 2000);
    } 
    setTimeout(function(){
      setMsg("");
  }, 2000);
}, [navigate,msg]);
  
  const handleSubmit = () => {//lomakkeen käsittely

    setEmailError('') 
    setPasswordError('')
    if(posti.length === 0){//tyhjä kenttä
      setEmailError('Syötä sähköpostiosoitteesi!')
      return
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(posti)) {//merkkien tarkistus
      setEmailError('Anna oikea sähköpostiosoite?')
      return
    }
    else if(salasana.length === 0){//tyhjä kenttä
      setPasswordError('Syötä salasanasi.')
      return
    }
    else{//kentät täytetty php tarkistus ja uudelleen ohjaus
      const url = 'http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/kirjaudu.php';
      let fData = new FormData();//lomakkeelta tiedot
      fData.append('posti', posti);
      fData.append('salasana', salasana);
      axios.post(url, fData).then((response)=> {//tiedot php:lle ja vastaus
      if(response.data === "Kirjaudutaan sisään..."){//jos s-posti ja salasana oikein
        //setMsg(response.data);//ilmoitus kirjautumisesta
        setTimeout(function(){
        localStorage.setItem("kirjaudu", true);//tallennetaan paikalliseen tallennustilaan kirjautumisen s-posti
        localStorage.setItem('posti', posti);
        navigate("/Tervetuloa_opettaja");//ohjataan etusivulle
        }, 200);
      }else {//jos s-posti tai salasana väärin, error ilmoitus ja sivun uudelleen lataus
        setError(response.data);
        setTimeout(function(){
          window.location.reload();
        }, 2000);
      } 
   })
  };
  }
  return (
    <div className="vh-100 gradient-custom">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card">
              <div className="card-body p-5">
                <h3 className="otsikko text-center mb-2">OSAO</h3>
                <h3 className="kirjaudu text-center mb-4">Kirjaudu liikuntapäiväkirjaan</h3>
                <form>
                  <label className="errorLabel">{error}</label>
                  <label className="messageLabel">{msg}</label>
                  <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="posti">Kirjaudu opettajana<br></br><br></br>Sähköpostiosoite:</label>
                    <input type="email" className="form-control form-control-lg focus-ring" name="posti" id="posti" placeholder="malli@email.fi" value={posti} onChange={(e) => setPosti(e.target.value)} />
                    <label className="errorLabel">{emailError}</label>
                  </div>
                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="salasana">Salasana:</label>
                    <input type="password" className="form-control form-control-lg focus-ring" name="salasana" id="salasana" placeholder="Salasana..." value={salasana} onChange={(e) => setSalasana(e.target.value)} />
                    <label className="errorLabel">{passwordError}</label>
                  </div>
                  <div className="d-flex justify-content-center">
                  <input type="button" className="tallenna btn btn-primary py-1" name="submit" id="submit" value="Kirjaudu" onClick={handleSubmit}/>
                  </div>
                  <Link to="/SalasanaTilaus"><p className="tilaus text-center mt-4 mb-0">Unohtuiko <u>salasana?</u></p></Link>
                </form>
            </div>
            </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
 
export default Login;
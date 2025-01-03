import React, {  } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

  function Etusivu (){
  const navigate = useNavigate();
  function LogoutSubmit(){
    localStorage.setItem("kirjaudu", "");
    localStorage.setItem("loginStatus", "Olet kirjautunut ulos!")
    navigate("/Ulos");
  }
  const sposti= localStorage.getItem('posti');

  const [postiError, setPostiError] = useState('');
  const [etunimiError, setEtunimiError] = useState('');
  const [sukunimiError, setSukunimiError] = useState('');
  const [posti,setPosti] = useState('');
  const [etunimi,setEtunimi] = useState('');
  const [sukunimi,setSukunimi] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = () => {
    setPostiError('') 
    setEtunimiError('')
    setSukunimiError('')
    
    if(etunimi.length === 0){
      setEtunimiError('Syötä etunimi...')
      return
    }
    if(sukunimi.length === 0){
      setSukunimiError('Syötä sukunimi...')
      return
    }
    if(posti.length === 0){
      setPostiError('Syötä sähköpostiosoite!')
      return
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(posti)) {
      setPostiError('Anna oikea sähköpostiosoite?')
      return
    }
    else{
      const url = 'http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/lisaaOpp.php';
      let fData = new FormData();
      fData.append('posti', posti);
      fData.append('etunimi', etunimi);
      fData.append('sukunimi', sukunimi);
      axios.post(url, fData).then((response)=> {
      if(response.data === "Käyttäjä lisätty sovellukseen ja salasana lähetetty sähköpostiin!"){
        console.log(response.data);
        setMsg(response.data);
        setTimeout(function(){
          window.location.reload();
        }, 2000);
      } else {
        setError(response.data);
        console.log(response.data);
        setTimeout(function(){
          window.location.reload();
        }, 2000);
      } 
   })
  }
  }
  return(
    <>
      <div className="container-fluid px-5">
       <div className="row py-3">
       <div className="col-lg-4"><h3 className="logo text-start" href="#">OSAO</h3></div>
        <div className="col-lg-4"><h3 className="navbar-text text-center p-4 align-middle ">Liikuntapäiväkirja</h3></div>
        <div className="col-lg-4 text-end"><h3 className="navbar-user py-4 align-middle ">{sposti}
            <button className="valinta1 btn btn-primary py-1 mb-1 fw-bold ms-5" type="submit" onClick={LogoutSubmit}>
              Kirjaudu ulos
            </button></h3>
        </div>
      <div className="p-1 bg-dark w-100 rounded "></div>
      </div>
      </div>
      <div className="container-fluid px-5 mt-5 ">
          <div className="row">
            <div className="col-sm-12">
              <div className="d-flex justify-content-md-end mb-3">
              <Link to="/Etusivu" className="lisaa btn btn-primary py-1">Etusivulle</Link>    
              </div>  
            </div>  
          </div> 
      </div> 
      <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card">
              <div className="card-body p-5">
                <h3 className="kirjaudu text-center mb-4">Lisää käyttäjä sovellukseen</h3>
                <form>
                  <label className="errorLabel">{error}</label>
                  <label className="messageLabel">{msg}</label>
                  <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="etunimi">Etunimi:</label>
                    <input type="text" className="form-control form-control-lg focus-ring" name="etunimi" id="etunimi" placeholder="Malli" value={etunimi} onChange={(e) => setEtunimi(e.target.value)} />
                    <label className="errorLabel">{etunimiError}</label>
                  </div>
                  <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="sukunimi">Sukunimi:</label>
                    <input type="text" className="form-control form-control-lg focus-ring" name="sukunimi" id="sukunimi" placeholder="Oppilas" value={sukunimi} onChange={(e) => setSukunimi(e.target.value)} />
                    <label className="errorLabel">{sukunimiError}</label>
                  </div>
                  <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="posti">Sähköpostiosoite:</label>
                    <input type="email" className="form-control form-control-lg focus-ring" name="posti" id="posti" placeholder="malli@email.fi" value={posti} onChange={(e) => setPosti(e.target.value)} />
                    <label className="errorLabel">{postiError}</label>
                  </div>
                  <p className="text-center">Salasana luodaan automaattisesti ja lähetetään oppilaan sähköpostiin.</p>
                  <div className="d-flex justify-content-center">
                    
                  <input type="button" className="tallenna btn btn-primary mt-2 py-1" name="submit" id="submit" value="Tallenna" onClick={handleSubmit} />
                  
                  </div>
                </form>
            </div>
            </div>
            </div>
            </div>
        </div>                
      </>
);
  }
export default Etusivu;
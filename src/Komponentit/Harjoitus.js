import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React from "react";

function Harjoitus() {
    const navigate = useNavigate();
    function LogoutSubmit(){
        localStorage.setItem("kirjaudu", "");
        localStorage.setItem("loginStatus", "Olet kirjautunut ulos!")
        navigate("/Ulos");
    }
    const {ID}=   useParams();
    const [suoritus, setSuoritus] = useState([]);
    const [kuva, setKuva] = useState([]);
    const [kuva2, setKuva2] = useState([]);
    const [aika, setAika] = useState([]);
    useEffect(() => {
        axios.get('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/harjoitus.php/'+ID).then(function(response) {
          //console.log(response.data);
          setSuoritus(response.data);
      });
    }, [ID]); 
    useEffect(() => {
        axios.get('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/kuva.php/'+ID,).then(function(response) {
          //console.log(response.data);
          setKuva(response.data);
      });
    }, [ID]); 
    useEffect(() => {
        axios.get('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/kuva2.php/'+ID,).then(function(response) {
          //console.log(response.data);
          setKuva2(response.data);
      });
    }, [ID]); 
    function hylkaaSuoritus(){
        axios.put('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/harjoitus.php/'+ID).then(function(response){
          //console.log(response.data);
          window.location.reload();
      });
    }
    function acceptHarjoitus(){
        axios.put('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php//harkka.php/'+ID).then(function(response){
          //console.log(response.data);
          window.location.reload();
      });
    }
    function muutaAika(){
        const url = 'http://localhost:80/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/harkka.php/'+ID;
        let fData = new FormData();
        fData.append('aika', aika);
        axios.post(url, fData).then((response)=> {
          console.log(response.data);
          window.location.reload();
      });
    }
    const posti= localStorage.getItem('posti');
    return(
    <>
    <div className="container-fluid px-5">
       <div className="row py-3">
       <div className="col-lg-4"><h3 className="logo text-start" href="#">OSAO</h3></div>
        <div className="col-lg-4"><h3 className="navbar-text text-center p-4 align-middle ">Liikuntapäiväkirja</h3></div>
        <div className="col-lg-4 text-end"><h3 className="navbar-user py-4 align-middle ">{posti}
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
              <button onClick={() => navigate(-1)} className="lisaa btn btn-primary py-1">Takaisin</button>    
              </div> 
              <table className="table text-center mt-5">
                        <thead className="bg-light">
                           <tr>
                            <th>ID</th>
                            <th>Harjoitus</th>
                            <th>Päivämäärä</th>
                            <th>Käytetty aika</th>
                            <th>Kuljettu matka (km)</th>
                            <th>Keskinopeus (km/h)</th>
                            <th>Kulutus (kcal)</th>
                            </tr> 
                        </thead>
                        <tbody >
                            {suoritus.map((opp, key) =>
                                <tr key={key} >
                                <td >{opp.ID}</td>
                                <td >{opp.harjoitus}</td>
                                <td >{opp.Pvm}</td>
                                <td >{opp.Aika}</td>
                                <td >{opp.Matka}</td>
                                <td >{opp.Nopeus}</td>
                                <td >{opp.Kulutus}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>  
                    <table className="table text-center mt-5">
                        <thead className="bg-light">
                           <tr>
                            <th className="text-start">Kartta</th>
                            <th className="text-start">Kuva suorituksesta</th>
                            </tr> 
                        </thead>
                        <tbody>
                                <tr>
                                <td className="text-start" ><img className="kuva" src={`data:image/jpeg;charset=utf-8;base64,${kuva}`} alt="Sijainti kuva"/></td>
                                <td className="text-start"><img className="kuva" src={`data:image/jpeg;charset=utf-8;base64,${kuva2}`} alt="Oma kuva"/></td>  
                            </tr>
                        </tbody>
                    </table> 
                    <table className="table mt-5">
                        <thead className="bg-light">
                           <tr>
                            <th className="text-start">Kunnon osa-alue vastaus:</th>
                            <th className="text-start">Työkyky ja hyvinvointi vastaus:</th>
                            <th className="text-start">Linkki aktiviteettiin:</th>
                            <th className="text-center">Hyväksytty/hylätty:</th>
                            </tr> 
                        </thead>
                        <tbody >
                            {suoritus.map((opp, key) =>{
                            let vari = opp.Tila === 'Hyväksytty'? 'green': (opp.Tila === 'Hylätty' ? 'red': 'black');
                                return <tr key={key} >
                                <td className="text-start">{opp.Vastaus1}</td>
                                <td className="text-start">{opp.Vastaus2}</td>
                                <td className="text-start"><a rel="noreferrer" href={opp.Linkki} target="_blank">{opp.Linkki}</a></td>   
                                <td style={{color: vari}} className="text-center">{opp.Tila}</td>  
                            </tr>
                            })}
                        </tbody>
                    </table> 
              </div>  
          </div> 
<div className="d-flex justify-content-md-end mb-3">
    <button className="valinta3 btn btn-success fw-bold py-1 me-3 mt-2" onClick={acceptHarjoitus}>Hyväksy suoritus</button>
    <button className="valinta2 btn btn-danger fw-bold py-1 mt-2" onClick={hylkaaSuoritus}>Hylkää suoritus</button> 
</div>
<form className="mb-5">
    <label className="mb-3">Voit tarvittaessa muuttaa harjoitukseen käytettyä aikaa, syöttämällä uuden ajan muodossa 01:30:00 (tunnit:minuutit:sekunnit):</label> 
        <div className="row">
            <div className="col-auto">
            <label className="form-label me-1" htmlFor="ID">ID:</label>
            <input type="text" readOnly={true} className="form-control  focus-ring text-center" name="ID" id="ID" placeholder="ID-numero" value={ID}/>  
        </div>
        <div className="col-auto">
            <label className="form-label me-1" htmlFor="aika">Uusi aika:</label>
            <input type="text" className="form-control focus-ring text-center" name="aika" id="aika" placeholder="00:00:00" value={aika} onChange={(e) => setAika(e.target.value)} />     
        </div>
        <div className="col-auto">
            <input type="button" className="lisaa btn btn-primary" name="submit" id="submit" value="Tallenna" onClick={muutaAika} />
        </div>
        </div>
</form>      
</div>
</>
)}
export default Harjoitus;
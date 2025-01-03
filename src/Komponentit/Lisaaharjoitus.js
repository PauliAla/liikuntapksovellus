import axios from "axios";
import { useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React from "react";

function LisaaHarjoitus() {
  const [harjoitus, setHarjoitus] = useState('');
  const [paivamaara, setPaivamaara] = useState('');
  const [kaytettyAika, setKaytettyAika] = useState('');
  const [kuljettuMatka, setKuljettuMatka] = useState('');
  const [kunnonVastaus, setKunnonVastaus] = useState('');
  const [tyokykyVastaus, setTyokykyVastaus] = useState('');
  const [linkki, setLinkki] = useState('');
  const [viesti, setViesti] = useState('');
  const {OppilasID}=   useParams();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/lisaaHar2.php/'+OppilasID;
      let fData = new FormData();

      fData.append('harjoitus', harjoitus);
      fData.append('paivamaara', paivamaara);  
      fData.append('kaytettyAika', kaytettyAika);
      fData.append('kuljettuMatka', kuljettuMatka);
      fData.append('kunnonVastaus', kunnonVastaus);
      fData.append('tyokykyVastaus', tyokykyVastaus);
      fData.append('linkki', linkki);
   
      alert("Tietokanta on päivitetty");
      axios.post(url, fData).then((response)=> {
        console.log(response.data);
        window.location.reload();
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Lisää uusi harjoitus</h1>
      {viesti && <p>{viesti}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '400px' }}>
        <label>
          Harjoitus:
          <input
            type="text"
            value={harjoitus}
            onChange={(e) => setHarjoitus(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>

        <label>
          Päivämäärä:
          <input
            type="text"
            value={paivamaara}
            onChange={(e) => setPaivamaara(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>

        <label>
          Käytetty aika (tunnit:minuutit:sekunnit):
          <input
            type="text"
            step="1"
            value={kaytettyAika}
            onChange={(e) => setKaytettyAika(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>

        <label>
          Kuljettu matka (km):
          <input
            type="number"
            step="0.01"
            value={kuljettuMatka}
            onChange={(e) => setKuljettuMatka(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>

        <label>
          Kunnon osa-alue vastaus:
          <input
            type="text"
            value={kunnonVastaus}
            onChange={(e) => setKunnonVastaus(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>

        <label>
          Työkyky ja hyvinvointi vastaus:
          <input
            type="text"
            value={tyokykyVastaus}
            onChange={(e) => setTyokykyVastaus(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>

        <label>
          Linkki aktiviteettiin:
          <input
            type="url"
            value={linkki}
            onChange={(e) => setLinkki(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: '#FFF', border: 'none', cursor: 'pointer' }}>
          Tallenna
        </button>
      </form>
    </div>
  );
}

export default LisaaHarjoitus;

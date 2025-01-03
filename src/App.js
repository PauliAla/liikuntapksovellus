import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Suojaus from "./Komponentit/Suojaus";
import Etusivu from "./Komponentit/Etusivu";
import Kirjaudu from "./Komponentit/Kirjaudu_opettaja";
import SalasanaTilaus from "./Komponentit/SalasanaTilaus";
import Oppilas from "./Komponentit/Oppilas";
import LisaaOpp from "./Komponentit/LisaaOpp";
import Harjoitus from "./Komponentit/Harjoitus";
import Tervetuloa_oppilas from "./Komponentit/Tervetuloa_oppilas";
import Navigoi2 from "./Komponentit/Navigoi2";
import Ulos from "./Komponentit/Ulos";
import Kirjaudu_oppilas from "./Komponentit/Kirjaudu_oppilas";
import './App.css';
import Tervetuloa_opettaja from "./Komponentit/Tervetuloa_opettaja";
import Lisaaharjoitus from "./Komponentit/Lisaaharjoitus";
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Kirjaudu_oppilas/>} />
        <Route path="/Kirjaudu_opettaja" element={<Kirjaudu />} />
        <Route path="/Ulos" element={<Ulos/>} />
        <Route path="/SalasanaTilaus" element={<SalasanaTilaus/>} />
        <Route path="/Tervetuloa_opettaja" element={<Suojaus Component={Tervetuloa_opettaja}/>} />
        <Route path="/Tervetuloa_oppilas" element={<Suojaus Component={Tervetuloa_oppilas}/>} />
        <Route path="/Navigoi2" element={<Suojaus Component={Navigoi2}/>} />
        <Route path="/Lisaaharjoitus" element={<Lisaaharjoitus />} />
        <Route path="/Etusivu" element={<Suojaus Component={Etusivu} />} />
        <Route path="/Oppilas/:OppilasID" element={<Suojaus Component={Oppilas}/>} />
        <Route path="/LisaaOpp" element={<Suojaus Component={LisaaOpp}/>} />
        <Route path="/Harjoitus/:ID" element={<Suojaus Component={Harjoitus}/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
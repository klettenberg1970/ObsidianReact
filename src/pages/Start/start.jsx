import { useState } from 'react';
import { Obsidian } from '../../utils/obsidianClass.js'
import { ordnerId } from './getOrdnerID';

import StartButtons from './startButtons.jsx';
import ShowDateien from '../ShowDateien/alleDateien.jsx';
import ShowMd from '../ShowMD/showMd.jsx';
import NeueMd from '../ShowMD/neueMd.jsx';
import Filetransfer from '../Filetransfer/filetransfer.jsx';
import './start.css';

export default function Start() {

  const [ordnerInhalt, setOrdnerInhalt] = useState({});
  const [mdDatei, setMdDatei] = useState({});
  const [mdDateiSichtbar, setMdDateiSichtbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mdId, setMdId] = useState('');
  const [createNewDatei, SetCreateNewDatei] = useState(false);
  const [erfolgsmeldung, SetErfolgsmeldung] = useState(false);
  const [dateitransfer,SetDateitransfer] = useState(false)



  const handleOrdner = async (event) => {
    setLoading(true);
    setOrdnerInhalt({});
    const id = await ordnerId(event.target.textContent);
    const obsidianObjekt = new Obsidian();
    const data = await obsidianObjekt.getKompletteDateien(id);
    setOrdnerInhalt(data);
    setLoading(false);
  }

  const handleMdAuswahl = async (id) => {

    setMdDatei({});
    setMdId(id)
    setLoading(true);
    const obsidianObjekt = new Obsidian();
    const data = await obsidianObjekt.getMdByID(id);

    setMdDatei(data.singleDatei);
    setMdDateiSichtbar(true)
    setLoading(false);
  }
  const handleNew = () => {
    setOrdnerInhalt({});
    setMdDatei({});
    SetCreateNewDatei(true);
    setMdDateiSichtbar(true)
  }


 const handleCreateNewMd = async (name, text) => {
    const id = await ordnerId('Unsortiert');
    const obsidianObjekt = new Obsidian();
    const data = await obsidianObjekt.createNewMdDatei(id, name, text);

    if (data?.message) {
        SetErfolgsmeldung(true);
        setTimeout(() => handleCloseMdDatei(), 3000); 
    }
};

  const handleAktualisierung = async (text, id) => {
    console.log(text);

    const obsidianObjekt = new Obsidian();
    const data = await obsidianObjekt.updateMdDatei(text, id)
    if (data.message) {
      SetErfolgsmeldung(true)
      setTimeout(() => handleCloseMdDatei(), 3000); 
    }

  }

  const handleCloseMdDatei = () => {
    setOrdnerInhalt({})
    setMdDateiSichtbar(false);
    SetCreateNewDatei(false);
    SetErfolgsmeldung(false);
    setMdDatei(null);
  }

  const handleDateiTransfer = () =>{
        setOrdnerInhalt({});
        SetDateitransfer(true);
   
  }

 const handleTransferComplete = async (formData) => {
    SetDateitransfer(false);

    console.log('--- Elternkomponente: Upload startet ---');

    // 1. Die Werte aus dem FormData-Objekt holen
    const datei = formData.get('datei');
    const name = formData.get('customName');

    console.log('Datei:', datei);
    console.log('Name:', name);

    // 2. Die Variablen an deine Klasse übergeben
    const obsidianObjekt = new Obsidian();
    const data = await obsidianObjekt.fileTransfer(datei, name);
    if(data?.success){
        SetErfolgsmeldung(true);
        setTimeout(() => SetErfolgsmeldung(false), 3000); 
    }
    console.log(data);
};

  return (
    <div className="start-container">

      <img
        src="obsidianLogo.png"
        alt="Obsidian"
        onClick={() => {
          setOrdnerInhalt({});
          setMdDatei({});
        }}
      />

      <StartButtons
        handleOrdner={handleOrdner}
        onNew={handleNew}
        onDateiTransfer ={handleDateiTransfer} />

      {/* 📌 Loading-Anzeige NUR wenn loading = true */}
      {loading && (
        <div className='loading-container'> <h3>Daten werden geladen ...</h3></div>
      )}

      <ShowDateien
        ordnerInhalt={ordnerInhalt}
        onMdAuswahl={handleMdAuswahl}
      />

      <ShowMd mdInhalt={mdDatei}
        mdDateiSichtbar={mdDateiSichtbar}
        onClose={handleCloseMdDatei}
        mdId={mdId}
        onSave={handleAktualisierung}
        erfolgsmeldung={erfolgsmeldung} />

      {createNewDatei &&
        (<NeueMd
          mdDateiSichtbar={mdDateiSichtbar}
          onClose={handleCloseMdDatei}
          onCreate={handleCreateNewMd}
          erfolgsmeldung={erfolgsmeldung}
        />)}

{dateitransfer && (
        <Filetransfer onTransfer={handleTransferComplete} />
      )}

      {/* <pre>{JSON.stringify(ordnerInhalt, null, 2)}</pre> */}
    </div>
  );
}
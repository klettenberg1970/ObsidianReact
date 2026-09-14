
import './alleDateien.css';
import ShowMdDateien from './showMdDateien.jsx';

export default function ShowDateien({ ordnerInhalt, onMdAuswahl }) {
  //                                        ⬆️ Prop empfangen

  return (
    <div className="dateien-container">

      {/* Ordner mit Dateien */}
      {ordnerInhalt?.ordner && ordnerInhalt.ordner.length > 0 && (
        ordnerInhalt.ordner.map((folderName) => (
          <div key={folderName.id} className="dateien-card">
            <div className="titel">
              <p>{folderName.name}</p>
            </div>
            
            {/* 📌 onMdAuswahl wird weitergegeben */}
            <ShowMdDateien 
              mdDateien={folderName.inhalt} 
              onMdAuswahl={onMdAuswahl}  // ← Funktion weiterreichen
            />
          </div>
        ))
      )}

    {/* Einzelne Dateien (ohne Ordner) - NUR anzeigen wenn vorhanden */}
{ordnerInhalt?.dateien && ordnerInhalt.dateien.length > 0 && (
  <div className='single-dateien'>
    <div className="titel">
      <p>Einzelne Dateien</p>
    </div>
    {ordnerInhalt.dateien.map((datei) => (
      <div key={datei.id}>
        <button onClick={() => onMdAuswahl(datei.id, datei.name)}>
          {datei.name}
        </button>
      </div>
    ))}
  </div>
)}
    </div>
  )
}
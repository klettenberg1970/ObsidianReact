import './showMd.css'


export default function ShowMd({ mdInhalt, mdDateiSichtbar, onClose, onSave, mdId,erfolgsmeldung }) {
   
   

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let eingabeText = formData.get("Text");
       
        onSave(eingabeText,mdId)
    }

    return (
        <>
            {mdDateiSichtbar && (
                <div className="markdown-container">

                    <form onSubmit={handleSave}>
                        <div className="markdown-edit">
                            <button type="button" onClick={onClose}>Schließen</button>
                            
                            {erfolgsmeldung && (
                                <div> <p> Erfolgreich gespeichert</p></div>
                            )}
                            <button type="submit">Speichern</button>
                        </div>

                        <textarea 
                            name="Text" 
                            autoFocus 
                            spellCheck="true"
                            defaultValue={mdInhalt}
                        />
                    </form>
                </div>
            )}

            {/* <pre>{mdInhalt}</pre> */}

        </>
    )
}

import './showMd.css'

export default function NeueMd({ mdDateiSichtbar, onClose,onCreate,erfolgsmeldung }) {

    const handleCreate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let text = formData.get("Text");
        let name = formData.get('neuerName')
      onCreate(name,text)

    }

    return (
        <>
            {mdDateiSichtbar && (
                <div className="markdown-container">

                    <form onSubmit={handleCreate} >
                        <div className="markdown-edit">
                            <button type="button" onClick={onClose}>Schließen</button>

                            <input
                                type="text"
                                name="neuerName"
                                placeholder ="Name der Datei" />

                                  {erfolgsmeldung && (
                                <div> <p> Erfolgreich gespeichert</p></div>
                            )}
                            <button type="submit">Speichern</button>


                        </div>
                       
                        <textarea
                            name="Text"
                            autoFocus
                            spellCheck="true"

                        />
                    </form>
                </div>
            )}

            {/* <pre>{mdInhalt}</pre> */}

        </>
    )
}

import { useState, useEffect } from 'react';
import TextToMarkdown from './textToMarkdown.jsx';
import Erfolgsmeldung from '../../components/erfolgsmeldung';
import './showMd.css';

export default function ShowMd({ mdInhalt, mdDateiSichtbar, onClose, onSave, mdId, erfolgsmeldung }) {

    const [bearbeiten, setBearbeiten] = useState(false);

    useEffect(() => {
        if (mdDateiSichtbar) {
            setBearbeiten(false);
        }
    }, [mdDateiSichtbar]);

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let eingabeText = formData.get("Text");

        onSave(eingabeText, mdId)
    }

    return (
        <>
            {mdDateiSichtbar && (
                <div className="markdown-container">

                    <div className="markdown-edit">
                        <button type="button" onClick={onClose}>Schließen</button>

                        <button onClick={() => setBearbeiten(!bearbeiten)}>
                            {bearbeiten ? 'MD-Ansicht' : 'Bearbeiten'}
                        </button>

                        {erfolgsmeldung && (
                            <Erfolgsmeldung />
                        )}


                    </div>

                    {bearbeiten ? (

                        <form onSubmit={handleSave}>
                            <textarea
                                name="Text"
                                autoFocus
                                spellCheck="true"
                                defaultValue={mdInhalt}
                            />

                            <div className="saveButton"> <button
                                type="submit">Speichern</button></div>

                        </form>

                    ) : (
                        <TextToMarkdown text={mdInhalt} />
                    )}

                </div>
            )}
        </>
    )
}
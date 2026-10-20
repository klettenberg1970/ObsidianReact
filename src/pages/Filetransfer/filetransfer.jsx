import './filetransfer.css';

export default function Filetransfer({ onTransfer }) {

    const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onTransfer(formData);
};

    return (
        <div className="filetransfer-container">
            <h2>Dateiübertragung</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" name="datei" />
                <input type="text" name="customName" placeholder="neuer Dateiname" />
                <button type="submit">Hochladen</button>
            </form>
        </div>
    );
}
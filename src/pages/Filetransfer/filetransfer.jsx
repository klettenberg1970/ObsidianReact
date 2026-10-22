
 import './filetransfer.css';
    
    export default function Filetransfer({ onTransfer }) {
    
        const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            onTransfer(formData);
        };
    
        return (
            <div className="filetransfer-container">
                <form onSubmit={handleSubmit}>
                    <input type="file" name="datei" />
                    <hr />
                    <input type="text" name="customName" placeholder="Name" />
                    <hr />
                    <button type="submit">Hochladen</button>
                </form>
            </div>
        );
    }
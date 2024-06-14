import { PartnerData } from "../types";
import { useState } from 'react';
import React from 'react';

function PartnerForm() {
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [active, setActive] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id = Date.now().toString();
        const newPartnerData: PartnerData = {
            id,
            thumbnailUrl,
            name,
            description,
            active,
        };

        // Send a POST request to the backend server with the new partner data
        fetch('http://localhost:4000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPartnerData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="partner-form-box">
            <div className="partner-form">
                <div className="input-row">
                    <label className="form-label">
                        Partner name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label className="form-label">
                        Partner description:
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                </div>
                <div className="input-row">
                    <label className="form-label">
                        Partner Logo Source:
                        <input type="text" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />
                    </label>
                    <label className="form-label">
                        Active?:
                        <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
                    </label>
                </div>
                <div className="input-row">
                    <button style={{backgroundColor: '#72A74A'}}  type="submit">Submit </button>
                </div>
            </div>
        </form>
    )
}

export default PartnerForm;
import { PartnerData } from "../types";

interface PartnerTileProps {
    partnerData: PartnerData
    onDelete: (id: string) => void
}

function PartnerTile({ partnerData, onDelete }: PartnerTileProps) {

    return (
        <div className="partner-tile">
            <img className="partner-thumbnail" src={partnerData.thumbnailUrl} alt={partnerData.name}/>
            <p>{partnerData.name}</p>
            <p>{partnerData.active ? 'Active' : 'Inactive'}</p>
            <p>{partnerData.description}</p>
            <button style={{backgroundColor: 'red'}}  onClick={() => onDelete(partnerData.id)}>Delete</button>
        </div>
    )
}

export default PartnerTile;
import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';
import PartnerForm from './PartnerForm';
import { PartnerData } from '../types';

interface DashboardProps {

}


/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {
  const [partners, setPartners] = useState<PartnerData[]>([]);
    useEffect(() => {
        fetchPartners();
    }, [])
    const fetchPartners = () => {
        fetch('http://localhost:4000', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => setPartners(Object.values(data)))
            .catch((error) => console.error('Error fetching partners:', error));
    }


    const deletePartner = (id: string) => {
        fetch(`http://localhost:4000/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                fetchPartners(); // Fetch the partners again after one is deleted
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const deleteAllPartners = () => {
        fetch('http://localhost:4000/all', {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
               // setPartners([]); // Update the state to remove all partners
                fetchPartners();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

  return (
      <div id="main-content">
          <PartnerForm/>
          <button onClick={deleteAllPartners}>Delete All</button>
          <div id="main-partners-grid">
              {partners.map((partnerData, index) => (
                  <PartnerTile key={index} partnerData={partnerData} onDelete={deletePartner}/>
              ))}
          </div>
      </div>
  )
}


export default Dashboard;
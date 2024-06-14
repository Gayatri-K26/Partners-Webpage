import express, { Express, Request, Response } from 'express';
import { PartnerData, PartnerDetails } from './types';
import fs from 'fs';

const app: Express = express();
const port = 4000;

let partners: PartnerData = {

  /*"sftt": {
    "id": "1",
    "thumbnailUrl": "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
    "name": "Speak For The Trees",
    "description": "Speak for the Trees Boston aims to improve the size and health of the urban forest in the greater Boston area, with a focus on under-served and under-canopied neighborhoods. They work with volunteers to inventory (collect data) trees, plant trees, and educate those about trees. C4C has built a tree stewardship application for SFTT that allows users to participate in conserving Boston's urban forest. Across Boston, hundreds of trees have been adopted and cared for.",
    "active": true
  }*/
};

fs.readFile('partners.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
  } else {
    partners = JSON.parse(data);
  }
});

// Some partner data
/*const partners: PartnerData = {
  "sftt": {
    "thumbnailUrl": "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
    "name": "Speak For The Trees",
    "description": "Speak for the Trees Boston aims to improve the size and health of the urban forest in the greater Boston area, with a focus on under-served and under-canopied neighborhoods. They work with volunteers to inventory (collect data) trees, plant trees, and educate those about trees. C4C has built a tree stewardship application for SFTT that allows users to participate in conserving Boston's urban forest. Across Boston, hundreds of trees have been adopted and cared for.",
    "active": true
  }
}*/
/*
  APPLICATION MIDDLEWARE
  This section contains some server configuration.
  You will likely not need to change anything here to meet the requirements.
  (but you are welcome to, if you'd like)
*/

// Parse request bodies as JSON
app.use(express.json());
// Enable CORS for the frontend so it can call the backend
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
})

/*
  APPLICATION ROUTES
*/

app.get('/', (_req, res) => {
  res.status(200).send(partners);
})

/*app.post('/', (req: Request, res: Response) => {
  const newPartner: PartnerDetails = req.body;
  partners[newPartner.name] = newPartner;
  res.status(201).send(newPartner);
})*/

app.post('/', (req: Request, res: Response) => {
  const newPartner: PartnerDetails = req.body;
  partners[newPartner.name] = newPartner;

  fs.writeFile('partners.json', JSON.stringify(partners), (err) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).send({ error: 'Failed to write to file.' });
    } else {
      res.status(201).send(newPartner);
    }
  });
});
/*app.delete('/all', (res: Response) => {
  partners = {};
  partners: {};
  res.status(200).json({ message: 'All partners deleted' });
});*/
/*
app.delete('/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  if (id in partners) {
    delete partners[id];
    res.status(200).send({ message: 'Partner deleted successfully.' });
  } else {
    res.status(404).send({ error: 'Partner not found.' });
  }
});
*/
app.delete('/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  fs.readFile('partners.json', 'utf8', (readErr, data) => {
    if (readErr) {
      console.error('Error:', readErr);
      res.status(500).send({ error: 'Failed to read from file.' });
    }  else {
      const partners: PartnerData = JSON.parse(data);
      let partnerKey = null;

      // Find the key of the partner with the matching id
      for (const key in partners) {
        if (partners[key].id === id) {
          partnerKey = key;
          break;
        }
      }

      if (partnerKey) {
        delete partners[partnerKey];

        fs.writeFile('partners.json', JSON.stringify(partners, null, 2), (writeErr) => {
          if (writeErr) {
            console.error('Error:', writeErr);
            res.status(500).send({ error: 'Failed to write to file.' });
          } else {
            res.status(200).send({ message: 'Partner deleted successfully.' });
          }
        });
      } else {
        res.status(404).send({ error: 'Partner not found.' });
      }
    }
  });
});

// Start the backend
app.listen(port, () => {
  console.log(`Express server starting on port ${port}!`);
})
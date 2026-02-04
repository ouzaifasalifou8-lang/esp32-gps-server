// Variable temporaire pour stocker la dernière trame reçue
let lastGpsData = "Pas de données reçues";

export default function handler(req, res) {
  // Si l'ESP32 envoie des données (méthode POST)
  if (req.method === 'POST') {
    const { trame } = req.body;
    if (trame) {
      lastGpsData = trame; // On stocke la trame $GPRMC
      console.log("Reçu de l'ESP32:", trame);
      return res.status(200).send("Position mise à jour");
    }
    return res.status(400).send("Trame manquante");
  } 
  
  // Si l'App Android demande les données (méthode GET)
  else {
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(lastGpsData);
  }
}

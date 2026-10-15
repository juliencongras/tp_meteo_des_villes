// Les données de nos 3 villes : un tableau d'objets (nom + coordonnées GPS)
const villes = [
  { nom: "Marseille", latitude: 43.2965, longitude: 5.3698 },
  { nom: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { nom: "Lyon", latitude: 45.764, longitude: 4.8357 },
];

const liste = document.getElementById("liste-meteo");

// Récupère et affiche la météo actuelle d'UNE ville
async function chargerMeteoVille(ville) {
    const li = document.createElement("li");
    li.textContent = "Chargement..."
    liste.appendChild(li);
    try{
        // 1. On appelle l'API avec les coordonnées de la ville
        const reponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${ville.latitude}&longitude=${ville.longitude}&current=temperature_2m,wind_speed_10m`
        );

        // 2. On traduit la réponse en objet JavaScript
        const donnees = await reponse.json();

        // 3. On récupère la température actuelle et on l'affiche dans la liste
        const temperature = Math.round(donnees.current.temperature_2m);
        const vent = Math.round(donnees.current.wind_speed_10m);

        li.textContent = `${ville.nom} : ${temperature} °C, vent ${vent} km/h`;
    }
    catch (error) {
        //What happens in case of an error
        if(!donnees.ok){
            throw new Error("Erreur d'appel de l'API : ", error.message);
        }
        console.log("Erreur d'appel de l'API : ", error.message);
    }
}

// Pour chaque ville, on appelle l'API (une ville après l'autre)
async function chargerToutesLesVilles() {
    for (const ville of villes) {
        await chargerMeteoVille(ville);
    }
}

chargerToutesLesVilles();
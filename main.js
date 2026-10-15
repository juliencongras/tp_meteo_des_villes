// les données de nos villes, sous forme de tableau d'objets (nom + coordonnées GPS)
const villes = [
  { nom: "Marseille", latitude: 43.2965, longitude: 5.3698 },
  { nom: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { nom: "Lyon", latitude: 45.764, longitude: 4.8357 },

  // POUR TESTER L'ERREUR : décommente la ligne suivante
  // (latitude impossible : l'API répond une erreur 400)
  // { nom: "Ville test", latitude: 999, longitude: 0 },
];

const liste = document.getElementById("liste-meteo");
const chargement = document.getElementById("chargement");

// Récupère et affiche la météo d'UNE ville (les 3 étapes du cours, protégées par try...catch)
async function chargerMeteoVille(ville) {
  const li = document.createElement("li");
  liste.appendChild(li);

  try {
    // Appeler & attendre : l'API Open-Meteo avec les coordonnées de la ville
    const url =
      "https://api.open-meteo.com/v1/forecast" +
      `?latitude=${ville.latitude}&longitude=${ville.longitude}` +
      "&current=temperature_2m,wind_speed_10m";

    const reponse = await fetch(url);

    // Vérifier la réponse : si reponse.ok est false (400, 404, 500...), on lève une erreur avec le statut HTTP
    if (!reponse.ok) {
      throw new Error(`Erreur HTTP : ${reponse.status}`);
    }

    // Traduire la réponse en objet JavaScript
    const donnees = await reponse.json();

    // Utiliser les données : température et vent actuels
    const temperature = Math.round(donnees.current.temperature_2m);
    const vent = Math.round(donnees.current.wind_speed_10m);
    const uniteTemperature = donnees.current_units.temperature_2m; // "°C"
    const uniteVent = donnees.current_units.wind_speed_10m; // "km/h"

    li.textContent = `${ville.nom} : ${temperature} ${uniteTemperature}, vent ${vent} ${uniteVent}`;
  } catch (erreur) {
    // Message à l'écran pour CETTE ville seulement : les autres ne sont pas bloquées
    li.textContent = `${ville.nom} : météo indisponible`;
    li.classList.add("erreur");

    // Détail technique dans la console (avec le statut HTTP quand il y en a un)
    console.error(`Erreur API pour ${ville.nom} :`, erreur.message);
  }
}

// Démarrer le chargement pour toutes les villes
(async () => {
  chargement.textContent = "Chargement de la météo...";

  for (const ville of villes) {
    await chargerMeteoVille(ville);
  }

  chargement.textContent = "Météo mise à jour.";
})();


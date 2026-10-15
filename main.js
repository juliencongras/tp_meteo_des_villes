//Villes : Paris, Marseille, Lyon
/*
Coordonnées : 
Paris : 48.8566, 2.3522
Marseille : 43.296, 5.37
Lyon : 45.75, 4.85
*/

//"https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m" 
//"https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m"

//link to the API
const apiEndpoint = "https://api.open-meteo.com/v1/forecast";

//Test api
const testAPI = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"

//Test api Paris
const parisTest = "https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m"

async function callApi(){
    //Chargement des données peut être ici? A mettre pour chaque élémént en train de charger
    //elementEnTrainDeCharger.innerText = "Chargement..."

    try {
        //API code
        const response = await fetch(testAPI);
        const data = await response.json();
        console.log(data.current);
        
    }catch (error) {
        //What happens in case of an error
        if(!data.ok){
            throw new Error("Erreur d'appel de l'API : ", error.message);
        }
        console.log("Erreur d'appel de l'API : ", error.message);
    }
}

callApi();
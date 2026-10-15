//Villes : Paris, Marseille, Lyon
/*
Coordonnées : 
Paris : 48.8566, 2.3522
Marseille : 43.296, 5.37
Lyon : 45.75, 4.85
*/

//"https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m"

//link to the API
const apiEndpoint = "https://api.open-meteo.com/v1/forecast";

async function callApi(){
    try {
        //API code
    }catch (error) {
        //What happens in case of an error
        if(!apiEndpoint.ok){
            throw new Error("Erreur d'appel de l'API : ", error.message);
        }
        console.log("Erreur d'appel de l'API : ", error.message);
    }
}
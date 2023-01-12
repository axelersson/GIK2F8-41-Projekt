
//Skapandet av en apiklass. Den kommer ta emot olika förfrågningar från script.js
class Api {

    //Medlemsvariabeln url som lagrar grund-urlen till servern
    url = '';

    //När man vill skapa en instans av api-klassen skickas urlen med som parameter.
    constructor(url){
        //Här deklareras att inparametern kommer uppdatera apiklassens url-variabel.
        this.url = url;
    }


    //Skapandet av de CRUD-metoder som kommer att användas.
    
    //Nedan skapas crudmetoden create
    create(data){
        //Data ska endast skickas via httprequests i stringformat. Därför görs en kovertering nedan.
        const JSONData = JSON.stringify(data);

        console.log(`Sending ${JSONData} to ${this.url}`)

        //Här skapas requestobjektet för create/postmetoden
        const request = new Request(this.url, {
            method: 'POST',
            body: JSONData,
            headers: {
                'content-type': 'application/json'
            }
        });

        return (
            fetch(request)
            .then((result) => result.json())
            .then((data) => data)
            .catch((err) => console.log(err))
        );
    }
    //getAllmetod, vi behöver ingen funktionalitet för att hämta enstaka objekt
    getAll() {
        return fetch(this.url)
        .then((result) => result.json())
        .then((data) => data)
        .catch((err) => console.log(err));
    }
    //Varje vara******** UPPDATERAS OM ÄNDRING!!**** tilldelas ett unikt id i backend och därför kan vi ta bort baserat på detta.
    remove(id) {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE'
          })
            .then((result) => result)
            .catch((err) => console.log(err));
        }
}
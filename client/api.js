
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

}
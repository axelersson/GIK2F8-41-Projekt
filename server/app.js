//Importerar express
const express = require('express');
//Skapar ett expressobjekt
const app = express();
//Säger åt expressobjektet att lyssna på port 5100
app.listen(5100);
//Filesystem blir nu promises
const fs = require('fs/promises');
//const { PassThrough } = require('stream');

app
  //Format som servern kan ta emot och skicka
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  
  /* Man kan också ange vad som ska hända övergripande 
  med samtliga förfrågningar. Alla förfrågningar kommer 
  att gå genom nedanstående kod först, innan den behandlas vidare. */
  .use((req, res, next) => {
    //Tilldelar headers till response-objekt
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    /* För att göra så att servern ska kunna behandla förfrågan vidare, använder man funktionen next() som kommer som tredje parameter till denna callbackfunktion.  */
    next();
  });

//Getanrop 
app.get('/', async (req, res) => {
    console.log('here')
    const parseFile = await fs.readFile('varor.json');
    console.log(JSON.parse(parseFile))
    res.send(parseFile)
});

app.post('/', async(req, res) => {
    try {
        //console.log('hej')

        //Request som skickas från frontend ska skickas i JSON-format så att det kan läggas till här bland de andra varorna.
        const nyVara = req.body;
        //console.log(inkommenVara)
        //const  = JSON.parse(inkommenVara)
        //console.log(nyVara + 'här är nyVara')
        //Sparar ner samtliga varor i varor.json
        const parseFile = await fs.readFile('varor.json');
        //Konverterar varorna till rätt format.
        const parsedVaror = JSON.parse(parseFile);

        //Om inga varor finns inlagda kommer den nyregistrerade varans id sättas till 1
        if (!parsedVaror){
            nyVara.id = 1
        }
        //Om varor finns registrerade kommer dessa loopas igenom och id kommer tilldelas i succesiv ordning 
        else {
          for (let index = 0; index < parsedVaror.length; index++) {
            //console.log(parsedVaror[index].id);
            if (parsedVaror[index].id != index+1){
              parsedVaror[index].id = (index + 1)
            }
            
          }
        }
        //console.log(parsedVaror);
        //Tilldelar ett nytt id till nya JSON-objektet, denna bygger vidare på sorteringen som gjorts tidigare
        const laggaInNyVara = { id:(parsedVaror.length + 1), ...nyVara };
        // Stort frågetecken
        const newList = parsedVaror ? [...parsedVaror, laggaInNyVara] : [laggaInNyVara];

        await fs.writeFile('./varor.json', JSON.stringify(newList));
        res.send(laggaInNyVara);
   
    }   
    
    catch (error) {
        res.status(500).send({ error });
    }
})
//Funktion för att ta bort varor. Använder express deletemetod.
app.delete('/varor/:id', async (req, res) =>{
  try {
  const parseFile = await fs.readFile('varor.json');
  const parsedVaror = JSON.parse(parseFile);


  //console.log(parsedVaror)
  const id = req.params.id;

  //Samtliga objekt i JSONfilen som inte har det id:t som försöks tas bort kommer läggas in i en ny variabel.
  const uppdateradeVaror = parsedVaror.filter((parsedVaror) => {
    return parsedVaror.id != id;
  });
  
  console.log(uppdateradeVaror);
  //En loop vilken kommer ifrån postanropet kommer lägga JSONobjekten i ordning.
  for (let index = 0; index < uppdateradeVaror.length; index++) {
    //console.log(parsedVaror[index].id);
    if (uppdateradeVaror[index].id != index+1){
      uppdateradeVaror[index].id = (index + 1)
    }
    
  }
  //console.log(uppdateradeVaror);
  //JSONlistan uppdateras i backend.
  await fs.writeFile('./varor.json', JSON.stringify(uppdateradeVaror));
        res.send(uppdateradeVaror);
  
    
  } 
  catch (error) {
    
  }
});
/*function idCheck(){
  PassThrough
}*/
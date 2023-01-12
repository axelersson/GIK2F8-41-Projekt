//Vi behöver börja bygga upp en scriptfil där vi har eventlistnare till form, och sätt att läsa av om fält är ifyllda.
//Kanske någon flik som gör att man kan välja mellan att se formuläret och varorna som finns.
 

//GÖR DESSA SIST!
//Eventlyssnare för validering av fälten i formulär
//Validering för namn
//formLaggaInVaror.formArticleName.addEventListener('keyup', (e) => validateName(e.target));
//formLaggaInVaror.formArticleName.addEventListener('blur', (e) => validateName(e.target));
//Validering för pris
//formLaggaInVaror.formPrice.addEventListener('input', (e) => validateField(e.target));
//formLaggaInVaror.formPrice.addEventListener('blur', (e) => validateField(e.target));
//Validering för producent
//formLaggaInVaror.formProducer.addEventListener('input', (e) => validateField(e.target));
//formLaggaInVaror.formProducer.addEventListener('blur', (e) => validateField(e.target));
//Validering för bildlänk
//formLaggaInVaror.formImageLink.addEventListener('blur', (e) => validateField(e.target));
//formLaggaInVaror.formImageLink.addEventListener('blur', (e) => validateField(e.target));
//Eventlyssnare till submitknappen på formuläret
//formLaggaInVaror.addEventListener('submit', formSubmit);


const todoListElement = document.getElementById('todoList');

let formArticleNameValid = true;
let formPriceValid = true;
let formProducerValid = true;
let formImageLinkValid = true;
//let tasksToChange;

const api = new Api('http://localhost:5100/varor');

//HÄR SKAPAR VI ALLA VALIDERINGSFUNKTIONER!!

//Funktion för att spara fomuläret
function pressedSubmit(e) {
    //Gör så att sidan inte laddas om när man trycker på submitknappen.
    e.preventDefault();

    //LÄGG IN SAMTLIGA VALIDERINGSFUNKTIONER HÄR!!!!!!

    saveGoods();
}

function saveGoods() {
    //Denna konverterar input i formuläret till rätt JSONformat för att kunna skickas och
    //packas upp på rätt sätt i backend.
    const goods ={
        namn: formLaggaInVaror.formArticleName,
        pris: formLaggaInVaror.formPrice,
        Tillverkare: formLaggaInVaror.formProducer,
        Bild: formLaggaInVaror.formImageLink
    };
}
//Denna använder apiets createmetod
api.create(goods).then((goods) => {
    //Ser till att vi har något att hämta
    if (goods){
        //Visar alla varor
        showGoods();
    }
});

//Funktion som visar alla varor.
function showGoods(){
    console.log(hejsan);

}
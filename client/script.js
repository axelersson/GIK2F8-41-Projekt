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
formLaggaInVaror.addEventListener('submit', pressedSubmit);


const elementAfVaruLista = document.getElementById('varuLista');

let formArticleNameValid = true;
let formPriceValid = true;
let formProducerValid = true;
let formImageLinkValid = true;

const api = new Api('http://localhost:5100/');

//HÄR SKAPAR VI ALLA VALIDERINGSFUNKTIONER!!

//Funktion för att spara fomuläret
function pressedSubmit(e) {
    //Gör så att sidan inte laddas om när man trycker på submitknappen.
    e.preventDefault();

    //LÄGG IN SAMTLIGA VALIDERINGSFUNKTIONER HÄR!!!!!!

    saveGoods();
    console.log('nu körs saveGoods')
}

function saveGoods() {
    //Denna konverterar input i formuläret till rätt JSONformat för att kunna skickas och
    //packas upp på rätt sätt i backend.
    //preventDefault();
    const goods ={
        namn: formLaggaInVaror.formArticleName.value,
        pris: formLaggaInVaror.formPrice.value,
        Tillverkare: formLaggaInVaror.formProducer.value,
        Bild: formLaggaInVaror.formImageLink.value
    };

    //tilldelaText = document.getElementById('resRutan');
    //console.log(tilldelaText + 'här är tilldelatext')
    //tilldelaText.insertAdjacentHTML('beforeend', 'goods')

    //Denna använder apiets createmetod
    api.create(goods).then((goods) => {
    console.log('hejsan')
    console.log(goods)

    //Ser till att vi har något att hämta
    if (goods){
        //Visar alla varor
        console.log('hejsan')
        showGoodsInventory();
    }
    
    });

    //innerHTML = JSON.stringify(goods);
    
}
//Funktion som visar alla varor.
function showGoodsInventory(){

    console.log('rendering');
    api.getAll().then((goods) => {

        elementAfVaruLista.innerHTML = '';
        goods.forEach((goods) => { 
            //console.log(goods)
            //hamtadGoods = goods
            //parsedGoods = JSON.parse(hamtadGoods)
            //console.log(parsedGoods);
            console.log(goods + 'här är goods')
            elementAfVaruLista.insertAdjacentHTML('beforeend', showGoods(goods));
        });
    });
}

function showGoods({id, namn, pris, Tillverkare, Bild}){
    elementAfVaruLista.innerHTML = 'hejhej123';
    console.log('hej från showGoods')
    let html = `
    <li id="elementAfVaruLista${id}` 
    html += `<h3>hejsan${id, namn, pris, Tillverkare, Bild}</h3>
      </li>;`

      return html;
  
}
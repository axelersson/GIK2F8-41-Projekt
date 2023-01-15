//Vi behöver börja bygga upp en scriptfil där vi har eventlistnare till form, och sätt att läsa av om fält är ifyllda.
//Kanske någon flik som gör att man kan välja mellan att se formuläret och varorna som finns.
 

//GÖR DESSA SIST!
//Eventlyssnare för validering av fälten i formulär
//Variabler till validering
let formArticleNameValid = true;
let formPriceValid = true;
let formProducerValid = true;
let formImageLinkValid = true;

//Felmeddelandet till formulär
const varningsParagrafNamn = document.getElementById('varningsParagrafNamn')
const varningsParagrafPris = document.getElementById('varningsParagrafPris')
const varningsParagrafProducent = document.getElementById('varningsParagrafProducent')
const varningsParagrafForm = document.getElementById('varningsParagrafForm')

//Validering för namn
formLaggaInVaror.formArticleName.addEventListener('input', (e) => validateName(e.target));
formLaggaInVaror.formArticleName.addEventListener('blur', (e) => validateName(e.target));

//Validering för pris
formLaggaInVaror.formPrice.addEventListener('input', (e) => validatePris(e.target));
formLaggaInVaror.formPrice.addEventListener('blur', (e) => validatePris(e.target));

//Validering för producent
formLaggaInVaror.formProducer.addEventListener('input', (e) => validateProducer(e.target));
formLaggaInVaror.formProducer.addEventListener('blur', (e) => validateProducer(e.target));

//Validering för bildlänk
//formLaggaInVaror.formImageLink.addEventListener('blur', (e) => validateField(e.target));
//formLaggaInVaror.formImageLink.addEventListener('blur', (e) => validateField(e.target));

//Eventlyssnare till submitknappen på formuläret
formLaggaInVaror.addEventListener('submit', pressedSubmit, validatePris(formLaggaInVaror.formPrice));

const elementAfVaruLista = document.getElementById('varuLista');
const inlagdVaraRuta = document.getElementById('inlagdVaraRuta');
const inlagdVaraHeader = document.getElementById('inlagdVaraHeader');

const formContainer = document.getElementById('formContainer');

const div1 = document.getElementById('clickableDiv1');
const div2 = document.getElementById('clickableDiv2');

div1.addEventListener('click', clickedDiv1);
div2.addEventListener('click', clickedDiv2);

function clickedDiv1 (){
    //Visa rätt sektioner
    formContainer.classList.add('visible')
    formContainer.classList.remove('hidden')
    elementAfVaruLista.classList.add('hidden')
    
    //Utseende för flikar
    div1.classList.add("bg-slate-200");
    div1.classList.remove("bg-zinc-400");
    div2.classList.add("bg-zinc-400");
    div2.classList.remove("bg-slate-200");

     //Rätt hovereffekter
    div1.classList.remove("hover:bg-slate-600");
    div2.classList.add("hover:bg-slate-600");
}
function clickedDiv2 (){
    //Visa rätt sektioner
    inlagdVaraRuta.classList.add('hidden');
    formContainer.classList.add('hidden');
    elementAfVaruLista.classList.remove('hidden')
    inlagdVaraRuta.classList.remove('visible');
    
    
    //Rätt hovereffekter
    div1.classList.add("hover:bg-slate-600");
    div2.classList.remove("hover:bg-slate-600");

    //Utseende för flikar
    div1.classList.remove("bg-slate-200");
    div1.classList.add("bg-zinc-400");
    div2.classList.remove("bg-zinc-400");
    div2.classList.add("bg-slate-200");

    showGoodsInventory()
}

const api = new Api('http://localhost:5100');

//HÄR SKAPAR VI ALLA VALIDERINGSFUNKTIONER!!

function validateName(field){
    const namn = field;
    if (namn.value.length < 3){     
        formArticleNameValid = false;   
        varningsParagrafNamn.classList.add('visible')
        varningsParagrafNamn.classList.remove('hidden')
    }
    if (namn.value.length > 2){   
        formArticleNameValid = true;        
        varningsParagrafNamn.classList.add('hidden')
        varningsParagrafNamn.classList.remove('visible')
    }
    if (namn.value.length > 50){
        formArticleNameValid = false;        
        varningsParagrafNamn.classList.add('visible')
        varningsParagrafNamn.classList.remove('hidden')
    }
    

}
function validatePris(field){
    const pris = field;
    const parsePris = pris.value;
    console.log(parsePris)
    if (parsePris.length == 0){   
        formPriceValid = false;      
        varningsParagrafPris.classList.add('visible')
        varningsParagrafPris.classList.remove('hidden')
    }
    if (parsePris.length >= 1){       
        formPriceValid = true; 
        varningsParagrafPris.classList.add('hidden')
        varningsParagrafPris.classList.remove('visible')
    }
    if (parsePris.length > 14){ 
        formPriceValid = false;          
        varningsParagrafPris.classList.add('visible')
        varningsParagrafPris.classList.remove('hidden')
    }
}
function validateProducer(field){
    //varningsParagrafProducent
    const producer = field;
    const parseProducer = producer.value;
    if (parseProducer.length == 0){   
        formProducerValid = false;      
        varningsParagrafProducent.classList.add('visible')
        varningsParagrafProducent.classList.remove('hidden')
    }
    if (parseProducer.length >= 1){       
        formProducerValid = true; 
        varningsParagrafProducent.classList.add('hidden')
        varningsParagrafProducent.classList.remove('visible')
    }
    if (parseProducer.length > 50){ 
        formProducerValid = false;          
        varningsParagrafProducent.classList.add('visible')
        varningsParagrafProducent.classList.remove('hidden')
    }

}

//Funktion för att spara fomuläret
function pressedSubmit(e) {
    //Gör så att sidan inte laddas om när man trycker på submitknappen.
    e.preventDefault();

    //LÄGG IN SAMTLIGA VALIDERINGSFUNKTIONER HÄR!!!!!!
    if (formArticleNameValid && formPriceValid && formProducerValid){
        console.log('allt godkänt')
        varningsParagrafForm.classList.add('hidden')
        varningsParagrafForm.classList.remove('visible')
        saveGoods();
    }
    else {
        varningsParagrafForm.classList.add('visible')
        varningsParagrafForm.classList.remove('hidden')
    }
    
    console.log('nu körs saveGoods')
}

function saveGoods() {
    //Denna konverterar input i formuläret till rätt JSONformat för att kunna skickas och
    //packas upp på rätt sätt i backend.
    //preventDefault();
    const goods ={
        namn: formLaggaInVaror.formArticleName.value,
        pris: (priset = new Intl.NumberFormat('sv-US', { style: 'currency', currency: 'SEK' }).format(formLaggaInVaror.formPrice.value)),
        Tillverkare: formLaggaInVaror.formProducer.value,
        Bild: formLaggaInVaror.formImageLink.value
    };
    //Denna använder apiets createmetod
    api.create(goods).then((result) => {
    inlagdVaraRuta.classList.add('visible');
    inlagdVaraRuta.classList.remove('hidden');
    inlagdVaraRuta.innerHTML = '';
    inlagdVaraRuta.insertAdjacentHTML('beforeend', showAddedGoods(result));
    formLaggaInVaror.formArticleName.value = '';
    formLaggaInVaror.formPrice.value = '';
    formLaggaInVaror.formProducer.value = '';
    formLaggaInVaror.formImageLink.value = '';
    inlagdVaraHeader.classList.remove('hidden');
    inlagdVaraHeader.classList.add('visible');
    validatePris(formLaggaInVaror.formPrice)

    });
    
}
//Funktion som visar alla varor.
function showGoodsInventory() {
    api.getAll().then((goods) => {

        elementAfVaruLista.innerHTML = '';
        goods.forEach((goods) => { 

            elementAfVaruLista.insertAdjacentHTML('beforeend', showGoods(goods));
            inlagdVaraHeader.classList.remove('visible');
            inlagdVaraHeader.classList.add('hidden');

        });
    });
}
function showAddedGoods({id, namn, pris, Tillverkare, Bild}){
    let html =`<li id="elementAfVaruLista${id}" class="list-none h-fit">`; 
    html += `<h3 class="font-semibold text-2xl">Namn: ${namn}</h3>`;
    html += `<p class="font-medium">Tillverkare: ${Tillverkare}</p>`
    html += `<p class="font-medium w-fit">Pris: <span class="font-medium text-red-600 bg-yellow-300">${pris}</span></p>`
    html += `<p>Bild:  </p>`
    html += `<img src="${Bild}" class="max-h-40">`  
    
    html += `</li>`;

    return html;
  
}

function showGoods({id, namn, pris, Tillverkare, Bild}){
    let html =`<li id="elementAfVaruLista${id}" class="list-none rounded-md bg-gradient-to-b from-zinc-300 to-white">`; 
    html += `<h3 class="font-semibold text-2xl">Namn: ${namn}</h3>`;
    html += `<p class="font-medium">Tillverkare: ${Tillverkare}</p>`
    html += `<p class="font-medium w-fit">Pris: <span class="font-medium text-red-600 bg-yellow-300">${pris}</span></p>`
    html += `<p>Bild:  </p>`
    html += `<img src="${Bild}" class="max-h-40">`
    html += `<button onclick="deleteVara(${id})" class="inline-block bg-zinc-400 text-xs hover:bg-zinc-100 border border-white px-3 py-1 rounded-md ml-2">Ta bort</button>`    
    
    html += `</li>`;

    return html;
  
}

function deleteVara(id) {
    api.remove(id).then(() => {
        showGoodsInventory()
    });
}

//Vi behöver börja bygga upp en scriptfil där vi har eventlistnare till form, och sätt att läsa av om fält är ifyllda.
//Kanske någon flik som gör att man kan välja mellan att se formuläret och varorna som finns.
 
//Eventlyssnare för validering av fälten i formulär
//Validering för namn
formLaggaInVaror.formArticleName.addEventListener('keyup', (e) => validateName(e.target));
formLaggaInVaror.formArticleName.addEventListener('blur', (e) => validateName(e.target));
//Validering för pris
formLaggaInVaror.formPrice.addEventListener('input', (e) => validateField(e.target));
formLaggaInVaror.formPrice.addEventListener('blur', (e) => validateField(e.target));
//Validering för producent
formLaggaInVaror.formProducer.addEventListener('input', (e) => validateField(e.target));
formLaggaInVaror.formProducer.addEventListener('blur', (e) => validateField(e.target));
//Validering för bildlänk
formLaggaInVaror.formImageLink.addEventListener('blur', (e) => validateField(e.target));
formLaggaInVaror.formImageLink.addEventListener('blur', (e) => validateField(e.target));
//Eventlyssnare till submitknappen på formuläret
formLaggaInVaror.addEventListener('submit', formSubmit);


const todoListElement = document.getElementById('todoList');

let titleValid = true;
let descriptionValid = true;
let dueDateValid = true;
let tasksToChange;

const api = new Api('http://localhost:5100/varor');
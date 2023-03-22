/**
 * DEFINISCO COSTANTI NECESSARIE
 */

const kmPrice = 1; // Costo al km

const childrenDiscount = 0.5; // 50% di sconto per i minori di 12 anni
const childrenAgeMaxLimit = 12; // soglia di età massima per i minori

const seniorDiscount = 0.3; // 30% di sconto per i maggiori di 65 anni
const seniorAgeMinLimit = 65; // soglia di età minima per i senior

const wrapper = document.getElementById('wrapper'); // "wrapper" è l'elemento dove andrò ad inserire i box HTML

const passengersNames = []; // array dove inserire i nomi dei passeggeri
const passengersAges = []; // array dove inserire le età dei passeggeri

a = document.createElement("div");
a.innerHTML="ciao";
wrapper.append(a);


document.getElementById("play").addEventListener("click", function() {

    /**
     * RICHIESTA DATI UTENTE
     */

    // Chiedo il numero di passeggeri
    const passengersNumbers = getPositiveNumber("Indica il numero di passeggeri.");

    // Chiedo i dati di ogni passeggero 
    for (let i=0; i < passengersNumbers; i++) {
        let name;
        do {
            name = prompt(`Indica il nome del passeggero ${i+1}. (almeno 3 caratteri)`);
        }while(name.length < 3);

        const age = getPositiveNumber(`Inserici l'età del passeggero ${i+1}`);
        
        passengersNames[i] = name;
        passengersAges[i] = age;
    }

    // Chiedo i KM totali
    const km = getPositiveNumber("Inserisci il numero di km.");

    /**
     * Calcolo il prezzo di ogni singolo passeggero, costruisco i box contenente i dati per ogni passeggero ed infine calcolo il prezzo totale
     */
    let totPrice = 0;
    for (let i = 0; i < passengersNumbers; i++) {
        
        // Calcolo il prezzo del singolo passeggero
        let discount = 0;
        if (passengersAges[i] <= childrenAgeMaxLimit) {
            discount = kmPrice * km * childrenDiscount;
        } else if (passengersAges[i] >= seniorAgeMinLimit) {
            discount = kmPrice * km * seniorDiscount;
        }
        const price = (km * kmPrice) - discount;
        
        // Sommo il prezzo del singolo ticket al prezzo totale
        totPrice += price;

        // Costruisco gli elementi HTML
        const div = createAddElement("div", wrapper, "box");
        createAddElement("h3", div, null, `Passeggero ${i+1}`);
        const ul = createAddElement("ul", div);
        createAddElement("li", ul, null, `Nome: ${passengersNames[i]}`);
        createAddElement("li", ul, null, `Età: ${passengersAges[i]}`);
        createAddElement("li", ul, null, `Ticket: ${price} &euro;`);
    }

    // Inserisco il prezzo totale alla fine del wrapper
    const hr = createAddElement("hr", wrapper);
    const finalPrice = createAddElement("h2", wrapper, "finalPrice", `Totale: ${totPrice} &euro;`);
});




/**
 * FUNZIONI
 */
function getPositiveNumber(message) {
    let number;
    let flag;
    do {
        number = prompt(message);
        flag = isNaN(number) || number < 1;

        if (flag) {
            alert("Il dato inserito deve essere un numero e maggiore di 0.")
        }
    } while(flag);

    return number;
}

function createAddElement(tag, parentElement, cssClassName = null, content = null) {
    const elem = document.createElement(tag);

    if (cssClassName !== null) {
        elem.classList.add(cssClassName);
    }
    if (content !== null) {
        elem.innerHTML = content;
    }

    parentElement.appendChild(elem);
    return elem;
}
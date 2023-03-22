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



/**
 * RICHIESTA DATI UTENTE
 */

// Chiedo il numero di passeggeri
let passengersNumbers = 0;
do {
    passengersNumbers = prompt("Indica il numero di passeggeri.");
    if (isNaN(passengersNumbers) || passengersNumbers < 1) {
        alert("Il dato inserito deve essere un numero e maggiore di 0.")
    }
}while(isNaN(passengersNumbers) || passengersNumbers < 1);

// Chiedo i dati di ogni passeggero 
for (let i=0; i < passengersNumbers; i++) {
    let name;
    do {
        name = prompt(`Indica il nome del passeggero ${i+1}. (almeno 3 caratteri)`);
    }while(name.length < 3);

    let age;
    do {
        age = prompt(`Indica l'età del passeggero ${i+1}.`);
        if (isNaN(age) || age < 1) {
            alert("Il dato inserito deve essere un numero e maggiore di 0.")
        }
    }while(isNaN(age) || age < 1);
    
    passengersNames[i] = name;
    passengersAges[i] = age;
}

// Chiedo i KM totali
let km;
do {
    km = prompt(`Indica la distanza in KM.`);
    if (isNaN(km) || km < 1) {
        alert("Il dato inserito deve essere un numero e maggiore di 0.")
    }
}while(isNaN(km) || km < 1);

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
    const div = document.createElement("div");
    div.classList.add("box");

    const title = document.createElement("h3");
    title.innerHTML = `Passeggero ${i+1}`;
    div.appendChild(title);

    const ul = document.createElement("ul");

    const liName = document.createElement("li");
    liName.innerHTML = `Nome: ${passengersNames[i]}`;
    
    const liAge = document.createElement("li");
    liAge.innerHTML = `Età: ${passengersAges[i]}`;

    const liPrice = document.createElement("li");
    liPrice.innerHTML = `Ticket: ${price} &euro;`;

    // ul.appendChild(liName).appendChild(liAge).appendChild(liPrice); // Sintassi non-corretta perché creerebbe una struttura così <ul> <li>Nome: ...<li>Età: ... <li>Ticket: ...</li></li></li></ul>
    
    // Questa è la sintassi corretta:
    ul.appendChild(liName);
    ul.appendChild(liAge);
    ul.appendChild(liPrice);

    div.appendChild(ul);

    wrapper.appendChild(div);
}

// Inserisco il prezzo totale alla fine del wrapper
const hr = document.createElement("hr");
wrapper.appendChild(hr);

const finalPrice = document.createElement("h2");
finalPrice.classList.add("finalPrice");
finalPrice.innerHTML = `Totale: ${totPrice} &euro;`;

wrapper.appendChild(finalPrice);
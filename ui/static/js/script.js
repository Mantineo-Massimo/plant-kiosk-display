/**
 * Script for the Floor Plan Display - Legacy Browser Compatible Version.
 */
document.addEventListener('DOMContentLoaded', function() {
    // --- Riferimenti al DOM ---
    var dom = {
        clock: document.getElementById('clock'),
        date: document.getElementById('current-date'),
        label: document.getElementById('floor-label'),
        body: document.body
    };

    // --- Stato e Configurazione ---
    var state = {
        currentLanguage: 'it'
    };

    var config = {
        languageToggleInterval: 15 // in secondi
    };

    var translations = {
        it: {
            days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
            months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
            floor: "Piano",
            building: { "A": "Edificio A", "B": "Edificio B", "SBA": "Edificio SBA" }
        },
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            floor: "Floor",
            building: { "A": "Building A", "B": "Building B", "SBA": "Building SBA" }
        }
    };

    var padZero = function(n) {
        return String(n).padStart(2, '0');
    };

    /** Aggiorna solo l'orologio (chiamata ogni secondo) */
    function updateClock() {
        var now = new Date();
        dom.clock.textContent = padZero(now.getHours()) + ':' + padZero(now.getMinutes()) + ':' + padZero(now.getSeconds());
    }

    /** Aggiorna gli elementi statici dell'UI (data, etichetta piano) */
    function updateStaticUI() {
        var lang = translations[state.currentLanguage];
        var now = new Date();
        
        // Aggiorna data
        var dayName = lang.days[now.getDay()];
        var monthName = lang.months[now.getMonth()];
        dom.date.textContent = dayName + ' ' + now.getDate() + ' ' + monthName + ' ' + now.getFullYear();

        // Aggiorna etichetta piano
        var buildingKey = dom.body.dataset.building;
        var floorNumber = dom.body.dataset.floor;
        var buildingName = lang.building[buildingKey] || buildingKey;
        dom.label.innerHTML = buildingName + ' - ' + lang.floor + ' ' + floorNumber;
    }

    /** Cambia la lingua e aggiorna l'UI */
    function toggleLanguage() {
        state.currentLanguage = (state.currentLanguage === 'en') ? 'it' : 'en';
        dom.body.className = 'lang-' + state.currentLanguage;
        updateStaticUI(); // Aggiorna i testi con la nuova lingua
    }

    /** Funzione di avvio */
    function init() {
        dom.body.className = 'lang-' + state.currentLanguage;
        updateStaticUI(); // Imposta i testi statici all'avvio

        var secondsCounter = 0;

        // Unico timer per gestire tutti gli aggiornamenti
        setInterval(function() {
            secondsCounter++;
            updateClock(); // Ogni secondo

            // Ogni 15 secondi, cambia la lingua
            if (secondsCounter % config.languageToggleInterval === 0) {
                toggleLanguage();
            }
        }, 1000);
    }

    init();
});

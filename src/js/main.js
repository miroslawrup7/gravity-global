// LIGHTBOX

const popup = document.querySelector("#popup");
const openBtn = document.querySelector(".btn");
const closeBtn = document.querySelector(".close-btn");
const counterDisplay = document.querySelector(".counter");
const resetBtn = document.querySelector(".reset");

let clickCounter = 0;

openBtn.addEventListener("click", () => {
    popup.classList.add("active");
    clickCounter++;
    counterDisplay.innerText = clickCounter + " times";
    if (clickCounter > 5) {
        resetBtn.classList.add("active");
    }
    saveLng();
});

closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
});

popup.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        popup.classList.remove("active");
    }
});

resetBtn.addEventListener("click", () => {
    clickCounter = 0;
    counterDisplay.innerText = clickCounter + " times";
    resetBtn.classList.remove("active");
    saveLng();
});

// IndexedDB

const createDB = () => {
    let openRequest = indexedDB.open("counterDB", 1);

    openRequest.onupgradeneeded = function () {
        let db = openRequest.result;
        if (!db.objectStoreNames.contains("counter")) {
            db.createObjectStore("counter", { autoIncrement: true });
        }
    };
};

createDB();

const saveLng = () => {
    let openRequest = indexedDB.open("counterDB");

    openRequest.onsuccess = function () {
        let db = openRequest.result;
        let transaction = db.transaction("counter", "readwrite");
        let languageTrans = transaction.objectStore("counter");

        let request = languageTrans.put(clickCounter, "counterValue");

        request.onsuccess = function () {};

        request.onerror = function () {
            console.log("Error", request.error);
        };
    };
};

const getLng = () => {
    let openRequest = indexedDB.open("counterDB");

    openRequest.onsuccess = function () {
        let db = openRequest.result;
        let transaction = db.transaction("counter");
        let languageTrans = transaction.objectStore("counter");

        let request = languageTrans.get("counterValue");

        request.onsuccess = function () {
            if (clickCounter) {
                clickCounter = request.result;
            }
        };

        request.onerror = function () {
            console.log("Error", request.error);
        };
    };
};

getLng();

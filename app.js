/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
    event.preventDefault()
    let form = event.target
    kittens.push({ id: generateId(), name: form.name.value, mood: "Tolerant", affection: 5 })
    form.reset()
    saveKittens()
    drawKittens()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
    window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
    let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
    if (kittensData) {
        kittens = kittensData
    }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
    loadKittens()
    let template = ""
    kittens.forEach(kitten => {
        template += `
                <div class="card" style="margin: 0.5em">
					<img class="kitten ${checkKittenMood(kitten)}" height="150" src="https://robohash.org/${kitten.name}?set=set4">
					<div class="text-center ${kitten.mood == "Gone" ? "text-danger" : ""}">
						<span style="font-weight:bold" class="text-center">Name: </span><span>${kitten.name}</span>
					</div>

                    <div class="${kitten.mood == "Gone" ? "hidden" : ""}">
                        <div class="text-center">
                            <span style="font-weight:bold" class="text-center">Mood: </span><span>${kitten.mood}</span>
                        </div>

                        <div class="text-center">
                            <span style="font-weight:bold" class="text-center">Affection: </span><span>${kitten.affection}</span>
                        </div>

                        <div class="d-flex space-between flex-wrap">
                            <button class="bg-danger" onclick="pet('${kitten.id}')">PET</button>
                            <button onclick="catnip('${kitten.id}')">CATNIP</button>
                        </div>
                    </div>

                    <div class="text-danger ${kitten.mood == "Gone" ? "" : "hidden"}">
                        <span style="font-weight:bold" class="text-center">Gone Ran Away</span>
                    </div>
				</div>`
    })

    // trả về hiệu ứng tương ứng cho hình ảnh mèo dựa vào mood hiện tại của mèo
    function checkKittenMood(kitten) {
        switch (kitten.mood) {
            case "Happy":
                return "happy"
            case "Tolerant":
                return "tolerant"
            case "Angry":
                console.log("angry")
                return "angry"
            case "Gone":
                return "gone"
            default:
                return ""
        }
    }

    document.getElementById("kittens").innerHTML = template
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
    return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
    let kitten = findKittenById(id)
    if (Math.random() > 0.7) {
        kitten.affection += 1
    }
    else { kitten.affection -= 1 }
    console.log(kittens[0].mood)
    setKittenMood(kitten)
    saveKittens()
    drawKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
    let kitten = findKittenById(id)
    kitten.mood = "Tolerant"
    kitten.affection = 5
    saveKittens()
    drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
    if (kitten.affection > 6) {
        kitten.mood = "Happy"

    }

    else if (kitten.affection > 3) {
        kitten.mood = "Tolerant"
    }

    else if (kitten.affection > 0) {
        kitten.mood = "Angry"
    }

    else if (kitten.affection <= 0) {
        kitten.mood = "Gone"
    }
}

function getStarted() {
    document.getElementById("welcome").remove();
    drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
    return (
        Math.floor(Math.random() * 10000000) +
        "-" +
        Math.floor(Math.random() * 10000000)
    );
}

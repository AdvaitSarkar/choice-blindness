let currentID = -1
const max = 14 // i.e., 15 elements
const ids = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
const manipulated = [0,0,0,0,1,0,0,0,0,1,0,0,0,1,0] // 5, 10, 14
const feedback = [0,0,1,0,1,0,0,1,0,1,0,1,0,1,0]    // 3, 5, 8, 10, 12, 14
let imgA, imgB, responseDiv, responseText, check, coverUp, heading
let randOrder = ids.slice()

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function init() {
    imgA = document.getElementById("imgA")
    imgB = document.getElementById("imgB")
    responseDiv = document.getElementById("response")
    responseText = document.getElementById("responseText")
    check = document.getElementById("check")
    coverUp = document.getElementById("coverUp")
    heading = document.getElementById("heading")

    document.addEventListener('keyup', mismatchDetected)

    shuffle(randOrder)
    console.log("order,"+randOrder)

    nextPair()
}

function clicked(which) {
    console.log(currentID+','+randOrder[currentID]+',clicked,'+which)
    
    coverUp.style.display = "block"
    window.setTimeout( function() {
        coverUp.className = "opaque"
    }, 10);

    window.setTimeout( function() {
        coverUp.className = "transparent"

        if(feedback[currentID]) {
            heading.innerText = ""
            responseDiv.style.display = "block"
            responseText.focus()
            if(manipulated[currentID]) {
                if(which==="A") imgA.style.display = "none"
                else imgB.style.display = "none"
            } else { // not manipulated
                if(which==="A") imgB.style.display = "none"
                else imgA.style.display = "none"
            }
        } else {
            nextPair()
        }

        window.setTimeout( function() {
            coverUp.style.display = "none"
        }, 2000);
    }, 2100);
}

function mismatchDetected(event) {
    if(event.key==="AltGraph")
    {
        if(confirm("Skip?")) {
            console.log(currentID+','+randOrder[currentID]+',skipped')
            nextPair()
        }
        else {}
    }
}

function submitted() {
    console.log(currentID+','+randOrder[currentID]+',responseText,'+responseText.value)
    console.log(currentID+','+randOrder[currentID]+',check,'+check.checked)
    nextPair()
}

function nextPair() {
    currentID += 1
    document.getElementById("currentID").innerText = currentID

    if(currentID>max) {
        alert('done!')
        return
    }

    heading.innerText = "Which design is more attractive?"
    responseText.value=""
    check.checked = false
    responseDiv.style.display = "none"

    imgA.src="images/"+randOrder[currentID]+"a.png"
    imgB.src="images/"+randOrder[currentID]+"b.png"
    imgA.style.display = "inline"
    imgB.style.display = "inline"
}

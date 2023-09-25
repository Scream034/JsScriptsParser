function addLineBreakBeforeUlElements(element) {
    let ulElements = element.querySelectorAll("ul");

    ulElements.forEach((ul) => {
        if (ul.previousElementSibling && ul.previousElementSibling.tagName !== "BR") {
            let brElement = document.createElement("br");
            ul.insertBefore(brElement, ul.firstChild);
        }
    });
}


function replacePWithBoldBeforeUl(parentElement) {
    const brElements = parentElement.querySelectorAll('ul');

    brElements.forEach((brElement) => {
        const previousElement = brElement.previousElementSibling;

        if (previousElement && previousElement.tagName === 'P') {
            const boldElement = document.createElement('b');
            boldElement.innerHTML = previousElement.innerHTML; // Сохраняем текст из <p>
            if (!boldElement.textContent.includes(':')) {
                boldElement.textContent += ':';
            }
            parentElement.replaceChild(boldElement, previousElement);
        }
    });
}

function processNextElement(bold) {
    let nextElemenet = bold.nextElementSibling;
    let previousElement = bold.previousElementSibling;
    if (previousElement && previousElement.tagName != "BR"){
        let brElement = document.createElement("br");
        previousElement.insertAdjacentElement("afterend", brElement);
    }

    if (nextElemenet) {
        let ul = document.createElement("ul");
        ul.insertAdjacentElement("afterend", bold);

        while (nextElemenet && nextElemenet.tagName != "B") {
            let textContent = nextElemenet.textContent;
            let textArr = nextElemenet.innerHTML.trim().split(/<br>/i); // Разделяем текст на подстроки на основе <br>

            for (let j = 0; j < textArr.length; j++) {
                let cleanText = textArr[j]
                    .replaceAll(/\n/g, "")
                    .replaceAll(/\t/g, "")
                    .replaceAll(/\s{2,}/g, " ").trim();

                if (cleanText && cleanText != "") {
                    let ulElement = document.createElement("li");
                    ulElement.textContent = textArr[j].trim();

                    ul.appendChild(ulElement);
                }
            }

            nextElemenet.replaceWith(ul);
            nextElemenet = nextElemenet.nextElementSibling;
        }
    }
}

let elDescText = document.querySelector("div.description__text");
let elPropNames = document.querySelectorAll("span.characteristics__leftText");
let elPropValues = document.querySelectorAll("div.characteristics__right");

let text = "";

if (elDescText) {
    replacePWithBoldBeforeUl(elDescText);

    elDescText.innerHTML = elDescText.innerHTML
        .replaceAll("</p>\n<p>", "<br>")
        .replaceAll(/<h[1-6]>/g, '<b>')
        .replaceAll(/<\/h[1-6]>/g, ':</b>');

    let bolds = elDescText.querySelectorAll("b");

    for (let i = 0; i < bolds.length; i++) {
        let bold = bolds[i];
        let boldText = bold.textContent.toLowerCase().trim();

        if (boldText.includes("гарантия") || boldText.includes("описание:")) {
            bold.remove();
        } else if (boldText.includes("управление прибором:") || boldText.includes("сфера применения:") || boldText.includes("назначение:") || boldText.includes("функции:")) {
            processNextElement(bold);
        }
    }
    
    addLineBreakBeforeUlElements(elDescText);
    text += elDescText.innerHTML;
}
else {
    console.log("Нет описания!");
}

text += "<br><b>Технические характеристики:</b><ul><br>";

for (let index = 0; index < elPropNames.length; index++) {
    let elPropName = elPropNames[index];
    let elPropValue = elPropValues[index];

    let propName = elPropName.textContent.replaceAll("&nbsp;", "").replaceAll("  ", "").replaceAll("\t", "").replaceAll("\n", "");
    let propValue = elPropValue.textContent.replaceAll("&nbsp;", "").replaceAll("  ", "").replaceAll("\t", "").replaceAll("\n", "");

    text += `<li>${propName}: ${propValue}</li>`;

}

text += "</ul>";
text = text
    .replaceAll("<br>\n<br>", "br")
    .replaceAll("<br><br>", "br"); 

text;

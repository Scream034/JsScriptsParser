function replacePB(e){
    let paragraphs = e.getElementsByTagName("p");
    for (let i = 0; i < paragraphs.length; i++) {
        let paragraph = paragraphs[i];

        if (paragraph.children.length == 1 && paragraph.children[0].tagName == "B"){
            let bold = document.createElement("b");
            bold.textContent = paragraph.textContent.toLowerCase().includes(":") ? paragraph.textContent : paragraph.textContent + ":";
            console.log(paragraph)
            e.replaceChild(bold, paragraph);
        }
    }
}

let html = "";

let elDesc = document.querySelector("section#tab_text > div.tab_content");
let elProps = document.querySelectorAll("section#tab_prm tr[itemprop='additionalProperty']");

if (elDesc){
    replacePB(elDesc);
    html += elDesc.innerHTML.trim();
} else{
    console.log("нет описания!");
}

if (elProps && elProps.length > 0)
{
    html += "<br><b>Технические характеристики:</b><br><ul>";
    for (let index = 0; index < elProps.length; index++) {
        let elProp = elProps[index];
        let propName = elProp.children[0].textContent.trim();
        let propValue = elProp.children[1].textContent.trim();
        
        html += `<li>${propName}: ${propValue}</li>`;
    }
    html += "</ul>";
} else{
    console.log("нет характеристик!");
}

html;

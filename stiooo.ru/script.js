function convertTextToHTMLList(text) {
    // Разделяем текст по символу ";"
    const items = text.split(';');
  
    // Создаем HTML элемент <ul>
    const ul = document.createElement('ul');
  
    // Добавляем каждый элемент в виде HTML элемента <li> в <ul>
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.trim().replace(/^- /, ''); // Удаляем пробелы и лишние символы "-"
      ul.appendChild(li);
    });
    ul.removeChild(ul.children[ul.children.length - 1]);

    return ul;
  }

function getTextWithoutChildren(element) {
    let text = '';

    for (let node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            text += node.textContent.trim();
        }
    }

    return text;
}

let html = "";

let elGeneral = document.querySelector("div.div_xarakts");
let elProps = document.querySelectorAll("div.div_xarakts table.tx_xar tr");

if (elGeneral){
    html += "<b>Особенности:</b><br>" + convertTextToHTMLList(getTextWithoutChildren(elGeneral)).outerHTML + "<b>Технические характеристики:</b><br><ul>";

    for (let i = 0; i < elProps.length; i++)
    {
        let elProp = elProps[i];
        let propName = elProp.children[0].textContent.trim()
        let propValue = elProp.children[1].textContent.trim()

        html += `<li>${propName}: ${propValue}</li>`
    }
    html += "</ul>"
}else
{
    console.log("Ошибка!!");
}

html;

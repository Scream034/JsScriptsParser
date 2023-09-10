function waitElement(selector, timeout = 5000) {
  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    const checkElement = () => {
      const element = document.querySelector(selector);
      
      if (element) {
        resolve(element);
      } else if (Date.now() - startTime >= timeout) {
        reject('Превышено время ожидания');
      } else {
        setTimeout(checkElement, 100);
      }
    };
    
    setTimeout(checkElement, 100);
  });
}

function convertText(text) {
  let regex = /Особенности([\s\S]*)/;
  let result = text.match(regex);
  
  if (result) {
    let beforeText = text.substring(0, result.index);
    let listItems = result[1].trim().split(/\n-\s+/).map(item => `<li>${item}</li>`).join("");
    listItems = listItems.replaceAll("<li>:</li>", "");
    let transformedText = `<p>${beforeText}</p><br><b>Особенности:</b><ul><br>${listItems}</ul>`;
    return transformedText;
  } else {
    return text;
  }
}

let html = ""
const elDesc = document.querySelector("div#product-description > div")
const elNameProps = document.querySelectorAll("div#product-features td.name")
const elValueProps = document.querySelectorAll("div#product-features td.value")

if (elDesc) {
  let elMarkdownDesc = elDesc.querySelector("p:nth-child(1)")
  let elMarkdownAbbits = elDesc.querySelector("p:nth-child(2)")
  let markdownText = elMarkdownDesc.innerText.trim()
  if (elMarkdownAbbits) {
    markdownText += elMarkdownAbbits.innerText.trim()
  } else {
    console.trace("Нет оссобенностей!")
  }
  html = convertText(markdownText)
} else {
  console.trace("Нет описания")
}

if (elNameProps.length > 0 && elValueProps.length > 0) {
  if (elNameProps.length == elValueProps.length) {
    html += "<b>Характеристики</b><ul><br>"
    for (let i = 0; i < elNameProps.length; i++) {
      let elName = elNameProps[i]
      let elValue = elValueProps[i]
      if (elValue.textContent.trim() != "")
      {
          html += `<li>${elName.textContent.trim()}: ${elValue.textContent.trim()}</li>`
      }
    }
    html += "</ul>"
  } else {
    console.trace(`Длина хар-к не равна! (${elNameProps.length}, ${elValueProps.length})`)
  }
} else {
  console.trace("Нет характеристик!")
}
html = html.replaceAll(/<(\w+)(?:\s+[^>]+)?>/g, "<$1>").replaceAll(/<(\w+)(?:\s+[^>]+)?><\/\1>/g, '').replaceAll(/<!--[\s\S]*?-->/g, '')
html

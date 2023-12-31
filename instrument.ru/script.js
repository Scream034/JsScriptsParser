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

window.scrollTo(0, document.body.scrollHeight - document.body.scrollHeight * 0.5);

const waitTime = Math.floor(Math.random() * 1760) + 1760;
await new Promise(resolve => setTimeout(resolve, waitTime));

let html = "";
let elNameProps = document.querySelectorAll("div.detail-info__body dt");
let elValueProps = document.querySelectorAll("div.detail-info__body dd");

if (elNameProps.length > 0 && elValueProps.length > 0) {
  if (elNameProps.length == elValueProps.length) {
    html += "<b>Характеристики</b><ul><br>";
    for (let i = 0; i < elNameProps.length; i++) {
      let elName = elNameProps[i];
      let elValue = elValueProps[i];

      html += `<li>${elName.innerText.trim()}: ${elValue.innerText.trim()}</li>`;
    }
    html += "</ul>";
  } else {
    console.trace(
      `Не совпадает длина хар-к (имя: значение) (${elNameProps.length}, ${elValueProps.length})`
    );
  }
} else {
  console.trace("Нет характеристик!");
}

let elBtnDesc = document.querySelector("li#t-Описание");
let elDesc;
if (elBtnDesc) {
  elBtnDesc.click();
  elDesc = await waitElement("article[itemprop='description']");
  elDesc.innerHTML = elDesc.innerHTML
    .replaceAll("h2", "b")
    .replaceAll("</ul>\n<ul>", "").replaceAll("</ul><ul>", "")
    .replaceAll("</ul>\n<br>", "</ul>").replaceAll("</ul><br>", "</ul>")
    .replaceAll("<b>Преимущества</b>", "<b>Преимущества</b>");
  html = `${elDesc.innerHTML.trim()}<br>${html}`;
} else {
  console.trace("Нет описания!");
}

html = html
  .replaceAll(/<(\w+)(?:\s+[^>]+)?>/g, "<$1>")
  .replaceAll(/<(\w+)(?:\s+[^>]+)?><\/\1>/g, "")
  .replaceAll(/<!--[\s\S]*?-->/g, "");

html;

const tabSpecification = document.querySelector('#tab-specification');
const heading = tabSpecification.querySelector('.heading').textContent.trim();

const ulElement = document.createElement('ul');

const productDataItems = tabSpecification.querySelectorAll('.product-data__item');
productDataItems.forEach(item => {
    const elName = item.querySelector('.product-data__item-div:nth-child(1)');
    const elValue = item.querySelector('.product-data__item-div:nth-child(2)');
    
    let name, value;
    if (elName && elValue) {
        name = elName.textContent.trim();
        value = elValue.textContent.trim();
    } else {
        const prevElement = item.parentNode.previousElementSibling;
        name = prevElement.textContent.trim();
        value = item.textContent.trim();
    }
    
    const liElement = document.createElement('li');
    liElement.textContent = `${name}: ${value}`;

    ulElement.appendChild(liElement);
});

const formattedHtml = `<b>${heading}:</b>${ulElement.outerHTML}`;
formattedHtml

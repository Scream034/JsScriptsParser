let html = ""
let elNameProps = document.querySelectorAll("div.fulldesc tbody td:nth-child(1)")
let elValueProps = document.querySelectorAll("div.fulldesc tbody td:nth-child(2)")

if (elNameProps.length > 0 && elValueProps.length > 0)
{
    if (elNameProps.length == elValueProps.length)
    {
        html += "<b>Характеристики</b><ul><br>"
        for (let i = 0; i < elNameProps.length; i++) 
        {
            let elName = elNameProps[i]
            let elValue = elValueProps[i]

            if (elValue.textContent.trim() != "")
            {
                html += `<li>${elName.textContent.trim()}: ${elValue.textContent.trim()}</li>`
        
            }
        }
        html += "</ul>"
    }
    else
    {
        console.track(`Не совпадает длина хар-к (${elName.length}, ${elValue.length})`)
    }
}
else
{
    console.trace("Нет характеристик!")
}
html

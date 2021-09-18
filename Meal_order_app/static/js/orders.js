orderNo_list = document.getElementsByClassName('order-no')
price_list = document.getElementsByClassName('price')
status_list = document.getElementsByClassName('status')
show_list = document.getElementsByClassName('show')
delete_list = document.getElementsByClassName('delete')
row_list = document.getElementsByClassName('row')
popUp = document.querySelector('.pop-up')
popUpCenter = document.querySelector('.pop-center')
popUpRow = document.querySelector('.pop-up .row')

prevBtn = document.querySelector('.fa-angle-double-left')
nextBtn = document.querySelector('.fa-angle-double-right')

let currPage = 1
let totalRecords = 0
let additionalRows = []
let originalPopUpRow = popUpRow
originalPopUpRow.style.setProperty('margin-top','5%')

const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value

function getRecords(page){
    fetch(`../api/marketProducts/${page}`)
    .then(response => response.json())
    .then(send_data => {
        totalRecords = send_data.totalRecords
        data = send_data.products
        prices = send_data.prices
        for(let i = 0;i < data.length; i++){
            row_list[i].style.setProperty('visibility','visible')
            orderNo_list[i+1].textContent = data[i].id
            price_list[i+1].textContent = prices[i]
            status_list[i+1].textContent = 'Hazırlanıyor'
            show_list[i+1].addEventListener('click', (e) => {
                popUp.style.setProperty('display','block')
                e.stopPropagation()
                let products = data[i]
                let names = Object.keys(products).slice(1)
                let quantities = Object.values(products).slice(1)
                console.log(names);
                console.log(quantities);
                originalPopUpRow.children[0].textContent = names[0]
                originalPopUpRow.children[1].textContent = quantities[0] + ' adet'
                for(let i = 1;i < names.length;i++){
                    popUpRow = popUpRow.cloneNode(true)
                    popUpCenter.appendChild(popUpRow);
                    additionalRows.push(popUpRow)

                    let col1 = popUpRow.children[0]
                    let col2 = popUpRow.children[1]
                    col1.textContent = names[i]
                    col2.textContent = quantities[i] + ' adet'                 
                }
                let centerStyle = '25% 25% 25% 25%'
                for(let i = 4;i < names.length;i++){
                    centerStyle += ' 25%'
                }
                popUpCenter.style.setProperty('grid-template-rows',`${centerStyle}`)
            });
            delete_list[i+1].addEventListener('click',(e) => {
                deleteRecordId = data[i].id
                fetch('../api/marketProducts/0', {
                    method : 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    body: JSON.stringify(deleteRecordId)
                }).then(response => {
                    location.reload()
                })
            })
        }
        for(let j = data.length;j < 5; j++){
            console.log(j);
            row_list[j].style.setProperty('visibility','hidden')
        }
    })
}
getRecords(currPage)

prevBtn.addEventListener('click', (e) => {
    if(currPage > 1){
        currPage -= 1
        getRecords(currPage)
    }
})

nextBtn.addEventListener('click', (e) => {
    if(totalRecords > currPage * 5){
        currPage += 1
        getRecords(currPage)
    }
})

document.addEventListener('click', (e) => {
    if(!popUp.contains(e.target)){
        for(row of additionalRows){
            row.remove()
        }
        originalPopUpRow.children[0].textContent = ''
        originalPopUpRow.children[1].textContent = ''

        popUp.style.setProperty('display','none')
    }
})
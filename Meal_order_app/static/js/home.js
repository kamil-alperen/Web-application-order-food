let clearBtn = document.querySelector('.clear')
let addBtn = document.querySelector('.add')
let warning = document.querySelector('.warning')

let input_list = Array.from(document.getElementsByTagName('input'))
input_list = input_list.slice(1,input_list.length-3)

let fields = []
fields.push(document.querySelector('#simit'))
fields.push(document.querySelector('#kete'))
fields.push(document.querySelector('#açma'))
fields.push(document.querySelector('#poğaça'))
fields.push(document.querySelector('#kaşarlı_börek'))
fields.push(document.querySelector('#kıymalı_börek'))
fields.push(document.querySelector('#su_böreği'))
fields.push(document.querySelector('#midye_baklava'))
fields.push(document.querySelector('#soğuk_baklava'))
fields.push(document.querySelector('#havuç_baklava'))
fields.push(document.querySelector('#mini_ekler'))
fields.push(document.querySelector('#şöbiyet'))
fields.push(document.querySelector('#trileçe'))
fields.push(document.querySelector('#sütlaç'))
fields.push(document.querySelector('#limonlu_pasta'))
fields.push(document.querySelector('#frambuazlı_pasta'))
fields.push(document.querySelector('#çikolatalı_meyveli_pasta'))
fields.push(document.querySelector('#çikolatalı_fıstıklı_pasta'))
fields.push(document.querySelector('#cappy'))
fields.push(document.querySelector('#cocacola'))
fields.push(document.querySelector('#fanta'))
fields.push(document.querySelector('#fusetea'))
fields.push(document.querySelector('#sprite'))
fields.push(document.querySelector('#su'))

let BASE_URL = document.getElementById("baseUrl").value


clearBtn.addEventListener('click', (e) => {
    for(el of fields){
        el.value = ''
    }
});

addBtn.addEventListener('click', (e) => {
    let exist = false
    for(let i = 0;i < input_list.length;i++){
        if(input_list[i].value){
            exist = true
            break
        }
    }
    if(!exist){
        e.preventDefault()
        warning.style.setProperty('display','block')
    }
    else {
        return true
    }
})

const regExp = new RegExp('^[0-9]+$');

for(let i = 0;i < input_list.length;i++){
    input_list[i].addEventListener("input",(e) => {
        if(!regExp.test(input_list[i].value)){
            input_list[i].value = input_list[i].value.substring(0, input_list[i].value.length-1)
        }
    })
}

fetch(`${BASE_URL}api/quantityInfos/`)
.then(response => {
    return response.json();
})
.then(data => {
    fields[0].value = data.simit
    fields[1].value = data.kete
    fields[2].value = data.açma
    fields[3].value = data.poğaça
    fields[4].value = data.kaşarlı_börek
    fields[5].value = data.kıymalı_börek
    fields[6].value = data.su_böreği
    fields[7].value = data.midye_baklava
    fields[8].value = data.soğuk_baklava
    fields[9].value = data.havuç_baklava
    fields[10].value = data.mini_ekler
    fields[11].value = data.şöbiyet
    fields[12].value = data.trileçe
    fields[13].value = data.sütlaç
    fields[14].value = data.limonlu_pasta
    fields[15].value = data.frambuazlı_pasta
    fields[16].value = data.çikolatalı_meyveli_pasta
    fields[17].value = data.çikolatalı_fıstıklı_pasta
    fields[18].value = data.cappy
    fields[19].value = data.cocacola
    fields[20].value = data.fanta
    fields[21].value = data.fusetea
    fields[22].value = data.sprite
    fields[23].value = data.su
    for(let field of fields){
        if(field.value === 'undefined'){
            field.value = null
        }
    }
})
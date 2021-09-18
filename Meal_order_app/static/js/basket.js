updateBtn = document.querySelector('.update')
confirmBtn = document.querySelector('.confirm')
const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

updateBtn.addEventListener('click', (e) => {
    fetch('../api/quantityInfos/', {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify('')
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.replace(data)
    })
});



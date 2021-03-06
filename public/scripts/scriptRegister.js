const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    const name = document.querySelector('[name="firstName"]').value
    const surname = document.querySelector('[name="lastName"]').value
    const password1 = document.querySelector('#password1').value
    const password2 = document.querySelector('#password2').value
    const email1 = document.querySelector('#email1').value
    const email2 = document.querySelector('#email2').value

    if (!name || !surname || !password1 || !password2 || !email1 || !email2) {
        Swal.fire({
            icon:'error',
            text:"Uzupełnij wszystkie wszystkie pola"})
            e.preventDefault()
            return
        }     
        
    if (!(password1 === password2)){
        Swal.fire({
            icon:'error',
            text:"Hasła nie są takie same"})
        e.preventDefault()
        return
    }

    if (!(email1 === email2)){
        Swal.fire({
            icon:'error',
            text:"Podane emaile różnią się"})
        e.preventDefault()
        return
    }
})
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    const email = document.querySelector('[name="email"]').value
    const password = document.querySelector('[name="password"]').value

    if (!email || !password) {
        alert("Uzupełnij wszystkie wszystkie pola")
        e.preventDefault()
    }
})
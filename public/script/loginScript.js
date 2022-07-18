const registerEmail = document.getElementById('registerEmail');
const registerName = document.getElementById('registerName');
const registerBirthDate = document.getElementById('registerBirthDate');
const registerPassword = document.getElementById('registerPassword');
const registerForm = document.querySelector('.register');

const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginForm = document.querySelector('.loginForm');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    let body = {
        email: registerEmail.value,
        name: registerName.value,
        birthDate: registerBirthDate.value,
        password: registerPassword.value
    }

    await fetch('/register', {
        method: 'POST',
        mode: 'cors',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    .then(res => {
        if(res.ok){
            alert('Sikeres regisztráció!');
        }else{
            alert('Már létezik fiók ezzel az email címmel!');
        }
    })
})

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    let body = {
        email: loginEmail.value,
        password: loginPassword.value
    }

    await fetch('/login', {
        method: 'POST',
        mode: 'cors',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    .then(res => {
        if(res.ok){
            window.location = '/home';
        }else{
            alert('Hibás adatok!')
        }
    });
})

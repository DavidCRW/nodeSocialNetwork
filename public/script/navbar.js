const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    fetch('/logout', {
        method: 'POST',
        mode: 'cors'
    })
})
const chatIcon = document.querySelector('.fa-comment');
const notificationIcon = document.querySelector('.fa-bell');
const chat = document.querySelector('.chat');
const notifications = document.querySelector('.notifications')

chatIcon.addEventListener('click', () => {
    chat.classList.toggle('dshow')
    notifications.classList.remove('dshow')
})
notificationIcon.addEventListener('click', () => {
    notifications.classList.toggle('dshow')
    chat.classList.remove('dshow')
})
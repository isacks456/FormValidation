const form = document.getElementById('login-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('user-email').value.trim();
    const password = document.getElementById('user-password').value.trim();

    const oldError = document.getElementById('error');
    if (oldError) {
        oldError.remove();
    }

    if (!email || !password) {
        showError('Заполните все поля!');
        return;
    }

    if (password.length < 8) {
        showError('Пароль должен содержать минимум 8 символов!');
        return;
    }

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        console.log(data);
        alert('Данные успешно отправлены!');
        form.reset();

    } catch (error) {
        showError('Ошибка при отправке данных!');
        console.error(error);
    }
});

function showError(message) {
    const error = document.createElement('p');
    error.id = 'error';
    error.textContent = message;
    error.style.color = 'red';

    form.appendChild(error);

    setTimeout(() => {
        error.remove();
    }, 2000);
}
const delete_form = document.getElementById('delete-form');

delete_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = 'https://www.shorten-url-api.infobrains.club/api/private/urls';
    const token = localStorage.getItem('token');
    const id = document.getElementById('delete-url').value;

    const response = await fetch(`${url}/${id}`, {
        method : 'DELETE',
        headers : 
        {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 500) {
        alert('Internal server error');
    }

    if (response.status === 401) {
        alert('Unauthorized');
        localStorage.removeItem('token');
        window.location.href = '../login.html';
    }

    if (response.status === 404) {
        alert('URL not found');
    }

    if (response.status === 200) {
        alert('URL deleted successfully');
    }
});



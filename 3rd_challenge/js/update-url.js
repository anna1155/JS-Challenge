const updated_url = document.getElementById('updated-url');
const update_form = document.getElementById('update-form');

update_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = 'https://www.shorten-url-api.infobrains.club/api/private/urls';
    const token = localStorage.getItem('token');
    const id = document.getElementById('input-url');

    const response = await fetch(`${url}/${id.value}`, {
        method : 'PATCH',
        headers : 
        {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url })
    });

    const jsonResponse = await response.json();

    if (response.status === 500) {
        alert('Internal server error');
    }

    if (response.status === 400) {
        alert('Validation error');
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

        const data = jsonResponse.data;
        updated_url.innerHTML = `
        <h4>Your updated url :</h4> 
        <ul>
            <strong>ID</strong> : ${data.id}<br>
            <strong>originalUrl</strong> : ${data.originalUrl}<br>
            <strong>shortUrl</strong> : ${data.shortUrl}<br>
            <strong>clicks</strong> : ${data.clicks}<br>
            <strong>createdAt</strong> : ${data.createdAt}<br>
            <strong>updatedAt</strong> : ${data.updatedAt}<br>
        </ul>
        `;
    }
});



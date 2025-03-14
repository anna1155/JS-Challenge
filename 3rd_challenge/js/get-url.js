const result_url = document.getElementById('result-url');
const get_form = document.getElementById('get-form');

get_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = 'https://www.shorten-url-api.infobrains.club/api/private/urls';
    const token = localStorage.getItem('token');
    const id = document.getElementById('url-id');

    const response = await fetch(`${url}/${id.value}`, {
        method : 'GET',
        headers : 
        {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const jsonResponse = await response.json();

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

        const data = jsonResponse.data;
        result_url.innerHTML = `
        <h4>Your url : </h4>
        <ul>
            <strong>ID</strong> : ${data.id}<br>
            <strong>originalUrl</strong> : ${data.originalUrl}<br>
            <strong>shortUrl</strong> : ${data.shortUrl}<br>
            <strong>clicks</strong> : ${data.clicks}<br>
            <strong>createdAt</strong> : ${data.createdAt}<br>
            <strong>updatedAt</strong> : ${data.updatedAt}<br>
        </ul>
        `;
        id.innerHTML = "";
    }
});



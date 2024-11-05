const map = L.map('map').setView([-23.5505, -46.6333], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marcador;

async function buscarLocalizacao() {
    const cidade = document.getElementById('cidade').value;
    const endereco = document.getElementById('endereco').value;

    if (!cidade || !endereco) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco + ', ' + cidade)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0) {
            alert('Local não encontrado! Verifique o endereço e tente novamente.');
            return;
        }

        const latitude = data[0].lat;
        const longitude = data[0].lon;

        map.setView([latitude, longitude], 14);

        if (marcador) {
            map.removeLayer(marcador);
        }

        marcador = L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`<strong>Local:</strong> ${data[0].display_name}`)
        .openPopup();

    } catch (error) {
        console.error(error);
        alert('Ocorreu um erro ao buscar a localização. Tente novamente.');
    }
}



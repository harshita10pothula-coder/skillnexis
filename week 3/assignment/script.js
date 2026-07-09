const apiKey = '2d7ee40c87e2cfef68a1b2123c749dbe';

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('weatherResult');
    const errorMsg = document.getElementById('errorMsg');

    resultDiv.classList.add('hidden');
    errorMsg.classList.add('hidden');

    if (!city) {
        errorMsg.textContent = 'Please enter a city name.';
        errorMsg.classList.remove('hidden');
        return;
    }

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!res.ok) {
            throw new Error('City not found');
        }
        const data = await res.json();

        document.getElementById('cityName').textContent = data.name + ', ' + data.sys.country;
        document.getElementById('temp').textContent = data.main.temp + ' °C';
        document.getElementById('humidity').textContent = data.main.humidity + ' %';
        document.getElementById('condition').textContent = data.weather[0].description;

        resultDiv.classList.remove('hidden');
    } catch (err) {
        errorMsg.textContent = err.message === 'City not found'
            ? 'City not found. Please try again.'
            : 'Something went wrong. Check your connection or API key.';
        errorMsg.classList.remove('hidden');
    }
}

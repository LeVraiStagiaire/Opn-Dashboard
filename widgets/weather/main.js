export const __initialize__ = (widgetElem, props) => {
    const { lat, lon } = props.location;
    const { locationName } = props;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,temperature_2m_max&current=temperature_2m,weather_code&timezone=Europe/Paris`;

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/widgets/weather/style.css';
    document.head.appendChild(stylesheet);

    const weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weather');
    weatherDiv.id = 'weather';
    weatherDiv.appendChild(document.createTextNode(locationName || 'Weather'));

    const tempDiv = document.createElement('div');
    tempDiv.classList.add('temperatures');

    const temperatureMin = document.createElement('div');
    temperatureMin.classList.add('temperature-min');
    temperatureMin.id = 'temperature-min';
    const tempMinIcon = document.createElement('img');
    tempMinIcon.src = '/widgets/weather/assets/thermometer-snowflake.svg';
    tempMinIcon.classList.add('temp-icon');
    temperatureMin.appendChild(tempMinIcon);
    const tempMinValue = document.createElement('span');
    tempMinValue.innerText = '--°C';
    temperatureMin.appendChild(tempMinValue);

    const temperatureMax = document.createElement('div');
    temperatureMax.classList.add('temperature-max');
    temperatureMax.id = 'temperature-max';
    const tempMaxIcon = document.createElement('img');
    tempMaxIcon.src = '/widgets/weather/assets/thermometer-sun.svg';
    tempMaxIcon.classList.add('temp-icon');
    temperatureMax.appendChild(tempMaxIcon);
    const tempMaxValue = document.createElement('span');
    tempMaxValue.innerText = '--°C';
    temperatureMax.appendChild(tempMaxValue);

    const temperatureCurrent = document.createElement('div');
    temperatureCurrent.classList.add('temperature');
    temperatureCurrent.id = 'temperature';
    const tempCurrentIcon = document.createElement('img');
    tempCurrentIcon.src = '/widgets/weather/assets/thermometer.svg';
    tempCurrentIcon.classList.add('temp-icon');
    temperatureCurrent.prepend(tempCurrentIcon);
    const tempCurrentValue = document.createElement('span');
    tempCurrentValue.innerText = '--°C';
    temperatureCurrent.appendChild(tempCurrentValue);

    tempDiv.appendChild(temperatureMin);
    tempDiv.appendChild(temperatureCurrent);
    tempDiv.appendChild(temperatureMax);

    const conditionDiv = document.createElement('div');
    conditionDiv.classList.add('condition');

    const iconImg = document.createElement('img');
    iconImg.classList.add('weather-icon');
    iconImg.id = 'weather-icon';

    conditionDiv.appendChild(iconImg);
    const conditionText = document.createElement('span');
    conditionText.id = 'condition-text';
    conditionText.innerText = 'Loading...';
    conditionDiv.appendChild(conditionText);

    weatherDiv.appendChild(conditionDiv);
    weatherDiv.appendChild(tempDiv);
    widgetElem.appendChild(weatherDiv);
    widgetElem.style.display = 'flex';

    const weatherCodes = {
        'clear': '/widgets/weather/assets/sun.svg',
        'partly-cloudy': '/widgets/weather/assets/cloud-sun.svg',
        'cloudy': '/widgets/weather/assets/cloud.svg',
        'rain': '/widgets/weather/assets/cloud-rain.svg',
        'snow': '/widgets/weather/assets/cloud-snow.svg',
        'wind': '/widgets/weather/assets/wind.svg'
    };

    function getWeatherIcon(code) {
        if (code === 0) return weatherCodes['clear'];
        else if ([1, 2, 3].includes(code)) return weatherCodes['partly-cloudy'];
        else if ([45, 48].includes(code)) return weatherCodes['cloudy'];
        else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return weatherCodes['rain'];
        else if ([71, 73, 75, 77, 85, 86].includes(code)) return weatherCodes['snow'];
        else if ([95, 96, 99].includes(code)) return weatherCodes['wind'];
        else return '❓';
    }

    const conditionDescriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Slight snow fall',
        73: 'Moderate snow fall',
        75: 'Heavy snow fall',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };

    async function fetchWeather() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const current = data.current;
            const daily = data.daily;
            document.getElementById('temperature').children[1].innerText = `${current.temperature_2m}°C`;
            document.getElementById('temperature-min').children[1].innerText = `${daily.temperature_2m_min[0]}°C`;
            document.getElementById('temperature-max').children[1].innerText = `${daily.temperature_2m_max[0]}°C`;
            iconImg.src = getWeatherIcon(current.weather_code);
            conditionText.innerText = conditionDescriptions[current.weather_code] || 'Unknown';
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    setInterval(fetchWeather, 10 * 60 * 1000); // Update every 10 minutes
    fetchWeather(); // Initial fetch
}
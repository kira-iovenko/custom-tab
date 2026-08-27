import { createDivElement } from "./dom"

const widgets = [
    {
        type: "nasa"
    },
    {
        type: "weather"
    },
]

export async function createWidgets(mainElement) {
    const widgetsElement = createDivElement(mainElement, "widgets");
    await createNasaWidget(widgetsElement);
    await createWeatherWidget(widgetsElement);
    await createGithubWidget(widgetsElement);
}

async function createGithubWidget(widgetsElement) {
    const GITHUB_USER = import.meta.env.VITE_GITHUB_USER;

    if (!GITHUB_USER) {
        widgetsElement.innerHTML += `
        <div class="widget">
            <h3>GitHub</h3>
            <p>Github user is not configured</p>
        </div>
        `;
        return;
    }

    const response = await fetch("https://api.github.com/users/" + GITHUB_USER);

    if (!response.ok) {
        widgetsElement.innerHTML += `
        <div class="widget">
            <h3>GitHub</h3>
            <p>Github user not found</p>
        </div>
        `;
        return;
    }

    const githubData = await response.json();

    widgetsElement.innerHTML += `
    <div class="widget">
        <h3>GitHub</h3>
        <div class="github-profile">
            <img class="github-avatar" src="${githubData.avatar_url}">
            <div>
                <span class="github-name">${githubData.name}</span>
                <span class="github-username">@${githubData.login}</span>
            </div>
        </div>
        <div class="stats">
            <p>${githubData.public_repos} repositories</p>
            <p>${githubData.followers} followers</p>
            <p>${githubData.following} following</p>
        </div>
    </div>
    `;
}

async function createWeatherWidget(widgetsElement) {
    const location = await getUserLocation();

    if (!location) {
        widgetsElement.innerHTML += `
        <div class="widget">
            <h3>Weather</h3>
            <p>Could not load weather</p>
        </div>
        `;
        return;
    }

    const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${location.latitude}` +
    `&longitude=${location.longitude}` +
    `&current=temperature_2m,weather_code,is_day` +
    `&temperature_unit=fahrenheit` +
    `&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
        widgetsElement.innerHTML += `
        <div class="widget">
            <h3>Weather</h3>
            <p>Error: ${err}</p>
        </div>
        `;
        return;
    }

    const data = await response.json();

    const temperature = Math.round(data.current.temperature_2m);
    const weatherCode = data.current.weather_code;


    widgetsElement.innerHTML += `
    <div class="widget">
        <h3>Weather</h3>
        <p>${temperature} °F ${getIcon(weatherCode)}</p>
    </div>
    `;
}

function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            error => {
                reject(error);
            }
        );
    });
}

function getIcon(code) {
    if (code == 0) {
        return "☀️";
    }
    if (code > 0 && code <= 3) {
        return "⛅";
    }
    if (code == 45 || code <= 48) {
        return "🌫️";
    }
    if (code >= 51 && code <= 67) {
        return "🌧️";
    }
    if (code >= 71 && code <= 77) {
        return "🌨️";
    }
    if (code >= 80 && code <= 82) {
        return "🌧️";
    }
    if (code >= 95) {
        return "⛈️";
    }
    return "🌤️";
}

async function createNasaWidget(widgetsElement) {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=2026-01-01&api_key=${API_KEY}`)
    if (!response.ok) {
        widgetsElement.innerHTML += `<p>Error: ${err}</p>`;
        return;
    }
    const data = await response.json();
    let media;
    if (data.media_type === "image") {
        media = `<img src="${data.url}"/>`;
    } else {
        media = `<video src="${data.url}" controls></video>`;
    }
    console.log(data)

    widgetsElement.innerHTML += `
        <div class="widget">
            <h3>${data.title}</h3>
            ${media}
            <p>${data.explanation.slice(0,100)}...</p>
        </div>
    `;
}
# Custom Tab

A simple new-tab page for your browser.

<img width="1245" height="872" alt="image" src="https://github.com/user-attachments/assets/57c49bed-1490-41a8-9529-089a67f326e2" />

## Demo

https://kira-iovenko.github.io/custom-tab/

## Features
- Live clock and date
- Google search
- Custom website shortcuts
- Random background images
- Dynamic widgets

## Running Locally

Clone the repository and install dependencies:

```
git clone https://github.com/kira-iovenko/custom-tab.git
cd custom-tab
npm install
```

Create local env file:

```
cp .env.example .env
```

Then open .env and add your values:

```
VITE_NASA_API_KEY=your_actual_key_here
VITE_GITHUB_USER=your_github_username
```

You can get a free NASA API key from https://api.nasa.gov.
The github widget uses the username from VITE_GITHUB_USER.

Start the server:

```
npm run dev

```

Open http://localhost:5173/custom-tab in your web browser.

## Made using

- HTML
- CSS
- Node.js + vanilla Javascript
- Local Storage API
- Github API
- NASA APOD API
- Open Meteo API

## Author

Made with ❤️ by [@kira-iovenko](https://github.com/kira-iovenko)

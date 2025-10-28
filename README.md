# ESP32 Firebase Web App

This project is a simple web application that displays temperature and humidity data sent from an ESP32 device. The data is stored in and read from Google Firebase Realtime Database.

## Features

*   Displays real-time temperature and humidity data.
*   Uses Firebase Realtime Database to get the latest data.

## How it Works

The ESP32 device reads data from a DHT11 sensor and sends it to the Firebase Realtime Database. This web application then listens for changes in the database and updates the displayed values in real-time.

## Configuration Steps

To use this web application, you need to configure your Firebase project and update the configuration in the `index.html` file.

### 1. Firebase Project Setup

1.  Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2.  In the project dashboard, click on "Add app" and select the "Web" platform (`</>`).
3.  Follow the on-screen instructions to register your app.
4.  After registering the app, you will be provided with a `firebaseConfig` object. Copy this object.

### 2. Update `index.html`

1.  Open the `public/index.html` file.
2.  Find the `firebaseConfig` variable.
3.  Replace the placeholder values with the values from your Firebase project's `firebaseConfig` object.

```html
<script>
// REPLACE WITH YOUR web app's Firebase configuration
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
</script>
```

### 3. ESP32 Configuration

Make sure the `dataPath` variable in `app.js` matches the path used in your ESP32 code to send the data to the Firebase Realtime Database.

```javascript
// --- KONFIGURASI PATH ---
// Path ini HARUS SAMA dengan variabel 'path' di program ESP32 Anda
var dataPath = "dht11_data"; // Path utama tempat ESP32 melakukan push data
// ------------------------
```

## Deployment

This project is ready to be deployed to Firebase Hosting.

### 1. Install Firebase CLI

If you haven't already, install the Firebase CLI globally:

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Firebase

If you haven't already, initialize Firebase in your project directory:

```bash
firebase init
```

Select "Hosting" and follow the prompts.

### 4. Deploy

Deploy your web app to Firebase Hosting:

```bash
firebase deploy --only hosting
```

After deployment, your web app will be available at the URL provided by Firebase.
### [➡️ Try the Live Version Here! ⬅️](https://trial-data-f9065.web.app)

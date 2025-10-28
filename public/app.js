// --- KONFIGURASI PATH ---
// Path ini HARUS SAMA dengan yang ada di program ESP Anda
var tempPath = "dht11/temperature"; // Path untuk Suhu
var humidPath = "dht11/humidity";  // Path untuk Kelembaban
// ------------------------


// Get a database reference
const databaseTempRef = database.ref(tempPath);
const databaseHumidRef = database.ref(humidPath);

// Variabel untuk menyimpan nilai (opsional)
var tempReading;
var humidReading;

// Pasang listener untuk data SUHU
// Ini akan otomatis ter-update setiap kali ESP mengirim data baru
databaseTempRef.on('value', (snapshot) => {
  tempReading = snapshot.val();
  console.log("Suhu: " + tempReading);
  
  // Menampilkan data ke elemen HTML dengan id "reading-temp"
  // .toFixed(2) digunakan untuk membulatkan angka menjadi 2 desimal (misal: 27.50)
  document.getElementById("reading-temp").innerHTML = tempReading.toFixed(2);
  
}, (errorObject) => {
  console.log('Gagal membaca data suhu: ' + errorObject.name);
});


// Pasang listener untuk data KELEMBABAN
databaseHumidRef.on('value', (snapshot) => {
  humidReading = snapshot.val();
  console.log("Kelembaban: " + humidReading);
  
  // Menampilkan data ke elemen HTML dengan id "reading-humid"
  document.getElementById("reading-humid").innerHTML = humidReading.toFixed(2);
  
}, (errorObject) => {
  console.log('Gagal membaca data kelembaban: ' + errorObject.name);
});

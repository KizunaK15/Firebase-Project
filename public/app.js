// --- KONFIGURASI PATH ---
// Path ini HARUS SAMA dengan variabel 'path' di program ESP32 Anda
var dataPath = "dht11_data"; // Path utama tempat ESP32 melakukan push data
// ------------------------


// Get a database reference ke path utama
const databaseDataRef = database.ref(dataPath);

// Variabel untuk menyimpan nilai (opsional)
var tempReading;
var humidReading;

// Pasang listener untuk data BARU
// Kita gunakan query (orderByKey + limitToLast) 
// untuk mengambil 1 data (child) TERAKHIR yang baru ditambahkan (di-push)
databaseDataRef.orderByKey().limitToLast(1).on('value', (snapshot) => {
    
    console.log("Menerima snapshot data terbaru...");

    // Snapshot dari query limitToLast(1) berisi 1 child.
    // Kita perlu loop (meskipun hanya 1) untuk mendapatkan datanya.
    snapshot.forEach((childSnapshot) => {
        
        // childSnapshot.val() adalah objek data yang dikirim ESP
        // contoh: { temperature: 25.5, humidity: 60, timestamp: ... }
        var data = childSnapshot.val();
        
        // Ambil data suhu dan kelembaban dari objek tersebut
        tempReading = data.temperature;
        humidReading = data.humidity;

        console.log("Suhu terbaru: " + tempReading);
        console.log("Kelembaban terbaru: " + humidReading);

        // --- Update Elemen HTML ---
        
        // Dapatkan elemen HTML
        var tempElement = document.getElementById("reading-temp");
        var humidElement = document.getElementById("reading-humid");

        // Tampilkan data ke elemen HTML
        // (Pengecekan 'if (element)' adalah praktik baik untuk menghindari error)
        if (tempElement) {
            // .toFixed(2) membulatkan angka menjadi 2 desimal
            tempElement.innerHTML = tempReading.toFixed(2);
        } else {
            console.log("Elemen 'reading-temp' tidak ditemukan.");
        }
        
        if (humidElement) {
            // .toFixed(2) membulatkan angka menjadi 2 desimal
            humidElement.innerHTML = humidReading.toFixed(2);
        } else {
            console.log("Elemen 'reading-humid' tidak ditemukan.");
        }
    });

}, (errorObject) => {
    console.log('Gagal membaca data dari path ' + dataPath + ': ' + errorObject.name);
});
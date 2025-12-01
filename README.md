# GIS Application with Leaflet.js

Aplikasi GIS berbasis web menggunakan Leaflet.js untuk visualisasi peta interaktif.

## Fitur

- Menampilkan peta interaktif menggunakan OpenStreetMap
- Menambahkan marker dengan klik pada peta
- Menyimpan lokasi marker
- Menghapus marker
- Responsive design

## Instalasi

1. Pastikan Node.js dan npm sudah terinstall
2. Install dependencies untuk backend:
   ```bash
   cd backend
   npm install
   ```
3. Buat file `.env` di folder `backend` dengan konten:
   ```
   MONGODB_URI=mongodb://localhost:27017/gis_app
   PORT=3000
   ```
4. Jalankan server backend:
   ```bash
   node server.js
   ```
5. Buka file `frontend/index.html` di browser untuk mengakses aplikasi

## Teknologi

- Frontend: HTML5, CSS3, JavaScript, Leaflet.js
- Backend: Node.js, Express.js, MongoDB

## Penggunaan

1. Klik pada peta untuk menambahkan marker
2. Gunakan tombol "Tambah Marker" untuk menambahkan marker di tengah peta
3. Klik tombol "Simpan Marker" untuk menyimpan marker
4. Klik tombol "Hapus" pada popup marker untuk menghapus marker

## Lisensi

MIT

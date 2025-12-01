// Initialize the map centered on Indonesia
const map = L.map('map').setView([-2.5489, 118.0149], 5);

// Add OpenStreetMap tiles with attribution
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Array to store markers
let markers = [];

// Function to add a marker
function addMarker(lat, lng, popupContent = 'Lokasi Baru') {
    const marker = L.marker([lat, lng], {
        draggable: true
    }).addTo(map);
    
    // Create popup content with delete button
    const popupContentHtml = `
        <div class="popup-content">
            <b>${popupContent}</b><br>
            Latitude: ${lat.toFixed(6)}<br>
            Longitude: ${lng.toFixed(6)}<br>
            <button class="delete-marker" data-id="${marker._leaflet_id}">Hapus</button>
        </div>
    `;
    
    // Bind popup to marker
    marker.bindPopup(popupContentHtml);
    
    // Add to markers array
    markers[marker._leaflet_id] = marker;
    
    return marker;
}

// Handle map click to add new marker
map.on('click', function(e) {
    addMarker(e.latlng.lat, e.latlng.lng, 'Lokasi Baru');
});

// Handle marker deletion
map.on('popupopen', function(e) {
    const popup = e.popup;
    const marker = popup._source;
    
    // Add click event to delete button
    setTimeout(() => {
        const deleteBtn = document.querySelector('.delete-marker');
        if (deleteBtn) {
            deleteBtn.onclick = function() {
                const markerId = this.getAttribute('data-id');
                if (markers[markerId]) {
                    map.removeLayer(markers[markerId]);
                    delete markers[markerId];
                }
            };
        }
    }, 100);
});

// Add initial marker
addMarker(-6.200000, 106.816666, 'Jakarta');

// Function to delete all markers
function deleteAllMarkers() {
    Object.values(markers).forEach(marker => {
        map.removeLayer(marker);
    });
    markers = [];
}

// Add delete all button click handler
document.getElementById('deleteAllMarkers')?.addEventListener('click', deleteAllMarkers);

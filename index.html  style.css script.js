<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UAE E-Waste Recycling Centers</title>
    <!-- Google Maps API -->
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap" async defer></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>UAE E-Waste Recycling Centers</h1>
    <div id="map"></div>
    <div class="sidebar">
        <ul id="center-list">
            <!-- Recycling centers will be dynamically listed here -->
        </ul>
    </div>

    <script src="script.js"></script>
</body>
</html>
body {
    background-color: #121212; /* Dark background for the body */
    color: white; /* Light text color */
    font-family: Arial, sans-serif;
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
}

h1 {
    text-align: center;
    margin-top: 20px;
    font-size: 2em;
}

#map {
    height: 70%;
    width: 100%;
}

.sidebar {
    background-color: #1e1e1e;
    color: white;
    padding: 20px;
    height: 30vh;
    overflow-y: auto;
    position: absolute;
    bottom: 0;
    width: 100%;
    font-size: 1.2em;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar ul li {
    margin: 10px 0;
    cursor: pointer;
    padding: 5px;
    background-color: #333;
    border-radius: 5px;
}

.sidebar ul li:hover {
    background-color: #555;
}
// Recycling center data
const recycling_centers = [
    { "name": "EnviroServe", "location": "Dubai Industrial City, Saih Shuaib 3, Site No. 30014, Dubai, UAE", "lat": 24.9221, "lon": 55.1390, "contact": "+971 4 885 2434", "website": "https://enviroserve.org/" },
    { "name": "Green Solutions", "location": "Warehouse: LIU10 BC 05, Jebel Ali, Dubai, UAE", "lat": 25.0550, "lon": 55.1421, "contact": "+971 4 354 4223", "website": "https://www.greensolutionsuae.com/" },
    { "name": "E-Scrappy Recyclers", "location": "Dubai, UAE", "lat": 25.276987, "lon": 55.296249, "contact": "+971 4 221 1141", "website": "https://www.escrappy.ae/" },
    { "name": "WAT (Electronic Asset Disposition Services)", "location": "Dubai, UAE", "lat": 25.276987, "lon": 55.296249, "contact": "+971 52 201 2378", "website": "https://wat.ae/" },
    { "name": "RECAPP", "location": "Abu Dhabi, UAE", "lat": 24.4539, "lon": 54.3773, "contact": "info@gorecapp.com", "website": "https://www.gorecapp.com/" },
    { "name": "Dubai Recycling Centres", "location": "Various locations including Deira, Bur Dubai, and Downtown Dubai", "lat": 25.276987, "lon": 55.296249, "contact": "Contact local municipality for details", "website": "https://www.bayut.com/mybayut/how-recycle-electronic-waste-dubai/" },
    { "name": "Al Qaisar Recycling", "location": "Ajman, UAE", "lat": 25.4110, "lon": 55.4783, "contact": "+971 50 5462353", "website": "https://alqaisarrecycling.com/" },
    { "name": "Ecyclex International Recycling", "location": "Al Qusais Industrial Area 4, Dubai, UAE", "lat": 25.2790, "lon": 55.3507, "contact": "800-3292539", "website": "https://www.dubizzle.com/blog/property/e-waste-recycling-dubai/" },
    { "name": "Public Services Department - E-Waste Pick-up", "location": "Al Qusaidat, Ras Al-Khaimah, UAE", "lat": 25.7710, "lon": 55.9432, "contact": "+971-72270035", "website": "https://stg.rak.ae/wps/portal/rak/e-services/govt/rak-pswd/waste-management-agency/wma-e-waste-pick-up" },
    { "name": "Gulf IT Scrap", "location": "Ajman, UAE", "lat": 25.3997, "lon": 55.4786, "contact": "info@gulfitscrap.com", "website": "https://www.gulfitscrap.com/Location/ajman" },
    { "name": "Virogreen Middle East", "location": "Dubai, UAE", "lat": 25.2769, "lon": 55.2962, "contact": "+971 55 5061485", "website": "https://www.facebook.com/virogreenuae/" },
    { "name": "Mr. Cheaply Junk Removal Services", "location": "Serving all seven emirates", "lat": 25.276987, "lon": 55.296249, "contact": "info@mrcheaply.com", "website": "https://mrcheaply.com/" }
];

let map;

// Initialize Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 24.4539, lng: 54.3773 },  // Center on UAE
        zoom: 10,
        mapTypeId: 'roadmap', // Regular map style
    });

    // Add markers for each recycling center
    recycling_centers.forEach(center => {
        const marker = new google.maps.Marker({
            position: { lat: center.lat, lng: center.lon },
            map: map,
            title: center.name,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<b>${center.name}</b><br>${center.location}<br><a href="${center.website}" target="_blank">Website</a><br>Contact: ${center.contact}`
        });

        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    });

    // Populate the sidebar with center names
    createSidebarList();
}

// Function to populate the sidebar list with center names
function createSidebarList() {
    const listContainer = document.getElementById("center-list");

    recycling_centers.forEach(function(center) {
        const listItem = document.createElement("li");
        listItem.innerHTML = center.name;
        listItem.onclick = function() {
            map.setCenter({ lat: center.lat, lng: center.lon });
            map.setZoom(13);

            const marker = new google.maps.Marker({
                position: { lat: center.lat, lng: center.lon },
                map: map,
                title: center.name,
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `<b>${center.name}</b><br>${center.location}<br><a href="${center.website}" target="_blank">Website</a><br>Contact: ${center.contact}`
            });

            infoWindow.open(map, marker);
        };
        listContainer.appendChild(listItem);
    });
}


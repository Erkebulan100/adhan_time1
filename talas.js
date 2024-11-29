// Function to display current time
function displayCurrentTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Function to fetch and display prayer times
async function fetchPrayerTimes() {
    const city = 'Talas'; // City name
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Kyrgyzstan&method=2`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.code === 200) {
            const timings = data.data.timings;
            document.getElementById('fajr').textContent = timings.Fajr;
            document.getElementById('dhuhr').textContent = timings.Dhuhr;
            document.getElementById('asr').textContent = timings.Asr;
            document.getElementById('maghrib').textContent = timings.Maghrib;
            document.getElementById('isha').textContent = timings.Isha;
        } else {
            console.error('Error fetching prayer times:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Initialize the page
function init() {
    displayCurrentTime();
    setInterval(displayCurrentTime, 1000); // Update time every second
    fetchPrayerTimes(); // Fetch prayer times on page load
}

// Run the init function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

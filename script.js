document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    const service = document.getElementById('serviceType').value;
    const whatsappNumber = "919645141508"; // നിന്റെ നമ്പർ ഇവിടെ നൽകുക

    // ലൊക്കേഷൻ എടുക്കാൻ ശ്രമിക്കുന്നു
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // ലൊക്കേഷൻ കിട്ടിയാൽ
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const mapLink = `https://www.google.com/maps?q=${lat},${lon}`;
            
            sendWhatsApp(name, phone, service, mapLink, whatsappNumber);
        }, function(error) {
            // ലൊക്കേഷൻ കിട്ടിയില്ലെങ്കിൽ (Permission denied)
            alert("Location access denied. Sending booking without location.");
            sendWhatsApp(name, phone, service, "Location not shared", 919645141508);
        });
    } else {
        // ബ്രൗസർ സപ്പോർട്ട് ചെയ്യുന്നില്ലെങ്കിൽ
        sendWhatsApp(name, phone, service, "Geolocation not supported", 919645141508);
    }
});

// വാട്സാപ്പിലേക്ക് അയക്കുന്ന ഫങ്ക്ഷൻ
function sendWhatsApp(name, phone, service, location, number) {
    const message = `*New Booking Request*%0A` + 
                    `--------------------------%0A` +
                    `*Name:* ${name}%0A` +
                    `*Phone:* ${phone}%0A` +
                    `*Service:* ${service}%0A` +
                    `*Location:* ${location}%0A%0A` +
                    `Please check the map link above for the customer location.`;

    const whatsappURL = `https://wa.me/${919645141508}?text=${message}`;
    window.open(whatsappURL, '_blank');
}
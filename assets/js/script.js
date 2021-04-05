// Elements from index.html.
var representBTN = document.getElementById("representatives");
var homeBTN = document.getElementById("home-btn");
var submit = document.getElementById("address-btn");
var addressValue = document.getElementById("address-input");
var senateCont = document.getElementById("government-container");

// My API key.
const API_KEY = "AIzaSyC4aO3DIiD3MlMl-9VjHhOEr_BuTNQ1ATM";

// Switch to the representatives page.
representBTN.addEventListener("click", function(){
    location.href = "representative.html";
})

// When the home page loads.
window.addEventListener("load", function(){
    // This Google API is used to find all state government positions for a given region.
    // We are always using california.
    fetch(`https://civicinfo.googleapis.com/civicinfo/v2/representatives/ocd-division%2Fcountry%3Aus%2Fstate%3Aca?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        // If there are any offices for the region.
        if (data.offices){
            // Go through all of the position.
            for (i = 0; i < data.offices.length; i++){
                // Get the name of the current position.
                var title = data.offices[i].name;
                // Shortcut so this doesnt have to be typed out.
                var officialIndices = data.offices[i].officialIndices
                // Go through each official for that position.
                for (j = 0; j < officialIndices.length; j++){
                    // Get the name of that official.
                    var name = data.officials[officialIndices[j]].name;
                    // Get the official's party.
                    var party = data.officials[officialIndices[j]].party;
                    // Get the official's image.
                    var image = data.officials[officialIndices[j]].photoUrl;
                    // Get the official's phone number.
                    var phone = data.officials[officialIndices[j]].phones[0];
                    // Get the official's website URL.
                    var url = data.officials[officialIndices[j]].urls[0];
    
                    // Create the new element with the information from the API.
                    createEle(senateCont, name, title, party, phone, url, image);
                }
            }
        }
    })

})

// Create a new element for each representative.
function createEle(container, name, title, party,  phone, url, image){
    // The rep's name, position, and party.
    var rep = document.createElement("h5");
    rep.innerHTML = name + " - " + title + ": <br>" + party;

    // The rep's image.
    var photo = document.createElement("img");
    photo.src = image;
    photo.alt = "No image available";

    // The rep's phone number.
    var phoneNumber = document.createElement("h6");
    phoneNumber.innerHTML = "Phone Number: " + phone;
    // The rep's website.
    var website = document.createElement("h6");
    website.innerHTML = "Website: " + url;

    // Append the representative to the container.
    container.appendChild(rep);
    // Append the photo to the container.
    container.appendChild(photo);
    // Append the phone number to the container.
    container.appendChild(phoneNumber);
    // Append the website to the container.
    container.appendChild(website);
}

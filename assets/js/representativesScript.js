// Elements from representatives.html
var homeBTN = document.getElementById("home-btn");
var submit = document.getElementById("address-btn");
var addressValue = document.getElementById("address-input");
var senateCont = document.getElementById("senate-container");
var assemblyCont = document.getElementById("assembly-container");
var clearBtn = document.getElementById("clear-history");

// My API key.
const API_KEY = "AIzaSyC4aO3DIiD3MlMl-9VjHhOEr_BuTNQ1ATM";


// Go to home page.
homeBTN.addEventListener("click", function(){
    location.href = "index.html";
})

// When the page loads.
window.addEventListener("load", function(){
    // Get address from local storage if it exists.
    var address = localStorage.getItem("Address");
    // If there is an address.
    if (address){
        // Call the API with that address.
        callAPI(address);
        // Reformat the address so it is human readable.
        addressValue.value = address.split("%20").join(" ");
    }
})

// When the submit button is clicked.
submit.addEventListener("click", function(){
    // Reformat the address so the API can read it.
    var address = addressValue.value.split(" ").join("%20");

    // Clear any previous search results.
    clearResults();

    // Put the address in local storage.
    localStorage.setItem("Address", address);
    // Call the API with the address.
    callAPI(address);

    
})

// When the clear button is clicked.
clearBtn.addEventListener("click", function(){
    // Remove the item from local storage.
    localStorage.removeItem("Address");
    // Set the search bar to be blank.
    addressValue.value = "";
    // Clear the search results.
    clearResults();
})

// Call the API with whatever address you give it.
function callAPI(address){
    // The Google Civic Information API call, uses my API key and a given Address.
    // This call gets the Legislative Upper Body.
    fetch(`https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${address}&roles=legislatorUpperBody&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        // If there are any offices listed for this address.
        if (data.offices){
            // For each different position.
            for (i = 0; i < data.offices.length; i++){
                // Get the name of the position.
                var title = data.offices[i].name;
                // This is an abbreviation so this doesn't have to be typed out 10 times.
                var officialIndices = data.offices[i].officialIndices
                // Go through each person for that position.
                for (j = 0; j < officialIndices.length; j++){
                    // Get the name of the official.
                    var name = data.officials[officialIndices[j]].name;
                    // Get the part that official is associated with.
                    var party = data.officials[officialIndices[j]].party;
                    // Get the photo URL if there is one.
                    var image = data.officials[officialIndices[j]].photoUrl;
                    // Get the official's phone number.
                    var phone = data.officials[officialIndices[j]].phones[0];
                    // Get the official's website URL.
                    var url = data.officials[officialIndices[j]].urls[0];
    
                    // Create a new element with all the required information.
                    createEle(senateCont, name, title, party, phone, url, image);
                }
            }
        }
    })

    // This call gets the Legislative Lower Body.
    fetch(`https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${address}&roles=legislatorLowerBody&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        // If there are any offices listed for this address.
        if (data.offices){
            // For each different position.
            for (i = 0; i < data.offices.length; i++){
                // Get the name of the position.
                var title = data.offices[i].name;
                // This is an abbreviation so this doesn't have to be typed out 10 times.
                var officialIndices = data.offices[i].officialIndices
                // Go through each person for that position.
                for (j = 0; j < officialIndices.length; j++){
                    // Get the name of the official.
                    var name = data.officials[officialIndices[j]].name;
                    // Get the part that official is associated with.
                    var party = data.officials[officialIndices[j]].party;
                    // Get the photo URL if there is one.
                    var image = data.officials[officialIndices[j]].photoUrl;
                    // Get the official's phone number.
                    var phone = data.officials[officialIndices[j]].phones[0];
                    // Get the official's website URL.
                    var url = data.officials[officialIndices[j]].urls[0];
    
                    // Create a new element with all the required information.
                    createEle(assemblyCont, name, title, party, phone, url, image);
                }
            }
        }
    })
}

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

// Clear search results.
function clearResults(){
    // While the senate container has elements in it.
    while (senateCont.firstChild){
        // Remove the first element.
        senateCont.removeChild(senateCont.firstChild);
    }
    // Re add the "Senate" element since it gets cleared unintentionally.
    var header = document.createElement("h3");
    header.innerHTML = "Senate";
    senateCont.appendChild(header);

    // While the assembly container has elements in it.
    while (assemblyCont.firstChild){
        // Remove the first element.
        assemblyCont.removeChild(assemblyCont.firstChild);
    }
    // Re add the "Assembly" element since it gets cleared unintentionally.
    header = document.createElement("h3");
    header.innerHTML = "House";
    assemblyCont.appendChild(header);
}
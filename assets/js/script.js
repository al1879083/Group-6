var representBTN = document.getElementById("representatives");

representBTN.addEventListener("click", function(){
    location.href = "representatives.html";
})

							representativesScript.js
              
              
var homeBTN = document.getElementById("home-btn");

const API_KEY = "9a6160ae-4803-4e22-b06c-6f4432dd4608";

homeBTN.addEventListener("click", function(){
    location.href = "index.html";
})

window.addEventListener("load", function(){
    fetch("https://v3.openstates.org/people.geo?lat=34.052235&lng=-118.243683&apikey=9a6160ae-4803-4e22-b06c-6f4432dd4608")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
})
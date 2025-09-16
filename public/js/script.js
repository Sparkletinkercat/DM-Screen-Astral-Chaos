// Function to set a value in sessionStorage
function setSessionValue(key, value) {sessionStorage.setItem(key, value);}

function getSessionValue(key) {return sessionStorage.getItem(key);}



function openTab(tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add('active');

    setSessionValue("openedTab", tabName)
}

function defaultTab (other) {
  var tabName = getSessionValue("openedTab");
  if (tabName != null) {openTab(tabName);}
  else {openTab(other);}
}

function confirmForm (event, info) {
  if (!confirm(info)) {
    // Prevent form submission if the user cancels
    event.preventDefault();
  }
}

async function fetchNames(number) {
  fetch('/api/?results=' + number)
    .then(response => response.json())
    .then(data => displayNames(data))
    .catch(error => console.error('Error:', error));
}

function displayNames (data) {
  console.log(data.results)
  var names = data.results;

  // Delete old names. 
  namecontent = document.getElementsByClassName("name");
  for (i = 0; i < namecontent.length; i++) {
    namecontent[i].remove();
  }

  // Enter in new names
  for (i = 0; i < names.length; i++) {
    var newName = document.createElement("p");
    newName.className = "name";
    newName.textContent = names[i].name.first + " " + names[i].name.last;

    var parentElement = document.getElementById("namesTab");
    parentElement.appendChild(newName);
  }

}

function getUrlDetails() {
  var location = window.location;
  var urlClasses = document.getElementsByClassName("url");
  
  for (let i = 0; i < urlClasses.length; i++) {urlClasses[i].value = location.pathname + location.search;}
}

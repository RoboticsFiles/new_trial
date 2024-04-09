function toggleMenu() {
  var sidenav = document.getElementById("mySidenav");
  if (sidenav.style.width === "80%") {
    sidenav.style.width = "0";
  } else {
    sidenav.style.width = "80%";
  }
}

document.addEventListener('click', function(event) {
  var sidenav = document.getElementById("mySidenav");
  var header = document.getElementById("myHeader");
  if (event.target !== sidenav && !sidenav.contains(event.target) && event.target !== header && !header.contains(event.target)) {
      // Click occurred outside the sidebar and header, close it
      sidenav.style.width = "0";
  }
});


       

function loadImageData(callback) {
  fetch('imageDatao.json')
      .then(response => response.json())
      .then(data => callback(data))
      .catch(error => console.error('Error loading image data:', error));
}

function loadImage(types) {
  // Clear previous images
  document.getElementById("imageContainer").innerHTML = "";

  loadImageData(function(images) {
      images.forEach(function(image) {
          // Check if the image contains all selected types
          if (types.every(type => image.types.includes(type))) {
              var img = document.createElement("img");
              img.src = image.path;
              img.style.width = "47%";
              img.style.marginLeft = "2%";
              img.style.marginTop = "1.5%";
              img.style.borderRadius = "3px";
              document.getElementById("imageContainer").appendChild(img);
          }
      });
  });
}

// Call loadImage function with an array of selected types

  



let selectedCategories = [];

function toggleCategoryColor(event) {
  event.target.classList.toggle("selected");
}


function applyCategories() {
  selectedCategories = [];
  const buttons = document.querySelectorAll('.category');

  
  buttons.forEach(button => {
    if (button.classList.contains('selected')) {
      selectedCategories.push(button.textContent);
    }
  });

  if(selectedCategories.length>0){
    console.log(selectedCategories); // Print selected categories array in the console
    loadImage(selectedCategories);
  }
}

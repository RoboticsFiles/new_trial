var sidebar = false;
function toggleMenu() {
  var sidenav = document.getElementById("mySidenav");
  if (sidenav.style.width === "80%") {
    sidebar = false;
    sidenav.style.width = "0";
  } else {
    sidebar = true;
    sidenav.style.width = "80%";
  }
}

document.addEventListener('click', function(event) {

  var sidenav = document.getElementById("mySidenav");
  var header = document.getElementById("myHeader");

  if (event.target !== sidenav && !sidenav.contains(event.target) && event.target !== header && !header.contains(event.target)) {
      // Click occurred outside the sidebar and header, close it
      sidenav.style.width = "0";
      sidebar = false;
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
              img.classList.add('modal-image'); // Add a class to the image for easier selection
              img.addEventListener('click', function() {
                openModal(image.path);
              });
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

  if(selectedCategories.length > 0) {
    console.log(selectedCategories); // Print selected categories array in the console
    loadImage(selectedCategories);
  }
}

// Modal functionality

function openModal(imagePath) {
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");
  var downloadBtn = document.getElementById("downloadBtn");
  var backBtn = document.getElementById("backBtn");

  if(sidebar === false){
    setTimeout(function() {
      // Your code to be executed after the delay
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.flexDirection = "column"; 
      modalImg.src = imagePath;
  }, 20);

  }

  downloadBtn.addEventListener('click', function() {
    downloadImage(imagePath);
  });

  backBtn.addEventListener('click', function() {setTimeout(function() {
    closeModal();
    }, 20);
  });
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}
 

function downloadImage(imagePath) {
  var filename = imagePath.split('/').pop(); // Assuming the imagePath is a URL
  
  // Create a temporary link element
  var link = document.createElement('a');
  
  // Set the href attribute to the image path
  link.href = imagePath;
  
  // Set the download attribute to specify the filename
  link.download = filename;
  
  // Append the link to the document body
  document.body.appendChild(link);
  
  // Trigger a click event on the link to initiate the download
  link.click();
  
  // Remove the link from the document body
  document.body.removeChild(link);
}


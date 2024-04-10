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
        img.src = 'Images/' + image.path; // Update the image path
        img.style.width = "47%";
        img.style.marginLeft = "2%";
        img.style.marginTop = "1.5%";
        img.style.borderRadius = "3px";
        img.classList.add('modal-image');
        img.addEventListener('click', function() {
          openModal('Images/' + image.path); // Update the image path
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

  modal.style.display = "block";
  modalImg.src = imagePath;

  downloadBtn.addEventListener('click', function() {
    downloadImage(imagePath);
  });

  backBtn.addEventListener('click', function() {
    closeModal();
  });
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}
 

function downloadImage(imagePath) {
  var filename = imagePath.split('/').pop();
  var link = document.createElement('a');
  link.href = imagePath;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

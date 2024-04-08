  // Function to check if image exists
  function imageExists(url, callback) {
    var img = new Image();
    img.onload = function() {
      callback(true);
    };
    img.onerror = function() {
      callback(false);
    };
    img.src = url;
  }
  let i = 1;

  function loadImage() {
      // URL of the image
      var imageUrl = `images/${i}.jfif`; // Replace with the actual image URL
    
      // Check if image exists and show it if available
      imageExists(imageUrl, function(exists) {
          if (exists) {
              var img = document.createElement("img");
              img.src = imageUrl;
              img.style.width = "47%"
              img.style.marginLeft = "1.5%"
              img.style.marginTop = "2px"
              img.style.borderRadius = "3px"
              document.getElementById("imageContainer").appendChild(img); // its a div
              i++;

              img.loading = "lazy";
              // Load the next image recursively
              loadImage();
          } else {
              console.log("Image not found");
              var para = document.getElementById('para');
              para.textContent = 'Done';

          }
      });
  }
  
  // Start loading images
  loadImage();
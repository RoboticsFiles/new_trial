function loadImageData(callback) {
    fetch('imageData.json')
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error loading image data:', error));
}

function loadImage(types) {
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
loadImage(["character","with_car"]);

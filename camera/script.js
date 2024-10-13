let imageDataURL; // Declare imageDataURL globally

// Access the capture button element
const captureButton = document.getElementById('button');

// Access the circle element
const circle = document.getElementById('circle');

// Access the photo element
const photoElement = document.getElementById('photo');

// Add a click event listener to the capture button
captureButton.addEventListener('click', async () => {
    try {
        // Access the user's camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        // Access the video element
        const video = document.createElement('video');
        video.srcObject = stream;
        
        // Wait for the video to load metadata
        await video.play();
        
        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the video frame onto the canvas
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert the canvas to a data URL
        imageDataURL = canvas.toDataURL('image/png'); // Assign imageDataURL globally
        
        // Display the captured image in the .photo element
        photoElement.style.backgroundImage = `url(${imageDataURL})`;
        photoElement.style.backgroundSize = 'cover'; // Cover the element with the full-size image
        
        // Remove the .eject-photo class if it's already added
        photoElement.classList.remove('eject-photo');
        
        // Set a timeout to allow the DOM to update before re-adding the class
        setTimeout(() => {
            // Display the captured image with eject-photo animation
            photoElement.classList.add('eject-photo');
        }, 0);
        
        // Set the opacity of the circle to 1 (flash)
        circle.style.opacity = '1';
        
        // Stop the camera stream
        stream.getTracks().forEach(track => track.stop());
        
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
});

// Add a click event listener to the download button
const downloadButton = document.getElementById('downloadButton');
downloadButton.addEventListener('click', () => {
    // Create a temporary anchor element
    const downloadLink = document.createElement('a');
    
    // Set the href attribute to the data URL of the captured image
    downloadLink.href = imageDataURL;
    
    // Set the download attribute with the desired file name
    downloadLink.download = 'captured_image.png'; // Set the filename for the downloaded image
    
    // Programmatically trigger a click event on the anchor element
    downloadLink.click();
});

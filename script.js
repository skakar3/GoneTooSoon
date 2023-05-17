// The following is the script for Gone Too Soon

// Event listener to fade out the loading screen after a delay
window.addEventListener('load', function () {
   setTimeout(function () {
      const loadingScreen = document.querySelector('#loading-screen');
      loadingScreen.classList.add('fade-out');
   }, 1000);
});

// Event listener for artist statement link and modal image
const artistStatementLink = document.querySelector('nav a[href="#statement"]');
const modalImage = document.getElementById('modal-image');

// Open modal image when artist statement link is clicked
artistStatementLink.addEventListener('click', (event) => {
   event.preventDefault();
   modalImage.style.display = 'block';
});

// Close modal image when modal image or outside area is clicked
modalImage.addEventListener('click', () => {
   modalImage.style.display = 'none';
});

document.addEventListener('click', (event) => {
   // Close modal image if clicked outside of it or artist statement link
   if (event.target !== artistStatementLink && event.target !== modalImage) {
      modalImage.style.display = 'none';
   }
});

let currentTitleElement = null;

// Function to show the title
function showTitle(event) {
   const image = event.target;
   const title = image.getAttribute('data-title');

   // Remove the current title element, if exists
   if (currentTitleElement) {
      document.body.removeChild(currentTitleElement);
      currentTitleElement = null;
   }

   const titleElement = document.createElement('div');
   titleElement.className = 'title';
   titleElement.textContent = title;
   document.body.appendChild(titleElement);
   currentTitleElement = titleElement;

   // Hide the title when the image is off the screen
   const rect = image.getBoundingClientRect();
   const imageTop = rect.top;
   const imageBottom = rect.bottom;
   const windowHeight = window.innerHeight;

   if (imageBottom < 0 || imageTop > windowHeight) {
      titleElement.style.display = 'none';
   }

   // Hide the title when the user clicks anywhere else on the screen
   document.addEventListener('click', hideTitle);

   function hideTitle(event) {
      if (event.target !== image && event.target !== titleElement) {
         titleElement.style.display = 'none';
         document.removeEventListener('click', hideTitle);
      }
   }
}

// Add event listeners for images to show the title
const images = document.querySelectorAll('.image');
images.forEach((image) => {
   image.addEventListener('mouseover', showTitle);
   image.addEventListener('click', showTitle);
});

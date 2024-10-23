// Log that the script is running
console.log('Content script is running');

// Track button clicks
const submitButton = document.querySelector('button[type="submit"]');
if (submitButton) {
  submitButton.addEventListener('click', function() {
    sendDataToServer('form-submit');
    console.log('Form submit button clicked');
  });
} else {
  console.log('Submit button not found');
}

// Track link clicks
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function() {
    const url = this.getAttribute('href');
    if (url.includes("blogs")) {
      sendDataToServer('visit-blogs');
      console.log('Visited blogs');
    } else if (url.includes("projects")) {
      sendDataToServer('visit-projects');
      console.log('Visited projects');
    } else if (url.includes("drive.google.com")) {
      sendDataToServer('visit-resume');
      console.log('Visited resume');
    }
  });
});

// Track scrolling
window.addEventListener('scroll', function() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      sendDataToServer('scrolled-to-end');
      console.log('Scrolled to the end of the page');
    }
  });

function sendDataToServer(interactionType) {
  const timestamp = new Date().toISOString();
  // Send data to backend server using AJAX request
  fetch('http://localhost:3005/track-interaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ interactionType, timestamp })
  })
  .then(response => {
    console.log('Interaction tracked successfully:', interactionType, timestamp);
  })
  .catch(error => {
    console.error('Error tracking interaction:', error);
  });
}

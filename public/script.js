document.getElementById('printSaveButton').addEventListener('click', function() {
    console.log("Good")
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Send data to the backend
    fetch('/save-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            window.print();
        } else {
            alert('Failed to save the form. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});


const host = 'localhost:4000/clinic';



document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('signup-form');
    const alertDiv = document.getElementById('alert-message');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signup-username').value;
        const contact = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        const userData = {
            name,
            contact,
            password,
        };

        try {
            const response = await axios.post(`http://${host}/user/sign-up`, userData);
            
            if (response.data.success) {
                showAlert('Signup successful!', 'success');
            } else {
                showAlert('Something went wrong. Please try again.', 'danger');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                showAlert(error.response.data, 'danger');
            } else {
                showAlert('Something went wrong. Please try again.', 'danger');
            }
        }
    });

    function showAlert(message, type) {
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        alertDiv.style.display = '';

        setTimeout(() => {
            alertDiv.style.display = 'none';
        }, 5000);
    }
});
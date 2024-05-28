
const host = 'localhost:4000/clinic';


document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('login-form');
    const alertDiv = document.getElementById('alert-message');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const contact = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const loginData = {
            contact,
            password
        };

        try {
            const response = await axios.post(`http://${host}/doctor/login`, loginData);
            const { success, data } = response.data;
            if (success) {
                localStorage.setItem('doctor-token', data);
                window.location.href = 'slot.html';
            } else {
                showAlert('Something went wrong. Please try again.', 'danger');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                showAlert(error.response.data , 'danger');
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
const host = 'localhost:4000/clinic'

const token = localStorage.getItem('doctor-token');
axios.defaults.headers.common['authorization'] = token;

document.addEventListener('DOMContentLoaded', async () => {
    const slotForm = document.getElementById('slotForm');
    const slotsDiv = document.getElementById('slots');
    const appointmentsDiv = document.getElementById('appointments');

    async function fetchSlots() {
        try {
            const response = await axios.get(`http://${host}/slot`);
            const slots = response.data.data;
            slotsDiv.innerHTML = '';
            slots.forEach(slot => {
                slotsDiv.innerHTML += `
                    <div class="card mb-3">
                        <div class="card-body">
                            <p class="card-text">Date: ${slot.date.split('T')[0]}</p>
                            <p class="card-text">Time: ${slot.time}</p>
                        </div>
                    </div>
                `;
            });
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    }

    async function fetchAppointments() {
        try {
            const response = await axios.get(`http://${host}/appointment/doctor`);
            const appointments = response.data.data;
            console.log(appointments)
            appointmentsDiv.innerHTML = '';
            appointments.forEach(appointment => {
                appointmentsDiv.innerHTML += `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Doctor: ${appointment.user.name}</h5>
                            <p class="card-text">Date: ${appointment.slot.date.split('T')[0]}</p>
                            <p class="card-text">Time: ${appointment.slot.time}</p>
                            <p class="card-text">Type: ${appointment.type}</p>
                        </div>
                    </div>
                `;
            });
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    }


    await fetchSlots();
    await fetchAppointments()

    slotForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = {
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
        };

        console.log(formData)

        try {
            await axios.post(`http://${host}/slot`, formData);
            alert('Slot created successfully');
            slotForm.reset();
            await fetchSlots();
        } catch (error) {
            console.error('Error creating slot:', error);
        }
    });
});

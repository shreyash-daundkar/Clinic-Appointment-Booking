

const host = 'localhost:4000/clinic';


const token = localStorage.getItem('user-token');
axios.defaults.headers.common['authorization'] = token;


document.addEventListener('DOMContentLoaded', async () => {
    const doctorSelect = document.getElementById('doctor');
    const dateSelect = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentsDiv = document.getElementById('appointments');

    async function fetchDoctors() {
        try {
            const response = await axios.get(`http://${host}/doctor/`);
            console.log(response.data)
            const doctors = response.data.data;
            doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
            doctors.forEach(doctor => {
                doctorSelect.innerHTML += `<option value="${doctor.id}">${doctor.name}</option>`;
            });
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    }

    async function fetchDates(doctorId) {
        try {
            const response = await axios.get(`http://${host}/slot/${doctorId}`);
            console.log(response.data)

            const slots = response.data.data.map(slot => {
                return {
                    date: slot.date.split('T')[0],
                    time: slot.time,
                    id: slot.id,
                }
            });
            console.log(slots);
    
            dateSelect.innerHTML = '<option value="">Select Date</option>';
            slots.forEach(slot => {
                dateSelect.innerHTML += `<option value="${slot.id}">${slot.date} At ${slot.time}</option>`;
            });
        } catch (error) {
            console.error('Error fetching dates:', error);
        }

    }

    async function fetchAppointments() {
        try {
            const response = await axios.get(`http://${host}/appointment/user`);
            const appointments = response.data.data;
            console.log(appointments)
            appointmentsDiv.innerHTML = '';
            appointments.forEach(appointment => {
                appointmentsDiv.innerHTML += `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Doctor: ${appointment.doctor.name}</h5>
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

    doctorSelect.addEventListener('change', async () => {
        const doctorId = doctorSelect.value;
        if (doctorId) {
            await fetchDates(doctorId);
        } else {
            dateSelect.innerHTML = '<option value="">Select Date</option>';
            timeSelect.innerHTML = '<option value="">Select Time</option>';
        }
    });

    
    await fetchDoctors();
    await fetchAppointments();

    
    appointmentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = {
            slotId: +dateSelect.value,
            type: document.getElementById('appointmentType').value,
            note: document.getElementById('note').value,
        };

        try {
            await axios.post(`http://${host}/appointment/`, formData);
            alert('Appointment booked successfully');
            appointmentForm.reset();
            await fetchAppointments();
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    });
});

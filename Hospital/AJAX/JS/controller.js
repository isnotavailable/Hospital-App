// Function to submit the edit form using AJAX
function submitEditForm() {
    const form = document.getElementById('editHospitalForm');
    const data = {
        id: form.editHospitalId.value,
        name: form.editName.value,
        address: form.editAddress.value,
        phone: form.editPhone.value,
        email: form.editEmail.value
    };
    var ID = form.editHospitalId.value;

    $.ajax({
        url: '/Hospital/AJAX/PUT/editHospital.cshtml',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            alert('Hospital updated successfully!');
            window.location.href = `/Hospital/AJAX/GET/single.cshtml/${ID}`; // Redirect with ID as query parameter
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('An error occurred while updating the hospital.');
        }
    });
}

// Function to show the Edit Form modal
function showEditForm(button) {
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const address = button.getAttribute('data-address');
    const phone = button.getAttribute('data-phone');
    const email = button.getAttribute('data-email');

    // Set values in the modal fields
    document.getElementById("editHospitalId").value = id;
    document.getElementById("editName").value = name;
    document.getElementById("editAddress").value = address;
    document.getElementById("editPhone").value = phone;
    document.getElementById("editEmail").value = email;

    // Display the modal
    $('#editModal').modal('show');
}

// Function to close the Edit Form modal
function closeEditForm() {
    $('#editModal').modal('hide');
}

// Function to delete the hospital using AJAX
function deleteHospital(id) {
    if (confirm("Are you sure you want to delete this hospital?")) {
        $.ajax({
            url: `/Hospital/AJAX/POST/delete.cshtml?id=${id}`,
            type: 'POST',
            success: function(response) {
                alert('Hospital deleted successfully!');
                window.location.href = '/Hospital/AJAX/GET/default.cshtml';
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                alert('An error occurred while deleting the hospital.');
            }
        });
    }
}

// Function to add a new hospital using AJAX
function addHospital() {
    const form = document.getElementById('addHospitalForm');
    if (!form.name.value || !form.address.value || !form.phone.value || !form.email.value) {
        alert('All fields must be filled.');
        return;
    }
    const data = {
        name: form.name.value,
        address: form.address.value,
        phone: form.phone.value,
        email: form.email.value
    };

    $.ajax({
        url: '/Hospital/AJAX/POST/add.cshtml',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            alert('Hospital added successfully!');
            window.location.href = `/Hospital/AJAX/GET/default.cshtml`;
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('An error occurred while adding the hospital.');
        }
    });
}

// Function to view hospital details
function viewHospital(id) {
    window.location.href = `/Hospital/AJAX/GET/single.cshtml/${id}`;
}

// Function to display the list of hospitals using AJAX
function fetchHospitals() {
    $("#loader").show();

    $.ajax({
        url: '/Hospital/AJAX/GET/GET.cshtml',
        type: 'GET',
        success: function(response) {
            $("#loader").hide();
            const hospitals = response;
            const hospitalList = $("#hospitalList");
            hospitalList.empty();

            if (hospitals && hospitals.length > 0) {
                hospitals.forEach(hospital => {
                    const hospitalId = parseInt(hospital.ID, 10);
                    if (!isNaN(hospitalId)) {
                        const hospitalItem = `
                            <div id="hospital-${hospitalId}" class="border mb-2 p-2">
                                <span>${hospital.Name}</span>
                                <button onclick="viewHospital(${hospitalId})" class="btn btn-info btn-sm ml-2">View</button>
                            </div>`;
                        hospitalList.append(hospitalItem);
                    }
                });
            } else {
                hospitalList.append("<p>No hospitals found.</p>");
            }
        },
        error: function(xhr, status, error) {
            $("#loader").hide();
            console.error('Error:', error);
            alert('Failed to fetch hospitals.');
        }
    });
}

//$(document).ready(function () {
//    ShowEmployeeData();
//});

//function ShowEmployeeData() {
//    $.ajax({
//        url: '/Ajax/Employeelist',
//        type: 'Get',
//        dataType: 'json',
//        contentType: 'application/json;charset=utf-8;',
//        success: function (result, status, xhr) {
//            var object = '';
//            if (result.status == "Success" && result.data.length > 0) {

//                $.each(result.data, function (index, item) {
//                    object += `
//                        <tr>
//                            <td>${item.id}</td>
//                            <td>${item.name}</td>
//                            <td>${item.city}</td>
//                            <td>${item.state}</td>
//                            <td>${item.salary}</td>
//                            <td>
//                                <button class="btn btn-primary me-2" onclick="Edit(${item.id})">Edit</button>
//                                <button class="btn btn-danger" onclick="openDeleteModal(${item.id})">Delete</button>
//                            </td>
//                        </tr>`;
//                });

//            }
//            else {
//                object += '<tr><td colspan="6">No Record</td></tr>';
//            }
//            $('#table_data').html(object);

//            console.log(result);
//            console.log(result.data);
//        },
//        error: function () {
//            alert("Data can't Get");
//        }
//    });
//};

//function validateEmployeeForm() {
//    let isValid = true;

//    // Hide all error messages
//    $('#errName, #errCity, #errState, #errSalary').addClass('d-none');

//    if (!$('#name').val().trim()) {
//        $('#errName').removeClass('d-none');
//        isValid = false;
//    }

//    if (!$('#city').val().trim()) {
//        $('#errCity').removeClass('d-none');
//        isValid = false;
//    }

//    if (!$('#state').val().trim()) {
//        $('#errState').removeClass('d-none');
//        isValid = false;
//    }

//    let salary = $('#salary').val();
//    if (!salary || salary <= 0) {
//        $('#errSalary').removeClass('d-none');
//        isValid = false;
//    }

//    return isValid;
//}

//$('#name, #city, #state, #salary').on('input', function () {
//    $(this).next('.text-danger').addClass('d-none');
//});

//$('#btnAddEmployee').click(function () {
//    ClearTextBox();
//    $('#EmployeeModal').modal('show');
//    $('#divid').hide();
//    $('#AddEmployee').css('display', 'block');
//    $('#UpdateEmployee').css('display', 'none');
//    $('#EmployeeHeading').text('Add Employee');
//})


//function AddEmployee() {

//    if (!validateEmployeeForm()) {
//        return;
//    }
//    var objData = {
//        Name: $('#name').val().trim(),
//        City: $('#city').val().trim(),
//        State: $('#state').val().trim(),
//        Salary: $('#salary').val()
//    };

//    $.ajax({
//        url: '/Ajax/AddEmployee',
//        type: 'Post',
//        data: objData,
//        success: function (response, stut, xhr) {
//            console.log(response);
//            if (response.status == "Success") {
//                if (response.statusCode == 201) {
//                    alert(response.message);
//                    ClearTextBox();
//                    HideAddModel();
//                    ShowEmployeeData();
//                }
//                else {
//                    alert(response.message);
//                }
//            }
//            else {
//                alert("Something Went Wrong !")
//            }
//        },
//        error: function () {
//            alert("Data can't Saved!");
//        }
//    });
//};

//function HideAddModel() {
//    $('#EmployeeModal').modal('hide');
//};
//function ClearTextBox() {
//        $('#name').val(''),
//        $('#city').val(''),
//        $('#state').val(''),
//        $('#salary').val(''),
//        $('#id').val('')
//};

//function openDeleteModal(id) {
//    $('#deleteEmployeeId').val(id);
//    $('#DeleteEmployeeModal').modal('show');
//}
//function Delete() {
//    var id = $('#deleteEmployeeId').val();
//        $.ajax({
//            url: '/Ajax/Delete?id=' + id,
//            success: function (res) {
//                if (res.status == "Success") {
//                    alert(res.message);
//                    $('#DeleteEmployeeModal').modal('hide');
//                    ShowEmployeeData();
//                }
//                else if (res1.status == "NotFound") {
//                    alert(res1.message);
//                }
//                else {
//                    alert("Something Went Wrong !")
//                }
//            },
//            error: function () {
//                alert("Data can't Delete!");
//            }
//        });
//};

//function Edit(id) {
//    $.ajax({
//        url: '/Ajax/Edit?id=' + id,
//        type: 'Get',
//        //contentType: 'appliction/json;charset=utf-8',
//        success: function (response) {
//            $('#EmployeeModal').modal('show');
//            $('#id').val(response.id);
//            $('#name').val(response.name);
//            $('#city').val(response.city);
//            $('#state').val(response.state);
//            $('#salary').val(response.salary);

//            $('#EmployeeHeading').text('Update Employee');
//            $('#AddEmployee').css('display', 'none');
//            $('#UpdateEmployee').css('display', 'block');

//            //$('#AddEmployee').hide();
//            //$('#UpdateEmployee').show();
//        },
//        error: function () {
//            alert('data not Found');
//        }
//    })
//};


//function UpdateEmployee() {
//    debugger
//    var objData = {
//        Id: $('#id').val(),
//        Name: $('#name').val(),
//        City: $('#city').val(),
//        State: $('#state').val(),
//        Salary: $('#salary').val()
//    }
//    $.ajax({
//        url: '/Ajax/Update',
//        type: 'Post',
//        data: objData,
//        success: function (response) {
//            if (response.msg != null) {
//                alert(response.msg + " for id = " + objData.Id);
//            }
//            HideAddModel();
//            ShowEmployeeData();
//            ClearTextBox();
//        },
//        error: function () {
//            alert("Data can't Updated!");
//        }
//    });
//}


$(document).ready(function () {
    ShowEmployeeData();

    // remove error when typing
    $('#name, #city, #state, #salary').on('input', function () {
        $(this).next('.text-danger').addClass('d-none');
    });

    // open add modal
    $('#btnAddEmployee').click(function () {
        ClearTextBox();
        ClearValidation();
        $('#EmployeeModal').modal('show');
        $('#divid').hide();
        $('#id').hide();
        $('#AddEmployee').show();
        $('#UpdateEmployee').hide();
        $('#EmployeeHeading').text('Add Employee');
    });
});

/* ================= VALIDATION ================= */

function validateEmployeeForm() {
    let isValid = true;
    ClearValidation();

    if (!$('#name').val().trim()) {
        $('#errName').removeClass('d-none');
        isValid = false;
    }

    if (!$('#city').val().trim()) {
        $('#errCity').removeClass('d-none');
        isValid = false;
    }

    if (!$('#state').val().trim()) {
        $('#errState').removeClass('d-none');
        isValid = false;
    }

    let salary = $('#salary').val();
    if (!salary || salary <= 0) {
        $('#errSalary').removeClass('d-none');
        isValid = false;
    }

    return isValid;
}

function ClearValidation() {
    $('#errName, #errCity, #errState, #errSalary').addClass('d-none');
}

/* ================= CRUD ================= */

function ShowEmployeeData() {
    $.ajax({
        url: '/Ajax/Employeelist',
        type: 'GET',
        success: function (result) {
            let rows = '';

            if (result.status == "Success" && result.data.length > 0) {
                $.each(result.data, function (i, item) {
                    rows += `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.city}</td>
                            <td>${item.state}</td>
                            <td>${item.salary}</td>
                            <td>
                                <button class="btn btn-primary me-2" onclick="Edit(${item.id})">Edit</button>
                                <button class="btn btn-danger ms-2" onclick="openDeleteModal(${item.id})">Delete</button>
                            </td>
                        </tr>`;
                });
            } else {
                rows = `<tr><td colspan="6">No Record Found</td></tr>`;
            }

            $('#table_data').html(rows);
        },
        error: function () {
            alert("Failed to load data");
        }
    });
}

function AddEmployee() {
    if (!validateEmployeeForm()) return;

    $.ajax({
        url: '/Ajax/AddEmployee',
        type: 'POST',
        data: {
            Name: $('#name').val().trim(),
            City: $('#city').val().trim(),
            State: $('#state').val().trim(),
            Salary: $('#salary').val()
        },
        success: function (response) {
                    console.log(response);
                    if (response.status == "Success") {
                        if (response.statusCode == 201) {
                            alert(response.message);
                            ClearTextBox();
                            HideAddModel();
                            ShowEmployeeData();
                        }
                        else {
                            alert(response.message);
                        }
                    }
                    else {
                        alert("Something Went Wrong !")
                    }
        },
        error: function () {
            alert("Employee not saved for error");
        }
    });
}


function Edit(id) {
    ClearValidation();
        $.ajax({
            url: '/Ajax/Edit?id=' + id,
            type: 'Get',
            success: function (response) {
                $('#EmployeeModal').modal('show');
                $('#divid').show();
                $('#id').show();
                $('#id').val(response.id);
                $('#name').val(response.name);
                $('#city').val(response.city);
                $('#state').val(response.state);
                $('#salary').val(response.salary);

                $('#EmployeeHeading').text('Update Employee');
                $('#AddEmployee').css('display', 'none');
                $('#UpdateEmployee').css('display', 'block');

                //$('#AddEmployee').hide();
                //$('#UpdateEmployee').show();
            },
            error: function () {
                alert('data not Found');
            }
        })
    };

function UpdateEmployee() {
    if (!validateEmployeeForm()) return;

    $.ajax({
        url: '/Ajax/Update',
        type: 'POST',
        data: {
            Id: $('#id').val(),
            Name: $('#name').val(),
            City: $('#city').val(),
            State: $('#state').val(),
            Salary: $('#salary').val()
        },
        success: function (response) {
            console.log(response);
            if (response.status == "Success") {
                if (response.statusCode == 201) {
                    alert(response.message);
                    ClearTextBox();
                    HideAddModel();
                    ShowEmployeeData();
                }
                else {
                    alert(response.message);
                }
            }
            else {
                alert("Something Went Wrong !")
            }  
        },
        error: function () {
            alert("Record  not Updated for error");
        }
    });
}

function openDeleteModal(id) {
    $('#deleteEmployeeId').val(id);
    $('#DeleteEmployeeModal').modal('show');
}

function Delete() {
    let id = $('#deleteEmployeeId').val();
    $.ajax({
        url: '/Ajax/Delete?id=' + id,
        success: function (res) {
            $('#DeleteEmployeeModal').modal('hide');
            alert(res.message);
            ShowEmployeeData();
        }
    });
}

/* ================= HELPERS ================= */

function HideAddModel() {
    $('#EmployeeModal').modal('hide');
}

function ClearTextBox() {
    $('#id, #name, #city, #state, #salary').val('');
}

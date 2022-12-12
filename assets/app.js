let allReminders = [
    { id: 1, title: "1 chi eslatma", date: '2022-12-11', time: '15:30', priority: '2' },
    { id: 2, title: '2 chi eslatma', date: '2022-12-12', time: '21:40', priority: '1' }
];

let reminderTypes = [
    { id: 1, title: "Muhim !!!"},
    { id: 2, title: "O'rta"},
    { id: 3, title: "Muhim emas"}
];

function create() {
    let text = document.getElementById('inputNomi').value;
    let date = document.getElementById('inputKun').value;
    let time = document.getElementById('inputSoat').value;
    let priority = document.getElementById('inputDaraja').value;
    let error = document.querySelector('.error');

    if (text == '' || date == '' || time == '' || priority == '') {
        return error.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Xatolik!</strong> Forma toliq kiritilmagan.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
    }

    for (let i = 1; i < allReminders.length; i++) {
        if (date == allReminders[i].date && time == allReminders[i].time) {
            return error.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Xatolik!</strong> Bu kunga qaydlar kiritilgan.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        }
    }

    let remindersLength = (allReminders.length + 1) ?? 0;

    allReminders.push({
        id: remindersLength,
        title: text,
        date: date,
        time: time,
        priority: priority
    });

    showReminders();

    document.getElementById('inputNomi').value=""
    document.getElementById('inputKun').value=""
    document.getElementById('inputSoat').value=""
    document.getElementById('inputDaraja').value="2"
    
}

function edit(id){
    let reminder = getReminder(id);

    document.getElementById('textUpdateID').textContent = reminder.id
    document.getElementById('inputUpdateID').value = reminder.id
    document.getElementById('inputUpdateNomi').value = reminder.title
    document.getElementById('inputUpdateKun').value = reminder.date
    document.getElementById('inputUpdateSoat').value = reminder.time
    document.getElementById('inputUpdateDaraja').value = reminder.priority
    document.querySelector('.update-error').innerHTML = '';


    $(document).ready(function() {
        $('#updateReminder').modal('show');
    });
}

function update(){
    let reminderID   = document.getElementById('inputUpdateID').value;
    let text = document.getElementById('inputUpdateNomi').value;
    let date = document.getElementById('inputUpdateKun').value;
    let time = document.getElementById('inputUpdateSoat').value;
    let priority = document.getElementById('inputUpdateDaraja').value;
    let id = parseInt(reminderID);
    let error = document.querySelector('.update-error');

    if (text == '' || date == '' || time == '' || priority == '') {
        return error.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Xatolik!</strong> Forma toliq kiritilmagan.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
    }

    for (let i = 1; i < allReminders.length; i++) {
        if (date == allReminders[i].date && time == allReminders[i].time) {
            return error.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Xatolik!</strong> Bu kunga qaydlar kiritilgan.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        }
    }

    let newData = {
        id: id,
        title: text,
        date: date,
        time: time,
        priority: priority
    };

    let needleIndex;
    allReminders.map((reminder, index) => {
        if (reminder.id === id){
            needleIndex = index;
        }
    });

    allReminders[needleIndex] = newData;

    $(document).ready(function() {
        $('#updateReminder').modal('hide');
    });

    showReminders();

}

function getReminder(globID){
    let reminder;
    let id = parseInt(globID);
    allReminders.map((localReminder) => {
        if (localReminder.id === id){
            reminder = localReminder;
        }
    });
    return reminder;
}

function getPriority(globID){
    let text;
    let id = parseInt(globID);
    reminderTypes.map((type) => {
        if (type.id === id){
            text = type.title;
        }
    });
    return text;
}

function showReminders(){

    var data = `<table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nomi</th>
                <th scope="col">Kun</th>
                <th scope="col">Soat</th>
                <th scope="col">Muhimlik</th>
                <th scope="col"></th>
            </tr>
        </thead>
    <tbody>`;

    for(reminder of allReminders){
        data += `<tr>
            <th scope="row">` + reminder.id + `</th>
            <td>` + reminder.title + `</td>
            <td>` + reminder.date + `</td>
            <td>` + reminder.time + `</td>
            <td>` + getPriority(reminder.priority) + `</td>
            <td><a class="btn btn-sm btn-outline-info" onclick="edit(` + reminder.id + `)"><i class="fas fa-edit"></i> Taxrirlash</a></td>
        </tr>`;
    }

    data += `</tbody></table>`;

    document.querySelector('#js-qaydlar').innerHTML = data;
}


document.addEventListener("DOMContentLoaded", function(event){
    showReminders();
});

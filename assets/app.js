let allReminders = [];

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
    console.log(id);

    let reminder = 0;

    document.getElementById('inputUpdateNomi').value="asa"
    document.getElementById('inputUpdateKun').value=""
    document.getElementById('inputUpdateSoat').value=""
    document.getElementById('inputUpdateDaraja').value="2"


    $(document).ready(function() {
        $('#updateReminder').modal('show');
    });
}

function update(el){
    let id   = document.getElementById('inputUpdateID').value;
    let text = document.getElementById('inputUpdateNomi').value;
    let date = document.getElementById('inputUpdateKun').value;
    let time = document.getElementById('inputUpdateSoat').value;
    let priority = document.getElementById('inputUpdateDaraja').value;

    console.log(id);
    console.log(text);

    /*allReminders.forEach(function (reminder, index) {

    });*/

    /*({
        title: text,
        date: date,
        time: time,
        priority: priority
    })*/

    $(document).ready(function() {
        $('#updateReminder').modal('hide');
    });

    showReminders();

}

function getReminder(id){
    return allReminders[id];
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

    /*allReminders.forEach(function(reminder, index){
        //console.log(index);
        console.log(reminder);
    })*/

    for(reminder of allReminders){
        //console.log(index);
        console.log(reminder);
        data += `<tr>
            <th scope="row">` + reminder.id + `</th>
            <td>` + reminder.title + `</td>
            <td>` + reminder.date + `</td>
            <td>` + reminder.time + `</td>
            <td>` + reminder.priority + `</td>
            <td><a onclick="edit(` + reminder.id + `)">[Edit]</a></td>
        </tr>`;
    }

    data += `</tbody></table>`;

    document.querySelector('#js-qaydlar').innerHTML = data;

}


document.addEventListener("DOMContentLoaded", function(event){
    //showCalendar();
});

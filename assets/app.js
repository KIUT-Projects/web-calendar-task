// let allReminders = [{
//     title: '',
//     date: '',
//     time: '',
// }];

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

    allReminders.push({
        title: text,
        date: date,
        time: time,
        priority: priority
    });

    showReminders();

    document.getElementById('inputNomi').value=""
    document.getElementById('inputKun').value=""
    document.getElementById('inputSoat').value=""
    document.getElementById('inputDaraja').value=""
    
}

function edit(el){
    
}

function showReminders(){

    var data = `<table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">Nomi</th>
                <th scope="col">Kun</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
            </tr>
    </thead>
  <tbody>`;

    for(reminder of allReminders){
        console.log(reminder)
        data += `<tr>
        <th scope="row">` + reminder.title + `</th>
        <td>` + reminder.date + `</td>
        <td>` + reminder.time + `</td>
        <td>` + reminder.priority + `</td>
      </tr>`
    }

    data += `</tbody></table>`;

    document.querySelector('#js-qaydlar').innerHTML = data;

    console.log(allReminders)
}


document.addEventListener("DOMContentLoaded", function(event){
    showCalendar();
  });

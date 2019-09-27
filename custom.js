const studentsList = [{
        id: "102160251",
        name: "Lê Hoàng Lân",
        gender: "Nam",
        faculty: "CNTT"
    },
    {
        id: "102160252",
        name: "Lê Hoàng Lân2",
        gender: "Nam",
        faculty: "CNTT"
    },
    {
        id: "102160253",
        name: "Lê Hoàng Lân3",
        gender: "Nam",
        faculty: "CNTT"
    },
    {
        id: "102160254",
        name: "Lê Hoàng Lân4",
        gender: "Nam",
        faculty: "CNTT"
    }
]
const addClick = () => {
    var form = $("#students");
    var data = JSON.stringify(form.serializeArray());
    console.log(data);
}
const add = student => {
    var table = document.getElementById("students");
    var rows = "<tr><th></th>";
    Object.keys(student).map(key => {
        var property = student[key];
        rows += "<th>" + property + "</th>";
    })
    rows += '<th><button class="btn btn-primary">Show</button><button class="btn btn-danger">Delete</button></th>' + "</tr>";
    table.innerHTML += rows;
    setNumber();
}
const setNumber = () => {
    var rows = Array.prototype.slice.call(document.getElementById("students").rows);
    console.log(rows);
    var stt = 0;
    rows.map(row => {
        if (row.cells[0].innerHTML != "STT") {
            stt += 1;
            row.cells[0].innerHTML = stt;
        }
    })
}
$(document).ready(function () {
    if (localStorage.getItem("name") != null) {
        setNumber();
    }
})
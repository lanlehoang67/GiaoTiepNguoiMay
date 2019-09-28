const addClick = () => {
    var id = document.getElementById("MSSV").value;
    var name = document.getElementById("name").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var faculty = document.getElementById("faculty").value;
    var mark = document.getElementById("mark").value;
    var newStudent = {
        id,
        name,
        gender,
        faculty,
        mark
    }
    if(checkExist(newStudent)){
        alert("the id has already been in database, please try another id");
    }
    else{
        var studentsList = JSON.parse(window.localStorage.getItem("students"));
        if (newStudent != null) {
            studentsList = studentsList === null ? [newStudent] : [...studentsList, newStudent]
    
        }
        window.localStorage.setItem('students', JSON.stringify(studentsList));
        location.href = "/home.html";
    }
   
}
const editClick = () => {
    var id = document.getElementById("MSSV").value;
    var name = document.getElementById("name").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var faculty = document.getElementById("faculty").value;
    var mark = document.getElementById("mark").value;
    var newStudent = {
        id,
        name,
        gender,
        faculty,
        mark
    }
    var studentsList = window.localStorage.getItem("students") == null ? null : JSON.parse(window.localStorage.getItem("students"));
    var filteredStudentsList = removeNullValues(studentsList);
    var index = filteredStudentsList.findIndex(e => e[1] == newStudent[1]);
    if (index != -1) {
        filteredStudentsList[index] = newStudent;

    }
    window.localStorage.setItem('students', JSON.stringify(filteredStudentsList));
    location.href = "/home.html";
}
const removeNullValues = arr => {
    var newArr = arr.filter(e => {
        return e != null;
    })
    return newArr
}
const clearAll = () =>{
    document.getElementById("students").reset()
}
const deleteStudent = row => {
    var selectedRow = row.closest('tr');
    selectedRow.style.display = "none";
    var studentsList = JSON.parse(window.localStorage.getItem("students"));
    var filteredStudentsList = studentsList.filter(val => {
        if (val != null) {
            return val['id'] != selectedRow.cells[1].innerHTML
        }
    })
    window.localStorage.setItem("students", JSON.stringify(filteredStudentsList));
}
const show = row => {
    var selectedRow = row.closest('tr');
    const selectedStudent = {
        id: selectedRow.cells[1].innerHTML,
        name: selectedRow.cells[2].innerHTML,
        gender: selectedRow.cells[3].innerHTML,
        faculty: selectedRow.cells[4].innerHTML,
        mark: selectedRow.cells[5].innerHTML
    }
    window.localStorage.setItem("selectedStudent", JSON.stringify(selectedStudent));
    location.href = "/add.html"
}
const showInformation = () => {
    var student = JSON.parse(window.localStorage.getItem("selectedStudent"));
    if (checkExist(student)) {
        document.getElementById("MSSV").value = student['id'];
        document.getElementById("name").value = student['name']
        student['gender'] == "Nam" ? document.getElementById("male").checked = true : document.getElementById("female").checked = true;
        document.getElementById("faculty").value = student['faculty'];
        document.getElementById("mark").value = student['mark'];
    }
}
const search = () => {
    var input = document.getElementsByClassName("search")[0];
    var table = document.getElementById("students");
    var tr = table.getElementsByTagName("tr");
    for (var i = 1; i < tr.length; i = i + 1) {

        if (tr[i].cells[2].innerHTML.includes(input.value)) {
            tr[i].style.display = "";
        } else tr[i].style.display = "none";
    }
}
const checkExist = e => {
    var students = window.localStorage.getItem("students") == null ? null : JSON.parse(window.localStorage.getItem("students"));
    var checked = false;
    if (students != null) {
        for (var i = 0; i < students.length; i++) {
            if (students[i] != null) {
                if (students[i].id == e.id) {
                    checked = true;
                    break;
                }
            }

        }
    }

    return checked;
}
const sortTable = n => {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("students");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TH")[n];
            y = rows[i + 1].getElementsByTagName("TH")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
const display = () => {
    var students = window.localStorage.getItem("students") == null ? null : JSON.parse(window.localStorage.getItem("students"));
    var table = document.getElementById("students");
    var rows = "";
    if (students != null) {
        students.map(student => {
            if (student != null) {


                rows += "<tr><th></th>";
                Object.keys(student).map(key => {
                    var property = student[key];
                    rows += "<th>" + property + "</th>";
                })
                rows += '<th><button class="primary" onClick=show(this)>Show</button><button class="danger" style="background-color: red" onClick=deleteStudent(this)>Delete</button></th>' + "</tr>";
            }
        })
    }


    table.innerHTML += rows;
    setNumber();
}
const setNumber = () => {
    var rows = Array.prototype.slice.call(document.getElementById("students").rows);
    var stt = 0;
    rows.map(row => {
        if (row.cells[0].innerHTML != "STT") {
            stt += 1;
            row.cells[0].innerHTML = stt;
        }
    })
}
const setColor = e => {
    if(e.style.color === "blue"){
        e.style.color = "black";
    }
    else e.style.color = "blue";
}
const restoreColor = () => {
    var ths = document.getElementsByTagName('TH');
    for(var i = 0;i<5;i=i+1){
        ths[i].style.color = "black"
    }
}
document.addEventListener("DOMContentLoaded", function (event) {
    if (location.href.includes("home.html")) {
        display()
    } else if (location.href.includes("add.html")) {
        showInformation()
    }
});
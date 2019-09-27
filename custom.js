const addClick = () => {
    var id = document.getElementById("MSSV").value;
    var name = document.getElementById("name").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var faculty = document.getElementById("faculty").value;
    var newStudent = {
        id,
        name,
        gender,
        faculty
    }
    console.log(newStudent)
    var studentsList = window.localStorage.getItem("students");
    studentsList =  studentsList == null ? [newStudent] : [...JSON.parse(studentsList), newStudent] 
    window.localStorage.setItem('students',JSON.stringify(studentsList));
    location.href = "/home.html";
}
const deleteStudent = row => {
    $(row).parents("tr").hide();
    var selectedRow = row.closest('tr');
    var studentsList =  JSON.parse(window.localStorage.getItem("students"));
    var filteredStudentsList = studentsList.filter(val=>{
        return val['id'] != selectedRow.cells[1].innerHTML
    })
    window.localStorage.setItem("students", JSON.stringify(filteredStudentsList));
}
const show = row => {
    var selectedRow = row.closest('tr');
    console.log(selectedRow)
    const selectedStudent = {
        id: selectedRow.cells[1].innerHTML,
        name: selectedRow.cells[2].innerHTML,
        gender: selectedRow.cells[3].innerHTML,
        faculty: selectedRow.cells[4].innerHTML
    }
    window.localStorage.setItem("selectedStudent",JSON.stringify(selectedStudent));
    location.href = "/add.html"
}
const showInformation = () => {
   var student = JSON.parse(window.localStorage.getItem("selectedStudent"));
   if(checkExist(student)){
    document.getElementById("MSSVEdit").value = student['id'];
    document.getElementById("nameEdit").value = student['name']
    student['gender'] == "Nam" ? document.getElementById("maleEdit").checked = true : document.getElementById("femaleEdit").checked = true;
    document.getElementById("facultyEdit").value = student['faculty'];
   }
}
const checkExist = e => {
    var students  = JSON.parse(window.localStorage.getItem("students"));
    var checked = false;
    for(var i =0;i< students.length; i++){
        if(students[i].id == e.id){
            checked = true;
            break;
        }
    }
    return checked;
}
const display = () => {
    var students  = JSON.parse(window.localStorage.getItem("students"));
    var table = document.getElementById("students");
    var rows = "";
    students.map(student => {
        rows +="<tr><th></th>";
        Object.keys(student).map(key => {
            var property = student[key];
            rows += "<th>" + property + "</th>";
        })
        rows += '<th><button class="btn btn-primary" onClick=show(this)>Show</button><button class="btn btn-danger" onClick=deleteStudent(this)>Delete</button></th>' + "</tr>";
    })
    
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
$(document).ready(function () {
    if (localStorage.getItem("name") != null && location.href.includes("home.html")) {
        display()
    }
    else if(location.href.includes("add.html")){
        showInformation()
    }
})
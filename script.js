// ======================================================
// STUDENT MANAGEMENT SYSTEM
// script.js
// ======================================================


// ======================================================
// STUDENT DATA
// ======================================================

let students = [];


// Load saved students from LocalStorage

try {

    const savedStudents =
        localStorage.getItem("students");

    if (savedStudents) {

        students =
            JSON.parse(savedStudents);

    }

} catch (error) {

    console.error(
        "Error loading students:",
        error
    );

    students = [];

}


// ======================================================
// PAGE LOAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderStudents();

        updateStats();

        loadDarkMode();

        setupForm();

        setupSearch();

        setupFilters();

    }
);


// ======================================================
// FORM SETUP
// ======================================================

function setupForm() {

    const form =
        document.getElementById(
            "studentForm"
        );


    if (!form) {

        console.error(
            "studentForm not found!"
        );

        return;

    }


    form.addEventListener(
        "submit",
        addStudent
    );

}


// ======================================================
// ADD STUDENT
// ======================================================

function addStudent(event) {

    event.preventDefault();


    // Get values

    const name =
        document
            .getElementById("name")
            .value
            .trim();


    const regno =
        document
            .getElementById("regno")
            .value
            .trim();


    const department =
        document
            .getElementById("department")
            .value;


    const year =
        document
            .getElementById("year")
            .value;


    const email =
        document
            .getElementById("email")
            .value
            .trim();



    // Check empty fields

    if (
        name === "" ||
        regno === "" ||
        department === "" ||
        year === "" ||
        email === ""
    ) {

        showNotification(
            "Please fill all student details!"
        );

        return;

    }



    // Check duplicate register number

    const duplicate =
        students.some(
            function (student) {

                return (
                    student.regno
                        .toLowerCase() ===
                    regno.toLowerCase()
                );

            }
        );


    if (duplicate) {

        showNotification(
            "Register number already exists!"
        );

        return;

    }



    // Create student

    const newStudent = {

        id: Date.now(),

        name: name,

        regno: regno,

        department: department,

        year: year,

        email: email,

        createdAt:
            new Date().toISOString()

    };



    // Add to array

    students.push(
        newStudent
    );



    // Save

    saveStudents();



    // Update screen

    renderStudents();

    updateStats();



    // Clear form

    document
        .getElementById("studentForm")
        .reset();



    // Message

    showNotification(
        "Student added successfully!"
    );



    // Go to student list

    setTimeout(
        function () {

            const studentSection =
                document.getElementById(
                    "students"
                );


            if (studentSection) {

                studentSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        },
        300
    );

}


// ======================================================
// SAVE STUDENTS
// ======================================================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// ======================================================
// RENDER STUDENT TABLE
// ======================================================

function renderStudents() {

    const table =
        document.getElementById(
            "studentTable"
        );


    const emptyState =
        document.getElementById(
            "emptyState"
        );


    if (!table) {

        console.error(
            "studentTable not found!"
        );

        return;

    }



    // Search value

    const searchInput =
        document.getElementById(
            "search"
        );


    const search =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";



    // Department filter

    const departmentFilter =
        document.getElementById(
            "departmentFilter"
        );


    const selectedDepartment =
        departmentFilter
            ? departmentFilter.value
            : "all";



    // Year filter

    const yearFilter =
        document.getElementById(
            "yearFilter"
        );


    const selectedYear =
        yearFilter
            ? yearFilter.value
            : "all";



    // Clear table

    table.innerHTML = "";



    // Filter students

    const filteredStudents =
        students.filter(
            function (student) {


                const matchesSearch =

                    student.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    student.regno
                        .toLowerCase()
                        .includes(search)

                    ||

                    student.email
                        .toLowerCase()
                        .includes(search);



                const matchesDepartment =

                    selectedDepartment ===
                    "all"

                    ||

                    student.department ===
                    selectedDepartment;



                const matchesYear =

                    selectedYear ===
                    "all"

                    ||

                    student.year ===
                    selectedYear;



                return (
                    matchesSearch &&
                    matchesDepartment &&
                    matchesYear
                );

            }
        );



    // No students

    if (
        filteredStudents.length === 0
    ) {

        if (emptyState) {

            emptyState.style.display =
                "block";

        }

        return;

    }



    if (emptyState) {

        emptyState.style.display =
            "none";

    }



    // Add rows

    filteredStudents.forEach(
        function (student) {

            const row =
                document.createElement(
                    "tr"
                );


            const firstLetter =
                student.name
                    .charAt(0)
                    .toUpperCase();



            row.innerHTML = `

                <td>

                    <div class="student-name">

                        <div class="student-avatar">
                            ${escapeHTML(firstLetter)}
                        </div>

                        <strong>
                            ${escapeHTML(student.name)}
                        </strong>

                    </div>

                </td>


                <td>
                    ${escapeHTML(student.regno)}
                </td>


                <td>

                    <span class="department-badge">
                        ${escapeHTML(student.department)}
                    </span>

                </td>


                <td>

                    <
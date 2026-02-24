// ===================== JOB DATA =====================
let jobs = [
    {id:1, title:"Frontend Developer", location:"Pune", salary:"6 LPA", description:"React, HTML, CSS required"},
    {id:2, title:"Backend Developer", location:"Bangalore", salary:"8 LPA", description:"Node.js, MongoDB required"},
    {id:3, title:"Full Stack Developer", location:"Delhi", salary:"10 LPA", description:"MERN Stack required"},
    {id:4, title:"UI/UX Designer", location:"Mumbai", salary:"5 LPA", description:"Figma & Adobe XD"},
    {id:5, title:"Data Analyst", location:"Hyderabad", salary:"7 LPA", description:"Python & SQL required"},
    {id:6, title:"Java Developer", location:"Chandigarh", salary:"9 LPA", description:"Spring Boot & REST APIs"},
    {id:7, title:"Python Developer", location:"Noida", salary:"8 LPA", description:"Django & Flask experience"},
    {id:8, title:"Cyber Security Analyst", location:"Gurgaon", salary:"11 LPA", description:"Network Security & SIEM"},
    {id:9, title:"Cloud Engineer", location:"Bangalore", salary:"14 LPA", description:"AWS & Azure expertise"},
    {id:10, title:"DevOps Engineer", location:"Chennai", salary:"12 LPA", description:"CI/CD, Docker, Kubernetes"},
    {id:11, title:"Machine Learning Engineer", location:"Hyderabad", salary:"18 LPA", description:"TensorFlow & PyTorch"},
    {id:12, title:"AI Engineer", location:"Bangalore", salary:"20 LPA", description:"Deep Learning & NLP"},
    {id:13, title:"Android Developer", location:"Pune", salary:"7 LPA", description:"Kotlin & Firebase"},
    {id:14, title:"iOS Developer", location:"Mumbai", salary:"9 LPA", description:"Swift & iOS frameworks"},
    {id:15, title:"QA Engineer", location:"Delhi", salary:"6 LPA", description:"Manual & Automation testing"},
    {id:16, title:"Business Analyst", location:"Noida", salary:"10 LPA", description:"Requirement gathering & documentation"},
    {id:17, title:"System Administrator", location:"Chandigarh", salary:"8 LPA", description:"Linux & Windows servers"},
    {id:18, title:"Database Administrator", location:"Bangalore", salary:"13 LPA", description:"MySQL & Oracle DB"},
    {id:19, title:"Graphic Designer", location:"Mumbai", salary:"5 LPA", description:"Photoshop & Illustrator"},
    {id:20, title:"Technical Support Engineer", location:"Gurgaon", salary:"4 LPA", description:"Troubleshooting & customer support"},
    {id:21, title:"Blockchain Developer", location:"Hyderabad", salary:"16 LPA", description:"Solidity & Web3"},
    {id:22, title:"Game Developer", location:"Pune", salary:"9 LPA", description:"Unity & Unreal Engine"},
    {id:23, title:"Embedded Systems Engineer", location:"Chennai", salary:"11 LPA", description:"C, C++, Microcontrollers"},
    {id:24, title:"Data Scientist", location:"Bangalore", salary:"22 LPA", description:"Machine Learning & Big Data"},
    {id:25, title:"IT Project Manager", location:"Delhi", salary:"18 LPA", description:"Agile & Scrum methodology"}
];

// ===================== REGISTER =====================
function registerUser(){
    alert("Registered Successfully 🎉");
    window.location.href = "index.html";
}

// ===================== DISPLAY JOBS =====================
function displayJobs(list){
    const container = document.getElementById("jobContainer");
    if(!container) return;

    container.innerHTML = "";

    if(list.length === 0){
        container.innerHTML = "<h3>No jobs found</h3>";
        return;
    }

    list.forEach(job=>{
        container.innerHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p>📍 ${job.location}</p>
                <p>💰 ${job.salary}</p>
                <button onclick="viewDetails(${job.id})">View</button>
            </div>
        `;
    });
}

// ===================== SEARCH =====================
function searchJob(){
    let input = document.getElementById("searchInput");
    if(!input) return;

    let value = input.value.toLowerCase().trim();

    if(value === ""){
        displayJobs(jobs);
        return;
    }

    let filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(value) ||
        job.location.toLowerCase().includes(value) ||
        job.description.toLowerCase().includes(value)
    );

    displayJobs(filtered);
}

// ===================== VIEW DETAILS =====================
function viewDetails(id){
    localStorage.setItem("selectedJob", id);
    window.location.href = "job-details.html";
}

// ===================== LOAD JOB DETAILS =====================
function loadJobDetails(){
    let id = localStorage.getItem("selectedJob");
    if(!id) return;

    let job = jobs.find(j => j.id == id);
    if(!job) return;

    document.getElementById("jobTitle").innerText = job.title;
    document.getElementById("jobLocation").innerText = job.location;
    document.getElementById("jobSalary").innerText = job.salary;
    document.getElementById("jobDesc").innerText = job.description;
}

// ===================== SUBMIT APPLICATION =====================
function submitApplication(){
    let name = document.getElementById("appName").value;
    let email = document.getElementById("appEmail").value;
    let resume = document.getElementById("resume").value;

    if(!name || !email || !resume){
        alert("Please fill all fields");
        return;
    }

    let applications = JSON.parse(localStorage.getItem("applications")) || [];

    let id = localStorage.getItem("selectedJob");
    let job = jobs.find(j => j.id == id);

    applications.push({
        job: job.title,
        name: name,
        email: email,
        resume: resume
    });

    localStorage.setItem("applications", JSON.stringify(applications));

    alert("Application Submitted 🎉");
    window.location.href = "applications.html";
}

// ===================== LOAD APPLICATIONS =====================
function loadApplications(){
    let container = document.getElementById("applicationContainer");
    if(!container) return;

    container.innerHTML = "";

    let applications = JSON.parse(localStorage.getItem("applications")) || [];

    if(applications.length === 0){
        container.innerHTML = "<h3>No Applications Found</h3>";
        return;
    }

    applications.forEach((app, index) => {
        container.innerHTML += `
            <div class="job-card">
                <h3>${app.job}</h3>
                <p><strong>Name:</strong> ${app.name}</p>
                <p><strong>Email:</strong> ${app.email}</p>
                <p><strong>Resume:</strong> ${app.resume}</p>
                <button onclick="updateApplication(${index})">Update</button>
                <button onclick="deleteApplication(${index})">Delete</button>
            </div>
        `;
    });
}

// ===================== UPDATE APPLICATION =====================
function updateApplication(index){
    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    let app = applications[index];

    let newName = prompt("Update Name:", app.name);
    let newEmail = prompt("Update Email:", app.email);
    let newResume = prompt("Update Resume:", app.resume);

    if(!newName || !newEmail || !newResume){
        alert("Update cancelled");
        return;
    }

    applications[index] = {
        ...app,
        name: newName,
        email: newEmail,
        resume: newResume
    };

    localStorage.setItem("applications", JSON.stringify(applications));
    alert("Application Updated ✅");
    loadApplications();
}

// ===================== DELETE APPLICATION =====================
function deleteApplication(index){
    let applications = JSON.parse(localStorage.getItem("applications")) || [];

    if(confirm("Are you sure you want to delete this application?")){
        applications.splice(index, 1);
        localStorage.setItem("applications", JSON.stringify(applications));
        loadApplications();
    }
}

// ===================== AUTO LOAD =====================
document.addEventListener("DOMContentLoaded", function(){
    displayJobs(jobs);
    loadApplications();
});
// ===================== DEFAULT JOB DATA =====================
let topJobs = [
    {id:1, title:"Frontend Developer", company:"TCS", location:"Pune", salary:"6 LPA", description:"React, HTML, CSS required"},
    {id:2, title:"Backend Developer", company:"Infosys", location:"Bangalore", salary:"8 LPA", description:"Node.js, Express, MongoDB required"},
    {id:3, title:"UI/UX Designer", company:"Wipro", location:"Mumbai", salary:"5 LPA", description:"Figma & Adobe XD"},
    {id:4, title:"Data Analyst", company:"Accenture", location:"Hyderabad", salary:"7 LPA", description:"Python & SQL required"},
    {id:5, title:"Full Stack Developer", company:"Cognizant", location:"Chennai", salary:"9 LPA", description:"MERN stack development"},
    {id:6, title:"DevOps Engineer", company:"IBM", location:"Bangalore", salary:"10 LPA", description:"AWS, Docker, CI/CD pipelines"},
    {id:7, title:"Machine Learning Engineer", company:"Capgemini", location:"Pune", salary:"12 LPA", description:"Python, TensorFlow, ML models"},
    {id:8, title:"Cloud Architect", company:"HCL", location:"Noida", salary:"15 LPA", description:"AWS/Azure/GCP architecture"},
    {id:9, title:"Cybersecurity Analyst", company:"Infosys", location:"Bangalore", salary:"11 LPA", description:"Network security & penetration testing"},
    {id:10, title:"Mobile App Developer", company:"Tech Mahindra", location:"Hyderabad", salary:"8 LPA", description:"Flutter / React Native"},
    {id:11, title:"Product Manager", company:"Google India", location:"Bangalore", salary:"18 LPA", description:"Product strategy, roadmap & execution"},
    {id:12, title:"Quality Assurance Engineer", company:"TCS", location:"Mumbai", salary:"6 LPA", description:"Manual & automated testing"},
    {id:13, title:"Business Analyst", company:"Accenture", location:"Chennai", salary:"7 LPA", description:"Requirement gathering & documentation"},
    {id:14, title:"Database Administrator", company:"IBM", location:"Pune", salary:"9 LPA", description:"SQL Server, Oracle DBA"},
    {id:15, title:"Network Engineer", company:"Wipro", location:"Bangalore", salary:"8 LPA", description:"LAN/WAN setup & maintenance"},
    {id:16, title:"Data Scientist", company:"Cognizant", location:"Hyderabad", salary:"13 LPA", description:"Python, R, ML & AI models"},
    {id:17, title:"Embedded Systems Engineer", company:"Intel", location:"Bangalore", salary:"10 LPA", description:"C/C++, IoT, hardware interfacing"},
    {id:18, title:"Software Architect", company:"Microsoft India", location:"Hyderabad", salary:"20 LPA", description:"System design & software solutions"},
    {id:19, title:"AI Researcher", company:"Google AI", location:"Bangalore", salary:"25 LPA", description:"Deep Learning, NLP, Computer Vision"},
    {id:20, title:"Technical Lead", company:"Infosys", location:"Pune", salary:"15 LPA", description:"Team management & project delivery"}
];
// ===================== LOAD JOBS =====================
let storedJobs = JSON.parse(localStorage.getItem("jobs"));

if (!storedJobs || storedJobs.length === 0) {
    localStorage.setItem("jobs", JSON.stringify(defaultJobs));
    storedJobs = defaultJobs;
}

let jobs = storedJobs;

// ===================== LOGIN PROTECTION =====================
document.addEventListener("DOMContentLoaded", function () {

    let loggedIn = localStorage.getItem("loggedIn");
    let registerBtn = document.getElementById("register");

    // Strict check
    if (loggedIn === "true") {
        if (registerBtn) {
            registerBtn.style.display = "none";
        }
    }

    // Always reload jobs from storage
    jobs = JSON.parse(localStorage.getItem("jobs")) || defaultJobs;

    displayJobs(jobs);
});

// ===================== REGISTER =====================
function registerUser() {
    let name = document.getElementById("name")?.value;
    let email = document.getElementById("email")?.value;
    let password = document.getElementById("password")?.value;

    if (!name || !email || !password) {
        alert("Please fill all fields ❌");
        return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Registration Successful ✅");
    window.location.href = "login.html";
}

// ===================== LOGIN =====================
function loginUser() {
    let email = document.getElementById("loginEmail")?.value;
    let password = document.getElementById("loginPassword")?.value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("No user found ❌");
        return;
    }

    if (email === user.email && password === user.password) {
        localStorage.setItem("loggedIn", "true");
        alert("Login Successful ✅");
        window.location.href = "index.html";
    } else {
        alert("Invalid Email or Password ❌");
    }
}

// ===================== LOGOUT =====================
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// ===================== DISPLAY JOBS (NEWEST ON TOP) =====================
function displayJobs(list) {

    const container = document.getElementById("jobContainer");
    if (!container) return;

    container.innerHTML = "";

    if (!list || list.length === 0) {
        container.innerHTML = "<h3>No Jobs Found</h3>";
        return;
    }

    // 🔥 Show newest jobs first
    let sortedJobs = [...list].reverse();

    sortedJobs.forEach(job => {
        container.innerHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p>📍 ${job.location}</p>
                <p>💰 ${job.salary}</p>
                <button onclick="viewDetails(${job.id})">View</button>
            </div>
        `;
    });
}

// ===================== SEARCH =====================
function searchJob() {
    let value = document.getElementById("searchInput")?.value.toLowerCase().trim();

    if (!value) {
        displayJobs(jobs);
        return;
    }

    let filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(value) ||
        job.company.toLowerCase().includes(value) ||
        job.location.toLowerCase().includes(value)
    );

    displayJobs(filtered);
}

// ===================== VIEW DETAILS =====================
function viewDetails(id) {
    localStorage.setItem("selectedJob", id);
    window.location.href = "job-details.html";
}

// ===================== LOAD JOB DETAILS =====================
function loadJobDetails() {
    let id = localStorage.getItem("selectedJob");
    if (!id) return;

    let job = jobs.find(j => j.id == id);
    if (!job) return;

    document.getElementById("jobTitle").innerText = job.title;
    document.getElementById("jobCompany").innerText = job.company;
    document.getElementById("jobLocation").innerText = job.location;
    document.getElementById("jobSalary").innerText = job.salary;
    document.getElementById("jobDesc").innerText = job.description;
}

// ===================== POST JOB (ADD TO TOP) =====================
function postJob() {

    let title = document.getElementById("title")?.value;
    let company = document.getElementById("company")?.value;
    let location = document.getElementById("location")?.value;
    let salary = document.getElementById("salary")?.value;
    let description = document.getElementById("description")?.value;

    if (!title || !company || !location || !salary || !description) {
        alert("Fill all fields ❌");
        return;
    }

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    let newJob = {
        id: Date.now(),
        title,
        company,
        location,
        salary,
        description,
        isPosted: true
    };

    // 🔥 Add to beginning so it shows first
    jobs.unshift(newJob);

    localStorage.setItem("jobs", JSON.stringify(jobs));

    alert("Job Posted Successfully ✅");
    window.location.href = "index.html";
}
// ================= APPLY JOB =================
function openApplyModal(jobId){
    let job = JSON.parse(localStorage.getItem("postedJobs"))?.find(j=>j.id===jobId);
    if(!job){
        alert("Job not found!");
        return;
    }

    // Prompt user for details
    let name = prompt("Enter your Name:");
    let email = prompt("Enter your Email:");
    let degree = prompt("Enter your Degree:");
    let resume = prompt("Enter Resume Link or File:");

    if(!name || !email || !degree || !resume){
        alert("Application cancelled ❌");
        return;
    }

    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    applications.push({
        jobId: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        description: job.description,
        name,
        email,
        degree,
        resume
    });

    localStorage.setItem("applications", JSON.stringify(applications));
    alert("Applied Successfully ✅");
}

// ================= DISPLAY APPLIED JOBS =================
function displayAppliedJobs(containerId="appliedJobsContainer"){
    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    let container = document.getElementById(containerId);
    container.innerHTML = "";

    if(applications.length===0){
        container.innerHTML = "<h3 style='text-align:center;'>No applied jobs yet ❌</h3>";
        return;
    }

    applications.forEach(app => {
        container.innerHTML += `
            <div class="job-card">
                <h2>${app.title}</h2>
                <p><strong>Company:</strong> ${app.company}</p>
                <p><strong>Location:</strong> ${app.location}</p>
                <p><strong>Salary:</strong> ${app.salary}</p>
                <p><strong>Applied By:</strong> ${app.name}</p>
                <p><strong>Email:</strong> ${app.email}</p>
                <p><strong>Degree:</strong> ${app.degree}</p>
                <p><strong>Resume:</strong> <a href="${app.resume}" target="_blank">View</a></p>
            </div>
        `;
    });
}

// ===================== APPLICATION SYSTEM =====================
function submitApplication() {
    let name = document.getElementById("appName")?.value;
    let email = document.getElementById("appEmail")?.value;
    let resume = document.getElementById("resume")?.value;

    if (!name || !email || !resume) {
        alert("Fill all fields ❌");
        return;
    }

    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    let id = localStorage.getItem("selectedJob");
    let job = jobs.find(j => j.id == id);

    applications.push({
        job: job.title,
        name,
        email,
        resume
    });

    localStorage.setItem("applications", JSON.stringify(applications));
    alert("Application Submitted ✅");
    window.location.href = "applications.html";
}

function loadApplications() {
    let container = document.getElementById("applicationContainer");
    if (!container) return;

    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    container.innerHTML = "";

    if (applications.length === 0) {
        container.innerHTML = "<h3>No Applications</h3>";
        return;
    }

    applications.forEach((app, index) => {
        container.innerHTML += `
            <div class="job-card">
                <h3>${app.job}</h3>
                <p>Name: ${app.name}</p>
                <p>Email: ${app.email}</p>
                <p>Resume: ${app.resume}</p>
                <button onclick="deleteApplication(${index})">Delete</button>
            </div>
        `;
    });
}

function deleteApplication(index) {
    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    applications.splice(index, 1);
    localStorage.setItem("applications", JSON.stringify(applications));
    loadApplications();
}
function goToApplications() {
    window.location.href = "applications.html";
}
function postJob() {

    let title = document.getElementById("title").value;
    let company = document.getElementById("company").value;
    let location = document.getElementById("location").value;

    if (!title || !company || !location) {
        alert("Please fill all fields!");
        return;
    }

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    let newJob = {
        id: Date.now(),
        title: title,
        company: company,
        location: location,
        postedBy: localStorage.getItem("username")
    };

    jobs.push(newJob);
    localStorage.setItem("jobs", JSON.stringify(jobs));

    alert("Job Posted Successfully ✅");

    window.location.href = "index.html";
}
function goToPostJob() {
    window.location.href = "post-job.html";
}
// ===================== LOAD POSTED JOBS =====================
function loadPostedJobs() {
    let container = document.getElementById("postedContainer");
    if (!container) return;

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    let myJobs = jobs.filter(job => job.isPosted);

    container.innerHTML = "";

    if (myJobs.length === 0) {
        container.innerHTML = "<h3>No Posted Jobs</h3>";
        return;
    }

    myJobs.forEach(job => {
        container.innerHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p>${job.company}</p>
                <p>${job.location}</p>
                <p>${job.salary}</p>
            </div>
        `;
    });
}
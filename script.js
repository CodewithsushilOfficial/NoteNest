// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sample resources data (in a real application, this would come from a database)
const resourcesData = [
    // Note: This array is exposed to window.notesData at the end of this file
    {
        id: 1,
        title: 'Mathematics I',
        semester: 1,
        description: 'Complete notes covering all topics of Mathematics I for first semester B.Tech students.',
        driveLink: 'https://drive.google.com/file/sample-link-1'
    },
    {
        id: 2,
        title: 'Programming in C',
        semester: 1,
        description: 'Comprehensive notes on C programming fundamentals, data structures, and algorithms.',
        driveLink: 'https://drive.google.com/file/sample-link-2'
    },
    {
        id: 3,
        title: 'Engineering Physics',
        semester: 1,
        description: 'Detailed notes on all Engineering Physics topics with solved examples and diagrams.',
        driveLink: 'https://drive.google.com/file/sample-link-3'
    },
    {
        id: 4,
        title: 'Basic Electrical Engineering',
        semester: 1,
        description: 'Complete notes on electrical circuits, machines, and power systems for first-year students.',
        driveLink: 'https://drive.google.com/file/sample-link-4'
    },
    {
        id: 5,
        title: 'Engineering Chemistry',
        semester: 1,
        description: 'Comprehensive notes covering all topics of Engineering Chemistry with practical applications.',
        driveLink: 'https://drive.google.com/file/sample-link-5'
    },
    {
        id: 6,
        title: 'Mathematics II',
        semester: 2,
        description: 'Complete notes for Mathematics II including differential equations and numerical methods.',
        driveLink: 'https://drive.google.com/file/sample-link-6'
    },
    {
        id: 7,
        title: 'Data Structures',
        semester: 2,
        description: 'In-depth notes on various data structures and their implementations in C/C++.',
        driveLink: 'https://drive.google.com/file/sample-link-7'
    },
    {
        id: 8,
        title: 'Digital Electronics',
        semester: 2,
        description: 'Comprehensive notes on digital logic design, boolean algebra, and combinational circuits.',
        driveLink: 'https://drive.google.com/file/sample-link-8'
    },
    {
        id: 9,
        title: 'Object-Oriented Programming',
        semester: 3,
        description: 'Complete notes on OOP concepts, inheritance, polymorphism, and exception handling.',
        driveLink: 'https://drive.google.com/file/sample-link-9'
    },
    {
        id: 10,
        title: 'Database Management Systems',
        semester: 3,
        description: 'Detailed notes on database design, SQL, normalization, and transaction management.',
        driveLink: 'https://drive.google.com/file/sample-link-10'
    },
    {
        id: 11,
        title: 'Computer Networks',
        semester: 4,
        description: 'Comprehensive notes on network architecture, protocols, and security concepts.',
        driveLink: 'https://drive.google.com/file/sample-link-11'
    },
    {
        id: 12,
        title: 'Operating Systems',
        semester: 4,
        description: 'Complete notes on OS concepts, process management, memory management, and file systems.',
        driveLink: 'https://drive.google.com/file/sample-link-12'
    },
    {
        id: 13,
        title: 'Software Engineering',
        semester: 5,
        description: 'Detailed notes on software development lifecycle, requirements engineering, and testing.',
        driveLink: 'https://drive.google.com/file/sample-link-13'
    },
    {
        id: 14,
        title: 'Web Technologies',
        semester: 5,
        description: 'Comprehensive notes on HTML, CSS, JavaScript, and modern web development frameworks.',
        driveLink: 'https://drive.google.com/file/sample-link-14'
    },
    {
        id: 15,
        title: 'Artificial Intelligence',
        semester: 6,
        description: 'In-depth notes on AI concepts, search algorithms, knowledge representation, and machine learning.',
        driveLink: 'https://drive.google.com/file/sample-link-15'
    },
    {
        id: 16,
        title: 'Compiler Design',
        semester: 6,
        description: 'Complete notes on lexical analysis, parsing, semantic analysis, and code generation.',
        driveLink: 'https://drive.google.com/file/sample-link-16'
    },
    {
        id: 17,
        title: 'Cloud Computing',
        semester: 7,
        description: 'Comprehensive notes on cloud architecture, services, deployment models, and security.',
        driveLink: 'https://drive.google.com/file/sample-link-17'
    },
    {
        id: 18,
        title: 'Machine Learning',
        semester: 7,
        description: 'Detailed notes on supervised and unsupervised learning algorithms with practical examples.',
        driveLink: 'https://drive.google.com/file/sample-link-18'
    },
    {
        id: 19,
        title: 'Big Data Analytics',
        semester: 8,
        description: 'Complete notes on big data technologies, Hadoop ecosystem, and analytics techniques.',
        driveLink: 'https://drive.google.com/file/sample-link-19'
    },
    {
        id: 20,
        title: 'Internet of Things',
        semester: 8,
        description: 'Comprehensive notes on IoT architecture, protocols, and applications with case studies.',
        driveLink: 'https://drive.google.com/file/sample-link-20'
    }
];

// Function to create resource cards
function createResourceCard(resource) {
    const resourceCard = document.createElement('div');
    resourceCard.className = 'resource-card';
    resourceCard.classList.add(`${resource.type}-card`);
    
    if (resource.semester) {
        resourceCard.setAttribute('data-semester', resource.semester);
    }
    
    let icon, actionText;
    
    switch(resource.type) {
        case 'notes':
            icon = 'fa-file-pdf';
            actionText = 'Download Notes';
            break;
        case 'coding':
            icon = 'fa-code';
            actionText = 'Access Code';
            break;
        case 'videos':
            icon = 'fa-video';
            actionText = 'Watch Video';
            break;
        default:
            icon = 'fa-download';
            actionText = 'Download';
    }
    
    resourceCard.innerHTML = `
        <div class="resource-header">
            <div class="resource-type-badge">${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</div>
            <h3>${resource.title}</h3>
            ${resource.semester ? `<div class="semester-badge">Semester ${resource.semester}</div>` : ''}
        </div>
        <div class="resource-body">
            <p>${resource.description}</p>
            <a href="${resource.driveLink}" class="resource-link" target="_blank">
                <i class="fas ${icon}"></i> ${actionText}
            </a>
        </div>
    `;
    
    return resourceCard;
}

// Function to display resources based on selected filters
function displayResources(semester = 'all', resourceType = 'all', searchQuery = '') {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';
    
    // Get resources from localStorage if available, otherwise use sample data
    const storedResources = JSON.parse(localStorage.getItem('resources')) || resourcesData;
    
    let filteredResources = storedResources;
    
    // Filter by semester if specified
    if (semester !== 'all') {
        filteredResources = filteredResources.filter(resource => 
            resource.semester && resource.semester === parseInt(semester));
    }
    
    // Filter by resource type if specified
    if (resourceType !== 'all') {
        filteredResources = filteredResources.filter(resource => 
            resource.type === resourceType);
    }
    
    // Filter by search query if provided
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredResources = filteredResources.filter(resource => 
            resource.title.toLowerCase().includes(query) || 
            resource.description.toLowerCase().includes(query));
    }
    
    if (filteredResources.length === 0) {
        notesContainer.innerHTML = '<p class="no-resources">No resources available for these filters. Try different criteria!</p>';
        return;
    }
    
    // Sort resources: first by type, then by semester (if applicable)
    filteredResources.sort((a, b) => {
        if (a.type !== b.type) {
            return a.type.localeCompare(b.type);
        }
        if (a.semester && b.semester) {
            return a.semester - b.semester;
        }
        return 0;
    });
    
    // Create and append resource cards
    filteredResources.forEach(resource => {
        const resourceCard = createResourceCard(resource);
        notesContainer.appendChild(resourceCard);
    });
}

// Add sample coding resources
for (let i = 21; i <= 30; i++) {
    let codingResource = {
        id: i,
        type: 'coding',
        title: '',
        description: '',
        driveLink: `https://drive.google.com/file/sample-coding-link-${i - 20}`
    };
    
    switch(i - 20) {
        case 1:
            codingResource.title = 'C Programming Fundamentals';
            codingResource.description = 'Complete guide to C programming with syntax, examples, and practice problems.';
            break;
        case 2:
            codingResource.title = 'Python for Beginners';
            codingResource.description = 'Step-by-step Python tutorial with sample code and mini-projects for beginners.';
            break;
        case 3:
            codingResource.title = 'Java Programming';
            codingResource.description = 'Comprehensive Java programming guide covering OOP concepts and practical examples.';
            break;
        case 4:
            codingResource.title = 'Data Structures in C++';
            codingResource.description = 'Implementation of common data structures with C++ code examples and explanations.';
            break;
        case 5:
            codingResource.title = 'Web Development Basics';
            codingResource.description = 'HTML, CSS, and JavaScript fundamentals with project-based learning approach.';
            break;
        case 6:
            codingResource.title = 'Database Management with SQL';
            codingResource.description = 'SQL queries, database design principles, and practical database management techniques.';
            break;
        case 7:
            codingResource.title = 'Algorithms and Problem Solving';
            codingResource.description = 'Common algorithms with implementation examples and complexity analysis.';
            break;
        case 8:
            codingResource.title = 'Object-Oriented Programming';
            codingResource.description = 'OOP principles and patterns with examples in multiple programming languages.';
            break;
        case 9:
            codingResource.title = 'Mobile App Development';
            codingResource.description = 'Introduction to Android and iOS app development with sample projects.';
            break;
        case 10:
            codingResource.title = 'Competitive Programming Guide';
            codingResource.description = 'Tips, tricks, and common patterns for solving competitive programming problems.';
            break;
    }
    
    resourcesData.push(codingResource);
}

// Add sample video lecture resources
for (let i = 31; i <= 40; i++) {
    let videoResource = {
        id: i,
        type: 'videos',
        title: '',
        description: '',
        driveLink: `https://youtube.com/watch?v=sample-video-${i - 30}`
    };
    
    switch(i - 30) {
        case 1:
            videoResource.title = 'Calculus Video Lectures';
            videoResource.description = 'Complete video series covering differential and integral calculus with examples.';
            videoResource.semester = 1;
            break;
        case 2:
            videoResource.title = 'C Programming Video Tutorial';
            videoResource.description = 'Step-by-step video guide to C programming from basics to advanced concepts.';
            break;
        case 3:
            videoResource.title = 'Digital Electronics Lectures';
            videoResource.description = 'Video lectures on digital logic, boolean algebra, and circuit design.';
            videoResource.semester = 2;
            break;
        case 4:
            videoResource.title = 'Data Structures & Algorithms';
            videoResource.description = 'Comprehensive video series on data structures and algorithms with visualizations.';
            videoResource.semester = 3;
            break;
        case 5:
            videoResource.title = 'Database Management Systems';
            videoResource.description = 'Video lectures covering database concepts, SQL, and database design.';
            videoResource.semester = 4;
            break;
        case 6:
            videoResource.title = 'Web Development Bootcamp';
            videoResource.description = 'Complete web development course with HTML, CSS, JavaScript, and frameworks.';
            break;
        case 7:
            videoResource.title = 'Machine Learning Fundamentals';
            videoResource.description = 'Introduction to machine learning algorithms and practical implementations.';
            videoResource.semester = 7;
            break;
        case 8:
            videoResource.title = 'Computer Networks';
            videoResource.description = 'Video lectures on networking concepts, protocols, and security.';
            videoResource.semester = 4;
            break;
        case 9:
            videoResource.title = 'Operating Systems';
            videoResource.description = 'Comprehensive video series on OS concepts and implementations.';
            videoResource.semester = 5;
            break;
        case 10:
            videoResource.title = 'Python Programming Masterclass';
            videoResource.description = 'Advanced Python programming techniques and real-world applications.';
            break;
    }
    
    resourcesData.push(videoResource);
}

// Update existing notes to include type
for (let i = 0; i < 20; i++) {
    if (resourcesData[i]) {
        resourcesData[i].type = 'notes';
    }
}

// Initialize the resources display when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Display all resources initially
    displayResources();
    
    // Set up semester selector
    const semesterSelect = document.getElementById('semesterSelect');
    semesterSelect.addEventListener('change', function() {
        const resourceType = document.getElementById('resourceTypeSelect').value;
        const searchTerm = document.getElementById('searchInput').value;
        displayResources(this.value, resourceType, searchTerm);
    });
    
    // Set up resource type selector
    const resourceTypeSelect = document.getElementById('resourceTypeSelect');
    resourceTypeSelect.addEventListener('change', function() {
        const semester = document.getElementById('semesterSelect').value;
        const searchTerm = document.getElementById('searchInput').value;
        displayResources(semester, this.value, searchTerm);
    });
    
    // Set up search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    function performSearch() {
        const searchTerm = searchInput.value;
        const semester = document.getElementById('semesterSelect').value;
        const resourceType = document.getElementById('resourceTypeSelect').value;
        displayResources(semester, resourceType, searchTerm);
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Set up newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('emailInput').value;
        alert(`Thank you for subscribing with ${email}! You will now receive updates about new notes, coding resources, and video lectures.`);
        newsletterForm.reset();
    });
    
    // Add click event listeners for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            // If it's the Notes link, reset filters
            if (this.getAttribute('href') === '#notes') {
                document.getElementById('semesterSelect').value = 'all';
                document.getElementById('resourceTypeSelect').value = 'all';
                document.getElementById('searchInput').value = '';
                displayResources();
            }
        });
    });
});

// Make resourcesData available globally (for admin panel)
window.resourcesData = resourcesData;

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// No additional global variables needed
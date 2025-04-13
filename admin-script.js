// Admin Authentication
const adminCredentials = {
    username: 'admin',
    password: 'admin123'
};

// DOM Elements
const loginForm = document.getElementById('loginForm');
const adminLogin = document.getElementById('adminLogin');
const adminDashboard = document.getElementById('adminDashboard');
const logoutBtn = document.getElementById('logoutBtn');
const addNoteBtn = document.getElementById('addNoteBtn');
const noteFormContainer = document.getElementById('noteFormContainer');
const noteForm = document.getElementById('noteForm');
const cancelBtn = document.getElementById('cancelBtn');
const notesTableBody = document.getElementById('notesTableBody');
const formTitle = document.getElementById('formTitle');
const adminSearchInput = document.getElementById('adminSearchInput');
const adminSearchButton = document.getElementById('adminSearchButton');
const adminSemesterFilter = document.getElementById('adminSemesterFilter');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const closeNotification = document.getElementById('closeNotification');

// Check if user is already logged in
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        adminLogin.style.display = 'none';
        adminDashboard.style.display = 'block';
        logoutBtn.style.display = 'inline-block';
        loadNotes();
    }
}

// Login Form Submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
        localStorage.setItem('adminLoggedIn', 'true');
        adminLogin.style.display = 'none';
        adminDashboard.style.display = 'block';
        logoutBtn.style.display = 'inline-block';
        showNotification('Login successful!', 'success');
        loadNotes();
    } else {
        showNotification('Invalid username or password!', 'error');
    }
});

// Logout Button
logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('adminLoggedIn');
    adminDashboard.style.display = 'none';
    adminLogin.style.display = 'block';
    logoutBtn.style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    showNotification('Logged out successfully!', 'success');
});

// Add Note Button
addNoteBtn.addEventListener('click', function() {
    formTitle.textContent = 'Add New Note';
    noteForm.reset();
    document.getElementById('noteId').value = '';
    noteFormContainer.style.display = 'block';
});

// Cancel Button
cancelBtn.addEventListener('click', function() {
    noteFormContainer.style.display = 'none';
});

// Note Form Submission
noteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const noteId = document.getElementById('noteId').value;
    const title = document.getElementById('noteTitle').value;
    const semester = document.getElementById('noteSemester').value;
    const description = document.getElementById('noteDescription').value;
    const driveLink = document.getElementById('noteDriveLink').value;
    
    // Get existing notes from localStorage or initialize empty array
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    if (noteId) {
        // Update existing note
        const index = notes.findIndex(note => note.id === parseInt(noteId));
        if (index !== -1) {
            notes[index] = {
                id: parseInt(noteId),
                title,
                semester: parseInt(semester),
                description,
                driveLink
            };
            showNotification('Note updated successfully!', 'success');
        }
    } else {
        // Add new note
        const newId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1;
        notes.push({
            id: newId,
            title,
            semester: parseInt(semester),
            description,
            driveLink
        });
        showNotification('Note added successfully!', 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('notes', JSON.stringify(notes));
    
    // Reset form and hide
    noteForm.reset();
    noteFormContainer.style.display = 'none';
    
    // Reload notes table
    loadNotes();
});

// Load Notes to Table
function loadNotes(filter = 'all', searchQuery = '') {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesTableBody.innerHTML = '';
    
    let filteredNotes = notes;
    
    // Apply semester filter
    if (filter !== 'all') {
        filteredNotes = filteredNotes.filter(note => note.semester === parseInt(filter));
    }
    
    // Apply search filter if provided
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredNotes = filteredNotes.filter(note => 
            note.title.toLowerCase().includes(query) || 
            note.description.toLowerCase().includes(query)
        );
    }
    
    if (filteredNotes.length === 0) {
        notesTableBody.innerHTML = `<tr><td colspan="6" class="no-notes">No notes found</td></tr>`;
        return;
    }
    
    filteredNotes.forEach(note => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${note.id}</td>
            <td>${note.title}</td>
            <td>${note.semester}</td>
            <td>${note.description.substring(0, 50)}${note.description.length > 50 ? '...' : ''}</td>
            <td><a href="${note.driveLink}" target="_blank">${note.driveLink.substring(0, 30)}...</a></td>
            <td class="actions">
                <button class="edit-btn" data-id="${note.id}"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" data-id="${note.id}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        notesTableBody.appendChild(row);
    });
    
    // Add event listeners to edit and delete buttons
    addActionButtonListeners();
}

// Add event listeners to edit and delete buttons
function addActionButtonListeners() {
    // Edit buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const noteId = this.getAttribute('data-id');
            editNote(noteId);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const noteId = this.getAttribute('data-id');
            deleteNote(noteId);
        });
    });
}

// Edit Note
function editNote(id) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes.find(note => note.id === parseInt(id));
    
    if (note) {
        formTitle.textContent = 'Edit Note';
        document.getElementById('noteId').value = note.id;
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteSemester').value = note.semester;
        document.getElementById('noteDescription').value = note.description;
        document.getElementById('noteDriveLink').value = note.driveLink;
        
        noteFormContainer.style.display = 'block';
    }
}

// Delete Note
function deleteNote(id) {
    if (confirm('Are you sure you want to delete this note?')) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note.id !== parseInt(id));
        localStorage.setItem('notes', JSON.stringify(notes));
        
        showNotification('Note deleted successfully!', 'success');
        loadNotes(adminSemesterFilter.value, adminSearchInput.value);
    }
}

// Search functionality
adminSearchButton.addEventListener('click', function() {
    const searchQuery = adminSearchInput.value.trim();
    loadNotes(adminSemesterFilter.value, searchQuery);
});

// Search on Enter key
adminSearchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        const searchQuery = adminSearchInput.value.trim();
        loadNotes(adminSemesterFilter.value, searchQuery);
    }
});

// Semester filter
adminSemesterFilter.addEventListener('change', function() {
    loadNotes(this.value, adminSearchInput.value);
});

// Show notification
function showNotification(message, type) {
    notificationMessage.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'flex';
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Close notification
closeNotification.addEventListener('click', function() {
    notification.style.display = 'none';
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    
    // Initialize notes in localStorage if not exists
    if (!localStorage.getItem('notes')) {
        // Try to get sample notes data from script.js
        let sampleNotes = [];
        
        // Check if notesData is available in the global scope
        if (typeof notesData !== 'undefined') {
            sampleNotes = JSON.parse(JSON.stringify(notesData));
        } else {
            // Fallback to empty array if notesData is not available
            console.log('Sample notes data not found, initializing with empty array');
        }
        
        localStorage.setItem('notes', JSON.stringify(sampleNotes));
    }
});

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
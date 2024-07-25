import Note from './note.js';
import Data from './data.js';
import LocalStorage from './localstorage.js';


// DOM Elements 

const main = document.querySelector('.main');
const footer = document.querySelector('footer');
const toggleThemeBtn = document.querySelector('#toggle-theme-btn');
const createNoteBtn = document.querySelector('#create-note-btn');
const searchNoteBtn = document.querySelector('#search-note-btn');
const toggleFavoriteNotesBtn = document.querySelector('#toggle-favorite-notes-btn');
const deleteAllNotesBtn = document.querySelector('#delete-all-notes-btn');
const searchNoteField = document.querySelector('#search-note-field');
const mainContainer = document.querySelector('.row');
const overlay = document.querySelector('.overlay');
let container = ``;

// Data.createNote(new Note(Data.getIndex(), "My Title", "My Text", "danger"));
// Data.createNote(new Note(Data.getIndex(), "My Title", "My Text", "danger"));
// Data.createNote(new Note(Data.getIndex(), "Mosab", "My Text", "danger"));

if (Data.getTheme() == 'dark') {
    applyDarkTheme();
} else {
    applyLightTheme();
}

function displayNotes(notes = Data.getNotes()) {
    container = ``;
    notes.forEach(note => {
        container += `
        <div class="col-md-6 col-lg-4">
            <div class="note bg-${note.getColor()}-subtle text-${note.getColor()} rounded-2 p-4 position-relative cursor-pointer shadow-sm" data-note-id="${note.getId()}">
                <div class="note-header d-flex justify-content-between align-items-center mb-2 gap-2">
                    <h2 class="h5 m-0">${note.getTitle()}</h2>
                    <div class="note-options d-flex bg-${note.getColor()} rounded">
                        <button class="btn btn-${note.getColor()} favorite" data-note-id="${note.getId()}">
                            <i class="fa-${note.getStatus()} fa-heart" data-note-id="${note.getId()}"></i>
                        </button>
                        <button class="btn btn-${note.getColor()} ellipsis" data-note-id="${note.getId()}">
                            <i class="fa-solid fa-ellipsis" data-note-id="${note.getId()}"></i>
                        </button>
                    </div>
                </div>
                <div class="note-body">
                    <p class="overflow-auto lh-16 m-0">
                    ${note.getText()}
                    </p>
                </div>
                <div class="note-footer w-100 position-absolute start-0 bottom-0 px-4 py-2">
                    <i>${note.getLastModified()}</i>
                </div>
                <div class="note-marker bg-${note.getColor()}"></div>
            </div>
        </div>
        `
    });
    mainContainer.innerHTML = container;
}

function viewNote(note) {
    container = `
        <div class="large-note w-100 bg-${note.getColor()}-subtle text-${note.getColor()} p-4 rounded-2 position-relative" dir="ltr">
            <div class="note-marker bg-${note.getColor()}"></div>
            <div class="note-header d-flex justify-content-between align-items-center mb-2 gap-2">
                <h2 class="h5 m-0">${note.getTitle()}</h2>
                <button class="btn btn-${note.getColor()} exit">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="note-body">
                <p class="lh-16 m-0 overflow-auto">${note.getText()}</p>
            </div>
            <div class="note-footer w-100 position-absolute start-0 bottom-0 px-4 py-3">
                <i>${note.getLastModified()}</i>
            </div>
        </div>
        <div class="note-options w-100 d-flex justify-content-between align-items-center gap-2">
            <div class="note-options-bar d-flex justify-content-end gap-2 flex-grow-1">
                <button class="btn btn-secondary flex-grow-1 dir">
                    <i class="fa-solid fa-language"></i>
                </button>
                <button class="btn btn-${note.getColor()} flex-grow-1 edit" data-note-id="${note.getId()}">
                    <i class="fa-solid fa-pen" data-note-id="${note.getId()}"></i>
                </button>
                <button class="btn btn-${note.getColor()} delete" data-note-id="${note.getId()}">
                    <i class="fa-solid fa-trash" data-note-id="${note.getId()}"></i>
                </button>
                </button>
            </div>
        </div>
    `;

    overlay.lastElementChild.innerHTML = container;
    displayOverlay();
}

function editNote(note, selectedColor, title, text) {
    container = `
        <div class="large-note w-100 bg-${selectedColor}-subtle text-${selectedColor} p-4 rounded-2 position-relative" data-note-id="${note.getId()}">
            <div class="note-marker bg-${selectedColor}"></div>
            <div class="note-header d-flex justify-content-between align-items-center mb-2 gap-2">
                <input type="text" class="form-control bg-transparent border-0 fs-5 fw-semibold text-${selectedColor} placeholder-${selectedColor}" value="${title}" placeholder="Enter Title ...">
                <button class="btn btn-${selectedColor} exit">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="note-body">
                <textarea class="form-control bg-transparent border-0 text-${selectedColor} placeholder-${selectedColor}" placeholder="Enter Text ...">${text}</textarea>
            </div>
            <div class="note-footer w-100 position-absolute start-0 bottom-0">
                <button class="btn btn-${selectedColor} w-100 save" data-note-id="${note.getId()}">Save</button>
            </div>
        </div>
            <div class="note-options w-100 d-flex justify-content-between align-items-center gap-2">
                <div class="color-selection-bar d-flex  gap-2 d-block">
                    <button class="btn btn-primary p-3"></button>
                    <button class="btn btn-danger p-3"></button>
                    <button class="btn btn-warning p-3"></button>
                    <button class="btn btn-success p-3">
                    </button>
                </div>
            </div>
        </div>
    `;



    overlay.lastElementChild.innerHTML = container;
    displayOverlay();
}

function addNote(selectedColor, title = '', text = '') {
    container = `
        <div class="large-note w-100 bg-${Data.getSelectedColor()}-subtle text-${Data.getSelectedColor()} p-4 rounded-2 position-relative">
            <div class="note-marker bg-${Data.getSelectedColor()}"></div>
            <div class="note-header d-flex justify-content-between align-items-center mb-2 gap-2">
                <input type="text" class="form-control bg-transparent border-0 fs-5 fw-semibold text-${Data.getSelectedColor()} placeholder-${Data.getSelectedColor()}" value="${title}" placeholder="Enter Title ...">
                <button class="btn btn-${Data.getSelectedColor()} exit">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="note-body">
                <textarea class="form-control bg-transparent border-0 text-${Data.getSelectedColor()} placeholder-${Data.getSelectedColor()}" placeholder="Enter Text ...">${text}</textarea>
            </div>
            <div class="note-footer w-100 position-absolute start-0 bottom-0">
                <button class="btn btn-${Data.getSelectedColor()} w-100 create">Create</button>
            </div>
        </div>
            <div class="note-options w-100 d-flex justify-content-between align-items-center gap-2">
                <div class="color-selection-bar d-flex  gap-2 d-block">
                    <button class="btn btn-primary p-3"></button>
                    <button class="btn btn-danger p-3"></button>
                    <button class="btn btn-warning p-3"></button>
                    <button class="btn btn-success p-3">
                    </button>
                </div>
            </div>
        </div>
    `;

    overlay.lastElementChild.innerHTML = container;
    displayOverlay();
}

function displayOverlay() {
    overlay.classList.replace('d-none', 'd-block');
}

function hideOverlay() {
    overlay.lastElementChild.innerHTML = ``;
    overlay.classList.replace('d-block', 'd-none');
}

function applyLightTheme() {
    main.classList.replace('bg-dark', 'bg-light');
    main.classList.replace('text-white', 'text-dark');
    footer.classList.replace('bg-dark', 'bg-light');
    footer.classList.replace('text-white', 'text-dark');
    toggleThemeBtn.classList.replace('btn-light', 'btn-dark');
    main.dataset.theme = 'light';
    Data.setTheme(main.dataset.theme = 'light');
}

function applyDarkTheme() {
    main.classList.replace('bg-light', 'bg-dark');
    main.classList.replace('text-dark', 'text-white');
    toggleThemeBtn.classList.replace('btn-dark', 'btn-light');
    footer.classList.replace('bg-light', 'bg-dark');
    footer.classList.replace('text-dark', 'text-white');
    main.dataset.theme = 'dark';
    Data.setTheme(main.dataset.theme = 'dark');
}

function toggleTheme() {
    if (main.dataset.theme == 'dark') {
        applyLightTheme();
    } else {
        applyDarkTheme();
    }
}

function toggleHeart(btn) {
    if (btn.dataset.status == 'inactive') {
        btn.querySelector('i').classList.replace('fa-regular', 'fa-solid');
        btn.dataset.status = 'active';
        displayNotes(Data.getFavoriteNotes());
    } else {
        btn.querySelector('i').classList.replace('fa-solid', 'fa-regular');
        btn.dataset.status = 'inactive';
        displayNotes(Data.getNotes());
    }

}

// Action Listeners

toggleThemeBtn.addEventListener('click', e => {
    toggleTheme();
});

createNoteBtn.addEventListener('click', e => {
    overlay.dataset.operation = 'add';
    addNote(Data.getSelectedColor());
});

searchNoteBtn.addEventListener('click', e => {
    console.log("Toggle Search Box");
});

toggleFavoriteNotesBtn.addEventListener('click', e => {
    toggleHeart(e.currentTarget);
});

deleteAllNotesBtn.addEventListener('click', e => {
    let confirm = window.confirm("Are you sure you want to erase all notes?");
    if (confirm) {
        Data.setNotes([]);
        displayNotes();
    }
    LocalStorage.updateNotes(Data.getNotes());

});

searchNoteField.addEventListener('input', e => {
    displayNotes(Data.getFilteredNotes(e.target.value));
});

document.addEventListener('click', e => {
    if (e.target.closest('.note button.favorite')) {
        console.log(Data.findNote(e.target.dataset.noteId).getIsFavorite());
        Data.findNote(e.target.dataset.noteId).setIsFavorite();
        console.log(Data.findNote(e.target.dataset.noteId).getIsFavorite());
        // toggleHeart(e.target.closest('.note button.favorite'));
        LocalStorage.updateNotes(Data.getNotes());
        displayNotes();
    } else if (e.target.closest('.note button.ellipsis')) {
        viewNote(Data.findNote(e.target.dataset.noteId));
    } else if (e.target == overlay || e.target == overlay.querySelector('.container') || e.target.closest('.large-note button.exit')) {
        hideOverlay();
    } else if (e.target.closest('.overlay .edit')) {
        overlay.dataset.operation = 'edit';
        let note = Data.findNote(e.target.dataset.noteId);
        Data.setSelectedColor(note.getColor());
        editNote(note, note.getColor(), note.getTitle(), note.getText());
    } else if (e.target.closest('.overlay .delete')) {
        Data.deleteNote(Data.findNote(e.target.dataset.noteId));
        LocalStorage.updateNotes(Data.getNotes());
        displayNotes();
        hideOverlay();
    } else if (e.target.closest('.overlay .dir')) {
        if (overlay.querySelector('.large-note').getAttribute('dir') == 'ltr') {
            overlay.querySelector('.large-note').setAttribute('dir', 'rtl');
        } else {
            overlay.querySelector('.large-note').setAttribute('dir', 'ltr');
        }

    } else if (e.target.closest('.color-selection-bar button')) {
        let prevTitle = document.querySelector('.overlay input').value;
        let prevText = document.querySelector('.overlay textarea').value;
        Data.setSelectedColor(e.target.classList[1].toString().slice(4,));
        if (overlay.dataset.operation == 'add') {
            addNote(Data.getSelectedColor(), prevTitle, prevText);
        } else {
            let note = Data.findNote(overlay.querySelector('.large-note').dataset.noteId);
            editNote(note, Data.getSelectedColor(), prevTitle, prevText);
        }

    } else if (e.target.closest('.overlay .save')) {
        let noteId = e.target.dataset.noteId;
        let newTitle = document.querySelector('.overlay input').value;
        let newText = document.querySelector('.overlay textarea').value;
        let newColor = Data.getSelectedColor();
        Data.deleteNote(Data.findNote(e.target.dataset.noteId));
        Data.createNote(new Note(noteId, newTitle, newText, newColor));
        LocalStorage.updateNotes(Data.getNotes());
        displayNotes();
        viewNote(Data.findNote(e.target.dataset.noteId));
    } else if (e.target.closest('.overlay .create')) {
        let id = Data.getIndex();
        let title = document.querySelector('.overlay input').value;
        let text = document.querySelector('.overlay textarea').value;
        let color = Data.getSelectedColor();
        Data.createNote(new Note(id, title, text, color));
        LocalStorage.updateNotes(Data.getNotes());
        hideOverlay();
        displayNotes();
    }
});

document.addEventListener('dblclick', e => {
    if (e.target.closest('.note')) {
        viewNote(Data.findNote(e.target.dataset.noteId));
    }
});


export { displayNotes };
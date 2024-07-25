import LocalStorage from "./localstorage.js";

export default class Data {
    static #notes = LocalStorage.getNotes();
    static #index = LocalStorage.getConfig().index;
    static #theme = LocalStorage.getConfig().theme;
    static #selectedColor = 'primary';

    // Getters 
    static getNotes() {
        return this.#notes;
    }
    static getIndex() {
        return this.#index;
    }
    static getSelectedColor() {
        return this.#selectedColor;
    }
    static getTheme() {
        return this.#theme;
    }

    // Setters 
    static setNotes(notes) {
        this.#notes = notes;
    }
    static setIndex(index) {
        this.#index = index;
    }
    static setSelectedColor(selectedColor) {
        this.#selectedColor = selectedColor;
    }
    static setTheme(theme) {
        this.#theme = theme;
        LocalStorage.setConfig({ index: this.#index, theme: this.#theme });
    }

    // Class Methods
    static createNote(note) {
        this.#notes.unshift(note);
        this.#index++;
        LocalStorage.setConfig({ index: this.#index, theme: this.#theme });
    }

    static findNote(noteId) {
        let note;
        note = this.#notes.find(note => note.getId() == noteId);
        return note;
    }

    static getFavoriteNotes() {
        let favoriteNotes;
        favoriteNotes = this.#notes.filter(note => note.getIsFavorite() == true);
        return favoriteNotes;
    }

    static getFilteredNotes(keyword) {
        let filteredNotes = this.#notes.filter(note => note.getTitle().includes(keyword) || note.getText().includes(keyword));
        return filteredNotes;
    }

    static deleteNote(note) {
        let index;
        for (let i = 0; i < this.#notes.length; i++) {
            if (this.#notes[i].getId() == note.getId()) {
                index = i;
                break;
            }
        }
        this.#notes.splice(index, 1);
    }

}
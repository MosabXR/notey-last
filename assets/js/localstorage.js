import Note from './note.js';

export default class LocalStorage {
    static #notes;
    static #config;

    static getConfig() {
        if (localStorage.getItem('config') == null) {
            localStorage.setItem('config',JSON.stringify({index: 1,theme: 'dark'}));
        } else {
            return JSON.parse(localStorage.getItem('config'));
        }

        return {index:1, theme:'dark'};
    }

    static getNotes() {
        if (localStorage.getItem('notes') == null) {
            return [];
        } else {
            return this.getDeserializedNotes(JSON.parse(localStorage.getItem('notes')));
        }
    }

    static updateNotes(notes) {
        localStorage.setItem('notes', JSON.stringify(this.getSerializedNotes(notes)));
    }

    static getSerializedNotes(notes) {
        let serializedNotes = [];
        let note;
        for (let i = 0; i < notes.length; i++) {
            note = {
                id: notes[i].getId(),
                title: notes[i].getTitle(),
                text: notes[i].getText(),
                color: notes[i].getColor(),
                lastModified: notes[i].getLastModified(),
                isFavorite: notes[i].getIsFavorite()
            };
            serializedNotes.push(note);
        }
        return serializedNotes;
    }

    static getDeserializedNotes(notes) {
        let deserializeNotes = [];
        for (let i = 0; i < notes.length; i++) {
            let note = notes[i];
            deserializeNotes.push(new Note(note.id, note.title, note.text, note.color, note.lastModified, note.isFavorite));
        }
        return deserializeNotes;
    }

    static setConfig(config) {
        localStorage.setItem('config',JSON.stringify(config));
    }
}
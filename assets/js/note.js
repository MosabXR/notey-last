export default class Note {
    #id;
    #title;
    #text;
    #color;
    #lastModified;
    #isFavortie;
    constructor(id, title, text, color, lastModified = new Date().toDateString(), isFavorite = false) {
        this.#id = id;
        this.#title = title;
        this.#text = text;
        this.#color = color;
        this.#lastModified = lastModified;
        this.#isFavortie = isFavorite;
    }
    // Getters
    getId() {
        return this.#id;
    }
    getTitle() {
        return this.#title;
    }
    getText() {
        return this.#text;
    }
    getColor() {
        return this.#color;
    }
    getLastModified() {
        return this.#lastModified;
    }
    getIsFavorite() {
        return this.#isFavortie;
    }
    getStatus() {
        if (this.#isFavortie)
            return 'solid';
        else
            return 'regular';
    }
    // Setters
    setId(id) {
        this.#id = id;
    }
    setTitle(title) {
        this.#title = title;
    }
    setText(text) {
        this.#text = text;
    }
    setColor(color) {
        this.#color = color;
    }
    setLastModified(lastModified) {
        this.#lastModified = lastModified;
    }
    setIsFavorite() {
        this.#isFavortie = !this.#isFavortie;
    }
}
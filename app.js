let myLibrary = [];

function Book(title, genre, author, description, price, numOfPages, status = false) {
    this.title = title;
    this.genre = genre;
    this.author = author;
    this.description = description;
    this.price = price;
    this.numOfPages = numOfPages;
    this.status = status;
}

function addBookToLibrary(title, genre, author, description, price, numOfPages) {
    const newBook = new Book(title, genre, author, description, price, numOfPages, status);
    myLibrary = [
        ...myLibrary, newBook
    ];
}

function createBook() {

}

function render() {
    allCards.innerHTML = '';
    if (myLibrary.length === 0) {
        allCards.innerHTML = '<p> No books </p>';
    }
    let row;
    myLibrary.forEach((book, i) => {
        if (i % 3 == 0) {
            row = document.createElement('div');
            row.classList.add('row', 'mt-3');
            allCards.append(row);
        }
        renderBook(book, i, row);
    });
}

function renderBook(book, i, row) {
    const col = document.createElement('div');

    col.classList.add('col-4');
    const card = createBookCard(book, id);
    col.innerHTML = card;
    row.append(col);
}

function createBookCard({ title, genre, author, description, price, numOfPages, status }, id) {
    return `<article class="card"><section class="card-body"><h5 class="card-title">${title}</h5><h6 class="card-subtitle mb-2">Genre: ${genre}</h6><h6 class="card-subtitle mb-2">Price: €${price}</h6><h6 class="card-subtitle mb-2">Author: €${author}</h6><h6 class="card-subtitle mb-3"> Number of pages: ${numOfPages}</h6><p class="card-text">${description}</p><div class="d-flex"><div class="mr-2"><button class="btn btn-outline-danger remove-game" data-game="${id}">Remove</button></div><div class="mr-1"><button class="btn btn-outline-primary add-time" data-game="${id}">Add Time</button></div><div class="w-25"><label for="minutes" class="sr-only">Minutes Played</label><input type="number" name="minutes" id="minutes-${id}" class="form-control" placeholder="Mins"></div></div>
    </section></article>`;
}
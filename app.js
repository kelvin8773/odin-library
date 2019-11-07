let myLibrary = [];

function Book(
  title,
  genre,
  author,
  description,
  price,
  numOfPages,
  read_status = false
) {
  this.title = title;
  this.genre = genre;
  this.author = author;
  this.description = description;
  this.price = price;
  this.numOfPages = numOfPages;
  this.read_status = read_status;
}

function addBookToLibrary(
  title,
  genre,
  author,
  description,
  price,
  numOfPages,
  read_status
) {
  const newBook = new Book(
    title,
    genre,
    author,
    description,
    price,
    numOfPages,
    read_status
  );
  myLibrary = [...myLibrary, newBook];
}

function removeBookFromLibrary(id) {
  myLibrary.splice(id, 1);
}

// UI Part

function render() {
  allCards.innerHTML = "";
  if (myLibrary.length === 0) {
    allCards.innerHTML = "<p> No books </p>";
  }
  let row;
  myLibrary.forEach((book, i) => {
    if (i % 3 == 0) {
      row = document.createElement("div");
      row.classList.add("row", "mt-3");
      allCards.append(row);
    }
    renderBook(book, i, row);
  });
}

function renderBook(book, id, row) {
  const col = document.createElement("div");

  col.classList.add("col-4");
  const card = createBookCard(book, id);
  col.innerHTML = card;
  row.append(col);
}

function createBookCard(
  { title, genre, author, description, price, numOfPages, read_status },
  id
) {
  return `
  <article class="card">
  <section class="card-body">
    <h5 class="card-title">${title}</h5>
    <h6 class="card-subtitle mb-2">Genre: ${genre}</h6>
    <h6 class="card-subtitle mb-2">Author: ${author}</h6>
    <br>
    <h6 class="card-subtitle mb-2">Price: €${price}</h6>
    <h6 class="card-subtitle mb-3">Number of pages: ${numOfPages}</h6>
    <p class="card-text">${description}</p>
    <div class="d-flex">
      <div class="mr-2">
        <button class="btn btn-outline-danger remove-book" data-game="${id}">
          Remove
        </button>
      </div>
    </div>
  </section>
</article>`;
}

function handleAddBook() {
  const formFields = document.querySelector(".add-book-form").elements;
  const book = [];

  for (let field of formFields) {
    book.push(field.value);
    field.value = "";
  }

  addBookToLibrary(...book);
  render();
}

function handleClickOnBooks(e) {
  if (e.target.classList.contains("remove-book")) {
    handleRemoveBook(e.target);
  }
}

function handleRemoveBook(btn) {
  const id = +btn.dataset.book;
  removeBookFromLibrary(id);
  render();
}

const allCards = document.querySelector(".books");
const addBookBtn = document.querySelector(".add-book");

addBookBtn.addEventListener("click", handleAddBook);
allCards.addEventListener("click", handleClickOnBooks);

render();

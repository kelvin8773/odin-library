let myLibrary = createLibrary(localStorage.getItem("books")) || [];

function init() {
  myLibrary.push(
    new Book(
      (title = "The Hobbit"),
      (genre = "fiction"),
      (author = "J.R.R. Tolkien"),
      (description =
        "The Hobbit, or There and Back Again, is a children's fantasy novel by English author J. R. R. Tolkien."),
      (price = 20.99),
      (numOfPages = 420),
      (read_status = "")
    )
  );

  myLibrary.push(
    new Book(
      (title = "Learning JavaScript Design Patterns"),
      (genre = "others"),
      (author = "Addy Osmani"),
      (description =
        "With Learning JavaScript Design Patterns, you’ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language."),
      (price = 49.99),
      (numOfPages = 520),
      (read_status = "")
    )
  );
}

function createLibrary(booksData) {
  if (!booksData) return;

  const library = [];
  const parseData = JSON.parse(booksData);

  for (let book of parseData) {
    library.push(new Book(...Object.values(book)));
  }

  return library;
}

function Book(
  title,
  genre,
  author,
  description,
  price,
  numOfPages,
  read_status
) {
  this.title = title;
  this.genre = genre;
  this.author = author;
  this.description = description;
  this.price = price;
  this.numOfPages = numOfPages;
  if (read_status) {
    this.read_status = true;
  } else {
    this.read_status = false;
  }
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
  localStorage.setItem("books", JSON.stringify(myLibrary));
}

function removeBookFromLibrary(id) {
  myLibrary.splice(id, 1);
  localStorage.setItem("books", JSON.stringify(myLibrary));
}

function updateBookReadStatusFromLibrary(id) {
  myLibrary[id].read_status = !myLibrary[id].read_status;
  localStorage.setItem("books", JSON.stringify(myLibrary));
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
  if (read_status) {
    return `
          <article class="card">
          <section class="card-body" style="max-width: 400px;">
            <h5 class="card-title">${title}</h5>
            <h6 class="card-subtitle mb-2">Genre: ${genre}</h6>
            <h6 class="card-subtitle mb-2">Author: ${author}</h6>
            <br />
            <h6 class="card-subtitle mb-2">Price: €${price}</h6>
            <h6 class="card-subtitle mb-3">Number of pages: ${numOfPages}</h6>
            <p class="card-text">${description}</p>
            <div class="d-flex">
              <div class="mr-2">
                <button class="btn btn-outline-success read-status" data-book="${id}">
                  Read
                </button>
                <button class="btn btn-outline-danger remove-book" data-book="${id}">
                  Remove
                </button>
              </div>
            </div>
          </section>
        </article>
          `;
  } else {
    return `
          <article class="card">
          <section class="card-body" style="max-width: 400px;">
            <h5 class="card-title">${title}</h5>
            <h6 class="card-subtitle mb-2">Genre: ${genre}</h6>
            <h6 class="card-subtitle mb-2">Author: ${author}</h6>
            <br />
            <h6 class="card-subtitle mb-2">Price: €${price}</h6>
            <h6 class="card-subtitle mb-3">Number of pages: ${numOfPages}</h6>
            <p class="card-text">${description}</p>
            <div class="d-flex">
              <div class="mr-2">
                <button class="btn btn-outline-info read-status" data-book="${id}">
                  Not Read
                </button>
                <button class="btn btn-outline-danger remove-book" data-book="${id}">
                  Remove
                </button>
              </div>
            </div>
          </section>
        </article>
            `;
  }
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
  } else if (e.target.classList.contains("read-status")) {
    handleClickOnReadStatus(e.target);
  }
}

function handleRemoveBook(btn) {
  const id = +btn.dataset.book;
  removeBookFromLibrary(id);
  render();
}

function handleClickOnReadStatus(btn) {
  const id = +btn.dataset.book;
  updateBookReadStatusFromLibrary(id);
  render();
}

const allCards = document.querySelector(".books");
const addBookBtn = document.querySelector(".add-book");

addBookBtn.addEventListener("click", handleAddBook);
allCards.addEventListener("click", handleClickOnBooks);

init();
render();

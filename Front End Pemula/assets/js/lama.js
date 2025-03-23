document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'bookshelf_app';

    const saveToStorage = (books) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    };

    const getFromStorage = () => {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    };

    const renderBooks = (books = null) => {
        const incompleteList = document.getElementById('incompleteBookList');
        const completeList = document.getElementById('completeBookList');
        incompleteList.innerHTML = '';
        completeList.innerHTML = '';

        const targetBooks = books || getFromStorage();

        targetBooks.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.setAttribute('data-bookid', book.id);
            bookElement.setAttribute('data-testid', 'bookItem');
            bookElement.innerHTML = `
                <h3 data-testid="bookItemTitle">${book.title}</h3>
                <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
                <p data-testid="bookItemYear">Tahun: ${book.year}</p>
                <div>
                    <button data-testid="bookItemIsCompleteButton">
                        ${book.isComplete ? 'Belum selesai' : 'Selesai dibaca'}
                    </button>
                    <button data-testid="bookItemDeleteButton">Hapus Buku</button>
                    <button data-testid="bookItemEditButton">Edit Buku</button>
                </div>
            `;

            if (book.isComplete) {
                completeList.appendChild(bookElement);
            } else {
                incompleteList.appendChild(bookElement);
            }
        });
    };

    const bookForm = document.getElementById('bookForm');
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const books = getFromStorage();

        const newBook = {
            id: Number(new Date()),
            title: document.getElementById('bookFormTitle').value,
            author: document.getElementById('bookFormAuthor').value,
            year: parseInt(document.getElementById('bookFormYear').value),
            isComplete: document.getElementById('bookFormIsComplete').checked
        };

        books.push(newBook);
        saveToStorage(books);
        renderBooks();
        bookForm.reset();
    });

    document.querySelector('main').addEventListener('click', (e) => {
        const target = e.target;
        const bookElement = target.closest('[data-bookid]');
        if (!bookElement) return;

        const bookId = parseInt(bookElement.dataset.bookid);
        const books = getFromStorage();
        const bookIndex = books.findIndex(book => book.id === bookId);

        if (target.dataset.testid === 'bookItemDeleteButton') {
            books.splice(bookIndex, 1);
            saveToStorage(books);
            renderBooks();
        }

        if (target.dataset.testid === 'bookItemIsCompleteButton') {
            books[bookIndex].isComplete = !books[bookIndex].isComplete;
            saveToStorage(books);
            renderBooks();
        }

        if (target.dataset.testid === 'bookItemEditButton') {
            const book = books[bookIndex];
            document.getElementById('bookFormTitle').value = book.title;
            document.getElementById('bookFormAuthor').value = book.author;
            document.getElementById('bookFormYear').value = book.year;
            document.getElementById('bookFormIsComplete').checked = book.isComplete;
            
            books.splice(bookIndex, 1);
            saveToStorage(books);
            renderBooks();
        }
    });

    const searchForm = document.getElementById('searchBook');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = document.getElementById('searchBookTitle').value.toLowerCase();
        const books = getFromStorage();
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm)
        );
        renderBooks(filteredBooks);
    });

    const isCompleteCheckbox = document.getElementById('bookFormIsComplete');
    const submitButtonSpan = document.querySelector('#bookFormSubmit span');

    // Fungsi untuk update teks tombol
    const updateSubmitButtonText = () => {
        submitButtonSpan.textContent = isCompleteCheckbox.checked 
            ? 'Selesai dibaca' 
            : 'Belum selesai dibaca';
    };

    // Event listener untuk perubahan checkbox
    isCompleteCheckbox.addEventListener('change', updateSubmitButtonText);

    // Set teks awal saat pertama kali dimuat
    updateSubmitButtonText()

    renderBooks();
});
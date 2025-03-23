document.addEventListener('DOMContentLoaded', () => {
    // Konfigurasi
    const STORAGE_KEY = 'bookshelf_app';
    let bookToDelete = null;

    // DOM Elements
    const bookForm = document.getElementById('bookForm');
    const searchForm = document.getElementById('searchBook');
    const notification = document.getElementById('notification');
    const confirmationModal = document.getElementById('confirmationModal');
    const isCompleteCheckbox = document.getElementById('bookFormIsComplete');
    const submitButtonSpan = document.querySelector('#bookFormSubmit span');

    // Fungsi Notifikasi
    function showNotification(message, isSuccess = true) {
        notification.textContent = message;
        notification.style.backgroundColor = isSuccess ? 'rgba(0, 95, 65, 0.9)' : 'rgba(231, 76, 60, 0.9)';
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Fungsi LocalStorage
    function saveToStorage(books) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }

    function getFromStorage() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    // Update Tombol Submit
    function updateSubmitButtonText() {
        submitButtonSpan.textContent = isCompleteCheckbox.checked 
            ? 'Selesai dibaca' 
            : 'Belum selesai dibaca';
    }

    // Render Buku
    function renderBooks(books = null) {
        const targetBooks = books || getFromStorage();
        const incompleteList = document.getElementById('incompleteBookList');
        const completeList = document.getElementById('completeBookList');
        
        incompleteList.innerHTML = '';
        completeList.innerHTML = '';

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

            book.isComplete ? completeList.appendChild(bookElement) : incompleteList.appendChild(bookElement);
        });
    }

    // Event: Submit Form Buku
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const books = getFromStorage();

        const newBook = {
            id: Number(new Date()),
            title: document.getElementById('bookFormTitle').value,
            author: document.getElementById('bookFormAuthor').value,
            year: parseInt(document.getElementById('bookFormYear').value),
            isComplete: isCompleteCheckbox.checked
        };

        books.push(newBook);
        saveToStorage(books);
        renderBooks();
        bookForm.reset();
        showNotification('Buku berhasil ditambahkan!');
    });

    // Event: Pencarian Buku
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = document.getElementById('searchBookTitle').value.toLowerCase();
        const books = getFromStorage();
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm)
        );
        
        renderBooks(filteredBooks);
        filteredBooks.length > 0 
            ? showNotification(`Ditemukan ${filteredBooks.length} buku yang sesuai`)
            : showNotification('Tidak ada data yang sesuai', false);
    });

    // Event Delegation untuk Aksi Buku
    document.querySelector('main').addEventListener('click', (e) => {
        const target = e.target;
        const bookElement = target.closest('[data-bookid]');
        if (!bookElement) return;

        const bookId = parseInt(bookElement.dataset.bookid);
        const books = getFromStorage();
        const bookIndex = books.findIndex(book => book.id === bookId);

        // Toggle Status Baca
        if (target.dataset.testid === 'bookItemIsCompleteButton') {
            books[bookIndex].isComplete = !books[bookIndex].isComplete;
            saveToStorage(books);
            renderBooks();
        }

        // Hapus Buku
        if (target.dataset.testid === 'bookItemDeleteButton') {
            bookToDelete = bookId;
            confirmationModal.style.display = 'block';
        }

        // Edit Buku
        if (target.dataset.testid === 'bookItemEditButton') {
            const book = books[bookIndex];
            document.getElementById('bookFormTitle').value = book.title;
            document.getElementById('bookFormAuthor').value = book.author;
            document.getElementById('bookFormYear').value = book.year;
            isCompleteCheckbox.checked = book.isComplete;
            updateSubmitButtonText();
            
            books.splice(bookIndex, 1);
            saveToStorage(books);
            renderBooks();
        }
    });

    // Konfirmasi Hapus
    document.getElementById('confirmDelete').addEventListener('click', () => {
        const books = getFromStorage().filter(book => book.id !== bookToDelete);
        saveToStorage(books);
        renderBooks();
        confirmationModal.style.display = 'none';
        showNotification('Buku berhasil dihapus');
    });

    document.getElementById('cancelDelete').addEventListener('click', () => {
        confirmationModal.style.display = 'none';
        bookToDelete = null;
    });
   

    // Inisialisasi
    isCompleteCheckbox.addEventListener('change', updateSubmitButtonText);
    updateSubmitButtonText();
    renderBooks();
});
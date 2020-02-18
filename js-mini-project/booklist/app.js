// Book class: 定义书本方法
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class: 操作UI方法

class UI {
    static displayBooks() {

        const books = Store.getBooks();
        // const StoredBooks = [
        //     {
        //         title: 'Book 1',
        //         author: 'janily',
        //         isbn: '1111'
        //     },
        //     {
        //         title: 'Book 2',
        //         author: 'janily',
        //         isbn: '12222'
        //     }
        // ];

        // const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    

    static showAlert(message , className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form)

        // 消息3秒消失
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {

            el.parentElement.parentElement.remove();

        }
    }
}

// Store class: 存储方法

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: 显示书本
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: 添加书本
document.querySelector('#book-form').addEventListener('submit', (e) => {

    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('不能为空', 'danger');
    } else {
        // 
        const book = new Book(title, author, isbn);

        UI.addBookToList(book);

        //存储数据
        Store.addBook(book);

        //显示成功消息

        UI.showAlert('成功添加', 'success');

        // 清空文本
        UI.clearFields();
    }

    
})

//Event: 删除书本
document.querySelector('#book-list').addEventListener('click', (e) => {

    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    console.log(e.target);
    //显示成功消息
    UI.showAlert('成功删除', 'success');
})
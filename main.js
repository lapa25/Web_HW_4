class Book{
    #title;
    #author;
    #year;
    #isIssued;
    constructor(titleInitiate, authorInitiate, yearInitiate){
        this.#title = titleInitiate;
        this.#author = authorInitiate;
        this.#year = yearInitiate;
        this.#isIssued = false;

    }
    get title(){
        return this.#title;
    }
    get author(){
        return this.#author;
    }
    get year(){
        return this.#year;
    }
    get isIssued() {
        return this.#isIssued;
      }
    
    set isIssued(value) {
    if (typeof value !== "boolean") {
        throw new Error("Значение должно быть типа boolean");
    }
    this.#isIssued = value;
    }
    toggleIssue(){
        Object.defineProperty(this, 'isIssued', {writable: true, configurable: true})
        this.isIssued = !this.isIssued;
        Object.defineProperty(this, 'isIssued', {writable: false, configurable: true})
    }
}


class EBook extends Book{
    #fileSize;
    #format;
    constructor(titleInitiate, authorInitiate, yearInitiate, fileSizeInitiate, formatInitiate) {
        super(titleInitiate, authorInitiate, yearInitiate);
        this.#fileSize = fileSizeInitiate;
        this.#format = formatInitiate;
    }
    get fileSize() {
        return this.#fileSize;
    }
    
    get format() {
        return this.#format;
    }
    toggleIssue(){
        console.log("Электронные книги всегда доступны.")
    }
}

class Library{
    #books;
    constructor() {
        this.#books = [];
      }
    addBook(b){
        if (b instanceof Book){
            this.#books.push(b);
        }
        else{
            throw new Error("Надо добавлять книгу!")
        }
        
    }
    findBook (...args){
        if (args.length == 1){
            const book = this.#books.find((a) => a.title === args[0]);
            if (!book){
                throw new Error(`Книга с названием "${args[0]}" не найдена.`);
            } 
            return book;
                
        }
        else if (args.length == 2){
            const book = this.#books.find((x) => x.author === args[0] && x.year === args[1]);
            if (!book){
                throw new Error(`Книга "${args[0]}"за ${args[1]} год не найдена`);
            }
            else{
                return book;
            }
        }
        else{
            throw new Error("Неверное количество параметров");
        }
    }

    listAllBooks() {
        this.#books.forEach((book) => {
          console.log(`Название: ${book.title}, автор: ${book.author}, выдана: ${
              book.isIssued ? "да" : "нет"}`);
        });
    }
}

//Пример для проверки работы
const library = new Library();

const book1 = new Book("Убийства по алфавиту", "Агата Кристи", 1936);
const book2 = new Book("Портер Дориана Грея", "Оскар Уайльд", 1890);
const ebook1 = new EBook("Граф Монте-Кристо", "Александр Дюма", 1846, 2.5, "epub");
const books = [book1, book2, ebook1]
books.forEach((book) => {
    library.addBook(book);
})

try{
    library.addBook("aa")
}
catch (error){
    console.error(error.message);
}

console.log(`Статус выдачи книги "${book1.title} (изначально)":`, book1.isIssued);
book1.toggleIssue();
console.log(`Статус выдачи книги "${book1.title} (после toggleIssue)":`, book1.isIssued);
book1.isIssued = false;
console.log(`Статус выдачи книги "${book1.title} (после присваивания (т е сеттера))":`, book1.isIssued);

ebook1.toggleIssue();

try{
    console.log(`Книга "${library.findBook("Убийства по алфавиту").title}" найдена!`); 
    console.log(`Книга "${library.findBook("Александр Дюма", 1846).title}" найдена!`); 
    console.log(library.findBook("u")); 
} catch (error){
    console.error(error.message);
}

console.log("\nСписок всех книг:");
library.listAllBooks();
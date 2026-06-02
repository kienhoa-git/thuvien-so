import { createContext, useContext, useState, useEffect } from 'react';
import { books as initialBooks, categories as initialCategories } from '../data/books';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const DATA_VERSION = '2';
  
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('thuvien_books');
    const version = localStorage.getItem('thuvien_version');
    
    if (saved && version === DATA_VERSION) {
      return JSON.parse(saved);
    }
    
    localStorage.setItem('thuvien_version', DATA_VERSION);
    return initialBooks;
  });
  
  const [role, setRole] = useState(null); // 'docgia' | 'thuthu' | null

  useEffect(() => {
    localStorage.setItem('thuvien_books', JSON.stringify(books));
  }, [books]);

  const loginAsDocGia = () => {
    setRole('docgia');
  };

  const loginAsThuthu = () => {
    setRole('thuthu');
  };

  const logout = () => {
    setRole(null);
  };

  // Hàm tra cứu sách (cho Độc giả)
  const searchBooks = (query) => {
    if (!query) return books;
    
    const lowerQuery = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.category.toLowerCase().includes(lowerQuery)
    );
  };

  // Hàm mượn sách (cho Độc giả)
  const borrowBook = (bookId, readerName, readerId) => {
    setBooks(prevBooks => prevBooks.map(book => {
      if (book.id === bookId) {
        return {
          ...book,
          availableCopies: Math.max(0, book.availableCopies - 1),
          borrowedBy: readerName,
          borrowerId: readerId,
          borrowDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 ngày
        };
      }
      return book;
    }));
  };

  // Hàm trả sách (cho Thủ thư)
  const returnBook = (bookId, readerName, readerId) => {
    setBooks(prevBooks => prevBooks.map(book => {
      if (book.id === bookId) {
        return {
          ...book,
          availableCopies: book.totalCopies,
          borrowedBy: null,
          borrowerId: null,
          borrowDate: null,
          dueDate: null
        };
      }
      return book;
    }));
  };

  // Hàm gia hạn (cho Độc giả)
  const renewBook = (bookId, daysToExtend) => {
    setBooks(prevBooks => prevBooks.map(book => {
      if (book.id === bookId && book.borrowedBy) {
        return {
          ...book,
          dueDate: new Date(Date.now() + daysToExtend * 24 * 60 * 60 * 1000).toISOString()
        };
      }
      return book;
    }));
  };

  // Hàm đặt trước sách (cho Độc giả)
  const placeHold = (bookId, readerName, readerId) => {
    setBooks(prevBooks => prevBooks.map(book => ({
      ...book,
      onHoldBy: readerName,
      holdQueue: [...(book.holdQueue || []), { readerName, readerId }]
    })));
  };

  // Hàm quản lý độc giả (cho Thủ thư - sẽ mở rộng sau)
  const addReader = (reader) => {
    console.log('Độc giả đã được thêm:', reader);
  };

  // Hàm thêm sách mới (cho Thủ thư)
  const addBook = (book) => {
    const newBook = {
      ...book,
      id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
      availableCopies: book.totalCopies || 1
    };
    setBooks(prevBooks => [...prevBooks, newBook]);
    return newBook;
  };

  // Hàm xóa sách (cho Thủ thư)
  const deleteBook = (bookId) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
  };

  // Hàm cập nhật thể loại (cho Thủ thư)
  const updateCategory = (bookId, category) => {
    setBooks(prevBooks => prevBooks.map(book => 
      book.id === bookId ? { ...book, category } : book
    ));
  };

  // Hàm lập báo cáo thống kê (cho Thủ thư)
  const getReport = () => {
    const borrowedBooks = books.filter(b => b.borrowedBy);
    return {
      totalBooks: books.length,
      availableBooks: books.filter(b => b.availableCopies > 0).length,
      borrowedBooksCount: borrowedBooks.length,
      categories: initialCategories.map(c => ({ ...c }))
    };
  };

  const value = {
    role,
    loginAsDocGia,
    loginAsThuthu,
    logout,
    books,
    searchBooks,
    borrowBook,
    returnBook,
    renewBook,
    placeHold,
    addReader,
    addBook,
    deleteBook,
    updateCategory,
    getReport
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

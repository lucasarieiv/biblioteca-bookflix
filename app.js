import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import { BookRepository } from './domain/repository/BookRepository.js';
const app = express();


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'njk');

nunjucks.configure(['public/views'], {
  autoescape: true,
  express: app
})

app.get('/', async (req, res) => {
  const categories = {
    1: 'Fantasia',
    2: 'Tecnologia',
    3: 'Ficção'
  }
 
  const bookRepository = new BookRepository();
  const getBooks = await bookRepository.get();
  const getTrendsBooks = await bookRepository.getTrendBooks();

  const listOfCategories = [];
  
  for (let categoryId in categories) {
    const categoriesFiltered = getBooks.filter(book => book.id_categoria == categoryId); 
    if (categoriesFiltered.length) {
      listOfCategories.push({
        title: categories[categoryId],
        books: categoriesFiltered
      })
    }
  }

  const trendBooks = {
    title: 'Top Trends',
    books: getTrendsBooks
  }
  
  res.render('index.njk', {listOfCategories, trendBooks})
})

app.get('/livros/:id', async (req, res) => {
  const {id} = req.params;

  const categories = {
    1: 'Fantasia',
    2: 'Tecnologia',
    3: 'Ficção'
  }

  const bookRepository = new BookRepository();
  const [book] = await bookRepository.getById(id);

  const { id_categoria } = book;
  const books = await bookRepository.getByCategory(id_categoria);


  return res.render('book.njk', {title: categories[id_categoria], books, book})
})

app.get('/categorias/:id', async (req, res) => {
  const {id} = req.params;

  const bookRepository = new BookRepository();
  const books = await bookRepository.get();

  res.render('books.njk', {books: books});
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

app.listen(8080, () => {
  console.log('Server is running on port 8080');
})
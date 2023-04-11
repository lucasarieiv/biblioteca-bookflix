import { pool } from '../../infra/database.js';
import { Book } from '../entity/Book.js';

export class BookRepository extends Book {
  conn = pool;
  book = new Book();
  
  async create() {
  }

  async get() {
    const [rows] = await this.conn.query('SELECT * FROM Livros');
    return rows;
  }

  async getById(id) {
    const [rows] = await this.conn.query(`SELECT * FROM Livros WHERE id_livro = ${id}`)
    return rows;
  }

  async getByCategory(id) {
    const [rows] = await this.conn.query(`SELECT * FROM Livros WHERE id_categoria = ${id}`)
    return rows;
  }

  async getTrendBooks() {
    const [rows] = await this.conn.query(`
      SELECT L.id_livro, L.titulo, L.imagem, L.autor, L.ano_publicacao, L.editora, L.id_categoria, COUNT(*) as QUANT FROM Emprestimos EMP
      INNER JOIN Exemplares EX ON EMP.id_exemplar = EX.id_exemplar
      INNER JOIN Livros L ON L.id_livro = EX.id_livro GROUP BY L.id_livro HAVING COUNT(*) > 1
    `);

    return rows;
  }

  

  update() {
    
  }
  
  delete() {

  }


}
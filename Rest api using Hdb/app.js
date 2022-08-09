express = require('express');
const bodyParser = require('body-parser');
const routesController = require('./api/index');


const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route('/books').post(routesController.addBook);

app.route('/author').post(routesController.getByAuthor);

app.route('/search').post(routesController.getById);

app.route('/delete').post(routesController.deleteBook);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
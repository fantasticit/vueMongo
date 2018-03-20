const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.controller = require('./controller');

const withRouter = require('./router');

app.use(cors());
app.use(bodyParser());

withRouter(app);

app.listen(5000, () => {
  console.log(`Server is running at http://localhost:${5000}`)
});

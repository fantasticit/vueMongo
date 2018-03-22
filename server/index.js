const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.controller = require('./controller');
const withRouter = require('./router');

app.use(cors());
// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = { code: 'no', message: err.message };
  }
})
app.use(bodyParser());

withRouter(app);

app.listen(5000, () => {
  console.log(`Server is running at http://localhost:${5000}`)
});

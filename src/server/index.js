const zlib = require('zlib');
const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.controller = require('./controller');
const withRouter = require('./router');

// gzip
app.use( async (ctx, next) => {
  await next();

  let body = ctx.body;
  if (!body) {
    return
  }

  body = JSON.stringify(body);
  ctx.set('Content-Encoding', 'gzip');
  ctx.body = zlib.gzipSync(body);
});
app.use(cors());
// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    console.log(err);
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = { code: 'no', message: err.message, time: new Date() };
  }
})
app.use(bodyParser());

withRouter(app);

app.listen(12345, () => {
  console.log(`Server is running at http://localhost:${12345}`)
});

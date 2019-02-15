// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

//提供解析request的body的功能
const bodyParser = require('koa-bodyparser');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// // 对于任何请求，app将调用该异步函数处理请求：
// app.use(async (ctx,next) =>{
//     await next();
//     // 设置response的Content-Type:
//     ctx.response.type = 'text/html';
//     // 设置response的内容:
//     ctx.response.body = '<h1>Hello, koa2!</h1>';
// })


// log request URL:
app.use(async (ctx,next) =>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
// add url-route:
// router.get('/hello/:name', async (ctx, next) => {
//     var name = ctx.params.name;
//     ctx.response.body = `<h1>Hello, ${name}!</h1>`;
// });

// router.get('/', async (ctx, next) => {
//     ctx.response.body = '<h1>Index</h1>';
// });

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '123456') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});
//这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());
// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');

module.exports ={
    port: process.env.PORT || 3000,
    client: process.env.CLIENT || 'http://localhost:4200',
    devel_database: process.env.MONGODB_URI || 'mongodb://db:password@localhost:27017/devel',
    prod_database: process.env.MONGODB_URI || 'mongodb://db:password@localhost:27017/prod',
    mongo_cursor_batchsize: process.env.MONGO_CURSOR_BATCHSIZE || 10000,
    mongo_async_parallel: process.env.MONGO_ASYNC_PARALLEL || 128,
    secret_key:'VKcGWUI26NKL9FKc7N71DnOmw3y7sMun'
};

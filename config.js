module.exports ={
    'port': process.env.PORT || 3000,
    'client': process.env.CLIENT || 'http://localhost:4200',
    database: process.env.DATABASE || 'mongodb://db:password@localhost:27017/db',
    mongo_cursor_batchsize: process.env.MONGO_CURSOR_BATCHSIZE || 10000,
    mongo_async_parallel: process.env.MONGO_ASYNC_PARALLEL || 128
};

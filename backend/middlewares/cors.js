export default {

    handleCors(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Header', 'X-Requested-With,Content-Type');
        res.setHeader('Access-control-Allow-Credentials', true);
        next();
    }
}
function index(req,res){
    const products = 'product list';
    res.send(products);
}

module.exports = {
    index:index
}
const ProductManager = require('./ProductManagger')

const productManager = new ProductManager('./products.json')

productManager.addProduct({
  title:"producto de prueba",
  description:"este es un producto de prueba",
  price:2000,
  thumbnail:'SIN IMAGEN',
  code:'abc123',
  stock:25
})
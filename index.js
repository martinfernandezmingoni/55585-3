//use este index para crear archivos y probar el programa

const ProductManager = require('./ProductManager')

const productManager = new ProductManager('./products.json')

productManager.addProduct({
  "title": "Azul",
  "description": "Crea mosaicos en este juego de azulejos y patrones.",
  "price": 13999.99,
  "thumbnail": "SIN IMAGEN",
  "code": "CM-010",
  "stock": 60
})
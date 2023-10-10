const fs = require('fs')

class ProductManager {
  
  constructor(path){
    this.products = []
    this.path = path
    this.format = 'utf-8'
    this.id = 1
  }
  
  getProducts(){
    const data = fs.readFileSync(this.path, this.format)
    return JSON.parse(data)
  }
  
  
  generateId() {
    return this.products.length === 0
      ? 1
      : this.products[this.products.length - 1].id + 1;
    }

  addProduct (product){
    const {title, description, price, thumbnail, code, stock} = product
    
    if(
      !title || 
      !description || 
      !price ||
      !thumbnail ||
      !code || 
      !stock
    ){
      console.log('Error: faltan datos')
      return
    }
    
    try {
      const data = fs.readFileSync(this.path, this.format);
      this.products = JSON.parse(data);
      
      if (this.products.some(p => p.code === code) ){
        console.log('Error: El código del producto ya existe')
        return
      }
    const newProduct = {
      id: this.generateId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(newProduct);

    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.log('Error', error.message)
      return
    }
  }
  

  getProductByID = (id) => {
    try {
      const data = fs.readFileSync(this.path, this.format);
      const products = JSON.parse(data);
      const product = products.find(p => p.id === id);
      return product ? product : 'ID Not Found';
    } catch (error) {
      console.log('Error:', error.message);
      return 'Error';
    }
  }
  

  updateProduct(id, updates) {
    try{
      const data = fs.readFileSync(this.path, this.format)
      this.products = JSON.parse(data)
      const productIndex = this.products.findIndex((x) => x.id === id)
      if (productIndex === -1) {
        console.log("El producto no existe")
        return
      }
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updates,
        id: this.products[productIndex].id
      }
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
      return this.products[productIndex]
    } catch (error){
      console.log('Error', error.message)
      return
    }
  }

  deleteProduct(id) {
    const products = this.getProducts()
    const index = products.findIndex(product => product.id === id)
    if(index === -1){
      return null
    }
    const deletedProduct = products.splice(index, 1)[0]
    fs.writeFileSync(this.path, JSON.stringify(products))
    return deletedProduct
  }

}


module.exports = ProductManager

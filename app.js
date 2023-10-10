const express = require('express');
const fs = require('fs');
const ProductManager = require('./ProductManager'); // Asegúrate de que la ruta del archivo sea correcta

const port = 8080;
const app = express();
const productManager = new ProductManager('./products.json'); // Reemplaza con la ubicación correcta del archivo JSON

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
  const { limit } = req.query;

  try {
    const products = productManager.getProducts();

    if (!limit) {
      res.json({ message: 'Todos los productos', products });
    } else {
      const limitValue = parseInt(limit);

      if (isNaN(limitValue) || limitValue <= 0) {
        return res.status(400).json({ error: 'El parámetro "limit" debe ser un número positivo' });
      }

      res.json({ message: 'Productos limitados', products: products.slice(0, limitValue) });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);

  try {
    const product = productManager.getProductByID(productId);

    if (product === 'ID Not Found') {
      return res.status(404).json({ error: `ID del producto ${productId} no encontrado` });
    }

    res.json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

app.listen(port, () => {
  console.log(`El servidor está en funcionamiento en el puerto: ${port}`);
});

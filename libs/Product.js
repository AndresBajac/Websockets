const fs = require("fs");

class Product {
  constructor(filename = "products.json") {
    this.id = 0;
    this.list = [];
    this.filename = filename;

    this.init();
  }

  init() {
    console.log(`Cargando el archivo: ${this.filename}`);
    const data = fs.readFileSync(this.filename);
    const products = JSON.parse(data);
    for (const product of products) {
      this.insert(product);
    }
    // console.log("File loaded.")
    // console.log(this.list)
  }

  find(id) {
    const product = this.list.find((product) => product.id == id);
    if (product) {
      return product;
    } else {
      return { error: "producto no encontrado" };
    }
  }

  insert(product) {
    product.id = ++this.id;
    this.list.push(product);

    return product;
  }

  update(id, product) {
    const index = this.list.findIndex((product) => product.id == id);
    console.log(index);
    if (index > -1) {
      product.id = this.list[index].id;
      this.list[index] = product;
      return product;
    } else {
      return { error: "producto no encontrado" };
    }
  }

  delete(id) {
    const index = this.list.findIndex((product) => product.id == id);
    if (index > -1) {
      this.list.splice(index, 1);
      return "Producto eliminado";
    } else {
      return { error: "producto no encontrado" };
    }
  }
}

module.exports = Product;

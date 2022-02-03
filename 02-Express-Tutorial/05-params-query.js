const express = require("express");
const app = express();
const { products } = require("./data");

app
  .get("/", (req, res) => {
    res.send(`<h1>Home Page</h1><a href='/api/products'>products</a>`);
  })
  //creating a path at /api/products, displays image id and name
  .get("/api/products", (req, res) => {
    const newProducts = products.map((product) => {
      const { name, id, image } = product;
      return { name, id, image };
    });
    res.json(newProducts);
  })

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //this is a params search 
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  .get('/api/products/:id', (req, res) => {
    //   console.log(req.params);
    const { id } = req.params;
    const singleProduct = products.find((product) => {
        return product.id === Number(id);
    });
    console.log(singleProduct)
    if(!singleProduct) {
        res.json({results: [], message:'product not found' })
    }
    res.json({results: [singleProduct], message: 'found'});
  })
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //query search for data
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  .get('/api/v1/query', (req, res) => {
      const { search, limit } = req.query;
    //... creates a new nonmutable copy
    //everything in js is  a reference, if we just say elt sortedProducts = products, it wouldnt creaate a copy, it would just make all references point to the original references. 
      let sortedProducts = [...products]
      if(search) {
          sortedProducts = sortedProducts.filter((product) => {
              return product.name.includes(search)
          })
      }
      if(limit) {
          sortedProducts = sortedProducts.slice(0, Number(limit))
      }
      if(sortedProducts.length < 1) {
        return res.json({results: [], message:'product not found' })
      }
      res.json(sortedProducts);
  })
  
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  .all("*", (req, res) => {
    res.status(404).send(`<h1>Page Not Found</h1>`);
  })
  .listen(3000, () => {
    console.log("server is listening at port 3000");
  });

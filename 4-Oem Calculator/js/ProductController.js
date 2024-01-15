//product controller 
const ProductController = (function () {

    const Product = function (id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    const data = {
        products: StorageContoller.getProduct(),
        selectedProduct: null,
        totalPrice: 0
    }



    return {
        getProducts: function () {
            return data.products;
        },
        getData: function () {
            return data;
        },
        addProduct: function (name, price) {
            let id;

            if (data.products.length == 0) {
                id = 0;
            } else {
                id = data.products[data.products.length - 1].id + 1;
            }

            const newProduct = new Product(id, name, parseFloat(price));

            data.products.push(newProduct);

            return newProduct;
        },
        saveChangeProduct: function (name, price) {
            let product = null;
            const Id = data.selectedProduct.id;
            data.products.forEach(prd => {
                if (prd.id == Id) {
                    prd.name = name;
                    prd.price = parseFloat(price);
                    product = prd;

                }
            });
            return product;
        },
        deleteProduct: function () {
            const deleteProductId = data.selectedProduct.id;

            data.products.forEach(function (product, index) {
                if (product.id == deleteProductId) {
                    data.products.splice(index, 1);
                }
            });

        },
        setSelectedProduct: function (id) {
            let selectedProduct = null;

            data.products.forEach(prd => {
                if (prd.id == id) {
                    selectedProduct = prd;
                }
            });
            data.selectedProduct = selectedProduct;
        },
        getSelectedProduct: function () {
            return data.selectedProduct;
        },
        getTotalPrice: function () {
            let total = 0;

            data.products.forEach(product => {
                total += product.price;
            });
            data.totalPrice = total;
            return data.totalPrice;
        }
    }


})()
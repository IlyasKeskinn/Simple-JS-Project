//storage controller
const StorageContoller = (function () {

    return {
        storeProduct: function (product) {
            let products = [];
            if (localStorage.getItem("products") === null) {
                products = [];
                products.push(product);

            } else {
                products = JSON.parse(localStorage.getItem('products'));
                products.push(product);
            }
            localStorage.setItem('products', JSON.stringify(products));
        },
        getProduct: function () {
            let products;
            if (localStorage.getItem("products") === null) {
                products = [];
            } else {
                products = JSON.parse(localStorage.getItem('products'));
            }
            return products;
        },
        deleteProduct: function (productId) {

            const products = JSON.parse(localStorage.getItem('products'));

            products.forEach(function (prd, index) {
                if (prd.id == productId) {
                    products.splice(index, 1);
                }
            });
            localStorage.setItem('products', JSON.stringify(products));

        },
        updateProdcut: function (product) {
            const products = JSON.parse(localStorage.getItem('products'));

            products.forEach(function (prd, index) {
                if (prd.id == product.id) {
                    products.splice(index, 1, product);
                }
            });
            localStorage.setItem('products', JSON.stringify(products));
        }
    }

})()

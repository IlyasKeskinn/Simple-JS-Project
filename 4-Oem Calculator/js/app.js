//app controller
const App = (function (ProductCtrl, UICtrl, StorageCtrl) {

    const UISelectors = UICtrl.getSelector();

    //Load event listener
    const loadEventListener = function () {

        //add product event
        document.querySelector(UISelectors.addBtn).addEventListener("click", productAndsubmit)

        //edit product
        document.querySelector(UISelectors.itemList).addEventListener("click", editProduct);

        //saveChangeSubmit
        document.querySelector(UISelectors.updateBtn).addEventListener("click", saveChangeSubmit);

        //cancel editing 
        document.querySelector(UISelectors.cancelBtn).addEventListener("click", cancelEditing);

        //delete Items
        document.querySelector(UISelectors.deleteBtn).addEventListener("click", deleteAndSubmit)
    }



    const productAndsubmit = function (e) {
        const nameInput = document.querySelector(UISelectors.nameInput).value;
        const priceInput = document.querySelector(UISelectors.priceInput).value;

        if (nameInput !== '' && priceInput !== '') {

            //add product data
            const newProduct = ProductCtrl.addProduct(nameInput, priceInput);
            //calculate totalPrice
            const totalPrice = ProductController.getTotalPrice();
            //showProduct
            UICtrl.addProduct(newProduct);

            //add to product LS
            StorageCtrl.storeProduct(newProduct);
            //show totalPrice
            UICtrl.showTotalPrice(totalPrice);
            //clearInput
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    const editProduct = function (e) {

        if (e.target.classList.contains("changeButton")) {
            //select item
            ProductCtrl.setSelectedProduct(e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
            //update UI Form
            UICtrl.updateInput();
            //edit mode
            UICtrl.editMode(e.target.parentNode.parentNode);
        } else {
           //console.log("Element not selected");
        }
        e.preventDefault();
    }
    const cancelEditing = function (e) {
        UIController.clearInput();

        //UI Uptadate Cancel
        UICtrl.cancelUpdateUI();

        e.preventDefault();
    }
    const saveChangeSubmit = function (e) {
        const name = document.querySelector(UISelectors.nameInput).value;
        const price = document.querySelector(UISelectors.priceInput).value;
        if (name !== "" && price !== "") {
            //change data product 
            const updatedProduct = ProductCtrl.saveChangeProduct(name, price);

            //update to LS
            StorageCtrl.updateProdcut(updatedProduct);
            //change UI
            const item = UICtrl.updateProdcut(updatedProduct);
            //calculate totalPrice
            const totalPrice = ProductController.getTotalPrice();
            //show totalPrice
            UICtrl.showTotalPrice(totalPrice);
            UICtrl.addMode(item);


        }
        e.preventDefault();
    }
    const deleteAndSubmit = function (e) {

        const selectedProductId = ProductController.getSelectedProduct().id;
        //delete item to product
        ProductCtrl.deleteProduct();
        //delete item to ui
        UICtrl.deleteProduct();

        //delete item LS
        StorageCtrl.deleteProduct(selectedProductId);

        if (ProductCtrl.getData().products.length == 0) {
            UICtrl.hideCards();
        } else {
            //updateTotal
            const totalPrice = ProductController.getTotalPrice();
            //show totalPrice
            UICtrl.showTotalPrice(totalPrice);
        }

        e.preventDefault();
    }



    return {
        init: function () {
            UICtrl.addMode();
            const products = ProductCtrl.getProducts();
            if (products.length == 0) {
                UICtrl.hideCards();
            } else {
                UICtrl.createProductList(products);
                const totalPrice = ProductController.getTotalPrice();
                //show totalPrice
                UICtrl.showTotalPrice(totalPrice);
            }
            loadEventListener();

        }
    }

})(ProductController, UIController, StorageContoller)



App.init();
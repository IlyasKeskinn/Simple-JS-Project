//UI controller
const UIController = (function () {

    const Selectors = {
        itemList: "#itemList",
        productItems: "#itemList tr",
        nameInput: "#nameInput",
        priceInput: "#priceInput",
        addBtn: ".add-btn",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        cancelBtn: ".cancel-btn",
        itemCard: ".itemCard",
        totalCard: ".totalCard",
        totalTL: ".totalTL",
        totalDolar: ".totalDolar",
        changeBtn: ".changeButton",

    }

    const createProductList = function (products) {
        let html = '';
        products.forEach(product => {
            html += `
            <tr class="my-2">
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}$</td>
                <td class="text-end">
                <i class="changeButton fa-solid fa-arrow-up-from-bracket"></i>
                </td>

            </tr>
            `
        });
        document.querySelector(Selectors.itemList).innerHTML = html;
    }

    return {
        createProductList,
        getSelector: function () {
            return Selectors;
        },
        addProduct: function (product) {

            document.querySelector(Selectors.itemCard).style.display = "block";
            document.querySelector(Selectors.totalCard).style.display = "block";

            const html = `
            <tr class="my-2">
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}$</td>
                <td class="text-end">
                <i class="changeButton fa-solid fa-arrow-up-from-bracket"></i>
                </td>
            </tr>
            `
            document.querySelector(Selectors.itemList).innerHTML += html;

        },
        updateInput: function (selected) {
            const selectedProduct = ProductController.getSelectedProduct();
            document.querySelector(Selectors.nameInput).value = selectedProduct.name;
            document.querySelector(Selectors.priceInput).value = selectedProduct.price;

        },
        updateProdcut: function () {
            let updateProduct = ProductController.getSelectedProduct();
            const itemList = document.querySelectorAll(Selectors.productItems);

            let updatedItem = null;

            itemList.forEach(function (item) {
                if (item.classList.contains("active")) {
                    item.children[1].textContent = updateProduct.name;
                    item.children[2].textContent = updateProduct.price + "$";
                    updatedItem = item;
                }
            });
            return updatedItem;
        },
        deleteProduct: function () {
            const deletedRow = this.selectedRow();
            this.addMode(deletedRow);

            deletedRow.remove();

        }
        ,
        cancelUpdateUI: function () {
            this.addMode(this.selectedRow().children[0].parentNode);
        },
        clearInput: function () {
            document.querySelector(Selectors.nameInput).value = '';
            document.querySelector(Selectors.priceInput).value = '';
        },
        hideCards: function () {
            document.querySelector(Selectors.itemCard).style.display = "none";
            document.querySelector(Selectors.totalCard).style.display = "none";
        },
        showTotalPrice: function (total) {
            document.querySelector(Selectors.totalDolar).textContent = total;
            document.querySelector(Selectors.totalTL).textContent = total * 30;
        },
        addMode: function (item) {
            if (item) {
                item.classList.remove('active');
            }

            this.clearInput();
            document.querySelector(Selectors.addBtn).style.display = "inline"
            document.querySelector(Selectors.cancelBtn).style.display = "none";
            document.querySelector(Selectors.deleteBtn).style.display = "none";
            document.querySelector(Selectors.updateBtn).style.display = "none";
        },
        editMode: function (tr) {

            let parent = tr.parentNode;

            for (let i = 0; i < parent.children.length; i++) {
                parent.children[i].classList.remove('active');
            }

            tr.classList.add('active');
            document.querySelector(Selectors.addBtn).style.display = "none"
            document.querySelector(Selectors.cancelBtn).style.display = "inline";
            document.querySelector(Selectors.deleteBtn).style.display = "inline";
            document.querySelector(Selectors.updateBtn).style.display = "inline";
        },
        selectedRow: function () {
            let tableRow = null;
            const items = document.querySelectorAll(Selectors.productItems);
            items.forEach(item => {
                if (item.children[0].textContent == ProductController.getData().selectedProduct.id) {
                    tableRow = item
                }
            });
            return tableRow;
        }
    }


})()

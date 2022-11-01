import { LightningElement, wire, track } from 'lwc';
import bootstrap from '@salesforce/resourceUrl/bootstrap';
import { NavigationMixin } from 'lightning/navigation';
import jquery from '@salesforce/resourceUrl/jquery';
import bootsrapCss from '@salesforce/resourceUrl/bootsrapCss';
import listProducts from '@salesforce/apex/ProductController.getAllProducts';
import searchProducts from '@salesforce/apex/ProductController.searchProducts';
import deleteProduct from '@salesforce/apex/ProductController.deleteProduct';
import productResources from '@salesforce/resourceUrl/photo_product';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ProductList extends NavigationMixin(LightningElement) {
    //@wire(listProducts) products;
    @wire(searchProducts, { searchTerm: '$searchTerm' })

    openModal = false;
    products;
    error;
    searchTerm = '';
    panier = [];
    // @wire(searchProducts, { searchTerm: '$searchTerm' })

    selectedProductDes;
    selectedProductName;
    selectedProductPhoto;
    selectedProduct = false;


    appResources = {
        photo: productResources
    };
    loadBootstrap() {
        Promise.all([
            loadScript(this, bootstrap + '/bootstrap-5.2.1-dist/js/bootstrap.js'),
            loadScript(this, jquery),
            loadStyle(this, bootstrap + '/bootstrap-5.2.1-dist/css/bootstrap.min.css')
        ]).then(() => {
            console.log('fail');
        }).catch(error => {
            console.log('errrrrrrrr');

        });
    }
    connectedCallback() { // ongInit
        // refreshApex(this.products);
        this.loadBootstrap();
        this.loadProducts();


    }
    loadProducts() {
        listProducts()
            .then(result => {
                /*  console.log(result);
                const newResult = result.map((obj, i) => ({
                    ...obj,
                    promo: obj.price__c * 0.3

                }));*/
                console.log('fffffffffff' + result);
                this.products = result;
            })
            .catch(error => {
                //console.log('errrrrrrrr');
                this.error = error;
            });
    }

    searchTermChange(event) {

        console.log('ghhhh')
        const searchTerm = event.target.value;
        searchProducts({ searchTerm: searchTerm })
            .then(result => {
                /*  console.log(result);
                const newResult = result.map((obj, i) => ({
                    ...obj,
                    promo: obj.price__c * 0.3

                }));*/
                console.log('fffffffffff' + result);
                this.products = result;
            })
            .catch(error => {
                //console.log('errrrrrrrr');
                this.error = error;
            });
    }

    productSelected(evt) {
        console.log(evt);
        evt.preventDefault();
        selectedProduct = true;
        //console.log('id => ' + evt.target.dataset.id);
        this.selectedProductId = evt.target.dataset.id;
        this.selectedProductName = evt.target.dataset.name;
        this.selectedProductDes = evt.target.dataset.des;
        this.selectedProductPhoto = evt.target.dataset.photo;

        //console.log("hellooo" + this.selectedProductId.Name);
    }

    showProductSelected(evt) {

        console.log(evt.target.dataset.id)
        const productId = evt.target.dataset.id;

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: productId,
                objectApiName: 'product_shop__c',
                actionName: 'view',
            },
        });
    }

    deleteProductSelected(evt) {

        // console.log(evt.target.dataset.id)
        const productId = evt.target.dataset.id;
        deleteProduct({ productId: productId })
            .then(result => {
                // console.log(result);
                this.loadProducts();
                // console.log('protocole is deleted');
                // refreshApex(this.products);
                //console.log(this.products);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: "Product deleted successfully!",
                        variant: 'success'
                    })
                );

            })
            .catch(error => {
                console.log(error);
                this.error = error;
            });




    }

    addProduct(evt) {
        const id = evt.target.dataset.id;
        const name = evt.target.dataset.name;
        const image = evt.target.dataset.image;
        const prix = evt.target.dataset.prix;
        selectedProduct = false;
        // console.log('mu id', id);
        let articleTrouve = this.findElemnt(this.panier, id);

        if (articleTrouve == null) {


            this.panier.push({ idP: id, nameP: name, prixP: prix, qte: 1 });
            console.log(this.panier)
        } else {

            articleTrouve.qte = articleTrouve.qte + 1;

        }



        localStorage.setItem("cart", JSON.stringify(this.panier));



    }


    handleOpenModal() {
        this.openModal = true;
    }
    handleCloseModal() {
        this.openModal = false;
    }
    findElemnt(panier, value) {

        console.log('valeur ', value);
        const product = panier.find(i => i.idP == value);

        if (product != null) {


            return product;
        } else {

            return null;
        }








    }
}
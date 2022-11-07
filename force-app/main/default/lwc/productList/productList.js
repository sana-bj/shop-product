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
    @track local;
    products;
    error;
    searchTerm = '';
    panier = [];
    @track total = 0;
    subtotal = 0;
    // @wire(searchProducts, { searchTerm: '$searchTerm' })

    selectedProductDes;
    selectedProductName;
    selectedProductPhoto;
    selectedProduct = false;
    panierSelected = false;


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
        this.loadPanier();

    }
    loadProducts() {
        listProducts()
            .then(result => {
                //console.log('fffffffffff' + result);
                this.products = result;
            })
            .catch(error => {
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
        //console.log(evt);
        evt.preventDefault();
        //selectedProduct = true;
        //console.log('id => ' + evt.target.dataset.id);
        this.selectedProductId = evt.target.dataset.id;
        this.selectedProductName = evt.target.dataset.name;
        this.selectedProductDes = evt.target.dataset.des;
        this.selectedProductPhoto = evt.target.dataset.photo;
        this.panierSelected = false;

        //console.log("hellooo" + this.selectedProductId.Name);
    }

    showProductSelected(evt) {

        //console.log(evt.target.dataset.id)
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
    hanldeProgressValueChange(event) {
        this.panier = event.detail;
    }
    addProduct(evt) {
        const productId = evt.target.dataset.id;
        const name = evt.target.dataset.name;
        const prix = evt.target.dataset.prix;
        this.panierSelected = true;
        this.selectedProductName = false;
        this.total = 0;
        console.log('====>', this.panier);

        let articleTrouve = this.findElemnt(this.panier, productId);
        console.log('====> article', articleTrouve);
        if (articleTrouve == null) {
            this.panier.push({ idP: productId, nameP: name, prixP: prix, qte: 1 });
            console.log(this.panier)
        } else {
            articleTrouve.qte = articleTrouve.qte + 1;
        }
        this.panier.forEach(p => {
            this.subtotal = p.prixP * p.qte;
            this.total = this.total + this.subtotal;
        });

        localStorage.setItem("panier", JSON.stringify(this.panier));


        //  localStorage.setItem("cart", JSON.stringify(this.panier));
    }

    handleOpenModal() {
        this.openModal = true;
    }
    handleCloseModal() {
        this.openModal = false;
    }
    findElemnt(panier, value) {

        const result = panier.find(({ idP }) => idP === value);
        console.log(result);
        return result


    }
    loadPanier() {

        this.panier = localStorage.getItem("panier");


        if (this.panier == null) { this.panier = []; } else { this.panier = JSON.parse(this.panier); }

    }
}
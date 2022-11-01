import { LightningElement, wire, track } from 'lwc';
import bootstrap from '@salesforce/resourceUrl/bootstrap';
import { NavigationMixin } from 'lightning/navigation';
import jquery from '@salesforce/resourceUrl/jquery';
import bootsrapCss from '@salesforce/resourceUrl/bootsrapCss';
import getCatFemme from '@salesforce/apex/ProductController.getCatFemme';
import searchProducts from '@salesforce/apex/ProductController.searchProducts';
import deleteProduct from '@salesforce/apex/ProductController.deleteProduct';
import productResources from '@salesforce/resourceUrl/photo_product';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CatFemme extends NavigationMixin(LightningElement) {


    products;
    searchTerm = '';

    selectedProductDes;
    selectedProductName;
    selectedProductPhoto;

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
        getCatFemme()
            .then(result => {

                console.log('fffffffffff' + result);
                this.products = result;
            })
            .catch(error => {

                this.error = error;
            });
    }

    searchTermChange(event) {

        //console.log('ghhhh')
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
        console.log('id => ' + evt.target.dataset.id);
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


    handleOpenModal() {
        this.openModal = true;
    }
    handleCloseModal() {
        this.openModal = false;
    }
}
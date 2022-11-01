import { LightningElement, api, wire } from 'lwc';
import getOneProduct from '@salesforce/apex/DetailController.getOneProduct';
import productResources from '@salesforce/resourceUrl/photo_product';
export default class Detail extends LightningElement {

    @api id;
    @api name;
    @api des;
    @api photo;
    //@wire(getOneProduct, { id: '$idP' }) product_shop__c
    product;

    appResources = {
        photo: productResources
    };

    connectedCallback() { // ongInit
        console.log('detail compoenent')
        getOneProduct({ id: this.id })
            .then(result => {
                console.log('result');
                console.log(result);
                this.product = result;
            })
            .catch(error => {
                console.log(error);
                this.error = error;
            });
    }
    productClick() {

        getOneProduct({ id: this.id })
            .then(result => {
                console.log('result');
                console.log(result);
                this.products = result;
            })
            .catch(error => {
                console.log(error);
                this.error = error;
            });
    }




}
import { LightningElement } from 'lwc';
import listProducts from '@salesforce/apex/ProductController.getAllProducts';
export default class ListProductSelected extends LightningElement {


    products;
    connectedCallback() { // ongInit
        listProducts()
            .then(result => {
                //  console.log(result);

                this.products = result;
            })
            .catch(error => {
                //console.log('errrrrrrrr');
                this.error = error;
            });
    }
    handleClick(evt) {
        // This component wants to emit a productselected event to its parent
        const event = new CustomEvent('productselected', {
            detail: evt.detail
        });
        // Fire the event from c-list
        this.dispatchEvent(event);
    }
}
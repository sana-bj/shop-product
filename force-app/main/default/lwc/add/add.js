import { LightningElement, api, track } from 'lwc';
import NAME_FIELD from "@salesforce/schema/product_shop__c.Name";
import PRICE_FIELD from "@salesforce/schema/product_shop__c.price__c";
import Description_FIELD from "@salesforce/schema/product_shop__c.Description__c";
import CATEGORY_FIELD from "@salesforce/schema/product_shop__c.category__c";
//import addProduct from '@salesforce/apex/ProductController.addProduct';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class Add extends NavigationMixin(LightningElement) {


    // @api modalClass = "slds-modal slds-fade-in-open slds-modal_large";

    @track customFormModal = false;

    @api recordId;

    //create an array type property	
    fields = [NAME_FIELD, PRICE_FIELD, Description_FIELD, CATEGORY_FIELD];

    customShowModalPopup() {
        this.customFormModal = true;
    }

    customHideModalPopup() {

        this.customFormModal = false;
    }
    handleSave() {
        console.log('save');

        this.handleRecordSave();
    }
    handleSuccess() {


        const showSuccess = new ShowToastEvent({
            title: 'Success!!',
            message: 'Account has been created',
            variant: 'Success',
        });
        this.dispatchEvent(showSuccess);
        this[NavigationMixin.Navigate]({
            type: 'c__app',
            attributes: {
                apiName: c__home_product,
            }


        });
        this.customFormModal = false;

    }

    handleRecordSave() {
        console.log(this.fields[0].value);

        this.addProduct(this.fields)
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
    }



}
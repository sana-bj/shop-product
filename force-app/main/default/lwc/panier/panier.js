import { LightningElement, api, wire } from 'lwc';

export default class Panier extends LightningElement {



    @api products;
    @api total;
    @api progressValue;
    panier;

    viderPanier() {

        this.products = [];
        this.total = 0;
        localStorage.removeItem("panier");
        localStorage.removeItem("total");


    }


    handleChnage(event) {


        this.products = [];
        this.total = 0;
        localStorage.removeItem("panier");
        localStorage.removeItem("total");

        this.panier = localStorage.getItem("panier");


        if (this.panier == null) { this.panier = []; } else { this.panier = JSON.parse(this.panier); }

        console.log(this.panier);

    }


}
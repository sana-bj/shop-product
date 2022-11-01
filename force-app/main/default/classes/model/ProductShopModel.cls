public with sharing class ProductShopModel{

    
    integer id ;
    string name ;
    string price ;
    string image ;
    string description ;
    string totalVente ;

    public ProductShopModel(integer id, string name, string image, string price, string description,string totalVente) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.totalVente = totalVente;


        
    }

}
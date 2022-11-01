public with sharing class ProductShopModel{

    
    public integer id { get; set; }
    public string name { get; set; }
    public string price { get; set; }
    public string image { get; set; }
    public string description { get; set; }
    public string totalVente { get; set; }

    public ProductShopModel(integer id, string name, string image, string price, string description,string totalVente) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.totalVente = totalVente;


        
    }

}
//import { ProductShopModel } from  '@salesforce/apex/ProductShopModel.ProductShopModel';
//const ProductShopModel = require ('model/ProductShopModel')
public with sharing class ProductController {
   
    @AuraEnabled
    public static product_shop__c[] getAllProducts() {

       // ProductShopService service = new ProductShopService(0);
       // product_shop__c[] shopService = service..getProducts();
       
       // product_shop__c[] shopService = ProductShopService.getProducts();
        //return shopService;

        return[
             SELECT
               Id,
                Name,
                Description__c,
                image__c,
                price__c
              
            FROM product_shop__c
           
            ORDER BY Name
            LIMIT 50
        ];


    }


    @AuraEnabled(cacheable=true scope='global')
    public static product_shop__c[] searchProducts(String searchTerm) {
     
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getAllProducts();
        }
        
        searchTerm = '%' + searchTerm + '%';
  
        return [
            SELECT
               Id,
                Name,
                Description__c,
                image__c,
                price__c
              
            FROM product_shop__c
            WHERE Name LIKE :searchTerm
            WITH SECURITY_ENFORCED
            ORDER BY Name
         
        ];
    }

    @AuraEnabled
    public static void deleteProduct(ID productId) {

        list<product_shop__c> product = [SELECT Id FROM product_shop__c WHERE Id = :productId];
        delete product;
       




    }

    @AuraEnabled
    public static product_shop__c[] getCatFemme() {

       
        return[
            SELECT Id,Name,Description__c,category__c 
            FROM product_shop__c
            WHERE category__c='a0F7R00002XFa4nUAD'
          
            ORDER BY Name
            LIMIT 50
       ];
       




    }
    

    
}

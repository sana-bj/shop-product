public  with sharing class ProductShopService  {

   

   public ProductShopService() 
   {
      
   }

    @AuraEnabled
    public static product_shop__c[] getProducts() {

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
}
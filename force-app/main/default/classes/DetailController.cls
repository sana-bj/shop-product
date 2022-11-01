public with sharing class DetailController {
    @AuraEnabled(cacheable=true)
    public static product_shop__c[] getOneProduct(String id) {
   
        return [
            SELECT
                Id,
                Name,
                Description__c,
                image__c,
                price__c
              
            FROM product_shop__c
         
            WHERE id =  :id
            WITH SECURITY_ENFORCED
        ];
    }
}

@RestResource(urlMapping='/product_shop__c/*')
global with sharing class ProductManager {
      @HttpGet
    global static product_shop__c getAccount() {
        RestRequest request = RestContext.request;
        // grab the caseId from the end of the URL
        String productId = request.requestURI.substring(request.requestURI.lastIndexOf('/')+1);
        product_shop__c result = [ SELECT ID, Name, Description__c
                        FROM product_shop__c
                        WHERE Id = :productId];
        return result;
    }
    @HttpPost
    global static ID createProduct(String Name, String Description,
        Decimal price) {
        product_shop__c product = new product_shop__c(
            Name=Name,
            Description__c=Description,
            price__c=price);
        insert product;
        return product.Id;
    } 
    @HttpDelete
    global static void deleteProduct() {
        RestRequest request = RestContext.request;
        String productId = request.requestURI.substring(
            request.requestURI.lastIndexOf('/')+1);
        product_shop__c product = [SELECT Id FROM product_shop__c WHERE Id = :productId];
        delete product;
    }

    

}

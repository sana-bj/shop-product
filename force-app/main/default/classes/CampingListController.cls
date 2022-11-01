public with sharing class CampingListController {
    /*@AuraEnabled(cacheable=true)
    public static Camping_Item__c[] getItems() {

      List<Camping_Item__c> camping;
        if(
            Contact.SObjectType.getDescribe().isAccessible() &&
            Schema.SObjectType.Camping_Item__c.fields.Name.isAccessible() &&
            Schema.SObjectType.Camping_Item__c.fields.Quantity__c.isAccessible()
        ) {
            camping = [SELECT
         Id, Name, Quantity__c
          FROM Camping_Item__c  ];
        }
        return camping;
 
}
@AuraEnabled(cacheable=true)
    public static Camping_Item__c[] saveItem(Camping_Item__c campingItem) {
        upsert campingItem;
        return campingItem;

    }
   */

}

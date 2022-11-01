public with sharing class MyContactListController {
    @AuraEnabled(cacheable=true)
    public static Contact[] getContacts() {

        List<Contact> contacts;
        if(
            Contact.SObjectType.getDescribe().isAccessible() &&
            Schema.SObjectType.Contact.fields.FirstName.isAccessible() &&
              Schema.SObjectType.Contact.fields.Email.isAccessible() &&
              Schema.SObjectType.Contact.fields.Phone.isAccessible() &&
            Schema.SObjectType.Contact.fields.LastName.isAccessible()
        ) {
            contacts = [SELECT FirstName, LastName, Email
            FROM Contact
            WITH SECURITY_ENFORCED
            ORDER BY FirstName];
        }
        return contacts;

    
}


}

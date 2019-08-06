public with sharing class ProductController {
    
    @AuraEnabled(cacheable=true)
    public static List<ccrz__E_Product__c> findProducts(String searchKey) {
        String key = '%' + searchKey + '%';
        
        // return [SELECT Id, Name, AccountNumber
        //         FROM Account 
        //         WHERE Name LIKE :key 
        //         LIMIT 10];

        // return Database.query(
        //     'SELECT Id, ccrz__SKU__c, Name, ccrz__SEODescription__c ' +
        //     'FROM ccrz__E_Product__c ' +
        //     'WHERE Name LIKE ' + key +
        //     'LIMIT 5'
        // );

        return [SELECT Id, ccrz__SKU__c, Name, ccrz__SEODescription__c
                FROM ccrz__E_Product__c 
                WHERE Name LIKE :key 
                LIMIT 10];
    }

}

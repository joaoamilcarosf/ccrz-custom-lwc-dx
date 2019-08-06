import { LightningElement, track } from 'lwc';
import findAccounts from '@salesforce/apex/ProductController.findAccounts';

/** The delay used when debouncing event handlers before invoking Apex. */
const DELAY = 350;

export default class SearchProductRecordsCard extends LightningElement {
  @track accounts;
  @track error;
  
  handleKeyChange(event) {
    // Debouncing this method: Do not actually invoke the Apex call as long as this function is
    // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
    window.clearTimeout(this.delayTimeout);
    const searchKey = event.target.value;
    
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.delayTimeout = setTimeout(() => {
      findAccounts({ searchKey })
      .then(result => {
        this.accounts = result;
        this.error = undefined;
      })
      .catch(error => {
        this.error = error;
        this.accounts = undefined;
      });
    }, DELAY);
  }
}
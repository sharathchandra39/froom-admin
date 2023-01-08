import { FroomCustomer } from "./froom.customer";
import { FroomMerchant } from "./froom.merchant";
import { FroomOrderDetails } from "./froom.order.details";

export class FroomOrder {
    zipUUID!: number;
    transactionID!: any;
    orderDetails!: FroomOrderDetails[];
    customerDetails!: FroomCustomer; 
    merchantDetails!: FroomMerchant; 
    
  }
  
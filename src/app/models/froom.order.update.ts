import { FroomCustomer } from './froom.customer';
import { FroomMerchant } from './froom.merchant';
import { FroomOrderDetails } from './froom.order.details';

export class FroomOrderUpdate {
  uuID!: any;
  transactionID!: any;
  orderDetails!: FroomOrderDetails[];
  newStatus!: any;
  comments!: any;
  trackingID!: any;
  trackingInfo!: any;
}

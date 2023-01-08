import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { FroomCustomer } from 'src/app/models/froom.customer';
import { FroomMerchant } from 'src/app/models/froom.merchant';
import { FroomOrder } from 'src/app/models/froom.order';
import { FroomOrderDetails } from 'src/app/models/froom.order.details';
import { FroomLocation } from 'src/app/models/froomLocation';
import { FroomApiService } from 'src/app/services/froom-api.service';

@Component({
  selector: 'app-froom-order-mgmt',
  templateUrl: './froom-order-mgmt.component.html',
  styleUrls: ['./froom-order-mgmt.component.css'],
})
export class FroomOrderMgmtComponent implements OnInit {
  froomOrderForm!: FormGroup;
  productsArray!: FormArray;
  cntOfFroomLocations: any;
  froomLocations!: FroomLocation[];
  showNoFroomLocations!: boolean;
  showZipSelectionSection: boolean = true;
  showContactSelection: boolean = false;
  showContactSelectionSection: boolean = false;
  showMerchantSelection: boolean = false;
  showMerchantSelectionSection: boolean = false;
  showProductSelection: boolean = false;
  showProductSelectionSection: boolean = false;
  showConfirmationSelectionSection: boolean = false;
  showConfirmationSelection: boolean = false;
  totalItmes: number = 0;
  totalCartValue: number = 0;

  public columnDefs!: ColDef[];
  selectedRowData: any;
  public rowData$!: any;
  gridOptions!: GridOptions;
  gridApi: any;
  gridColumnApi: any;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  customerUserName: any;
  merchantName: any;
  cartMessage!: string;
  calculationDone!: boolean;

  saveFroomObjt!: FroomOrder;
  saveCustomerObjt!: FroomCustomer;
  saveMerchantObjt!: FroomMerchant;
  saveFroomOrderDetails!: FroomOrderDetails;
  saveFroomOrders!: FroomOrderDetails[];
  saveFroomOrderProducts!: any[];

  constructor(
    private modal: NgbModal,
    private froomAPI: FroomApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setupFormObject();
    // this.addProductsForm();
  }

  setupFormObject() {
    this.froomOrderForm = this.fb.group({
      zipCode: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl('', Validators.required),
      userPhoneNumber: new FormControl('', Validators.required),
      merchantName: new FormControl('', Validators.required),
      merchantEmail: new FormControl('', Validators.required),
      merchantPhoneNumber: new FormControl('', Validators.required),
      transactionId: new FormControl('', Validators.required),
      products: new FormArray([]),
    });
  }

  addProductsForm() {
    const prodArray = this.froomOrderForm.get('products') as FormArray;

    const validators = [Validators.required];

    prodArray.push(
      new FormGroup({
        productCategory: new FormControl('', validators),
        productDescription: new FormControl('', validators),
        productId: new FormControl('', validators),
        productName: new FormControl('', validators),
        productPrice: new FormControl('', validators),
        productQuantity: new FormControl('', validators),
      })
    );
    this.totalItmes++;
  }

  get productFromAttr() {
    return this.froomOrderForm.controls['products'];
  }

  get productFromAttrControl() {
    return (this.froomOrderForm.get('products') as FormArray).controls;
  }

  fetchFroomLocations() {
    this.froomAPI
      .getFroomLocations(this.froomOrderForm.value.zipCode)
      .subscribe(
        (data) => {
          if (data) {
            this.froomLocations = JSON.parse(JSON.stringify(data));
            this.cntOfFroomLocations = this.froomLocations.length;
            this.setupFroomLocationData(this.froomLocations);
          } else {
            this.showNoFroomLocations = true;
          }
        },
        (error) => {
          console.error(error);
          this.showNoFroomLocations = true;
        }
      );
  }

  setupFroomLocationData(locationData: FroomLocation[]) {
    if (locationData) {
      this.rowData$ = locationData;
      const columns = Object.keys(this.rowData$[0]);
      this.columnDefs = columns.map((field) => ({
        field,
        sortable: true,
        filter: true,
        resizable: true,
        checkboxselection: false,
        hide: false,
      }));

      this.columnDefs.filter((f, i) => {
        if (f.field === 'uuid') {
          f.headerName = 'Froom Location ID';
          f.checkboxSelection = true;
        } else if (f.field === 'zipDetails') {
          f.headerName = 'Store Name';
        } else if (f.field === 'createdDate') {
          f.hide = true;
        } else if (f.field === 'stores') {
          f.hide = true;
        } else if (f.field === 'isActive') {
          f.hide = true;
        } else if (f.field === 'updatedBy') {
          f.hide = true;
        } else if (f.field === 'createdBy') {
          f.hide = true;
        } else if (f.field === 'updatedDate') {
          f.hide = true;
        }
      });

      this.gridOptions = {
        columnDefs: this.columnDefs,
        rowHeight: 40,
        rowSelection: 'single',
        minColWidth: 129,
        pagination: true,
        paginationAutoPageSize: true,
        enableCellTextSelection: true,
        suppressFocusAfterRefresh: true,
      };
    }
  }

  onGridReady(params?: GridReadyEvent) {
    this.gridApi = params?.api;
    this.gridColumnApi = params?.columnApi;
  }

  onSelectionChanged(event: any) {
    this.selectedRowData = this.gridApi.getSelectedRows();
    this.showZipSelectionSection = false;
    this.showContactSelection = true;
    this.showContactSelectionSection = true;
    console.log(this.selectedRowData);
  }

  continueToMerchantSelection() {
    this.showContactSelectionSection = false;
    this.customerUserName = this.froomOrderForm.value.userName;
    this.showMerchantSelection = true;
    this.showMerchantSelectionSection = true;
  }

  continueToProductSelection() {
    this.showMerchantSelectionSection = false;
    this.merchantName = this.froomOrderForm.value.merchantName;
    this.showProductSelection = true;
    this.showProductSelectionSection = true;
  }

  validateUserForm() {
    return !(
      this.froomOrderForm.value.userName &&
      this.froomOrderForm.value.userPhoneNumber &&
      this.froomOrderForm.value.userEmail
    );
  }

  validateMerchantForm() {
    return !(
      this.froomOrderForm.value.merchantName &&
      this.froomOrderForm.value.merchantPhoneNumber &&
      this.froomOrderForm.value.merchantEmail
    );
  }

  validateOrderForm() {
    return this.productFromAttr.invalid;
  }
  cacluateCartValue() {
    this.productFromAttr.value.forEach((prod: any, index: any) => {
      this.totalCartValue =
        this.totalCartValue + prod.productPrice * prod.productQuantity;
      this.cartMessage = 'Total ' + this.totalItmes + ' products added to Cart';
      this.showProductSelectionSection = false;
      this.showConfirmationSelectionSection = true;
      this.showConfirmationSelection = true;
      this.calculationDone = true;
    });
  }

  addFroomOrder() {
    console.log(this.froomOrderForm);
    this.saveFroomObjt = new FroomOrder();
    this.saveFroomObjt.zipUUID = this.selectedRowData[0].uuid;
    this.saveFroomObjt.transactionID = this.froomOrderForm.value.transactionId;

    this.saveCustomerObjt = new FroomCustomer();
    this.saveCustomerObjt.name = this.froomOrderForm.value.userName;
    this.saveCustomerObjt.userName = this.froomOrderForm.value.userName;
    this.saveCustomerObjt.userEmail = this.froomOrderForm.value.userEmail;

    this.saveFroomObjt.customerDetails = this.saveCustomerObjt;

    this.saveMerchantObjt = new FroomMerchant();
    this.saveMerchantObjt.merchantName = this.froomOrderForm.value.merchantName;
    this.saveMerchantObjt.merchantEmail =
      this.froomOrderForm.value.merchantEmail;
    this.saveMerchantObjt.merchantDetails =
      this.froomOrderForm.value.merchantPhoneNumber;

    this.saveFroomObjt.merchantDetails = this.saveMerchantObjt;

    this.saveFroomOrderDetails = new FroomOrderDetails();

    this.saveFroomOrderProducts = [];
    this.productFromAttr.value.forEach((prod: any, index: any) => {
      this.saveFroomOrderProducts.push(prod);
    });

    this.saveFroomOrderDetails.productDetails = JSON.stringify(
      this.saveFroomOrderProducts
    );

    console.log(this.saveFroomOrderDetails);
    this.saveFroomOrders = [];
    this.saveFroomOrders.push(this.saveFroomOrderDetails);

    this.saveFroomObjt.orderDetails = this.saveFroomOrders;

    console.log(this.saveFroomObjt);

    this.froomAPI.addFroomOrder(this.saveFroomObjt).subscribe(
      (data) => {
        alert('Order Received' + data);
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

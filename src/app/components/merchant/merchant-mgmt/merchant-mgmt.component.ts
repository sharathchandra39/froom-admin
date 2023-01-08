import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { FroomCustomer } from 'src/app/models/froom.customer';
import { FroomMerchant } from 'src/app/models/froom.merchant';
import { FroomOrder } from 'src/app/models/froom.order';
import { FroomOrderDetails } from 'src/app/models/froom.order.details';
import { FroomOrderUpdate } from 'src/app/models/froom.order.update';
import { FroomApiService } from 'src/app/services/froom-api.service';

@Component({
  selector: 'app-merchant-mgmt',
  templateUrl: './merchant-mgmt.component.html',
  styleUrls: ['./merchant-mgmt.component.css'],
})
export class MerchantMgmtComponent implements OnInit {
  public rowData$!: any;
  gridOptions!: GridOptions;
  gridApi: any;
  gridColumnApi: any;
  selectedRowData: any;
  public columnDefs!: ColDef[];

  froomUpdateForm!: FormGroup;
  updateFroomObjt!: FroomOrderUpdate;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  // saveCustomerObjt!: FroomCustomer;
  // saveMerchantObjt!: FroomMerchant;
  saveFroomOrderDetails!: FroomOrderDetails;

  onGridReady(params?: GridReadyEvent) {
    this.gridApi = params?.api;
    this.gridColumnApi = params?.columnApi;
  }

  onSelectionChanged(event: any) {
    this.selectedRowData = this.gridApi.getSelectedRows();
    console.log(this.selectedRowData);
  }
  ngOnInit(): void {
    this.fetchAvailableOrders();
  }

  constructor(
    private froomService: FroomApiService,
    private modalService: NgbModal
  ) {}

  setupFormObject() {
    this.froomUpdateForm = new FormGroup({
      newStatus: new FormControl('', Validators.required),
      trackingId: new FormControl('', Validators.required),
      trackingDetails: new FormControl('', Validators.required),
      comments: new FormControl(''),
    });
  }

  private fetchAvailableOrders() {
    this.froomService.getAllFroomOrders().subscribe(
      (data) => {
        if (data) {
          this.rowData$ = data;
          const columns = Object.keys(this.rowData$[0]);
          this.columnDefs = columns.map((field) => ({
            field,
            sortable: true,
            filter: true,
            resizable: true,
            checkboxselection: false,
            hide: false,
          }));

          // this.columnDefs.push({
          //   headerName: 'Action',
          //   field: 'viewAction',
          //   cellRendererParams: {
          //     viewAction: this.viewAction()
          //   },
          //   cellClass: 'no-border',
          //   editable: false,
          //   sortable: false,
          //   filter: true,
          //   resizable: true,
          //   lockPosition: true,
          //   width: 200
          // })

          this.columnDefs.filter((f, i) => {
            // filter logic
            // if(f.field === 'action') {
            //   this.columnDefs.splice(i+1);
            // }
            if (f.field === 'uuID') {
              f.headerName = 'Froom ID';
              f.checkboxSelection = true;
            } else if (f.field === 'createdDate') {
              f.sortable = true;
              f.sort = 'desc';
            } else if (f.field === 'froomOrderDetails') {
              f.hide = true;
            } else if (f.field === 'froomZipId') {
              f.hide = true;
            } else if (f.field === 'isActive') {
              f.hide = true;
            } else if (f.field === 'merchantId') {
              f.hide = true;
            } else if (f.field === 'customerId') {
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
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openEditModal(content: any) {
    this.setupFormObject();
    this.modalService.open(content, {
      size: 'xl',
      windowClass: 'my-class',
      scrollable: false,
      backdrop: 'static',
    });
  }

  updateFroomOrder() {
    this.updateFroomObjt = new FroomOrderUpdate();

    this.updateFroomObjt.newStatus = this.froomUpdateForm.value.newStatus;
    this.updateFroomObjt.trackingID = this.froomUpdateForm.value.trackingId;
    this.updateFroomObjt.trackingInfo =
      this.froomUpdateForm.value.trackingDetails;
    this.updateFroomObjt.comments = this.froomUpdateForm.value.comments;
this.updateFroomObjt.uuID = this.selectedRowData[0].uuID; 
    this.froomService
      .updateFroomOrder(this.updateFroomObjt)
      .subscribe((data) => {
        if (data) {
          alert('Order updated successfully');
        }
      });
  }
}

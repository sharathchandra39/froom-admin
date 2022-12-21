import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  ColDef,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { FroomApiService } from 'src/app/services/froom-api.service';

@Component({
  selector: 'app-froom-orders',
  templateUrl: './froom-orders.component.html',
  styleUrls: ['./froom-orders.component.css'],
})
export class FroomOrdersComponent implements OnInit {
  orders: any;
  public columnDefs!: ColDef[];
  selectedRowData: any;
  orderDetails: any;
  productDetails: Product[] = [];
  finalProductDetails!: Product[];
  froomLocationsData!: any[];
  constructor(
    private froomService: FroomApiService, 
    private modalService: NgbModal  ) {}

  
  public rowData$!: any;
  gridOptions!: GridOptions;
  gridApi: any;
  gridColumnApi: any;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

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
  viewAction() {
    throw new Error('Method not implemented.');
  }

  // onCellClicked(e: CellClickedEvent): void {
  //   console.log('cellClicked', e);
  //   this.selectedRowData = e;
  // }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  refresh(){
    this.fetchAvailableOrders();
  }

  openViewModal(content: any) {
    this.fetchOrderDetails(content);
  }

  fetchOrderDetails(content: any) {
    this.froomService.getFroomOrderForUUID(this.selectedRowData[0].uuID)
    .subscribe(data=> {
      this.orderDetails = {};
      debugger;
      if(data) {
        this.orderDetails = data;
        this.productDetails = JSON.parse("["+this.orderDetails.froomOrderDetails.productDetails+"]"); 
        this.productDetails.forEach(data=> {this.finalProductDetails = [];
          this.finalProductDetails.push(data); }); 
        this.finalProductDetails = JSON.parse ("["+this.finalProductDetails+"]");
        console.log(this.finalProductDetails);
        // this.fetchLocations(this.orderDetails.froomZipId);
        this.modalService.open(content, {size: 'xl', windowClass: 'my-class', scrollable: false, backdrop: 'static'})
      }
    }, error=> {console.error(error);
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { FroomLocation } from 'src/app/models/froomLocation';
import { FroomStores } from 'src/app/models/froomstores';
import { FroomApiService } from 'src/app/services/froom-api.service';

@Component({
  selector: 'app-froom-locations',
  templateUrl: './froom-locations.component.html',
  styleUrls: ['./froom-locations.component.css'],
})
export class FroomLocationsComponent implements OnInit {
  public columnDefs!: ColDef[];
  selectedRowData: any;
  public rowData$!: any;
  gridOptions!: GridOptions;
  gridApi: any;
  gridColumnApi: any;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  stores!: FroomStores;
  storeDtlObj!: FroomStores;

  //Adding a form:
  newFroomlocation!: FormGroup;
  saveLocationObj!: FroomLocation;
  saveObjStores: any;

  onGridReady(params?: GridReadyEvent) {
    this.gridApi = params?.api;
    this.gridColumnApi = params?.columnApi;
  }

  onSelectionChanged(event: any) {
    this.selectedRowData = this.gridApi.getSelectedRows();
    console.log(this.selectedRowData);
  }

  constructor(
    private froomAPIService: FroomApiService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.setupFormObject();
    this.setupFroomLocationData();
  }
  setupFormObject() {
    this.newFroomlocation = new FormGroup({
      storeName: new FormControl('', Validators.required),
      addressLine1: new FormControl('', Validators.required),
      addressLine2: new FormControl(''),
      city: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      stateCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      pickUpTimings: new FormControl(''),
      googleDrop: new FormControl(''),
      contactNumber: new FormControl(''),
      email: new FormControl('', Validators.required),
    });
  }

  setupFroomLocationData() {
    this.froomAPIService.getAllFroomLocations().subscribe(
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

          this.columnDefs.filter((f, i) => {
            if (f.field === 'uuid') {
              f.headerName = 'Froom Location ID';
              f.checkboxSelection = true;
            } else if (f.field === 'zipDetails') {
              f.headerName = 'Store Name';
            } else if (f.field === 'createdDate') {
              f.sortable = true;
              f.sort = 'desc';
            } else if (f.field === 'stores') {
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

  openViewModal(content: any) {
    this.stores = JSON.parse(this.selectedRowData[0].stores);
    this.modalService.open(content, {
      size: 'xl',
      windowClass: 'my-class',
      scrollable: false,
      backdrop: 'static',
    });
  }

  openAddModal(content: any) {
    // this.stores = JSON.parse(this.selectedRowData[0].stores);
    this.modalService.open(content, {
      size: 'xl',
      windowClass: 'my-class',
      scrollable: false,
      backdrop: 'static',
    });
  }

  onSubmit(form: FormGroup) {
    this.storeDtlObj = new FroomStores();
    this.storeDtlObj.storeName = form.value.storeName;
    this.storeDtlObj.addressLine1 = form.value.addressLine1;
    this.storeDtlObj.addressLine2 = form.value.addressLine2;
    this.storeDtlObj.city = form.value.city;
    this.storeDtlObj.stateCode = form.value.stateCode;
    this.storeDtlObj.zipCode = form.value.zipCode;
    this.storeDtlObj.contactNumber = form.value.contactNumber;
    this.storeDtlObj.country = form.value.country;
    this.storeDtlObj.email = form.value.email;
    this.storeDtlObj.googleDrop = form.value.googleDrop;
    this.storeDtlObj.pickUpTimings = form.value.pickUpTimings;
    this.saveObjStores = JSON.stringify(this.storeDtlObj);

    this.saveLocationObj = new FroomLocation();
    this.saveLocationObj.stores = this.saveObjStores;
    this.saveLocationObj.zipCode = form.value.zipCode;
    this.saveLocationObj.createdBy = 'FroomerID';
    this.saveLocationObj.isActive = 'Y';
    this.froomAPIService.addFroomLocation(this.saveLocationObj).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {}
    );
  }
}

import { Component, OnInit, OnChanges } from '@angular/core';
import { DataServiceService } from './service/data-service.service';
import { model } from './model/data';
import { columnHeaders } from './model/columnHeaders';
import { tableState } from './model/tableState';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public dataArray: model[];
  public cols: columnHeaders[];
  public pcols: columnHeaders[];
  public selectedColumns: any[];
  public ts: tableState;


  constructor(private dataServiceService: DataServiceService) {
    console.log('constr call......');

    // built intial table header list

// multipla sort may required customization
    this.ts = {
      sortOrder: -1,
      sortField: 'Id',
      columnWidths: '50,500,500,500,500,500',
               multiSortMeta : []
              //  [
              //   {
              //     field : 'Lastname',
              //     order : 1
              //   }
              // ]
              ,
              columnOrder: ['Phone', 'Id', 'Firstname', 'Lastname', 'Email', 'Img']};

    // setting initial state of table
    console.log(localStorage.getItem('tableState'));
    if (localStorage.getItem('tableState') === null) {
      localStorage.setItem('tableState', JSON.stringify(this.ts));
    }
  }



  ngOnInit(): void {

     // console.log(localStorage.getItem('tableState'));


      this.dataServiceService.getAllCols().subscribe(
        data => {
          this.cols = data;
          this.selectedColumns = this.cols;
          console.table(this.selectedColumns);
        }
      );


    // get table's data from DB
      this.dataServiceService.getAllData().subscribe(
      data => {
        this.dataArray = data;
      }
    );
  }

  onSort() {
   // localStorage.setItem('tableState', localStorage.getItem('tableState'));
  }

  onColResize() {
    console.log(localStorage.getItem('tableState'));
   // localStorage.setItem('tableState', localStorage.getItem('tableState'));
   // console.log(localStorage.getItem('tableState'));
  }

  onRowReorder() {
    // localStorage.setItem('tableState', localStorage.getItem('tableState'));
  }

  customSort(event: SortEvent) {

    if (event.field !== 'Img') {

      event.data.sort((data1, data2) => {

        const value1 = data1[event.field];
        const value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null) {
            result = -1;
        } else if (value1 != null && value2 == null) {
            result = 1;
        } else if (value1 == null && value2 == null) {
            result = 0;
        } else if (typeof value1 === 'string' && typeof value2 === 'string') {
            result = value1.localeCompare(value2);
        } else {
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        }
        return (event.order * result);
    });
    } else {
      event.data.sort((data1, data2) => {

          const value1 = data1.perVal;
          const value2 = data2.perVal;
          let result = null;

          if (value1 == null && value2 != null)
              result = -1;
          else if (value1 != null && value2 == null)
              result = 1;
          else if (value1 == null && value2 == null)
              result = 0;
          else if (typeof value1 === 'string' && typeof value2 === 'string')
              result = value1.localeCompare(value2);
          else
              result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

          return (event.order * result);
        });
    }
}


}

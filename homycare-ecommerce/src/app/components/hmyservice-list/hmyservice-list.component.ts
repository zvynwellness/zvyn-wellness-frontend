import { Component, OnInit } from '@angular/core';
import { Hmyservice } from 'src/app/common/hmyservice';
import { HmyserviceService } from 'src/app/services/hmyservice.service';

@Component({
  selector: 'app-hmyservice-list',
  templateUrl: './hmyservice-list-grid.component.html',
  //templateUrl: './hmyservice-list-table.component.html',
  //templateUrl: './hmyservice-list.component.html',
  styleUrls: ['./hmyservice-list.component.css']
})
export class HmyserviceListComponent implements OnInit {

  hmyservice: Hmyservice[] = [];
  //Inject our ProductService in the constructor
  constructor(private hmyserviceService: HmyserviceService) { }

  ngOnInit(): void {
    this.listHMYSevices();
  }

  listHMYSevices() { //Method is invoked once you subscribe
    this.hmyserviceService.getHmyserviceList().subscribe(
      data => {
        this.hmyservice = data; //Assign results to the Product array
      }
    );
  }

}

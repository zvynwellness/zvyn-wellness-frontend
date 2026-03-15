import { Component, OnInit } from '@angular/core';
import { Hmyservice } from 'src/app/common/hmyservice';
import { HmyserviceService } from 'src/app/services/hmyservice.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hmyservice-list',
  templateUrl: './hmyservice-list-grid.component.html',
  //templateUrl: './hmyservice-list-table.component.html',
  //templateUrl: './hmyservice-list.component.html',
  styleUrls: ['./hmyservice-list.component.css']
})
export class HmyserviceListComponent implements OnInit {

  hmyservice: Hmyservice[] = [];
    currentCategoryId: number = 1;

  //Inject our ProductService in the constructor
  constructor(private hmyserviceService: HmyserviceService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listHMYSevices();
   });
  }

  listHMYSevices() { //Method is invoked once you subscribe
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    this.hmyserviceService.getHmyserviceList(this.currentCategoryId).subscribe(
      data => {
        this.hmyservice = data; //Assign results to the Product array
      }
    );
  }

}

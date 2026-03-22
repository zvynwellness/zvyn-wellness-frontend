import { Component, OnInit } from '@angular/core';
import { HmyserviceCategory } from 'src/app/common/hmyservice-category';
import { HmyserviceService } from 'src/app/services/hmyservice.service';

@Component({
  selector: 'app-hmyservice-category-menu',
  templateUrl: './hmyservice-category-menu.component.html',
  styleUrls: ['./hmyservice-category-menu.component.css']
})
export class HmyserviceCategoryMenuComponent implements OnInit {

  //Define property
  hmyserviceCategories: HmyserviceCategory[] = [];
  //Inject product service in constructor
  constructor(private hmyserviceService: HmyserviceService) { }

  ngOnInit() {
    this.listHmyserviceCategories();
  }

  listHmyserviceCategories() {
    //Invoke the service
      this.hmyserviceService.getHmyserviceCategories().subscribe(
        data => {
          console.log('Hmyservice Categories=' + JSON.stringify(data));  //Log data returned from the service
          this.hmyserviceCategories = data;  //Assign data to our property
        }
      );
    }

}

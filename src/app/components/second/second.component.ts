import { Component } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service/data-service.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent {

  constructor(public dataServ: DataServiceService){}

}

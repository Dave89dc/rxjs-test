import { Component } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service/data-service.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent {

  constructor(public dataServ: DataServiceService){}

}

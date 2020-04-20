import { Component, OnInit } from '@angular/core';
import {TransactionsService} from '../transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'] ,
  providers: [TransactionsService]
})
export class TransactionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

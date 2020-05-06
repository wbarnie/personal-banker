import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}

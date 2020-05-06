import {Component, OnInit} from '@angular/core';
import {AccountsService} from '../../accounts.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  id: string;
  //  id: number;

  constructor(private accountsService: AccountsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
          // this.id = +params['id']; // use for number
          // this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

}

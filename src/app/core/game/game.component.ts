import { Component, Input, OnInit } from '@angular/core';
import { GameModel, iGameModel } from '../../models/game';
import { Router } from '@angular/router';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  @Input() game!: iGameModel;
  @Input() redirigir!: boolean;

  constructor(public router: Router) {}

  ngOnInit(): void {}

  detailPage() {
    this.router.navigate(['detail/' + this.game._id]);
  }

  charPage() {
    this.router.navigate(['char-in-game/' + this.game._id]);
  }
}

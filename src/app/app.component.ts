import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { iMenuOptions } from '../interfaces/menu-options';
import * as gameActions from './state/game.reducer/game.action.creators';
import { ApiGame } from './services/game.api';

import { AppState } from './state/app.state';
import { ApiUser } from './services/user.api';
import { loadUser } from './state/user.reducer/user.action.creator';
import { LocalStorageService } from './services/localStorage.service';

export const MENU_OPTIONS: Array<iMenuOptions> = [
  { path: '', label: 'Home' },
  { path: 'home', label: 'Home' },
  { path: 'players', label: 'Players' },
  { path: 'profile', label: 'Profile' },
  { path: 'detail/:id', label: 'Game-detail' },
  { path: 'char-detail/:id', label: 'Character-detail' },
  { path: 'login', label: 'Login' },
  { path: 'create-character/:id', label: 'Create-Character' },
  { path: 'char-in-game/:id', label: 'Character-in-game' },
  { path: 'edit-character/:id', label: 'Edit-character' },
  { path: 'edit-profile', label: 'Edit-profile' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  menuOptions: Array<iMenuOptions>;
  token!: string;
  constructor(
    public store: Store<AppState>,
    public game: ApiGame,
    public apiUser: ApiUser,
    public localStorage: LocalStorageService
  ) {
    this.menuOptions = MENU_OPTIONS;
  }
  ngOnInit(): void {
    this.token = this.localStorage.getToken() as string;

    this.game
      .getGames()
      .subscribe((data) =>
        this.store.dispatch(gameActions.loadGame({ games: data }))
      );
    if (this.token) {
      this.apiUser.loginUser(undefined, this.token).subscribe((data) => {
        this.store.dispatch(loadUser(data));
      });
    }
  }
}

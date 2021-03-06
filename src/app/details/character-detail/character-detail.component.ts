import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iCharacter } from 'src/app/models/character';
import { iUser, iUserState } from 'src/app/models/user';
import { ApiCharacter } from 'src/app/services/characters.api';
import { ApiUser } from 'src/app/services/user.api';
import { AppState } from 'src/app/state/app.state';
import {
  deleteCharacter,
  loadCharacters,
} from 'src/app/state/character.reducer/character.actions.creators';
import { loadGame } from 'src/app/state/game.reducer/game.action.creators';
import { loadUser } from 'src/app/state/user.reducer/user.action.creator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
})
export class CharacterDetailComponent implements OnInit {
  idCharacter!: string;
  idGame!: string;
  character!: any;
  user!: iUserState;
  constructor(
    public route: ActivatedRoute,
    public apiCharacter: ApiCharacter,
    public apiUser: ApiUser,
    public router: Router,
    public store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.users)
      .subscribe({
        next: (data) => {
          this.user = data;
        },
      });
    this.idCharacter = this.route.snapshot.paramMap.get('id') as string;
    this.apiCharacter.getOneCharacter(this.idCharacter).subscribe({
      next: (data) => {
        this.character = data;
        this.idGame = data.idGame as string;
      },
    });
  }
  handleDelete() {
    this.apiCharacter.deleteCharacter(this.idCharacter).subscribe({
      next: (data) => {
        const newCharacterArr = this.user.user.characters?.filter(
          (character) => character._id !== this.idCharacter
        );
        const newUser = { ...this.user.user, characters: newCharacterArr };

        this.store.dispatch(
          loadUser({ user: newUser, token: this.user.token })
        );
        Swal.fire({
          icon: 'success',
          title: 'Yuhuuu...',
          text: 'You have delete your character correctly',
        });
        this.router.navigate(['players']);
      },
    });
  }
  handleUpdate() {
    this.router.navigate(['edit-character/' + this.idCharacter]);
  }
}

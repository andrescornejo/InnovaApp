import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserMenuPage } from '../pages/user-menu/user-menu.page';

export interface User {
  Id?: string;
  Date?: string;
  Rol: string;
  Name: string;
  Carnet: string;
  Password: string;
  Balance?: number;
  CardNumber?: string;
  CardBalance?: number;
  Location?: string;
}


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private user: User;

  private users: any;
  private userCollection: any;

  private users_arr = [
    {
      Rol: '1',
      Name: 'Conductor',
      Carnet: '2020',
      Password: '123'
    },
    {
      Rol: '2',
      Name: 'Luis Rodríguez',
      Carnet: '2010',
      Password: '123',
      Balance: -1500,
      CardNumber: null,
      CardBalance: 10000,
      Location: 'Terminal'
    },
    {
      Rol: '2',
      Name: 'Diego Mendez',
      Carnet: '2011',
      Password: '123',
      Balance: 600,
      CardNumber: null,
      CardBalance: 0,
      Location: 'Terminal'
    },
    {
      Rol: '2',
      Name: 'Andrea Perez',
      Carnet: '2012',
      Password: '123',
      Balance: 2000,
      CardNumber: null,
      CardBalance: 12000,
      Location: 'Centro'
    },
    {
      Rol: '2',
      Name: 'María Salas',
      Carnet: '2013',
      Password: '123',
      Balance: -1000,
      CardNumber: null,
      CardBalance: 1000,
      Location: 'Florencia'
    },
    {
      Rol: '2',
      Name: 'Andrés Rojas',
      Carnet: '2014',
      Password: '123',
      Balance: -100000,
      CardNumber: null,
      CardBalance: 200,
      Location: 'Centro'
    },
    {
      Rol: '2',
      Name: 'Mario Solano',
      Carnet: '2015',
      Password: '123',
      Balance: 1700,
      CardNumber: null,
      CardBalance: 0,
      Location: 'Florencia'
    },
    {
      Rol: '2',
      Name: 'Kervin Sibaja',
      Carnet: '2016',
      Password: '123',
      Balance: 1000,
      CardNumber: null,
      CardBalance: 0,
      Location: 'Florencia'
    },
    {
      Rol: '2',
      Name: 'Andres Hernandez',
      Carnet: '2017',
      Password: '123',
      Balance: 100,
      CardNumber: null,
      CardBalance: 12000,
      Location: 'Centro'
    },
    {
      Rol: '2',
      Name: 'Ana Suarez',
      Carnet: '2018',
      Password: '123',
      Balance: -700,
      CardNumber: null,
      CardBalance: 2000,
      Location: 'Terminal'
    },
  ];
  constructor(
    private angularFirestore: AngularFirestore
  ) {
    // this.userCollection = this.angularFirestore.collection('users');
    this.userCollection = this.users_arr;
    /*
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          console.log(id);
          return { id, ...data };
        });
      })
    );
    */
  }

  getUsers() {
    return this.userCollection;
  }

  getUser(id: string): AngularFirestoreDocument<User> {
    return this.userCollection;
    // this.userCollection.valueChanges().subscribe(elem => {
    //  console.log(elem);
    //  if (elem.Carnet === id) {
    //    return elem;
    //  }
    // });
    // return this.userCollection.doc(id);
  }

  // Cambiamos a un usuario alambrado para poder llegar a las pantallas sin el firebase.
  validateUser(user: User, data: any) {
    if (data.carnet === user.Carnet) {
      if (data.password === user.Password) {
        return true;
      }
      return false;
    }
    return false;
  }

  addUser(user: User) {
    const m = this.angularFirestore.collection<User>('users').doc(user.Carnet);
    m.set(user);
  }

  updateUser(user: User): Promise<void> {
    return this.userCollection.doc(user.Carnet).update(user);
  }

  deleteUser(id: string): Promise<void> {
    return this.userCollection.doc(id).delete();
  }

  updateBalance(carnet: string, balance: number): Promise<void> {
    return this.userCollection.doc(carnet).update({ Balance: balance });
  }

  updateCardBalance(carnet: string, balance: number): Promise<void> {
    return this.userCollection.doc(carnet).update({ CardBalance: balance });
  }

  updateCarNumber(carnet: string, card: string, date: string): Promise<void> {
    console.log(card + " " + date);
    return this.userCollection.doc(carnet).update({ CardNumber: card, Date: date });
  }

  deleteCard(carnet: string): Promise<void> {
    return this.userCollection.doc(carnet).update({ CardNumber: ''});
  }

}

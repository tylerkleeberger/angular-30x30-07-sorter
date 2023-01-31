import { Injectable } from '@angular/core';
import { Contact } from './data/person';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contacts = [
    { id: 12, name: 'Ragnar' },
    { id: 13, name: 'Lagertha' },
    { id: 14, name: 'Bjorn Ironside' },
    { id: 15, name: 'Ubba' },
    { id: 16, name: 'Hvitserk' },
    { id: 17, name: 'Sigurd' },
    { id: 18, name: 'Ivar' },
    { id: 19, name: 'Floki' },
    { id: 20, name: 'Harald' },
    ];
    return {contacts};
  }

  // Overrides the genId method to ensure that a contact always has an id.
  // If the contacts array is empty,
  // the method below returns the initial number (11).
  // if the contacts array is not empty, the method below returns the highest
  // contact id + 1.

  genId(contacts: Contact[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) + 1 : 11;
  };

}
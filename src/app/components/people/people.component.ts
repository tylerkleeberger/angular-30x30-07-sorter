import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CONTACTS } from 'src/app/data/mock-contacts';
import { Contact } from 'src/app/data/person';
import { ContactService } from 'src/app/data/services/contact.service';
import { MessageService } from '../messages/service.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit{
  contacts: Contact[] = [];
  selectedContact?: Contact;

  constructor(
    private contactService: ContactService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
    this.messageService.add(`Selected Contact name=${contact.name}, ID: id=${contact.id}`);
  }

  getContacts(): void {
    this.contactService.getContacts()
    .subscribe(contacts => this.contacts = contacts);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.contactService.addContact({ name } as Contact).subscribe(contact => {this.contacts.push(contact);
    });
  }

  delete(contact: Contact): void {
    this.contacts = this.contacts.filter(h => h !== contact);
    this.contactService.deleteContact(contact.id).subscribe();
  }
  


}

import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/data/person';
import { ContactService } from 'src/app/data/services/contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts.slice(1,5));
  }
}
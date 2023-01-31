import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map, tap } from 'rxjs';
import { MessageService } from 'src/app/components/messages/service.service';
import { CONTACTS } from '../mock-contacts';
import { Contact } from '../person';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  //get list: returns one item
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl)
    .pipe(
      tap(_ => this.log('fetched contacts')),
      catchError(this.handleError<Contact[]>('getContacts', []))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //send error to remote login infrastructure (must set up separately)
      console.error(error);
      //transforms error for user consumption (create an error message)
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  //get by id
  getContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Contact>(`getContact id=${id}`)));
  }

  //Update contact on server -- PUT
  updateContact(contact: Contact): Observable<any> {
    return this.http.put(this.contactsUrl, contact, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${contact.id}`)),
      catchError(this.handleError<any>('updateContact'))
    );
  }

  //Add new contact on server -- POST
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact, this.httpOptions)
    .pipe(tap((newContact: Contact) => this.log(`added contact with id=${newContact.id}`)),
    catchError(this.handleError<Contact>('addContact'))
    );
  }

  //Delete contact on server -- DELETE
  deleteContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.delete<Contact>(url, this.httpOptions)
    .pipe(tap(_ => this.log(`deleted contact id=${id}`)),
    catchError(this.handleError<Contact>('deleteContact'))
    );
  }

  //Search Feature -- GET
  searchContacts(term: string): Observable<Contact[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Contact[]>(`${this.contactsUrl}/?name=${term}`)
    .pipe(tap(x => x.length ? 
      this.log(`found contacts matching "${term}"`) :
      this.log(`no contacts matching "${term}"`)),
      catchError(this.handleError<Contact[]>('searchContacts', []))
    );
  }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  };

  private contactsUrl = 'api/contacts';


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`ContactService: ${message}`);
  }
}

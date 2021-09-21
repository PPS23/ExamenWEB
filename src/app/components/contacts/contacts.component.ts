import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/Services/contact.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  contacts: any;

  addNewContactForm = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    names: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    address: new FormControl("", [Validators.required, Validators.maxLength(150)]),
    phone: new FormControl("", [Validators.required, Validators.maxLength(15)]),
    curp: new FormControl("", [Validators.required, Validators.maxLength(20)])
  });

  get id() { return this.addNewContactForm.get("id") }
  get name() { return this.addNewContactForm.get("names") }
  get address() { return this.addNewContactForm.get("address") }
  get phone() { return this.addNewContactForm.get("phone") }
  get curp() { return this.addNewContactForm.get("curp") }

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.loadContactsTable(true);
    this.resetForm();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  loadContactsTable(initTable: boolean = false){
    this.contactService.getAll().subscribe((response:any)=>{
      if(response.status == 1){
        this.contacts = response.data;
        if(this.contacts.length > 0){
          if(initTable){
            this.dtTrigger.next();
          }
        }
        else{
          Swal.fire(
            'There is not information?',
            'Regrettably was not find records in database.',
            'question'
          );
        }
      }
      else{
        Swal.fire({
          icon: 'error',
          title: response.message,
          text: response.data,
          footer: ''
        });
      }
    });
  }

  addNewContact(){
    if(this.addNewContactForm.touched && this.addNewContactForm.valid){
      let contactDTO: Contact = {
        Id: this.id?.value,
        Name: this.name?.value,
        Address: this.address?.value,
        Phone: this.phone?.value,
        CURP: this.curp?.value.toUpperCase()
      }

      if(contactDTO.Id > 0){
        this.contactService.update(contactDTO).subscribe((response: any) =>{
          if(response.status == 1){
            this.addNewContactForm.reset();
            Swal.fire(
              'Updated!',
              'Contact was updated successfuly.',
              'success'
            );
            this.resetForm();
            this.loadContactsTable();
          }
          else{
            Swal.fire({
              icon: 'error',
              title: response.message,
              text: response.data,
              footer: ''
            });
          }
        }); 
      }
      else{
        this.contactService.save(contactDTO).subscribe((response: any) =>{
          if(response.status == 1){
            this.addNewContactForm.reset();
            Swal.fire(
              'Added!',
              'Contact was addedd successfuly.',
              'success'
            );
            this.resetForm();
            this.loadContactsTable();
          }
          else{
            Swal.fire({
              icon: 'error',
              title: response.message,
              text: response.data,
              footer: ''
            });
          }
        }); 
      }
    }
  }

  editContact(_contact: any){
    this.addNewContactForm.controls.id.setValue(_contact.id);
    this.addNewContactForm.controls.names.setValue(_contact.name);
    this.addNewContactForm.controls.address.setValue(_contact.address);
    this.addNewContactForm.controls.phone.setValue(_contact.phone);
    this.addNewContactForm.controls.curp.setValue(_contact.curp);
  }

  deleteContact(_id: number){
    Swal.fire({
      title: 'Are you sure?',
      text: "Completely delete of Contact!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.contactService.delete(_id).subscribe((response:any) => {
          if(response.status == 1){
            Swal.fire(
              'Deleted!',
              'Contact has been deleted.',
              'success'
            );
            this.loadContactsTable();
          }
          else{
            Swal.fire({
              icon: 'error',
              title: response.message,
              text: response.data,
              footer: ''
            });
          }
        });
      }
    });
  }

  fileUploaded(e: any){
    if(e.status == 1){
      this.loadContactsTable();
    }
  }

  resetForm(){
    this.addNewContactForm.controls.id.setValue(0);
    this.addNewContactForm.controls.names.setValue("");
    this.addNewContactForm.controls.address.setValue("");
    this.addNewContactForm.controls.phone.setValue("");
    this.addNewContactForm.controls.curp.setValue("");
  }



}

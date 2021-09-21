import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-uploadcsv',
  templateUrl: './uploadcsv.component.html',
  styleUrls: ['./uploadcsv.component.css']
})
export class UploadcsvComponent implements OnInit {
  message: string = "";
  progress: number = 0;

  @Output() onUploadFinished = new EventEmitter();

  @ViewChild('file', {static: false})

  inputElement: ElementRef = new ElementRef(0);

  constructor(private http:HttpClient) { }

  ngOnInit(): void {

  }

  uploadFile(files: any){
    if(files.lenght === 0){
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);

    this.http.post("api/Contact/UploadCSV", formData, { reportProgress: true, observe: 'events'}).subscribe((event:any) => {

      if(event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * event.loaded / event?.total);
      }
      else if(event.type === HttpEventType.Response) {
        if(event.body.status == 1){
          this.message = "CSV file was Success.";
          Swal.fire(
            'Success',
            'CSV file was Success.',
            'success'
          )
        }
        
        this.onUploadFinished.emit(event.body);
      }

      //Reset input File
      this.inputElement.nativeElement.value = "";
    });
  }

}

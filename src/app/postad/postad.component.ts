import { FileUploaderCustom } from './../customfileuploader';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-postad',
  templateUrl: './postad.component.html',
  styleUrls: ['./postad.component.css']
})
export class PostadComponent implements OnInit {

  constructor(private http: HttpClient) { }

  length = 0;

  cities =  [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  //public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/advert/new', itemAlias: 'photos' });
  public uploader : FileUploaderCustom =  new FileUploaderCustom({ url: 'http://localhost:3000/api/advert/new' } );
  ngOnInit() { 
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; 
      length = this.uploader.queue.length;
    };
    /* this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    }; */
  }

  onSubmit(details) {

    let tags = details.title.split(' ');
    //console.log(details);
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('title', details.title);
      form.append('description', details.description);
      form.append('institute', details.institute);
      form.append('city', details.city);
      form.append('username', details.username);
      form.append('useremail', details.useremail);
      form.append('userphonenumber', details.userphonenumber);
      form.append('tags',tags);
    };
    this.uploader.uploadAllFiles();
  }
  valid() {
    if(length === 5 ) {
      return true;
    }
    return false;
  }

}

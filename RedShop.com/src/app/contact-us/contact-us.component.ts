import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sendQuery(){
  }

  @ViewChild('myTextarea') myTextarea!: ElementRef<HTMLTextAreaElement>;

  adjustTextareaHeight(): void {
    const textarea = this.myTextarea.nativeElement;
    textarea.style.height = ''; // Reset the height to auto

    // Calculate the scroll height
    const scrollHeight = textarea.scrollHeight;
  
    // Update the textarea height if it exceeds the maximum height
    if (scrollHeight > textarea.clientHeight) {
      textarea.style.height = scrollHeight + 'px';
    }
  }
  

}

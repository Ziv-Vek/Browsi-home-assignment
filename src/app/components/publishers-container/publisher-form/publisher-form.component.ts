import { Component, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-publisher-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './publisher-form.component.html',
  styleUrl: './publisher-form.component.css'
})

export class PublisherFormComponent {
  @Output() submitPublisher = new EventEmitter<{name: string}>();
  publisherForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.publisherForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.publisherForm.valid) {
      this.submitPublisher.emit(this.publisherForm.value);
      console.log(this.publisherForm.value);
    }
  }

}

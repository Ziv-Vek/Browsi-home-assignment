import { Component, OnInit } from '@angular/core';
import { PublisherCardComponent } from './publisher-card/publisher-card.component';
import { PublisherFormComponent } from './publisher-form/publisher-form.component';
import { CommonModule } from '@angular/common';
import {Domain, Publisher} from '../../types';
import { HttpService } from '../../http.service';
import axios from 'axios';
import {axiosClient} from "../../../utils/apiClient";
import {DomainCardComponent} from "./domain-card/domain-card.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-publishers-container',
    standalone: true,
    imports: [PublisherCardComponent, CommonModule, DomainCardComponent, PublisherFormComponent, ReactiveFormsModule],
    templateUrl: './publishers-container.component.html',
    styleUrl: './publishers-container.component.css',
})
export class PublishersContainerComponent implements OnInit {

    publishers: Array<Publisher> = [];
    domains: Array<Domain> = [];
    showForm = false;
    selectedPublisher: string | null = null;

    constructor(private httpService: HttpService) {}


    ngOnInit(): void {
      this.GetPublishers();
    }

  private async GetPublishers() {
      try {
        const response = await axiosClient.get('/api/publishers');
        this.publishers = response.data;
        console.log("Publishers loaded:", this.publishers); // Log to confirm data is loaded
      }
      catch (error) {
        console.error(error);
      }
  }
    addPublisher() {
      this.showForm = true;
    }

    async submitPublisher(publisherFormData: {name: string}) {
      try {
        const publisherData = {
          publisher: publisherFormData.name, // Rename field to match server expectation
        };

        let res = await axiosClient.post('/api/publishers', publisherData);

        if (res.status === 200){
          this.GetPublishers();
          this.showForm = false;
        }
      }
      catch (error) {
        console.error(error);
      }
    }

    async fetchDomains(publisherName: string) {
    this.selectedPublisher = publisherName;

    try {
      const response = await axiosClient.post(`/api/domains/domains`, { publisherName });
      this.domains = response.data;
      console.log("Domains loaded:", this.domains);
    } catch (error) {
      console.error("Error loading domains:", error);
    }
  }
}

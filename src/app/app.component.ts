import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ResourceService } from './services/resource.service';
import { InvoiceService } from './services/invoice.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'crdcodesafront';

  invoiceManagerForm: FormGroup;
  resourceManagerForm: FormGroup;
  invoices: any[] = [];
  resources: any[] = [];
  selectedInvoiceId: number = -1;
  selectedResources: any[] = [];
  selectedIndex: number = -1;
  isEditMode: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private resourceService: ResourceService,
    private invoiceService: InvoiceService,
    private messageService: MessageService
  ) {
    this.invoiceManagerForm = this.formBuilder.group({
      nameCustomer: ['', Validators.required],
      date: this.formatDate(new Date()),
      resources: [[]],
    });

    this.resourceManagerForm = this.formBuilder.group({
      nameResource: ['', Validators.required],
      priceResource: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getResourceData();
    this.getInvoiceData();
  }

  getResourceData() {
    this.resourceService.getData().subscribe((responseData: any) => {
      this.resources = responseData.data;
    });
  }

  getInvoiceData() {
    this.invoiceService.getData().subscribe((responseData: any) => {
      this.invoices = responseData.data;
    });
  }

  handleTypeSubmit() {
    if (this.invoiceManagerForm.invalid) {
      this.invoiceManagerForm.markAllAsTouched();
      return;
    }
    if (this.isEditMode) {
      this.updateInvoice();
    } else {
      this.createInvoice();
    }
    this.clear();
  }

  createInvoice() {
    const invoice: any = {
      nameCustomer: this.invoiceManagerForm.value.nameCustomer,
      date: this.invoiceManagerForm.value.date,
      resources: this.selectedResources,
    };

    this.invoiceService.save(invoice).subscribe((responseData: any) => {
      this.getInvoiceData();
      this.clear();
      this.showNotify(responseData);
    });
  }

  updateInvoice() {
    let filteredArray = this.resources.filter((item) => item.selected === true);
    let finalArray = [
      ...filteredArray.map((item) => ({ resourceId: item.id })),
      ...this.selectedResources,
    ];

    const updateData = {
      invoiceId: this.selectedInvoiceId,
      nameCustomer: this.invoiceManagerForm.value.nameCustomer,
      resources: finalArray,
    };

    this.invoiceService.update(updateData).subscribe((responseData: any) => {
      this.getInvoiceData();
      this.clear();
      this.showNotify(responseData);
    });
  }

  deleteInvoice(i: number) {
    this.invoiceService
      .delete(this.invoices[i].id)
      .subscribe((responseData: any) => {
        this.getInvoiceData();
        this.clear();
        this.showNotify(responseData);
      });
  }

  createResource() {
    if (this.resourceManagerForm.invalid) {
      this.resourceManagerForm.markAllAsTouched();
      return;
    }

    const resource = {
      name: this.resourceManagerForm.value.nameResource,
      price: this.resourceManagerForm.value.priceResource,
    };

    this.resourceService.save(resource).subscribe((responseData: any) => {
      this.getResourceData();
      this.clear();
      this.showNotify(responseData);
    });
  }

  handleValidateResources(index: number) {
    this.resources.forEach((item2: any) => {
      let found = this.invoices[index].resources.find(
        (item1: any) => item1.id === item2.id
      );
      if (found) {
        item2.selected = true;
      } else {
        delete item2.selected;
      }
    });
  }

  handleAssignResources(resourceId: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      this.selectedResources.push({ resourceId });
    } else if (this.isEditMode) {
      this.resources.forEach((item2: any) => {
        if (item2.id === resourceId) {
          delete item2.selected;
        }
      });
    } else {
      this.selectedResources = this.selectedResources.filter(
        (resource) => resource.resourceId !== resourceId
      );
    }
  }

  handleInitializeEditMode(index: number) {
    this.invoiceManagerForm.patchValue({
      nameCustomer: this.invoices[index].nameCustomer,
      date: this.invoices[index].date,
    });
    this.selectedInvoiceId = this.invoices[index].id;

    this.handleValidateResources(index);

    this.selectedIndex = index;
    this.isEditMode = true;
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  showNotify(responseData: any) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: responseData?.message,
    });
  }

  clear() {
    this.invoiceManagerForm.reset();
    this.clearEditMode();
    this.selectedResources = [];
    this.getResourceData();
    this.resourceManagerForm.reset();
  }

  clearEditMode() {
    this.selectedIndex = -1;
    this.isEditMode = false;
  }
}

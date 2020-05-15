import { Component, OnInit } from '@angular/core';
import {  ViewChild, AfterViewInit } from '@angular/core';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import {Quagga} from 'quagga';


@Component({
  selector: 'app-barcode-reader',
  templateUrl: './barcode-reader.component.html',
  styleUrls: ['./barcode-reader.component.sass']
})
export class BarcodeReaderComponent  implements AfterViewInit{

  @ViewChild(BarecodeScannerLivestreamComponent)
  barecodeScanner: BarecodeScannerLivestreamComponent;

  barcodeValue;

  ngAfterViewInit() {
      this.barecodeScanner.start();
     // console.log(this.ngAfterViewInit)
  }

  onValueChanges(result){
      this.barcodeValue = result.codeResult.code;
      console.log(result)
  }

  onStarted(event){
    console.log('started', event);
  }
  }




import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode-reader',
  templateUrl: './qrcode-reader.component.html',
  styleUrls: ['./qrcode-reader.component.sass']
})
export class QrcodeReaderComponent  {
  qrResultString: string;

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    console.log(this.qrResultString)
    console.log(this.onCodeResult)
  }
  

}

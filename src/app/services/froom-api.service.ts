import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FroomApiService {

  constructor(private http: HttpClient) { }

  url = 'http://192.168.0.105:8080'

  public getFroomLocations(zipID: any) {
    const restURL = this.url + '/froom/zipID?zipID=30001'
    return this.http.get(restURL);
  }

  public getAllFroomLocations() {
    const restURL = this.url + '/froom/zipcodes'
    return this.http.get(restURL);
  }

  public getFroomForUUID(uuid: any) {
    const restURL = this.url + '/froom/uuID?uuID='+uuid;
    return this.http.get(restURL);
  }

  public getAllFroomOrders() {
    const restURL = this.url + '/froom/orders';
    return this.http.get(restURL);
  }

  public getFroomOrderForUUID(uuid: any) {
    const restURL = this.url + '/froom/order/uuID?uuID='+uuid;
    return this.http.get(restURL);
  }

  public addFroomLocation(froomLocation: any) {
    console.log(froomLocation);
    
    const restURL = this.url + '/froom/location'; 
    return this.http.post(restURL, froomLocation);
  }
 
}

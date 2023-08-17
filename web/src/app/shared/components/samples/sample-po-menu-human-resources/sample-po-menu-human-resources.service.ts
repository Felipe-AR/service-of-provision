import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoMenuItemFiltered } from '@po-ui/ng-components';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SamplePoMenuHumanResourcesService {
  private url: string = 'https://po-sample-api.fly.dev/v1/menus';

  constructor(private http: HttpClient) {}

  getFilteredData(search: string): Observable<Array<PoMenuItemFiltered>> {
    const params = { search };

    return this.http
      .get(this.url, { params })
      .pipe(map((response: any) => response.items));
  }
}

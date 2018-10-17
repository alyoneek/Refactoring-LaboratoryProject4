import { Injectable } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BingService } from './bing.service';
import { GoogleService } from './google.service';
import { SearchResultsSource } from './source.enum';
import { YandexService } from './yandex.service';

@Injectable()
export class SearchResultsService {

  constructor(private yandexService: YandexService, private googleService: GoogleService, private bingService: BingService) { }

  /**
   * Get search results for title from given source.
   * @param source Source for search results.
   * @param title Search title.
   * @param languageCode Language code.
   */
  getSearchResults(source: SearchResultsSource, title: string, languageCode: string): Observable<number> {
    return defer(() => {
      switch (source) {
        case SearchResultsSource.Yandex:
          return this.yandexService.getSearchResults(title);
        case SearchResultsSource.Google:
          return this.googleService.getSearchResults(title, languageCode);
        case SearchResultsSource.Bing:
          return this.bingService.getSearchResults(title, languageCode);
        default:
          return this.yandexService.getSearchResults(title);
      }
    }).pipe(
      map(value => this.beautifyNumber(value))
    );
  }

  /**
   * Returns a new number that retains at most the first three digits of the given number and replaces the rest with zero.
   *
   * Examples:
   * - 1 => 1
   * - 12 => 12
   * - 123 => 123
   * - 1234 => 1230
   * - 12345 => 12300
   * - 123456 => 123000
   *
   * @param value Number that will be beautified.
   */
  private beautifyNumber(value: number) {
    let count = 0;
    while (value > 999) {
      value = Math.floor(value / 10);
      count++;
    }
    while (count > 0) {
      value = value * 10;
      count--;
    }
    return value;
  }

}

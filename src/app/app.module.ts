import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { UrlSerializer } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { L10nConfig, L10nLoader, LocalizationModule, ProviderType, StorageStrategy } from 'angular-l10n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './footer/footer.module';
import { NavModule } from './nav/nav.module';
import { SettingsModule } from './settings/settings.module';
import { CustomUrlSerializer } from './shared/custom-url-serializer';

const l10nConfig: L10nConfig = {
  locale: {
    languages: [
      { code: 'en', dir: 'ltr' },
      { code: 'de', dir: 'ltr' }
    ],
    language: 'en',
    storage: StorageStrategy.Cookie
  },
  translation: {
    providers: [
      { type: ProviderType.Static, prefix: './assets/locale-' },
      { type: ProviderType.Static, prefix: './assets/locale-footer-' },
      { type: ProviderType.Static, prefix: './assets/locale-titles-' },
      { type: ProviderType.Static, prefix: './assets/locale-search-results-' }
    ],
    caching: true,
    missingValue: 'No key'
  }
};

export function initL10n(l10nLoader: L10nLoader): Function {
  return () => l10nLoader.load();
}

@NgModule({
  providers: [
    Title,
    { provide: APP_INITIALIZER, useFactory: initL10n, deps: [L10nLoader], multi: true },
    { provide: UrlSerializer, useClass: CustomUrlSerializer }
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LocalizationModule.forRoot(l10nConfig),
    NgbModule,
    AppRoutingModule,
    FooterModule,
    NavModule,
    SettingsModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

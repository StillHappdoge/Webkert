import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "summer-camp-c6f65", appId: "1:460968500264:web:0894a2ba6a8b8dfe33691d", storageBucket: "summer-camp-c6f65.firebasestorage.app", apiKey: "AIzaSyDIOsUoZEAgOGpt_mpmZEVF2FXsCBQJcaI", authDomain: "summer-camp-c6f65.firebaseapp.com", messagingSenderId: "460968500264", measurementId: "G-H4Y9W97J76" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
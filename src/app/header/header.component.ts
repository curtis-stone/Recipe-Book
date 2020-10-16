/* Handles: */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

import { DataStorageService } from '../shared/data-storage.service'
import { AuthService } from '../auth/auth.service';

@Component({
    templateUrl:'./header.component.html',
    selector:'app-header',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

    private userSub: Subscription; 
    isAuthenticated = false;

    ngOnInit() {
       this.userSub = this.authService.user.subscribe(user => {
           this.isAuthenticated = !!user;
           console.log(!user)
           console.log(!!user)
       })
    }

    ngOnDestroy() {
        this.userSub.unsubscribe()
    }

    collapsed = true;
    constructor(private dataStorageService: DataStorageService, 
                private authService: AuthService) {}
    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe()
    }

    onLogout() {
        this.authService.logout()
    }
}
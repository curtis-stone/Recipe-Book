import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'


const appRoutes: Routes = [
  { path:'', redirectTo: '/recipes', pathMatch: 'full' },
  { 
    path: 'recipes', 
    loadChildren: () => import('./recipe-book/recipes.module').then(m => m.RecipesModule) 
  },
  { 
    path: 'shopping-list', 
    loadChildren: () => import(
      './shopping-list/shoppinglist.module').then(m => m.ShoppingListModule) 
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { 
  
 }

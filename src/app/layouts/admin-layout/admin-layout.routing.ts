import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {
        path: 'hotels', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/hotels/hotels.module').then(m => m.HotelsModule)
    },
    {
        path: 'restaurants', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/restaurants/restaurants.module').then(m => m.RestaurantsModule)
    },
    {
        path: 'travelExpenses', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/expenses/expenses.module').then(m => m.ExpensesModule)
    },
    {
        path: 'addresses', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/addresses/addresses.module').then(m => m.AddressesModule)
    },
    {
        path: 'administrators', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/administrators/administrators.module').then(m => m.AdministratorsModule)

    },
    {
        path: 'operations', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/operations/operations.module').then(m => m.OperationsModule)

    },
    {
        path: 'spents', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/spents/spents.module').then(m => m.SpentsModule)

    },
    {
        path: 'customers', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/customers/customers.module').then(m => m.CustomersModule)

    }
    
];


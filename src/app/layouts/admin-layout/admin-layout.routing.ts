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
        path: 'Vehicles', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/vehicles/vehicles.module').then(m => m.VehiclesModule)
    },
    {
        path: 'contracts', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/contracts/contracts.module').then(m => m.ContractsModule)
    },
    {
        path: 'routes', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/routes/routes.module').then(m => m.RoutesModule)
    },
    {
        path: 'orders', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/orders/orders.module').then(m => m.OrdersModule)
    },
    {
        path: 'tranches', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/tranches/tranches.module').then(m => m.TranchesModule)
    },
    {
        path: 'services', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/services/services.module').then(m => m.ServicesModule)
    },
    {
        path: 'owners', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/owners/owners.module').then(m => m.OwnersModule)
    },
    {
        path: 'drivers', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/drivers/drivers.module').then(m => m.DriversModule)
    },
    {
        path: 'VehiclesDriver', //Path que carga la pagina
        loadChildren: () => import('src/app/pages/vehicles-driver/vehicles-driver.module').then(m => m.VehiclesDriverModule)
    },
        
    
];


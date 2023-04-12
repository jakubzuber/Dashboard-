import { configureStore } from '@reduxjs/toolkit';
import krLoadingsReducer from './Slices/krLoadingsSlice';
import exportsReducer from './Slices/exportsSlice';
import importsReducer from './Slices/importsSlice';
import krArrivalsReducer from './Slices/krArrivalsSlice';
import calendarReducer from './Calendar/calendarSlice';
import ordersDetailsReducer from './Slices/orderDetailsSlice';
import ordersReducer from './Slices/ordersSlice';
import colDelReducer from './Slices/colDelSlice';
import planerReducer from './Planner/planerSlice';

export default configureStore({
    reducer: {
        calendar: calendarReducer,
        krLoadings: krLoadingsReducer,
        krArrivals: krArrivalsReducer,
        exports: exportsReducer,
        imports: importsReducer,
        orders: ordersReducer,
        ordersDetails: ordersDetailsReducer,
        colDel: colDelReducer,
        planer: planerReducer
    }
});
import Exports from './International/Exports';
import KrLoadings from './Country/KrLoadings';
import Imports from './International/Imports';
import KrArrivals from './Country/krArrivals';
/*
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchKrArrivalData } from "../Slices/krArrivalsSlice";
import { fetchKrDepartureData } from "../Slices/krLoadingsSlice";
import { fetchExportData } from "../Slices/exportsSlice";
import { fetchImportData } from "../Slices/importsSlice";
import { fetchOrderData } from "../Slices/ordersSlice";
import { fetchOrderDetailsData } from "../Slices/orderDetailsSlice";
import { fetchColDelData } from '../Slices/colDelSlice';
*/
import SelfCollection from './SelfColDel/SelfCollection';
import SelfDelivery from './SelfColDel/SelfDelivery';
import { MainContent } from '../styled';


const Today = () => {
  /*
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchKrArrivalData())
    dispatch(fetchKrDepartureData())
    dispatch(fetchExportData())
    dispatch(fetchImportData())
    dispatch(fetchOrderData())
    dispatch(fetchOrderDetailsData())
    dispatch(fetchColDelData())
  }, [dispatch])
*/
  return (
    <MainContent>
      <Imports></Imports>
      <Exports></Exports>
      <KrArrivals></KrArrivals>
      <KrLoadings></KrLoadings>
      <SelfDelivery></SelfDelivery>
      <SelfCollection></SelfCollection>
    </MainContent>
  )
};

export default Today;
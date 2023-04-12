import Exports from './International/Exports';
import KrLoadings from './Country/KrLoadings';
import Imports from './International/Imports';
import KrArrivals from './Country/krArrivals';
import { useEffect } from "react";
import { fetchKrArrivalData } from "../Slices/krArrivalsSlice";
import { fetchKrDepartureData } from "../Slices/krLoadingsSlice";
import { fetchExportData } from "../Slices/exportsSlice";
import { fetchImportData } from "../Slices/importsSlice";
import { fetchOrderData } from "../Slices/ordersSlice";
import { fetchOrderDetailsData } from "../Slices/orderDetailsSlice";
import { fetchColDelData } from '../Slices/colDelSlice';
import SelfCollection from './SelfColDel/SelfCollection';
import SelfDelivery from './SelfColDel/SelfDelivery';
import { MainContent } from '../styled';
import { useDispatch } from 'react-redux';
import useWindowDimensions from "../useWindowDimensions";

const Today = () => {
  let { height } = useWindowDimensions()
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
  
  useEffect(() => {
    if (height === 1080) {
      const interval = setInterval(() => {
        dispatch(fetchKrArrivalData());
        dispatch(fetchKrDepartureData());
        dispatch(fetchExportData());
        dispatch(fetchImportData());
        dispatch(fetchOrderData());
        dispatch(fetchOrderDetailsData())
        dispatch(fetchColDelData())
        console.log("called")
      }, 120000);
      return () => clearInterval(interval);
    }
  }, [dispatch,height]);

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
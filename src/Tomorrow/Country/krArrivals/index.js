import { useSelector, useDispatch } from "react-redux";
import { selectKrArrivalsDay, toggleArrivalsShow } from "../../../Slices/krArrivalsSlice"
import { selectOrders } from "../../../Slices/ordersSlice"
import { selectOrdersDetails } from '../../../Slices/orderDetailsSlice';
import { Table, Thead, Th, Td, Topic, Ul, Li, TrDetails, TableForDetails, Tr, TrWorkingON } from "../../../styledTableElements";
import Timer from "@amplication/react-compound-timer/build";

const KrArrivals = () => {
    const dispatch = useDispatch();
    const day = 1 // 0 to dzisiaj, 1 to jutro
    const krArrivals = useSelector(state => selectKrArrivalsDay(state, day));
    const { orders } = useSelector(selectOrders)
    const { ordersDetails } = useSelector(selectOrdersDetails)

    return (
        <div>
            {krArrivals.length === 0 ? <Topic>BRAK ROZŁADUNKÓW KRAJOWYCH </Topic> :
                <>
                    <Topic>KRAJ ROZŁADUNKI ({krArrivals.length})</Topic>
                    <Table>
                        <Thead>
                            <tr>
                                <Th>TRASA</Th>
                                <Th>PRZESYŁKI</Th>
                                <Th>SAMOCHÓD</Th>
                                <Th>NACZEPA</Th>
                                <Th>PRZEWOŹNIK</Th>
                                <Th>PLAN GODZ ROZ</Th>
                                <Th>ZDARZENIA</Th>
                                <Th>ZAPLANOWANA</Th>
                            </tr>
                        </Thead>
                        {krArrivals.map(krA => (
                            <tbody>
                                {krA.OBSLUGA === 1 ?
                                    <TrWorkingON onClick={() => dispatch(toggleArrivalsShow(krA.ID_LISTY_LINIOWE))} key={krA.ID_LISTY_LINIOWE}>
                                        <Td>{krA.NR_LISTU} {krA.ADR === 1 ? "☣️" : null} <br /> {krA.IMIE} <br />
                                            <div>
                                                <Timer initialTime={krA.TIME}>
                                                    <Timer.Hours />:
                                                    <Timer.Minutes />:
                                                    <Timer.Seconds />
                                                </Timer>
                                            </div>
                                        </Td>
                                        <Td>
                                            <Ul>
                                                {orders.filter(orders => orders.ID_LISTY_LINIOWE === krA.ID_LISTY_LINIOWE).map(krAO => (
                                                    <Li>
                                                        {krAO.NR_PRZESYLKI}
                                                    </Li>
                                                ))}
                                            </Ul>
                                        </Td>
                                        <Td>{krA.SAMOCHOD}</Td>
                                        <Td>{krA.NACZEPA}</Td>
                                        <Td>{krA.PRZEWOZNIK}</Td>
                                        <Td>{krA.PLAN_GODZ_ROZLAD_OD} - {krA.PLAN_GODZ_ROZLAD_DO}</Td>
                                        <Td>{krA.GEN_ZAWY_OK === "TAK" ? "✔️" : "❌"}</Td>
                                        <Td>{krA.STATUS === "TAK" ? "✔️" : "❌"}</Td>
                                    </TrWorkingON> :
                                    <Tr onClick={() => dispatch(toggleArrivalsShow(krA.ID_LISTY_LINIOWE))} key={krA.ID_LISTY_LINIOWE}>
                                        <Td>{krA.NR_LISTU} {krA.ADR === 1 ? "☣️" : null}</Td>
                                        <Td>
                                            <Ul>
                                                {orders.filter(orders => orders.ID_LISTY_LINIOWE === krA.ID_LISTY_LINIOWE).map(krAO => (

                                                    <Li>
                                                        {krAO.NR_PRZESYLKI}
                                                    </Li>

                                                ))}
                                            </Ul>
                                        </Td>
                                        <Td>{krA.SAMOCHOD}</Td>
                                        <Td>{krA.NACZEPA}</Td>
                                        <Td>{krA.PRZEWOZNIK}</Td>
                                        <Td>{krA.PLAN_GODZ_ROZLAD_OD} - {krA.PLAN_GODZ_ROZLAD_DO}</Td>
                                        <Td>{krA.GEN_ZAWY_OK === "TAK" ? "✔️" : "❌"}</Td>
                                        <Td>{krA.STATUS === "TAK" ? "✔️" : "❌"}</Td>
                                    </Tr>}
                                {krA.show ?
                                    <TableForDetails>
                                        <thead>
                                            <tr>
                                                <Td>PRZESYŁKA</Td>
                                                <Td>DZIAŁ</Td>
                                                <Td>NADAWCA</Td>
                                                <Td>ODBIORCA</Td>
                                                <Td>CLENIE</Td>
                                                <Td>PRZEDPŁATA</Td>
                                                <Td>SZCZEGÓŁY</Td>
                                                <Td>WAGA</Td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.filter(orders => orders.ID_LISTY_LINIOWE === krA.ID_LISTY_LINIOWE).map(krAO => (
                                                <TrDetails key={krAO.ID_PRZESYLKI}>
                                                    <Td>{krAO.NR_PRZESYLKI}</Td>
                                                    <Td>{krAO.DZIAL}</Td>
                                                    <Td>{krAO.KLIENT_NAD_SYMBOL}</Td>
                                                    <Td>{krAO.KLIENT_ODB_SYMBOL}</Td>
                                                    <Td>{
                                                        {
                                                            1: "✔️",
                                                            2: "✔️",
                                                            0: "🚩",
                                                            999: "BRAK"
                                                        }[krAO.CELNA]
                                                    }</Td>
                                                    <Td>
                                                        {
                                                            {
                                                                999: "N/D",
                                                                0: "NIE OPŁ. ❗",
                                                                1: "OPŁ. ✔️",
                                                                2: "ZW. WAR ⚠️"
                                                            }[krAO.PLATNOSC]
                                                        }
                                                    </Td>
                                                    <Td>
                                                        <Ul>
                                                            {ordersDetails.filter(ordersDetails => ordersDetails.ID_PRZESYLKI === krAO.ID_PRZESYLKI).map(oD => (
                                                                <Li>{oD.WYMIARY}</Li>
                                                            ))}
                                                        </Ul>
                                                    </Td>
                                                    <Td>{krAO.WAGA}kg</Td>
                                                </TrDetails>
                                            ))}
                                        </tbody>
                                    </TableForDetails> : null
                                }
                            </tbody>
                        ))}
                    </Table>
                </>
            }
        </div>
    );
};

export default KrArrivals;
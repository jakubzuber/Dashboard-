import { useSelector, useDispatch } from "react-redux";
import { selectKrLoadingsDay, toggleLoadingsShow } from "../../../Slices/krLoadingsSlice";
import { selectOrders } from "../../../Slices/ordersSlice";
import { selectOrdersDetails } from '../../../Slices/orderDetailsSlice';
import { Table, Thead, Th, Td, Topic, Ul, Li, Tr, TableForDetails, TrDetails, TrWorkingON } from "../../../styledTableElements";
import Timer from "@amplication/react-compound-timer/build";

const KrLoadings = () => {
    const day = 1
    const krLoadings = useSelector(state => selectKrLoadingsDay(state, day));
    const { orders } = useSelector(selectOrders);
    const { ordersDetails } = useSelector(selectOrdersDetails)
    const dispatch = useDispatch();

    return (
        <div>
            {krLoadings.length === 0 ? <Topic>BRAK ZAŁADUNKÓW KRAJOWYCH </Topic> :
                <>
            <Topic>KRAJ ZAŁADUNKI ({krLoadings.length})</Topic>
            <Table>
                <Thead>
                    <tr>
                        <Th>TRASA</Th>
                        <Th>PRZESYŁKI</Th>
                        <Th>SAMOCHÓD</Th>
                        <Th>NACZEPA</Th>
                        <Th>PRZEWOŹNIK</Th>
                        <Th>PLAN GODZ ZAŁ</Th>
                        <Th>ZDARZENIA</Th>
                        <Th>ZAPLANOWANA</Th>
                    </tr>
                </Thead>
                {krLoadings.map(krL => (
                    <tbody>
                        {krL.OBSLUGA === 1 ?
                            <TrWorkingON onClick={() => dispatch(toggleLoadingsShow(krL.ID_LISTY_LINIOWE))} key={krL.ID_LISTY_LINIOWE}>
                                <Td>{krL.NR_LISTU} {krL.ADR === 1 ? "☣️" : null} <br /> {krL.IMIE} <br />
                                    <div>
                                        <Timer initialTime={krL.TIME}>
                                            <Timer.Hours />:
                                            <Timer.Minutes />:
                                            <Timer.Seconds />
                                        </Timer>
                                    </div>
                                </Td>
                                <Td>
                                    <Ul>{orders.filter(orders => orders.ID_LISTY_LINIOWE === krL.ID_LISTY_LINIOWE).map(krLO => (
                                        <Li>
                                            {krLO.NR_PRZESYLKI}
                                        </Li>
                                    ))}
                                    </Ul>
                                </Td>
                                <Td>{krL.SAMOCHOD}</Td>
                                <Td>{krL.NACZEPA}</Td>
                                <Td>{krL.PRZEWOZNIK}</Td>
                                <Td>{krL.PLAN_GODZ_ZALAD_OD} - {krL.PLAN_GODZ_ZALAD_DO}</Td>
                                <Td>{krL.GEN_ZAWY_OK === "TAK" ? "✔️" : "❌"}</Td>
                                <Td>{krL.STATUS === "TAK" ? "✔️" : "❌"}</Td>
                            </TrWorkingON> :
                            <Tr onClick={() => dispatch(toggleLoadingsShow(krL.ID_LISTY_LINIOWE))} key={krL.ID_LISTY_LINIOWE}>
                                <Td>{krL.NR_LISTU} {krL.ADR === 1 ? "☣️" : null}</Td>
                                <Td>
                                    <Ul>{orders.filter(orders => orders.ID_LISTY_LINIOWE === krL.ID_LISTY_LINIOWE).map(krLO => (
                                        <Li>
                                            {krLO.NR_PRZESYLKI}
                                        </Li>
                                    ))}
                                    </Ul>
                                </Td>
                                <Td>{krL.SAMOCHOD}</Td>
                                <Td>{krL.NACZEPA}</Td>
                                <Td>{krL.PRZEWOZNIK}</Td>
                                <Td>{krL.PLAN_GODZ_ZALAD_OD} - {krL.PLAN_GODZ_ZALAD_DO}</Td>
                                <Td>{krL.GEN_ZAWY_OK === "TAK" ? "✔️" : "❌"}</Td>
                                <Td>{krL.STATUS === "TAK" ? "✔️" : "❌"}</Td>
                            </Tr>}
                        {krL.show ?
                            <TableForDetails>
                                <thead>
                                    <tr>
                                        <Td>PRZESYŁKA</Td>
                                        <Td>DZIAŁ</Td>
                                        <Td>NADAWCA</Td>
                                        <Td>ODBIORCA</Td>
                                        <Td>CLENIE</Td>
                                        <Td>SZCZEGÓŁY</Td>
                                        <Td>PRZEDPŁATA</Td>
                                        <Td>WAGA</Td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.filter(orders => orders.ID_LISTY_LINIOWE === krL.ID_LISTY_LINIOWE).map(krLO => (
                                        <TrDetails key={krLO.ID_PRZESYLKI}>
                                            <Td>{krLO.NR_PRZESYLKI}</Td>
                                            <Td>{krLO.DZIAL}</Td>
                                            <Td>{krLO.KLIENT_NAD_SYMBOL}</Td>
                                            <Td>{krLO.KLIENT_ODB_SYMBOL}</Td>
                                            <Td>{
                                                {
                                                    1: "✔️",
                                                    2: "✔️",
                                                    0: "🚩",
                                                    999: "BRAK"
                                                }[krLO.CELNA]
                                            }</Td>
                                            <Td>
                                            {
                                                {
                                                    999: "N/D",
                                                    0: "NIE OPŁ. ❗",
                                                    1: "OPŁ. ✔️",
                                                    2: "ZW. WAR ⚠️" 
                                                }[krLO.PLATNOSC]
                                            }
                                            </Td>
                                            <Td>
                                                <Ul>
                                                    {ordersDetails.filter(ordersDetails => ordersDetails.ID_PRZESYLKI === krLO.ID_PRZESYLKI).map(oD => (
                                                        <Li>{oD.WYMIARY}</Li>
                                                    ))}
                                                </Ul>
                                            </Td>
                                            <Td>{krLO.WAGA}kg</Td>
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

export default KrLoadings;


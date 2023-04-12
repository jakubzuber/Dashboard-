import { useSelector, useDispatch } from "react-redux";
import { toggleExportsShow, selectExportsDay } from "../../../Slices/exportsSlice";
import { selectOrders } from "../../../Slices/ordersSlice";
import { selectOrdersDetails } from '../../../Slices/orderDetailsSlice';
import { Table, Thead, Th, Td, Topic, Tr, TrDetails, TrWorkingON, Ul, Li, TableForDetails } from "../../../styledTableElements";
import Timer from "@amplication/react-compound-timer/build";

const Exports = () => {
    const day = 0
    const exports = useSelector(state => selectExportsDay(state, day))
    const { orders } = useSelector(selectOrders)
    const { ordersDetails } = useSelector(selectOrdersDetails)
    const dispatch = useDispatch()

    return (
        <div>
            {exports.length === 0 ? <Topic>BRAK EKSPORTÓW</Topic> :
                <>
                    <Topic>EKSPORTY ({exports.length})</Topic>

                    <Table>
                        <Thead>
                            <tr>
                                <Th>TRASA</Th>
                                <Th>SAMOCHÓD</Th>
                                <Th>NACZEPA</Th>
                                <Th>PRZEWOŹNIK</Th>
                                <Th>PLAN GODZ ZAŁ</Th>
                                <Th>DZIAŁ</Th>
                                <Th>ILOŚĆ PRZESYŁEK</Th>
                                <Th>ZDARZENIA</Th>
                                <Th>ZAPLANOWANA</Th>
                            </tr>
                        </Thead>
                        {exports.map(exp => (
                            <tbody>
                                {exp.OBSLUGA === 1 ?
                                    <TrWorkingON onClick={() => dispatch(toggleExportsShow(exp.ID_LISTY_LINIOWE))} key={exp.ID_LISTY_LINIOWE}>
                                        <Td>{exp.NR_LISTU} {exp.ADR === 1 ? "☣️" : null} <br /> {exp.IMIE} <br />
                                            <div>
                                                <Timer initialTime={exp.TIME}>
                                                    <Timer.Hours />:
                                                    <Timer.Minutes />:
                                                    <Timer.Seconds />
                                                </Timer>
                                            </div>
                                        </Td>
                                        <Td>{exp.SAMOCHOD}</Td>
                                        <Td>{exp.NACZEPA}</Td>
                                        <Td>{exp.PRZEWOZNIK}</Td>
                                        <Td>{exp.PLAN_GODZ_ZALAD_OD} - {exp.PLAN_GODZ_ZALAD_DO}</Td>
                                        <Td>{exp.DZIAL}</Td>
                                        <Td>{exp.ILOSC_PRZESYLEK}</Td>
                                        <Td>{exp.GEN_ZAWY_OK === "TAK" ? "✔️" : "❌"}</Td>
                                        <Td>{exp.STATUS === "TAK" ? "✔️" : "❌"}</Td>
                                    </TrWorkingON> :
                                    <Tr onClick={() => dispatch(toggleExportsShow(exp.ID_LISTY_LINIOWE))} key={exp.ID_LISTY_LINIOWE}>
                                        <Td>{exp.NR_LISTU} {exp.ADR === 1 ? "☣️" : null}</Td>
                                        <Td>{exp.SAMOCHOD}</Td>
                                        <Td>{exp.NACZEPA}</Td>
                                        <Td>{exp.PRZEWOZNIK}</Td>
                                        <Td>{exp.PLAN_GODZ_ZALAD_OD} - {exp.PLAN_GODZ_ZALAD_DO}</Td>
                                        <Td>{exp.DZIAL}</Td>
                                        <Td>{exp.ILOSC_PRZESYLEK}</Td>
                                        <Td>{exp.GEN_ZAWY_OK === "TAK" ? "✔️" : "❌"}</Td>
                                        <Td>{exp.STATUS === "TAK" ? "✔️" : "❌"}</Td>
                                    </Tr>}
                                {exp.show ?
                                    <TableForDetails>
                                        <thead>
                                            <Tr>
                                                <Td>PRZESYŁKA</Td>
                                                <Td>NADAWCA</Td>
                                                <Td>ODBIORCA</Td>
                                                <Td>CLENIE</Td>
                                                <Td>PRZEDPŁATA</Td>
                                                <Td>SZCZEGÓŁY</Td>
                                                <Td>WAGA</Td>
                                            </Tr>
                                        </thead>
                                        <tbody>
                                            {orders.filter(orders => orders.ID_LISTY_LINIOWE === exp.ID_LISTY_LINIOWE).map(expO => (
                                                <TrDetails key={expO.ID_PRZESYLKI}>
                                                    <Td>{expO.NR_PRZESYLKI}{expO.CHUJ === 1 ? " 🚚" : ""}</Td>
                                                    <Td>{expO.KLIENT_NAD_SYMBOL}</Td>
                                                    <Td>{expO.KLIENT_ODB_SYMBOL}</Td>
                                                    <Td>{
                                                        {
                                                            1: "✔️",
                                                            2: "✔️",
                                                            0: "🚩",
                                                            999: "BRAK"
                                                        }[expO.CELNA]
                                                    }</Td>
                                                    <Td>
                                                        {
                                                            {
                                                                999: "N/D",
                                                                0: "NIE OPŁ. ❗",
                                                                1: "OPŁ. ✔️",
                                                                2: "ZW. WAR ⚠️"
                                                            }[expO.PLATNOSC]
                                                        }
                                                    </Td>
                                                    <Td>
                                                        <Ul>
                                                            {ordersDetails.filter(ordersDetails => ordersDetails.ID_PRZESYLKI === expO.ID_PRZESYLKI).map(oD => (
                                                                <Li>{oD.WYMIARY}</Li>
                                                            ))}
                                                        </Ul>
                                                    </Td>
                                                    <Td>{expO.WAGA}kg</Td>
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
    )
};

export default Exports;
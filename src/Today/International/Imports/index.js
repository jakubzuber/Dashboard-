import { useSelector, useDispatch } from "react-redux";
import { toggleImportsShow, selectImportsDay } from "../../../Slices/importsSlice";
import { selectOrders } from '../../../Slices/ordersSlice'
import { selectOrdersDetails } from '../../../Slices/orderDetailsSlice'
import { Table, Thead, Th, Td, Topic, Tr, TrDetails, TrWorkingON, Ul, Li, TableForDetails } from "../../../styledTableElements";
import Timer from "@amplication/react-compound-timer/build";

const Imports = () => {
    const day = 0 // 0 to dzisiaj, 1 to jutro
    const imports = useSelector(state => selectImportsDay(state, day))
    const { orders } = useSelector(selectOrders)
    const { ordersDetails } = useSelector(selectOrdersDetails)
    const dispatch = useDispatch()

    return (
        <div>
            {imports.length === 0 ? <Topic>BRAK IMPORTÓW</Topic> :
                <>
                    <Topic>IMPORTY ({imports.length})</Topic>
                    <Table>
                        <Thead>
                            <tr>
                                <Th>TRASA</Th>
                                <Th>SAMOCHÓD</Th>
                                <Th>NACZEPA</Th>
                                <Th>PRZEWOŹNIK</Th>
                                <Th>PLAN GODZ ROZ</Th>
                                <Th>DZIAŁ</Th>
                                <Th>ILOŚĆ PRZESYŁEK</Th>
                                <Th>ZDARZENIA</Th>
                                <Th>ZAPLANOWANA</Th>
                            </tr>
                        </Thead>
                        {imports.map(imp => (
                            <tbody>
                                {imp.OBSLUGA === 1 ?
                                    <TrWorkingON onClick={() => dispatch(toggleImportsShow(imp.ID_LISTY_LINIOWE))} >
                                        <Td>{imp.NR_LISTU} {imp.ADR === 1 ? "☣️" : null} <br /> {imp.IMIE} <br />
                                            <div>
                                                <Timer initialTime={imp.TIME}>
                                                    <Timer.Hours />:
                                                    <Timer.Minutes />:
                                                    <Timer.Seconds />
                                                </Timer>
                                            </div>
                                        </Td>
                                        <Td>{imp.SAMOCHOD}</Td>
                                        <Td>{imp.NACZEPA}</Td>
                                        <Td>{imp.PRZEWOZNIK}</Td>
                                        <Td>{imp.PLAN_GODZ_ROZLAD_OD} - {imp.PLAN_GODZ_ROZLAD_DO}</Td>
                                        <Td>{imp.DZIAL}</Td>
                                        <Td>{imp.ILOSC_PRZESYLEK}</Td>
                                        <Td>{imp.GEN_ZAWY_OK === "TAK" ? "✔️" : "❌"}</Td>
                                        <Td>{imp.STATUS === "TAK" ? "✔️" : "❌"}</Td>
                                    </TrWorkingON>
                                    :
                                    <Tr onClick={() => dispatch(toggleImportsShow(imp.ID_LISTY_LINIOWE))} >
                                        <Td>{imp.NR_LISTU} {imp.ADR === 1 ? "☣️" : null}</Td>
                                        <Td>{imp.SAMOCHOD}</Td>
                                        <Td>{imp.NACZEPA}</Td>
                                        <Td>{imp.PRZEWOZNIK}</Td>
                                        <Td>{imp.PLAN_GODZ_ROZLAD_OD} - {imp.PLAN_GODZ_ROZLAD_DO}</Td>
                                        <Td>{imp.DZIAL}</Td>
                                        <Td>{imp.ILOSC_PRZESYLEK}</Td>
                                        <Td>{imp.GEN_ZAWY_OK === "TAK" ? "✔️" : "❌"}</Td>
                                        <Td>{imp.STATUS === "TAK" ? "✔️" : "❌"}</Td>
                                    </Tr>}
                                {imp.show ?
                                    <TableForDetails>
                                        <thead>
                                            <tr>
                                                <Td>PRZESYŁKA</Td>
                                                <Td>NADAWCA</Td>
                                                <Td>ODBIORCA</Td>
                                                <Td>CELNA</Td>
                                                <Td>PRZEDPŁATA</Td>
                                                <Td>SZCZEGÓŁY</Td>
                                                <Td>WAGA</Td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.filter(orders => orders.ID_LISTY_LINIOWE === imp.ID_LISTY_LINIOWE).map(impO => (
                                                <TrDetails key={impO.ID_PRZESYLKI}>
                                                    <Td>{impO.NR_PRZESYLKI}{impO.CHUJ === 1 ? " 🚚" : ""}</Td>
                                                    <Td>{impO.KLIENT_NAD_SYMBOL}</Td>
                                                    <Td>{impO.KLIENT_ODB_SYMBOL}</Td>
                                                    <Td>{
                                                        {
                                                            1: "✔️",
                                                            2: "✔️",
                                                            0: "🚩",
                                                            999: "BRAK"
                                                        }[impO.CELNA]
                                                    }</Td>
                                                    <Td>
                                                        {
                                                            {
                                                                999: "N/D",
                                                                0: "NIE OPŁ. ❗",
                                                                1: "OPŁ. ✔️",
                                                                2: "ZW. WAR ⚠️"
                                                            }[impO.PLATNOSC]
                                                        }
                                                    </Td>
                                                    <Td>
                                                        <Ul>{ordersDetails.filter(ordersDetails => ordersDetails.ID_PRZESYLKI === impO.ID_PRZESYLKI).map(oD => (
                                                            <Li>{oD.WYMIARY}</Li>
                                                        ))}
                                                        </Ul>
                                                    </Td>
                                                    <Td>{impO.WAGA}kg</Td>
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

export default Imports;
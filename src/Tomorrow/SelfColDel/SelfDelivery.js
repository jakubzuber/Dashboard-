import { Topic, Table, Thead, Th, Td, Ul, Li } from "../../styledTableElements";
import { useSelector } from "react-redux";
import { selectColDelDay } from "../../Slices/colDelSlice";
import { selectOrdersDetails } from "../../Slices/orderDetailsSlice";

const SelfDelivery = () => {
    const day = 2
    const colDel = useSelector(state => selectColDelDay(state, day))
    const { ordersDetails } = useSelector(selectOrdersDetails)

    return (
        <div>
            {colDel.length === 0 ? <Topic>BRAK ODBIORÓW WŁASNYCH</Topic> :
                <>
                    <Topic>DOWOZY WŁASNE</Topic>
                    <Table>
                        <Thead>
                            <tr>
                                <Th>NR PRZESYŁKI</Th>
                                <Th>DZIAŁ</Th>
                                <Th>NADAWCA</Th>
                                <Th>ODBIORCA</Th>
                                <Th>SZCZEGÓŁY</Th>
                                <Th>WAGA</Th>
                                <Th>CELNA</Th>
                                <Th>PRZEDPŁATA</Th>
                            </tr>
                        </Thead>
                        <tbody>
                            {colDel.filter(colDel => colDel.CO === 'DOWOZ').map(dowoz =>
                                <tr key={dowoz.ID_PRZESYLKI}>
                                    <Td>{dowoz.NR_PRZESYLKI}</Td>
                                    <Td>{dowoz.DZIAL}</Td>
                                    <Td>{dowoz.KLIENT_NAD_SYMBOL}</Td>
                                    <Td>{dowoz.KLIENT_ODB_SYMBOL}</Td>
                                    <Td>
                                        <Ul>{ordersDetails.filter(ordersDetails => ordersDetails.ID_PRZESYLKI === dowoz.ID_PRZESYLKI).map(oD => (
                                            <Li>{oD.WYMIARY}</Li>
                                        ))}
                                        </Ul>
                                    </Td>
                                    <Td>{dowoz.WAGA}</Td>
                                    <Td>
                                        {
                                            {
                                                1: "✔️",
                                                2: "✔️",
                                                0: "🚩",
                                                999: "BRAK"
                                            }[dowoz.CELNA]
                                        }
                                    </Td>
                                    <Td>
                                        {
                                            {
                                                999: "N/D",
                                                0: "NIE OPŁ. ❗",
                                                1: "OPŁ. ✔️",
                                                2: "ZW. WAR ⚠️"
                                            }[dowoz.PLATNOSC]
                                        }
                                    </Td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </>
            }
        </div>
    );
};

export default SelfDelivery;
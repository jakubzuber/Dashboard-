import { Topic, Table, Thead, Th, Td, Ul, Li } from "../../styledTableElements";
import { useSelector } from "react-redux";
import { selectColDelDay } from "../../Slices/colDelSlice";
import { selectOrdersDetails } from "../../Slices/orderDetailsSlice"

const SelfCollection = () => {
    const day = 2
    const colDel = useSelector(state => selectColDelDay(state, day))
    const { ordersDetails } = useSelector(selectOrdersDetails)

    return (
        <div>
            {colDel.length === 0 ? <Topic>BRAK ODBIORÓW WŁASNYCH</Topic> :
                <>
                    <Topic>ODBIORY WŁASNE</Topic>
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
                            {colDel.filter(colDel => colDel.CO === 'ODBIOR').map(odbior =>
                                <tr key={odbior.ID_PRZESYLKI}>
                                    <Td>{odbior.NR_PRZESYLKI}</Td>
                                    <Td>{odbior.DZIAL}</Td>
                                    <Td>{odbior.KLIENT_NAD_SYMBOL}</Td>
                                    <Td>{odbior.KLIENT_ODB_SYMBOL}</Td>
                                    <Td>
                                        <Ul>{ordersDetails.filter(ordersDetails => ordersDetails.ID_PRZESYLKI === odbior.ID_PRZESYLKI).map(oD => (
                                            <Li>{oD.WYMIARY}</Li>
                                        ))}
                                        </Ul>
                                    </Td>
                                    <Td>{odbior.WAGA}</Td>
                                    <Td>
                                        {
                                            {
                                                1: "✔️",
                                                2: "✔️",
                                                0: "🚩",
                                                999: "BRAK"
                                            }[odbior.CELNA]
                                        }
                                    </Td>
                                    <Td>
                                        {
                                            {
                                                999: "N/D",
                                                0: "NIE OPŁ. ❗",
                                                1: "OPŁ. ✔️",
                                                2: "ZW. WAR ⚠️"
                                            }[odbior.PLATNOSC]
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

export default SelfCollection;
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { changeOrder, changeRamp, fetchPlanerData, selectPlanerRamp, setSort } from "./planerSlice";
import { updateDatabaseRamp } from "./updatesToDatabase";
import Droppable from "./Droppable"
import { Container, DndContexStyle, RampTitle } from './styled'
import { snapCenterToCursor } from "@dnd-kit/modifiers";

const Planer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPlanerData())
    }, [dispatch]);

    const [currentRamp, setCurrentRamp] = useState({ ID: null, RAMP: "" });

    const r = 'noRamp'
    const r0 = 'ramp0'
    //const rb = 'rampBus'
    const r1 = 'ramp1'
    const r2 = 'ramp2'
    const r3 = 'ramp3'
    const rBok = 'rampBok'

    const noRamp = useSelector(state => selectPlanerRamp(state, r))
    const ramp0 = useSelector(state => selectPlanerRamp(state, r0))
    //const rampBus = useSelector(state => selectPlanerRamp(state, rb))
    const ramp1 = useSelector(state => selectPlanerRamp(state, r1))
    const ramp2 = useSelector(state => selectPlanerRamp(state, r2))
    const ramp3 = useSelector(state => selectPlanerRamp(state, r3))
    const rampBok = useSelector(state => selectPlanerRamp(state, rBok))

    const items = {
        noRamp,
        ramp0,
        ramp1,
        ramp2,
        ramp3,
        rampBok
    };

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates
        }),
        useSensor(TouchSensor)
      );

    const handleDragStart = ({ active }) => {
        const activeContainer = active.data.current.sortable.containerId;
        setCurrentRamp(activeContainer)
    };

    const handleOverOver = ({ over, active }) => {

        const overId = over?.id;
        
        if (!overId) {
            return
        };

        const overContainer = over.data.current?.sortable.containerId || over.id;
       
        if (!overContainer) {
            return
        };

        const activeItem = active.id;
        const activeContainer = active.data.current.sortable.containerId;
        const dataToChangeRamps = { activeItem, overContainer }

        //console.log(activeContainer)

        if (activeContainer !== overContainer) {
            dispatch(changeRamp(dataToChangeRamps))
        };
    };

    const handleDragEnd = ({ active, over }) => {
        const activeContainer = active.data.current.sortable.containerId;
        const overContainer = active.data.current?.sortable.containerId || over.id;
        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.data.current?.sortable.index || 0;
        const activeItem = active.id;
        const overItem = over.id || 0;

        const dataToChangeRamps = { activeItem, overContainer };
        const dataToChangeOrder = { items: items, activeContainer, activeItem, overItem, activeIndex, overIndex }

        if (!over) {
            return
        };

        if (overContainer === currentRamp) {
            if (activeItem !== overItem) {
                dispatch(changeOrder(dataToChangeOrder));
                dispatch(setSort(items[overContainer]));
            };
        } else {
            updateDatabaseRamp(dataToChangeRamps);
            dispatch(changeOrder(dataToChangeOrder));
            dispatch(setSort(items[overContainer]));
        };
    };

    const nameSwtich = (group) => {
        switch (group) {
            case 'noRamp':
                return 'Bez rampy'
            case 'ramp0':
                return 'Rampa 0'
            case 'rampBus':
                return 'Rampa busy'
            case 'ramp1':
                return 'Rampa 1'
            case 'ramp2':
                return 'Rampa 2'
            case 'ramp3':
                return 'Rampa 3'
            case 'rampBok':
                return 'Rampa boczna'
            default:
                return 'Brak rampy w systemie'
        };
    };

    return (
        <>
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragOver={handleOverOver}
                onDragEnd={handleDragEnd}
            >
                <DndContexStyle modifiers={[snapCenterToCursor]}>
                    {Object.keys(items).map((group) => (
                        <Container>
                            <RampTitle >
                                {nameSwtich(group)}
                            </RampTitle>
                            <Droppable id={group} items={items[group]} key={group} />
                        </Container>
                    ))}
                </DndContexStyle>
            </DndContext >
        </>
    );
};

export default Planer;
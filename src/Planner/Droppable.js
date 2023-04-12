import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { DroppableContainer } from "./styled";

const Droppable = ({ id, items }) => {
    const { setNodeRef } = useDroppable({ id });
    const itemsIds =new Array(items.map((item) => item.ID));
    

    

    return (
        <SortableContext id={id} items={itemsIds[0]} strategy={rectSortingStrategy}>
            <DroppableContainer ref={setNodeRef}>
                {items.map((item) => (
                    <SortableItem key={item.ID} item={item}/>
                ))}
            </DroppableContainer>
        </SortableContext>
    );
};

export default Droppable;
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";
import { Element } from "./styled";

const SortableItem = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id: props.item.ID
    });

    const itemStyle = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <Element style={itemStyle} ref={setNodeRef} {...attributes} {...listeners} department={props.item.DEPARTMENT.trim()} workingOn={props.item.WORKING_ON} >
            {props.item.TITLE}
        </Element>
    );
};

export default SortableItem;
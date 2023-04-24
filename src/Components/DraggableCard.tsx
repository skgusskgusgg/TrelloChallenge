import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px;
    background-color: ${(props) =>
        props.isDragging ? "#74b9ff" : props.theme.cardColor};
    box-shadow: ${(props) =>
        props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
`;
interface IDraggableCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
    return (
        <Draggable draggableId={toDoId + ""} index={index}>
            {(magic, snapshot) => (
                <Card
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                    isDragging={snapshot.isDragging}
                >
                    {toDoText}
                </Card>
            )}
        </Draggable>
    );
}
export default React.memo(DraggableCard);

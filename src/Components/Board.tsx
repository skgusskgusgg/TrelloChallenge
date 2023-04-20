import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    border-radius: 5px;
    min-height: 200px;
    background-color: ${(props) => props.theme.boardColor};
`;
const Title = styled.div`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 20px;
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(magic) => (
                    <div ref={magic.innerRef} {...magic.droppableProps}>
                        {toDos.map((toDo, index) => {
                            return (
                                <DraggableCard
                                    key={toDo}
                                    toDo={toDo}
                                    index={index}
                                />
                            );
                        })}
                        {magic.placeholder}
                    </div>
                )}
            </Droppable>
        </Wrapper>
    );
}

import {
    Draggable,
    DragDropContext,
    Droppable,
    DropResult,
} from "@hello-pangea/dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    border-radius: 5px;
    min-height: 200px;
    background-color: ${(props) => props.theme.boardColor};
`;
const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);

    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return;
        setToDos((oldToDos) => {
            const copyToDos = [...oldToDos];
            // 1) source.index 삭제
            console.log("Delete item on", source.index);
            console.log(copyToDos);

            copyToDos.splice(source.index, 1);

            console.log("Deleted item");
            console.log(copyToDos);

            // 2) destination.index 넣기
            console.log("Put back", draggableId, "on", destination.index);

            copyToDos.splice(destination?.index, 0, draggableId);

            console.log(copyToDos);

            return copyToDos;
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    <Droppable droppableId="one">
                        {(magic) => (
                            <Board
                                ref={magic.innerRef}
                                {...magic.droppableProps}
                            >
                                {toDos.map((toDo, index) => {
                                    return (
                                        <Draggable
                                            draggableId={toDo}
                                            index={index}
                                            key={toDo}
                                        >
                                            {(magic) => (
                                                <Card
                                                    ref={magic.innerRef}
                                                    {...magic.draggableProps}
                                                    {...magic.dragHandleProps}
                                                >
                                                    {toDo}
                                                </Card>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {magic.placeholder}
                            </Board>
                        )}
                    </Droppable>
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;

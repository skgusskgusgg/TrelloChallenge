import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
    display: flex;
    max-width: 680px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);

    const onDragEnd = (info: DropResult) => {
        console.log(info);
        const { destination, draggableId, source } = info;

        if (destination?.droppableId === source.droppableId) {
            // same board movement.
            setToDos((allToDos) => {
                const boardCopy = [...allToDos[source.droppableId]];
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination?.index, 0, draggableId);

                return {
                    ...allToDos,
                    [source.droppableId]: boardCopy,
                };
            });
        }

        // if (!destination) return;
        // setToDos((oldToDos) => {
        //     const copyToDos = [...oldToDos];
        //     // 1) source.index 삭제
        //     console.log("Delete item on", source.index);
        //     console.log(copyToDos);

        //     copyToDos.splice(source.index, 1);

        //     console.log("Deleted item");
        //     console.log(copyToDos);

        //     // 2) destination.index 넣기
        //     console.log("Put back", draggableId, "on", destination.index);

        //     copyToDos.splice(destination?.index, 0, draggableId);

        //     console.log(copyToDos);

        //     return copyToDos;
        // });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {Object.keys(toDos).map((boardId) => (
                        <Board
                            key={boardId}
                            boardId={boardId}
                            toDos={toDos[boardId]}
                        />
                    ))}
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;

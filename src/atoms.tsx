import { atom, selector } from "recoil";

interface IToDoState {
    [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": ["a", "b", "r", "w"],
        Doing: ["c", "t", "d", "o"],
        Done: ["f", "z", "s"],
    },
});

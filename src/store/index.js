import { createStore } from "vuex";
import { nanoid } from "nanoid";

const store = createStore({
    state () {
        return {
            modalIsOpen: false,
            notesArray: [],
            showEditInput: false,
            savedNoteState: [],
            noteChanges: [],
        }
    },
    mutations: {
        addNewNote(state) {
            state.notesArray.push({
                noteId: nanoid(),
                heading: "Новая заметка",
                tasks: [{
                    content: "Новая задача",
                    id: nanoid(),
                    checked: false,
                }],
            });
        },
        showEditInput(state, payload) {
            state.showEditInput = payload;
        },
        deleteNote(state, noteIndex) {
            state.notesArray.splice(noteIndex, 1);
        },
        createNewTask(state, noteIndex) {
                state.notesArray[noteIndex].tasks.push({
                    content: "",
                    id: nanoid(),
                    checked: false,
                });
        },
        editNote(state, {noteIndex, taskId, content}) {
            if (taskId) {
                const taskIndex = state.notesArray[noteIndex].tasks.findIndex(item => item.id === taskId);
                state.notesArray[noteIndex].tasks[taskIndex].content = content;
            } else {
                state.notesArray[noteIndex].heading = content;
            }
        },
        doneTask(state,{noteIndex, taskId, isChecked}) {
            const taskIndex = state.notesArray[noteIndex].tasks.findIndex(item => item.id === taskId);
            state.notesArray[noteIndex].tasks[taskIndex].checked = isChecked;
        },
        deleteTask(state, {noteIndex, taskId}) {
            const taskIndex = state.notesArray[noteIndex].tasks.findIndex(item => item.id === taskId);
            state.notesArray[noteIndex].tasks.splice(taskIndex, 1);
        },
        saveNoteState(state, noteIndex) {
            state.savedNoteState[0] = JSON.parse( JSON.stringify(state.notesArray[noteIndex]) );
        },
        cancelEditRequest(state, noteIndex) {
            state.notesArray[noteIndex] = state.savedNoteState[0];
        },
        removeNoteChanges(state, noteIndex) {
            let changes = JSON.stringify(state.notesArray[noteIndex]);
            state.notesArray[noteIndex] = JSON.parse( JSON.stringify(state.savedNoteState[0]) );
            state.savedNoteState[1] = JSON.parse(changes);
        },
        repeatRemovedChanges(state, noteIndex) {
            state.notesArray[noteIndex] = state.savedNoteState[1];
        },
        getNotesArray(state, array) {
            state.notesArray = array;
        }
    },
});

export default store;
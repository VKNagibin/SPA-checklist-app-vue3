import { createStore } from "vuex";
import { nanoid } from "nanoid";

function getArrayCopy(array) {
    return JSON.parse(JSON.stringify(array));
}

function noteChangesHandler(state, noteIndex) {
    if (state.wasRevert) {
        state.savedNoteState = getArrayCopy( state.savedNoteState.slice(0, ++state.curStateIndex) );
        state.savedNoteState.push( getArrayCopy(state.notesArray[noteIndex]) );
        state.wasRevert = false;
    } else {
        state.savedNoteState.push( getArrayCopy(state.notesArray[noteIndex]) );
        state.curStateIndex++;
    }
}

const store = createStore({
    state () {
        return {
            modalIsOpen: false,
            notesArray: [],
            showEditInput: false,
            savedNoteState: [],
            curStateIndex: 0,
            wasRevert: false,
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
            localStorage.setItem("notesArray", state.notesArray);
        },
        createNewTask(state, noteIndex) {
                state.notesArray[noteIndex].tasks.push({
                    content: "",
                    id: nanoid(),
                    checked: false,
                });


            noteChangesHandler(state, noteIndex)
        },
        editNote(state, {noteIndex, taskId, content}) {
            if (taskId) {
                const taskIndex = state.notesArray[noteIndex].tasks.findIndex(item => item.id === taskId);
                state.notesArray[noteIndex].tasks[taskIndex].content = content;
            } else {
                state.notesArray[noteIndex].heading = content;
            }

            noteChangesHandler(state, noteIndex)
        },
        doneTask(state,{noteIndex, taskId, isChecked}) {
            const taskIndex = state.notesArray[noteIndex].tasks.findIndex(item => item.id === taskId);
            state.notesArray[noteIndex].tasks[taskIndex].checked = isChecked;

            noteChangesHandler(state, noteIndex)
        },
        deleteTask(state, {noteIndex, taskId}) {
            const taskIndex = state.notesArray[noteIndex].tasks.findIndex(item => item.id === taskId);
            state.notesArray[noteIndex].tasks.splice(taskIndex, 1);

            noteChangesHandler(state, noteIndex);
            localStorage.setItem("notesArray", state.notesArray);
        },
        saveNoteState(state, noteIndex) {
            const savedState = getArrayCopy(state.notesArray[noteIndex]);
            state.savedNoteState.push(savedState);
        },
        cancelEditRequest(state, noteIndex) {
            state.notesArray[noteIndex] = state.savedNoteState[0];
        },
        removeNoteChanges(state, noteIndex) {
            if (state.curStateIndex > 0) {
                state.notesArray[noteIndex] = getArrayCopy(state.savedNoteState[--state.curStateIndex]);
            }
            state.wasRevert = true;
        },
        repeatRemovedChanges(state, noteIndex) {
            if (state.curStateIndex <= state.savedNoteState.length - 1) {
                state.notesArray[noteIndex] = getArrayCopy(state.savedNoteState[++state.curStateIndex]);
            }

            (state.curStateIndex === state.savedNoteState.length - 1) &&
            (state.wasRevert = false);
        },
        clearNoteState(state) {
            state.savedNoteState = [];
            state.curStateIndex = 0;
            state.wasRevert = false;

        },
        getNotesArray(state, array) {
            state.notesArray = array;
        }
    },
});

export default store;
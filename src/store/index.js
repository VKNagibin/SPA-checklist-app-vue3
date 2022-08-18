import { createStore } from "vuex";
import { nanoid } from "nanoid";
import {getArrayCopy, arrayLastElementIndex, noteChangesHandler} from "@/store/helpers";

const store = createStore({
    state () {
        return {
            notesArray: [],
            showEditInput: false,
            savedNoteState: [],
            curStateIndex: 0,
            wasRevert: false,
        }
    },
    mutations: {
        ADD_NEW_NOTE(state) {
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

        DELETE_NOTE(state, noteIndex) {
            state.notesArray.splice(noteIndex, 1);
            localStorage.setItem("notesArray", state.notesArray);
        },

        EDIT_NOTE(state, {noteIndex, taskId, content}) {
            if (taskId) {
                const taskIndex = state.notesArray[noteIndex].tasks.findIndex(item => item.id === taskId);
                state.notesArray[noteIndex].tasks[taskIndex].content = content;
            } else {
                state.notesArray[noteIndex].heading = content;
            }

            noteChangesHandler(state, noteIndex)
        },

        SET_NOTES_ARRAY(state, array) {
            state.notesArray = array;
        },

        SET_SAVED_NOTE_STATE(state, noteIndex) {
            const savedState = getArrayCopy(state.notesArray[noteIndex]);
            state.savedNoteState.push(savedState);
        },

        REMOVE_NOTE_CHANGES(state, noteIndex) {
            if (state.curStateIndex > 0) {
                state.notesArray[noteIndex] = getArrayCopy(state.savedNoteState[--state.curStateIndex]);
            }
            state.wasRevert = true;
        },

        CREATE_NEW_TASK(state, noteIndex) {
            state.notesArray[noteIndex].tasks.push({
                content: "",
                id: nanoid(),
                checked: false,
            });

            noteChangesHandler(state, noteIndex)
        },

        DONE_TASK(state, {noteIndex, taskId, isChecked}) {
            const taskIndex = state.notesArray[noteIndex].tasks.findIndex(item => item.id === taskId);
            state.notesArray[noteIndex].tasks[taskIndex].checked = isChecked;

            noteChangesHandler(state, noteIndex)
        },

        DELETE_TASK(state, {noteIndex, taskId}) {
            const taskIndex = state.notesArray[noteIndex].tasks.findIndex(item => item.id === taskId);
            state.notesArray[noteIndex].tasks.splice(taskIndex, 1);

            noteChangesHandler(state, noteIndex);
            localStorage.setItem("notesArray", state.notesArray);
        },

        CANCEL_EDIT_REQUEST(state, noteIndex) {
            state.notesArray[noteIndex] = state.savedNoteState[0];
        },

        REPEAT_REMOVED_CHANGES(state, noteIndex) {
            const lastElementIndex = arrayLastElementIndex(state.savedNoteState);

            if (state.curStateIndex <= lastElementIndex) {
                state.notesArray[noteIndex] =
                    getArrayCopy(state.savedNoteState[++state.curStateIndex]);
            }

            if (state.curStateIndex === lastElementIndex) state.wasRevert = false;
        },

        CLEAR_SAVED_NOTE_STATE(state) {
            state.savedNoteState = [];
            state.curStateIndex = 0;
            state.wasRevert = false;
        },

        SHOW_EDIT_INPUT(state, payload) {
            state.showEditInput = payload;
        },
    },

    actions: {
        addNewNote({ commit }) {
            commit("ADD_NEW_NOTE");
        },
        deleteNote({ commit }, noteIndex) {
            commit("DELETE_NOTE", noteIndex);
        },
        editNote({ commit }, {noteIndex, taskId, content}) {
            commit("EDIT_NOTE", {noteIndex, taskId, content});
        },
        setNotesArray({ commit }, notesArray) {
            commit("SET_NOTES_ARRAY", notesArray);
        },
        saveNoteState({ commit }, noteIndex) {
            commit("SET_SAVED_NOTE_STATE", noteIndex);
        },
        removeNoteChanges({ commit }, noteIndex) {
            commit("REMOVE_NOTE_CHANGES", noteIndex);
        },
        createNewTask({ commit }, noteIndex) {
            commit("CREATE_NEW_TASK", noteIndex);
        },
        doneTask({ commit }, {noteIndex, taskId, isChecked}) {
            commit("DONE_TASK", {noteIndex, taskId, isChecked});
        },
        deleteTask({ commit }, {noteIndex, taskId}) {
            commit("DELETE_TASK", {noteIndex, taskId});
        },
        cancelEditRequest({ commit }, noteIndex) {
            commit("CANCEL_EDIT_REQUEST", noteIndex);
        },
        repeatRemovedChanges({ commit }, noteIndex) {
            commit("REPEAT_REMOVED_CHANGES", noteIndex);
        },
        showEditInput({ commit }, payload) {
            commit("SHOW_EDIT_INPUT", payload);
        },
        clearSavedNoteState({ commit }) {
            commit("CLEAR_SAVED_NOTE_STATE");
        },
    },
    getters: {
        notesArray(state) {
            return state.notesArray;
        },
        savedNoteState(state) {
            return state.savedNoteState;
        },
        curStateIndex(state) {
            return state.curStateIndex;
        },
        wasRevert(state) {
            return state.wasRevert;
        },
        showForwardButton(state) {
            return state.savedNoteState.length > 1 && state.curStateIndex;
        },
    }
});

export default store;
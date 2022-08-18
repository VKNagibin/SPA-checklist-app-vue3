export function getArrayCopy(array) {
    return JSON.parse(JSON.stringify(array));
}

export function noteChangesHandler(state, noteIndex) {
    if (state.wasRevert) {
        state.savedNoteState = getArrayCopy( state.savedNoteState.slice(0, ++state.curStateIndex) );
        state.savedNoteState.push( getArrayCopy(state.notesArray[noteIndex]) );
        state.wasRevert = false;
    } else {
        state.savedNoteState.push( getArrayCopy(state.notesArray[noteIndex]) );
        state.curStateIndex++;
    }
}
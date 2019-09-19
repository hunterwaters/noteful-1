import React from 'react';
import {Route} from 'react-router-dom';
import STORE from '../DummyStore';
import NoteViewFolder from '../NoteViewFolder/NoteViewFolder';
import NoteView from '../NoteView/NoteView';
import NoteList from '../NoteList/NoteList';
import NoteListFolder from '../NoteListFolder/NoteListFolder';
import Header from '../Header/Header';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import '../App/App.css';

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    setTimeout(() => this.setState(STORE), 700);
  }

  renderFolderRoutes() {
    const {notes, folders} = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact 
            key = {path}
            path = {path}
            render = {routeProps => (
              <NoteListFolder
                folders = {folders}
                notes = {notes}
                {...routeProps}
              />
            )}
          />
        ))}
        <Route
          path = '/note/:noteId'
          render = {routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NoteViewFolder {...routeProps} folder = {folder} />
          }}
        />
        <Route path = '/add-folder' component = {NoteViewFolder} />
        <Route path = '/add-note' component = {NoteViewFolder} />
      </>
    );
  }

  renderNoteRoutes() {
    const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteList
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NoteView {...routeProps} note={note} />;
                    }}
                />
            </>
        );
  }

  render() {
    return(
      <div className = 'App'>
        <nav 
          className = 'folderNav'>
          {this.renderFolderRoutes()}
        </nav>
        <Header />
        <main 
          className = 'seeNotes'>
          {this.renderNoteRoutes()}
        </main>
      </div>
    )
  }
}

export default App;
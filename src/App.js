import './App.css';

import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


class App extends Component {
  constructor(props) {
    super(props);
    const html = '<p>Hey this <strong>editor</strong> rocks 😀, type here!</p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="applet">
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
        <hr></hr>
        <textarea
          className="toxt"
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
        made possible by <a href="https://jpuri.github.io/react-draft-wysiwyg" target="_blank">jpuri</a>
      </div>

    );
  }
}


export default App;

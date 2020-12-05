// Import React dependencies.
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom';
// Import the Slate editor factory.
import { createEditor, Transforms, Editor } from 'slate'
import isHotKey from 'is-hotkey'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { Text } from 'slate';

import './docEditor.css';


// imports from custom separated components to make up the editor
import onKeyDown from './docEditorParts/onkeydown';
import {renderElement, HeadingElements, EditorNav, handleClick} from './docEditorParts/elements';


const Leaf = require('./docEditorParts/leaves')


export default (props) => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState([
        {
        type: 'paragraph',
        children: [{
            text: 'A line of text in a paragraph.',
            // text:'anthor text input field'
        }],
        },
    ])

    const [displayPreviewKey, setDisplayPreviewKey] = useState('')

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    return (<div style={{
        textAlign: 'center',
    }}>
        {props.demo? <div>
            <h1>Slate doc editor</h1>
            <p>Key Pressed: {displayPreviewKey}</p>
            <p>Try Pressing "{'&'}"</p>
            <p>Sorry for the underline applying Italics too, i'll look into it</p>
            {/* <h3>Here is what you typed:</h3>
            <p>{displayPreview}</p> */}
        </div>: ''
        }
        <div style={{
            textAlign:'left',
            margin: '0px 10%',
        }}>
        <Slate 
        editor={editor}
        value={value}
        onChange={newValue => setValue(newValue)}
      >
        <EditorNav handleClick={handleClick} />
        <Editable
        renderElement={useCallback(renderElement)}
        renderLeaf={renderLeaf}
        style={{
            background: '#eee',
            borderRadius: '2%',
            border: '1px solid gray',
            padding: '20px',
            transition: '0.15s ease-out',
        }}
        onKeyDown={props, setDisplayPreviewKey, editor => onKeyDown(props=props, setDisplayPreviewKey=setDisplayPreviewKey, editor=editor)} />
      </Slate></div>
    </div>)
}
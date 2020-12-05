// Import React dependencies.
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom';
// Import the Slate editor factory.
import { createEditor, Transforms, Editor } from 'slate'
import isHotKey from 'is-hotkey'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { Text } from 'slate';

import './docEditor.css';


const Leaf = props => {
    return (<span {...props.attributes} 
    style={{
        // add a span to bold this. 
        fontWeight: props.leaf.bold===true? 'bold':'normal',
        textDecoration: props.leaf.underline===true? 'underline':'none',
        fontStyle: props.leaf.italic===true? 'oblique':'normal',
        fontFamily: 'sans-serif'
    }}
    >
        {props.children}
    </span>)
}

const EditorNav = props => {
    return (<div>
        <button onClick={props.handleClick('bold')}>Bold</button>
    </div>)
}

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

    // const renderElement = useCallback(props => {
    //     return <Element />
    // })
    // use Leaf to grab the highlighted text and wrap tags around it. 
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])
    
    const handleClick = (type) => {
        if (type === 'bold') {
            // editor.current.addMark('bold')
        }
    }


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
        // toggleMark={(props, editor, next) => {
        //     const { children, mark, attributes } = props
        //     switch (mark.type) {
        //       case 'bold':
        //         return <strong {...attributes}>{children}</strong>
        //       case 'italic':
        //         return <em {...attributes}>{children}</em>
        //       case 'underline':
        //         return <u {...attributes}>{children}</u>
        //       default:
        //         return next()
        //     }
        //   }}
        // renderElement={renderElement}
        renderLeaf={renderLeaf}
        style={{
            background: '#eee',
            borderRadius: '2%',
            border: '1px solid gray',
            padding: '20px',
            transition: '0.15s ease-out',
        }}
        onKeyDown={(event) => {
            // showcases on demo page only
            if (props.demo) {
                // display e-handler and showcase
                setDisplayPreviewKey(event.key);
                // setDisplayPreview(value.children);
                if (event.key === '&') {
                    event.preventDefault()
                    editor.insertText('and')
                }
            }

            // add in text bolding, italicise, strikethrough
            if (!event.ctrlKey) {
                return
            }

    
            switch (event.key) {
            // When "B" is pressed, bold the text in the selection.
            case 'b': {
                event.preventDefault()
                const [boldMatch] = Editor.nodes(editor, {
                    match: n => n.bold === true
                })
                Transforms.setNodes(
                editor,
                { bold: boldMatch? false:true },
                // Apply it to text nodes, and split the text node up if the
                // selection is overlapping only part of it.
                { match: n => Text.isText(n), split: true }
                )
                break
            }
            case 'u': {
                event.preventDefault()
                const [underlineMatch] = Editor.nodes(editor, {
                    match: n => n.underline === true
                })
                Transforms.setNodes(
                    editor,
                    { underline: underlineMatch? false:true },
                    { match: n => Text.isText(n), split: true}
                )
            }
            case 'i': {
                event.preventDefault()
                const [italicMatch] = Editor.nodes(editor, {
                    match: n => n.italic === true
                })
                Transforms.setNodes(
                    editor,
                    { italic: italicMatch? false:true },
                    { match: n => Text.isText(n), split: true }
                )
            }
              }
        }} />
      </Slate></div>
    </div>)
}
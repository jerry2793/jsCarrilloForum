// handles the top navbar of the editor, or self defined elements
// that wraps around a selected text. 
// contains: 
// heading, math input, and font family switch


// Import React dependencies.
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom';
// Import the Slate editor factory.
import { createEditor, Transforms, Editor } from 'slate'
import isHotKey from 'is-hotkey'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { Text } from 'slate';

const renderElement = props => {
    switch (props.element.type) {
        case 'h1':
            return <><HeadingElements headingType={'h1'} /></>
        default: 
            return <HeadingElements headingType={'normal'} />
    }
}

const HeadingElements = props => {
    return (<span {...props.attributes}>
        {
        ( (props) => {
            switch (props.headingType) {
                case 'h1': 
                    return <div><h1>{props.children}</h1></div>
                case 'h2':
                    return <div><h2>{props.children}</h2></div>
                default: 
                    return null
            }
        } ) ()
    }
    </span>)
}

const EditorNav = props => {
    const editor = useSlate();
    const isH1Active = editor => {

    }
    return (<div>
        <button onClick={e => props.handleClick(e,'h1',editor)}>H1</button>
        <button onClick={e => props.handleClick(e,'h2', editor)}>H2</button>
        <button onClick={e => props.handleClick(e,'h3',editor)}>H3</button>
        <button onClick={e => props.handleClick(e,'h5',editor)}>H5</button>
    </div>)
}

const handleClick = (event, type, editor) => {
    if (type === 'bold') {
        
    } else if (type === 'h1') {
        event.preventDefault();
        const [hMatch] = Editor.nodes(editor, {
            match: n => n.type === 'h1'
        })
        Transforms.setNodes(
            editor, 
            { type: hMatch? 'normal':'h1' },
            {match: n => Editor.isBlock(editor, n) }
        )
    }
}

export {renderElement, HeadingElements, EditorNav, handleClick};






// Just in case, but can be dynamically adjusted. 
// const NoHElements = props => {
//     return (<span>
//         {...props.attributes}
//         {props.children}
//     </span>)
// }
// const H1Elements = props => {
//     return (<span> {...props.attributes}
//         <h1>{props.children}</h1>
//     </span>)
// }
// const H3Elements = props => {
//     return (<span> {...props.attributes}
//         <h3>{props.children}</h3>
//     </span>)
// }
// const H5Elements = props => {
//     return (<span> {...props.attributes}
//         <h5>{props.children}</h5>
//     </span>)
// }


// handles the leaves (specific term made by slate)
// Include: bold, italics, underline, font-family rendering. 

// Import React dependencies.
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom';
// Import the Slate editor factory.
import { createEditor, Transforms, Editor } from 'slate'
import isHotKey from 'is-hotkey'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { Text } from 'slate';


export default props => {
    return (<span {...props.attributes} 
    style={{
        // add a span to bold this. 
        fontWeight: props.leaf.bold===true? 'bold':'normal',
        textDecoration: props.leaf.underline===true? 'underline':'none',
        fontStyle: props.leaf.italic===true? 'oblique':'normal',
        fontFamily: props.leaf.fontFamily? props.leaf.fontFamily:'sans-serif'
    }}
    >{props.children}</span>)
}
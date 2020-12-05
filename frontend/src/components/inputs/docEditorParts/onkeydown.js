// the onKeyDown attribute of the document editor

// Import React dependencies.
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom';
// Import the Slate editor factory.
import { createEditor, Transforms, Editor } from 'slate'
import isHotKey from 'is-hotkey'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { Text } from 'slate';

export default (event, props, setDisplayPreviewKey, editor) => {
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
            { underline: underlineMatch? false:true, italics: false },
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
}
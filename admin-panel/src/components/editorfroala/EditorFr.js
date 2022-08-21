import React, {useEffect, useRef, useState} from 'react';
// import ReactDOM from 'react-dom';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';


import 'froala-editor/css/plugins.pkgd.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'


import 'froala-editor/css/third_party/font_awesome.min.css'
import 'froala-editor/js/third_party/font_awesome.min.js'

import 'froala-editor/css/third_party/embedly.min.css'
import 'froala-editor/js/third_party/embedly.min.js'

import 'froala-editor/css/third_party/image_tui.min.css'
import 'froala-editor/js/third_party/image_tui.min.js'

import 'froala-editor/css/third_party/spell_checker.min.css'
import 'froala-editor/js/third_party/spell_checker.min.js'
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

import {productService} from "../../services/product.service";

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';



const EditorFr = () => {
    const removeFunc = async (img) => {
        await productService.deleteTempImage({
            src: img
        })
    }

const [state, setState] = useState({
    model: 'Example text'
})

const handleModelChange = (model) => {
    setState({model: model})
}
return (
    <>
        <FroalaEditor
            tag='textarea'
            model={state.model}
            config={{
                placeholder: "Edit Me",
                imageUploadURL: 'http://localhost:4000/api/uploadimage',

                imageUploadParams: {
                    // id: 'my_editor'
                    name: 'UploadFiles'
                },
                imageMaxSize: 1024 * 1024,
                events: {
                    // 'focus': function (e, editor) {
                    //     // console.log(editor.selection.get());
                    //     console.log('Hello');
                    //
                    // },

                    'image.removed':
                        function ($img) {
                            console.log('remove')
                            // Set the image source to the image delete params.
                            removeFunc($img[0].currentSrc).then(res => console.log(res))

                        },
                    'editable.mageDeleteURL': 'http://localhost:4000/api/removeimage',
                    // 'image.replaced': function ($img, response) {
                    //     // Image was replaced in the editor.
                    //     console.log('replaced')
                    //     console.log($img)
                    //     console.log(response)
                    // },
                }
            }}
            onModelChange={(model) => handleModelChange(model)}

        />
        {/*<FroalaEditorView*/}
        {/*    model={state.model}*/}
        {/*/>*/}
    </>
)
}

export default EditorFr;

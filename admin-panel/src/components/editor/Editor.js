import React, {useEffect, useRef, useState} from 'react';
import {
    HtmlEditor,
    Image,
    Inject,
    Link,
    QuickToolbar,
    RichTextEditorComponent,
    Toolbar,
    Table,
    insertCompleted
} from '@syncfusion/ej2-react-richtexteditor';
import {useDispatch} from "react-redux";



// const hostUrl =  'https://ej2-aspcore-service.azurewebsites.net/';
const toolbarSettings = {
    type: 'MultiRow',
    items: [
        // 'FileManager',
        'CreateTable', 'Bold', 'Italic', 'Underline', 'StrikeThrough',
        'FontSize', 'FontColor', 'BackgroundColor',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
        'Outdent', 'Indent',  'SuperScript', 'SubScript', '|',
        'CreateLink', 'Image',  '|', 'ClearFormat', 'Print',
        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
    ],

};

const insertImageSettings = {
    saveUrl: 'http://localhost:4000/api/uploadimage',
    removeUrl: 'http://localhost:4000/api/removeimage',
}

const imageUploading = (args) => {
    console.log('here1')
    console.log(args.currentRequest)
    if (args.currentRequest !== undefined) {

        const _user = localStorage.getItem("access");
        console.log(_user);
        try{
            args.currentRequest.setRequestHeader("Authorization", `Bearer ${_user}`)
        }catch (e) {
            console.log(e)
        }

        console.log('here4')

        // args.CurrentRequest=[{"Authorization": `Bearer ${localStorage.getItem('access')}` }];
        args.customFormData = [{'name': 'Syncfusion INC'}];

    }
    // Setting Authorization Header
    // currentRequest.setRequestHeader(
    //     "Authorization",
    //     "Bearer 0223343211446"
    // );
    // You can also add additional parameters as key-value pair
    // args.customFormData = [{ name: "Syncfusion INC" }];
}
let tempName;

const imageUploadSuccess = (args) =>{

console.log('==================')
    // console.log(filename)
    console.log('==================')
    // if (args.e.currentTarget.getResponseHeader("name") !== null) {
        console.log(args.e.currentTarget)
        console.log(args.e.currentTarget.response)
        // args.file.name = args.e.currentTarget.getResponseHeader("name");
    try {
        args.file.name = JSON.parse(args.e.currentTarget.response).link;
        console.log('==================')
        console.log(args.file.name)
        console.log('==================')
        const filename = document.querySelectorAll(".e-file-name")[0];
        console.log(filename);
        filename.innerHTML = args.file.name.replace(document.querySelectorAll(".e-file-type")[0].innerHTML, "");
        filename.title = args.file.name;
        tempName =filename.title;

    }catch (e) {
        console.log(e)
    }

}


// const fileManagerSettings = {
//     enable: true,
//     path: '/Pictures/Food',
//     ajaxSettings: {
//         url: hostUrl + 'api/FileManager/FileOperations',
//         getImageUrl: hostUrl + 'api/FileManager/GetImage',
//         uploadUrl: hostUrl + 'api/FileManager/Upload',
//         downloadUrl: hostUrl + 'api/FileManager/Download'
//     }
// };

const Editor = () => {
const rteObj = useRef();

    const [rteValue, setRteValue] = useState("");
    const getFormattedContent = () =>{
        setRteValue(rteObj.current.value);
    }
    const afterImageDelete = () =>{
        console.log('drop');
    }
console.log(rteValue);

    return (
        <div className="Editor">

            <RichTextEditorComponent
                toolbarSettings={toolbarSettings}
                insertImageSettings={insertImageSettings}
                imageUploading={imageUploading}
                // imageSelected={imageSelected}
                imageUploadSuccess={imageUploadSuccess}
                // fileManagerSettings={fileManagerSettings }
                afterImageDelete={afterImageDelete}


                ref={rteObj}
            >
                <Inject services={[ HtmlEditor, Toolbar, Image, Link, QuickToolbar, Table,
                    // FileManager
                ]} />
            </RichTextEditorComponent>
            <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                <button className="getHtml" onClick={getFormattedContent}>Get HTML</button>
            </div>
        </div>
    );
};

export default Editor;
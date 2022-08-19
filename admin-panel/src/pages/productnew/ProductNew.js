import React, {useState} from 'react';
import './productnew.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import {DriveFolderUploadOutlined} from "@mui/icons-material";
// import storage from "../../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import {addProduct} from "../../redux/api.calls";
import {useDispatch} from "react-redux";


const ProductNew = ({inputs, title}) => {
    const [productInputs, setProductInputs] = useState({});
    const [file, setFile] = useState('');
    const [cat, setCat] = useState([]);
    const dispatch = useDispatch();


    const handleChange = (e) => {
        setProductInputs(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const handleCat = (e) => {
        setCat(e.target.value.split(','))
    }

    const handleClick = (e) =>{
        e.preventDefault();
     const fileName = Date.now() + file.name;
//         const storageRef = ref(storage, `/products/${fileName}`);
//
//         const uploadTask = uploadBytesResumable(storageRef, file);
//         // Register three observers:
// // 1. 'state_changed' observer, called any time the state changes
// // 2. Error observer, called on failure
// // 3. Completion observer, called on successful completion
//         uploadTask.on('state_changed',
//             (snapshot) => {
//                 // Observe state change events such as progress, pause, and resume
//                 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log('Upload is ' + progress + '% done');
//                 switch (snapshot.state) {
//                     case 'paused':
//                         console.log('Upload is paused');
//                         break;
//                     case 'running':
//                         console.log('Upload is running');
//                         break;
//                     default:
//                 }
//             },
//             (error) => {
//                 // Handle unsuccessful uploads
//             },
//             () => {
//                 // Handle successful uploads on complete
//                 // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                    const product = {...productInputs, img:downloadURL, categories: cat};
//                    addProduct(product, dispatch);
//                 });
//             }
//         );

    }

    return (
        <div className='new'>
            <Sidebar/>
            <div className="newContainer">
                <Navbar/>
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img src={file
                            ? URL.createObjectURL(file)
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        } alt=""/>
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                Image: <label htmlFor={'file'}><DriveFolderUploadOutlined className={'icon'}/></label>
                                <input type="file" id={'file'} onChange={e => setFile(e.target.files[0])}
                                       style={{display: 'none'}}/>
                            </div>
                            {inputs.map(input => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} onChange={handleChange} placeholder={input.placeholder}
                                           name={input.id}/>
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Categories</label>
                                <input type="text" onChange={handleCat} placeholder='jeans, skirts' name="categories"/>
                            </div>
                            <div className="formInput">
                                <label>Stock</label>
                                <select name="inStock" onChange={handleChange}>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductNew;
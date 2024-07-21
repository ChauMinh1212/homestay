import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import stylesheet của Quill

const TextEditor = ({defaultValue, setDescription}) => {
    const [value, setValue] = useState(defaultValue);
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'

    ];
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const handleChange = (content, delta, source, editor) => {
        setValue(content);
        setDescription(editor.getHTML()); // Sử dụng phương thức getHTML để lấy HTML content
    };

    return (
        <div>
            <ReactQuill value={value} onChange={handleChange} formats={formats} modules={modules}/>
        </div>
    );
};

const HtmlDisplay = ({ htmlContent }) => {
    return (
        <div className="html-output" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default TextEditor;

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyUploadAdapter } from 'src/helpers';
const Index = ({ value, setValue }) => {
    return (
        <React.Fragment>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onReady={(editor) => {
                    editor.setData(value);
                    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                        return new MyUploadAdapter(loader, 'news');
                    };
                }}
                onChange={(event, editor) => {
                    setValue(editor.getData());
                }}
            />
        </React.Fragment>
    );
};

export default Index;

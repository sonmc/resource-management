import React, { useEffect, useState } from 'react';
import avatar from 'src/assets/images/default-avatar.png';
import thumbnail from 'src/assets/images/default.png';
import { Upload } from 'src/Services/share.service';
import './index.scss';

const Component = (props) => {
    const { type, setImage, currentUrl } = props;
    const [src, setSrc] = useState('');

    useEffect(() => {
        setSrc(currentUrl);
    }, [currentUrl]);

    const uploadFile = () => {
        let inputTag = document.createElement('input');
        inputTag.type = 'file';
        inputTag.accept = 'image/png, image/jpeg';
        inputTag.onchange = (_this) => {
            let files = _this.target.files;
            Upload(files)
                .then((res) => {
                    setImage(res.imagePath);
                })
                .catch((err) => {});
        };
        inputTag.click();
    };

    return (
        <div className={'box-img ' + type}>
            <div className="img">
                <img
                    src={src}
                    onError={() => {
                        switch (type) {
                            case 'avatar':
                                setSrc(avatar);
                                break;
                            case 'thumbnail':
                                setSrc(thumbnail);
                                break;
                            default:
                                break;
                        }
                    }}
                    alt=""
                />
            </div>
            <div
                className="caption"
                onClick={() => {
                    uploadFile();
                }}
            >
                <div className="file-input-wrapper">
                    <div className="btn-file-input">
                        <i className="ri-add-line align-bottom"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Component;

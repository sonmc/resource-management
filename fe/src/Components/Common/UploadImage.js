import React, { useEffect, useState } from 'react';
import avatar from '../../assets/images/default-avatar.png';
import thumbnail from '../../assets/images/default.png';
import { Upload } from '../../Services/share.service';
import './index.scss';
const Component = (props) => {
    const { type, setImage, currentUrl } = props;
    const [src, setSrc] = useState('');
    useEffect(() => {
        console.log(currentUrl);
        setSrc(currentUrl);
    }, [currentUrl]);
    const uploadImage = () => {
        let inputTag = document.createElement('input');
        inputTag.type = 'file';
        inputTag.accept = 'image/png, image/jpeg';
        inputTag.onchange = (_this) => {
            let files = _this.target.files;
            Upload(files, 'test', 'image')
                .then((res) => {
                    setImage(res.data.path);
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
                    uploadImage();
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

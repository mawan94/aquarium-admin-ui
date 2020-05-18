import {Upload, Icon, Modal} from 'antd';
import React from 'react'

import constant from '../common/constant';
import PropTypes from "prop-types";

export default class FormItemPicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: []
    };

    componentDidMount() {
        let {fieldName, initValue, setDefaultValue} = this.props;
        if (initValue) {
            let tempObj = {};
            tempObj[fieldName] = initValue;
            setDefaultValue(tempObj);

            //处理initvalue
            if (initValue.length) {
                initValue.map(item => {
                    item.uid = item.fileId;
                    item.url = constant.imgHost + item.filePath
                });
                this.setState({fileList: initValue})
            }
        }
    }

    static defaultProps = {
        uploadMaxCount: 1
    };

    static propTypes = {
        fieldName: PropTypes.string.isRequired,
        handleFormItemChange: PropTypes.func.isRequired,
        uploadMaxCount: PropTypes.number,
        setDefaultValue: PropTypes.func,
        initValue: PropTypes.array,
    };


    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };


    handleChange = ({fileList}) => {
        this.setState({fileList});
        let {handleFormItemChange, fieldName} = this.props;

        if (!fileList.length) {
            handleFormItemChange([], fieldName)
        } else {
            let files = [];
            this.state.fileList.map(item => {
                let tempObj = {};
                if (item.response) { //upload
                    tempObj = {fileId: item.response[0].fileId, filePath: item.response[0].filePath};
                    files.push(tempObj)
                } else { //delete
                    tempObj = {fileId: item.fileId, filePath: item.filePath};
                    files.push(tempObj)
                }
            });
            handleFormItemChange(files, fieldName)
        }
    };

    render() {
        const {fileList, previewVisible, previewImage} = this.state;
        let {uploadMaxCount} = this.props;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action={constant.host + "/file/v1/upload"}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= uploadMaxCount ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

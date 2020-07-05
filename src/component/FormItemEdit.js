import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import PropTypes from "prop-types";

import constant from "../common/constant";


export default class FormItemEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 创建一个空的editorState作为初始值
            editorState: BraftEditor.createEditorState(null)
        }
    };

    static propTypes = {
        fieldName: PropTypes.string.isRequired,
        setDefaultValue: PropTypes.func.isRequired,
        handleFormItemChange: PropTypes.func.isRequired,
        initValue: PropTypes.string,
    };


    componentDidMount() {
        let {initValue} = this.props;
        if (initValue) {
            this.setState({editorState: BraftEditor.createEditorState(initValue)})
        }
    }

    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
        this.props.handleFormItemChange(editorState.toHTML(), this.props.fieldName)
    }

    // 上传校验
    myValidateFn = (file) => {
        console.log(file.size)
        return file.size < 1024 * 1024 * 300
    }

    // 上传到指定服务器
    myUploadFn = (param) => {
        const serverURL = constant.host + '/file/v1/upload'
        const xhr = new XMLHttpRequest
        const fd = new FormData()
        const successFn = (response) => {
            // 假设服务端直接返回文件上传后的地址
            // 上传成功后调用param.success并传入上传后的文件地址
            let file = JSON.parse(xhr.response)[0];
            // console.log(JSON.parse(xhr.response))
            param.success({
                url: constant.imgHost + file.filePath,
                width: '100%',
                meta: {
                    // id: 'xxx',
                    // title: 'xxx',
                    alt: '资源不存在',
                    loop: true, // 指定音视频是否循环播放
                    autoPlay: true, // 指定音视频是否自动播放
                    controls: true, // 指定音视频是否显示控制栏
                    // poster: 'http://xxx/xx.png', // 指定视频播放器的封面
                }
            })
        }
        const progressFn = (event) => {
            // 上传进度发生变化时调用param.progress
            param.progress(event.loaded / event.total * 100)
        }

        const errorFn = (response) => {
            // 上传发生错误时调用param.error
            param.error({
                msg: 'unable to upload.'
            })
        }

        xhr.upload.addEventListener("progress", progressFn, false)
        xhr.addEventListener("load", successFn, false)
        xhr.addEventListener("error", errorFn, false)
        xhr.addEventListener("abort", errorFn, false)

        fd.append('file', param.file)
        xhr.open('POST', serverURL, true)
        xhr.send(fd)

    }

    render() {
        const {editorState} = this.state
        return (
            <div className="my-component">
                <BraftEditor
                    media={{uploadFn: this.myUploadFn, validateFn: this.myValidateFn}}
                    value={editorState}
                    onChange={this.handleChange}
                />
            </div>
        )

    }
}

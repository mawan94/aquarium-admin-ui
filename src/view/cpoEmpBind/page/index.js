import React from 'react'
import {Table} from 'antd';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";

import api from '../../../common/api'
import constant from '../../../common/constant'
import MyTable from '../../../component/MyTable'
export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        // cpo & emp 下拉框
        cecPartner: {
            cpoList: [],
            empList: []
        },
        list: [{articleId:'1'}],

        editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
        outputHTML: '<p></p>'
    };

    componentDidMount() {
        // 加载下拉框数据
        this.handleInitSelector();
    }

    // 加载页面数据
    handleLoadPage = (pageIndex, pageSize) => {

    };

    // 加载下拉框数据
    handleInitSelector = () => {
        api.cecPartnerSelector().then(res => {
            this.setState({cecPartner: res.data})
        });
    };

    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
    }

    // 上传校验
    myValidateFn = (file) => {
        return file.size < 1024 * 1024 * 8
    }

    // 上传到指定服务器
    myUploadFn = (param) => {
        const serverURL = constant.host + '/reconciliation/file/v1/upload'
        const xhr = new XMLHttpRequest
        const fd = new FormData()

        const successFn = (response) => {
            // 假设服务端直接返回文件上传后的地址
            // 上传成功后调用param.success并传入上传后的文件地址
            let file  = JSON.parse(xhr.response)[0];
            console.log(JSON.parse(xhr.response))
            param.success({
                url: 'http://q7oyh3ppo.bkt.clouddn.com' + file.filePath,
                width:'100%',
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
        let columns = [{
            title: '文章编号',
            dataIndex: 'articleId',
            key: 'articleId',
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '标签',
            dataIndex: 'tag',
            key: 'tag',
        }, {
            title: '作者名称',
            dataIndex: 'avatarName',
            key: 'avatarName',
        }];
        const { editorState, outputHTML } = this.state

        const data = [
            {
                year: "1991",
                value: 3
            },
            {
                year: "1992",
                value: 4
            },
            {
                year: "1993",
                value: 3.5
            },
            {
                year: "1994",
                value: 5
            },
            {
                year: "1995",
                value: 4.9
            },
            {
                year: "1996",
                value: 6
            },
            {
                year: "1997",
                value: 7
            },
            {
                year: "1998",
                value: 9
            },
            {
                year: "1999",
                value: 13
            }
        ];
        const cols = {
            value: {
                min: 0
            },
            year: {
                range: [0, 1]
            }
        };

        return (
             <div>

                 {/*<MyTable*/}
                 {/*    handleLoadPage={this.handleLoadPage}*/}
                 {/*    columns={columns}*/}
                 {/*    dataSource={this.state.list}*/}
                 {/*    expandedRowRender={(record) => <InnerList _this={this}/>}/>*/}



                 <div>
                     <div className="editor-wrapper">
                         <BraftEditor
                             media={{uploadFn: this.myUploadFn,validateFn: this.myValidateFn}}
                             value={editorState}
                             onChange={this.handleChange}
                         />
                     </div>
                     <h5>输出内容</h5>
                     <div className="output-content">{outputHTML}</div>
                 </div>

                 <Chart height={400}  data={data} scale={cols} forceFit>
                     <Axis name="year" />
                     <Axis name="value" />
                     <Tooltip
                         crosshairs={{
                             type: "y"
                         }}
                     />
                     <Geom type="line" position="year*value" size={2} />
                     <Geom
                         type="point"
                         position="year*value"
                         size={4}
                         shape={"circle"}
                         style={{
                             stroke: "#fff",
                             lineWidth: 1
                         }}
                     />
                 </Chart>

             </div>
        )
    }
}

class InnerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        // this.handleLoadInnerList(this.props.articleId)
    }

    // handleLoadInnerList = (articleId) => {
    //     http.request({
    //         url: '/backend/articleBind/v1/list',
    //         data: {articleId},
    //         method: 'get',
    //         success: (response) => {
    //             if (response.data) {
    //                 response.data.map((item, index) => {
    //                     item.key = index
    //                 });
    //
    //             }
    //             this.setState({
    //                 list: response.data
    //             });
    //         },
    //         complete: () => {
    //         }
    //     });
    // }

    render() {
        const columns = [
            {
                title: '文章编号',
                dataIndex: 'articleId',
                key: 'articleId',
            },{
                title: '绑定编号',
                dataIndex: 'articleBindId',
                key: 'articleBindId',
            }, {
                title: '商品名称',
                dataIndex: 'productName',
                key: 'productName',
            }
        ];
        return <Table
            columns={columns}
            dataSource={this.state.list}
            pagination={false}
        />
    }
}

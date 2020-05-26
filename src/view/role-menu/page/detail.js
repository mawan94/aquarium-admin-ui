import React from 'react'
import {Checkbox, Button} from 'antd';

import constant from '../../../common/constant'
import api from '../../../common/api'
import storage from '../../../common/storage'


class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: [],
            options: [],
            selectedMenuIds: []
        }
    };


    componentWillMount() {
        console.log(this.props.match.params.id)
        // 获取菜单列表 && 当前员工的菜单列表 同步 defaultvalue存在问题 只能一次性加载
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", constant.host + "/role-menu/b/v1/map?roleType=" + this.props.match.params.id, false);
        xmlhttp.setRequestHeader("token", storage.get('token'));
        xmlhttp.send();
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            console.log(JSON.parse(xmlhttp.responseText))
            let response = JSON.parse(xmlhttp.responseText);
            let defaultValue = [];
            if (response.data) {
                // 组装 options
                response.data.map((item) => {
                    item.label = item.menuTagName
                    item.value = item.menuId
                    // 配置默认选中
                    if (item.defaultSelected) {
                        defaultValue.push(item.menuId)
                    }
                })
                this.setState({
                    options: response.data,
                    defaultValue: defaultValue,
                    selectedMenuIds: defaultValue
                })
            }
        }
    }

    onChange = (checkedValues) => {
        this.setState({
            selectedMenuIds: checkedValues
        })
        setTimeout(() => {
            console.log(this.state.selectedMenuIds);
        }, 50)
    }

    handleSubmit = () => {
        let {defaultValue, selectedMenuIds} = this.state;
        // 获取被删除的元素id
        let delMenuIds = []
        defaultValue.map((item)=>{
            let flag = false
            selectedMenuIds.map((innerItem)=>{
                if(item==innerItem){
                    flag = true
                }
            })
            if (!flag) {
                delMenuIds.push(item)
            }
        })
        // 获取新添加的元素id
        let addMenuIds = []
        selectedMenuIds.map((item)=>{
            let flag = false
            defaultValue.map((innerItem)=>{
                if(item==innerItem){
                    flag = true
                }
            })
            if (!flag) {
                addMenuIds.push(item)
            }
        })

        console.log(`delMenuIds:${delMenuIds}`)
        console.log(`addMenuIds:${addMenuIds}`)
        // 发送网络请求
        //  /backend/roleMenu/v1/changeRoleMenu
        api.changeRoleMenu({roleType: this.props.match.params.id,delMenuIds,addMenuIds}).then(res => {
            this.props.history.goBack()
        })
    }

    render() {
        return (
            <div>

                <div style={{marginTop: '20px', padding: '15px'}}>
                    <Checkbox.Group
                        options={this.state.options}
                        defaultValue={this.state.defaultValue}
                        onChange={this.onChange}/>

                </div>
                <div style={{marginTop: '100px', textAlign: 'center'}}>
                    <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                </div>
                {/*<MyForm formItemList={this.state.formItemList} handleSubmitForm={this.handleSubmitForm}/>*/}
            </div>
        )
    }
}

export default Detail

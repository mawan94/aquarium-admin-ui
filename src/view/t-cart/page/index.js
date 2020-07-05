import React from 'react'
import api from '../../../common/api'
import constant from '../../../common/constant'
import util from '../../../common/util'
import {InputNumber, Input, Checkbox, message, Modal,Empty} from 'antd';
import MyImg from "../../../component/MyImg";
import Button from "antd/es/button";

const confirm = Modal.confirm;
// const {TextArea} = Input;

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            remark: ''
        }
    }

    // 钩子函数 頁面渲染完成时
    componentDidMount() {
        this.handleSearch(this.state.pageIndex, this.state.pageSize);
    }


    handleSearch = (pageIndex, pageSize) => {
        api.getTCartList({}).then(res => {
            // console.log(res)
            this.setState({data: res.data})
        })
    };

    render() {
        let {data} = this.state;
        let _this = this
        let cartItem = []
        data.map(item => {
            cartItem.push(
                <div style={styles.cartItemBox}>
                    <Checkbox
                        checked={item.selected == 1 ? true : false}
                        onChange={(e) => {
                            api.changeTCart({
                                ...item,
                                num: item.num,
                                selected: e.target.checked ? 1 : 2,
                                type: 2
                            }).then(res => {
                                // message.success(`${e.target.checked ? '选中' : '取消选中'}${item.productName}【${item.skuName}`);
                                this.handleSearch(this.state.pageIndex, this.state.pageSize);
                            })
                        }}/>
                    <div style={styles.cartLeft}>
                        <MyImg width={'100px'} height={'100px'}
                               src={constant.imgHost + item.productImg}/>
                        <div style={styles.productName}>
                            <div style={{fontSize: '17px', fontWeight: 600}}>{item.productName}</div>
                            <div style={{marginTop: '10px'}}>{item.skuName}</div>
                        </div>
                    </div>
                    <div style={styles.cartRight}>
                        <span style={{margin: '0 6px'}}>调拨数量: </span>
                        <InputNumber min={1} defaultValue={item.num} onChange={(value) => {
                            if (util.isNum(value)) {
                                if (value == item.num) return
                                api.changeTCart({...item, num: value, selected: item.selected, type: 2}).then(res => {
                                    this.handleSearch(this.state.pageIndex, this.state.pageSize);
                                })
                            }
                        }}/>
                        <Button style={{margin: '0 0 0 22px'}} type="primary" type={'danger'} onClick={() => {
                            confirm({
                                title: '提示',
                                content: '确定要删除此数据项吗？',
                                okText: 'Yes',
                                okType: 'danger',
                                cancelText: 'No',
                                onOk() {
                                    api.delTCart({id: item.tcartId}).then(res => {
                                        _this.handleSearch(_this.state.pageIndex, _this.state.pageSize);
                                    })
                                },
                                onCancel() {
                                    console.log('Cancel');
                                },
                            });
                        }}>删除购物项</Button>
                    </div>
                </div>
            )
        })
        if (cartItem.length === 0) {
            return <Empty/>
        }

        return (
            <div>
                <div style={styles.cartBox}>
                    {cartItem}
                </div>
                <Input.TextArea style={{margin: '20px 0'}}
                                placeholder={'订单备注~'}
                                rows={4}
                                onChange={(e) => {
                                    this.setState({remark: e.target.value})
                                }}/>
                <Button type={'primary'} onClick={() => {
                    api.createTOrder({remark:this.state.remark}).then(res => {
                        _this.handleSearch(_this.state.pageIndex, _this.state.pageSize);
                    })
                }}>提交调拨订单</Button>
            </div>
        )
    }
}

const styles = {
    cartBox: {},
    cartItemBox: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #efefef'
    },
    cartLeft: {
        display: 'flex',
        flex: 1,
        marginLeft: '20px'
    },
    cartRight: {},
    productImg: {
        width: '100px',
        height: '100px',
        objectFit: 'cover'
    },
    productName: {
        marginLeft: '20px'
    },

}



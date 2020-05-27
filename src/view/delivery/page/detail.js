import React from 'react'

import Detail_Form from '../../../component/Detail_Form'
import FORM_ITEM_TYPE from '../../../common/formItemType'
import api from '../../../common/api'
import util from "../../../common/util";
import {Marker, QMap} from "react-tmap";

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeLat: 34.59826078729547,
            storeLng: 119.18180416469575,
            formItemList: [
                {
                    fieldName: 'startingPrice',
                    labelName: '起送价',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'packagingFee',
                    labelName: '包装费',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'serviceFeeRatio',
                    labelName: '服务费率',
                    formItemType: FORM_ITEM_TYPE.SLIDER,
                    initValue: '',
                    required: true,
                    options: {10: '10%', 60: '60%'}
                }, {
                    fieldName: 'baseDeliveryFee',
                    labelName: '基础运费',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'maxDeliveryFee',
                    labelName: '封顶运费',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'stepUnit',
                    labelName: '增收距离(/KM)',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'stepFee',
                    labelName: '增收运费(元)',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }
            ]
        }
    };

    componentDidMount() {
        let {formItemList} = this.state;
        if (this.props.match.params.id) {
            api.getDelivery({deliveryId: this.props.match.params.id}).then(res => {
                if (res.data) {
                    formItemList.map((item, index) => {
                        let key = item.fieldName;
                        formItemList[index].initValue = res.data[key]
                        console.log(`key: ${key}  initVal: ${res.data[key]}`)
                    })
                    let {storeLat, storeLng} = res.data;
                    this.setState({
                        formItemList,
                        storeLat,
                        storeLng
                    })
                }
            })
        } else {
            this.setState({formItemList})
        }
    }

    handleMarkerDragging = (e) => {
        this.setState({
            storeLat: e.position.lat,
            storeLng: e.position.lng,
        })
    }

    //表单提交
    handleSubmitForm = (params) => {
        let {storeLat, storeLng} = this.state;
        params.deliveryId = this.props.match.params.id;
        params.storeLat = storeLat;
        params.storeLng = storeLng;
        if (params.deliveryId) {
            api.updateDelivery(params).then(res => {
                this.props.history.goBack()
            })
        } else {
            api.addDelivery(params).then(res => {
                this.props.history.goBack()
            })
        }
    }

    render() {
        const defaultCenter = {lat: 34.59826078729547, lng: 119.18180416469575};
        let {storeLat, storeLng} = this.state;
        return (
            <div>
                <div style={{margin: '60px'}}>
                    <QMap
                        center={defaultCenter}
                        style={{height: '400px'}}
                        zoom={15}
                    >
                        <Marker
                            position={{lat: storeLat, lng: storeLng}}
                            draggable={true}
                            visible
                            events={{
                                dragging: this.handleMarkerDragging
                            }}
                        />
                    </QMap>
                </div>


                <Detail_Form formItemList={this.state.formItemList}
                             handleSubmitForm={this.handleSubmitForm}/>
            </div>
        )
    }
}

import React from 'react'
import {Row, Col, Button, Modal, Table, Tag, Tabs, Statistic, List, Typography, Divider,DatePicker} from 'antd';
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
} from 'bizcharts';

import api from '../../../common/api'
import constant from '../../../common/constant'
import MyImg from '../../../component/MyImg'
import MyTable from '../../../component/MyTable'
import FORM_ITEM_TYPE from "../../../common/formItemType";
import MyForm from "../../../component/MyForm";

const confirm = Modal.confirm;
const {TabPane} = Tabs;
const { RangePicker } = DatePicker;
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];
export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // 钩子函数 頁面渲染完成时
    componentDidMount() {

    }


    render() {

        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={key => {
                }}>
                    <TabPane tab="成交额走势" key="1">
                        <KShell/>
                    </TabPane>
                    <TabPane tab="活跃度走势" key="2">
                        <KShell/>
                    </TabPane>

                </Tabs>

                <RangePicker onChange={(date,dateString)=> {
                    console.log(date)
                    console.log(dateString)
                }} />
                <div>
                    <Row>
                        <Col span={6}>
                            <Statistic title="平均充值金额" value={112893}/>
                        </Col>
                        <Col span={6}>
                            <Statistic title="平均客单价" value={112893}/>
                        </Col>
                        <Col span={6}>
                            <Statistic title="活动优惠支出" value={112893}/>
                        </Col>
                        <Col span={6}>
                            <Statistic title="预期营业额" value={112893}/>
                        </Col>
                    </Row>
                </div>

                <div style={{margin: '20px 0'}}>
                    <Row>
                        <Col span={12} style={{padding: '10px'}}>
                            <List
                                size="small"
                                header={<div>活跃用户Top10</div>}
                                bordered
                                dataSource={data}
                                renderItem={item =>
                                    <List.Item>
                                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                            <div>{item}</div>
                                            <div>11</div>
                                        </div>
                                    </List.Item>}
                            />
                        </Col>
                        <Col span={12} style={{padding: '10px'}}>
                            <List
                                size="small"
                                header={<div>商品曝光率Top10</div>}
                                bordered
                                dataSource={data}
                                renderItem={item =>
                                    <List.Item>
                                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                            <div>{item}</div>
                                            <div>11</div>
                                        </div>
                                    </List.Item>}
                            />
                        </Col>

                    </Row>
                </div>

                <div style={{margin: '20px 0'}}>
                    <Row>
                        <Col span={12} style={{padding: '10px'}}>
                            <List
                                size="small"
                                header={<div>商品销量Top10</div>}
                                bordered
                                dataSource={data}
                                renderItem={item =>
                                    <List.Item>
                                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                            <div>{item}</div>
                                            <div>11</div>
                                        </div>
                                    </List.Item>}
                            />
                        </Col>
                        <Col span={12} style={{padding: '10px'}}>
                            <List
                                size="small"
                                header={<div>消费榜Top10</div>}
                                bordered
                                dataSource={data}
                                renderItem={item =>
                                    <List.Item>
                                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                            <div>{item}</div>
                                            <div>11</div>
                                        </div>
                                    </List.Item>}
                            />
                        </Col>

                    </Row>
                </div>
                <div>
                    <Tabs defaultActiveKey="1" onChange={key => {
                    }}>
                        <TabPane tab="省" key="1">
                            <CitySaleRatio/>
                        </TabPane>
                        <TabPane tab="市" key="2">
                            <CitySaleRatio/>
                        </TabPane>
                        <TabPane tab="区/县" key="3">
                            <CitySaleRatio/>
                        </TabPane>
                    </Tabs>
                </div>
                <div>
                    <Row>
                        <Col span={12}>
                            <GenderPie/>
                        </Col>
                        <Col span={12}>
                            <CategoryPie/>
                        </Col>
                    </Row>
                </div>
                <Divider />


                {/* 列表数据 */}
                {/*<div>3.用户平均充值金额 CARD</div>*/}
                {/*<div>3.用户平均客单价 CARD</div>*/}
                {/*<div>3.商家活动支出 CARD</div>*/}
                {/*<div>3.预期营业额 CARD （不受日期控制）</div>*/}

                {/*<div>1.活跃用户 LIST</div>*/}
                {/*<div>2.商品曝光率（最多点击）LIST</div>*/}
                {/*<div>4.用户累计消费榜 LIST</div>*/}
                {/*<div>5.商品销量榜 LIST</div>*/}

                {/*<div>9.成交地域(省 柱) 2合1</div>*/}
                {/*<div>9.成交地域(市 柱) 2合1</div>*/}

                {/*<div>7.实际成交男女比例 PIE</div>*/}
                {/*<div>10.销售额分类占比 PIE</div>*/}

                {/*<div>6.日月周平均销售额K线 （不受日期控制）</div>*/}
                {/*<div>6.日月周平均活跃K线（不受日期控制）</div>*/}
                {/*<div>8.库存预警商品 （不受日期控制）LIST</div>*/}



            </div>
        )
    }
}

class CitySaleRatio extends React.Component {
    render() {
        const data = [
            {
                year: "1951 年",
                sales: 38
            },
            {
                year: "1952 年",
                sales: 52
            },
            {
                year: "1956 年",
                sales: 61
            },
            {
                year: "1957 年",
                sales: 145
            },
            {
                year: "1958 年",
                sales: 48
            },
            {
                year: "1959 年",
                sales: 38
            },
            {
                year: "1960 年",
                sales: 38
            },
            {
                year: "1962 年",
                sales: 38
            }
        ];
        const cols = {
            sales: {
                tickInterval: 20
            }
        };
        return (
            <div>
                <Chart height={400} data={data} scale={cols} forceFit>
                    <Axis name="year"/>
                    <Axis name="sales"/>
                    <Tooltip
                        // crosshairs用于设置 tooltip 的辅助线或者辅助框
                        // crosshairs={{
                        //  type: "y"
                        // }}
                    />
                    <Geom type="interval" position="year*sales"/>
                </Chart>
            </div>
        );
    }
}

class GenderPie extends React.Component {
    render() {
        const data = [
            {
                sex: "男",
                sold: 1.45
            },
            {
                sex: "女",
                sold: 0.45
            },
            {
                sex: "未知",
                sold: 0.10
            }
        ];
        Shape.registerShape("interval", "radiusPie", {
            draw(cfg, container) {
                // 将归一化后的数据转换为画布上的坐标
                const points = cfg.origin.points;
                let path = [];

                for (let i = 0; i < cfg.origin.points.length; i += 4) {
                    path.push(["M", points[i].x, points[i].y]);
                    path.push(["L", points[i + 1].x, points[i + 1].y]);
                    path.push(["L", points[i + 2].x, points[i + 2].y]);
                    path.push(["L", points[i + 3].x, points[i + 3].y]);
                    path.push(["L", points[i].x, points[i].y]);
                    path.push(["z"]);
                }

                path = this.parsePath(path, true);
                const rect = container.addShape("path", {
                    attrs: {
                        fill: cfg.color || "#00D9DF",
                        path
                    }
                });
                const minH = Math.min(path[1][7], path[2][2]);
                const minW = Math.min(path[1][6], path[2][1]);
                const diffH = Math.abs(path[1][7] - path[2][2]);
                const diffW = Math.abs(path[1][6] - path[2][1]);
                container.addShape("circle", {
                    attrs: {
                        x: minW + diffW / 2,
                        y: minH + diffH / 2,
                        fill: cfg.color,
                        radius: diffH / 2
                    }
                });
                const minHH = Math.min(path[3][7], path[4][2]);
                const minWW = Math.min(path[3][6], path[4][1]);
                const diffHH = Math.abs(path[3][7] - path[4][2]);
                const diffWW = Math.abs(path[3][6] - path[4][1]);
                container.addShape("circle", {
                    attrs: {
                        x: minWW + diffWW / 2,
                        y: minHH + diffHH / 2,
                        fill: cfg.color,
                        radius: diffH / 2
                    }
                });
                return rect;
            }
        });
        const COLORS = ["#1890ff", "#f04864", "#999"];
        return (
            <div>
                <div>订单成交量(性别)</div>
                <Chart
                    data={data}
                    padding={[20, 30, 30, 20]}
                    plotBackground={{
                        stroke: "#eee"
                    }}
                    forceFit
                >
                    <Coord type="theta" radius={0.8}/>
                    <Tooltip showTitle={false}/>
                    <Geom
                        type="intervalStack"
                        position="sold"
                        color={["sex", COLORS]}
                        shape="radiusPie"
                    >
                        <Label
                            content="sold"
                            custom={true}
                            htmlTemplate={(text, item) => {
                                const isFemale = item.point.sex === "女";
                                const src = isFemale
                                    ? "https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png"
                                    : "https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png";
                                const color = isFemale ? COLORS[1] : COLORS[0];
                                const IMG = `<img style="width:40px" src="${src}" /><br/>`;
                                return `<div style="text-align:center;color:${color}">${IMG}${(
                                    text * 100
                                ).toFixed(0)}%</div>`;
                            }}
                        />
                    </Geom>
                </Chart>
            </div>
        );
    }
}

class CategoryPie extends React.Component {
    render() {
        const data = [
            {
                type: "分类一",
                value: 27
            },
            {
                type: "分类二",
                value: 25
            },
            {
                type: "分类三",
                value: 18
            },
            {
                type: "分类四",
                value: 15
            },
            {
                type: "分类五",
                value: 10
            },
            {
                type: "Other",
                value: 5
            }
        ];
        let max = 0;
        data.forEach(function (obj) {
            if (obj.value > max) {
                max = obj.value;
            }
        }); // 自定义 other 的图形，增加两条线

        G2.Shape.registerShape("interval", "sliceShape", {
            draw(cfg, container) {
                const points = cfg.points;
                const origin = cfg.origin._origin;
                const percent = origin.value / max;
                const xWidth = points[2].x - points[1].x;
                const width = xWidth * percent;
                let path = [];
                path.push(["M", points[0].x, points[0].y]);
                path.push(["L", points[1].x, points[1].y]);
                path.push(["L", points[0].x + width, points[2].y]);
                path.push(["L", points[0].x + width, points[3].y]);
                path.push("Z");
                path = this.parsePath(path);
                return container.addShape("path", {
                    attrs: {
                        fill: cfg.color,
                        path: path
                    }
                });
            }
        });

        class SliderChart extends React.Component {
            render() {
                return (
                    <Chart data={data} forceFit>
                        <Coord type="theta" radius={0.8}/>
                        <Tooltip/>
                        <Geom
                            type="intervalStack"
                            position="value"
                            color="type"
                            shape="sliceShape"
                        >
                            <Label content="type"/>
                        </Geom>
                    </Chart>
                );
            }
        }

        return (
            <div>
                <div>商品分类销售额</div>
                <SliderChart/>
            </div>
        );
    }
}

class KShell extends React.Component{
    render() {
        const data = [
            {
                month: "Jan",
                city: "Tokyo",
                temperature: 7
            },
            {
                month: "Jan",
                city: "London",
                temperature: 3.9
            },
            {
                month: "Feb",
                city: "Tokyo",
                temperature: 6.9
            },
            {
                month: "Feb",
                city: "London",
                temperature: 4.2
            },
            {
                month: "Mar",
                city: "Tokyo",
                temperature: 9.5
            },
            {
                month: "Mar",
                city: "London",
                temperature: 5.7
            },
            {
                month: "Apr",
                city: "Tokyo",
                temperature: 14.5
            },
            {
                month: "Apr",
                city: "London",
                temperature: 8.5
            },
            {
                month: "May",
                city: "Tokyo",
                temperature: 18.4
            },
            {
                month: "May",
                city: "London",
                temperature: 11.9
            },
            {
                month: "Jun",
                city: "Tokyo",
                temperature: 21.5
            },
            {
                month: "Jun",
                city: "London",
                temperature: 15.2
            },
            {
                month: "Jul",
                city: "Tokyo",
                temperature: 25.2
            },
            {
                month: "Jul",
                city: "London",
                temperature: 17
            },
            {
                month: "Aug",
                city: "Tokyo",
                temperature: 26.5
            },
            {
                month: "Aug",
                city: "London",
                temperature: 16.6
            },
            {
                month: "Sep",
                city: "Tokyo",
                temperature: 23.3
            },
            {
                month: "Sep",
                city: "London",
                temperature: 14.2
            },
            {
                month: "Oct",
                city: "Tokyo",
                temperature: 18.3
            },
            {
                month: "Oct",
                city: "London",
                temperature: 10.3
            },
            {
                month: "Nov",
                city: "Tokyo",
                temperature: 13.9
            },
            {
                month: "Nov",
                city: "London",
                temperature: 6.6
            },
            {
                month: "Dec",
                city: "Tokyo",
                temperature: 9.6
            },
            {
                month: "Dec",
                city: "London",
                temperature: 4.8
            }
        ];
        const cols = {
            month: {
                range: [0, 1]
            }
        };
        return (
            <div>
                <Chart height={400} data={data} scale={cols} forceFit>
                    <Legend />
                    <Axis name="month" />
                    <Axis
                        name="temperature"
                        label={{
                            formatter: val => `${val}°C`
                        }}
                    />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="line"
                        position="month*temperature"
                        size={2}
                        color={"city"}
                        shape={"smooth"}
                    />
                    <Geom
                        type="point"
                        position="month*temperature"
                        size={4}
                        shape={"circle"}
                        color={"city"}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1
                        }}
                    />
                </Chart>
            </div>
        );
    }
}

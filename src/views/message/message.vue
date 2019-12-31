<style lang="less">
    @import './message.less';
</style>

<template>
    <div class="message-main-con">
        <div class="message-mainlist-con">
            <div>
                <Button @click="setCurrentMesType('unread')" size="large" long type="text">
                    <transition name="mes-current-type-btn">
                        <Icon v-show="currentMessageType === 'unread'" type="checkmark"></Icon>
                    </transition>
                    <span class="mes-type-btn-text">未读消息</span>
                    <Badge class="message-count-badge-outer" class-name="message-count-badge"
                           :count="unreadCount"></Badge>
                </Button>
            </div>
            <div>
                <Button @click="setCurrentMesType('hasread')" size="large" long type="text">
                    <transition name="mes-current-type-btn">
                        <Icon v-show="currentMessageType === 'hasread'" type="checkmark"></Icon>
                    </transition>
                    <span class="mes-type-btn-text">已读消息</span>
                    <Badge class="message-count-badge-outer" class-name="message-count-badge"
                           :count="hasreadCount"></Badge>
                </Button>
            </div>
            <div>
                <Button @click="setCurrentMesType('recyclebin')" size="large" long type="text">
                    <transition name="mes-current-type-btn">
                        <Icon v-show="currentMessageType === 'recyclebin'" type="checkmark"></Icon>
                    </transition>
                    <span class="mes-type-btn-text">回收站</span>
                    <Badge class="message-count-badge-outer" class-name="message-count-badge"
                           :count="recyclebinCount"></Badge>
                </Button>
            </div>
        </div>
        <div class="message-content-con">
            <transition name="view-message">
                <div v-if="showMesTitleList" class="message-title-list-con">
                    <Button type="primary" size="mini" style="margin: 10px 0" v-if="this.currentMessageType == 'unread'"
                            @click="handleSelectAll">全部标记已读
                    </Button>
                    <Button type="error" size="mini" style="margin: 10px 0" v-if="this.currentMessageType == 'hasread'"
                            @click="handleSelectAll">全部删除
                    </Button>
                    <Button type="error" size="mini" style="margin: 10px 0"
                            v-if="this.currentMessageType == 'recyclebin'" @click="handleSelectAll">全部彻底删除
                    </Button>

                    <Table ref="messageList" :columns="mesTitleColumns" :data="currentMesList"
                           :no-data-text="noDataText" @on-selection-change="selectedMessage"></Table>
                    <div style="text-align: center;padding-top:10px">
                        <Page :total="total" size="small" :page-size="pageSize" :current="page" show-sizer show-total
                              show-elevator
                              @on-change="CurrentChange" @on-page-size-change="SizeChange"></Page>
                    </div>
                </div>
            </transition>
            <transition name="back-message-list">
                <div v-if="!showMesTitleList" class="message-view-content-con">
                    <div class="message-content-top-bar">
                        <span class="mes-back-btn-con"><Button type="text" @click="backMesTitleList"><Icon
                                type="chevron-left"></Icon>&nbsp;&nbsp;返回</Button></span>
                        <h3 class="mes-title">{{ mes.title }}</h3>
                    </div>
                    <p class="mes-time-con">
                        <Icon type="android-time"></Icon>&nbsp;&nbsp;{{ mes.time }}
                    </p>
                    <div class="message-content-body">
                        <p class="message-content">{{ mes.content }}</p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'message_index',
        data() {
            const markAsreadBtn = (h, params) => {
                return h('Button', {
                    props: {
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            this.edit_message_status(1, params)
                        }
                    }
                }, '标为已读');
            };
            const deleteMesBtn = (h, params) => {
                return h('Button', {
                    props: {
                        size: 'small',
                        type: 'error'
                    },
                    on: {
                        click: () => {
                            this.edit_message_status(2, params)
                        }
                    }
                }, '删除');
            };
            const restoreBtn = (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.edit_message_status(1, params)
                            }
                        }
                    }, '还原'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.edit_message_status(params, 3)
                            }
                        }
                    }, '彻底删除')
                ]);
            };
            return {
                currentMesList: [],
                currentMessageType: 'unread',
                showMesTitleList: true,
                unreadCount: 0,
                hasreadCount: 0,
                recyclebinCount: 0,
                noDataText: '暂无未读消息',
                mes: {
                    title: '',
                    time: '',
                    content: ''
                },
                mesTitleColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: ' ',
                        key: 'title',
                        align: 'left',
                        ellipsis: true,
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.showMesTitleList = false;
                                        this.mes.title = params.row.title;
                                        this.mes.time = this.formatDate(params.row.time);
                                        this.getContent(params.row);
                                        if (this.currentMessageType == 'unread') {
                                            this.edit_message_status(1,params)
                                        }
                                    }
                                }
                            }, params.row.messageTitle);
                        }
                    },
                    {
                        title: ' ',
                        key: 'time',
                        align: 'center',
                        width: 180,
                        render: (h, params) => {
                            return h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'android-time',
                                        size: 12
                                    },
                                    style: {
                                        margin: '0 5px'
                                    }
                                }),
                                h('span', {
                                    props: {
                                        type: 'android-time',
                                        size: 12
                                    }
                                }, params.row.created)
                            ]);
                        }
                    },
                    {
                        title: ' ',
                        key: 'asread',
                        align: 'center',
                        minWidth: 100,
                        render: (h, params) => {
                            if (this.currentMessageType === 'unread') {
                                return h('div', [
                                    markAsreadBtn(h, params)
                                ]);
                            } else if (this.currentMessageType === 'hasread') {
                                return h('div', [
                                    deleteMesBtn(h, params)
                                ]);
                            } else {
                                return h('div', [
                                    restoreBtn(h, params)
                                ]);
                            }
                        }
                    }
                ],
                editData:[],
                page: 1,
                pageSize: 10,
                total: 0,
            };
        },
        methods: {
            formatDate(time) {
                let date = new Date(time);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let hour = date.getHours();
                let minute = date.getMinutes();
                let second = date.getSeconds();
                return year + '/' + month + '/' + day + '  ' + hour + ':' + minute + ':' + second;
            },
            backMesTitleList() {
                this.showMesTitleList = true;
            },
            setCurrentMesType(type) {
                if (this.currentMessageType !== type) {
                    this.page = 1;
                    this.showMesTitleList = true;
                }
                this.currentMessageType = type;
                let messageStatus = this.getMessageStatus();
                this.get_message_list(messageStatus);
            },
            getContent(row) {
                // you can write ajax request here to get message content
                this.mes.title = row.messageTitle;
                this.mes.time = row.created;
                this.mes.content = row.messageText;
            },
            getMessageStatus() {
                let messageStatus = 0;
                switch (this.currentMessageType) {
                    case 'unread':
                        messageStatus = 0;
                        break;
                    case 'hasread':
                        messageStatus = 1;
                        break;
                    case 'recyclebin':
                        messageStatus = 2;
                        break;
                    default:
                        break;
                }
                return messageStatus;
            },
            get_message_list(messageStatus) {
                this.request('get_message_list', {
                    data: {
                        length: this.pageSize,
                        start: (this.page - 1) * this.pageSize,
                        messageStatus: messageStatus,
                        userId: JSON.parse(window.sessionStorage.getItem('userinfo')).userId
                    }
                }, true).then(res => {
                    if (res.code == 1) {
                        switch (messageStatus) {
                            case 0:
                                this.noDataText = '暂无未读消息';
                                this.currentMesList = res.data.messageList;
                                this.unreadCount = res.data.counts;
                                this.total = res.data.countsUnread;
                                break;
                            case 1:
                                this.noDataText = '暂无已读消息';
                                this.currentMesList = res.data.messageList;
                                this.total = res.data.countsRead;
                                break;
                            case 2:
                                this.noDataText = '回收站无消息';
                                this.currentMesList = res.data.messageList;
                                this.total = res.data.countsDelete;
                                break;
                            default:
                                break;
                        }
                        this.recyclebinCount = res.data.countsDelete;
                        this.hasreadCount = res.data.countsRead;
                        this.unreadCount = res.data.countsUnread;
                    }
                })
            },
            edit_message_status(messageStatus, params) {
                let data = {};
                let beforeMessageStatus = this.getMessageStatus();
                let messageIds = [];
                if (typeof params === 'object' && !isNaN(params.length)) {
                    params.map(x=>{
                        messageIds.push(x.id);
                    })
                } else {
                    let row = params.row;
                    messageIds.push(row.id);
                }
                data = {
                    messageIds: messageIds,
                    messageStatus: messageStatus,
                    beforeMessageStatus:beforeMessageStatus,
                    userId: JSON.parse(window.sessionStorage.getItem('userinfo')).userId
                }
                this.request('edit_message_status', {
                    data: data
                }, true).then(res => {
                    if (res.code == 1) {
                        let messageStatus = this.getMessageStatus();
                        this.get_message_list(messageStatus);
                    }
                })
            },
            handleSelectAll() {
                let Message = '';
                let messageStatus = 0;
                console.log(this.editData)
                switch (this.currentMessageType) {
                    case 'unread':
                        if(this.editData.length == 0){
                            Message = '全部消息标识成已读，请确认！';
                        }else{
                            Message = '选中的消息标识成已读，请确认！';
                        }
                        messageStatus = 1;
                        break;
                    case 'hasread':
                        if(this.editData.length == 0){
                            Message = '全部消息删除至回收站，请确认！';
                        }else{
                            Message = '选中的消息删除至回收站，请确认！';
                        }
                        messageStatus = 2;
                        break;
                    case 'recyclebin':
                        if(this.editData.length == 0){
                            Message = '全部消息彻底删除，请确认！';
                        }else{
                            Message = '选中的消息彻底删除，请确认！';
                        }
                        messageStatus = 3;
                        break;
                    default:
                        break;
                }
                this.$Modal.confirm({
                    title: '提示',
                    content: `该操作将${Message}`,
                    onOk: () => {
                        this.edit_message_status(messageStatus,this.editData);
                        this.$nextTick(()=>{
                            this.editData = [];
                        })
                    },
                    onCancel: () => {
                        this.editData = [];
                        this.$refs['messageList'].selectAll(false);
                        this.$Message.warning('已取消操作！');
                    }
                })
            },
            selectedMessage(val){
                this.editData = val;
            },
            CurrentChange(val) {
                this.page = val;
                let messageStatus = this.getMessageStatus();
                this.get_message_list(messageStatus);
            },
            SizeChange(val) {
                this.pageSize = val;
                let messageStatus = this.getMessageStatus();
                this.get_message_list(messageStatus);
            },
        },
        mounted() {

        },
        activated() {
            let messageStatus = this.getMessageStatus();
            this.get_message_list(messageStatus);
        }
    };
</script>


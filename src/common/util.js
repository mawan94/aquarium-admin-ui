const util = {
    // 初始化下拉框默认值
    initSelectDefaultValues: (fieldName, optionList, formItemList) => {
        formItemList.map((item) => {
            if (item.fieldName === fieldName) {
                item.optionList = optionList
            }
        })
        return formItemList;
    },
    S4: () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    guid: () => {
        return (util.S4() + util.S4() + "-" + util.S4() + "-" + util.S4() + "-" + util.S4() + "-" + util.S4() + util.S4() + util.S4());
    },
    isNum: (nubmer) => {
        if (!nubmer) return false
        if (isNaN(nubmer) == 0) return true
        else return false
    }
}

export default util;

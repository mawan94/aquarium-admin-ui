const util = {
    // 初始化下拉框默认值
    initSelectDefaultValues: (fieldName, optionList, formItemList) => {
        formItemList.map((item) => {
            if (item.fieldName === fieldName) {
                item.optionList = optionList
            }
        })
        return formItemList;
    }
}
export default util;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = exports.paginated = void 0;
function paginated(limit, page, data) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {
        next: {},
        previous: {},
        data: {},
    };
    if (endIndex < data.length) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }
    results.data = data.find().limit(limit).skip(startIndex).exec();
    return results;
}
exports.paginated = paginated;
function order(dataList, sortBy, sortOrder) {
    const sortedData = [...dataList];
    sortedData.sort((a, b) => {
        let compareResult = 0;
        if (a[sortBy] < b[sortBy]) {
            compareResult = -1;
        }
        else if (a[sortBy] > b[sortBy]) {
            compareResult = 1;
        }
        if (sortOrder === 'desc') {
            compareResult *= -1;
        }
        return compareResult;
    });
    return sortedData;
}
exports.order = order;

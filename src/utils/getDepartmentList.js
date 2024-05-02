export const getDepartmentList = (function createSavedDepartments(
    savedDepartments = [],
) {
    return function () {
        return new Promise((res, rej) => {
            if (savedDepartments.length) {
                res(savedDepartments);
                return;
            }
            BX24.callMethod('department.get', {}, (result) => {
                if (result.error()) {
                    rej(result.error());
                } else {
                    savedDepartments = result.data();
                    res(savedDepartments);
                }
            });
        });
    };
})();

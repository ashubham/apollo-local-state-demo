export function toggleProperty(object, propVal, propKey) {
    let newObject;
    if (object[propKey]) {
        let { [propKey]: tmp, ..._newObject } = object;
        newObject = _newObject;
    } else {
        newObject = {
            [propKey]: propVal,
            ...object
        }
    }
    return newObject;
}
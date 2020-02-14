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

export function getBoardIdFromPath(path: string): string {
    let parts = path.split('/');
    if (parts[1] !== 'board') {
        return '';
    }

    return parts[2];
}

let rtf = new (Intl as any).RelativeTimeFormat('en');
export function prettyTimeAgo(diffMills: number): string {
    
    const diffMins = Math.round(diffMills / 1000 / 60);
    if (diffMins === 0) {
        return 'Just now';
    }
    if (diffMins < 60) {
        return rtf.format(-diffMins, 'minutes');
    }

    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) {
        return rtf.format(-diffHours, 'hours');
    }

    const diffDays = Math.round(diffHours / 24);
    return rtf.format(-diffDays, 'days');
}

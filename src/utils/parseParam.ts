
export function parseLocation (path: string | undefined, param: string) {
    if (!path) { return ''; }
    const ar = path.split('/');
    const subStr = ar.find(str => str.includes(param));
    if (!subStr) { return ''; }
    const value = subStr.split('=')[1];
    return value;
}

export function parseParam (param: string | undefined) {
    if (!param) { return ''; }
    return param.split('=')[1];
}

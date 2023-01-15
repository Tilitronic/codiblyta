export function parseParam (param: string | undefined) {
    if (!param) { return ''; }
    return param.split('=')[1];
}

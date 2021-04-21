export function parseQuery(qstr: string) {
    const query: Record<string, any> = {};
    const a = (qstr[0] === "?" ? qstr.substr(1) : qstr).split("&");
    for (let i = 0; i < a.length; i++) {
        const b = a[i].split("=");
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || "");
    }
    return query;
}

export function encodeQueryData(data: Record<string, any>) {
    const ret = [];
    for (const d in data)
        ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`);
    return ret.join("&");
}

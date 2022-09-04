// 将单个行政区号转为多个行政区号

export default function handleSingleCode(code) {
    let codeString = String(code);
    let addressCode = [];
    addressCode.push(codeString.slice(0, 2) + "0000");
    addressCode.push(codeString.slice(0, 4) + "00");
    addressCode.push(codeString);
    return addressCode
}
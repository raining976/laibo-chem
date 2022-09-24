// 处理地址 将区号转化成字符串
import { CodeToText } from "element-china-area-data";
export default function handleAddress(array) {
    array.forEach((item) => {
        if (item.sx) {
            let codeString = String(item.sx);
            let addressCode = [];
            var address = "";
            addressCode.push(codeString.slice(0, 2) + "0000");
            addressCode.push(codeString.slice(0, 4) + "00");
            addressCode.push(codeString);
            address = CodeToText[addressCode[0]] + CodeToText[addressCode[1]] + CodeToText[addressCode[2]] + item.dz
            item.address = address
        } else {
            item.address = item.dz
        }

    });
    return array;
}
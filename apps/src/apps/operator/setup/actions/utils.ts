
// https://gist.github.com/Glamdring/04eacabae3188dd5978241183b4d4bc5
export function buf2hex(buffer) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('');
}

export function hex2buf(hex) {
	var buffer = new ArrayBuffer(hex.length / 2);
	var array = new Uint8Array(buffer);
	var k = 0;
	for (var i = 0; i < hex.length; i +=2 ) {
		array[k] = parseInt(hex[i] + hex[i+1], 16);
		k++;
	}
	return buffer;
}

// https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
export function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export function e(p){
	p.catch(e => {throw e})
	return p
}
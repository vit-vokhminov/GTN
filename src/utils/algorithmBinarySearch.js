function algorithmBinarySearch(obj, element) {
	const list = Object.keys(obj);
	let start = 0;
	let end = list.length;
	while (start < end) {
		const middle = Math.floor((start + end) / 2);
		const value = list[middle];
		if (value.match(element)) {
			return [list[middle], obj[list[middle]]];
		}
		if (element < value) {
			end = middle;
		} else {
			start = middle + 1;
		}
	}
	return -1;
}
export default algorithmBinarySearch;

var fibonacci = function(n) {
	if(n > 10)
		throw new Error('n should <= 10');
	else if(n < 0)
		throw new Error('n should >= 0');
	else if(typeof n !== 'number')
		throw new Error('n should be a Number');
	else if(n === 0)
		return 0;
	else if(n === 1)
		return 1;
	else if(n > 1)
		return fibonacci(n-1) + fibonacci(n-2);
	else 
		throw new Error('uncatch Error');
};

exports.fibonacci = fibonacci;

if(require.main === module){
	var n = Number(process.argv[2]);
	console.log(typeof n);
	console.log('fibonacci (' + n + ') is', fibonacci(n));
}
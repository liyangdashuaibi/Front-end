var myFrame = {
	jsonp: function ( url, callback ) {

		let cbname = 'jsonp' + new Date().getTime() + Math.round( Math.random() * new Date().getTime() );

		window[cbname] = function (data) {
			callback(data);
			document.body.removeChild(script);
		}

		url += url.indexOf('?') === -1 ? '?' : '&';
		url += 'callback=' + cbname;

		let script = document.createElement('script');
		script.src = url;
		script.type = 'text/javascript';
		document.body.appendChild(script);
	}
};

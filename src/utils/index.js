export function setStatePromise(context) {
	return function (args, cb) {
		if (cb) return context.setState(args, cb);
		return new Promise(resolve => context.setState(args, resolve));
	}
}

function setTimeoutPromise(cb, timeout, ...args) {
	return new Promise(resolve =>
		setTimeout(async () => resolve(cb && await cb(...args)),
			timeout));
}

export async function animate(context, property, animations) {
	let setState = setStatePromise(context), classes = [];
	for (let {
		animation, duration, offset = 0,
		done = `${animation}-done`,
		along = {}, after = {}
	} of animations) {
		let index = classes.length;
		classes.push(animation);
		if (!offset) await setState({...along, [property]: classes});
		else await setTimeoutPromise(setState, offset, {...along, [property]: classes});
		if (done) classes[index] = done;
		else classes.splice(index, 1);
		await setTimeoutPromise(setState, duration, {...after, [property]: classes});
	}
}

export function joinClassNames(before, ...classNames) {
	return [].concat(before, classNames.reduce((acc, className) => acc.concat(className), [])
		.filter(className => Boolean(className))).join(' ');
}

export function preload(...images) {
	images.forEach(image => new Image().src = image);
}
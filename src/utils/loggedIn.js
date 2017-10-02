const loggedIn = () => {
	return (!(window.localStorage.getItem('TestakerToken') === null))
}

export default loggedIn;
const actions = {
	loadding({
		commit
	}, status) {
		commit('loadding', status)
	},
	tabbas({
		commit
	}, status) {
		commit('tabbas', status)
	}
}

export default actions
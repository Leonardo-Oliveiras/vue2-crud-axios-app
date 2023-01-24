<template>
	<div id="app" class="container">
		<h1>HTTP with Axios</h1>
		<b-alert show dismissible 
		v-for="message in messages" 
		:key="message.text" 
		:variant="message.type">
			{{ message.text }}
		</b-alert>
		<b-card>
			<b-form-group label="Name: ">
				<b-form-input 
					type="text" 
					size="lg"
					v-model="user.name"
					placeholder="Type your name">
				</b-form-input>
			</b-form-group>
			<b-form-group label="E-mail: ">
				<b-form-input 
					type="text" 
					size="lg"
					v-model="user.email"
					placeholder="Type your email">
				</b-form-input>
			</b-form-group>
			<hr>
			<b-button @click="saveUser" size="lg" variant="primary">Save User</b-button>
			<b-button @click="getUsers" size="lg" variant="success" class="ml-2">Get Users</b-button>
		</b-card>
		<hr>
		<b-list-group>
			<b-list-group-item v-for="(user, id) in users" :key="id">
				<strong>Name: </strong> {{ user.name }} <br>
				<strong>E-mail: </strong> {{ user.email }} <br>
				<strong>ID: </strong> {{ id }} <br>
				<b-button @click="loadUserData(id)" size="lg" variant="warning">Load</b-button>
				<b-button @click="deleteUserData(id)" size="lg" variant="danger" class="ml-2">Delete</b-button>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
export default {
	data() {
		return {
			messages: [],
			users: [],
			id: null,
			user: {
				name: '',
				email: ''
			}
		}
	},
	methods: {
		clearData() {
			this.user.name = ''
			this.user.email = ''
			this.id = null
			this.messages = []
		},
		loadUserData(id) {
			this.id = id
			this.user = { ...this.users[id] }
		},
		deleteUserData(id) {
			this.$http.delete(`/users/${id}.json`)
				.then(() => {
					this.clearData()
					this.messages.push({
						text: 'User: ' + `${this.users[id].name}` + ' was deleted',
						type: 'danger'
					})
					this.getUsers()
				})
		},
		saveUser() {
			const method = this.id ? 'patch' : 'post'
			const urlCompare = this.id ? `/${this.id}.json` : '.json'
			this.$http[method](`/users${urlCompare}`, this.user)
				.then(() => {
					this.clearData()
					this.messages.push({
						text: 'Data saved! :)',
						type: 'success'
					})
				})
		},
		getUsers() {
			this.$http('users.json').then(res => {
				this.users = res.data
			})
		}
	}
}

</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>

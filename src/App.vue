<template>
	<div id="app" class="container">
		<h1>HTTP with Axios</h1>
		<b-card>
			<b-form-group label="Name: ">
				<b-form-input type="text" size="lg"
					v-model="user.name"
					placeholder="Type your name">
				</b-form-input>
			</b-form-group>
			<b-form-group label="E-mail: ">
				<b-form-input type="text" size="lg"
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
				<strong>ID: </strong> {{ id }}
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
export default {
	data() {
		return {
			users: [],
			user: {
				name: '',
				email: ''
			}
		}
	},
	methods: {
		saveUser() {
			this.$http.post('users.json', this.user)
				.then(res => {
					res.user.name = ''
					res.user.email = ''
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

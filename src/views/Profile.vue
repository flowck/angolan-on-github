<template>
	<div class="view">
		<loading v-if="isRequesting"></loading>

		<div class="card">
			<div class="card-image">
				<figure>
					<a :href="user.html_url" target="blank">
						<img :src="user.avatar_url" :alt="user.login">
					</a>
				</figure>
			</div>

			<div class="card-content">
				<p class="title is-4">
					<a :href="user.html_url">
						{{ user.name }}
					</a>
				</p>
				<p class="subtitle is-6">
					<i class="fa fa-map-marker" aria-hidden="true"></i>
					{{ user.location }}
					&nbsp;
					<i class="fa fa-link" aria-hidden="true"></i>
					<a :href="user.blog"> {{ user.blog }} </a>
				</p>
				
				<!-- Bio -->
				<div class="content">
					{{ user.bio }}
				</div>
				
				<hr>

				<!-- Repositories -->
				<div class="content repositories">
					<h2 class="title"> Projects </h2>
					
					<!-- Single repository -->
					<a
						:href="repo.html_url"
						v-for="repo in repositories"
						:key="repo.id"
						target="blank"
					>
						<div class="card repository">
							<p class="title is-4">
								<a :href="repo.html_url" target="blank"> {{ repo.name }} </a>
							</p>
							
							<!-- Repository Metadata -->
							<span class="meta-data">
								<i class="fa fa-star" aria-hidden="true"></i>
								{{ repo.stargazers_count }}
							</span>
							&nbsp;
							<span>
								<i class="fa fa-code-fork" aria-hidden="true"></i>
								{{ repo.forks }}
							</span>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Profile',
		data() {
			return {
				user: '',
				repositories: '',
				isRequesting: true,
			};
		},
		created() {
			this.GetUserProfile();
			this.GetRepositories();
		},
		methods: {
			async GetUserProfile() {
				try {
					// Get username from url param
					const username = this.$route.params.username;
					// Get a single user
					const res = await this.axios.get(
						`https://api.github.com/users/${username}`,
					);
					this.user = res.data;
				} catch (e) {
					console.log(e);
				}
				this.isRequesting = false;
			},
			async GetRepositories() {
				// Get username from url param
				const username = this.$route.params.username;
				try {
					const res = await this.$http.get(
						`https://api.github.com/search/repositories?q=user:${username}`,
					);
					this.repositories = res.data.items;
				} catch (e) {
					console.log(e);
				}
			},
		},
	};
</script>

<style>
.card{
	width: 460px;
	margin: 0 auto;
}

.card .card-image img{
	width: 100%;
}

.repositories .repository{
	margin-bottom: 10px;
	padding: 10px;
}

.repositories .repository::before{
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 4px;
	background-color: #EEE;
	-webkit-transition: background-color .5s;
	-moz-transition: background-color .5s;
	-ms-transition: background-color .5s;
	transition: background-color .5s;
}

.repositories .repository:hover::before{
	background-color: #00d1b2;
}
</style>

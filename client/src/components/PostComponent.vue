<template>
	<div class="container">
		<h1>Latest Posts</h1>
		<div class="create-post">
			<label for="create-post">Say Something...</label>
			<input
				type="text"
				id="create-post"
				v-model="text"
				placeholder="Create a post"
			/>
			<button @click="createPost">Post!</button>
		</div>
		<hr />
		<p class="error" v-if="error">
			{{ error }}
		</p>
		<div class="post-container">
			<div
				class="post"
				v-for="(post, index) in posts"
				:key="post._id"
				:item="post"
				:index="index"
				@dblclick="deletePost(post._id)"
			>
				{{
					`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`
				}}
				<p class="text">{{ post.text }}</p>
			</div>
			<p>* If you want to delete a post just double click it!</p>
		</div>
	</div>
</template>

<script>
	import PostService from '../PostService.js';

	export default {
		name: 'PostComponent',
		data() {
			return {
				posts: [],
				error: '',
				text: '',
			};
		},
		async created() {
			try {

				this.posts = await PostService.getPosts();
			} catch (err) {
				this.error = err.massage;
			}
		},
		methods: {
			async createPost() {
				await PostService.insertPost(this.text);
				this.posts = await PostService.getPosts();
			},
			async deletePost(id) {
				await PostService.deletePost(id);
				this.posts = await PostService.getPosts();
			},
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	div.container {
		max-width: 800px;
		margin: 0 auto;
	}

	p.error {
		border: 1px solid #ff5b5f;
		background-color: #ffc5c1;
		padding: 10px;
		margin-bottom: 15px;
	}

	div.post {
		position: relative;
		border: 1px solid #5bd658;
		background-color: #bcffb8;
		padding: 10px 10px 30px 10px;
		margin-bottom: 15px;
	}

	div.created-at {
		position: absolute;
		top: 0;
		left: 0;
		padding: 5px 15 px 5px 15px;
		background-color: darkgreen;
		color: white;
		font-size: 13px;
	}

	p.text {
		font-size: 22px;
		font-weight: 700;
		margin-bottom: 0;
	}
</style>

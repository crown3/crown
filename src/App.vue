<template>
    <div id="app">
        <header>
            <div class="icon"></div>
            <input type="text" id="searchInput" autofocus="autofocus" placeholder="switch your tabs or use '>' to search your bookmark">
        </header>
        <div class="container">
            <section class="item">
                <img class="url-icon" src="./assets/crowns.svg"></img>
                <aside class="content">
                    <p class="title">网页标题</p>
                    <p class="url">https://wwww.crowncj.com</p>
                </aside>
            </section>
            <section class="item">
                <img class="url-icon" src="./assets/crowns.svg"></img>
                <aside class="content">
                    <p class="title">网页标题</p>
                    <p class="url">https://wwww.crowncj.com</p>
                </aside>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'Welcomes to Your Vue.js App'
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        //开发优化
        if (DEV) {
            document.getElementById('app').classList.add('center')
        }
    },
    methods: {

    },
    filters: {

    }
};
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.center {
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 1px solid #222;
}
body {
	background: #fff;
	font-size: 14px;
	padding: 6px 10px;
}
#app {
	width: 250px;
	min-height: 50px;
	color: #222;

	header {
		display: flex;
		align-items: center;
		padding: 10px 10px 5px 10px;
		border-bottom: 2px solid #393f4d;
	}
	.icon {
		display: inline-block;
		width: 25px;
		height: 25px;
		background-image: url('./assets/crown.svg');
		background-size: 100%;
		margin-right: 5px;
	}
	#searchInput {
		border: none;
		border-radius: 2px;
		box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
		outline: none;
		padding: 0.5em;
		width: 195px;
	}
	.item {
		display: flex;
		align-items: center;
		padding: 10px 10px 5px 10px;
	}
	.item + .item {
		border-top: 1px solid #d4d4dc;
	}
	.url-icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}
	.content {
		width: 200px;
		color: #222;
		.url {
			font-size: 12px;
		}
	}
}
</style>

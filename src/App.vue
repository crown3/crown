<template>
    <div id="app">
        <header>
            <div class="icon"></div>
            <input type="text" id="searchInput" v-model.trim="searchStr">
        </header>
        <div class="container">
            <a class="item" :href="item.url" target="_blank" v-for="(item, index) in searchArr" :key="index">
                <img class="url-icon" :src="'chrome://favicon/' + item.url"></img>
                <aside class="content">
                    <p class="title">{{item.title}}</p>
                    <p class="url">{{item.url}}</p>
                </aside>
            </a>
            <a class="item" v-for="(item, index) in allTabs" :key="index" @click="switchTab(item.id)">
                <img class="url-icon" :src="item.favIconUrl"></img>
                <aside class="content">
                    <p class="title">{{item.title}}</p>
                    <p class="url">{{item.url}}</p>
                </aside>
            </a>
        </div>
    </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
    data() {
        return {
            searchArr: [],
            searchStr: '',
            allTabs: []
        };
    },
    mounted() {
        //开发环境下的优化
        if (DEV) {
            document.getElementById('app').classList.add('center')
        }
        const _this = this;
        this.allTabs = this.getAllTabs();
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            _this.getAllTabs();
        })
    },
    watch: {
        searchStr: function () {
            this.searchBookmarks()
        }
    },
    methods: {
        searchBookmarks: debounce(function () {
            const _this = this;
            chrome.bookmarks.search(_this.searchStr, function (data) {
                _this.searchArr = data.slice(0, 9);
            })
        }, 300),
        getAllTabs: debounce(function () {
            const _this = this;
            chrome.tabs.query({
                windowId: chrome.windows.WINDOW_ID_CURRENT,
                windowType: "normal"
            }, function (data) {
                _this.allTabs = data;
            })
        }),
        switchTab(tabId) {
            chrome.tabs.update(tabId, { highlighted: true });
        }
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

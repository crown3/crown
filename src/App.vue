<template>
    <div class="app">
        <header>
            <div class="icon"></div>
            <div class="search-box">
                <div class="tag" @click.stop.prevent="changeSearchOptions">
                    {{searchOptions[searchOptionsIdx].txt}}
                </div>
                <input type="text" id="searchInput" autofocus="autofocus" :placeholder="searchOptions[searchOptionsIdx].title" v-model.trim="searchStr" @keydown.tab.stop.prevent="changeSearchOptions" @keydown.up.prevent="switchUp" @keydown.down.prevent="switchDown" @keydown.enter.prevent="selectItem">
            </div>
        </header>
        <div class="container">
            <a class="item" v-show="searchOptionsIdx === 0" :class="{active: index === checkedIdx}" :href="item.url" target="_blank" :title="item.title" v-for="(item, index) in searchBookmarksArr" :key="index">
                <img class="url-icon" :src="'chrome://favicon/' + item.url"></img>
                <aside class="content">
                    <p class="title oneText">{{item.title}}</p>
                    <p class="url oneText">{{item.url}}</p>
                </aside>
            </a>
            <a class="item" v-show="searchOptionsIdx === 1" :class="{active: index === checkedIdx}" :title="item.title" v-for="(item, index) in searchTabsArr" :key="index" @click="switchTab(item.id)">
                <img class="url-icon" :src="item.favIconUrl | isNullUrl"></img>
                <aside class="content">
                    <p class="title oneText">{{item.title}}</p>
                    <p class="url oneText">{{item.url}}</p>
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
            searchStr: '',
            searchBookmarksArr: [],
            searchTabsArr: [],
            searchOptions: [
                { title: 'Search Bookmarks', txt: 'B' },
                { title: 'Search Tabs', txt: 'T' }
            ],
            searchOptionsIdx: 0,
            checkedIdx: 0
        };
    },
    mounted() {
        const _this = this;
        this.searchTabsArr = this.searchTabs();
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            _this.searchTabs();
        })
    },
    watch: {
        searchStr: function () {
            switch (this.searchOptionsIdx) {
                case 0:
                    this.searchBookmarks()
                    break;
                case 1:
                    this.searchTabs()
                    break;
                default:
                    break;
            }
        }
    },
    computed: {
        searchResultsLen: function () {
            let len = 0;
            switch (this.searchOptionsIdx) {
                case 0:
                    len = this.searchBookmarksArr.length
                    break;
                case 1:
                    len = this.searchTabsArr.length
                    break;
                default:
                    break;
            }
            return len
        }
    },
    methods: {
        searchBookmarks: debounce(function () {
            const _this = this;
            chrome.bookmarks.search(_this.searchStr, function (data) {
                _this.searchBookmarksArr = data.filter(ele => {
                    return !ele.dateGroupModified
                });
            })
        }, 300),
        searchTabs: debounce(function () {
            const _this = this;
            chrome.tabs.query({
                windowId: chrome.windows.WINDOW_ID_CURRENT,
                windowType: "normal"
            }, function (data) {
                if (!_this.searchStr) {
                    _this.searchTabsArr = data;
                } else {
                    let reg = new RegExp("(" + _this.searchStr + ")", "g")
                    _this.searchTabsArr = data.filter(ele => {
                        return reg.test(ele.title) || reg.test(ele.url)
                    })
                }
            })
        }, 300),
        switchTab(tabId) {
            chrome.tabs.update(tabId, { highlighted: true, active: true });
        },
        changeSearchOptions: debounce(function () {
            if (this.searchOptionsIdx + 1 < this.searchOptions.length) {
                this.searchOptionsIdx++
            } else {
                this.searchOptionsIdx = 0
            }
            switch (this.searchOptionsIdx) {
                case 0:
                    this.searchBookmarks()
                    break;
                case 1:
                    this.searchTabs()
                    break;
                default:
                    break;
            }
            this.checkedIdx = 0;
        }, 100),
        switchUp() {
            if (this.checkedIdx > 0) {
                this.checkedIdx--;
                if (this.checkedIdx >= 8) {
                    this.changeScrollTop()
                }
            }
        },
        switchDown() {
            if (this.checkedIdx < this.searchResultsLen - 1) {
                this.checkedIdx++;
                if (this.checkedIdx > 8) {
                    this.changeScrollTop()
                }
            }
        },
        selectItem() {
            document.getElementsByClassName('item active')[0].click()
        },
        changeScrollTop() {
            const ele = document.getElementsByClassName('container')[0];
            ele.scrollTop = (this.checkedIdx - 8) * 54
        }
    },
    filters: {
        isNullUrl(url) {
            return (url && url.indexOf('chrome-extension') === -1) ? url : './assets/icon-no.png'
        }
    }
};
</script>

<style lang="scss">
@import './style.scss';
</style>

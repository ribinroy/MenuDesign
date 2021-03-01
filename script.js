window.addEventListener('load', () => {
    desktopDrop = {
        props: ['show', 'hoveredItem'],
        template:
            "<div :class=\"['drop_down_wrap ' + (show?'active':'')]\">\
                <div class='container' v-if='hoveredItem'>\
                    <div class='secondary_main_wrap_left'>\
                        <div class='secondary_column'  v-if='sortedItems && sortedItems.length>0' v-for='menuItems in sortedItems'>\
                            <div class='secondary_wrap' v-if='menuItems.length>0' v-for='menuItem in menuItems'>\
                                <a class='secondary_item' :href='menuItem.link'>{{menuItem.title}}</a>\
                                <div class='secondary_item_list_wrap' v-for='(menuListItem, index) in menuItem.list'>\
                                    <a class='secondary_list_item' v-if='index < 10' :href='menuListItem.link'>{{menuListItem.title}}</a>\
                                </div>\
                                <a class='button' v-if='menuItem.list.length>10' :href='menuItem.link'>Show everything ></a>\
                            </div>\
                        </div>\
                    </div>\
                    <div class='secondary_main_wrap_right'>\
                        <a class='image_wrap' :href='hoveredItem.image_link' v-if='hoveredItem && hoveredItem.image_link'>\
                            <img :src='hoveredItem.image'/>\
                            <p>{{hoveredItem.image_text}}</p>\
                        </a>\
                    </div>\
                </div>\
            </div>",
        computed: {
            menuItemsExist: function () {
                return (
                    !this.hoveredItem ||
                    !this.hoveredItem.list ||
                    this.hoveredItem.list.length <= 0
                );
            },
            sortedItems: function () {
                if (this.menuItemsExist) return [];

                const _this = this;
                let menuItemsObj = { 1: [], 2: [], 3: [], 4: [] };
                let currentIndex = 1;
                this.hoveredItem.list.forEach((element, index) => {
                    menuItemsObj[currentIndex].push(element);
                    currentIndex = currentIndex >= 4 ? 1 : ++currentIndex;
                });
                menuItemsArray = [];
                for (item in menuItemsObj) {
                    menuItemsArray.push(menuItemsObj[item]);
                }
                return menuItemsArray;
            },
        },
        updated: function () {
            // debugger;
        },
    };

    menuDesktop = {
        props: ['menuData'],
        data: function () {
            return {
                showDrop: true,
                hoveredMenuItem: null,
            };
        },
        template:
            '<div class="menu_bar" @mouseleave="showDrop=false;" >\
                        <div class="container menus_wrap">\
                            <div class="main_menu_wrap">\
                                <a :class="[\'main_menu_item \' + ((hoveredMenuItem && showDrop && hoveredMenuItem.id===menuItem.id)?\'active\':\'\')]" @mouseover="showDrop=true; hoveredMenuItem=menuItem" v-for="menuItem in menuData" :href="menuItem.link">{{menuItem.title}}</a>\
                            </div>\
                            <div class="sub_menu_wrap">\
                                <a href="#">Link</a>\
                                <a href="#">Link 1</a>\
                                <a href="#">Link 2</a>\
                                <a href="#">Link 3</a>\
                                <a href="#">Link 4</a>\
                            </div>\
                        </div>\
                        <desktop-drop :show="showDrop" :hoveredItem="hoveredMenuItem"/>\
                    </div>',
        components: {
            'desktop-drop': desktopDrop,
        },
    };

    menuMobile = {
        props: ['menuData'],
        data: function () {
            return {
                selectedLev1: null,
                selectedLev2: null,
            };
        },
        template:
            '<div>\
                <div class="menu-overlay"></div>\
                <div class="menu_panel">\
                    <div class="menu_panel_header">Menu</div>\
                    <div class="menu_panel_items_wrap">\
                        <div class="menu_panel_item back_button" @click="backClickHandler()" v-if="selectedLev2 || selectedLev1">Back</div>\
                        <a class="menu_panel_item everything" v-if="highestSelectedLayerItem" :href="highestSelectedLayerItem.link">Allt inom {{highestSelectedLayerItem.title}}</a>\
                        <a class="menu_panel_item" v-for="menuItem in lists" @click="clickHandler($event, menuItem)" :href="menuItem.link">{{menuItem.title}}</a>\
                    </div>\
                </div>\
            </div>',
        methods: {
            backClickHandler: function () {
                if (this.selectedLev2) this.selectedLev2 = null;
                else if (this.selectedLev1) this.selectedLev1 = null;
            },
            clickHandler: function (e, item) {
                if (!this.selectedLev1 || !this.selectedLev2)
                    e.preventDefault();
                if (!this.selectedLev1) this.selectedLev1 = item;
                else if (!this.selectedLev2) this.selectedLev2 = item;
            },
        },
        computed: {
            highestSelectedLayerItem: function () {
                return this.selectedLev2
                    ? this.selectedLev2
                    : this.selectedLev1
                    ? this.selectedLev1
                    : null;
            },
            lists: function () {
                const _this = this;
                if (this.selectedLev2) {
                    return this.selectedLev2.list &&
                        this.selectedLev2.list.length > 0
                        ? this.selectedLev2.list
                        : [];
                }
                if (this.selectedLev1) {
                    const matches = this.menuData.filter(
                        (el) => el.id === _this.selectedLev1.id
                    );
                    return matches.length > 0 &&
                        matches[0] &&
                        matches[0].list.length > 0
                        ? matches[0].list
                        : [];
                }
                return this.menuData;
            },
        },
        components: {
            'desktop-drop': desktopDrop,
        },
    };

    menu = {
        data: function () {
            return {
                isDesktopView: true,
                menuData: [],
            };
        },
        template:
            '<div><menu-desktop v-if="isDesktopView" :menuData="menuData"></menu-desktop>\
            <menu-panel v-if="!isDesktopView" :menuData="menuData"></menu-panel></div>',
        components: {
            'menu-desktop': menuDesktop,
            'menu-panel': menuMobile,
        },
        methods: {
            verifyViewport: function () {
                this.isDesktopView = window.innerWidth >= 1250;
            },
        },
        mounted: function () {
            const _this = this;
            fetch('/menuData.json')
                .then((r) => r.json())
                .then(
                    (json) => {
                        this.menuData = json;
                    },
                    (response) => {
                        console.log('Error loading json:', response);
                    }
                );
            this.verifyViewport();
            window.addEventListener('resize', function () {
                _this.verifyViewport();
            });
        },
    };

    window.menuVue = new Vue({
        el: '#root',
        data: {},
        components: {
            'menu-component': menu,
        },
    });
});

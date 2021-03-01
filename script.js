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
                        <div class='image_wrap' v-if='hoveredItem && hoveredItem.image_link'>\
                            <img :src='hoveredItem.image_link'/>\
                            <p>{{hoveredItem.image_text}}</p>\
                        </div>\
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
        data: function () {
            return {
                menuData: [],
                showDrop: true,
                hoveredMenuItem: null,
            };
        },
        template:
            '<div class="menu_bar" @mouseleave="showDrop=false;" >\
                        <div class="main_menu_wrap container">\
                            <a :class="[\'main_menu_item \' + ((hoveredMenuItem && showDrop && hoveredMenuItem.id===menuItem.id)?\'active\':\'\')]" @mouseover="showDrop=true; hoveredMenuItem=menuItem" v-for="menuItem in menuData" :href="menuItem.link">{{menuItem.title}}</a>\
                        </div>\
                        <desktop-drop :show="showDrop" :hoveredItem="hoveredMenuItem"/>\
                    </div>',
        components: {
            'desktop-drop': desktopDrop,
        },
        mounted: function () {
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
        },
    };

    menu = {
        data: function () {
            return {
                isDesktopView: true,
            };
        },
        template: '<menu-desktop v-if="isDesktopView"></menu-desktop>',
        components: {
            'menu-desktop': menuDesktop,
        },
        methods: {
            verifyViewport: function () {
                this.isDesktopView = window.innerWidth >= 1250;
            },
        },
        mounted: function () {
            const _this = this;
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

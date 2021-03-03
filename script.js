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
                                <a class='button' v-if='menuItem.list.length>10' :href='menuItem.link'>Visa alla \
                                <svg class='arrow_svg' viewBox='0 0 12 22' xmlns='http://www.w3.org/2000/svg' role='img' aria-labelledby='SVGInline-1330-title'><title id='SVGInline-1330-title'>Visa Allt</title><path d='M12 11.005a.997.997 0 0 0-.293-.707L1.707.293A.999.999 0 1 0 .293 1.707l9.293 9.298-9.282 9.288a.999.999 0 1 0 1.414 1.414l9.99-9.995a.997.997 0 0 0 .292-.707' fill-rule='evenodd'></path></svg></a>\
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
                            <a href="#">Kampanjer</a>\
                            <a href="#">Alla erbjudanden</a>\
                            <a href="#">Nyheter</a>\
                            <a href="#">Outlet</a>\
                            <a href="#">Instashop</a>\
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
                <div :class="[\'menu-overlay\' + ($root.isMobMenuOpen?\' active\':\'\')]"></div>\
                <div :class="[\'menu_panel\' + ($root.isMobMenuOpen?\' active\':\'\')]">\
                    <div class="menu_panel_header">\
                        Meny\
                        <div class="icon_wrap"> <div class="icon_item"> <svg viewBox="0 0 31 27" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="SVGInline-1256-title" > <path d="M3.598 13.794l1.706 1.71 9.797 9.832a.56.56 0 0 0 .791 0l11.504-11.543A7.172 7.172 0 0 0 29.5 8.707a7.177 7.177 0 0 0-2.105-5.093 7.166 7.166 0 0 0-10.162 0l-1.736 1.743L15.143 5l-1.375-1.385A7.15 7.15 0 0 0 8.683 1.5a7.15 7.15 0 0 0-5.084 2.114 7.22 7.22 0 0 0 0 10.18zM16.525 2.909c3.198-3.21 8.387-3.21 11.579 0A8.177 8.177 0 0 1 30.5 8.707a8.171 8.171 0 0 1-2.396 5.793L16.6 26.042a1.56 1.56 0 0 1-2.206 0l-9.799-9.831-1.705-1.712a8.221 8.221 0 0 1 0-11.59A8.15 8.15 0 0 1 8.683.5c2.174 0 4.246.857 5.794 2.41l1.021 1.029 1.027-1.03z" fill-rule="nonzero" ></path> </svg> <div class="count">0</div> <div class="text_align_center">Favoriter</div> </div> <div class="icon_item"> <svg viewBox="0 0 28 29" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="SVGInline-1345-title" > <g fill-rule="evenodd"> <path d="M16.684 12.218h-4.97a.5.5 0 0 0 0 1h4.97a.5.5 0 0 0 0-1" ></path> <path d="M24.584 27.598c-.032.226-.173.402-.321.402H4.106c-.143 0-.283-.17-.32-.387L1.01 10.607a.642.642 0 0 1 .122-.506c.042-.048.109-.107.197-.107H26.67c.086 0 .153.057.194.104a.633.633 0 0 1 .127.495l-2.408 17.005zM8.7 6.298A5.304 5.304 0 0 1 13.999 1a5.304 5.304 0 0 1 5.298 5.298v2.696H8.7V6.298zM27.62 9.443a1.25 1.25 0 0 0-.95-.45h-6.373V6.299A6.305 6.305 0 0 0 13.999 0 6.305 6.305 0 0 0 7.7 6.298v2.696H1.328a1.25 1.25 0 0 0-.96.46c-.295.348-.424.84-.346 1.315L2.8 27.775c.116.71.666 1.225 1.305 1.225h20.157c.656 0 1.207-.53 1.31-1.261l2.409-17.005a1.635 1.635 0 0 0-.362-1.291z" ></path> </g> </svg> <div class="count green">0</div> <div class="text_align_center">Varukorg</div> </div> </div>\
                        <svg class="close_button" @click="$root.isMobMenuOpen = false" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="SVGInline-1864-title"><title id="SVGInline-1864-title">Meny</title><path d="M8.95 8.156L16.492.614a.561.561 0 1 1 .794.794L9.744 8.95l7.542 7.542a.561.561 0 1 1-.794.794L8.95 9.744l-7.542 7.542a.561.561 0 1 1-.794-.794L8.156 8.95.614 1.408a.561.561 0 1 1 .794-.794L8.95 8.156z"></path></svg>\
                    </div>\
                    <div class="menu_panel_items_wrap">\
                        <div class="menu_panel_item back_button" @click="backClickHandler()" v-if="selectedLev2 || selectedLev1">Tillbaka\
                            <svg class="arrow_svg" viewBox="0 0 12 22" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="SVGInline-1330-title"><title id="SVGInline-1330-title">Visa Allt</title><path d="M12 11.005a.997.997 0 0 0-.293-.707L1.707.293A.999.999 0 1 0 .293 1.707l9.293 9.298-9.282 9.288a.999.999 0 1 0 1.414 1.414l9.99-9.995a.997.997 0 0 0 .292-.707" fill-rule="evenodd"></path></svg></a>\
                        </div>\
                        <a class="menu_panel_item everything" v-if="highestSelectedLayerItem" :href="highestSelectedLayerItem.link">Allt inom {{highestSelectedLayerItem.title}}</a>\
                        <a class="menu_panel_item" v-for="menuItem in lists" @click="clickHandler($event, menuItem)" :href="menuItem.link">\
                            {{menuItem.title}}\
                            <svg class="arrow_svg" viewBox="0 0 12 22" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="SVGInline-1330-title"><title id="SVGInline-1330-title">Visa Allt</title><path d="M12 11.005a.997.997 0 0 0-.293-.707L1.707.293A.999.999 0 1 0 .293 1.707l9.293 9.298-9.282 9.288a.999.999 0 1 0 1.414 1.414l9.99-9.995a.997.997 0 0 0 .292-.707" fill-rule="evenodd"></path></svg></a>\
                        </a>\
                        <a class="image_wrap_mobile" :href="highestSelectedLayerItem.image_link"  v-if="highestSelectedLayerItem && highestSelectedLayerItem.image && highestSelectedLayerItem.image_text">\
                            <img :src="highestSelectedLayerItem.image"/>\
                        </a>\
                        <p v-if="highestSelectedLayerItem && highestSelectedLayerItem.image && highestSelectedLayerItem.image_text" class="text_below_image">{{highestSelectedLayerItem.image_text}}</p>\
                        <div class="sub_menu_mobile_wrap" v-if="!highestSelectedLayerItem">\
                            <a class="menu_panel_item" href="#">Kampanjer</a>\
                            <a class="menu_panel_item" href="#">Alla erbjudanden</a>\
                            <a class="menu_panel_item" href="#">Nyheter</a>\
                            <a class="menu_panel_item" href="#">Outlet</a>\
                            <a class="menu_panel_item" href="#">Instashop</a>\
                        </div>\
                        <div class="panel_footer" v-if="!highestSelectedLayerItem">\
                            <p>Följ oss</p>\
                            <div class="social_icons">\
                                <div class="social_item">\
                                    <svg viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="SVGInline-557-title"><title id="SVGInline-557-title">Facebook</title><path d="M8 .28v2.417H6.546c-.53 0-.889.11-1.074.33s-.278.55-.278.989v1.73h2.713l-.36 2.711H5.193v6.95H2.361v-6.95H0v-2.71h2.361V3.75c0-1.135.321-2.016.963-2.642C3.966.483 4.821.17 5.89.17 6.796.17 7.5.206 8 .28z"></path></svg>\
                                </div>\
                                <div class="social_item">\
                                    <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="SVGInline-558-title"><title id="SVGInline-558-title">Instagram</title><g fill-rule="nonzero"><path d="M7.5 10.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M4 .5h7A3.5 3.5 0 0 1 14.5 4v7a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 11V4A3.5 3.5 0 0 1 4 .5zm0 1A2.5 2.5 0 0 0 1.5 4v7A2.5 2.5 0 0 0 4 13.5h7a2.5 2.5 0 0 0 2.5-2.5V4A2.5 2.5 0 0 0 11 1.5H4z"></path></g></svg>\
                                </div>\
                                <div class="social_item">\
                                    <svg viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="SVGInline-559-title"><title id="SVGInline-559-title">Pinterest</title><path d="M5.722 0C2.844 0 0 1.919 0 5.024 0 6.998 1.11 8.12 1.784 8.12c.278 0 .438-.774.438-.992 0-.261-.665-.817-.665-1.902 0-2.255 1.716-3.854 3.938-3.854 1.91 0 3.324 1.085 3.324 3.08 0 1.489-.598 4.283-2.533 4.283-.698 0-1.296-.505-1.296-1.229 0-1.06.74-2.087.74-3.18 0-1.858-2.633-1.521-2.633.723 0 .471.059.993.269 1.422-.387 1.666-1.178 4.149-1.178 5.865 0 .53.076 1.052.126 1.582.096.107.048.096.194.043C3.92 12.025 3.87 11.646 4.51 9.113c.345.657 1.237 1.01 1.944 1.01 2.98 0 4.317-2.903 4.317-5.52C10.771 1.818 8.365 0 5.722 0z"></path></svg>\
                                </div>\
                            </div>\
                        </div>\
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
        props: [],
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
                this.isDesktopView = window.innerWidth > 1280;
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
        updated: function () {
            // debugger;
        },
    };

    window.menuVue = new Vue({
        el: '#root',
        data: {
            isMobMenuOpen: false,
        },
        components: {
            'menu-component': menu,
        },
        methods: {
            onHamburgerClick: function () {
                this.isMobMenuOpen = !this.isMobMenuOpen;
            },
        },
    });
});

window.addEventListener('load', () => {
    desktopDrop = {
        props: ['show'],
        template:
            "<div :class=\"['drop_down_wrap ' + (show?'active':'')]\">\
                <div class='container'>WIP\
                </div>\
            </div>",
    };

    menuDesktop = {
        data: function () {
            return {
                menuData: [],
                showDrop: true,
            };
        },
        template:
            '<div class="menu_bar" @mouseleave="showDrop=false" >\
                        <div class="main_menu_wrap container">\
                            <a class="main_menu_item" @mouseover="showDrop=true"v-for="menuItem in menuData" :href="menuItem.link">{{menuItem.title}}</a>\
                        </div>\
                        <desktop-drop :show="showDrop"/>\
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

    window.menuVue = new Vue({
        el: '#root',
        data: {},
        components: {
            'menu-desktop': menuDesktop,
        },
    });
});

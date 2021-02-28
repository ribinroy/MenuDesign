window.addEventListener('load', () => {
    window.menuVue = new Vue({
        el: '#menu_bar',
        data: {
            menuData: [],
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
    });
});

// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    plugins: {
        "postcss-easy-import": {
            "extensions": ['pcss', 'css']
        },
        'postcss-theme-variables': {
            vars: {
                red: '#F60',
                gray: '#CCC',
                blue: '#108EE9',
                orange: '#FF9500',
                'button-primary-background-color': '#108EE9',
                'button-primary-border-color': '#108EE9',
            },
            prefix: '$'
        },
        'precss': {},
        "postcss-calc": {},
        'postcss-import': {},
        'postcss-url': {},
        // to edit target browsers: use "browserslist" field in package.json
        'autoprefixer': {},
    }
};
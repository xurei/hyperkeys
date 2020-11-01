module.exports = {
    "extends": "xurei/react",
    "parser": "babel-eslint",

    "plugins": [
        "promise",
        "jsx",
        "react",
        "react-hooks",
        "security",
        "xurei"
    ],
    
    "settings": {
        "react": {
            "version": "detect",
        }
    },

    "env": {
        "es6": true
    },

    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        }
    },
    "rules": {
        "no-alert": "warn",
        "no-eval": "error",
        "no-const-assign": "error",
        "semi": "warn",
        "prefer-const": "error",
        "no-unused-vars": ["warn", { "args": "none" }],
        "strict": "error",
        "eqeqeq": "error",
        "curly": "error",

        "complexity": ["error", 15],

        //Code style rules
        "quotes": ["error", "single", { "allowTemplateLiterals": true }],
        "indent": ["warn", 4, { "SwitchCase": 1, "MemberExpression": 0 }],
        "prefer-template": "error",
        "jsx-quotes": ["warn", "prefer-double"],
        "key-spacing": ["warn", { "beforeColon": false, "afterColon": true }],
        "max-len": 0, //["warn", 160],
        "space-before-function-paren": ["warn", "never"],

        //Development remains rules
        "no-warning-comments": ["error", { "terms": ["debug"] } ],

        "promise/always-return": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        "promise/catch-or-return": "error",
        "promise/no-native": "off",
        "promise/no-nesting": "warn",
        "promise/no-promise-in-callback": "warn",
        "promise/no-callback-in-promise": "warn",

        "react/jsx-uses-vars": "error",
        "react/jsx-no-bind": "error",
        "react/prefer-es6-class": ["warn", "always"],
    
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",

        "no-class-assign": 0,
        
        "xurei/no-relative-parent-imports": ["warn"]
    }
};

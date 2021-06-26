//Array associativo tra il nome dei linguaggi di programmazione e le relative immagini
const languageImages = {
    "C#": "https://img.shields.io/badge/%20-%23{background}.svg?&logo=c%20sharp&logoColor=239120&style=flat-square",
    Python: "https://img.shields.io/badge/%20-%23{background}.svg?&logo=python&logoColor=3776AB&style=flat-square",
    CSS: "https://img.shields.io/badge/%20-%23{background}.svg?&logo=css3&logoColor=1572B6&style=flat-square",
    "Objective-C": "https://img.shields.io/badge/%20-%23{background}.svg?&logo=apple&logoColor=000&style=flat-square",
    HTML: "https://img.shields.io/badge/%20-%23{background}.svg?&logo=html5&logoColor=E34F26&style=flat-square",
    JavaScript: "https://img.shields.io/badge/%20-%23{background}.svg?&logo=javascript&logoColor=F7DF1E&style=flat-square",
    Java: "https://img.shields.io/badge/%20-%23{background}.svg?&logo=java&logoColor=007396&style=flat-square",
    Ruby: "https://img.shields.io/badge/%20-%23{background}.svg?&logo=ruby&logoColor=CC342D&style=flat-square",
    C: "https://img.shields.io/badge/%20-%23{background}.svg?&logo=c&logoColor=A8B9CC&style=flat-square",
    "C++": "https://img.shields.io/badge/%20-%23{background}.svg?logo=c%2B%2B&logoColor=A8B9CC&style=flat-square"
}



const checkFormDictionary = {
    username: {
        regEx: /^[a-zA-Z0-9_]{6,}$/,
        error: "Minimum 6 characters. Only letters, numbers and underscores are allowed",
        check: "api.check.profile"
    },
    email: {
        regEx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        error: "Enter a valid email",
        check: "api.check.profile"
    },
    password: {
        regEx: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        error: "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    },
    confirmPassword: {
        error: "Passwords don't match "
    },
    nameProject: {
        regEx: /^[a-zA-Z0-9_-]{0,23}$/,
        error: "Maximum 23 characters, no whitespaces",
        check: "api.check.project",
    }
}

//Array associativo per mostrare un div di notifica con relativo titolo, sottotitolo e classe
const notifyData = {
    filter: {
        title: 'There are no boards with this name',
        subtitle: '...except if you just made one yourself',
        class: "search"
    },
    noSearch: {
        title: 'There are no project with this name',
        subtitle: "...except if you're making one yourself",
        class: "search"
    },
    error: {
        title: 'Oh no! An error has occurred!',
        subtitle: 'Try again, you will be luckier',
        class: "error"
    },
    email: {
        title: 'I have updated {number} boards',
        subtitle: 'I am flying...',
        class: "hero"
    },
    update: {
        title: 'I am going to update...',
        subtitle: 'I am flying...',
        class: "hero"
    },
    emailSended: {
        title: 'I have updated {number} boards',
        subtitle: 'I was very fast!',
        class: "hero1"
    },
    empty: {
        title: 'Seen? There is nothing!',
        subtitle: 'Come on then! I have nothing more to show you',
        class: "error"
    }
}
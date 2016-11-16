'use strict';

function getLists(name) {
    document.getElementById("user-posts-list").innerHTML = "";
    var a = firebase.database().ref('Posts').on('value', function (snapshot) {
        var b = snapshot.val()
        for (var i in b) {
            if (b[i].Category.Name == name) {
                var elem = document.createElement("h2");
                var txt = document.createTextNode(b[i].Title);
                elem.appendChild(txt);
                elem.className = "category-ep-title"
                document.getElementById("user-posts-list").appendChild(elem);

                elem = document.createElement("div");
                txt = document.createTextNode(b[i].Body);
                elem.appendChild(txt);
                elem.className = "posts-container-short";
                elem.id = 'post' + i;
                document.getElementById("user-posts-list").appendChild(elem);
                var ind = elem.id

                var btn = document.createElement("a");
                var txt = document.createTextNode('continue');
                btn.appendChild(txt);
                btn.setAttribute('onclick', "javascript:addorremove(this, " + elem.id + ")");
                btn.className = "readmore";
                document.getElementById("user-posts-list").appendChild(btn);
            }
        }
    });
};

function startDatabaseQueries() {
    // [START getting menu items]
    var topUserPostsRef = firebase.database().ref('Category')
    topUserPostsRef.on('value', function (snapshot) {
        var ar = snapshot.val()
        for (var i in ar) {
            var elem = document.createElement("a");
            var txt = document.createTextNode(ar[i].Name);
            elem.appendChild(txt);
            elem.className = "menuitem catId_" + i;
            elem.onclick = function () {
                var key = this.className.replace(/^.*catId_([\w\d]+).*$/i, "$1");
                getLists(ar[key].Name)
            };
            document.getElementById("lst").appendChild(elem);
        }
    });
    // [STOP getting menu items]
    // [START all_posts_query]
    var topUserPostsRef = firebase.database().ref('Posts')
    topUserPostsRef.on('value', function (snapshot) {
        var ar = snapshot.val()
        for (var i in ar) {
            var elem = document.createElement("h2");
            var txt = document.createTextNode(ar[i].Title);
            elem.appendChild(txt);
            elem.className = "category-ep-title"
            document.getElementById("user-posts-list").appendChild(elem);

            elem = document.createElement("div");
            txt = document.createTextNode(ar[i].Body);
            elem.appendChild(txt);
            elem.className = "posts-container-short";
            elem.id = 'post' + i;
            document.getElementById("user-posts-list").appendChild(elem);
            var ind = elem.id

            var btn = document.createElement("a");
            var txt = document.createTextNode('continue');
            btn.appendChild(txt);
            btn.setAttribute('onclick', "javascript:addorremove(this, " + elem.id + ")");
            btn.className = "readmore";
            document.getElementById("user-posts-list").appendChild(btn);
        }
    });
    // [STOP all_posts_query]
};
startDatabaseQueries();

function addorremove(ind, num) {
    if ((/.*(posts-container-short).*/gi).test(num.className)) {
        num.className = num.className.replace(/(?:^|\s)posts-container-short(?!\S)/g, "posts-container-long")
        ind.innerHTML = 'Collapse'
    } else {
        num.className = num.className.replace(/(?:^|\s)posts-container-long(?!\S)/g, "posts-container-short")
        ind.innerHTML = 'Continue'
    }
}
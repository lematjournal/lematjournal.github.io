"use strict";angular.module("lematClient",["ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","ngAside","duScroll","ngWig","angular.filter","wysiwyg.module","angularUtils.directives.dirPagination"]).value("duScrollDuration",2e3).value("duScrollOffset",30).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"EntryController"}).when("/entry-admin",{templateUrl:"views/forms/entry-admin.html",controller:"EntryController"}).when("/entry-create",{templateUrl:"views/forms/entry-create.html",controller:"EntryController"}).when("/entry/:id/edit",{templateUrl:"views/forms/entry-edit.html",controller:"EntryController"}).when("/entry/:id",{templateUrl:"views/entry-view.html",controller:"EntryController"}).when("/issue-admin",{templateUrl:"views/forms/issue-admin.html",controller:"IssueController"}).when("/issues/",{templateUrl:"views/issue-list.html",controller:"IssueController"}).when("/issue/:id",{templateUrl:"views/issue.html",controller:"IssueController"}).when("/issue/:id/edit",{templateUrl:"views/forms/issue-edit.html",controller:"IssueController"}).when("/issue/:id/:piece/edit",{templateUrl:"views/forms/piece-edit.html",controller:"IssueController"}).when("/piece-create",{templateUrl:"views/forms/piece-create.html",controller:"IssueController"}).when("/issue/:id/:piece",{templateUrl:"views/forms/piece-preview.html",controller:"IssueController"}).when("/online",{templateUrl:"views/online.html",controller:"PostController"}).when("/online-admin",{templateUrl:"views/forms/online-admin.html",controller:"PostController"}).when("/create-post",{templateUrl:"views/forms/post-create.html",controller:"PostController"}).when("/:post/edit",{templateUrl:"views/forms/post-edit.html",controller:"PostController"}).when("/online/:post",{templateUrl:"views/post-view.html",controller:"PostController"}).when("/submissions",{templateUrl:"views/submissions.html"}).when("/editors",{templateUrl:"views/editors.html"}).when("/about",{templateUrl:"views/about.html"}).when("/login",{templateUrl:"views/login.html",controller:"AdminController"}).otherwise({redirectTo:"/"})}]),angular.module("lematClient").constant("ServerUrl","https://lematjournal.herokuapp.com"),angular.module("lematClient").controller("AdminController",["$scope","$location","$route","AuthFactory",function(a,b,c,d){a.credentials={},a.postCredentials=function(a){console.log("clicked"),d.login(a).then(function(a){console.log("user id: ",a.data.id),b.path("/"),c.reload()})}}]),angular.module("lematClient").controller("MainController",["$scope","$rootScope","$document","$location","$route","$routeParams","AuthFactory",function(a,b,c,d,e,f,g){console.log(d.url()),a.$on("scroll",function(b,c){a.title=c}),a.$watch(function(){return"/issue-admin"===d.url()},function(a){1!=a||g.isAuthenticated()||d.path("/")}),a.$watch(function(){return"/piece-create"===d.url()},function(a){1!=a||g.isAuthenticated()||d.path("/")}),a.$watch(function(){return"/issue/:id/edit"===d.url()},function(a){1!=a||g.isAuthenticated()||d.path("/")}),a.$watch(function(){return"/issue/:id/:piece/edit"===d.url()},function(a){1!=a||g.isAuthenticated()||d.path("/")}),a.$watch(function(){return":post/edit"===d.url()},function(a){1!=a||g.isAuthenticated()||d.path("/")}),a.$watch(function(){return"/create-post"===d.url()},function(a){1!=a||g.isAuthenticated()||d.path("/")}),a.$watch(function(){return"/online-admin"===d.url()},function(a){1!=a||g.isAuthenticated()||d.path("/")}),a.$watch(function(){return"/entry-admin"===d.url()},function(a){1!=a||g.isAuthenticated()||d.path("/")}),a.$watch(function(){return"/entry-create"===d.url()},function(a){1!=a||g.isAuthenticated()||d.path("/")}),a.$watch(function(){return"/entry-create"===d.url()},function(a){1!=a||g.isAuthenticated()||d.path("/")}),a.scrollShow=function(){return"/issue/1"==d.url()}}]),angular.module("lematClient").controller("IssueController",["$scope","$rootScope","$route","$routeParams","$location","$document","$http","AuthFactory","IssueFactory","ServerUrl",function(a,b,c,d,e,f,g,h,i,j){a.piece={},a.issue={},a.getIssues=function(){i.getIssues(),a.issues=i.issues},a.getIssue=function(){i.getIssue(d.id),a.issue=i.issue},a.getPieces=function(){i.getIssue(d.id),a.pieces=i.pieces},a.getPiece=function(){i.getIssuePiece(d.id,d.piece),a.piece=i.piece},a.upsertIssue=function(a){h.isAuthenticated()&&i.upsertIssue(a)},a.deleteIssue=function(a,b){h.isAuthenticated()&&i.deletePost(a,b)},a.upsertPiece=function(b){h.isAuthenticated()&&("/piece-create"===e.url()?(i.upsertIssuePiece(b,b.issue_id).then(function(a){console.log(a)}),a.getIssues()):(i.upsertIssuePiece(b,d.id),a.getIssue(d.id),a.getIssues()))},a.deletePiece=function(){h.isAuthenticated()&&(console.log(a.piece),i.deleteIssuePiece(a.piece),e.path("issue/"+d.id),a.getIssue(d.id))},a.updatePieces=function(){angular.forEach(a.issue.pieces,function(b){console.log("piece "+b.title+" "+b.order),a.upsertPiece(b)})},a.title="",a.author={},a.scrollToTop=function(){f.scrollTopAnimated(0)}}]),angular.module("lematClient").controller("PostController",["$scope","$location","$route","$routeParams","AuthFactory","PostFactory",function(a,b,c,d,e,f){a.url=b.absUrl(),a.getPost=function(){f.getPost(d.post),a.post=f.post,console.log(a.post)},a.getPosts=function(){f.getPosts(),a.posts=f.posts,console.log("posts",f.posts)},a.resetPost=function(){angular.copy({},a.post)},a.upsertPost=function(a){e.isAuthenticated()&&f.upsertPost(a)},a.deletePost=function(a,b){e.isAuthenticated()&&f.deletePost(a,b)}}]),angular.module("lematClient").controller("EntryController",["$scope","$rootScope","$route","$routeParams","$location","$document","AuthFactory","EntryFactory","ServerUrl",function(a,b,c,d,e,f,g,h,i){a.getEntries=function(){h.getEntries(),a.entries=h.entries},a.getEntry=function(){h.getEntry(d.id),a.entry=h.entry},a.upsertEntry=function(a){g.isAuthenticated()&&h.upsertEntry(a)},a.deleteIssue=function(a){g.isAuthenticated()&&h.deletePost(a)},a.pageChangeHandler=function(a){console.log("going to page "+a)},a.currentPage=1}]),angular.module("lematClient").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("lematClient").directive("lematFooter",[function(){return{restrict:"E",templateUrl:"views/partials/footer.html"}}]),angular.module("lematClient").directive("lematHeader",[function(){return{restrict:"E",templateUrl:"views/partials/header.html",scope:!1}}]),angular.module("lematClient").directive("scrollPosition",["$window","$document",function(a,b){return{scope:{scroll:"=scrollPosition"},link:function(b,c,d){var e=angular.element(a),f=function(){b.scroll=e.scrollTop()};e.on("scroll",b.$apply.bind(b,f)),f()}}}]),angular.module("lematClient").directive("lematRepeat",[function(){return function(a,b,c){angular.element(b),a.$last&&setTimeout(function(){a.$emit("lastElem")},1)}}]),angular.module("lematClient").directive("scroll",["$document","$timeout","$filter",function(a,b,c){return{scope:!1,controller:"IssueController",link:function(b,c,d){var e=[];b.$on("lastElem",function(a){angular.forEach(b.issue.pieces,function(a){var b="#"+a.title_url.toString(),c=document.querySelector(b),d=c.getBoundingClientRect().top;e.push({title:a.title,pos:d})}),e.sort(function(a,b){return parseFloat(a.pos-b.pos)})});var f=0;a.on("scroll",function(){try{(a.scrollTop()>e[0].pos||0===a.scrollTop())&&(b.title="")}catch(c){}try{a.scrollTop()>e[f].pos&&a.scrollTop()>477&&(b.title=e[f].title)}catch(c){}try{a.scrollTop()>e[f+1].pos&&f++}catch(c){}try{a.scrollTop()<e[f].pos&&a.scrollTop()>477&&f--}catch(c){}b.$emit("scroll",b.title.toUpperCase())})}}}]),angular.module("lematClient").directive("author",["$compile",function(a){return{}}]),angular.module("lematClient").directive("lematTable",[function(){return{restrict:"E",templateUrl:"views/partials/contents.html"}}]),angular.module("lematClient").factory("IssueFactory",["$http","$window","AuthFactory","ServerUrl",function(a,b,c,d){var e=[],f={},g=[],h={},i=function(){angular.copy({},f)},j=function(){return a.get(d+"/issues/").then(function(a){angular.copy(a.data,e)})},k=function(b){return a.get(d+"/issues/"+b).then(function(a){angular.copy(a.data,f)})},l=function(b){var c={issue:{title:b.title,image:b.image}};return b.id?a.patch(d+"/issues/"+b.id,c).then(function(a){console.log("response: ",a),k(a.data.id)},function(a){console.log(a)}):a.post(d+"/issues/",c).then(function(a){console.log("response: ",a),k(a.data.id)},function(a){console.log("response: ",a)})},m=function(b,c){return a["delete"](d+"/issues/"+c).then(function(a){e.splice(n(b),1)})},n=function(a){for(var b=0;b<f.length;b++)if(e[b].id===a)return b},o=function(b){return a.get(d+"/issues/"+b+"/pieces").then(function(a){angular.copy(a.data,g)})},p=function(b,c){return a.get(d+"/issues/"+b+"/pieces/"+c).then(function(a){angular.copy(a.data[0],h)})},q=function(b,c){var e={piece:{title:b.title,content:b.content,piece_type:b.piece_type,author:b.author,issue_id:b.issue_id,order:b.order,title_url:b.title.replace(/\s/g,"-").replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,"").substring(0,25).toLowerCase()}};return b.id?a.patch(d+"/issues/"+c+"/pieces/"+b.id,e).then(function(a){console.log("response: ",a)},function(a){console.log(a)}):a.post(d+"/issues/"+c+"/pieces/",e).then(function(a){},function(a){console.log("response: ",a)})},r=function(b){return console.log(b),a["delete"](d+"/issues/"+b.issue_id+"/pieces/"+b.title).then(function(a){})};return{getIssues:j,getIssue:k,getIssuePieces:o,getIssuePiece:p,issues:e,issue:f,pieces:g,piece:h,upsertIssue:l,deleteIssue:m,resetIssue:i,upsertIssuePiece:q,deleteIssuePiece:r}}]),angular.module("lematClient").factory("AuthFactory",["$http","$window","ServerUrl",function(a,b,c){var d={},e=function(b){return a.post(c+"/users/login",b).success(function(a){a.id;j(a),console.log("logged in")})},f=function(){return a.post(c+"/users/logout").success(function(a){b.localStorage.removeItem("lemat-user");console.log("logged out")})},g=function(b){return a.post(c+"/posts/users/",{user:{email:b.email,password:b.password}}).success(function(a){j(a)}).error(function(a){console.log(a)})},h=function(){var a=JSON.parse(b.localStorage.getItem("lemat-user"));return a?!0:!1},i=function(){},j=function(c){b.localStorage.setItem("lemat-user",JSON.stringify(c)),a.defaults.headers.common.Authorization="Token token="+c.token};if(h()===!0)var d=JSON.parse(b.localStorage.getItem("lemat-user")).id;else var d=null;return{login:e,logout:f,register:g,isAuthenticated:h,clearStorage:i,userId:d}}]),angular.module("lematClient").factory("PostFactory",["$http","$window","AuthFactory","ServerUrl",function(a,b,c,d){var e=[],f={},g=function(){angular.copy({},f)},h=function(){return a.get(d+"/posts/").then(function(a){angular.copy(a.data,e)})},i=function(b){return a.get(d+"/posts/"+b).then(function(a){angular.copy(a.data,f),console.log(f)})},j=function(b){var c={post:{title:b.title,author:b.author,post_type:b.post_type,content:b.content,title_url:b.title.replace(/\s/g,"-").replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,"").substring(0,25).toLowerCase()}};return b.id?a.patch(d+"/posts/"+b.id,c).then(function(a){console.log(a)}):a.post(d+"/posts/",c).then(function(a){console.log(a)})},k=function(b,c){return a["delete"](d+"/posts/"+c).then(function(){e.splice(l(b),1)})},l=function(a){for(var b=0;b<e.length;b++)if(e[b].id===a)return b};return{getPosts:h,getPost:i,posts:e,post:f,upsertPost:j,deletePost:k,resetPost:g}}]),angular.module("lematClient").factory("EntryFactory",["$http","$window","AuthFactory","ServerUrl",function(a,b,c,d){var e={},f=[],g=function(){return a.get(d+"/entries/").then(function(a){angular.copy(a.data,f)})},h=function(b){return a.get(d+"/entries/"+b).then(function(a){angular.copy(a.data,e)})},i=function(b){console.log(b);var c={entry:{title:b.title,content:b.content,author:b.author}};return b.id?a.patch(d+"/entries/"+b.id,c).then(function(a){console.log("response: ",a),h(a.data.id)},function(a){console.log(a)}):a.post(d+"/entries/",c).then(function(a){console.log("response: ",a),h(a.data.id)},function(a){console.log("response: ",a)})},j=function(b){return a["delete"](d+"/entries/"+b).then(function(a){e.splice(k(b),1)})},k=function(a){for(var b=0;b<e.length;b++)if(e[b].id===a)return b};return{getEntries:g,getEntry:h,upsertEntry:i,deleteEntry:j,entry:e,entries:f}}]),angular.module("lematClient").filter("to_trusted",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),angular.module("lematClient").filter("escapeHtml",function(){var a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};return function(b){return String(b).replace(/[&<>"'\/]/g,function(b){return a[b]})}}),angular.module("lematClient").filter("spaceless",function(){return function(a){return a?a.replace(/[()&<>"'\/]/g,"").replace(/\s+/g,"-"):void 0}}),angular.module("lematClient").filter("cut",function(){return function(a,b,c,d){if(!a)return"";if(c=parseInt(c,10),!c)return a;if(a.length<=c)return a;if(a=a.substr(0,c),b){var e=a.lastIndexOf(" ");-1!=e&&(a=a.substr(0,e))}return a}}),angular.module("lematClient").run(["$templateCache",function(a){a.put("views/about.html",'<div class="container"> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat justo diam, non varius nisi consequat non. Morbi mi neque, commodo non tristique sodales, imperdiet ac orci. Suspendisse dui nisi, accumsan nec iaculis in, malesuada in augue. Vestibulum feugiat diam in odio sodales placerat. Quisque facilisis maximus quam eu bibendum. Quisque eleifend tellus id nisi vestibulum, scelerisque eleifend nulla consequat. Nam ultrices erat et massa condimentum tempor. Curabitur augue diam, suscipit quis nunc vel, rhoncus semper massa. Mauris dictum lorem at odio interdum molestie. Ut et suscipit sem. Aliquam scelerisque eros ac diam scelerisque cursus. Duis tincidunt fermentum rutrum. Donec commodo mi vel ornare feugiat. Nullam sagittis mauris urna, ut condimentum justo molestie sit amet. </p> </div>'),a.put("views/editors.html",'<div class="container"> <p>Carter Halbrooks</p> <img src="images/carter.a61b7be5.jpg"><br> <a href="http://brailleanimal.tumblr.com/">http://brailleanimal.tumblr.com/</a> <br> <br> <p>Ian Delairre</p> <img src="images/ian.99f8e382.jpg"><br> <a href="https://bc.academia.edu/IanDelairre">"https://bc.academia.edu/IanDelairre"</a> <br> <br> <p>Shelby Jackson</p> <img src="images/shelby.51f163e9.jpg"><br> <br> <br> <p>Jacky Connolly</p> <img src="images/jacky.3eb2aa5b.jpg"><br> <a href="http://www.jackyconnolly.com/">http://www.jackyconnolly.com/</a> <br> <br> <p>Turner Roth</p> <img src="images/turner.d3d9775d.jpg"><br> <br> <p>Ian McCamant</p> <img src="images/ian_m.314b8d22.jpg"><br> <br> <p>Ariel Danielle Norris</p> <img src="images/danielle.f5376fc0.jpg"><br> <br> <a href="http://cargocollective.com/arieldaniellenorris">http://cargocollective.com/arieldaniellenorris</a> </div>'),a.put("views/entry-view.html",'<div class="container" ng-init="getEntry()"> <div class="row"> <p ng-bind-html="entry.content"></p> <p>- {{ entry.author }}</p> </div> <hr> <a class="btn btn-default" ng-href="/#/">Back</a> </div>'),a.put("views/forms/entry-admin.html",'<div class="container" ng-init="getEntries()"> <div class="content" ng-repeat="entry in entries"> <h2>post: <a href="#/entry/{{ entry.id }}/edit">{{ entry.title }}</a></h2> <h3>created: {{ entry.created_at }}</h3> </div> <a class="btn btn-default" href="#/entry-create">Add Entry</a> </div>'),a.put("views/forms/entry-create.html",'<div class="content"> <div class="container"> <div class="form-group"> <label for="name">Title</label> <input type="text" ng-model="entry.title" id="title" class="form-control" placeholder="title" required> </div> <div class="form-group"> <label for="author">Author</label> <input type="text" ng-model="entry.author" id="author" class="form-control" placeholder="author" required> </div> <div class="form-group"> <wysiwyg textarea-id="question" textarea-class="form-control" textarea-height="400px" textarea-name="textareaQuestion" textarea-required ng-model="entry.content" enable-bootstrap-title="true"></wysiwyg> </div> <a class="btn btn-default" ng-click="upsertEntry(entry)">Submit</a> </div> </div>'),a.put("views/forms/entry-edit.html",'<div class="content" ng-init="getEntry()"> <div class="container"> <div class="form-group"> <label for="name">Title</label> <input type="text" ng-model="entry.title" id="title" class="form-control" placeholder="title" required> </div> <div class="form-group"> <label for="author">Author</label> <input type="text" ng-model="entry.author" id="author" class="form-control" placeholder="author" required> </div> <div class="form-group"> <wysiwyg textarea-id="question" textarea-class="form-control" textarea-height="400px" textarea-name="textareaQuestion" textarea-required ng-model="entry.content" enable-bootstrap-title="true"></wysiwyg> </div> <a class="btn btn-default" ng-click="upsertEntry(entry)">Submit</a> </div> </div>'),a.put("views/forms/issue-admin.html",'<div class="container" ng-init="getIssues()"> <div class="content" ng-repeat="issue in issues"> <h2>issue: <a href="#/issue/{{ issue.id }}/edit">{{ issue.title }}</a></h2> <h3>created: {{ issue.created_at }}</h3> <div class="content-inner" ng-repeat="piece in issue.pieces"> <h4>{{ piece.title }}</h4> <h4>by {{ piece.author }}</h4> <a class="btn btn-default" href="#/issue/{{ issue.id }}/{{ piece.title }}/edit">Edit</a> <a class="btn btn-default" href="#/issue/{{ issue.id }}/{{ piece.title }}">Preview</a> <hr> </div> </div> <a class="btn btn-default" href="#/piece-create">Add Piece</a> </div> <hr> <div class="container"> <h1>Add Issue:</h1> <div class="form-group"> <label for="name">Issue Title</label> <input type="text" ng-model="issue.title" id="title" class="form-control" placeholder="title" required> </div> <a class="btn btn-default" ng-click="upsertIssue(issue)">Submit</a> </div>'),a.put("views/forms/issue-edit.html",'<div class="container" ng-init="getIssue()"> <h2>issue: {{ issue.title }}</h2> <h3>created: {{ issue.created_at }}</h3> <div class="content-inner" ng-repeat="piece in issue.pieces | orderBy: \'order\'"> <h4>{{ piece.title }}</h4> <h4>by {{ piece.author }}</h4> <h4>order: {{ piece.order }}<h4> <a class="btn btn-default" href="#/issue/{{ issue.id }}/{{ piece.title }}/edit">Edit</a> <a class="btn btn-default" href="#/issue/{{ issue.id }}/{{ piece.title }}">Preview</a> <a class="btn btn-default" ng-click="piece.order = piece.order + 1"><span class="glyphicon glyphicon-chevron-up"></span></a> <a class="btn btn-default" ng-click="piece.order = piece.order - 1"><span class="glyphicon glyphicon-chevron-down"></span></a> <hr> </h4></h4></div> <a class="btn btn-default" href="#/piece-create">Add Piece</a> <a class="btn btn-default" ng-click="updatePieces()">Update Order</a> </div> <hr> <div class="container"> <h1>Edit Issue:</h1> <div class="form-group"> <label for="name">Issue Title</label> <input type="text" ng-model="issue.title" id="title" class="form-control" placeholder="title" required> </div> <div class="form-group"> <label>Issue Image</label> <input type="text" class="form-control" ng-model="issue.image"> </div> <a class="btn btn-default" ng-click="upsertIssue(issue)">Submit</a> </div>'),a.put("views/forms/online-admin.html",'<div class="container" ng-init="getPosts()"> <div class="content" ng-repeat="post in posts"> <h2>post: <a href="#/{{ post.title_url }}/edit">{{ post.title }}</a></h2> <h3>created: {{ post.created_at }}</h3> </div> <a class="btn btn-default" href="#/post-create">Add Post</a> </div>'),a.put("views/forms/piece-create.html",'<div class="content"> <div class="container"> <div class="form-group"> <label for="name">Title</label> <input type="text" ng-model="piece.title" id="title" class="form-control" placeholder="title" required> </div> <div class="form-group"> <label for="author">Author</label> <input type="text" ng-model="piece.author" id="author" class="form-control" placeholder="author" required> </div> <div class="form-group"> <label for="author">Type</label> <input type="text" ng-model="piece.piece_type" id="type" class="form-control" placeholder="type" required> </div> <div class="form-group" ng-init="getIssues()"> <label for="author">Issue</label> <select ng-model="piece.issue_id"> <option ng-repeat="issue in issues" value="{{issue.id }}">{{ issue.title }}</option> </select> </div> <div class="form-group"> <wysiwyg textarea-id="question" textarea-class="form-control" textarea-height="400px" textarea-name="textareaQuestion" textarea-required ng-model="piece.content" enable-bootstrap-title="true"></wysiwyg> </div> <a class="btn btn-default" ng-click="upsertPiece(piece)">Submit</a> </div> </div>'),a.put("views/forms/piece-edit.html",'<div class="container" ng-init="getPiece()"> <div class="form-group"> <label for="name">Title</label> <input type="text" ng-model="piece.title" id="title" class="form-control" placeholder="title" required> </div> <div class="form-group"> <label for="author">Author</label> <input type="text" ng-model="piece.author" id="author" class="form-control" placeholder="author" required> </div> <div class="form-group"> <label for="author">Type</label> <input type="text" ng-model="piece.piece_type" id="type" class="form-control" placeholder="type" required> </div> <div class="form-group" ng-init="getIssues()"> <label for="author">Issue</label> <select ng-model="piece.issue_id"> <option ng-repeat="issue in issues" value="{{ issue.id }}">{{ issue.title }}</option> </select> </div> <div class="form-group"> <wysiwyg textarea-id="question" textarea-class="form-control" textarea-height="400px" textarea-name="textareaQuestion" textarea-required ng-model="piece.content" enable-bootstrap-title="true"></wysiwyg> </div> <a class="btn btn-default" ng-click="upsertPiece(piece)">Submit</a> <a class="btn btn-default" ng-click="deletePiece()"> <i class="glyphicon glyphicon-trash"></i> </a> </div>'),a.put("views/forms/piece-preview.html",'<div class="container" ng-init="getPiece()"> <div class="content"> <p class="title text-center">{{ piece.title }}</p> <p class="text-center">{{ piece.author }}</p> <br> <p ng-bind-html="piece.content"></p> </div> </div>'),a.put("views/forms/post-create.html",'<div class="container"> <div class="form-group"> <label for="name">Title</label> <input type="text" ng-model="post.title" id="title" class="form-control" placeholder="title" required> </div> <div class="form-group"> <label for="author">Author</label> <input type="text" ng-model="post.author" id="author" class="form-control" placeholder="author" required> </div> <div class="form-group"> <label for="author">Type</label> <input type="text" ng-model="post.post_type" id="type" class="form-control" placeholder="type" required> </div> <div class="form-group"> <wysiwyg textarea-id="question" textarea-class="form-control" textarea-height="400px" textarea-name="textareaQuestion" textarea-required ng-model="post.content" enable-bootstrap-title="true"></wysiwyg> </div> <div class="form-group"> <label>Embedded html</label> <input type="text" class="form-control" ng-model="post.content"> </div> <a class="btn btn-default" ng-click="upsertPost(post)">Submit</a> </div>'),a.put("views/forms/post-edit.html",'<div class="container" ng-init="getPost()"> <div class="form-group"> <label for="name">Title</label> <input type="text" ng-model="post.title" id="title" class="form-control" placeholder="title" required> </div> <div class="form-group"> <label for="author">Author</label> <input type="text" ng-model="post.author" id="author" class="form-control" placeholder="author" required> </div> <div class="form-group"> <label for="author">Type</label> <input type="text" ng-model="post.post_type" id="type" class="form-control" placeholder="type" required> </div> <div class="form-group"> <wysiwyg textarea-id="post" textarea-class="form-control" textarea-height="400px" textarea-name="textareaQuestion" textarea-required ng-model="post.content" enable-bootstrap-title="true"></wysiwyg> </div> <div class="form-group"> <label>Embedded html</label> <input type="text" class="form-control" ng-model="post.content"> </div> <a class="btn btn-default" ng-click="deletePost()">Delete</a> <a class="btn btn-default" ng-click="upsertPost(post)">Submit</a> </div>'),a.put("views/issue-list.html",'<div class="container" ng-init="getIssues()"> <div class="content" ng-repeat="issue in issues"> <h2><a href="#/issue/{{ issue.id }}">{{ issue.title }}</a></h2> <hr> <h3>contents:</h3> <div class="inner-content" ng-repeat="piece in issue.pieces | orderBy: \'order\'"> <li>{{ piece.title }} - {{ piece.author }}</li> </div> <img ng-src="{{ issue.image }}"> </div> </div>'),a.put("views/issue.html",'<div class="container" id="contents" ng-init="getIssue()" scroll> <div class="row"> <div class="col-md-4"> <h2>WRITTEN</h2> <ul ng-repeat="piece in issue.pieces | orderBy: \'order\' | filter: { piece_type: \'!Picture\' }"> <li><a href="#{{ piece.title_url }}" du-smooth-scroll>{{ piece.title }}</a> </li> </ul> </div> <div class="col-md-4"> <h2>PICTURED</h2> <ul ng-repeat="piece in issue.pieces | filter: { piece_type: \'Picture\'}"> <li><a href="#{{ piece.title_url }}" du-smooth-scroll>{{ piece.title }}</a></li> </ul> </div> <div class="col-md-4"> <h2>AUTHORS</h2> <ul ng-repeat="piece in issue.pieces | unique:\'author\' | orderBy: \'order\'" author> <li><a>{{ piece.author }}</a></li> </ul> </div> </div> <div class="row"> <div ng-repeat="piece in issue.pieces | orderBy: \'order\' | filter: author.name" lemat-repeat> <div class="content" id="{{ piece.title_url }}"> <p class="title text-center">{{ piece.title }}</p> <p class="text-center">{{ piece.author }}</p> <br> <p ng-bind-html="piece.content | to_trusted"></p> </div> </div> </div> </div>'),a.put("views/login.html",'<div class="container"> <form name="loginForm" novalidate> <div class="form-group"> <label for="email">Email address</label> <input type="email" class="form-control" id="email" placeholder="Enter email" ng-model="credentials.email" required> </div> <div class="form-group"> <label for="password">Password</label> <input type="password" class="form-control" id="password" placeholder="Password" ng-model="credentials.password" required> </div> <button class="btn" value="Login" ng-click="postCredentials(credentials)">Submit</button> </form> <br> </div>'),a.put("views/main.html",'<div class="container" ng-init="getEntries()"> <div dir-paginate="entry in entries | itemsPerPage: 5" current-page="currentPage"> <a ng-href="#/entry/{{ entry.id }}"> <h1 class="entry-title">{{ ::entry.title }}</h1> </a> <hr> <p class="post-meta">Posted by <a ng-href="/{{ ::entry.id }}"> {{ ::entry.author }}</a> on {{ ::entry.created_at | date:\'medium\'}}</p> <p class="post-subtitle">{{ entry.content | cut:true: 500 }}</p> </div> <br> <ul class="pager"> <dir-pagination-controls template-url="/views/partials/pagination.tpl.html"></dir-pagination-controls> </ul> </div>'),a.put("views/online.html",'<div class="container"> <div class="row" ng-init="getPosts()"> <div class="content"> <div class="col-md-4" ng-repeat="post in posts"> <p><a href="/#/online/{{ post.title_url }}">{{ post.title }}</a> </p> <p>- {{ post.author }}</p> <hr> <p>{{ post.description }}</p> </div> </div> </div> </div>'),a.put("views/partials/admin.html",""),a.put("views/partials/footer.html",'<div class="footer" id="footer"> <div class="container"> <div class="row"> <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6"> <h3>Editors</h3> <ul> <li> <a href="">Carter Halbrooks</a> </li> <li> <a href="">Danielle Norris</a> </li> <li> <a href="">Ian Delairre</a> </li> <li> <a href="">Phoebe Meskill</a> </li> <li> <a href="">Ian McCament</a> </li> <li> <a href="">Shelby Jackson</a> </li> </ul> </div> <!--\n			<div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">\n				<h3> Lorem Ipsum </h3>\n				<ul>\n					<li> <a href="#"> Lorem Ipsum </a> </li>\n					<li> <a href="#"> Lorem Ipsum </a> </li>\n					<li> <a href="#"> Lorem Ipsum </a> </li>\n					<li> <a href="#"> Lorem Ipsum </a> </li>\n				</ul>\n			</div>\n--> <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 pull-right"> <h3>Social Media</h3> <ul> <li> <div class="input-append newsletter-box text-center"> <!--                                <input type="text" class="full text-center" placeholder="Email ">--> <!--                                <button class="btn  bg-gray" type="button"> Lorem ipsum <i class="fa fa-long-arrow-right"> </i> </button>--> </div> </li> </ul> <ul class="social"> <li> <a href="https://www.facebook.com/lematjournal"><i class="fa fa-facebook"></i></a> </li> <li> <a href=""><i class="fa fa-twitter"></i></a> </li> </ul> </div> </div> <!--/.row--> </div> <!--/.container--> </div> <!--/.footer--> <!--\n<div class="footer-bottom">\n	<div class="container">\n		<p class="pull-left"></p>\n	</div>\n</div>-->'),a.put("views/partials/header.html",'<div class="header navbar-fixed-top" ng-class="" scroll-position="scroll"> <a class="menu-bar dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="bars"></span> </a> <div class="dropdown-menu"> <ul class="nav col-lg-3 col-sm-6" role="menu"> <li> <h4 style="padding-left: 5px">HOME</h4> </li> <li class="divider"></li> <li><a href="#/">MAIN PAGE</a> </li> <li><a href="#/issues/">ISSUES</a> </li> <li><a href="#/issue/1">CURRENT ISSUE</a> </li> <li><a href="#/about">ABOUT</a> </li> <li><a href="#/login">LOGIN</a> </li> </ul> <ul class="nav col-lg-3 col-sm-6" role="menu"> <li> <h4>ONLINE</h4> </li> <li class="divider"></li> <li><a href="#/online">CONTENTS</a> </li> <li class="divider"></li> <li><a href="#/online">ART</a> </li> <li><a href="#/online">ESSAYS</a> </li> <li><a href="#/online">POETRY</a> </li> <li><a href="#/online">REVIEWS</a> </li> </ul> <ul class="nav col-lg-3 col-sm-6" role="menu"> <li> <h4>SOCIAL</h4> </li> <li class="divider"></li> <li> <a href="https://www.facebook.com/lematjournal"><i class="fa fa-facebook"></i></a> </li> <li> <a href="#"><i class="fa fa-twitter"></i></a> </li> </ul> <ul class="nav col-lg-3 col-sm-6" role="menu"> <li> <h4>CONTACT</h4> </li> <li class="divider"></li> <li><a href="#/submissions">SUBMISSIONS</a> </li> <li><a href="#/editors">EDITORS</a> </li> <li class="divider"></li> <li><a class="btn btn-outlined" data-toggle="dropdown">CLOSE</a> </li> </ul> </div> <p class="logo"><a class="black">LE MAT</a><b ng-if="title"> //</b> {{ title }}<a><span class="glyphicon glyphicon-chevron-up pull-right" ng-if="scrollShow()" href="#contents" du-smooth-scroll></span></a></p> </div>'),a.put("views/partials/pagination.tpl.html",'<ul class="pagination" ng-if="1 < pages.length"> <li ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }"> <a class="pager" href="" ng-click="setCurrent(1)">&laquo;</a> </li> <li ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }" class="ng-scope"> <a class="pager" href="" ng-click="setCurrent(pagination.current - 1)" class="ng-binding">‹</a> </li> <li ng-repeat="pageNumber in pages track by $index" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' }"> <a class="pager" href="" ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a> </li> <li ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }" class="ng-scope"> <a class="pager" href="" ng-click="setCurrent(pagination.current + 1)" class="ng-binding">›</a> </li> <li ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == pagination.last }"> <a class="pager" href="" ng-click="setCurrent(pagination.last)">&raquo;</a> </li> </ul>'),a.put("views/post-view.html",'<div class="container"> <div class="content" ng-init="getPost()"> <h1>{{ post.title }}</h1> <p>{{ post.author }}</p> <hr> <p>{{ post.description }}</p> <p ng-bind-html="post.content | to_trusted"></p> </div> </div>'),a.put("views/submissions.html",'<div class="container"> <h1>Le Mat submission guidelines</h1> <hr> <p class="lead"><i>Note: open to revision</i></p> <li class="lead">Send submissions to lematjournal@gmail.com</li> <li class="lead">For visual art submit 2 to 3 images. If you are submitting photo-documentation or digital photography we will accept any size or file type of at least 300dpi; final proportions are to be determined by the editors and printing/cost constraints. We accept all species of photography. All submissions should be captioned in the following format: <br> <br> <i class="lead">Artist, title, date, medium, and dimensions are separated by commas, and these elements are followed by a period. Collection, city, and credit lines follow, separated by commas. After this, in parentheses, come all copyright and photograph credit lines. There is no terminal period, unless the basic caption information is followed by a descriptive sentence, which occurs rarely. Complete information on medium, dimensions, and collection should be provided if possible.</i> </li> <br> <li class="lead">3 to 5 poems of any length. Include a short author biography. Feel free to destroy your personality.</li> <li class="lead">Short stories and experimental fiction of 1000 to 3000 words.</li> <li class="lead">Critical works (art criticism, philosophy, literary theory/analysis, art history, knickknacks) of 1000 to 3000 words. Please use MLA format for footnoting, etc.</li> </div>');
}]);
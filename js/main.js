//event listener for form submission
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// create fuction to save bookmark
function saveBookmark(e) {
    //when user types into the form, it gets the values
    var siteName = document.getElementById("siteName").value;
    // console.log(siteName);
    var siteUrl = document.getElementById("siteUrl").value;
    // console.log(siteUrl);


    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl


    }
    // console.log(bookmark);

    /*
    //local storage test
    localStorage.setItem("test", "Hello World");
    console.log (localStorage.getItem("test"));
    localStorage.removeItem("test");
    console.log (localStorage.getItem("test"));
    */

    if (localStorage.getItem("bookmarks") === null) {
        // create array
        var bookmarks = [];

        //adds to array
        bookmarks.push(bookmark);

        //set to local storage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
        //  Get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        //Add Bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to LocalStorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

//clear form
document.getElementById("myForm").reset();

    // Re-fresh bookmarks
    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault();
}

//function to delete bookmark
function deleteBookmark(url) {
    //Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to LocalStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // Re-fresh bookmarks
    fetchBookmarks();
}

// create a function to fetch bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    //get output id
    var bookmarksResults = document.getElementById("bookmarksResults");

    //Build output
    bookmarksResults.innerHTML = "";

    // create for loop to take whats in local storage and put it into a div
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        //builds output
        bookmarksResults.innerHTML += '<div class="well">' +
                                      '<h3>' + name +
                                      ' <a class="btn btn-light" target="_blank" href="' + url + '">Visit</a> ' +
                                      ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> '
                                      '</h3>' +
                                      '</div>';

    }
}

// create function to validate form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert("Please fill in the form");
        return false;
    }
    
    // regular expression to format a url
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)) {
        alert("please use a valid url");
        return false;
    }

    return true;
}
/*
Create a new String function that encrypts all the symbols needed with a rot13 type encryption.
I use this function to decrypt my previously encrypted personal contact information to prevent spam.
*/
String.prototype.rotX = function(){
    // The charset contains all characters I might need to encrypt plus a "-" as a 0. character (I won't need a "-")
    charset="- abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:@";
    // All characters of the left half of the charset get projected onto the right part of the charset and vice versa
    offset = charset.length / 2;
    result = ""
    for (c of this) {
        i = charset.indexOf(c);
        cNew = (i > offset) ? charset.charAt(i - offset) : charset.charAt(i + offset);
        result = result.concat(cNew);
    }
    return result
};

function show(what, str) {
    el = document.getElementById(what)
    el.innerHTML = str.rotX()
}

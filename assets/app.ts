console.log("heyyooooo")

// Handle clicking on hamburger button for mobile
function showMenu() {
    let navigation = document.getElementsByClassName('topnav')[0]
    if (navigation.className === 'topnav' ) {
      navigation.className += " menuShown"
      //document.getElementsByTagName('nav').style float = none
    } else {
      navigation.className = "topnav"
    }
    console.log("I ran")
}

console.log(showMenu)

showMenu()
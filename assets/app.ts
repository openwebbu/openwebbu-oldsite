// Handle clicking on hamburger button for mobile
window.showMenu = function() {
    let navigation = document.getElementsByClassName('topnav')[0]
    if (navigation.className === 'topnav' ) {
      navigation.className += " menuShown"
    } else {
      navigation.className = "topnav"
    }
}

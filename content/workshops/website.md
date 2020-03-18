---
title: "Website"
date: 2020-03-12T22:58:00-04:00
draft: true
---

Here's a workshop to get people used to assing stuff to the website possibly.

{{< highlight javascript >}}
// Handle clicking on hamburger button for mobile
window.showMenu = function() {
    let navigation = document.getElementsByClassName('topnav')[0]
    if (navigation.className === 'topnav' ) {
      navigation.className += " menuShown"
    } else {
      navigation.className = "topnav"
    }
}
{{< / highlight >}}
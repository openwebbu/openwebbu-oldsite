---
title: "React Native Tutorial"
date: 2017-03-18T00:20:16-05:00
draft: false
summary: "Teaching the basics of react native development. With React-Native, you can develop cross-platform mobile apps that can release on Android and iOS!"
---

## Setup

Please set up and install the needed programs prior to attending the workshop if you can, so that you won't fall behind if you're having trouble.

### Set Up Your Workspace

{{< highlight bash >}}
// Handle clicking on hamburger button for mobile
// Create a folder named "react_native_apps" on your Desktop
cd
cd Desktop
mkdir react_native_apps
cd react_native_apps
{{< / highlight >}}

### Download Starter Code

Go to the workshop's [Github repo](https://github.com/openwebbu/ReactNative_Workshop2017) to download starter code!

### Install Tools & Dependencies

You will need [Xcode](https://developer.apple.com/xcode/downloads/) and the Xcode Command Line Tools.

{{< highlight bash >}}
// Install XCode Command Line Tools
xcode-select --install
{{< / highlight >}}


{{< highlight bash >}}
// Install Homebrew (if you don't have it already)
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

// Install components: nodeJS, Watchman, React-Native command line interface
brew install node
brew install watchman
npm install -g react-native-cli // install react-native
{{< / highlight >}}

### Initilize and Run your Project

{{< highlight bash >}}
react-native init BU_quiz // Initialize Project
cd BU_quiz // change directory
{{< / highlight >}}

Now, move the three .js files from AppCode into your BU_quiz directory (you can also use your finder/explorer)

{{< highlight bash >}}
mv ../AppCode/QuestionPage.js QuestionPage.js
mv ../AppCode/ResultPage.js. ResultPage.js
mv ../AppCode/WelcomePage.js WelcomePage.js
{{< / highlight >}}

Now, run your project.  If you brought your iOS or Android device and would rather run your app on your device, follow those steps in the next paragraph. Otherwise, run these commands to run the simulator on your laptop.

{{< highlight bash >}}
react-native run-ios // for simulating iOS
react-native run-android // for simulating android
{{< / highlight >}}

Steps for running your app directly on your device (view [documentation](https://facebook.github.io/react-native/docs/running-on-device.html) for more details):

**iOS**

* Connect your device to your Mac via USB, then open Xcode.
* Navigate into ios folder of your project and open the file ending .xcodeproj inside it.
* In the project navigator, choose your device from the Product > Destination toolbar menu. Xcode will then register your device for development. 
* Finally, select your phone as the build target and press Build and run.

**Android**

* View [Android Documentation](https://facebook.github.io/react-native/docs/running-on-device.html)

If you've loaded your app on the simulator/device successfully, you should be all set! If you need more help, please come early to the workshop and we'll be able to help you. :)

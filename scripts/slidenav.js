const open = (function(){
    const openNav = function() {
        document.getElementById("sideNavigation").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }
     
    const closeNav = function() {
        document.getElementById("sideNavigation").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }
    return {
        openNav,
        closeNav
    }
})();


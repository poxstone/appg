(function(){

window.reloadMDLDOM = function ($interval, callback){
    var countTime = 0;
    $interval = $interval || setInterval;

    var timmer = $interval(function(){

        //Reload MDL components
        componentHandler.upgradeDom();

        countTime += 1;

        //apply callbak function
        if(countTime >= 7) {

            if ($interval.cancel) {
                $interval.cancel(timmer);

            } else {
                clearInterval(timmer);

            }

            //apply call back
            if(arguments[1]){
                callback();
            }
        }

    }, 250);
};

})();
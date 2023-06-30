//document.getElementsByTagName("button")[5];

//var x = document.querySelectorAll('button.null');


function myAppJavaScript(jQuery) {
    var maswaObj = {
        paraArr: [],
        adminUrl: 'http://wp.local/wp-admin/admin-ajax.php',
        totalIndex: 50,
        index: 0,
        canClickGenerateContent: function () {
            var self = this;
            var button = jQuery('button[type="submit"]');
            var itemExist = button.children().first();

            var itemExist2 = button.children().first().next();
            if (itemExist2.length == 0 && self.index < self.paraArr.length) {
                return true;
            } else {
                return true;
            }

        },
        submitContent: function () {
            var self = this;
            self.index = 0

           jQuery('p').each( async function (index, ele) {
               // var content = 'summarize this using bullet point :' + jQuery(ele).html();
               var content = '' + jQuery(ele).html() ;
           jQuery.ajax({
  type: 'POST',
  url: 'https://wp2.com/wp-admin/admin-ajax.php?action=andy_gpt_save_ori',
  data:  {
                   content: content,
                   tag: "DPPs"
               },
  async:false
});
           })

        },

        sendServer :async function (content) {
           jQuery.ajax({
  type: 'POST',
  url: 'https://wp2.com/wp-admin/admin-ajax.php?action=andy_gpt_save_ori',
  data:  {
                   content: content,
                   time: "2pm"
               },
  async:false
});

        }
    };

    setTimeout(maswaObj.submitContent, 1000);


}

function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url || '';
    if (script.readyState) {
        //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        //Others
        script.onload = function () {
            callback();
        };
    }
    document.getElementsByTagName("head")[0].appendChild(script);

};

///////////////
if (typeof jQuery === 'undefined' || parseFloat(jQuery.fn.jquery) < 1.7) {
    loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function () {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.js', function () {
            var jQuery191 = jQuery.noConflict(true);

            myAppJavaScript(jQuery191);
        })
    });
} else {
    myAppJavaScript(jQuery);


}
window.max_index = 0;
window.mas_content = [];



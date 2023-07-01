function cFunction(html, id,tag) {
    window.document.body.insertAdjacentHTML('afterbegin',
        '<div class="linked-content" style="display:none;"  ' + 'data-id=' + '"' + id + '"' + 'data-tag=' + '"' + tag + '"' + '>' + html + '</div>');
}
function csumFunction(html, id, tag) {
    window.document.body.insertAdjacentHTML('afterbegin',
        '<div class="sum-content" style="display:none;"  ' + 'data-id=' + '"' + id + '"'  + 'data-tag=' + '"' + tag + '"' + '>' + html + '</div>');
}


function setNativeValue(element, value) {
    if (element == undefined || element == null) {
        $('form').find('button').trigger('click');

    } else {
        const {set: valueSetter} = Object.getOwnPropertyDescriptor(element, 'value') || {}
        const prototype = Object.getPrototypeOf(element)
        const {set: prototypeValueSetter} = Object.getOwnPropertyDescriptor(prototype, 'value') || {}

        if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter.call(element, value)
        } else if (valueSetter) {
            valueSetter.call(element, value)
        } else {
            throw new Error('The given element does not have a value setter')
        }
    }

}

function nativeK(text) {
    const textarea = document.getElementById('prompt-textarea')

    setNativeValue(textarea, text)
    textarea.dispatchEvent(new Event('input', {bubbles: true}))
}

function submitContent() {
    var thuyCRaw = jQuery('body').attr('pcount');
    var self = this;
    // self.index = 0
    var thuyCInt = parseInt(thuyCRaw);

    let el = document.getElementById("prompt-textarea");
    var param = jQuery('.thuy');
    var parame = param[thuyCInt];
    thuyCInt++;
    var thuyCStr = thuyCInt.toString();
    jQuery('body').attr('pcount', thuyCStr);

    console.log(thuyCInt);
    nativeK(parame.innerHTML);


        el.dispatchEvent(new Event('input'));

        jQuery('#prompt-textarea').focus();
        jQuery('#prompt-textarea').trigger(jQuery.Event('keypress', {keycode: 13}));
        // jQuery('#prompt-textarea').trigger(jQuery.Event('keypress', {keycode: 13}));



    setTimeout(function () {
        jQuery('form').find('button').attr('id', 'thuy');

        //jQuery('#prompt-textarea').next().find('button').click();
    }, 150);

    //click on copy b
    setTimeout(function () {
        jQuery('#candyimport').trigger('click');
    }, 1000 * 60 * 2);

}

function submitContentLink() {
    var self = this;

    let el = document.getElementById("prompt-textarea");

    nativeK(parame.innerHTML);


    setTimeout(function () {
        el.dispatchEvent(new Event('input'));

        jQuery('#prompt-textarea').focus();
        jQuery('#prompt-textarea').trigger(jQuery.Event('keypress', {keycode: 13}));
        jQuery('#prompt-textarea').trigger(jQuery.Event('keypress', {keycode: 13}));

    }, 1);

        jQuery('form').find('button').attr('id', 'thuy');

        //jQuery('#prompt-textarea').next().find('button').click();;

    //copy text into the database
    var content = jQuery('.markdown').last().html();
    jQuery.ajax({
        type: 'POST',
        url: 'https://wp2.com/wp-admin/admin-ajax.php?action=andy_gpt_save_linked_content',
        async: false
    }).done(function (data) {
        //feed this data
    });

}
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
function regv(parent) {
    var htmle =  $('form').find('button').html();

    var ind = htmle.indexOf('Regenerate response');


    if (ind > 0) {
        $('.text-gray-600').each(function (i,e) {
            var noa=   $(e).html().indexOf('Please allow any other responses to complete');
            if (noa > 0 ) {
                console.log('Allow response blabal');
                clearInterval(parent.regval);
                const d = new Date();
                if (parent.etime == undefined) {
                    parent.etime = d.getTime();
                    $('form').find('button').trigger('click');
                    console.log('Trigger because undefined');


                } else {
                    if (d.getTime() - parent.etime > 1000*30) {
                        parent.etime = d.getTime();
                        $('form').find('button').trigger('click');
                        console.log('Trigger because time elapse than 1sec');



                    }
                }


            }

        });
        //
    }
}
function regvSum(parent) {
    var htmle =  $('form').find('button').html();

    var ind = htmle.indexOf('Regenerate response');


    if (ind > 0) {
        $('.text-gray-600').each(function (i,e) {
            var noa=   $(e).html().indexOf('Please allow any other responses to complete');
            if (noa > 0 ) {
                console.log('Allow response blabal');
                clearInterval(parent.regval);
                const d = new Date();
                if (parent.etime == undefined) {
                    parent.etime = d.getTime();
                    $('form').find('button').trigger('click');
                    console.log('Trigger because undefined');


                } else {
                    if (d.getTime() - parent.etime > 1000*30) {
                        parent.etime = d.getTime();
                        $('form').find('button').trigger('click');
                        console.log('Trigger because time elapse than 1sec');



                    }
                }


            }

        });
        //
    }
}
function  xv(parent) {

    //sleep(1000 * 60).then(() => {
    // Do something after the sleep!
    var xf = $('body').attr('xf');
    var xfI = parseInt(xf);
    xfI++;
    var newxf = xfI.toString();
    $('body').attr('xf', newxf);



    ldid = $('.linked-content').last().attr('data-id');
    if (xf == ldid) {
        $('body').attr('xf', '100');
    }
    var pe = $('.linked-content').filter(function () {
        return $(this).attr('data-id') == xf
    })
    var html = pe.html();
    var tag = pe.attr('data-tag');
    if (html != undefined) {
        submitContentLinkForBatchMode(html, xf,parent);
        var content = jQuery('.markdown').last().html();
        console.log(content);
        jQuery.ajax({
            type: 'POST',
            data: {content: content, pid: xf , tag : tag},
            url: 'https://wp2.com/wp-admin/admin-ajax.php?action=andy_gpt_save_linked_content_bm',
            async: false
        }).done(function (data) {
            //feed this data
        });
    } else {
        console.log('seretonin');
        //todo : submit the last
        //set last is 1
        if (parent.last == 0) {
            var content = jQuery('.markdown').last().html();
            console.log(content);
            jQuery.ajax({
                type: 'POST',
                data: {content: content, pid: xf , tag : tag},
                url: 'https://wp2.com/wp-admin/admin-ajax.php?action=andy_gpt_save_linked_content_bm',
                async: false
            }).done(function (data) {
                //feed this data
            });
            parent.last = 1;
        }
    }
    self.cfm= self.cfm + 1;


    //});
}

function  xvSum(parent) {
    var xf = $('body').attr('xf');
    var last = $('body').attr('last');

    //i
    if (last == '-1') {
        var tag = $('body').attr('tag');

        var content = jQuery('.markdown').last().html();
        jQuery.ajax({
            type: 'POST',
            data: {content: content, pid:xf, tag :tag},
            url: 'https://wp2.com/wp-admin/admin-ajax.php?action=andy_gpt_save_sum_content_bm',
            async: false
        }).done(function (data) {
          window.location = "https://google.com";
        });
    }
    var tag = $('body').attr('tag');

    var content = jQuery('.markdown').last().html();

    jQuery.ajax({
        type: 'POST',
        data: {content: content, pid:xf, tag :tag},
        url: 'https://wp2.com/wp-admin/admin-ajax.php?action=andy_gpt_save_sum_content_bm',
        async: false
    }).done(function (data) {
        //feed this data
        var selector = ".sum-content[data-id='" + xf + "'" + ']';
        var currentSumElement  =  jQuery(selector);

        if (currentSumElement.length  > 0 ) {
            var html = currentSumElement.html();

            submitContentSumForBatchMode(html, xf,parent);

            var nextE = currentSumElement.next('.sum-content');
            if (nextE.length > 0) {
                var oriId = nextE.attr('data-id');
                var oriIdInt = parseInt(oriId);
                var oriIdStr = oriIdInt.toString();
                $('body').attr('xf', oriIdStr);
            } else {
                //
                $('body').attr('last', '-1');


            }
        }
    });
    ////

    //});
}
function  xvfirst(parent) {

    //sleep(1000 * 60).then(() => {
    // Do something after the sleep!
    var xf = $('body').attr('xf');
    var xfI = parseInt(xf);
    xfI++;
    var newxf = xfI.toString();
    $('body').attr('xf', newxf);



    ldid = $('.linked-content').last().attr('data-id');
    if (xf == ldid) {
        $('body').attr('xf', '500');
    }
    var pe = $('.linked-content').filter(function () {
        return $(this).attr('data-id') == xf
    })
    var html = pe.html();
    if (html != undefined) {
        submitContentLinkForBatchMode(html, xf,parent);

    } else {
        console.log('seretonin');
    }

    self.cfm= self.cfm + 1;

    //});
}
function  xvfirstSum(parent) {

    //sleep(1000 * 60).then(() => {
    // Do something after the sleep!
    var xf = $('body').attr('xf');
    var selector = ".sum-content[data-id='" + xf + "'" + ']';


    var currentSumElement  =  jQuery(selector);

    if (currentSumElement.length  > 0 ) {
        var html = currentSumElement.html();
        submitContentSumForBatchMode(html, xf,parent);


        var nextE = currentSumElement.next('.sum-content');

        if (nextE.length > 0) {
            var oriId = nextE.attr('data-id');
            var oriIdInt = parseInt(oriId);
            var oriIdStr = oriIdInt.toString();
            $('body').attr('xf', oriIdStr);

        }
    }

}

 function launchBatchMode() {
    var self = this;
    self.last = 0;
    self.cfm = 1;
    self.max = $('.linked-content').length
     xvfirst(self);
    var intevalf = setInterval(xv ,1000*60*3, self);
    self.regval = setInterval(regv ,1000, self);
    if (self.cfm == self.max) {
        clearInterval(intevalf);
        clearInterval(self.regval);
    }


     // Usage!

}
 function launchBatchModeSum() {
    var self = this;
    self.cfm = 1;
    self.max = $('.sum-content').length
     xvfirstSum(self);
    var intevalf = setInterval(xvSum ,1000*60*3, self);
    self.regval = setInterval(regvSum ,1000, self);
    if (self.cfm == self.max) {
        clearInterval(intevalf);
        clearInterval(self.regval);
        console.log('max reach in launchBatchModeSum');

    }
     // Usage!
}

function submitContentLinkForBatchMode(html, ida,parent) {

    console.log(ida);

    let el = document.getElementById("prompt-textarea");

    nativeK(html);

    jQuery('form').find('button').attr('id', 'thuy');

    jQuery('#prompt-textarea').closest('form').find('button').trigger( "click" );
    if (parent != undefined ) {
        clearInterval(parent.regval);

        parent.regval = setInterval(regv ,100, parent);

    }



    //copy text into the database
}
function submitContentSumForBatchMode(html, ida,parent) {

    console.log(ida);
    let el = document.getElementById("prompt-textarea");

    nativeK(html);

    jQuery('form').find('button').attr('id', 'thuy');

    jQuery('#prompt-textarea').closest('form').find('button').trigger( "click" );
    if (parent != undefined ) {
        clearInterval(parent.regval);

        parent.regval = setInterval(regv ,500, parent);

    }



    //copy text into the database
}

function improveContent() {
    jQuery.ajax({
        type: 'POST',
        url: 'https://wp2.com/wp-admin/admin-ajax.php?action=andy_gpt_get_content_to_link',
        async: false
    }).done(function (data) {
        //feed this data
        var data = JSON.parse(data);
        var html = data.html;
        submitContentLink(html);
    });
}


function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}

function appendText() {
    jQuery('body').attr('pcount', '0');
    var txt1 = "<button id='andyimport' style='position: fixed;right: 10px;bottom: 150px;z-index: 200;background-color: #4CAF50; /* Green */ border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px' >Junie</button>";               // Create element with HTML
    var txt2 = "<button id='xandyimport' style='position: fixed;right: 10px;bottom: 350px;z-index: 200; background-color: #f44336; /* Green */ border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px' >Gen</button>";               // Create element with HTML
    var txt3 = "<button id='candyimport' style='position: fixed;right: 10px;bottom: 500px;z-index: 200; background-color: #3656F4FF; /* Green */ border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px' >Copy</button>";               // Create element with HTML
    var txt4 = "<button id='imndyimport' style='position: fixed;right: 10px;bottom: 700px;z-index: 200; background-color: #3656F4FF; /* Green */ border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px' >GLS</button>";               // Create element with HTML
    var txt5 = "<button id='brlndyimport' style='position: fixed;right: 10px;bottom: 800px;z-index: 200; background-color: #F4C836FF; /* Green */ border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px' >GLBatch</button>";               // Create element with HTML


    // Append the new elements
    var host = window.location.href;
    if (host.includes('openai') ) {
        $("body").append(txt1, txt2, txt3, txt4, txt5);

        // injectScript( chrome.runtime.getURL('/js/jquery.min.js'), 'body');
        injectScript(chrome.runtime.getURL('/js/gpt_api.js'), 'body');

        $('#xandyimport').on('click', function () {
            submitContent();
        })

        $('#candyimport').on('click', function () {
            var content = $('.markdown').last().html();
            $.post("https://wp2.com/wp-admin/admin-ajax.php?action=andy_gpt_save", {content: content, time: "2pm"});
        })

        $('#brlndyimport').on('click', function () {
            console.log('batch import');
            var tag  = $('body').attr('tag');

            $.post('https://wp2.com/wp-admin/admin-ajax.php?action=andy_gpt_get_summary',
                {
                    tag : tag
                },
                function (data) {
                    console.log(data);
                    // myArray = JSON.parse(data);
                    myArray = data;

                    for (var i = 0; i < myArray.length; i++) {
                        var item = myArray[i];
                        var content = item.html;
                        var id = item.id;
                        var tag = item.tag;
                        cFunction(content, id,tag);
                    }

                     var fdid = $('.linked-content').first().attr('data-id');
                    $('body').attr('xf', fdid);

                        launchBatchMode();


                });
        })

        $('#imndyimport').on('click', function () {
            console.log('batch import');
            var tag  = $('body').attr('tag');
            $.post('https://wp2.com/wp-admin/admin-ajax.php?action=andy_gpt_get_origin_chapter',
                {
                    tag : tag
                },

                function (data) {
                    console.log(data);
                    // myArray = JSON.parse(data);
                    myArray = data;

                    for (var i = 0; i < myArray.length; i++) {
                        var item = myArray[i];
                        var content = item.html;
                        var id = item.id;
                        var tag = item.tag;
                        csumFunction(content, id,tag);
                    }

                    var fdid = $('.sum-content').first().attr('data-id');
                    $('body').attr('xf', fdid);

                    launchBatchModeSum();


                });
        })

    }
}

(function () {
    jQuery("body").prepend("Nguyen Thuy MInh.");

    console.log('Minh mui tet');
    var txt1 = "<p>June.</p>";               // Create element with HTML 
    var txt2 = jQuery("<p></p>").text("Ellie.");   // Create with jQuery
    var txt3 = document.createElement("p");  // Create with DOM
    txt3.innerHTML = "Text.";
    setTimeout(appendText, 1500);
})();

// Random unique name, to be used to minimize conflicts:
var EVENT_FROM_PAGE = '__rw_chrome_ext_' + new Date().getTime();
var EVENT_REPLY = '__rw_chrome_ext_reply_' + new Date().getTime();

// Handle messages from/to page:
document.addEventListener(EVENT_FROM_PAGE, function (e) {
    var transporter = e.target;
    if (transporter) {
        var request = JSON.parse(transporter.getAttribute('data'));
        // Example of handling: Send message to background and await reply
        chrome.runtime.sendMessage({
            type: 'page',
            request: request
        }, function (data) {
            // Received message from background, pass to page
            var event = document.createEvent('Events');
            event.initEvent(EVENT_REPLY, false, false);
            transporter.setAttribute('result', JSON.stringify(data));
            transporter.dispatchEvent(event);
        });
    }
});

console.log("connected");
// console.log(today);
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
};

console.log($.urlParam('query') );
console.log($.urlParam('tag'));
// $('#butto').click(function(){
//     console.log("Clickkedd!!");
// })
// $("#search").change(function(){
//     var element = $(this);
//     var myTag = element.attr("myTag");
//     $('#setMyTag').val(myTag);
// });
$('#next').click(function(){
    var page = parseInt($.urlParam('page')) + 1;
    var query = $.urlParam('query');
    var tag = $.urlParam('type');
    // if(tag== '(story,comment)'){
    //     newUrl = "/?query="+query+"&tag=all&page="+page;
    // }
    newUrl = "/?query="+query+"&tag="+tag+"&page="+page;
    $(this).attr("href", newUrl);
});
var page = $.urlParam('page');
if(!page){
    $('#1').addClass('selected');
}
console.log(page);
var current_page = '#'+ (parseInt(page) +1).toString();
console.log(current_page);
$(current_page).addClass('selected');


var current_tag = $.urlParam('type');
console.log(current_tag);
// if(current_tag == 'all'){
//     $('#search').val('all'); // Select the option with a value of '1'
//     $('#search').trigger('change');   
// }
// $("#search option[value =' ']").s
$('#search').val(current_tag); // Select the option with a value of '1'
$('#search').trigger('change');   

var current_by = $.urlParam('by');
console.log(current_by);
// $("#search option[value =' ']").s
$('#by').val(current_by); // Select the option with a value of '1'
$('#by').trigger('change'); 


$('#story').click(function(){
    // var element = $("option:selected", this);
    // console.log('Yo mam ' +element );
        // var Tag = element.attr("value");
        $('#search').val('story');
        console.log('search='+document.getElementById("search").value)
        // console.log(Tag);
        $('#form1').submit( );
    console.log('clickeed')
});
$('#comment').click(function(){
    // var element = $("option:selected", this);
    // console.log('Yo mam ' +element );
        // var Tag = element.attr("value");
        $('#search').val('comment');
        console.log('search='+document.getElementById("search").value)
        // console.log(Tag);
        $('#form1').submit( );
    console.log('clickeed')
});
// $('#all').click(function(){
//         $('#search').val('all');
//         console.log('search='+document.getElementById("search").value)
//         // console.log(Tag);
//         $('#form1').submit( );
//     console.log('clickeed')
// });
$('#date').click(function(){
        $('#by').val('date');
        console.log('search='+document.getElementById("search").value)
        // console.log(Tag);
        $('#form1').submit( );
    console.log('clickeed')
});
$('#popularity').click(function(){
    $('#by').val('popularity');
    console.log('search='+document.getElementById("search").value)
    // console.log(Tag);
    $('#form1').submit( );
console.log('clickeed')
});

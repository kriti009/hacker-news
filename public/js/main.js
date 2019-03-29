console.log("connected");
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
    var tag = $.urlParam('tag');
    newUrl = "/?query="+query+"&tag="+tag+"&page="+page;
    $(this).attr("href", newUrl);
});
var page = $.urlParam('page');
console.log(page);
var current_page = '#'+ (parseInt(page) +1).toString();
console.log(current_page);
$(current_page).addClass('selected');


var current_tag = $.urlParam('tag');
console.log(current_tag);
// $("#search option[value =' ']").s
$('#search').val(current_tag); // Select the option with a value of '1'
$('#search').trigger('change');   

// $("a").on("click", function () {
//     $("a.active").removeClass("active");
//     $(this).addClass("active");
// });
// $('a').click(function(){
//     $('a').removeClass('selected', function(){
//         console.log("yonds");
//     });
//     $(this).addClass('selected');  
// });
// $()


$("#search").change(function(){
    var element = $("option:selected", this);
    // console.log(element);
    var myTag = element.attr("value");
    // console.log(myTag);
    $('#search').val(myTag);
    // $('#form1').submit(function(event){
    //     console.log(",form submitted!");
    // })
    // console.log(document.getElementById("search").value)
});
// $('#story').click(function(){
//     var element = $("option:selected", this);
//     // console.log(element);
//     var Tag = element.attr("value");
//     $('#search').val(Tag);
//     $('#form1').submit( );
//     // console.log('clickeed')
// });
// $('#comment').click(function(){
//     var element = $("option:selected", this);
//     // console.log(element);
//     var Tag = element.attr("value");
//     $('#search').val(Tag);
//     $('#form1').submit();
//     // console.log('clickeed')
// })
// $('#search').change(function(){
//     var query = document.getElementById("query").value || "";
//     var page = '0';
//     var tag = 'story';
//     console.log(document.getElementById("search").value);
//     var urll = 'https://hn.algolia.com/api/v1/search?query='+query+'&tags='+tag+'&numericFilters=&page='+page;
//     $.ajax({
//         method: "GET",
//         url: urll,
//         data: { tag: document.getElementById("search").value},
//         dataType: 'JSON'
//         })
//         .done(function( msg ) {
//             console.log(msg.hits[0].title);
//         });
// });
// $('#story').change(function(){
//     var urll = 'https://hn.algolia.com/api/v1/search?query='+query+'&tags='+tag+'&numericFilters=&page='+page;
//     // $.ajax()
//     console.log("Story has been choosen!");
//     $.ajax({
//         method: "GET",
//         url: urll,
//         data: { tag: document.getElementById("search").value},
//         dataType: JSON
//       })
//         .done(function( msg ) {
//           console.log(msg);
//         });
// });
// $('#comment').select(function(){
//     console.log("Story has been choosen!");
    
//     var urll = 'https://hn.algolia.com/api/v1/search?query='+query+'&tags='+tag+'&numericFilters=&page='+page;
//     // $.ajax()
//     $.ajax({
//         method: "GET",
//         url: urll,
//         data: { tag: "comment"},
//         dataType: JSON
//       })
//         .done(function( msg ) {
//           console.log(msg);
//         });
// });
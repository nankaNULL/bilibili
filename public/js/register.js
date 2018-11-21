$(function(){
    $("input[type=checkbox]").click(function(){
        var checked = $(this).prop('checked');
        $("input[type=submit]").toggleClass("active",checked);
    })
    console.log();
})
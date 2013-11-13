var Snippet = Snippet || {};

$( document ).ready(function(){
  $('#show-snippet').on("click", Snippet.showSnippets)
  $('#post-snippet').on("submit", Snippet.addSnippets)
  //reseting the values so it doesnt automatically take the last updated value
  $('input[name=body]').val("")
  $('input[name=source]').val("")
  //calling for my background page
  var bg = chrome.extension.getBackgroundPage();
  $('input[name=body]').val(bg.title)
  $('input[name=source]').val(bg.source)
  }
);

Snippet.showSnippets = function() {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/snippets.json",
    crossDomain: true,
    dataType: "json"
  }).done(function(snippets){
    var $ul = $("<ul>");
    $.each(snippets, function(index, snippet){
      $snippet = $("<li>")
        .text(snippet.body)
        .appendTo($ul);
    })
    $ul.appendTo($('#all-snippets'))
  });
   $('#show-snippet').off("click", Snippet.showSnippets)
  }

Snippet.addSnippets = function(e){
  e.preventDefault();
    var newSnippet = {
      body: $('input[name=body]').val(),
      source: $('input[name=source]').val(),
      user_id: $('input[name=user_id]').val(),
      tag_list: $('input[name=tag_list]').val()
    };
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/snippets.json",
      dataType: "json",
      crossDomain: true,
      data: {snippet: newSnippet}
    }).done(function(snippet){
      alert("hello")
      console.log(snippet.tag_list)})
}

Snippet.deleteSnippets = function(e){
  e.preventDefault();
  var $target = $(e.target).parent();
  var snippet_id = $target.attr('id')
      $.ajax({
      type: "DELETE",
      url: "/snippets/"+ snippet_id,
      dataType: "json"
    })
}
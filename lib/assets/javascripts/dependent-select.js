(function($){

  $.fn.dependentSelect = function(parentId, urlTemplate, options) {
    
    options = $.extend({
      optionTemplate: '<option value="${id}">${name}</option>',
      blankOptionHtml: '<option value=""></option>'
    }, options || {});

    var select = this;
    
    $('#' + parentId).bind('change', function(event) {

      select.empty().append(options.blankOptionHtml);

      var url = urlTemplate.replace('${value}', event.target.value);

      $.getJSON(url, function(resources) {

        var nodes = [ ];

        if (options.includeBlank) {
          nodes.push(options.blankOptionHtml);
        }

        for (var i = resources.length-1; i >= 0; i--) {
          
          var optionNode = options.optionTemplate;

          for (attr in resources[i]) {
            optionNode = optionNode.replace('${' + attr + '}', resources[i][attr]);  
          }
          
          nodes.push(optionNode);
        }

        select.empty().append(nodes.join(''));
      });
    });

    return this;
  };

})(jQuery);

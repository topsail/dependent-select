(function($){
  
  /*
   * Sets up a select that refreshes its options whenever another
   * field changes value.
   *
   * parentId - the ID of the observed field
   *
   * urlTemplate - the URL used to request the new data from the
   *               server.  The value of the parent field will be
   *               substituted for ${value} in the template
   *
   */
  $.fn.dependentSelect = function(parentId, urlTemplate, options) {
    
    options = $.extend({
      optionTemplate: '<option value="${id}">${name}</option>',
      blankOptionHtml: '<option value=""></option>'
    }, options || {});

    var select = this;
    
    $('#' + parentId).bind('change', function(event) {

      select.empty().append(options.blankOptionHtml); // clear out the current options

      var url = urlTemplate.replace('${value}', event.target.value);

      $.getJSON(url, function(resources) {

        var nodes = [ ];

        if (options.includeBlank) {
          nodes.push(options.blankOptionHtml);
        }

        for (var i = resources.length-1; i >= 0; i--) {
          
          var optionNode = options.optionTemplate;
          
          // substitute resource property values in optionTemplate
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

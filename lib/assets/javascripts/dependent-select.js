(function($){

  $.fn.dependentSelect = function(options) {
    
    options = $.extend({
      optionTemplate: '<option value="${id}">${name}</option>',
      blankOptionHtml: '<option value=""></option>'
    }, options || {});

    var $select = this;
    var select = this.get(0);
    
    $('#' + options.parentId).bind('change', function(event) {

      $(select).empty().append(options.blankOptionHtml);

      var url = options.urlTemplate.replace('${value}', event.target.value);

      $.getJSON(url, function(resources) {

        var nodes = [ ];

        if (options.includeBlank) {
          nodes.push('<option value=""></option>');
        }

        for (var i = resources.length-1; i >= 0; i--) {
          // TODO use jQuery Template to do the replace, so that it works with arbitrary attributes, not just name and id
          var optionNode = options.optionTemplate.replace('${id}', resources[i].id).replace('${name}', resources[i].name);
          nodes.push(optionNode);
        }

        $(select).empty().append(nodes.join(''));
      });
    });

    return this;
  };

})(jQuery);

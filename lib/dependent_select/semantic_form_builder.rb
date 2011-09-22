module Formtastic
  class SemanticFormBuilder

    # Options:
    # parent_id - The DOM ID of the parent field to observe
    # url_template - The jQuery-compatible template used to generate the URL
    # parent_method - If provided, parent_id and url_template can be created automatically
    # option_template - The jQuery-compatible template used to generate the select options
    def dependent_select_input(method, options)

      html = select_input(method, options)

      options = {}.merge(options)

      html_options = options.delete(:input_html) || {}
      input_name = generate_association_input_name(method)
      html_options[:id] ||= generate_html_id(input_name, "")

      if options[:parent_method]
        
        parent_input_name = generate_association_input_name(options[:parent_method])
        options[:parent_id] ||= generate_html_id(parent_input_name, "")

        child_reflection = reflection_for(method)
        parent_reflection = reflection_for(options[:parent_method])

        if child_reflection && parent_reflection && parent_reflection.macro == :belongs_to
          options[:url_template] ||= DependentSelect.default_url_template
            .gsub('${resource_name}', child_reflection.class_name.underscore)
            .gsub('${plural_resource_name}', child_reflection.class_name.underscore.pluralize)
            .gsub('${parent_resource_name}', parent_reflection.class_name.underscore)
            .gsub('${plural_parent_resource_name}', parent_reflection.class_name.underscore.pluralize)
            .gsub('${parent_parameter}', parent_reflection.foreign_key.to_s)
        end

      end

      unless options[:parent_id].blank? || options[:url_template].blank?

        # convert to camelcase keys, which is the convention in Javascript
        js_options = options.inject({}) do |hash, pair|
          hash[pair[0].to_s.camelize(:lower)] = pair[1]
          hash
        end

        html += "<script>$(document).ready(function() { $('##{html_options[:id]}').dependentSelect(#{js_options.to_json}) });</script>".html_safe

      end

      return html

    end

  end
end

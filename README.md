# Dependent Select #

dependent-select is a Formtastic 1.2 compatible extension which provides a `select` where the available options depend on the current value of another field.  When the parent field's value is changed, the options of the `dependent_select` are updated via an AJAX request.  Much of the functionality is implemented in a [jQuery plugin](https://github.com/topsail/dependent-select/blob/master/lib/assets/javascripts/dependent-select.js) which could be used independenly of Formtastic.

## Simple Example ##

    <%= semantic_form_for @user do |f| %>
    <%= f.inputs do %>
      <%= f.input :department, :as => :select,           :collection => Department.find(:all) %>
      <%= f.input :division,   :as => :dependent_select, :parent_method => :department, :collection => (@user.department ? @user.department.divisions : []) %>
    <% end %>
    <% end %>

In this example each `Department` has many `Divisions`.  Whenever the department field changes value, the division field is updated to contain only the `Divisions` of the selected `Department`.

## URL template ##

The URL used to request the updated option values is controlled by a simple template option, `url_template`, which defaults to:

    /${plural_parent_resource_name}/${value}/${plural_resource_name}.json

In the above example, assuming the selected department ID is 47, this would translate to `/departments/47/divisions.json`

The default URL template can also be overridden globally:

    DependentSelect.default_url_template = '/${plural_resource_name}.json?${parent_resource_name}=${value}'

## Option template ##

The server must return JSON records.  The new `option` tags are then generated via the `option_template`, which defaults to:

    <option value="${id}">${name}</option>

If the returned objects do not have an `id` and `name` attribute, `option_template` must be overridden.



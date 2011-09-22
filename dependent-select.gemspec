# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "dependent_select/version"

Gem::Specification.new do |s|
  s.name        = "dependent-select"
  s.version     = Dependent::Select::VERSION
  s.authors     = ["Mark Roghelia"]
  s.email       = ["mroghelia@topsailtech.com"]
  s.summary     = %q{Helper and Formtastic support for a select box whose value depends on another field.}
  #s.rubyforge_project = "dependent-select"
  s.files         = `git ls-files`.split("\n")
  #s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  #s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
  s.add_dependency "formtastic"
end

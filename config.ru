require 'rubygems'
require 'bundler'

Bundler.setup

require 'sinatra'
require 'open-uri'
require 'erubis'

require 'dashboard'
run DashboardApp
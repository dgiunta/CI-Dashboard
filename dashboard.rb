class DashboardApp < Sinatra::Base
  set :public, File.expand_path(File.join(File.dirname(__FILE__), 'public'))
  
  get('/load_projects_from/:ip') do
    open("http://#{params[:ip]}/dashboard/cctray.xml").read
  end

  get('/') do
    redirect '/dashboard.html'
  end
end
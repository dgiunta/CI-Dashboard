$(function() {
  var passing         = $('#passing'),
      failing         = $('#failing'),
      building        = $('#building'),
      project_template = '<li>'
                       + '  <h2><a href=":webUrl" target="_blank">:name</a></h2>'
                       + '  <ul class="details">'
                       + '    <li class="build">:lastBuildLabel</li>'
                       + '    <li class="time">:lastBuildTime</li>'
                       + '  </ul>'
                       + '</li>';
  
  setupNav();
  getProjects();
  // setInterval(getProjects, 5000);

  function getProjects () {
    passing.empty();
    failing.empty();
    building.empty();
    loadFrom('10.98.0.222:8080');
    loadFrom('10.98.0.85:8080');
  }

  function loadFrom (ip) {
    $.get('/load_projects_from/' + ip, insertProjects);
  }

  function insertProjects(data) {
    $('Project', data).each(function(i) {
      var project = $(this), newProject = project_template;
      newProject = newProject.replace(/:name/g,            project.attr('name'));
      newProject = newProject.replace(/:lastBuildLabel/g,  project.attr('lastBuildLabel'));
      newProject = newProject.replace(/:lastBuildTime/g,   project.attr('lastBuildTime'));
      newProject = newProject.replace(/:webUrl/g,          project.attr('webUrl'));
      newProject = $(newProject).click(function(e) { window.open(project.attr('webUrl')); });
      
      if (project.attr('activity') === 'Building') {
        building.append(newProject);
      } else {
        project.attr('lastBuildStatus') === 'Success' ? passing.append(newProject) : failing.append(newProject);
      }
    });
  }
  
  function setupNav () {
    var navContainer = $('.nav'),
        navItems = $('li a', navContainer),
        classnames = navItems.map(function(i, a) { return a.href.replace(/^.*\#/, ''); }).toArray();
    
    navItems.click(selectNav);
    
    window.location.hash ? 
      navItems.filter('[href$=' + window.location.hash.replace(/\#/, '') + ']').click() : 
      navItems.filter('.selected').click();
    
    function selectNav (e) {
      var link = $(e.target);
      
      navItems.removeClass('selected');
      link.addClass('selected');
      $('body').removeClass(classnames.join(", ")).addClass(link.attr('href').replace(/\#/, ''));
    }
  }
});

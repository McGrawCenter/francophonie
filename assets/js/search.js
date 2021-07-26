jQuery(document).ready(function(){



	function processTags() {
	  jQuery.each(expressions, function(i,v){

	    var tags = v.Tags.trim().split("#");
	    
	    jQuery.each(tags, function(ind,val){

	       if(val !== "") { 
	         
	         var x = val.trim().split(":");
	         var c = x[0].trim();
	         var d = x[1].trim();

	         if(c == 'region') { regions.push(d); }
	         if(c == 'theme') { themes.push(d); }
	         
	         v[c] = d;  
	       } 
	      
	    });
	  });
	  //console.log(expressions);
	}


	var perpage = 25;
	var page = 1;

	var regions = [];
	var themes = [];
	
	/*
	for(var key in expressions) {
	  for(k in expressions[key].Tags) {
	  
	    if(k > 0) {
	       var z = tags[k].trim().split(":");
	       obj[z[0]] = z[1];
	       if(z[0]=='region') { regions.push(z[1]); }
	       if(z[0]=='theme') { themes.push(z[1]); }
	    } 

	  }
	}
	*/
	processTags()

	// init the lunr search
	var idx = lunr(function () {

	  this.field('id')	
	  this.field('expression')
	  this.field('equivalent')
	  this.field('region')
	  this.field('theme')
	  this.field('unaccented')
	  
	  for(var key in expressions) {
	  
	    	  var unaccented = expressions[key].Expression.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + " " + expressions[key].Equivalent.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	  
	  	  var obj = {
		    "expression": expressions[key].Expression,
		    "equivalent": expressions[key].Equivalent,
		    "unaccented": unaccented,
		    "id": expressions[key].ID
		  }
		  

	  	  var tags = expressions[key].Tags.split("#");
		  
		  for(k in tags) {
		  
		    if(k > 0) {
		       var z = tags[k].trim().split(":");
		       obj[z[0]] = z[1];
		    } 

		  }

		  this.add(obj);
	  }

	// get only unique values of the tags/filters
	regions = regions.filter(onlyUnique);
	themes = themes.filter(onlyUnique);
	
	populateFilter('region',regions);
	populateFilter('theme',themes);
	
	
	
	}); // end init lunr
	 
	 
	performSearch(); 
	 
	jQuery("#search-form").submit(function(e){ e.preventDefault(); });
	 
	 
	jQuery("#search_go").click(function(e){
	  performSearch();
	  e.preventDefault();
	});
	
	jQuery(".filter").click(function(e){
	  performSearch();
	});	
	
	
	jQuery(document).on("click",".pager", function(e){
	  page = jQuery(this).attr('rel');
	  performSearch();
	  e.preventDefault();
	});		
	 
	 
	 
	 
	function performSearch() {
	
	  var query = [];
	  
	
	  var searchTerm = jQuery("#s").val();
	  if( searchTerm === "") { searchTerm = "*"; }
	  query.push(searchTerm);
	  
	  jQuery.each(jQuery(".filter"), function(i,v){
	    if(jQuery(this).is(':checked')) { 
	      query.push(jQuery(this).val());
	     }
	  })

	  var querystr = "+"+query.join(" +");
	  
	  if (querystr) {
		var results = idx.search(querystr);
		displaySearchResults(results, expressions); // We'll write this in the next section
	  }
	}
	 
	 
	function populateFilter( select_id, array ) {
	  jQuery.each(array, function(i,v){
	    //jQuery("#"+select_id).append("<option value='"+v+"'>"+v+"</option>");
	    jQuery("#"+select_id).append("<label><input type='checkbox' class='filter' name='select_id[]' value='"+select_id+":"+v+"'/> "+v+"</label>");
	  });	
	  return true;
	}
	 
	
	function onlyUnique( value, index, self ) {
	  return self.indexOf(value) === index;
	}	 


	/****
	* render the result items
	*********************************************/
	function template(o) { 
	  var f = frequencyVis(o.Frequency)	   
	  return "<li class='hit'><span class='hit-title'>"+o.Expression+"</span> "+o.Equivalent+". <div class='meta'>"+o.Register+", "+o.Dating+" "+o.Tags+"</div>"+f+"</li>";
	}


	function displaySearchResults(results, expressions) {
	  jQuery('#search-results').empty();
	  
	  var hits = results.length;
	  jQuery("#hits").html(hits+" résultats");
	  
	  var pages = parseInt(hits/perpage) + 1;
	  
	  jQuery("#pagination").html(pagination(pages));
	  
	  
	  //slice the results for the current page
	  var start = (page-1) * perpage;
	  var end = start + perpage;
	  results = results.slice(start,end);
	  
	  jQuery.each(results, function(i,v) {
	      var index = v.ref - 1;
	      jQuery('#search-results').append(template(expressions[index]));
	  });	  
	  
	}

	function frequencyVis(rating) {
	  var html = "<div class='meta'>fréquence ";
	  for(var x=1;x<=rating;x++) { html += "&#11044;"; }
	  html += "</div>";
	  return html;
	}

	function pagination(pages) {
	  var html = "<ul class='pagination'>";
	  for(var x=1;x<=pages;x++) { 
	     if(x==page) { html += "<a href='#' class='pager' rel='"+x+"'><li class='selected'>"+x+"</li></a>"; }
	     else { html += "<a href='#' class='pager' rel='"+x+"'><li>"+x+"</li></a>"; }
	  }
	  html += "</ul>";
	  return html;
	}


/*
  $( ".target" ).keyup(function(){

	var node_title = $('#searchname').val();
	var node_class_id = $('.class_id').val();

	$.getJSON( "json.php?a=nodes&node_title="+node_title, function( data ) {

	  $('#searchresults').html("");
	  $.each( data, function( key,obj ) {
	    $('#searchresults').append("<li id='" + obj.ID + "'>" + obj.node_title + "</li>");
	  });

	});
});
*/



});



